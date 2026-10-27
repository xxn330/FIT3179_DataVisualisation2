
/* ============================================
   IDIOM 11 — HEXAGONAL SPATIAL BIN MAP
   With geographic suburb boundaries
   ============================================ */

(async function renderHexbinMap() {

  const target = document.getElementById(
    "hex-density-chart"
  );

  if (!target) return;

  try {

    /* ========================================
       1. LOAD ORIGINAL PUBLIC ART DATA
       ======================================== */

    const response = await fetch(
      "data/australian_city_public_art_combined.csv"
    );

    if (!response.ok) {
      throw new Error("Unable to load public art CSV");
    }

    const csvText = await response.text();

    const rawData = vega.read(csvText, {
      type: "csv"
    });

    const validCities = [
      "Brisbane",
      "Melbourne",
      "Canberra"
    ];

    const artworks = rawData.map(row => ({
      city: String(row.city || "").trim(),
      longitude: Number(row.longitude),
      latitude: Number(row.latitude)
    })).filter(row =>
      validCities.includes(row.city) &&
      Number.isFinite(row.longitude) &&
      Number.isFinite(row.latitude) &&
      row.longitude >= -180 &&
      row.longitude <= 180 &&
      row.latitude >= -85 &&
      row.latitude <= 85
    );


    /* ========================================
       2. MAP CONFIGURATION
       ======================================== */

    const WIDTH = 270;
    const HEIGHT = 320;

    // Hexagon circumradius in projected pixels
    const HEX_RADIUS = 10;

    const RAD = Math.PI / 180;
    const DEG = 180 / Math.PI;

    const citySettings = {

      Brisbane: {
        center: [153.03, -27.47],
        scale: 56000,
        boundary:
          "https://raw.githubusercontent.com/stephenmuss/suburb-boundaries-geojson/master/qld.json"
      },

      Melbourne: {
        center: [144.97, -37.81],
        scale: 100000,
        boundary:
          "https://raw.githubusercontent.com/stephenmuss/suburb-boundaries-geojson/master/vic.json"
      },

      Canberra: {
        center: [149.13, -35.28],
        scale: 40000,
        boundary:
          "https://raw.githubusercontent.com/stephenmuss/suburb-boundaries-geojson/master/act.json"
      }

    };


    /* ========================================
       3. MERCATOR CONVERSION
       ======================================== */

    function mercatorY(latitude) {

      const lat = Math.max(
        -85,
        Math.min(85, latitude)
      );

      return Math.log(
        Math.tan(
          Math.PI / 4 + (lat * RAD) / 2
        )
      );

    }

    // Convert geographic coordinates to
    // screen coordinates for a city panel.

    function project(lon, lat, settings) {

      const centerLon = settings.center[0];
      const centerLat = settings.center[1];

      const x =
        WIDTH / 2 +
        settings.scale * (lon - centerLon) * RAD;

      const y =
        HEIGHT / 2 -
        settings.scale * (
          mercatorY(lat) -
          mercatorY(centerLat)
        );

      return [x, y];

    }

    // Convert a screen coordinate back into
    // longitude and latitude.

    function invert(x, y, settings) {

      const centerLon = settings.center[0];
      const centerLat = settings.center[1];

      const lon =
        centerLon +
        ((x - WIDTH / 2) / settings.scale) * DEG;

      const projectedY =
        mercatorY(centerLat) -
        (y - HEIGHT / 2) / settings.scale;

      const lat =
        (
          2 * Math.atan(Math.exp(projectedY)) -
          Math.PI / 2
        ) * DEG;

      return [lon, lat];

    }


    /* ========================================
       4. HEXAGON GRID CALCULATIONS
       ======================================== */

    function roundHex(q, r) {

      const x = q;
      const z = r;
      const y = -x - z;

      let rx = Math.round(x);
      let ry = Math.round(y);
      let rz = Math.round(z);

      const dx = Math.abs(rx - x);
      const dy = Math.abs(ry - y);
      const dz = Math.abs(rz - z);

      if (dx > dy && dx > dz) {

        rx = -ry - rz;

      } else if (dy > dz) {

        ry = -rx - rz;

      } else {

        rz = -rx - ry;

      }

      return [rx, rz];

    }

    // Pixel coordinates to axial hex grid
    function pixelToHex(x, y) {

      const q =
        (
          Math.sqrt(3) / 3 * x -
          y / 3
        ) / HEX_RADIUS;

      const r =
        (
          2 / 3 * y
        ) / HEX_RADIUS;

      return roundHex(q, r);

    }

    // Axial hex coordinates back to pixels
    function hexToPixel(q, r) {

      const x =
        HEX_RADIUS *
        Math.sqrt(3) *
        (q + r / 2);

      const y =
        HEX_RADIUS *
        1.5 *
        r;

      return [x, y];

    }


    /* ========================================
       5. CREATE GEOGRAPHIC HEXAGON POLYGONS
       ======================================== */

    function createHexagon(cx, cy, settings) {

      const ring = [];

      for (let i = 0; i < 6; i++) {

        const angle =
          (60 * i - 30) * RAD;

        const px =
          cx + HEX_RADIUS * Math.cos(angle);

        const py =
          cy + HEX_RADIUS * Math.sin(angle);

        ring.push(
          invert(px, py, settings)
        );

      }

      // Close polygon
      ring.push(ring[0]);

      return ring;

    }


    /* ========================================
       6. AGGREGATE ARTWORKS INTO BINS
       ======================================== */

    function buildCityBins(city) {

      const settings = citySettings[city];

      const records = artworks.filter(
        row => row.city === city
      );

      const counts = new Map();

      records.forEach(row => {

        const [x, y] = project(
          row.longitude,
          row.latitude,
          settings
        );

        const [q, r] = pixelToHex(x, y);

        const key = `${q},${r}`;

        counts.set(
          key,
          (counts.get(key) || 0) + 1
        );

      });

      const features = [];

      counts.forEach((count, key) => {

        const [q, r] = key.split(",").map(Number);

        const [cx, cy] = hexToPixel(q, r);

        const ring = createHexagon(
          cx,
          cy,
          settings
        );

        features.push({

          type: "Feature",

          properties: {
            city: city,
            hex_id: key,
            artwork_count: count
          },

          geometry: {
            type: "Polygon",
            coordinates: [ring]
          }

        });

      });

      return features;

    }


    /* ========================================
       7. PREPARE DATA
       ======================================== */

    const binsByCity = {};

    validCities.forEach(city => {

      binsByCity[city] = buildCityBins(city);

    });

    const allCounts = validCities.flatMap(city =>
      binsByCity[city].map(
        feature => feature.properties.artwork_count
      )
    );

    if (!allCounts.length) {
      throw new Error("No hexagonal bins generated");
    }

    const maxCount = Math.max(...allCounts);


    /* ========================================
       8. COLOUR SCALE
       ======================================== */

    const colours = [
      "#D6E8DF",
      "#A8CFBD",
      "#70AC96",
      "#348572",
      "#145543"
    ];


    /* ========================================
       9. CREATE CITY MAP PANEL
       ======================================== */

    function createCityPanel(city, showLegend) {

      const settings = citySettings[city];

      return {

        title: {
          text: city,
          font: "DM Sans",
          fontSize: 15,
          color: "#252521",
          anchor: "middle",
          offset: 12
        },

        width: WIDTH,
        height: HEIGHT,

        projection: {
          type: "mercator",
          center: settings.center,
          scale: settings.scale,
          translate: [
            WIDTH / 2,
            HEIGHT / 2
          ]
        },

        layer: [

          /* BACKGROUND — SUBURB BOUNDARIES */

          {
            data: {
              url: settings.boundary,
              format: {
                type: "json",
                property: "features"
              }
            },

            mark: {
              type: "geoshape",
              fill: "#F2EFE9",
              stroke: "#D4CCC1",
              strokeWidth: 0.45
            }
          },


          /* FOREGROUND — HEXAGONAL BINS */

          {
            data: {
              values: binsByCity[city]
            },

            mark: {
              type: "geoshape",
              stroke: "#FFFFFF",
              strokeWidth: 0.8,
              opacity: 0.96
            },

            encoding: {

              color: {
                field: "properties.artwork_count",
                type: "quantitative",
                title: "Records per bin",

                scale: {
                  type: "sqrt",
                  domain: [0, Math.max(2, maxCount)],
                  range: colours
                },

                legend: showLegend ? {
                  orient: "bottom",
                  direction: "horizontal",
                  gradientLength: 220,
                  title: "Records per bin"
                } : null
              },

              tooltip: [
                {
                  field: "properties.city",
                  type: "nominal",
                  title: "City"
                },
                {
                  field: "properties.artwork_count",
                  type: "quantitative",
                  title: "Artwork Records",
                  format: ",d"
                }
              ]

            }
          }

        ]

      };

    }


    /* ========================================
       10. COMBINE CITY PANELS
       ======================================== */

    const spec = {

      $schema:
        "https://vega.github.io/schema/vega-lite/v5.json",

      background: null,
      spacing: 16,

      hconcat: [
        createCityPanel("Brisbane", true),
        createCityPanel("Melbourne", false),
        createCityPanel("Canberra", false)
      ],

      resolve: {
        scale: {
          color: "shared"
        },

        projection: "independent"
      },

      config: {

        view: {
          stroke: null
        },

        legend: {
          labelFont: "DM Sans",
          titleFont: "DM Sans",
          labelFontSize: 11,
          titleFontSize: 12
        }

      }

    };


    /* ========================================
       11. RENDER
       ======================================== */

    await vegaEmbed(
      "#hex-density-chart",
      spec,
      {
        actions: false,
        renderer: "svg"
      }
    );

  } catch (error) {

    console.error(
      "Idiom 11 rendering error:",
      error
    );

    target.textContent =
      "Unable to display the hexbin map. Check the console.";

  }

})();

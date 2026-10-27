
const periods = [
  "Before 1980",
  "1980–1999",
  "2000–2019",
  "2020 onwards"
];

const periodColors = [
  "#AB384E",
  "#2D689C",
  "#207F65",
  "#B06B16"
];

// Create one city dot map with suburb boundaries
function createCityMap(city, center, scale, boundaryURL, showLegend) {
  return {
    "title": city,
    "width": 300,
    "height": 340,

    "projection": {
      "type": "mercator",
      "center": center,
      "scale": scale,
      "translate": [130, 150]
    },

    "layer": [
      // Layer 1: Suburb boundaries
      {
        "data": {
          "url": boundaryURL,
          "format": {
            "type": "json",
            "property": "features"
          }
        },

        "mark": {
          "type": "geoshape",
          "fill": "#F5F2ED",
          "stroke": "#D2CBC2",
          "strokeWidth": 0.4
        }
      },

      // Layer 2: Artwork dots
      {
        "data": {
          "url": "data/australian_city_public_art_combined.csv",
          "format": {
            "type": "csv",
            "parse": {
              "year": "number",
              "longitude": "number",
              "latitude": "number"
            }
          }
        },

        "transform": [
          {
            "filter": "datum.city === '" + city + "'"
          },
          {
            "filter": "datum.year_status === 'exact'"
          },
          {
            "filter": "isValid(datum.year) && isValid(datum.longitude) && isValid(datum.latitude)"
          },
          {
            "calculate": "datum.year < 1980 ? 'Before 1980' : datum.year < 2000 ? '1980–1999' : datum.year < 2020 ? '2000–2019' : '2020 onwards'",
            "as": "period"
          },
          {
            "filter": "selectedPeriod === 'All periods' || datum.period === selectedPeriod"
          }
        ],

        "mark": {
          "type": "circle",
          "size": 32,
          "opacity": 0.7,
          "stroke": "#FFFFFF",
          "strokeWidth": 0.4
        },

        "encoding": {
          "longitude": {
            "field": "longitude",
            "type": "quantitative"
          },
          "latitude": {
            "field": "latitude",
            "type": "quantitative"
          },
          "color": {
            "field": "period",
            "type": "nominal",
            "scale": {
              "domain": periods,
              "range": periodColors
            },
            "legend": showLegend ? {
              "orient": "bottom",
              "title": "Recorded Period"
            } : null
          },
          "tooltip": [
            {"field": "artwork_title", "title": "Artwork"},
            {"field": "artist", "title": "Artist"},
            {"field": "city", "title": "City"},
            {"field": "year", "title": "Recorded Year"},
            {"field": "period", "title": "Period"}
          ]
        }
      }
    ]
  };
}

const periodMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "background": "#FFFFFF",

  "params": [
    {
      "name": "selectedPeriod",
      "value": "All periods",
      "bind": {
        "input": "select",
        "name": "Artwork period: ",
        "options": [
          "All periods",
          ...periods
        ]
      }
    }
  ],

  "hconcat": [
    createCityMap(
      "Brisbane",
      [153.05, -27.46],
      48000,
      "https://raw.githubusercontent.com/stephenmuss/suburb-boundaries-geojson/master/qld.json",
      true
    ),

    createCityMap(
      "Melbourne",
      [144.96, -37.81],
      180000,
      "https://raw.githubusercontent.com/stephenmuss/suburb-boundaries-geojson/master/vic.json",
      false
    ),

    createCityMap(
      "Canberra",
      [149.10, -35.30],
      52000,
      "https://raw.githubusercontent.com/stephenmuss/suburb-boundaries-geojson/master/act.json",
      false
    )
  ],

  "spacing": 6,

  "resolve": {
    "scale": {
      "color": "shared"
    }
  },

  "config": {
    "view": {
      "stroke": null
    },
    "title": {
      "font": "DM Sans",
      "fontSize": 15,
      "color": "#252521"
    },
    "legend": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans"
    }
  }
};

vegaEmbed("#city-map", periodMap, {
  actions: false
});

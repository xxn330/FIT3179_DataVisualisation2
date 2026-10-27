const choroplethMap = {

  $schema:
    "https://vega.github.io/schema/vega-lite/v5.json",

  width: 800,
  height: 440,
  background: "#F7F3ED",

  projection: {
    type: "equalEarth"
  },

  layer: [

    /* Base world map */
    {
      data: {
        url:
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        format: {
          type: "topojson",
          feature: "countries"
        }
      },

      mark: {
        type: "geoshape",
        fill: "#b4b2af",
        stroke: "#FFFFFF",
        strokeWidth: 0.45
      }
    },

    /* Countries with artist records */
    {
      data: {
        url:
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        format: {
          type: "topojson",
          feature: "countries"
        }
      },

      transform: [
        {
          calculate: "toNumber(datum.id)",
          as: "country_id"
        },

        {
          lookup: "country_id",
          from: {
            data: {
              url:
                "data/qagoma_artist_country_choropleth.csv",

              format: {
                type: "csv",
                parse: {
                  country_id: "number",
                  artist_count: "number"
                }
              }
            },

            key: "country_id",
            fields: ["country", "artist_count"]
          }
        },

        {
          filter:
            "isValid(datum.artist_count) && datum.artist_count > 0"
        }
      ],

      mark: {
        type: "geoshape",
        stroke: "#FFFFFF",
        strokeWidth: 0.55
      },

      encoding: {

        color: {
          field: "artist_count",
          type: "quantitative",
          title: "Artist Records (log scale)",

          scale: {
            type: "log",
            domain: [1, 2789],

            range: [
              "#90B5C9",
              "#568EAE",
              "#28698E",
              "#164C70",
              "#092F4D"
            ]
          },

          legend: {
            orient: "bottom",
            direction: "horizontal",
            gradientLength: 320,
            values: [1, 10, 100, 1000],
            format: ",d",
            titlePadding: 12
          }
        },

        tooltip: [
          {
            field: "country",
            type: "nominal",
            title: "Country"
          },
          {
            field: "artist_count",
            type: "quantitative",
            title: "Artist Records",
            format: ",d"
          }
        ]

      }
    }

  ],

  config: {

    view: {
      stroke: null
    },

    legend: {
      labelFont: "DM Sans",
      titleFont: "DM Sans",
      labelFontSize: 12,
      titleFontSize: 13,
      labelColor: "#494943",
      titleColor: "#252521",
      layout: {
        bottom: {
          anchor: "middle",
          direction: "vertical",
          center: true
        }
      }
    }

  }

};

vegaEmbed(
  "#choropleth-map",
  choroplethMap,
  { actions: false }
).catch(console.error);

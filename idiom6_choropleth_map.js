
const choroplethMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 760,
  "height": 440,
  "background": "#ffffff",

  "projection": {
    "type": "equalEarth"
  },

  "layer": [
    {
      // Background: show all countries in light grey
      "data": {
        "url": "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },

      "mark": {
        "type": "geoshape",
        "fill": "#eeebe7",
        "stroke": "#ffffff",
        "strokeWidth": 0.5
      }
    },

    {
      // Countries with QAGOMA artist records
      "data": {
        "url": "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },

      "transform": [
        {
          "calculate": "toNumber(datum.id)",
          "as": "country_id"
        },

        {
          "lookup": "country_id",
          "from": {
            "data": {
              "url": "data/qagoma_artist_country_choropleth.csv",
              "format": {
                "type": "csv",
                "parse": {
                  "country_id": "number",
                  "artist_count": "number"
                }
              }
            },
            "key": "country_id",
            "fields": [
              "country",
              "artist_count"
            ]
          }
        },

        {
          "filter": "isValid(datum.artist_count)"
        }
      ],

      "mark": {
        "type": "geoshape",
        "stroke": "#ffffff",
        "strokeWidth": 0.5
      },

      "encoding": {
        "color": {
          "field": "artist_count",
          "type": "quantitative",
          "title": "Artist Records",
          "scale": {
            "type": "sqrt",
            
            "range": [
            "#EDF4FC",
            "#B9D5EC",
            "#70A9D4",
            "#2D73A7",
            "#103A69"
            ]

          },
          "legend": {
            "orient": "bottom",
            "direction": "horizontal",
            "gradientLength": 300,
            "titlePadding": 12,
            "format": ",d"
          }
        },

        "tooltip": [
          {
            "field": "country",
            "type": "nominal",
            "title": "Country"
          },
          {
            "field": "artist_count",
            "type": "quantitative",
            "title": "Artist Records",
            "format": ",d"
          }
        ]
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },

    "legend": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans",
      "labelFontSize": 12,
      "titleFontSize": 13,
      "labelColor": "#494943",
      "titleColor": "#252521"
    }
  }
};

vegaEmbed("#choropleth-map", choroplethMap, {
  actions: false
});

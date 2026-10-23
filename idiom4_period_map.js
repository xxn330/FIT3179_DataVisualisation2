const periodMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 850,
  "height": 530,
  "background": "#ffffff",
  "padding": 10,

  "projection": {
    "type": "mercator",
    "center": [134, -27],
    "scale": 850
  },

  "params": [
    {
      "name": "selectedPeriod",
      "value": "All periods",
      "bind": {
        "input": "select",
        "name": "Artwork period: ",
        "options": [
          "All periods",
          "Before 1980",
          "1980–1999",
          "2000–2019",
          "2020 onwards"
        ]
      }
    }
  ],

  "layer": [
    // Australia background
    {
      "data": {
        "url": "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },

      "transform": [
        {
          "filter": "datum.id == 36 || datum.id == '036'"
        }
      ],

      "mark": {
        "type": "geoshape",
        "fill": "#f0ebe3",
        "stroke": "#b9b0a5",
        "strokeWidth": 1
      }
    },

    // Public artwork points
    {
      "data": {
        "url": "data/australian_city_public_art_combined.csv",
        "format": {
          "type": "csv",
          "parse": {
            "year": "number",
            "latitude": "number",
            "longitude": "number"
          }
        }
      },

      "transform": [
        {
          "filter": "datum.year_status === 'exact'"
        },
        {
          "filter":
            "isValid(datum.year) && isValid(datum.latitude) && isValid(datum.longitude)"
        },
        {
          "calculate":
            "datum.year < 1980 ? 'Before 1980' : datum.year < 2000 ? '1980–1999' : datum.year < 2020 ? '2000–2019' : '2020 onwards'",
          "as": "period"
        },
        {
          "filter":
            "selectedPeriod === 'All periods' || datum.period === selectedPeriod"
        }
      ],

      "mark": {
        "type": "circle",
        "size": 95,
        "opacity": 0.75,
        "stroke": "#ffffff",
        "strokeWidth": 0.5
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
          "title": "Recorded Period",
          "scale": {
            "domain": [
              "Before 1980",
              "1980–1999",
              "2000–2019",
              "2020 onwards"
            ],
            
            "range": [
              "#AB384E",
              "#2D689C",
              "#207F65",
              "#B06B16"
            ]

          },
          "legend": {
            "orient": "bottom",
            "columns": 4,
            "symbolSize": 110,
            "title": null
          }
        },

        "tooltip": [
          {
            "field": "artwork_title",
            "type": "nominal",
            "title": "Artwork"
          },
          {
            "field": "artist",
            "type": "nominal",
            "title": "Artist"
          },
          {
            "field": "city",
            "type": "nominal",
            "title": "City"
          },
          {
            "field": "year",
            "type": "quantitative",
            "title": "Recorded Year",
            "format": "d"
          },
          {
            "field": "date_type",
            "type": "nominal",
            "title": "Date Type"
          },
          {
            "field": "period",
            "type": "nominal",
            "title": "Period"
          }
        ]
      }
    },

    // City labels
    {
      "data": {
        "values": [
          {
            "city": "Brisbane",
            "longitude": 153.0,
            "latitude": -27.45
          },
          {
            "city": "Canberra",
            "longitude": 149.1,
            "latitude": -35.3
          },
          {
            "city": "Melbourne",
            "longitude": 144.95,
            "latitude": -37.8
          }
        ]
      },

      "mark": {
        "type": "text",
        "font": "DM Sans",
        "fontSize": 14,
        "fontWeight": "bold",
        "color": "#34302c",
        "dx": 28,
        "dy": -14
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
        "text": {
          "field": "city",
          "type": "nominal"
        }
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

vegaEmbed("#city-map", periodMap, {
  actions: false
});

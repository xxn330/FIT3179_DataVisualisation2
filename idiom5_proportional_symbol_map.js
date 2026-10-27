
const symbolMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 660,
  "height": 420,
  "background": "#ffffff",

  "projection": {
    "type": "mercator",
    "center": [134, -27],
    "scale": 590
  },

  "layer": [
    // Layer 1: Australia map
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
        "fill": "#eee9e1",
        "stroke": "#b8afa4"
      }
    },

    // Layer 2: Proportional circles
    {
      "data": {
        "url": "data/australian_city_public_art_combined.csv"
      },

      "transform": [
        {
          "aggregate": [
            {"op": "count", "as": "artwork_count"}
          ],
          "groupby": ["city"]
        },
        {
          "calculate": "datum.city == 'Brisbane' ? 153.024 : datum.city == 'Melbourne' ? 144.963 : 149.130",
          "as": "longitude"
        },
        {
          "calculate": "datum.city == 'Brisbane' ? -27.469 : datum.city == 'Melbourne' ? -37.816 : -35.281",
          "as": "latitude"
        }
      ],

      "mark": {
        "type": "circle",
        "color": "#176B50",
        "opacity": 0.85,
        "stroke": "#ffffff",
        "strokeWidth": 1.5
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

        "size": {
        "field": "artwork_count",
        "type": "quantitative",
        "scale": {
          "domain": [0, 300],
          "range": [0, 2500]
        },
          
        "legend": {
          "orient": "right",
          "direction": "vertical",
          "title": "Artwork Count",
          "values": [100, 200, 300],
          "labelFontSize": 12,
          "titleFontSize": 13,
          "symbolFillColor": "#176B50",
          "symbolStrokeColor": "#FFFFFF",
          "offset": 15
        }

        },
        "tooltip": [
          {"field": "city", "title": "City"},
          {
            "field": "artwork_count",
            "title": "Artworks",
            "format": ",d"
          }
        ]
      }
    },

    // Layer 3: Brisbane label
    {
      "data": {
        "values": [
          {"longitude": 148.5, "latitude": -26.0}
        ]
      },
      "mark": {
        "type": "text",
        "text": "Brisbane: 198",
        "align": "right",
        "fontSize": 13,
        "fontWeight": "bold",
        "color": "#252521"
      },
      "encoding": {
        "longitude": {"field": "longitude"},
        "latitude": {"field": "latitude"}
      }
    },

    // Layer 4: Canberra label
    {
      "data": {
        "values": [
          {"longitude": 153.5, "latitude": -34.0}
        ]
      },
      "mark": {
        "type": "text",
        "text": "Canberra: 132",
        "align": "left",
        "fontSize": 13,
        "fontWeight": "bold",
        "color": "#252521"
      },
      "encoding": {
        "longitude": {"field": "longitude"},
        "latitude": {"field": "latitude"}
      }
    },

    // Layer 5: Melbourne label
    {
      "data": {
        "values": [
          {"longitude": 143.5, "latitude": -40.3}
        ]
      },
      "mark": {
        "type": "text",
        "text": "Melbourne: 261",
        "align": "right",
        "fontSize": 13,
        "fontWeight": "bold",
        "color": "#252521"
      },
      "encoding": {
        "longitude": {"field": "longitude"},
        "latitude": {"field": "latitude"}
      }
    }
  ],

  "config": {
    "view": {
      "stroke": null
    },
    "legend": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans"
    }
  }
};

vegaEmbed("#symbol-map", symbolMap, {
  actions: false
});



const symbolMap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 560,
  "height": 370,
  "background": "#ffffff",

  "projection": {
    "type": "mercator",
    "center": [134, -27],
    "scale": 530
  },

  "layer": [
    // Australia map
    {
      "data": {
        "url": "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        "format": {
          "type": "topojson",
          "feature": "countries"
        }
      },
      "transform": [
        {"filter": "datum.id == 36 || datum.id == '036'"}
      ],
      "mark": {
        "type": "geoshape",
        "fill": "#eee9e1",
        "stroke": "#b8afa4"
      }
    },

    // Circles representing artwork counts
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
        "color": "#a14c32",
        "opacity": 0.75,
        "stroke": "white"
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
          "title": "Artwork Count",
          "scale": {
            "domain": [0, 300],
            "range": [0, 2500]
          },
          "legend": {
            "orient": "bottom",
            "values": [100, 200, 300]
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

    // City labels
    {
      "data": {
        "values": [
          {"city": "Brisbane", "longitude": 153.024, "latitude": -27.469},
          {"city": "Canberra", "longitude": 149.130, "latitude": -35.281},
          {"city": "Melbourne", "longitude": 144.963, "latitude": -37.816}
        ]
      },
      "mark": {
        "type": "text",
        "fontSize": 12,
        "fontWeight": "bold",
        "dx": 20,
        "dy": -12
      },
      "encoding": {
        "longitude": {"field": "longitude"},
        "latitude": {"field": "latitude"},
        "text": {"field": "city"}
      }
    }
  ],

  "config": {
    "view": {"stroke": null},
    "legend": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans"
    }
  }
};

vegaEmbed("#symbol-map", symbolMap, {actions: false});


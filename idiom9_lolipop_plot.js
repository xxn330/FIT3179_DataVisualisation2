
const lollipop = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 700,
  "height": 420,
  "background": "#ffffff",
  "padding": 10,

  "data": {
    "url": "data/brisbane_material_counts.csv",
    "format": {
      "type": "csv",
      "parse": {
        "artwork_count": "number"
      }
    }
  },

  "transform": [
    {
      "window": [
        {"op": "row_number", "as": "rank"}
      ],
      "sort": [
        {"field": "artwork_count", "order": "descending"}
      ]
    },
    {
      "filter": "datum.rank <= 12"
    }
  ],

  "layer": [
    {
      "mark": {
        "type": "rule",
        "strokeWidth": 2,
        "color": "#d5aa97"
      },
      "encoding": {
        "x": {
          "field": "artwork_count",
          "type": "quantitative",
          "title": "Number of Artworks",
          "scale": {"zero": true},
          "axis": {
            "format": ",d",
            "titlePadding": 20,
            "labelPadding": 8,
            "grid": true,
            "gridColor": "#e3ddd5"
          }
        },
        "x2": {"datum": 0},
        "y": {
          "field": "material",
          "type": "nominal",
          "sort": {
            "field": "artwork_count",
            "order": "descending"
          },
          "title": null,
          "axis": {
            "labelPadding": 12,
            "labelLimit": 200,
            "ticks": false,
            "domain": false
          }
        }
      }
    },

    {
      "mark": {
        "type": "circle",
        "size": 125,
        "color": "#a14c32"
      },
      "encoding": {
        "x": {
          "field": "artwork_count",
          "type": "quantitative"
        },
        "y": {
          "field": "material",
          "type": "nominal",
          "sort": {
            "field": "artwork_count",
            "order": "descending"
          }
        },
        "tooltip": [
          {
            "field": "material",
            "type": "nominal",
            "title": "Material Description"
          },
          {
            "field": "artwork_count",
            "type": "quantitative",
            "title": "Recorded Artworks",
            "format": ",d"
          }
        ]
      }
    }
  ],

  "config": {
    "view": {"stroke": null},

    "axis": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans",
      "labelFontSize": 12,
      "titleFontSize": 14,
      "labelColor": "#494943",
      "titleColor": "#252521"
    }
  }
};

vegaEmbed("#lollipop-chart", lollipop, {
  actions: false
});

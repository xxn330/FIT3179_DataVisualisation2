
const treemap = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",

  "width": 700,
  "height": 460,
  "padding": 10,
  "background": "#ffffff",

  "data": [
    {
      "name": "tree",

      "url": "data/qagoma_department_category_treemap.csv",

      "format": {
        "type": "csv",
        "parse": {
          "count": "number"
        }
      },

      "transform": [
        {
          "type": "formula",
          "expr": "datum.parent === '' ? null : datum.parent",
          "as": "parent_id"
        },

        {
          "type": "stratify",
          "key": "id",
          "parentKey": "parent_id"
        },

        {
          "type": "treemap",
          "field": "count",
          "method": "squarify",
          "sort": {
            "field": "value",
            "order": "descending"
          },
          "size": [
            {"signal": "width"},
            {"signal": "height"}
          ],
          "paddingInner": 2,
          "paddingOuter": 2
        }
      ]
    },

    {
      "name": "leaves",
      "source": "tree",

      "transform": [
        {
          "type": "filter",
          "expr": "datum.depth === 2"
        }
      ]
    },

    {
      "name": "labels",
      "source": "leaves",

      "transform": [
        {
          "type": "filter",
          "expr": "(datum.x1 - datum.x0) > 85 && (datum.y1 - datum.y0) > 30"
        }
      ]
    }
  ],


    "scales": [
    {
        "name": "color",
        "type": "ordinal",
        "domain": [
        "Australian Art",
        "Contemporary Australian Art",
        "Indigenous Australian Art",
        "International Art",
        "Pacific Art",
        "Contemporary Asian Art",
        "Asian Art",
        "Contemporary International Art"
        ],
        "range": [
        "#A42655",
        "#295BA3",
        "#975A14",
        "#16766D",
        "#8048A4",
        "#B34234",
        "#476A23",
        "#584E91"
        ]
    }
    ],



  "marks": [
    {
      "type": "rect",

      "from": {
        "data": "leaves"
      },

      "encode": {
        "enter": {
          "x": {"field": "x0"},
          "y": {"field": "y0"},
          "x2": {"field": "x1"},
          "y2": {"field": "y1"},

          "fill": {
            "scale": "color",
            "field": "department"
            },

          "stroke": {"value": "#ffffff"},
          "strokeWidth": {"value": 1},

          "tooltip": {
            "signal": "{'Department': datum.department, 'Category': datum.name, 'Artworks': datum.count}"
          }
        },

        "update": {
          "fillOpacity": {"value": 0.9}
        },

        "hover": {
          "fillOpacity": {"value": 1},
          "strokeWidth": {"value": 2}
        }
      }
    },

    {
      "type": "text",

      "from": {
        "data": "labels"
      },

      "encode": {
        "enter": {
          "x": {
            "signal": "(datum.x0 + datum.x1) / 2"
          },

          "y": {
            "signal": "(datum.y0 + datum.y1) / 2"
          },

          "text": {
            "field": "name"
          },

          "align": {"value": "center"},
          "baseline": {"value": "middle"},

          "font": {"value": "DM Sans"},
          "fontSize": {"value": 11},
          "fontWeight": {"value": 500},

          "fill": {"value": "#ffffff"},

          "limit": {
            "signal": "datum.x1 - datum.x0 - 8"
          }
        }
      }
    }
  ],

  "legends": [
    {
      "fill": "color",
      "title": "Collection Department",
      "orient": "bottom",
      "columns": 2,
      "labelFont": "DM Sans",
      "titleFont": "DM Sans",
      "labelFontSize": 11,
      "titleFontSize": 12
    }
  ]
};

vegaEmbed("#treemap-chart", treemap, {
  actions: false
});

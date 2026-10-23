const barChart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 700,
  "height": 420,
  "background": "#f7f3ed",
  "padding": 10,

  "data": {
    "url": "data/qagoma_category.csv",
    "format": {
      "type": "csv",
      "parse": {
        "count": "number"
      }
    }
  },

  "transform": [
    {
      "window": [
        {"op": "row_number", "as": "rank"}
      ],
      "sort": [
        {"field": "count", "order": "descending"}
      ]
    },
    {
      "filter": "datum.rank <= 12"
    }
  ],

  "mark": {
    "type": "bar",
    "cornerRadiusEnd": 2
  },

  "encoding": {
    "x": {
      "field": "count",
      "type": "quantitative",
      "title": "Number of Artworks",
      "scale": {
        "zero": true,
        "nice": true
      },
      "axis": {
        "format": ",.0f",
        "tickCount": 6,
        "labelPadding": 8,
        "titlePadding": 20,
        "grid": true,
        "gridColor": "#e3ddd5",
        "domain": false,
        "tickSize": 0
      }
    },

    "y": {
      "field": "category",
      "type": "nominal",
      "sort": "-x",
      "title": null,
      "axis": {
        "labelPadding": 12,
        "ticks": false,
        "domain": false,
        "labelLimit": 180
      }
    },

        
    "color": {
      "field": "category",
      "type": "nominal",
      "scale": {
        "domain": [
          "Print",
          "Painting",
          "Photograph",
          "Drawing",
          "Ceramic",
          "Sculpture",
          "Fibre",
          "Textile",
          "Electronic media",
          "Glass",
          "Jewellery",
          "Installation"
        ],
        "range": [
          "#9E3D2D",
          "#156D8D",
          "#926700",
          "#367A47",
          "#7948AA",
          "#D45D28",
          "#3555B0",
          "#82542B",
          "#B43576",
          "#138B87",
          "#70536D",
          "#61751B"
        ]
      },
      "legend": null
    },


    "tooltip": [
      {
        "field": "category",
        "type": "nominal",
        "title": "Artwork Category"
      },
      {
        "field": "count",
        "type": "quantitative",
        "title": "Number of Artworks",
        "format": ",.0f"
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null,
      "fill": "#f7f3ed"
    },

    "axis": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans",
      "labelFontSize": 13,
      "titleFontSize": 14,
      "labelColor": "#494943",
      "titleColor": "#252521"
    }
  }
};

vegaEmbed("#category-chart", barChart, {
  actions: false
});


const histogram = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 700,
  "height": 380,
  "background": "#ffffff",
  "padding": 10,

  "data": {
    "url": "data/qagoma_creation_decades.csv",
    "format": {
      "type": "csv",
      "parse": {
        "decade": "number",
        "count": "number"
      }
    }
  },

  "transform": [
    {
      "calculate": "datum.decade + 10",
      "as": "decade_end"
    }
  ],
 
    "mark": {
    "type": "bar",
    "color": "#283F83",
    "opacity": 1
    },


  "encoding": {
    "x": {
      "field": "decade",
      "type": "quantitative",
      "bin": {
        "binned": true,
        "step": 10
      },
      "scale": {
        "domain": [1800, 2030],
        "nice": false
      },
      "title": "Artwork Creation Decade",
      "axis": {
        "format": "d",
        "values": [
          1800, 1850, 1900, 1950, 2000, 2020
        ],
        "labelAngle": 0,
        "labelPadding": 10,
        "titlePadding": 20,
        "grid": false
      }
    },

    "x2": {
      "field": "decade_end"
    },

    "y": {
      "field": "count",
      "type": "quantitative",
      "title": "Number of Artworks",
      "scale": {
        "zero": true
      },
      "axis": {
        "format": ",.0f",
        "tickCount": 7,
        "titlePadding": 20,
        "labelPadding": 8,
        "grid": true,
        "gridColor": "#e3ddd5",
        "domain": false,
        "tickSize": 0
      }
    },

    "tooltip": [
      {
        "field": "decade",
        "type": "quantitative",
        "title": "Decade Starting",
        "format": "d"
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
      "fill": "#ffffff"
    },

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

vegaEmbed("#timeline-chart", histogram, {
  actions: false
});


const boxPlot = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 700,
  "height": 400,
  "background": "#f7f3ed",
  "padding": 10,

  "data": {
    "url": "data/qagoma_acquisition.csv",
    "format": {
      "type": "csv",
      "parse": {
        "acquisition_lag_years": "number"
      }
    }
  },


  "mark": {
    "type": "boxplot",
    "extent": 1.5,
    "size": 24,
    "outliers": false,
    "box": {
      "stroke": "#252521"
    },
    "median": {
      "color": "#FFFFFF",
      "strokeWidth": 2
    },
    "rule": {
      "color": "#252521"
    },
    "ticks": {
      "color": "#252521"
    }
  },


  "encoding": {
    "x": {
      "field": "acquisition_lag_years",
      "type": "quantitative",
      "title": "Years Between Creation and Acquisition",
      "scale": {
        "zero": true
      },
      "axis": {
        "format": ",d",
        "labelPadding": 8,
        "titlePadding": 20,
        "grid": true,
        "gridColor": "#e3ddd5",
        "domain": false,
        "tickSize": 0
      }
    },

    
      "y": {
        "field": "department",
        "type": "nominal",
        "title": null,
        "sort": {
          "op": "median",
          "field": "acquisition_lag_years",
          "order": "ascending"
        },

      "axis": {
        "labelPadding": 12,
        "labelLimit": 240,
        "ticks": false,
        "domain": false
      }
    }
  },

  "config": {
    "view": {
      "stroke": null
    },

    "axis": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans",
      "labelFontSize": 12,
      "titleFontSize": 13,
      "labelColor": "#494943",
      "titleColor": "#252521"
    }
  }
};

vegaEmbed("#boxplot-chart", boxPlot, {
  actions: false
});

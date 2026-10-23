
const acquisitionChart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 700,
  "height": 440,
  "background": "#ffffff",
  "padding": 10,

  "data": {
    "url": "data/qagoma_acquisition_routes_by_department.csv",
    "format": {
      "type": "csv",
      "parse": {
        "artwork_count": "number",
        "percent": "number"
      }
    }
  },

  "mark": {
    "type": "bar"
  },

  "encoding": {
    "x": {
      "field": "percent",
      "type": "quantitative",
      "stack": "zero",
      "title": "Percentage of Artwork Records",
      "scale": {
        "domain": [0, 100]
      },
      "axis": {
        "values": [0, 20, 40, 60, 80, 100],
        "labelExpr": "datum.value + '%'",
        "titlePadding": 20,
        "labelPadding": 8,
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
      "sort": [
        "Australian Art",
        "Contemporary Australian Art",
        "Indigenous Australian Art",
        "International Art",
        "Contemporary International Art",
        "Asian Art",
        "Contemporary Asian Art",
        "Pacific Art"
      ],
      "axis": {
        "labelPadding": 12,
        "labelLimit": 240,
        "ticks": false,
        "domain": false
      }
    },

      
    "color": {
      "field": "acquisition_route",
      "type": "nominal",
      "title": "Acquisition Route",
      "scale": {
        "domain": [
          "Purchase",
          "Gift / Donation",
          "Bequest",
          "Other / Unclear"
        ],
        "range": [
          "#A14C32",
          "#287C91",
          "#916BB2",
          "#8A918F"
        ]
      },
      "legend": {
        "orient": "bottom",
        "columns": 2,
        "labelFontSize": 12,
        "titlePadding": 12
      }
    },


    "order": {
      "field": "acquisition_route",
      "type": "nominal",
      "sort": [
        "Purchase",
        "Gift / Donation",
        "Bequest",
        "Other / Unclear"
      ]
    },

    "tooltip": [
      {
        "field": "department",
        "type": "nominal",
        "title": "Department"
      },
      {
        "field": "acquisition_route",
        "type": "nominal",
        "title": "Acquisition Route"
      },
      {
        "field": "artwork_count",
        "type": "quantitative",
        "title": "Artwork Records",
        "format": ",d"
      },
      {
        "field": "percent",
        "type": "quantitative",
        "title": "Percentage",
        "format": ".1f"
      }
    ]
  },

  "config": {
    "view": {
      "stroke": null
    },

    "axis": {
      "labelFont": "DM Sans",
      "titleFont": "DM Sans",
      "labelFontSize": 12,
      "titleFontSize": 14,
      "labelColor": "#494943",
      "titleColor": "#252521"
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

vegaEmbed("#acquisition-chart", acquisitionChart, {
  actions: false
});

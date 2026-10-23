
const heatmap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",

  "width": 700,
  "height": 360,
  "background": "#ffffff",
  "padding": 10,

  "data": {
    "url": "data/qagoma_category_period_heatmap.csv",
    "format": {
      "type": "csv",
      "parse": {
        "count": "number"
      }
    }
  },

  "mark": {
    "type": "rect",
    "stroke": "#ffffff",
    "strokeWidth": 2
  },

  "encoding": {
    "x": {
      "field": "period",
      "type": "ordinal",
      "sort": [
        "1900-1919",
        "1920-1939",
        "1940-1959",
        "1960-1979",
        "1980-1999",
        "2000-2019"
      ],
      "title": "Artwork Creation Period",
      "axis": {
        "labelAngle": 0,
        "labelPadding": 10,
        "titlePadding": 20,
        "ticks": false,
        "domain": false
      }
    },

    "y": {
      "field": "category",
      "type": "nominal",
      "sort": [
        "Print",
        "Painting",
        "Photograph",
        "Drawing",
        "Ceramic",
        "Sculpture",
        "Fibre",
        "Textile"
      ],
      "title": null,
      "axis": {
        "labelPadding": 12,
        "ticks": false,
        "domain": false
      }
    },

    "color": {
      "field": "count",
      "type": "quantitative",
      "title": "Number of Artworks",
      "scale": {
        "domainMin": 0,
        "scheme": "orangered"
      },
      "legend": {
        "orient": "bottom",
        "direction": "horizontal",
        "gradientLength": 300,
        "titlePadding": 10,
        "format": ",d"
      }
    },

    "tooltip": [
      {
        "field": "period",
        "type": "ordinal",
        "title": "Creation Period"
      },
      {
        "field": "category",
        "type": "nominal",
        "title": "Artwork Category"
      },
      {
        "field": "count",
        "type": "quantitative",
        "title": "Number of Artworks",
        "format": ",d"
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
      "titleFontSize": 13
    }
  }
};

vegaEmbed("#heatmap-chart", heatmap, {
  actions: false
});

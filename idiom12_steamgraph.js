
const streamgraph = {

  $schema:
    "https://vega.github.io/schema/vega-lite/v5.json",

  width: 720,
  height: 360,
  background: "#FFFFFF",

  data: {
    url: "data/qagoma_category_decade_stacked_area.csv",

    format: {
      type: "csv",
      parse: {
        decade: "number",
        count: "number"
      }
    }
  },

  mark: {
    type: "area",
    interpolate: "monotone",
    opacity: 0.95
  },

  encoding: {

    x: {
      field: "decade",
      type: "quantitative",
      title: "Artwork Creation Decade",

      scale: {
        domain: [1900, 2010]
      },

      axis: {
        values: [
          1900, 1920, 1940,
          1960, 1980, 2000, 2010
        ],
        format: "d",
        grid: false,
        titlePadding: 15
      }
    },

    y: {
      field: "count",
      type: "quantitative",
      stack: "center",
      title: null,
      axis: null
    },

    color: {
      field: "category",
      type: "nominal",
      title: "Artwork Category",

      scale: {
        domain: [
          "Print",
          "Painting",
          "Photograph",
          "Drawing",
          "Sculpture",
          "Other categories"
        ],

        range: [
          "#9B4F52",
          "#326D88",
          "#B18A4F",
          "#4E8065",
          "#B66A48",
          "#89847F"
        ]
      },

      legend: {
        orient: "bottom",
        columns: 3,
        labelLimit: 160
      }
    },

    order: {
      field: "category",
      sort: "ascending"
    },

    tooltip: [
      {
        field: "decade",
        type: "quantitative",
        title: "Decade",
        format: "d"
      },
      {
        field: "category",
        type: "nominal",
        title: "Artwork Category"
      },
      {
        field: "count",
        type: "quantitative",
        title: "Artwork Records",
        format: ",d"
      }
    ]

  },

  config: {

    view: {
      stroke: null
    },

    axis: {
      labelFont: "DM Sans",
      titleFont: "DM Sans",
      labelFontSize: 12,
      titleFontSize: 13
    },

    legend: {
      labelFont: "DM Sans",
      titleFont: "DM Sans"
    }

  }

};

vegaEmbed(
  "#streamgraph-chart",
  streamgraph,
  { actions: false }
).catch(error => {

  console.error("Streamgraph error:", error);

  document.getElementById(
    "streamgraph-chart"
  ).textContent =
    "Unable to display streamgraph. Check the data file.";

});

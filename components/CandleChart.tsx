import { useEffect, useRef, useState } from "react";
import CanvasJsReact from "../lib/canvasjs.stock.react";
const CanvasJsStockChart = CanvasJsReact.CanvasJSStockChart;

export default function CandleChart({}) {
  const [state, setState] = useState<any>({
    dataPoints1: [],
    dataPoints2: [],
    dataPoints3: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://canvasjs.com/data/docs/ltcusd2018.json";
      const res = await fetch(url);
      const jsonData = await res.json();

      let dps1 = [],
        dps2 = [],
        dps3 = [];

      for (let i = 0; i < jsonData.length; i++) {
        dps1.push({
          x: new Date(jsonData[i].date),
          y: [Number(jsonData[i].open), Number(jsonData[i].high), Number(jsonData[i].low), Number(jsonData[i].close)],
        });

        dps2.push({ x: new Date(jsonData[i].date), y: Number(jsonData[i].volume_usd) });
        dps3.push({ x: new Date(jsonData[i].date), y: Number(jsonData[i].close) });
      }

      setState({
        dataPoints1: dps1,
        dataPoints2: dps2,
        dataPoints3: dps3,
      });
    };

    fetchData().catch(console.error);
  }, []);

  const chartOptions = {
    theme: "light2",
    title: {
      text: "React StockChart with Date-Time Axis",
    },
    subtitles: [
      {
        text: "Price-Volume Trend",
      },
    ],
    charts: [
      {
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e: any) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e: any) {
              return "";
            },
          },
        },
        axisY: {
          title: "Litecoin Price",
          prefix: "$",
          tickLength: 0,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Price (in USD)",
            yValueFormatString: "$#,###.##",
            type: "candlestick",
            dataPoints: state.dataPoints1,
          },
        ],
      },
      {
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          title: "Volume",
          prefix: "$",
          tickLength: 0,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Volume",
            yValueFormatString: "$#,###.##",
            type: "column",
            dataPoints: state.dataPoints2,
          },
        ],
      },
    ],
    // rangeSelector: {
    //   enabled: false,
    // },
    // navigator: {
    //   enabled: false,
    // },
  };

  const containerProps = {
    width: "100%",
    height: "100vh",
    margin: "auto",
  };

  const chartRef = useRef(null);

  return (
    <div>
      <CanvasJsStockChart ref={chartRef} containerProps={containerProps} options={chartOptions} />
    </div>
  );
}

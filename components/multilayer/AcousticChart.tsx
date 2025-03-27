import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { iResult, iSweep } from "@/lib/data-helpers";
import "@/components/multilayer/AcousticChart.css";
import ChartTR from "@/components/multilayer/ChartTR";

const AcousticChart: React.FC = () => {
  const results = useSelector(
    (state: RootState) => state.model.model.results
  ) as iResult;
  const sweep = useSelector(
    (state: RootState) => state.model.model.sweep
  ) as iSweep;
  const composite = useSelector(
    (state: RootState) => state.model.model.composite
  );

  if (!composite.layers[0]) {
    return <></>;
  }

  const solidT = composite.layers[0].material.category === "solid";
  const solidR =
    composite.layers[composite.layers.length - 1].material.category === "solid";

  const data = sweep.values.map((val, index) => {
    return {
      values: val,
      TsE: results.TsE[index],
      TpE: results.TpE[index],
      RpE: results.RpE[index],
      RsE: results.RsE[index],
    };
  });

  // Calculate the range of x values
  const xRange = Math.max(...sweep.values) - Math.min(...sweep.values);

  // Determine the number of decimal places based on the x range
  const getDecimalPlaces = (range: number) => {
    if (range < 1) return 4;
    if (range < 10) return 3;
    if (range < 100) return 2;
    if (range < 1000) return 1;
    return 0;
  };

  const decimalPlaces = getDecimalPlaces(xRange);

  // Format the x-axis tick values
  const formatXAxis = (tick: number) => tick.toFixed(decimalPlaces);

  const tooltipFormatter = (value: number) => value.toFixed(3);
  const tooltipLabelFormatter = (label: number) =>
    sweep.isFrequency
      ? `Frequency: ${label.toFixed(3)} Hz`
      : `Angle: ${label.toFixed(3)}°`;
  const xAxisLabel = sweep.isFrequency
    ? "Frequency (Hz)"
    : "Incident Angle (°)";

  return (
    <div id="main-chart">
      <h1>Simulation Results</h1>
      <ChartTR
        isShear={false}
        solidT={solidT}
        T={results.Tp}
        solidR={solidR}
        R={results.Rp}
        isFreq={sweep.isFrequency}
        values={sweep.values}
      />
      <ChartTR
        isShear={true}
        solidT={solidT}
        T={results.Ts}
        solidR={solidR}
        R={results.Rs}
        isFreq={sweep.isFrequency}
        values={sweep.values}
      />

      <h2>Energy Transmission and Reflection</h2>
      <div className="chart-div">
        <p className="yaxis">Power (ratio)</p>
        <ResponsiveContainer height={300} width="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="values"
              tickFormatter={formatXAxis}
              label={{
                value: xAxisLabel,
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <YAxis />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={tooltipLabelFormatter}
            />
            <Legend />
            <Line type="monotone" dataKey="RpE" stroke="red" dot={false} />
            <Line type="monotone" dataKey="TpE" stroke="blue" dot={false} />
            {solidR && (
              <Line type="monotone" dataKey="RsE" stroke="orange" dot={false} />
            )}
            {solidT && (
              <Line type="monotone" dataKey="TsE" stroke="green" dot={false} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AcousticChart;

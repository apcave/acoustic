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

const AcousticChart: React.FC = () => {
  const results = useSelector(
    (state: RootState) => state.model.model.results
  ) as iResult;
  const sweep = useSelector(
    (state: RootState) => state.model.model.sweep
  ) as iSweep;

  if (!results) {
    return null;
  }

  if (!sweep) {
    return null;
  }

  const data = sweep.values.map((val, index) => {
    const Rp_abs = Math.sqrt(
      results.Rp.real[index] ** 2 + results.Rp.imag[index] ** 2
    );
    const Tp_abs = Math.sqrt(
      results.Tp.real[index] ** 2 + results.Tp.imag[index] ** 2
    );
    return {
      values: sweep.values[index],
      Rp_r: results.Rp.real[index],
      Rp_i: results.Rp.imag[index],
      "abs(Rp)": Rp_abs,
      Rp_theta: Math.atan2(results.Rp.imag[index], results.Rp.real[index]),
      Rp_db: 20 * Math.log10(Rp_abs),
      Rs_r: results.Rs.real[index],
      Rs_i: results.Rs.imag[index],
      "abs(Tp)": Tp_abs,
      Tp_r: results.Tp.real[index],
      Tp_i: results.Tp.imag[index],
      Ts_r: results.Ts.real[index],
      Ts_i: results.Ts.imag[index],
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
    `Frequency: ${label.toFixed(decimalPlaces)} Hz`;

  return (
    <div>
      <h2>Compression Transmission and Reflection</h2>
      <p>Absolute ratios to incedents pressure.</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="values"
            tickFormatter={formatXAxis}
            label={{
              value: "Frequency (Hz)",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Amplitude (abs)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={tooltipFormatter}
            labelFormatter={tooltipLabelFormatter}
          />
          <Legend />
          <Line type="monotone" dataKey="abs(Rp)" stroke="red" dot={false} />
          <Line type="monotone" dataKey="abs(Tp)" stroke="blue" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AcousticChart;

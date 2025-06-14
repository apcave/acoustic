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
import "@/components/multilayer/AcousticChart.css";
import "@/components/multilayer/ChartTR.css";

import { useState } from "react";

interface iChartTRProps {
  isShear: boolean;
  isAbs: boolean;
  solidT: boolean;
  T: {
    real: number[];
    imag: number[];
  };
  solidR: boolean;
  R: {
    real: number[];
    imag: number[];
  };
  isFreq: boolean;
  values: number[];
}

export default function ChartTR({
  isShear,
  solidT,
  T,
  solidR,
  R,
  isFreq,
  values,
}: iChartTRProps) {
  const [isAbs, setShowAbs] = useState(true);
  const showT = !isShear || (isShear && solidT);
  const showR = !isShear || (isShear && solidR);
  const showChart = (showT && T) || (showR && R);

  if (!showChart) {
    return <div id="acoustic-chart"></div>;
  }

  const R_theta = unwrap(
    R.real.map((_, index) => Math.atan2(R.imag[index], R.real[index]))
  );
  const T_theta = unwrap(
    T.imag.map((_, index) => Math.atan2(T.imag[index], T.real[index]))
  );

  let T_label;
  if (isShear) {
    if (isAbs) {
      T_label = "abs(Ts)";
    } else {
      T_label = "db(Ts)";
    }
  } else {
    if (isAbs) {
      T_label = "abs(Tp)";
    } else {
      T_label = "db(Tp)";
    }
  }

  let R_label;
  if (isShear) {
    if (isAbs) {
      R_label = "abs(Rs)";
    } else {
      R_label = "db(Rs)";
    }
  } else {
    if (isAbs) {
      R_label = "abs(Rp)";
    } else {
      R_label = "db(Rp)";
    }
  }

  const data = T.real.map((_: number, index: number) => {
    const R_abs = Math.sqrt(R.real[index] ** 2 + R.imag[index] ** 2);
    const T_abs = Math.sqrt(T.real[index] ** 2 + T.imag[index] ** 2);

    const safeValue = Math.max(values[index], 1e-6); // Ensure values are positive

    if (isAbs) {
      if (isShear) {
        return {
          values: safeValue,
          "abs(Rs)": R_abs,
          "abs(Ts)": T_abs,
          "theta(Rs)": R_theta[index],
          "theta(Ts)": T_theta[index],
        };
      } else {
        return {
          values: safeValue,
          "abs(Rp)": R_abs,
          "abs(Tp)": T_abs,
          "theta(Rp)": R_theta[index],
          "theta(Tp)": T_theta[index],
        };
      }
    } else {
      if (isShear) {
        return {
          values: safeValue,
          "db(Rs)": 20 * Math.log10(R_abs),
          "db(Ts)": 20 * Math.log10(T_abs),
          "theta(Rs)": R_theta[index],
          "theta(Ts)": T_theta[index],
        };
      } else {
        return {
          values: safeValue,
          "db(Rp)": 20 * Math.log10(R_abs),
          "db(Tp)": 20 * Math.log10(T_abs),
          "theta(Rp)": R_theta[index],
          "theta(Tp)": T_theta[index],
        };
      }
    }
  });
  function handleToggleAbs(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setShowAbs(checked);
  }

  const xRange = Math.max(...values) - Math.min(...values);
  const decimalPlaces = getDecimalPlaces(xRange);
  const formatXAxis = (tick: number) => tick.toFixed(decimalPlaces);

  const tooltipFormatter = (value: number) => value.toFixed(3);
  const tooltipLabelFormatter = (label: number) =>
    isFreq
      ? `Frequency: ${label.toFixed(3)} Hz`
      : `Angle: ${label.toFixed(3)}°`;
  const xAxisLabel = isFreq ? "Frequency (Hz)" : "Incident Angle (°)";

  let chartTitle = isShear ? "Shear" : "Compression";
  chartTitle += " Transmission and Reflection";

  return (
    <>
      <h2>{chartTitle}</h2>
      <div className="toggle-container">
        <input type="checkbox" checked={isAbs} onChange={handleToggleAbs} />
        <label>Show Absolute Values (abs)</label>
      </div>
      <div className="chart-div">
        <p className="yaxis">Amplitude ({isAbs ? "absolute" : "db"})</p>
        <ResponsiveContainer className="chart" width="100%" height={300}>
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

            {showR && (
              <Line
                type="monotone"
                dataKey={R_label}
                stroke={isShear ? "orange" : "red"}
                dot={false}
              />
            )}
            {showT && (
              <Line
                type="monotone"
                dataKey={T_label}
                stroke={isShear ? "green" : "blue"}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-div">
        <p className="yaxis">Relative phase change (degrees)</p>
        <ResponsiveContainer className="chart" width="100%" height={300}>
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
            {showR && (
              <Line
                type="monotone"
                dataKey={isShear ? "theta(Rs)" : "theta(Rp)"}
                stroke={isShear ? "orange" : "red"}
                dot={false}
              />
            )}
            {showT && (
              <Line
                type="monotone"
                dataKey={isShear ? "theta(Ts)" : "theta(Tp)"}
                stroke={isShear ? "green" : "blue"}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function unwrap(angles: number[]): number[] {
  let unwrapped = [...angles];
  const threshold = Math.PI;
  let offset = 0;

  for (let i = 1; i < angles.length; i++) {
    const delta = angles[i] - angles[i - 1];
    if (delta > threshold) {
      offset -= 2 * Math.PI;
    } else if (delta < -threshold) {
      offset += 2 * Math.PI;
    }
    unwrapped[i] += offset;
  }
  unwrapped = unwrapped.map((angle) => (angle * 180) / Math.PI);
  return unwrapped;
}

// Determine the number of decimal places based on the x range
const getDecimalPlaces = (range: number) => {
  if (range < 1) return 4;
  if (range < 10) return 3;
  if (range < 100) return 2;
  if (range < 1000) return 1;
  return 0;
};

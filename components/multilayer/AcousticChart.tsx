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

  const isRSolid = composite.layers[0].material.category === "solid";
  const isTSolid =
    composite.layers[composite.layers.length - 1].material.category === "solid";
  const showShear = isRSolid || isRSolid;

  if (!results) {
    return null;
  }

  if (!sweep) {
    return null;
  }
  const unwrappedRpTheta = unwrap(
    results.Rp.imag.map((_, index) =>
      Math.atan2(results.Rp.imag[index], results.Rp.real[index])
    )
  );
  const unwrappedTpTheta = unwrap(
    results.Tp.imag.map((_, index) =>
      Math.atan2(results.Tp.imag[index], results.Tp.real[index])
    )
  );
  const unwrappedRsTheta = unwrap(
    results.Rs.imag.map((_, index) =>
      Math.atan2(results.Rs.imag[index], results.Rs.real[index])
    )
  );
  const unwrappedTsTheta = unwrap(
    results.Ts.imag.map((_, index) =>
      Math.atan2(results.Ts.imag[index], results.Ts.real[index])
    )
  );

  const data = sweep.values.map((val, index) => {
    const Rp_abs = Math.sqrt(
      results.Rp.real[index] ** 2 + results.Rp.imag[index] ** 2
    );
    const Tp_abs = Math.sqrt(
      results.Tp.real[index] ** 2 + results.Tp.imag[index] ** 2
    );
    const Rs_abs = Math.sqrt(
      results.Rs.real[index] ** 2 + results.Rs.imag[index] ** 2
    );
    const Ts_abs = Math.sqrt(
      results.Ts.real[index] ** 2 + results.Ts.imag[index] ** 2
    );

    return {
      values: sweep.values[index],
      Rp_r: results.Rp.real[index],
      Rp_i: results.Rp.imag[index],
      "abs(Rp)": Rp_abs,
      "theta(Rp)": unwrappedRpTheta[index],
      Rp_db: 20 * Math.log10(Rp_abs),
      Rs_r: results.Rs.real[index],
      Rs_i: results.Rs.imag[index],
      "abs(Rs)": Rs_abs,
      "theta(Rs)": unwrappedRsTheta[index],
      Rs_db: 20 * Math.log10(Rs_abs),
      Tp_r: results.Tp.real[index],
      Tp_i: results.Tp.imag[index],
      "abs(Tp)": Tp_abs,
      "theta(Tp)": unwrappedTpTheta[index],
      Ts_r: results.Ts.real[index],
      Ts_i: results.Ts.imag[index],
      "abs(Ts)": Ts_abs,
      "theta(Ts)": unwrappedTsTheta[index],
      Ts_db: 20 * Math.log10(Ts_abs),
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
  const xAxisLabel = sweep.isFrequency
    ? "Frequency (Hz)"
    : "Incident Angle (°)";

  return (
    <div id="main-chart">
      <h1>Simulation Results</h1>
      <h2>Compression Transmission and Reflection</h2>

      <p className="title">Absolute ratios to incedents pressure.</p>
      <div className="chart-div">
        <p className="yaxis">Amplitude (ratio)</p>
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
            <Line type="monotone" dataKey="abs(Rp)" stroke="red" dot={false} />
            <Line type="monotone" dataKey="abs(Tp)" stroke="blue" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="title">Phase changes relative to incident.</p>
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
            <Line
              type="monotone"
              dataKey="theta(Rp)"
              stroke="red"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="theta(Tp)"
              stroke="blue"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showShear && (
        <>
          <h2>Shear Wave Transmission (Ts) and Reflection (Rs)</h2>
          <p>Absolute ratios to incedents pressure.</p>
          <ResponsiveContainer width="100%" height={300}>
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
              {isRSolid && (
                <Line
                  type="monotone"
                  dataKey="abs(Rs)"
                  stroke="green"
                  dot={false}
                />
              )}
              {isTSolid && (
                <Line
                  type="monotone"
                  dataKey="abs(Ts)"
                  stroke="magenta"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
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
              <YAxis
                label={{
                  value: "Phase Angle (degrees)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={tooltipFormatter}
                labelFormatter={tooltipLabelFormatter}
              />
              <Legend />
              {isRSolid && (
                <Line
                  type="monotone"
                  dataKey="theta(Rs)"
                  stroke="green"
                  dot={false}
                />
              )}
              {isTSolid && (
                <Line
                  type="monotone"
                  dataKey="theta(Ts)"
                  stroke="magenta"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
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
            {isRSolid && (
              <Line type="monotone" dataKey="RsE" stroke="green" dot={false} />
            )}
            {isTSolid && (
              <Line
                type="monotone"
                dataKey="TsE"
                stroke="magenta"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AcousticChart;

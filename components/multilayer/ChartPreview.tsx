import { LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts";
import "@/components/multilayer/AcousticChart.css";
import { iResult } from "@/lib/data-helpers";

interface iChartTRProps {
  results: iResult | null;
}

export default function ChartPreview({ results }: iChartTRProps) {
  if (!results) {
    return <div id="acoustic-chart"></div>;
  }

  const data = results.Tp.real.map((_: number, index: number) => {
    const Rp_abs = Math.sqrt(
      results.Rp.real[index] ** 2 + results.Rp.imag[index] ** 2
    );
    const Tp_abs = Math.sqrt(
      results.Tp.real[index] ** 2 + results.Tp.imag[index] ** 2
    );
    return {
      values: index,
      "abs(Rp)": Rp_abs,
      "abs(Tp)": Tp_abs,
    };
  });

  console.log(data);

  return (
    <div id="acoustic-chart">
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <Line type="monotone" dataKey="abs(Rp)" stroke="red" dot={false} />
          <Line type="monotone" dataKey="abs(Tp)" stroke="blue" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

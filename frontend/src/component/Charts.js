import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Area,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Legend,
  Tooltip,
} from "recharts";
import React from "react";

function Charts(props) {
  let data = props.data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const maxTotalNet = data.reduce((max, obj) => {
    const totalNet = parseFloat(obj.total_net);
    if (totalNet > max) {
      return Math.ceil(totalNet + 1000);
    } else {
      return Math.ceil(max + 1000);
    }
  }, 0);

  const chart = (
    <LineChart
      width={600}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" type="number" domain={[0, maxTotalNet]} />
      <YAxis
        yAxisId="right"
        orientation="right"
        type="number"
        domain={[0, maxTotalNet]}
      />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="total_invested"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="total_net"
        stroke="#82ca9d"
      />
    </LineChart>
  );

  return <div>{chart}</div>;
}

export default Charts;

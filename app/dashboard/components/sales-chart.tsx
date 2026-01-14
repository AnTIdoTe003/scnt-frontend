"use client"

import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const chartData = [
  { date: "Jan 1", sales: 45000, orders: 23 },
  { date: "Jan 5", sales: 52000, orders: 28 },
  { date: "Jan 10", sales: 48000, orders: 25 },
  { date: "Jan 15", sales: 61000, orders: 32 },
  { date: "Jan 20", sales: 55000, orders: 29 },
  { date: "Jan 25", sales: 67000, orders: 35 },
  { date: "Jan 30", sales: 72000, orders: 38 },
]

const chartConfig = {
  sales: {
    label: "Sales (₹)",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
}

export function SalesChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="glass-card rounded-lg border p-3 shadow-lg">
                    <p className="font-space font-semibold mb-2">{payload[0]?.payload?.date}</p>
                    {payload.map((entry: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {entry.dataKey === "sales" ? "Sales" : "Orders"}:
                        </span>
                        <span className="font-bebas gradient-text">
                          {entry.dataKey === "sales"
                            ? `₹${Number(entry.value).toLocaleString()}`
                            : entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSales)"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}


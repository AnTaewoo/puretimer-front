import { TrendingUp } from "lucide-react"
import { Bar, Area, AreaChart, BarChart, LineChart, CartesianGrid, XAxis, Line } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/shadcn/chart"

const chartConfig = {
  realTime: {
    label: "공부시간",
    color: "#1450aa",
  },
  wasteTime: {
    label: "낭비시간",
    color: "#aa1a1a",
  },
} satisfies ChartConfig
export default function Component({data, type}) {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
        {(type == "bar" || !type) && <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="TIME"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return data.length <= 5 ? value : '';
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" className="bg-white" />}
            />
            <Bar dataKey="realTime" fill="var(--color-realTime)" radius={4} />
            <Bar dataKey="wasteTime" fill="var(--color-wasteTime)" radius={4} />
            
          </BarChart>}
          {type == "linear" && <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="TIME"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return data.length <= 5 ? value : '';
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-white" />} />
            <Line
              dataKey="realTime"
              type="monotone"
              stroke="var(--color-realTime)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="wasteTime"
              type="monotone"
              stroke="var(--color-wasteTime)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>}
        {(type == "tooltip") && <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="TIME"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return data.length <= 5 ? value : '';
              }}
            />
            <Bar
              dataKey="realTime"
              stackId="a"
              fill="var(--color-realTime)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="wasteTime"
              stackId="a"
              fill="var(--color-wasteTime)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent className="bg-white" />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          더욱 열심히 공부하여 올립시다 <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
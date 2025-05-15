import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 285 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 203 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 264 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ffffff",
  },
} satisfies ChartConfig

export function WebsiteStats() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-white">Website Statistics</CardTitle>
        <CardDescription className="text-white/80">
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-[400px] aspect-square"
        >
          <RadarChart
            data={chartData}
            outerRadius={90}
            width={400}
            height={400}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              stroke="rgba(255, 255, 255, 0.3)"
              gridType="circle"
            />
            <PolarAngleAxis
              dataKey="month"
              tick={{ fill: 'white', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
            />
            <Radar
              name="Desktop"
              dataKey="desktop"
              stroke="#ffffff"
              fill="#ffffff"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-white/60">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
} 
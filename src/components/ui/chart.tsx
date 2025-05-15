import * as React from "react"
import { TooltipProps } from "recharts"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  className,
  children,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export const ChartTooltip: React.FC<TooltipProps<any, any>> = ({
  active,
  payload,
  label,
  ...props
}) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {payload[0].value}
          </span>
        </div>
      </div>
    </div>
  )
}

export const ChartTooltipContent: React.FC<TooltipProps<any, any>> = (props) => {
  return <ChartTooltip {...props} />
} 
"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface StatusBlockProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  total?: number | string;
  series?: number[];
  chartColor?: string;
  iconWrapperClass?: string;
  chartType?: 'area' | 'bar' | 'line' | 'pie' | 'donut' | 'radialBar';
  opacity?: number;
}

const StatusBlock = ({
  title,
  total,
  className,
  icon,
  series = [800, 600, 1000, 800, 600, 1000, 800, 900],
  chartColor = "#0ce7fa",
  iconWrapperClass,
  chartType = "area",
  opacity = 0.1,
}: StatusBlockProps) => {
  const { theme: mode } = useTheme();

  const chartSeries = [{ data: series }];

  const options: any = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true },
    },
    plotOptions: { bar: { columnWidth: "60%" } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    colors: [chartColor],
    tooltip: { theme: mode === "dark" ? "dark" : "light" },
    grid: { show: false },
    yaxis: { show: false },
    fill: { type: "solid", opacity: [opacity] },
    legend: { show: false },
    xaxis: { show: false },
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        {/* Top: Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center text-2xl bg-default/10",
                iconWrapperClass
              )}
            >
              {icon}
            </div>
          )}
          {title && <div className="text-base font-semibold">{title}</div>}
        </div>

        {/* Bottom: Total + Chart */}
        <div className="flex items-center justify-between">
          {total && (
            <div className="text-2xl font-bold text-blue-700">{total}</div>
          )}
          <div className="max-w-[124px]">
            <Chart
              options={options}
              series={chartSeries}
              type={chartType}
              height={45}
              width={124}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { StatusBlock };

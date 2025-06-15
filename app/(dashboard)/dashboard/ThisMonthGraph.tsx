import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { EarningsData } from "@/app/interface/ThisMonthGraph";

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function monthString(month: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  
  return months[month - 1] || "Invalid Month"; // Adjust for 1-based indexing
}


function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString("en-US", { month: "short" });
  const daysInMonth = date.getDate();
  return Array.from({ length: daysInMonth }, (_, i) => `${monthName} ${i + 1}`);
}


export default function ThisMonthGraph({ earnings }: { earnings: EarningsData}) {
  const theme = useTheme();
  const daysInMonth = getDaysInMonth(earnings.month, earnings.year);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main, 
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          This Month
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              <span>&#8369;</span>{earnings.data.reduce((acc, num) => acc + num, 0).toLocaleString()}
            </Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Earnings per day for the month of {monthString(earnings.month)}
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data: daysInMonth,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: "monthGraph",
              label: "Earnings",
              showMark: false,
              curve: "linear",
              stack: "total",
              stackOrder: "ascending",
              data: earnings.data, // Dynamic data
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Added import
import { CalendarDays, Download, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
// Assuming a Chart component like from ShadCN UI or Recharts
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts" // Example, not included in current scaffold

// Mock data for chart
const spendingData = [
  { name: "Groceries", total: 400 },
  { name: "Utilities", total: 200 },
  { name: "Dining", total: 300 },
  { name: "Transport", total: 150 },
  { name: "Shopping", total: 250 },
  { name: "Healthcare", total: 100 },
];

const incomeData = [
  { name: "Salary", total: 5000 },
  { name: "Freelance", total: 1200 },
  { name: "Investment", total: 300 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
        <p className="text-muted-foreground">Analyze your income, spending, and financial trends.</p>
      </div>

      {/* Report Filters */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Generate Report</CardTitle>
          <CardDescription>Select criteria to generate your financial report.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <Select defaultValue="spending">
              <SelectTrigger id="reportType">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spending">Spending Analysis</SelectItem>
                <SelectItem value="income">Income Summary</SelectItem>
                <SelectItem value="networth">Net Worth Trend</SelectItem>
                <SelectItem value="cashflow">Cash Flow Statement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dateRange">Date Range</Label>
            <Select defaultValue="last30">
              <SelectTrigger id="dateRange">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
                <SelectItem value="monthtodate">Month to Date</SelectItem>
                <SelectItem value="yeartodate">Year to Date</SelectItem>
                <SelectItem value="custom">Custom Range...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:self-end">
            <Button className="w-full md:w-auto"><Download className="mr-2 h-4 w-4"/> Generate & Download</Button>
          </div>
        </CardContent>
      </Card>

      {/* Spending Analysis Example */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Spending by Category (Last 30 Days)</CardTitle>
          <CardDescription>Overview of your expenses across different categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] bg-muted rounded-md flex items-center justify-center">
            {/* Placeholder for Bar Chart */}
            {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer> */}
             <BarChart3 className="h-24 w-24 text-muted-foreground" />
             <p className="text-muted-foreground ml-4">Spending Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Income Summary Example */}
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Income Sources (Last 30 Days)</CardTitle>
          <CardDescription>Breakdown of your income by source.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] bg-muted rounded-md flex items-center justify-center">
             <TrendingUp className="h-24 w-24 text-muted-foreground" />
             <p className="text-muted-foreground ml-4">Income Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

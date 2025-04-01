
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateMaxDrawdown, formatCurrency, generateDrawdownChartData } from "@/utils/calculationUtils";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function MaxDrawdownCalculator() {
  const [peakValue, setPeakValue] = useState<string>("");
  const [troughValue, setTroughValue] = useState<string>("");
  const [result, setResult] = useState<{
    maxDrawdownAmount: string;
    maxDrawdownPercentage: string;
  } | null>(null);
  const [chartData, setChartData] = useState<Array<{name: string; value: number}>>([]);

  const handleCalculate = () => {
    const peak = parseFloat(peakValue);
    const trough = parseFloat(troughValue);

    if (isNaN(peak) || isNaN(trough) || peak <= 0 || trough <= 0 || trough > peak) {
      return;
    }

    const calculationResult = calculateMaxDrawdown(peak, trough);
    setResult(calculationResult);
    setChartData(generateDrawdownChartData(peak, trough));
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Maximum Drawdown Calculator</CardTitle>
        <CardDescription>
          Calculate the percentage decrease from peak to trough in your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="peakValue">Peak Portfolio Value</Label>
            <Input
              id="peakValue"
              type="number"
              placeholder="e.g. 10000.00"
              value={peakValue}
              onChange={(e) => setPeakValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="troughValue">Trough Portfolio Value</Label>
            <Input
              id="troughValue"
              type="number"
              placeholder="e.g. 8000.00"
              value={troughValue}
              onChange={(e) => setTroughValue(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">Calculate</Button>

        {result && (
          <div className="mt-6 space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Maximum Drawdown Amount</p>
                <p className="text-loss font-semibold text-lg">{formatCurrency(result.maxDrawdownAmount)}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Maximum Drawdown Percentage</p>
                <p className="text-loss font-semibold text-lg">{result.maxDrawdownPercentage}%</p>
                <p className="text-xs text-muted-foreground">
                  {parseFloat(result.maxDrawdownPercentage) <= 10 
                    ? "Low Risk" 
                    : parseFloat(result.maxDrawdownPercentage) <= 20 
                    ? "Moderate Risk" 
                    : "High Risk"}
                </p>
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis 
                      domain={[
                        Math.floor(Math.min(...chartData.map(d => d.value)) * 0.9),
                        Math.ceil(Math.max(...chartData.map(d => d.value)) * 1.1)
                      ]}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Portfolio Value']} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

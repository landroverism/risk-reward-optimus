
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateRiskReward, formatCurrency } from "@/utils/calculationUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLossPrice, setStopLossPrice] = useState<string>("");
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>("");
  const [result, setResult] = useState<{
    riskAmount: string;
    rewardAmount: string;
    ratio: string;
    direction: string;
    riskPercentage: string;
    rewardPercentage: string;
  } | null>(null);

  const handleCalculate = () => {
    const entry = parseFloat(entryPrice);
    const stopLoss = parseFloat(stopLossPrice);
    const takeProfit = parseFloat(takeProfitPrice);

    if (isNaN(entry) || isNaN(stopLoss) || isNaN(takeProfit)) {
      return;
    }

    const calculationResult = calculateRiskReward(entry, stopLoss, takeProfit);
    setResult(calculationResult);
  };

  const generateChartData = () => {
    if (!result) return [];

    return [
      {
        name: "Risk",
        value: parseFloat(result.riskAmount),
        fill: "#ef4444" // red
      },
      {
        name: "Reward",
        value: parseFloat(result.rewardAmount),
        fill: "#22c55e" // green
      }
    ];
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex items-center">
          {result?.direction === "long" ? (
            <ArrowUpCircle className="mr-2 h-5 w-5 text-profit" />
          ) : result?.direction === "short" ? (
            <ArrowDownCircle className="mr-2 h-5 w-5 text-loss" />
          ) : null}
          <CardTitle className="text-xl">Risk-to-Reward Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate the risk-to-reward ratio for your trades
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              placeholder="e.g. 100.00"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stopLossPrice">Stop Loss Price</Label>
            <Input
              id="stopLossPrice"
              type="number"
              placeholder="e.g. 95.00"
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="takeProfitPrice">Take Profit Price</Label>
            <Input
              id="takeProfitPrice"
              type="number"
              placeholder="e.g. 110.00"
              value={takeProfitPrice}
              onChange={(e) => setTakeProfitPrice(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">Calculate</Button>

        {result && (
          <div className="mt-6 space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Risk Amount</p>
                <p className="text-loss font-semibold text-lg">{formatCurrency(result.riskAmount)}</p>
                <p className="text-xs text-muted-foreground">({result.riskPercentage}%)</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Reward Amount</p>
                <p className="text-profit font-semibold text-lg">{formatCurrency(result.rewardAmount)}</p>
                <p className="text-xs text-muted-foreground">({result.rewardPercentage}%)</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">Risk-to-Reward Ratio</p>
                <p className={`font-semibold text-lg ${parseFloat(result.ratio) >= 1 ? "text-profit" : "text-loss"}`}>
                  1:{result.ratio}
                </p>
                <p className="text-xs text-muted-foreground">
                  {parseFloat(result.ratio) >= 2 
                    ? "Excellent" 
                    : parseFloat(result.ratio) >= 1 
                    ? "Good" 
                    : "Poor"}
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generateChartData()} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(value)}`, 'Amount']}
                    labelStyle={{ color: '#333' }}
                  />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

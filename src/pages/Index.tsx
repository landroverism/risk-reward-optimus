
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";
import RiskRewardCalculator from "@/components/RiskRewardCalculator";
import MaxDrawdownCalculator from "@/components/MaxDrawdownCalculator";
import { Calculator, TrendingDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full py-6 px-6 flex justify-between items-center border-b">
        <div>
          <h1 className="text-2xl font-bold">Trading Calculator</h1>
          <p className="text-sm text-muted-foreground">Risk & Drawdown Analysis</p>
        </div>
        <ThemeToggle />
      </header>

      <main className="container py-8 px-4 md:px-6 max-w-6xl">
        <Tabs defaultValue="risk-reward" className="w-full space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="risk-reward" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span>Risk-Reward</span>
            </TabsTrigger>
            <TabsTrigger value="max-drawdown" className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4" />
              <span>Max Drawdown</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="risk-reward" className="space-y-4">
            <RiskRewardCalculator />
          </TabsContent>
          
          <TabsContent value="max-drawdown" className="space-y-4">
            <MaxDrawdownCalculator />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6 bg-card">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Trading calculators to help you make better trading decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

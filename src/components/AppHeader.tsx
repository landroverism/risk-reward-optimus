
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AppHeader() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Trading Calculator</h1>
        <p className="text-sm text-muted-foreground">Risk & Drawdown Analysis</p>
      </div>
      <ThemeToggle />
    </header>
  );
}

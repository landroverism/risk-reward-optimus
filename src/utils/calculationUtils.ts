
/**
 * Calculates the risk-to-reward ratio and related values
 */
export const calculateRiskReward = (
  entryPrice: number,
  stopLossPrice: number,
  takeProfitPrice: number
) => {
  // Calculate risk and reward
  const isLong = takeProfitPrice > entryPrice;
  
  // For long positions: entry > stop loss, take profit > entry
  // For short positions: entry < stop loss, take profit < entry
  const risk = Math.abs(entryPrice - stopLossPrice);
  const reward = Math.abs(takeProfitPrice - entryPrice);
  
  // Calculate ratio (reward:risk)
  const ratio = reward / (risk || 1); // Prevent division by zero
  
  return {
    riskAmount: risk.toFixed(2),
    rewardAmount: reward.toFixed(2),
    ratio: ratio.toFixed(2),
    direction: isLong ? "long" : "short",
    riskPercentage: ((risk / entryPrice) * 100).toFixed(2),
    rewardPercentage: ((reward / entryPrice) * 100).toFixed(2)
  };
};

/**
 * Calculates the maximum drawdown
 */
export const calculateMaxDrawdown = (peakValue: number, troughValue: number) => {
  if (peakValue <= 0 || troughValue <= 0) {
    return {
      maxDrawdownAmount: 0,
      maxDrawdownPercentage: 0
    };
  }
  
  const drawdownAmount = peakValue - troughValue;
  const drawdownPercentage = (drawdownAmount / peakValue) * 100;
  
  return {
    maxDrawdownAmount: drawdownAmount.toFixed(2),
    maxDrawdownPercentage: drawdownPercentage.toFixed(2)
  };
};

/**
 * Formats a number as currency
 */
export const formatCurrency = (value: number | string) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue);
};

/**
 * Generates data points for a simple chart visualization
 */
export const generateDrawdownChartData = (peakValue: number, troughValue: number) => {
  // Create a simple chart with 5 points
  const recovery = peakValue + (peakValue - troughValue) * 0.5; // Recovery point (50% of drawdown)
  
  return [
    { name: 'Start', value: peakValue * 0.8 },
    { name: 'Peak', value: peakValue },
    { name: 'Decline', value: (peakValue + troughValue) / 2 },
    { name: 'Trough', value: troughValue },
    { name: 'Recovery', value: recovery }
  ];
};

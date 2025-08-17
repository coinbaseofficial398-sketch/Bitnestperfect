import { useState } from "react";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalculatorResult {
  dailyReturn: number;
  weeklyReturn: number;
  monthlyReturn: number;
  yearlyReturn: number;
  totalReturn: number;
}

export default function ROICalculator() {
  const [investmentAmount, setInvestmentAmount] = useState<string>("1000");
  const [protocol, setProtocol] = useState<string>("loop");
  const [duration, setDuration] = useState<string>("365");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const protocolRates = {
    loop: { apy: 18.5, risk: "Low" },
    "saving-box": { apy: 15.2, risk: "Low" },
    savings: { apy: 12.8, risk: "Very Low" },
    dao: { apy: 22.3, risk: "Medium" },
  };

  const calculateReturns = async () => {
    if (!investmentAmount || !protocol || !duration) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500));

    const principal = parseFloat(investmentAmount);
    const days = parseInt(duration);
    const rate = protocolRates[protocol as keyof typeof protocolRates].apy / 100;
    
    // Compound interest calculation
    const dailyRate = rate / 365;
    const compoundFactor = Math.pow(1 + dailyRate, days);
    const totalReturn = principal * compoundFactor;
    
    const calculatedResult: CalculatorResult = {
      dailyReturn: principal * dailyRate,
      weeklyReturn: principal * Math.pow(1 + dailyRate, 7) - principal,
      monthlyReturn: principal * Math.pow(1 + dailyRate, 30) - principal,
      yearlyReturn: principal * Math.pow(1 + dailyRate, 365) - principal,
      totalReturn: totalReturn - principal,
    };

    setResult(calculatedResult);
    setIsCalculating(false);
  };

  return (
    <section className="mb-8">
      <div className="bg-bitnest-gray rounded-2xl p-6 border border-bitnest-green">
        <div className="flex items-center space-x-2 mb-4">
          <Calculator className="text-bitnest-green" size={20} />
          <h2 className="text-xl font-bold text-bitnest-gradient" data-testid="calculator-title">
            ROI Calculator
          </h2>
        </div>
        
        <p className="text-bitnest-light-gray text-sm mb-6" data-testid="calculator-description">
          Calculate your potential returns with BitNest DeFi protocols
        </p>

        <div className="space-y-4 mb-6">
          {/* Investment Amount */}
          <div>
            <Label htmlFor="amount" className="text-bitnest-green text-sm font-medium">
              Investment Amount (USDT)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="1000"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="bg-bitnest-dark border-bitnest-green text-white placeholder-bitnest-light-gray mt-1"
              data-testid="input-amount"
            />
          </div>

          {/* Protocol Selection */}
          <div>
            <Label htmlFor="protocol" className="text-bitnest-green text-sm font-medium">
              Protocol
            </Label>
            <Select value={protocol} onValueChange={setProtocol}>
              <SelectTrigger 
                className="bg-bitnest-dark border-bitnest-green text-white mt-1"
                data-testid="select-protocol"
              >
                <SelectValue placeholder="Select a protocol" />
              </SelectTrigger>
              <SelectContent className="bg-bitnest-dark border-bitnest-green">
                <SelectItem value="loop" className="text-white hover:bg-bitnest-gray">
                  BitNest Loop ({protocolRates.loop.apy}% APY)
                </SelectItem>
                <SelectItem value="saving-box" className="text-white hover:bg-bitnest-gray">
                  Saving Box ({protocolRates["saving-box"].apy}% APY)
                </SelectItem>
                <SelectItem value="savings" className="text-white hover:bg-bitnest-gray">
                  BitNest Savings ({protocolRates.savings.apy}% APY)
                </SelectItem>
                <SelectItem value="dao" className="text-white hover:bg-bitnest-gray">
                  BitNest DAO ({protocolRates.dao.apy}% APY)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration" className="text-bitnest-green text-sm font-medium">
              Investment Period (Days)
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger 
                className="bg-bitnest-dark border-bitnest-green text-white mt-1"
                data-testid="select-duration"
              >
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-bitnest-dark border-bitnest-green">
                <SelectItem value="30" className="text-white hover:bg-bitnest-gray">30 Days</SelectItem>
                <SelectItem value="90" className="text-white hover:bg-bitnest-gray">90 Days</SelectItem>
                <SelectItem value="180" className="text-white hover:bg-bitnest-gray">180 Days</SelectItem>
                <SelectItem value="365" className="text-white hover:bg-bitnest-gray">1 Year</SelectItem>
                <SelectItem value="730" className="text-white hover:bg-bitnest-gray">2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={calculateReturns}
          disabled={isCalculating || !investmentAmount || !protocol}
          className="w-full bg-bitnest-gradient text-bitnest-dark font-bold py-3 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          data-testid="button-calculate"
        >
          {isCalculating ? "Calculating..." : "Calculate Returns"}
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-bitnest-dark rounded-xl border border-bitnest-green" data-testid="calculator-results">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="text-bitnest-green" size={16} />
              <h4 className="font-semibold text-bitnest-green">Projected Returns</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-bitnest-light-gray">Daily:</span>
                <span className="text-bitnest-green font-semibold">
                  ${result.dailyReturn.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-bitnest-light-gray">Weekly:</span>
                <span className="text-bitnest-green font-semibold">
                  ${result.weeklyReturn.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-bitnest-light-gray">Monthly:</span>
                <span className="text-bitnest-green font-semibold">
                  ${result.monthlyReturn.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-bitnest-light-gray">Yearly:</span>
                <span className="text-bitnest-green font-semibold">
                  ${result.yearlyReturn.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-bitnest-gray">
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Total Return:</span>
                <span className="text-bitnest-gradient font-bold text-lg">
                  ${result.totalReturn.toFixed(2)}
                </span>
              </div>
            </div>

            {protocol && (
              <div className="mt-3 text-xs text-bitnest-light-gray">
                Risk Level: {protocolRates[protocol as keyof typeof protocolRates].risk} • 
                APY: {protocolRates[protocol as keyof typeof protocolRates].apy}%
              </div>
            )}
          </div>
        )}

        <div className="mt-4 text-xs text-bitnest-light-gray text-center">
          <p>* Calculations are estimates based on current APY rates and assume compound interest.</p>
          <p>Past performance does not guarantee future results.</p>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years = 30
): number {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export function FinancialOverview({ price }: { price: number }) {
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.2);

  const downPayment = (price * downPercent) / 100;
  const loanAmount = price - downPayment;

  const monthly = useMemo(
    () => calculateMonthlyPayment(loanAmount, interestRate),
    [loanAmount, interestRate]
  );

  return (
    <div className="border border-[#8C7B6E]/10 bg-[#f9f9f9] p-8">
      <h4 className="mb-6 font-serif text-2xl text-[#4a3829]">
        Financial Overview
      </h4>
      <div className="space-y-6">
        <div>
          <div className="mb-2 flex justify-between text-xs text-[#4e453e]">
            <span>DOWN PAYMENT</span>
            <span>
              {downPercent}% ({formatCurrency(downPayment)})
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={50}
            step={1}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-[#E8E2D9] accent-[#4a3829]"
          />
        </div>
        <div>
          <div className="mb-2 flex justify-between text-xs text-[#4e453e]">
            <span>INTEREST RATE</span>
            <span>{interestRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={4}
            max={9}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-[#E8E2D9] accent-[#4a3829]"
          />
        </div>
        <div className="border-t border-[#8C7B6E]/10 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#4e453e]">
              MONTHLY ESTIMATE
            </p>
            <p className="font-serif text-2xl text-[#4a3829]">
              {formatCurrency(monthly)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

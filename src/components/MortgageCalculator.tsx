import { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { monthlyPayment } from '../lib/format';

interface MortgageCalculatorProps {
  price: number;
}

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function MortgageCalculator({ price }: MortgageCalculatorProps) {
  const [downPercent, setDownPercent] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const { principal, monthly, totalInterest } = useMemo(() => {
    const down = (downPercent / 100) * price;
    const loan = Math.max(price - down, 0);
    const payment = monthlyPayment(loan, rate, years);
    return {
      principal: loan,
      monthly: payment,
      totalInterest: payment * years * 12 - loan,
    };
  }, [price, downPercent, rate, years]);

  return (
    <div className="border border-navy/10 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center border border-navy/15 text-ocean">
          <Calculator size={18} />
        </span>
        <h3 className="font-display text-base font-bold uppercase tracking-[0.1em] text-navy">
          Financing Estimate
        </h3>
      </div>

      <div className="mt-7 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="mc-down" className="field-label mb-0">
              Down Payment
            </label>
            <span className="font-display text-sm font-bold text-navy">
              {downPercent}% · {currency((downPercent / 100) * price)}
            </span>
          </div>
          <input
            id="mc-down"
            type="range"
            min={5}
            max={70}
            step={1}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="mt-3 w-full accent-ocean"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="mc-rate" className="field-label">
              Interest Rate (%)
            </label>
            <input
              id="mc-rate"
              type="number"
              min={0}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="mc-term" className="field-label">
              Term (Years)
            </label>
            <select
              id="mc-term"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="field"
            >
              {[10, 15, 20, 25, 30].map((t) => (
                <option key={t} value={t}>
                  {t} years
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-7 border-t border-navy/10 pt-6">
        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-navy/45">
          Estimated Monthly Payment
        </div>
        <div className="mt-2 font-display text-3xl font-extrabold text-navy">
          {currency(monthly)}
        </div>
        <dl className="mt-4 space-y-2 text-xs text-navy/55">
          <div className="flex justify-between">
            <dt>Loan amount</dt>
            <dd>{currency(principal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Total interest over term</dt>
            <dd>{currency(totalInterest)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-[0.68rem] leading-relaxed text-navy/40">
          Estimate only. Excludes taxes, insurance and fees — speak with an advisor for a
          tailored quotation.
        </p>
      </div>
    </div>
  );
}

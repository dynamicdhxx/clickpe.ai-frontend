"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ProductFilters as Filters } from "@/lib/validations";
import type { LoanType } from "@/types/database";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
} from "lucide-react";

interface ProductFiltersProps {
  onFilterChange: (filters: Filters) => void;
  banks: string[];
  initialFilters?: Filters;
}

const loanTypes: { value: LoanType; label: string }[] = [
  { value: "personal", label: "Personal Loan" },
  { value: "education", label: "Education Loan" },
  { value: "vehicle", label: "Vehicle Loan" },
  { value: "home", label: "Home Loan" },
  { value: "credit_line", label: "Credit Line" },
  { value: "debt_consolidation", label: "Debt Consolidation" },
];

export function ProductFilters({
  onFilterChange,
  banks,
  initialFilters = {},
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [bankSearch, setBankSearch] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // APR range state
  const [aprRange, setAprRange] = useState<[number, number]>([
    filters.minApr ?? 0,
    filters.maxApr ?? 25,
  ]);

  // Income range state
  const [incomeRange, setIncomeRange] = useState<number>(
    filters.minIncome ?? 0
  );

  // Credit score state
  const [creditScore, setCreditScore] = useState<number>(
    filters.minCreditScore ?? 300
  );

  // Debounced filter update
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, onFilterChange]);

  const handleBankSearch = (value: string) => {
    setBankSearch(value);
    setFilters((prev) => ({
      ...prev,
      bank: value || undefined,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      type: value === "all" ? undefined : (value as LoanType),
    }));
  };

  const handleAprChange = (values: number[]) => {
    const [min, max] = values;
    setAprRange([min, max]);
    setFilters((prev) => ({
      ...prev,
      minApr: min > 0 ? min : undefined,
      maxApr: max < 25 ? max : undefined,
    }));
  };

  const handleIncomeChange = (values: number[]) => {
    const value = values[0];
    setIncomeRange(value);
    setFilters((prev) => ({
      ...prev,
      minIncome: value > 0 ? value : undefined,
    }));
  };

  const handleCreditScoreChange = (values: number[]) => {
    const value = values[0];
    setCreditScore(value);
    setFilters((prev) => ({
      ...prev,
      minCreditScore: value > 300 ? value : undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setBankSearch("");
    setAprRange([0, 25]);
    setIncomeRange(0);
    setCreditScore(300);
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined
  ).length;

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  };

  return (
    <div className="space-y-4 bg-card/50 backdrop-blur-sm border rounded-xl p-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by bank name..."
            value={bankSearch}
            onChange={(e) => handleBankSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.type ?? "all"}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Loan Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {loanTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={showAdvanced ? "secondary" : "outline"}
          size="icon"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="shrink-0"
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.bank && (
            <Badge variant="secondary" className="gap-1">
              Bank: {filters.bank}
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, bank: undefined }))
                }
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.type && (
            <Badge variant="secondary" className="gap-1">
              Type: {loanTypes.find((t) => t.value === filters.type)?.label}
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, type: undefined }))
                }
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(filters.minApr !== undefined || filters.maxApr !== undefined) && (
            <Badge variant="secondary" className="gap-1">
              APR: {filters.minApr ?? 0}% - {filters.maxApr ?? 25}%
              <button
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    minApr: undefined,
                    maxApr: undefined,
                  }));
                  setAprRange([0, 25]);
                }}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.minIncome !== undefined && (
            <Badge variant="secondary" className="gap-1">
              Min Income: {formatCurrency(filters.minIncome)}
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, minIncome: undefined }));
                  setIncomeRange(0);
                }}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.minCreditScore !== undefined && (
            <Badge variant="secondary" className="gap-1">
              Credit Score: {filters.minCreditScore}+
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, minCreditScore: undefined }));
                  setCreditScore(300);
                }}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvanced && (
        <>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* APR Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">APR Range</Label>
                <span className="text-xs text-muted-foreground">
                  {aprRange[0]}% - {aprRange[1]}%
                </span>
              </div>
              <Slider
                value={aprRange}
                min={0}
                max={25}
                step={0.5}
                onValueChange={handleAprChange}
                className="w-full"
              />
            </div>

            {/* Minimum Income */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Max Required Income</Label>
                <span className="text-xs text-muted-foreground">
                  {incomeRange === 0 ? "Any" : formatCurrency(incomeRange)}
                </span>
              </div>
              <Slider
                value={[incomeRange]}
                min={0}
                max={100000}
                step={5000}
                onValueChange={handleIncomeChange}
                className="w-full"
              />
            </div>

            {/* Minimum Credit Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Max Credit Score Req</Label>
                <span className="text-xs text-muted-foreground">
                  {creditScore === 300 ? "Any" : `${creditScore}+`}
                </span>
              </div>
              <Slider
                value={[creditScore]}
                min={300}
                max={850}
                step={10}
                onValueChange={handleCreditScoreChange}
                className="w-full"
              />
            </div>
          </div>
        </>
      )}

      {/* Bank Suggestions */}
      {bankSearch && banks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {banks
            .filter((bank) =>
              bank.toLowerCase().includes(bankSearch.toLowerCase())
            )
            .slice(0, 5)
            .map((bank) => (
              <Button
                key={bank}
                variant="outline"
                size="sm"
                onClick={() => handleBankSearch(bank)}
                className="text-xs"
              >
                {bank}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}



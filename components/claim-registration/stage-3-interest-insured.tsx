"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Search, AlertCircle } from "lucide-react";
import type { ClaimFormData } from "@/lib/claim-types";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Stage3InterestInsuredProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  onComplete: (fieldsToLock: string[]) => void;
}

interface InterestInsuredResult {
  id: string;
  code: string;
  interestInsured: string;
  categoryInsured: string;
  description: string;
}

// Mock API function
const searchInterestInsuredAPI = async (
  jenisPolis: string
): Promise<InterestInsuredResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const queryName =
    jenisPolis === "Conventional"
      ? "LEASINGNET_INTEREST"
      : "LEASINGNET_INTEREST_SYA";
  console.log(`Calling ${queryName}`);

  return [
    {
      id: "INT-001",
      code: "INT001",
      interestInsured: "Motor Vehicle - Private",
      categoryInsured: "Vehicle",
      description: "Private vehicle insurance",
    },
    {
      id: "INT-002",
      code: "INT002",
      interestInsured: "Motor Vehicle - Commercial",
      categoryInsured: "Vehicle",
      description: "Commercial vehicle insurance",
    },
    {
      id: "INT-003",
      code: "INT003",
      interestInsured: "Property - Building",
      categoryInsured: "Property",
      description: "Building insurance",
    },
    {
      id: "INT-004",
      code: "INT004",
      interestInsured: "Personal Accident",
      categoryInsured: "Life",
      description: "Personal accident coverage",
    },
  ];
};

export function Stage3InterestInsured({
  formData,
  updateFormData,
  onComplete,
}: Stage3InterestInsuredProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<InterestInsuredResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchInterestInsuredAPI(formData.jenisPolis);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: InterestInsuredResult) => {
    setSelectedId(item.id);
    updateFormData({
      interestInsured: item.interestInsured,
      categoryInsured: item.categoryInsured,
    });
    onComplete(["interestInsured", "categoryInsured"]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Parameters</CardTitle>
          <CardDescription>
            Query:{" "}
            {formData.jenisPolis === "Conventional"
              ? "LEASINGNET_INTEREST"
              : "LEASINGNET_INTEREST_SYA"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Jenis Polis:</span>
              <p className="font-medium">{formData.jenisPolis || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Cause of Loss:</span>
              <p className="font-medium">{formData.causeOfLoss || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Parameter:</span>
              <p className="font-medium">COL, ANO</p>
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Interest Insured
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search Results</CardTitle>
            <CardDescription>
              {results.length > 0
                ? `Found ${results.length} interest(s) insured. Click + to select.`
                : "No results found."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : results.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>No interest insured found.</AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Interest Insured</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item) => (
                    <TableRow
                      key={item.id}
                      className={selectedId === item.id ? "bg-primary/10" : ""}
                    >
                      <TableCell>
                        <Button
                          size="sm"
                          variant={
                            selectedId === item.id ? "default" : "outline"
                          }
                          onClick={() => handleSelect(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono">{item.code}</TableCell>
                      <TableCell className="font-medium">
                        {item.interestInsured}
                      </TableCell>
                      <TableCell>{item.categoryInsured}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

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

interface Stage2CauseOfLossProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  onComplete: (fieldsToLock: string[]) => void;
}

interface CauseOfLossResult {
  id: string;
  code: string;
  description: string;
  category: string;
}

// Mock API function
const searchCauseOfLossAPI = async (
  jenisPolis: string
): Promise<CauseOfLossResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const queryName =
    jenisPolis === "Conventional" ? "LEASINGNET_COL" : "LEASINGNET_COL_SYA";
  console.log(`Calling ${queryName}`);

  return [
    {
      id: "COL-001",
      code: "COL001",
      description: "Accident - Collision",
      category: "Motor Vehicle",
    },
    {
      id: "COL-002",
      code: "COL002",
      description: "Theft - Total Loss",
      category: "Motor Vehicle",
    },
    {
      id: "COL-003",
      code: "COL003",
      description: "Fire Damage",
      category: "Property",
    },
    {
      id: "COL-004",
      code: "COL004",
      description: "Natural Disaster - Flood",
      category: "Property",
    },
    {
      id: "COL-005",
      code: "COL005",
      description: "Vandalism",
      category: "Motor Vehicle",
    },
  ];
};

export function Stage2CauseOfLoss({
  formData,
  updateFormData,
  onComplete,
}: Stage2CauseOfLossProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CauseOfLossResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchCauseOfLossAPI(formData.jenisPolis);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: CauseOfLossResult) => {
    setSelectedId(item.id);
    updateFormData({
      causeOfLoss: item.description,
    });
    onComplete(["causeOfLoss"]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Parameters</CardTitle>
          <CardDescription>
            Query:{" "}
            {formData.jenisPolis === "Conventional"
              ? "LEASINGNET_COL"
              : "LEASINGNET_COL_SYA"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Jenis Polis:</span>
              <p className="font-medium">{formData.jenisPolis || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Parameter:</span>
              <p className="font-medium">ANO</p>
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
                Search Cause of Loss
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
                ? `Found ${results.length} cause(s) of loss. Click + to select.`
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
                <AlertDescription>No causes of loss found.</AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
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
                        {item.description}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
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

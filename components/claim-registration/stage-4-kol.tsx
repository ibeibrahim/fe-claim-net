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

interface Stage4KOLProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  onComplete: (fieldsToLock: string[]) => void;
}

interface KOLResult {
  id: string;
  code: string;
  kolName: string;
  type: string;
  description: string;
}

// Mock API function
const searchKOLAPI = async (jenisPolis: string): Promise<KOLResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const queryName =
    jenisPolis === "Conventional" ? "LEASINGNET_KOL" : "LEASINGNET_KOL_SYA";
  console.log(`Calling ${queryName}`);

  return [
    {
      id: "KOL-001",
      code: "KOL001",
      kolName: "Total Loss",
      type: "Vehicle",
      description: "Complete vehicle loss",
    },
    {
      id: "KOL-002",
      code: "KOL002",
      kolName: "Partial Loss",
      type: "Vehicle",
      description: "Partial damage claim",
    },
    {
      id: "KOL-003",
      code: "KOL003",
      kolName: "Third Party Liability",
      type: "Liability",
      description: "Third party damage",
    },
    {
      id: "KOL-004",
      code: "KOL004",
      kolName: "Personal Injury",
      type: "Personal",
      description: "Bodily injury claim",
    },
  ];
};

export function Stage4KOL({
  formData,
  updateFormData,
  onComplete,
}: Stage4KOLProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<KOLResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchKOLAPI(formData.jenisPolis);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: KOLResult) => {
    setSelectedId(item.id);
    updateFormData({
      kol: item.kolName,
    });
    onComplete(["kol"]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Parameters</CardTitle>
          <CardDescription>
            Query:{" "}
            {formData.jenisPolis === "Conventional"
              ? "LEASINGNET_KOL"
              : "LEASINGNET_KOL_SYA"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Jenis Polis:</span>
              <p className="font-medium">{formData.jenisPolis || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Interest Insured:</span>
              <p className="font-medium">{formData.interestInsured || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Parameter:</span>
              <p className="font-medium">TOI</p>
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
                Search KOL
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
                ? `Found ${results.length} KOL(s). Click + to select.`
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
                <AlertDescription>No KOL found.</AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>KOL Name</TableHead>
                    <TableHead>Type</TableHead>
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
                        {item.kolName}
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
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

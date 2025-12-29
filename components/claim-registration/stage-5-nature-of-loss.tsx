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

interface Stage5NatureOfLossProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  onComplete: (fieldsToLock: string[]) => void;
}

interface NatureOfLossResult {
  id: string;
  code: string;
  natureOfLoss: string;
  nilaiPertanggungan: string;
  description: string;
}

// Mock API function
const searchNatureOfLossAPI = async (
  jenisPolis: string
): Promise<NatureOfLossResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const queryName =
    jenisPolis === "Conventional" ? "LEASINGNET_NOC" : "LEASINGNET_NOC_SYA";
  console.log(`Calling ${queryName}`);

  return [
    {
      id: "NOL-001",
      code: "NOL001",
      natureOfLoss: "Total Loss - Accident",
      nilaiPertanggungan: "250000000",
      description: "Complete loss due to accident",
    },
    {
      id: "NOL-002",
      code: "NOL002",
      natureOfLoss: "Total Loss - Theft",
      nilaiPertanggungan: "250000000",
      description: "Complete loss due to theft",
    },
    {
      id: "NOL-003",
      code: "NOL003",
      natureOfLoss: "Partial Loss - Body Damage",
      nilaiPertanggungan: "50000000",
      description: "Partial body damage repair",
    },
    {
      id: "NOL-004",
      code: "NOL004",
      natureOfLoss: "Partial Loss - Engine",
      nilaiPertanggungan: "75000000",
      description: "Engine damage repair",
    },
  ];
};

export function Stage5NatureOfLoss({
  formData,
  updateFormData,
  onComplete,
}: Stage5NatureOfLossProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<NatureOfLossResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchNatureOfLossAPI(formData.jenisPolis);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: NatureOfLossResult) => {
    setSelectedId(item.id);
    updateFormData({
      natureOfLoss: item.natureOfLoss,
      nilaiPertanggungan: item.nilaiPertanggungan,
    });
    onComplete(["natureOfLoss", "nilaiPertanggungan"]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Parameters</CardTitle>
          <CardDescription>
            Query:{" "}
            {formData.jenisPolis === "Conventional"
              ? "LEASINGNET_NOC"
              : "LEASINGNET_NOC_SYA"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Jenis Polis:</span>
              <p className="font-medium">{formData.jenisPolis || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">KOL:</span>
              <p className="font-medium">{formData.kol || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tanggal Kejadian:</span>
              <p className="font-medium">{formData.tanggalKejadian || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Parameters:</span>
              <p className="font-medium">lossdate, TOI, COL, ANO</p>
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
                Search Nature of Loss
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
                ? `Found ${results.length} nature of loss. Click + to select.`
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
                <AlertDescription>No nature of loss found.</AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Nature of Loss</TableHead>
                    <TableHead>Nilai Pertanggungan</TableHead>
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
                        {item.natureOfLoss}
                      </TableCell>
                      <TableCell>
                        Rp{" "}
                        {Number.parseInt(
                          item.nilaiPertanggungan
                        ).toLocaleString()}
                      </TableCell>
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

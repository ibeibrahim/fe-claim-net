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
import { Loader2, Plus, Search, AlertCircle, Calculator } from "lucide-react";
import type { ClaimFormData } from "@/lib/claim-types";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Stage6DeductibleProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  onComplete: (fieldsToLock: string[]) => void;
}

interface DeductibleResult {
  id: string;
  kategori: string;
  deskripsi: string;
  jenis: string;
  nilaiTsiPercent: string;
  nilaiClaimPercent: string;
  min: string;
  maks: string;
  deductibleValue: string;
}

// Mock API function
const searchDeductibleAPI = async (
  jenisPolis: string
): Promise<DeductibleResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const queryName =
    jenisPolis === "Conventional"
      ? "LEASINGNET_DEDUCTIBLE"
      : "LEASINGNET_DEDUCTIBLE_SYA";
  console.log(`Calling ${queryName}`);

  return [
    {
      id: "DED-001",
      kategori: "Standard",
      deskripsi: "Standard Deductible for Total Loss",
      jenis: "Percentage",
      nilaiTsiPercent: "0.5",
      nilaiClaimPercent: "10",
      min: "500000",
      maks: "5000000",
      deductibleValue: "2500000",
    },
    {
      id: "DED-002",
      kategori: "Premium",
      deskripsi: "Premium Deductible for Total Loss",
      jenis: "Fixed",
      nilaiTsiPercent: "0",
      nilaiClaimPercent: "5",
      min: "250000",
      maks: "2500000",
      deductibleValue: "1250000",
    },
    {
      id: "DED-003",
      kategori: "Basic",
      deskripsi: "Basic Deductible for Partial Loss",
      jenis: "Percentage",
      nilaiTsiPercent: "1",
      nilaiClaimPercent: "15",
      min: "750000",
      maks: "7500000",
      deductibleValue: "3750000",
    },
  ];
};

export function Stage6Deductible({
  formData,
  updateFormData,
  onComplete,
}: Stage6DeductibleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DeductibleResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchDeductibleAPI(formData.jenisPolis);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: DeductibleResult) => {
    setSelectedId(item.id);

    // Calculate Nilai Penggantian = Nilai Pertanggungan - Deductible
    const nilaiPertanggungan =
      Number.parseInt(formData.nilaiPertanggungan) || 0;
    const deductible = Number.parseInt(item.deductibleValue) || 0;
    const nilaiPenggantian = Math.max(0, nilaiPertanggungan - deductible);

    updateFormData({
      deductibleKategori: item.kategori,
      deductibleDeskripsi: item.deskripsi,
      deductibleJenis: item.jenis,
      deductibleNilaiTsiPercent: item.nilaiTsiPercent,
      deductibleNilaiClaimPercent: item.nilaiClaimPercent,
      deductibleMin: item.min,
      deductibleMaks: item.maks,
      deductibleValue: item.deductibleValue,
      nilaiPenggantian: nilaiPenggantian.toString(),
    });

    onComplete([
      "deductibleKategori",
      "deductibleDeskripsi",
      "deductibleJenis",
      "deductibleNilaiTsiPercent",
      "deductibleNilaiClaimPercent",
      "deductibleMin",
      "deductibleMaks",
      "deductibleValue",
      "nilaiPenggantian",
    ]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Parameters</CardTitle>
          <CardDescription>
            Query:{" "}
            {formData.jenisPolis === "Conventional"
              ? "LEASINGNET_DEDUCTIBLE"
              : "LEASINGNET_DEDUCTIBLE_SYA"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Jenis Polis:</span>
              <p className="font-medium">{formData.jenisPolis || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Nature of Loss:</span>
              <p className="font-medium">{formData.natureOfLoss || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">
                Nilai Pertanggungan:
              </span>
              <p className="font-medium">
                {formData.nilaiPertanggungan
                  ? `Rp ${Number.parseInt(
                      formData.nilaiPertanggungan
                    ).toLocaleString()}`
                  : "-"}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Parameters:</span>
              <p className="font-medium">lossdate, COL, ANO</p>
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
                Search Deductible
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
                ? `Found ${results.length} deductible option(s). Click + to select and auto-calculate.`
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
                <AlertDescription>
                  No deductible options found.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>TSI %</TableHead>
                      <TableHead>Claim %</TableHead>
                      <TableHead>Min</TableHead>
                      <TableHead>Maks</TableHead>
                      <TableHead>Deductible</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((item) => (
                      <TableRow
                        key={item.id}
                        className={
                          selectedId === item.id ? "bg-primary/10" : ""
                        }
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
                        <TableCell className="font-medium">
                          {item.kategori}
                        </TableCell>
                        <TableCell>{item.jenis}</TableCell>
                        <TableCell>{item.nilaiTsiPercent}%</TableCell>
                        <TableCell>{item.nilaiClaimPercent}%</TableCell>
                        <TableCell>
                          Rp {Number.parseInt(item.min).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          Rp {Number.parseInt(item.maks).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-bold">
                          Rp{" "}
                          {Number.parseInt(
                            item.deductibleValue
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {selectedId && formData.nilaiPenggantian && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="h-5 w-5 text-primary" />
                        <span className="font-semibold">
                          Calculation Summary
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Nilai Pertanggungan:
                          </span>
                          <p className="font-medium text-lg">
                            Rp{" "}
                            {Number.parseInt(
                              formData.nilaiPertanggungan
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Deductible:
                          </span>
                          <p className="font-medium text-lg text-destructive">
                            - Rp{" "}
                            {Number.parseInt(
                              formData.deductibleValue
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Nilai Penggantian:
                          </span>
                          <p className="font-bold text-xl text-primary">
                            Rp{" "}
                            {Number.parseInt(
                              formData.nilaiPenggantian
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

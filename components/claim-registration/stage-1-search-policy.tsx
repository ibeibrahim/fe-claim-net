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
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Search, AlertCircle } from "lucide-react";
import type { ClaimFormData } from "@/lib/claim-types";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Stage1SearchPolicyProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  onComplete: (fieldsToLock: string[]) => void;
}

interface PolicyResult {
  id: string;
  nomorPolis: string;
  nomorSertifikat: string;
  namaNasabah: string;
  tanggalLahir: string;
  alamatNasabah: string;
  hp1: string;
  tipe: string;
  warna: string;
  penggunaan: string;
  tahunPembuatan: string;
  nomorPolisi: string;
  nomorRangka: string;
  nomorMesin: string;
  tanggalMulaiPolis: string;
  tanggalAkhirPolis: string;
  outstandingPremi: string;
  uangPertanggungan: string;
}

// Mock API function
const searchPolicyAPI = async (
  jenisPolis: string,
  noKontrak: string,
  kategoriKlaim: string,
  tanggalKejadian: string
): Promise<PolicyResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const queryName =
    jenisPolis === "Conventional" ? "LEASINGNET_DATA" : "LEASINGNET_DATA_SYA";
  console.log(`Calling ${queryName} with params:`, {
    noKontrak,
    kategoriKlaim,
    tanggalKejadian,
  });

  return [
    {
      id: "POL-001",
      nomorPolis: "POL-2024-001234",
      nomorSertifikat: "CERT-2024-5678",
      namaNasabah: "John Doe",
      tanggalLahir: "1990-05-15",
      alamatNasabah: "Jl. Sudirman No. 123, Jakarta Selatan",
      hp1: "081234567890",
      tipe: "Sedan",
      warna: "Hitam",
      penggunaan: "Pribadi",
      tahunPembuatan: "2022",
      nomorPolisi: "B 1234 ABC",
      nomorRangka: "MHK123456789",
      nomorMesin: "ENG987654321",
      tanggalMulaiPolis: "2024-01-01",
      tanggalAkhirPolis: "2025-01-01",
      outstandingPremi: "0",
      uangPertanggungan: "250000000",
    },
    {
      id: "POL-002",
      nomorPolis: "POL-2024-001235",
      nomorSertifikat: "CERT-2024-5679",
      namaNasabah: "Jane Smith",
      tanggalLahir: "1985-08-20",
      alamatNasabah: "Jl. Gatot Subroto No. 456, Jakarta Pusat",
      hp1: "082345678901",
      tipe: "SUV",
      warna: "Putih",
      penggunaan: "Pribadi",
      tahunPembuatan: "2023",
      nomorPolisi: "B 5678 DEF",
      nomorRangka: "MHK987654321",
      nomorMesin: "ENG123456789",
      tanggalMulaiPolis: "2024-03-15",
      tanggalAkhirPolis: "2025-03-15",
      outstandingPremi: "500000",
      uangPertanggungan: "350000000",
    },
  ];
};

export function Stage1SearchPolicy({
  formData,
  updateFormData,
  onComplete,
}: Stage1SearchPolicyProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PolicyResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchPolicyAPI(
        formData.jenisPolis,
        formData.noKontrak,
        formData.kategoriKlaim,
        formData.tanggalKejadian
      );
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (policy: PolicyResult) => {
    setSelectedId(policy.id);
    updateFormData({
      nomorPolis: policy.nomorPolis,
      nomorSertifikat: policy.nomorSertifikat,
      namaNasabah: policy.namaNasabah,
      tanggalLahir: policy.tanggalLahir,
      alamatNasabah: policy.alamatNasabah,
      hp1: policy.hp1,
      tipe: policy.tipe,
      warna: policy.warna,
      penggunaan: policy.penggunaan,
      tahunPembuatan: policy.tahunPembuatan,
      nomorPolisi: policy.nomorPolisi,
      nomorRangka: policy.nomorRangka,
      nomorMesin: policy.nomorMesin,
      tanggalMulaiPolis: policy.tanggalMulaiPolis,
      tanggalAkhirPolis: policy.tanggalAkhirPolis,
      outstandingPremi: policy.outstandingPremi,
      uangPertanggungan: policy.uangPertanggungan,
    });

    onComplete([
      "nomorPolis",
      "nomorSertifikat",
      "namaNasabah",
      "tanggalLahir",
      "alamatNasabah",
      "hp1",
      "tipe",
      "warna",
      "penggunaan",
      "tahunPembuatan",
      "nomorPolisi",
      "nomorRangka",
      "nomorMesin",
      "tanggalMulaiPolis",
      "tanggalAkhirPolis",
      "outstandingPremi",
      "uangPertanggungan",
    ]);
  };

  return (
    <div className="space-y-6">
      {/* API Parameters Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Parameters</CardTitle>
          <CardDescription>
            Query:{" "}
            {formData.jenisPolis === "Conventional"
              ? "LEASINGNET_DATA"
              : "LEASINGNET_DATA_SYA"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Jenis Polis:</span>
              <p className="font-medium">{formData.jenisPolis || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">No Kontrak:</span>
              <p className="font-medium">{formData.noKontrak || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Kategori Klaim:</span>
              <p className="font-medium">{formData.kategoriKlaim || "-"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tanggal Kejadian:</span>
              <p className="font-medium">{formData.tanggalKejadian || "-"}</p>
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
                Search Policy
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Search Results</CardTitle>
            <CardDescription>
              {results.length > 0
                ? `Found ${results.length} policy(s). Click + to select.`
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
                  No policies found matching the search criteria. Please check
                  your input and try again.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>No Polis</TableHead>
                      <TableHead>Nasabah</TableHead>
                      <TableHead>Kendaraan</TableHead>
                      <TableHead>No Polisi</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>TSI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((policy) => (
                      <TableRow
                        key={policy.id}
                        className={
                          selectedId === policy.id ? "bg-primary/10" : ""
                        }
                      >
                        <TableCell>
                          <Button
                            size="sm"
                            variant={
                              selectedId === policy.id ? "default" : "outline"
                            }
                            onClick={() => handleSelect(policy)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{policy.nomorPolis}</p>
                            <p className="text-xs text-muted-foreground">
                              {policy.nomorSertifikat}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{policy.namaNasabah}</p>
                            <p className="text-xs text-muted-foreground">
                              {policy.hp1}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{policy.tipe}</p>
                            <Badge variant="outline" className="text-xs">
                              {policy.warna}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{policy.nomorPolisi}</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <p>{policy.tanggalMulaiPolis}</p>
                            <p className="text-muted-foreground">
                              to {policy.tanggalAkhirPolis}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          Rp{" "}
                          {Number.parseInt(
                            policy.uangPertanggungan
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

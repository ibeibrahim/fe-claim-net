"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  FileText,
  Printer,
  Download,
  RotateCcw,
} from "lucide-react";
import type { ClaimFormData } from "@/lib/claim-types";

interface ClaimResultProps {
  formData: ClaimFormData;
  onReset: () => void;
}

const claimNumber = `CLM-${Date.now().toString().slice(-8)}`;
export function ClaimResult({ formData, onReset }: ClaimResultProps) {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Success Banner */}
      <Card className="bg-primary/5 border-primary">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Claim Submitted Successfully!
              </h1>
              <p className="text-muted-foreground">
                Your claim has been registered and is pending review.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">
                  Claim Number:
                </span>
                <Badge variant="outline" className="font-mono text-lg">
                  {claimNumber}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claim Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Claim Summary
              </CardTitle>
              <CardDescription>
                Review of your submitted claim details
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <InfoItem label="Jenis Polis" value={formData.jenisPolis} />
              <InfoItem label="Kategori Klaim" value={formData.kategoriKlaim} />
              <InfoItem
                label="Tanggal Kejadian"
                value={formData.tanggalKejadian}
              />
              <InfoItem label="No Kontrak" value={formData.noKontrak} />
              <InfoItem label="Nomor Polis" value={formData.nomorPolis} />
              <InfoItem
                label="Nomor Sertifikat"
                value={formData.nomorSertifikat}
              />
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <InfoItem label="Nama Nasabah" value={formData.namaNasabah} />
              <InfoItem label="ID Nasabah" value={formData.idNasabah} />
              <InfoItem label="Tanggal Lahir" value={formData.tanggalLahir} />
              <InfoItem label="HP 1" value={formData.hp1} />
              <InfoItem label="HP 2" value={formData.hp2 || "-"} />
              <div className="md:col-span-3">
                <InfoItem label="Alamat" value={formData.alamatNasabah} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle Information */}
          <div>
            <h3 className="font-semibold mb-3">Vehicle / Asset Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <InfoItem label="Merk" value={formData.merk} />
              <InfoItem label="Tipe" value={formData.tipe} />
              <InfoItem label="Warna" value={formData.warna} />
              <InfoItem label="Tahun" value={formData.tahunPembuatan} />
              <InfoItem label="No Polisi" value={formData.nomorPolisi} />
              <InfoItem label="No Rangka" value={formData.nomorRangka} />
              <InfoItem label="No Mesin" value={formData.nomorMesin} />
              <InfoItem label="Penggunaan" value={formData.penggunaan} />
            </div>
          </div>

          <Separator />

          {/* Claim Details */}
          <div>
            <h3 className="font-semibold mb-3">Claim Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <InfoItem label="Perusahaan" value={formData.perusahaan} />
              <InfoItem label="Area" value={formData.area} />
              <InfoItem label="Cabang" value={formData.cabang} />
              <InfoItem label="Jenis Asuransi" value={formData.jenisAsuransi} />
              <InfoItem label="Jenis Klaim" value={formData.jenisKlaim} />
              <InfoItem label="Penyebab Klaim" value={formData.penyebabKlaim} />
              <InfoItem label="Kota Kejadian" value={formData.kotaKejadian} />
              <InfoItem
                label="Provinsi Kejadian"
                value={formData.provinsiKejadian}
              />
              <InfoItem label="Status" value={formData.status} highlight />
            </div>
            <div className="mt-4">
              <InfoItem
                label="Kronologi Kejadian"
                value={formData.kronologiKejadian}
              />
            </div>
          </div>

          <Separator />

          {/* API-Filled Data */}
          <div>
            <h3 className="font-semibold mb-3">
              Insurance Details (from System)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <InfoItem label="Cause Of Loss" value={formData.causeOfLoss} />
              <InfoItem
                label="Interest Insured"
                value={formData.interestInsured}
              />
              <InfoItem
                label="Category Insured"
                value={formData.categoryInsured}
              />
              <InfoItem label="KOL" value={formData.kol} />
              <InfoItem label="Nature Of Loss" value={formData.natureOfLoss} />
            </div>
          </div>

          <Separator />

          {/* Financial Summary */}
          <div>
            <h3 className="font-semibold mb-3">Financial Summary</h3>
            <Card className="bg-muted/30">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Nilai Pertanggungan
                    </span>
                    <p className="text-lg font-semibold">
                      Rp{" "}
                      {formData.nilaiPertanggungan
                        ? Number.parseInt(
                            formData.nilaiPertanggungan
                          ).toLocaleString()
                        : "0"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Deductible
                    </span>
                    <p className="text-lg font-semibold text-destructive">
                      - Rp{" "}
                      {formData.deductibleValue
                        ? Number.parseInt(
                            formData.deductibleValue
                          ).toLocaleString()
                        : "0"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Outstanding Premi
                    </span>
                    <p className="text-lg font-semibold">
                      Rp{" "}
                      {formData.outstandingPremi
                        ? Number.parseInt(
                            formData.outstandingPremi
                          ).toLocaleString()
                        : "0"}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 -m-1">
                    <span className="text-sm text-primary">
                      Nilai Penggantian
                    </span>
                    <p className="text-2xl font-bold text-primary">
                      Rp{" "}
                      {formData.nilaiPenggantian
                        ? Number.parseInt(
                            formData.nilaiPenggantian
                          ).toLocaleString()
                        : "0"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">
                    Deductible Details
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <InfoItem
                      label="Kategori"
                      value={formData.deductibleKategori}
                    />
                    <InfoItem label="Jenis" value={formData.deductibleJenis} />
                    <InfoItem
                      label="TSI %"
                      value={`${formData.deductibleNilaiTsiPercent}%`}
                    />
                    <InfoItem
                      label="Claim %"
                      value={`${formData.deductibleNilaiClaimPercent}%`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Register New Claim
        </Button>
        <Button>View All Claims</Button>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <span className="text-muted-foreground text-xs">{label}</span>
      <p className={highlight ? "font-medium text-primary" : "font-medium"}>
        {value || "-"}
      </p>
    </div>
  );
}

"use client";

import type React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type ClaimFormData, tableDrivenOptions } from "@/lib/claim-types";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface Stage0FormProps {
  formData: ClaimFormData;
  updateFormData: (updates: Partial<ClaimFormData>) => void;
  lockedFields: string[];
  onComplete: () => void;
  isCompleted: boolean;
}

function FormField({
  label,
  children,
  required,
  locked,
  highlight,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  locked?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label
        className={cn(
          "flex items-center gap-2",
          highlight && "text-primary font-medium"
        )}
      >
        <p className="truncate">{label}</p>
        {required && <span className="text-destructive">*</span>}
        {locked && <Lock className="h-3 w-3 text-muted-foreground" />}
      </Label>
      <div className={cn(highlight && "ring-2 ring-primary/20 rounded-md")}>
        {children}
      </div>
    </div>
  );
}

export function Stage0Form({
  formData,
  updateFormData,
  lockedFields,
  onComplete,
  isCompleted,
}: Stage0FormProps) {
  const isLocked = (field: string) => lockedFields.includes(field);
  const isHighlighted = (field: string) => lockedFields.includes(field);

  const isFormValid =
    formData.jenisPolis &&
    formData.noKontrak &&
    formData.kategoriKlaim &&
    formData.tanggalKejadian;

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        defaultValue={[
          "information",
          "vehicle",
          "details",
          "cost",
          "deductible",
        ]}
        className="space-y-4"
      >
        {/* Information Section */}
        <AccordionItem value="information" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Information
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <FormField label="No Kontrak / No Faktur / No Passpor" required>
                <Input
                  value={formData.noKontrak}
                  onChange={(e) =>
                    updateFormData({ noKontrak: e.target.value })
                  }
                  placeholder="Enter contract number"
                  disabled={isLocked("noKontrak")}
                  className="truncate"
                />
              </FormField>

              <FormField label="Kategori Klaim" required>
                <Select
                  value={formData.kategoriKlaim}
                  onValueChange={(v) => updateFormData({ kategoriKlaim: v })}
                  disabled={isLocked("kategoriKlaim")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.kategoriKlaim.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Mata Uang">
                <Select
                  value={formData.mataUang}
                  onValueChange={(v) => updateFormData({ mataUang: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.mataUang.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Negara Tujuan">
                <Select
                  value={formData.negaraTujuan}
                  onValueChange={(v) => updateFormData({ negaraTujuan: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.negaraTujuan.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Nomor Polis"
                locked={isLocked("nomorPolis")}
                highlight={isHighlighted("nomorPolis")}
              >
                <Input
                  value={formData.nomorPolis}
                  onChange={(e) =>
                    updateFormData({ nomorPolis: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("nomorPolis")}
                />
              </FormField>

              <FormField
                label="Nomor Sertifikat"
                locked={isLocked("nomorSertifikat")}
                highlight={isHighlighted("nomorSertifikat")}
              >
                <Input
                  value={formData.nomorSertifikat}
                  onChange={(e) =>
                    updateFormData({ nomorSertifikat: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("nomorSertifikat")}
                />
              </FormField>

              <FormField
                label="Nama Nasabah"
                locked={isLocked("namaNasabah")}
                highlight={isHighlighted("namaNasabah")}
              >
                <Input
                  value={formData.namaNasabah}
                  onChange={(e) =>
                    updateFormData({ namaNasabah: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("namaNasabah")}
                />
              </FormField>

              <FormField
                label="ID Nasabah"
                locked={isLocked("idNasabah")}
                highlight={isHighlighted("idNasabah")}
              >
                <Input
                  value={formData.idNasabah}
                  onChange={(e) =>
                    updateFormData({ idNasabah: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("idNasabah")}
                />
              </FormField>

              <FormField
                label="Tanggal Lahir"
                locked={isLocked("tanggalLahir")}
                highlight={isHighlighted("tanggalLahir")}
              >
                <Input
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={(e) =>
                    updateFormData({ tanggalLahir: e.target.value })
                  }
                  disabled={isLocked("tanggalLahir")}
                />
              </FormField>

              <div className="md:col-span-2 lg:col-span-3">
                <FormField
                  label="Alamat Nasabah"
                  locked={isLocked("alamatNasabah")}
                  highlight={isHighlighted("alamatNasabah")}
                >
                  <Textarea
                    value={formData.alamatNasabah}
                    onChange={(e) =>
                      updateFormData({ alamatNasabah: e.target.value })
                    }
                    placeholder="Auto-filled from Stage 1"
                    disabled={isLocked("alamatNasabah")}
                  />
                </FormField>
              </div>

              <FormField
                label="HP 1"
                locked={isLocked("hp1")}
                highlight={isHighlighted("hp1")}
              >
                <Input
                  value={formData.hp1}
                  onChange={(e) => updateFormData({ hp1: e.target.value })}
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("hp1")}
                />
              </FormField>

              <FormField label="HP 2">
                <Input
                  value={formData.hp2}
                  onChange={(e) => updateFormData({ hp2: e.target.value })}
                  placeholder="Enter phone number"
                />
              </FormField>

              <FormField label="Kondisi">
                <Select
                  value={formData.kondisi}
                  onValueChange={(v) => updateFormData({ kondisi: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Kondisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.kondisi.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Outlet">
                <Select
                  value={formData.outlet}
                  onValueChange={(v) => updateFormData({ outlet: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Outlet" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.outlet.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Jenis Barang">
                <Select
                  value={formData.jenisBarang}
                  onValueChange={(v) => updateFormData({ jenisBarang: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Jenis Barang" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.jenisBarang.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Merk">
                <Select
                  value={formData.merk}
                  onValueChange={(v) => updateFormData({ merk: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Merk" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.merk.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Tipe"
                locked={isLocked("tipe")}
                highlight={isHighlighted("tipe")}
              >
                <Input
                  value={formData.tipe}
                  onChange={(e) => updateFormData({ tipe: e.target.value })}
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("tipe")}
                />
              </FormField>

              <FormField label="Sub Tipe">
                <Input
                  value={formData.subTipe}
                  onChange={(e) => updateFormData({ subTipe: e.target.value })}
                  placeholder="Enter sub type"
                />
              </FormField>

              <FormField
                label="Tahun Pembuatan"
                locked={isLocked("tahunPembuatan")}
                highlight={isHighlighted("tahunPembuatan")}
              >
                <Input
                  value={formData.tahunPembuatan}
                  onChange={(e) =>
                    updateFormData({ tahunPembuatan: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("tahunPembuatan")}
                />
              </FormField>

              <FormField
                label="Nomor Polisi"
                locked={isLocked("nomorPolisi")}
                highlight={isHighlighted("nomorPolisi")}
              >
                <Input
                  value={formData.nomorPolisi}
                  onChange={(e) =>
                    updateFormData({ nomorPolisi: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("nomorPolisi")}
                />
              </FormField>

              <FormField
                label="Nomor Rangka"
                locked={isLocked("nomorRangka")}
                highlight={isHighlighted("nomorRangka")}
              >
                <Input
                  value={formData.nomorRangka}
                  onChange={(e) =>
                    updateFormData({ nomorRangka: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("nomorRangka")}
                />
              </FormField>

              <FormField
                label="Nomor Mesin"
                locked={isLocked("nomorMesin")}
                highlight={isHighlighted("nomorMesin")}
              >
                <Input
                  value={formData.nomorMesin}
                  onChange={(e) =>
                    updateFormData({ nomorMesin: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("nomorMesin")}
                />
              </FormField>

              <div className="md:col-span-2 lg:col-span-3">
                <FormField label="Kronologi Kejadian">
                  <Textarea
                    value={formData.kronologiKejadian}
                    onChange={(e) =>
                      updateFormData({ kronologiKejadian: e.target.value })
                    }
                    placeholder="Describe the incident chronology..."
                    rows={3}
                  />
                </FormField>
              </div>

              <FormField label="Nama Bank">
                <Select
                  value={formData.namaBank}
                  onValueChange={(v) => updateFormData({ namaBank: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.namaBank.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="A.N Rekening">
                <Input
                  value={formData.anRekening}
                  onChange={(e) =>
                    updateFormData({ anRekening: e.target.value })
                  }
                  placeholder="Enter account name"
                />
              </FormField>

              <FormField label="Nomor Rekening">
                <Input
                  value={formData.nomorRekening}
                  onChange={(e) =>
                    updateFormData({ nomorRekening: e.target.value })
                  }
                  placeholder="Enter account number"
                />
              </FormField>

              <FormField label="Asuransi">
                <Select
                  value={formData.asuransi}
                  onValueChange={(v) => updateFormData({ asuransi: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Asuransi" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.asuransi.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Jenis Polis" required>
                <Select
                  value={formData.jenisPolis}
                  onValueChange={(v) => updateFormData({ jenisPolis: v })}
                  disabled={isLocked("jenisPolis")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Jenis Polis" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.jenisPolis.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Claim No">
                <Input
                  value={formData.claimNo}
                  onChange={(e) => updateFormData({ claimNo: e.target.value })}
                  placeholder="Auto-generated"
                  disabled
                />
              </FormField>

              <FormField label="Status">
                <div>

                <Select
                  value={formData.status}
                  onValueChange={(v) => updateFormData({ status: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="truncate">
                    {tableDrivenOptions.status.map((opt) => (
                      <SelectItem className="truncate" key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                </div>
              </FormField>

              <FormField label="Keterangan Cancel Approval">
                <Input
                  value={formData.keteranganCancelApproval}
                  onChange={(e) =>
                    updateFormData({ keteranganCancelApproval: e.target.value })
                  }
                  placeholder="Enter cancellation reason"
                />
              </FormField>

              <FormField label="Perusahaan">
                <Select
                  value={formData.perusahaan}
                  onValueChange={(v) => updateFormData({ perusahaan: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Perusahaan" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.perusahaan.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Area">
                <Select
                  value={formData.area}
                  onValueChange={(v) => updateFormData({ area: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.area.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Cabang">
                <Select
                  value={formData.cabang}
                  onValueChange={(v) => updateFormData({ cabang: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Cabang" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.cabang.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Jenis Asuransi">
                <Select
                  value={formData.jenisAsuransi}
                  onValueChange={(v) => updateFormData({ jenisAsuransi: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Jenis Asuransi" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.jenisAsuransi.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Jenis Klaim">
                <Select
                  value={formData.jenisKlaim}
                  onValueChange={(v) => updateFormData({ jenisKlaim: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Jenis Klaim" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.jenisKlaim.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Penyebab Klaim">
                <Select
                  value={formData.penyebabKlaim}
                  onValueChange={(v) => updateFormData({ penyebabKlaim: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Penyebab Klaim" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.penyebabKlaim.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Cause Of Loss"
                locked={isLocked("causeOfLoss")}
                highlight={isHighlighted("causeOfLoss")}
              >
                <Input
                  value={formData.causeOfLoss}
                  onChange={(e) =>
                    updateFormData({ causeOfLoss: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 2"
                  disabled={isLocked("causeOfLoss")}
                />
              </FormField>

              <FormField
                label="Interest Insured"
                locked={isLocked("interestInsured")}
                highlight={isHighlighted("interestInsured")}
              >
                <Input
                  value={formData.interestInsured}
                  onChange={(e) =>
                    updateFormData({ interestInsured: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 3"
                  disabled={isLocked("interestInsured")}
                />
              </FormField>

              <FormField
                label="Category Insured"
                locked={isLocked("categoryInsured")}
                highlight={isHighlighted("categoryInsured")}
              >
                <Input
                  value={formData.categoryInsured}
                  onChange={(e) =>
                    updateFormData({ categoryInsured: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 3"
                  disabled={isLocked("categoryInsured")}
                />
              </FormField>

              <FormField
                label="KOL"
                locked={isLocked("kol")}
                highlight={isHighlighted("kol")}
              >
                <Input
                  value={formData.kol}
                  onChange={(e) => updateFormData({ kol: e.target.value })}
                  placeholder="Auto-filled from Stage 4"
                  disabled={isLocked("kol")}
                />
              </FormField>

              <FormField
                label="Nature Of Loss"
                locked={isLocked("natureOfLoss")}
                highlight={isHighlighted("natureOfLoss")}
              >
                <Input
                  value={formData.natureOfLoss}
                  onChange={(e) =>
                    updateFormData({ natureOfLoss: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 5"
                  disabled={isLocked("natureOfLoss")}
                />
              </FormField>

              <div className="md:col-span-2 lg:col-span-3">
                <FormField label="Alamat Kejadian">
                  <Textarea
                    value={formData.alamatKejadian}
                    onChange={(e) =>
                      updateFormData({ alamatKejadian: e.target.value })
                    }
                    placeholder="Enter incident address"
                    rows={2}
                  />
                </FormField>
              </div>

              <FormField label="Kota Kejadian">
                <Select
                  value={formData.kotaKejadian}
                  onValueChange={(v) => updateFormData({ kotaKejadian: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.kotaKejadian.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Provinsi Kejadian">
                <Select
                  value={formData.provinsiKejadian}
                  onValueChange={(v) => updateFormData({ provinsiKejadian: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    {tableDrivenOptions.provinsiKejadian.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Tanggal Mulai Polis"
                locked={isLocked("tanggalMulaiPolis")}
                highlight={isHighlighted("tanggalMulaiPolis")}
              >
                <Input
                  type="date"
                  value={formData.tanggalMulaiPolis}
                  onChange={(e) =>
                    updateFormData({ tanggalMulaiPolis: e.target.value })
                  }
                  disabled={isLocked("tanggalMulaiPolis")}
                />
              </FormField>

              <FormField
                label="Tanggal Akhir Polis"
                locked={isLocked("tanggalAkhirPolis")}
                highlight={isHighlighted("tanggalAkhirPolis")}
              >
                <Input
                  type="date"
                  value={formData.tanggalAkhirPolis}
                  onChange={(e) =>
                    updateFormData({ tanggalAkhirPolis: e.target.value })
                  }
                  disabled={isLocked("tanggalAkhirPolis")}
                />
              </FormField>

              <FormField label="Tanggal Kejadian" required>
                <Input
                  type="date"
                  value={formData.tanggalKejadian}
                  onChange={(e) =>
                    updateFormData({ tanggalKejadian: e.target.value })
                  }
                  disabled={isLocked("tanggalKejadian")}
                />
              </FormField>

              <FormField label="Tanggal Laporan">
                <Input
                  type="date"
                  value={formData.tanggalLaporan}
                  onChange={(e) =>
                    updateFormData({ tanggalLaporan: e.target.value })
                  }
                />
              </FormField>

              <div className="md:col-span-2 lg:col-span-3">
                <FormField label="Kronologi Lain Kejadian">
                  <Textarea
                    value={formData.kronologiLainKejadian}
                    onChange={(e) =>
                      updateFormData({ kronologiLainKejadian: e.target.value })
                    }
                    placeholder="Additional incident description..."
                    rows={3}
                  />
                </FormField>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Detail Biaya (Cost Details) Section */}
        <AccordionItem value="cost" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Detail Biaya
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <FormField label="Estimasi Bengkel / Loss">
                <Input
                  type="number"
                  value={formData.estimasiBengkelLoss}
                  onChange={(e) =>
                    updateFormData({ estimasiBengkelLoss: e.target.value })
                  }
                  placeholder="Enter estimation"
                />
              </FormField>

              <FormField label="Approve Assesor">
                <Input
                  type="number"
                  value={formData.approveAssesor}
                  onChange={(e) =>
                    updateFormData({ approveAssesor: e.target.value })
                  }
                  placeholder="Enter approved amount"
                />
              </FormField>

              <FormField
                label="Outstanding Premi"
                locked={isLocked("outstandingPremi")}
                highlight={isHighlighted("outstandingPremi")}
              >
                <Input
                  type="number"
                  value={formData.outstandingPremi}
                  onChange={(e) =>
                    updateFormData({ outstandingPremi: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("outstandingPremi")}
                />
              </FormField>

              <FormField
                label="Uang Pertanggungan"
                locked={isLocked("uangPertanggungan")}
                highlight={isHighlighted("uangPertanggungan")}
              >
                <Input
                  type="number"
                  value={formData.uangPertanggungan}
                  onChange={(e) =>
                    updateFormData({ uangPertanggungan: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 1"
                  disabled={isLocked("uangPertanggungan")}
                />
              </FormField>

              <FormField
                label="Nilai Pertanggungan"
                locked={isLocked("nilaiPertanggungan")}
                highlight={isHighlighted("nilaiPertanggungan")}
              >
                <Input
                  type="number"
                  value={formData.nilaiPertanggungan}
                  onChange={(e) =>
                    updateFormData({ nilaiPertanggungan: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 5"
                  disabled={isLocked("nilaiPertanggungan")}
                />
              </FormField>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Deductible Section */}
        <AccordionItem value="deductible" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Detail Deductible
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <FormField
                label="Kategori"
                locked={isLocked("deductibleKategori")}
                highlight={isHighlighted("deductibleKategori")}
              >
                <Input
                  value={formData.deductibleKategori}
                  onChange={(e) =>
                    updateFormData({ deductibleKategori: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleKategori")}
                />
              </FormField>

              <FormField
                label="Deskripsi"
                locked={isLocked("deductibleDeskripsi")}
                highlight={isHighlighted("deductibleDeskripsi")}
              >
                <Input
                  value={formData.deductibleDeskripsi}
                  onChange={(e) =>
                    updateFormData({ deductibleDeskripsi: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleDeskripsi")}
                />
              </FormField>

              <FormField
                label="Jenis"
                locked={isLocked("deductibleJenis")}
                highlight={isHighlighted("deductibleJenis")}
              >
                <Input
                  value={formData.deductibleJenis}
                  onChange={(e) =>
                    updateFormData({ deductibleJenis: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleJenis")}
                />
              </FormField>

              <FormField
                label="Nilai TSI %"
                locked={isLocked("deductibleNilaiTsiPercent")}
                highlight={isHighlighted("deductibleNilaiTsiPercent")}
              >
                <Input
                  value={formData.deductibleNilaiTsiPercent}
                  onChange={(e) =>
                    updateFormData({
                      deductibleNilaiTsiPercent: e.target.value,
                    })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleNilaiTsiPercent")}
                />
              </FormField>

              <FormField
                label="Nilai Claim %"
                locked={isLocked("deductibleNilaiClaimPercent")}
                highlight={isHighlighted("deductibleNilaiClaimPercent")}
              >
                <Input
                  value={formData.deductibleNilaiClaimPercent}
                  onChange={(e) =>
                    updateFormData({
                      deductibleNilaiClaimPercent: e.target.value,
                    })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleNilaiClaimPercent")}
                />
              </FormField>

              <FormField
                label="Min"
                locked={isLocked("deductibleMin")}
                highlight={isHighlighted("deductibleMin")}
              >
                <Input
                  type="number"
                  value={formData.deductibleMin}
                  onChange={(e) =>
                    updateFormData({ deductibleMin: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleMin")}
                />
              </FormField>

              <FormField
                label="Maks"
                locked={isLocked("deductibleMaks")}
                highlight={isHighlighted("deductibleMaks")}
              >
                <Input
                  type="number"
                  value={formData.deductibleMaks}
                  onChange={(e) =>
                    updateFormData({ deductibleMaks: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleMaks")}
                />
              </FormField>

              <FormField
                label="Deductible"
                locked={isLocked("deductibleValue")}
                highlight={isHighlighted("deductibleValue")}
              >
                <Input
                  type="number"
                  value={formData.deductibleValue}
                  onChange={(e) =>
                    updateFormData({ deductibleValue: e.target.value })
                  }
                  placeholder="Auto-filled from Stage 6"
                  disabled={isLocked("deductibleValue")}
                />
              </FormField>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Total Biaya Section */}
        <AccordionItem value="total" className="border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Total Biaya
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <FormField
                label="Nilai Penggantian"
                locked={isLocked("nilaiPenggantian")}
                highlight={isHighlighted("nilaiPenggantian")}
              >
                <Input
                  type="number"
                  value={formData.nilaiPenggantian}
                  onChange={(e) =>
                    updateFormData({ nilaiPenggantian: e.target.value })
                  }
                  placeholder="Auto-calculated (Nilai Pertanggungan - Deductible)"
                  disabled={isLocked("nilaiPenggantian")}
                  className="font-bold text-lg"
                />
              </FormField>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end pt-4">
        <Button onClick={onComplete} disabled={!isFormValid || isCompleted}>
          {isCompleted ? "Stage Completed" : "Proceed to Stage 1"}
        </Button>
      </div>
    </div>
  );
}

export interface ClaimFormData {
  // Basic Info
  jenisPolis: string
  noKontrak: string
  kategoriKlaim: string
  tanggalKejadian: string
  waktuKejadian: string
  mataUang: string
  negaraTujuan: string

  // Customer Info (filled from Stage 1)
  nomorPolis: string
  nomorSertifikat: string
  namaNasabah: string
  idNasabah: string
  tanggalLahir: string
  alamatNasabah: string
  hp1: string
  hp2: string

  // Vehicle Info (filled from Stage 1)
  tipe: string
  warna: string
  penggunaan: string
  tahunPembuatan: string
  nomorPolisi: string
  nomorRangka: string
  nomorMesin: string
  tanggalMulaiPolis: string
  tanggalAkhirPolis: string
  outstandingPremi: string
  uangPertanggungan: string

  // Details
  kondisi: string
  merk: string
  kronologiKejadian: string
  asuransi: string
  status: string
  perusahaan: string
  area: string
  cabang: string
  jenisAsuransi: string
  jenisKlaim: string
  penyebabKlaim: string
  kotaKejadian: string
  provinsiKejadian: string

  // Filled from stages 2-6
  causeOfLoss: string
  interestInsured: string
  categoryInsured: string
  kol: string
  natureOfLoss: string
  nilaiPertanggungan: string

  // Deductible (Stage 6)
  deductibleKategori: string
  deductibleDeskripsi: string
  deductibleJenis: string
  deductibleNilaiTsiPercent: string
  deductibleNilaiClaimPercent: string
  deductibleMin: string
  deductibleMaks: string
  deductibleValue: string
  nilaiPenggantian: string
}

export interface StageConfig {
  stage: number
  name: string
  description: string
  isEnabled: (data: ClaimFormData, completedStages: number[]) => boolean
}

export const stageConfigs: StageConfig[] = [
  {
    stage: 0,
    name: "Claim Input",
    description: "Fill in claim registration details",
    isEnabled: () => true,
  },
  {
    stage: 1,
    name: "Search Policy",
    description: "Search and select policy data",
    isEnabled: (data) => !!data.noKontrak && !!data.kategoriKlaim && !!data.tanggalKejadian,
  },
  {
    stage: 2,
    name: "Cause of Loss",
    description: "Search cause of loss",
    isEnabled: (_, completed) => completed.includes(1),
  },
  {
    stage: 3,
    name: "Interest Insured",
    description: "Search interest insured",
    isEnabled: (_, completed) => completed.includes(2),
  },
  {
    stage: 4,
    name: "KOL",
    description: "Search KOL data",
    isEnabled: (_, completed) => completed.includes(3),
  },
  {
    stage: 5,
    name: "Nature of Loss",
    description: "Search nature of loss",
    isEnabled: (_, completed) => completed.includes(4),
  },
  {
    stage: 6,
    name: "Deductible",
    description: "Calculate deductible",
    isEnabled: (_, completed) => completed.includes(5),
  },
]

export const tableDrivenOptions = {
  kategoriKlaim: ["MV2", "MV4", "PA", "MPD", "MPP", "MPAR", "TRAVEL", "CARGO"],
  mataUang: ["IDR", "EUR", "USD"],
  negaraTujuan: ["Indonesia", "Amerika", "Argentina"],
  kondisi: ["Baru", "Bekas", "Jasa"],
  merk: ["Yamaha", "Honda", "Toyota", "Suzuki", "Kawasaki", "BMW", "Mercedes"],
  namaBank: ["Mandiri", "BCA", "BRI", "BNI"],
  asuransi: ["PT Asuransi Umum Mega"],
  jenisPolis: ["Conventional", "Sharia"],
  status: ["IN - LAPORAN DATA MASUK", "PROSES - PREMI UNPAID"],
  perusahaan: ["PT. KB Finansia Multi Finance", "PT. Mega Auto Finance"],
  area: ["Area Jabodetabek", "Kantor Pusat", "Area Jawa Barat", "Area Jawa Timur"],
  cabang: ["Balikpapan", "Bekasi", "Baturaja", "Jakarta", "Bandung", "Surabaya"],
  jenisAsuransi: ["Comprehensive", "Total Loss Only", "Third Party Liability"],
  jenisKlaim: ["Total Loss Accident (TLA)", "Total Loss Stolen (TLS)", "Meninggal Kecelakaan"],
  penyebabKlaim: ["Kecelakaan", "Kematian Karena Kecelakaan", "Benturan", "Pencurian"],
  kotaKejadian: ["Aceh Barat", "Aceh Barat Daya", "Jakarta", "Bandung", "Surabaya"],
  provinsiKejadian: ["Aceh", "Sumatera Barat", "DKI Jakarta", "Jawa Barat", "Jawa Timur"],
}

export const initialFormData: ClaimFormData = {
  jenisPolis: "",
  noKontrak: "",
  kategoriKlaim: "",
  tanggalKejadian: "",
  waktuKejadian: "",
  mataUang: "IDR",
  negaraTujuan: "",
  nomorPolis: "",
  nomorSertifikat: "",
  namaNasabah: "",
  idNasabah: "",
  tanggalLahir: "",
  alamatNasabah: "",
  hp1: "",
  hp2: "",
  tipe: "",
  warna: "",
  penggunaan: "",
  tahunPembuatan: "",
  nomorPolisi: "",
  nomorRangka: "",
  nomorMesin: "",
  tanggalMulaiPolis: "",
  tanggalAkhirPolis: "",
  outstandingPremi: "",
  uangPertanggungan: "",
  kondisi: "",
  merk: "",
  kronologiKejadian: "",
  asuransi: "",
  status: "IN - LAPORAN DATA MASUK",
  perusahaan: "",
  area: "",
  cabang: "",
  jenisAsuransi: "",
  jenisKlaim: "",
  penyebabKlaim: "",
  kotaKejadian: "",
  provinsiKejadian: "",
  causeOfLoss: "",
  interestInsured: "",
  categoryInsured: "",
  kol: "",
  natureOfLoss: "",
  nilaiPertanggungan: "",
  deductibleKategori: "",
  deductibleDeskripsi: "",
  deductibleJenis: "",
  deductibleNilaiTsiPercent: "",
  deductibleNilaiClaimPercent: "",
  deductibleMin: "",
  deductibleMaks: "",
  deductibleValue: "",
  nilaiPenggantian: "",
}

import {
  BrainCircuit,
  CheckCircle,
  ClipboardList,
  Loader2,
  Wand2,
} from "lucide-react";

export default function Step7Refleksi({
  data,
  onBack,
  onNext,
  setData,
  loading,
  generatePart,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-3">
        <div className="p-2 bg-purple-50 rounded-lg">
          <BrainCircuit className="text-purple-600" size={24} />
        </div>
        Refleksi Guru & Siswa
      </h2>
      <div className="p-6 bg-purple-50/30 border border-purple-100 rounded-[2rem] space-y-4">
        <button
          onClick={() =>
            generatePart(
              "refleksi",
              `
Buat daftar pertanyaan REFLEKSI PEMBELAJARAN yang dibagi menjadi dua bagian:
1. Refleksi untuk Guru
2. Refleksi untuk Peserta Didik

Aturan WAJIB:
- Masing-masing bagian berisi tepat 5 pertanyaan
- Gunakan kalimat tanya
- Bahasa formal dan sederhana (kelas VII)
- TANPA pembuka, TANPA penutup, TANPA emoji
- JANGAN menambahkan penjelasan atau tawaran lanjutan
- Gunakan format teks berikut PERSIS:

Refleksi Guru:
1. ...
2. ...
3. ...
4. ...
5. ...

Refleksi Peserta Didik:
1. ...
2. ...
3. ...
4. ...
5. ...

Materi pembelajaran:
${data.materi}

TULISKAN LANGSUNG DAFTARNYA SAJA.
`
            )
          }
          disabled={loading}
          className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-100 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}{" "}
          Generate Refleksi
        </button>
        <textarea
          value={data.refleksi}
          onChange={(e) => setData({ ...data, refleksi: e.target.value })}
          className="w-full h-80 p-4 bg-white border border-purple-100 rounded-xl text-sm outline-none font-medium leading-relaxed"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-500"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold"
        >
          Lanjut ke Pengayaan
        </button>
      </div>
    </div>
  );
}

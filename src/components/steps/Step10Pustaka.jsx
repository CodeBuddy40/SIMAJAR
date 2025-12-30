import {
  BookOpen,
  BrainCircuit,
  CheckCircle,
  ClipboardList,
  FileText,
  Layers,
  Loader2,
  Wand2,
} from "lucide-react";

export default function Step10Pustaka({
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
        <div className="p-2 bg-slate-100 rounded-lg">
          <FileText className="text-slate-600" size={24} />
        </div>
        Daftar Pustaka
      </h2>
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] space-y-4">
        <button
          onClick={() =>
            generatePart(
              "daftarPustaka",
              `
    Buat DAFTAR PUSTAKA untuk modul ajar berdasarkan materi berikut:
    ${data.materi}
    
    Aturan WAJIB:
    - Gunakan format daftar pustaka ilmiah (nama penulis, tahun, judul, sumber)
    - Setiap referensi ditulis dalam SATU PARAGRAF
    - Jangan gunakan tabel
    - Jangan gunakan bullet atau penomoran
    - Jangan gunakan tanda ** atau simbol markdown
    - Pisahkan antar referensi dengan satu baris kosong
    - Sertakan sumber jurnal atau artikel daring yang relevan dengan pendidikan
    
    TULISKAN LANGSUNG DAFTAR PUSTAKA SAJA.
    `
            )
          }
          disabled={loading}
          className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}{" "}
          Generate Daftar Pustaka
        </button>
        <textarea
          value={data.daftarPustaka}
          onChange={(e) => setData({ ...data, daftarPustaka: e.target.value })}
          className="w-full h-80 p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none font-medium leading-relaxed"
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
          className="flex-[2] py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 shadow-xl shadow-green-100 transition-all"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}

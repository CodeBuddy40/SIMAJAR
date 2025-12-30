import {
  BookOpen,
  BrainCircuit,
  CheckCircle,
  ClipboardList,
  Layers,
  Loader2,
  Wand2,
} from "lucide-react";

export default function Step9Glosarium({
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
        <div className="p-2 bg-indigo-50 rounded-lg">
          <BookOpen className="text-indigo-600" size={24} />
        </div>
        Glosarium
      </h2>
      <div className="p-6 bg-indigo-50/30 border border-indigo-100 rounded-[2rem] space-y-4">
        <button
          onClick={() =>
            generatePart(
              "glosarium",
              `
Buat GLOSARIUM untuk materi berikut:
${data.materi}

Aturan WAJIB:
- Gunakan format: Istilah : Definisi
- Satu istilah per baris
- TANPA bullet, TANPA tanda **, TANPA nomor
- Bahasa sederhana dan sesuai siswa kelas VII
- Hanya berisi istilah dan definisi
- Jangan menambahkan penjelasan atau pertanyaan apa pun
`
            )
          }
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}{" "}
          Generate GPT-5.0
        </button>
        <textarea
          value={data.glosarium}
          onChange={(e) => setData({ ...data, glosarium: e.target.value })}
          className="w-full h-80 p-4 bg-white border border-indigo-100 rounded-xl text-sm outline-none"
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
          Lanjut ke Pustaka
        </button>
      </div>
    </div>
  );
}

import { CheckCircle, ClipboardList, Loader2, Wand2 } from "lucide-react";

export default function Step6Asesmen({
  data,
  onBack,
  onNext,
  setData,
  loading,
  generatePart,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
          <CheckCircle size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold">Asesmen & Rubrik</h2>
          <p className="text-xs text-slate-500 font-medium">
            Buat instrumen evaluasi berdasarkan kegiatan pembelajaran
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {/* 1. ASESMEN FORMATIF */}
        <div className="p-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:border-cyan-200 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                Asesmen
              </span>
            </div>
            <button
              onClick={() =>
                generatePart(
                  "asesmen",
                  `
Buat ASESMEN PEMBELAJARAN.
Format WAJIB tabel markdown:
Jenis | Aspek Penilaian | Teknik | Instrumen
Hanya tampilkan tabel saja.
`
                )
              }
              disabled={loading}
              className="text-[11px] bg-white border border-blue-200 text-blue-600 px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm font-bold disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Wand2 size={14} />
              )}{" "}
              Generate Asesmen
            </button>
          </div>
          <textarea
            value={data.asesmen}
            onChange={(e) => setData({ ...data, asesmen: e.target.value })}
            className="w-full p-2 bg-transparent text-sm h-48 outline-none resize-none font-medium text-slate-700 leading-relaxed"
            placeholder="Silahkan Klik Generate GPT-5..."
          />
        </div>

        {/* 3. RUBRIK PENILAIAN */}
        <div className="p-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:border-cyan-200 transition-all">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                Rubrik Penilaian
              </span>
            </div>
            <button
              onClick={() =>
                generatePart(
                  "rubrikPenilaian",
                  `
Buat RUBRIK PENILAIAN dalam bentuk tabel markdown.
Kolom: Aspek Penilaian | Sangat Baik | Baik | Cukup | Perlu Bimbingan
`
                )
              }
              disabled={loading}
              className="text-[11px] bg-white border border-blue-200 text-blue-600 px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm font-bold disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Wand2 size={14} />
              )}{" "}
              Generate Rubrik Penilaian
            </button>
          </div>
          <textarea
            value={data.rubrikPenilaian}
            onChange={(e) =>
              setData({ ...data, rubrikPenilaian: e.target.value })
            }
            className="w-full p-2 bg-transparent text-sm h-48 outline-none resize-none font-medium text-slate-700 leading-relaxed"
            placeholder="Silahkan Klik Generate GPT-5..."
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
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
          Lanjut ke Refleksi
        </button>
      </div>
    </div>
  );
}

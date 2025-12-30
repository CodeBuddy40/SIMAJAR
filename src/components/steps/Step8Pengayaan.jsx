import {
  BrainCircuit,
  CheckCircle,
  ClipboardList,
  Layers,
  Loader2,
  Wand2,
} from "lucide-react";

export default function Step8Pengayaan({
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
        <div className="p-2 bg-orange-50 rounded-lg">
          <Layers className="text-orange-600" size={24} />
        </div>
        Pengayaan & Remedial
      </h2>
      <div className="p-6 bg-orange-50/30 border border-orange-100 rounded-[2rem] space-y-4">
        <button
          onClick={() =>
            generatePart(
              "pengayaanRemedial",
              `
Buat bagian PENGAYAAN DAN REMEDIAL pembelajaran.

Aturan format WAJIB:
- Gunakan format NARASI PARAGRAF, bukan tabel dan bukan bullet
- Tulis dengan struktur berikut (persis):

Pengayaan: ...
Remedial: ...

- Masing-masing hanya 1 kalimat efektif
- Bahasa formal dan ringkas
- Sesuai dengan materi pembelajaran berikut:
${data.materi}

Jangan tambahkan judul lain, penjelasan tambahan, atau poin-poin.
`
            )
          }
          disabled={loading}
          className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}{" "}
          Generate Pengayaan dan Remedial
        </button>
        <textarea
          value={data.pengayaanRemedial}
          onChange={(e) =>
            setData({ ...data, pengayaanRemedial: e.target.value })
          }
          className="w-full h-80 p-4 bg-white border border-orange-100 rounded-xl text-sm outline-none font-medium leading-relaxed"
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
          Lanjut ke Glosarium
        </button>
      </div>
    </div>
  );
}

import {
  BookOpen,
  BrainCircuit,
  Layers,
  Loader2,
  School,
  Wand2,
} from "lucide-react";

export default function Step4Konten({
  data,
  onChange,
  onBack,
  onNext,
  setData,
  generatePart,
  loadingPart,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-3">
        <div className="p-2 bg-yellow-50 rounded-lg">
          <Layers className="text-yellow-600" size={24} />
        </div>
        Konten Utama
      </h2>
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-400 uppercase ml-1">
          Capaian Pembelajaran (CP)
        </label>
        <textarea
          name="cp"
          placeholder="Tempelkan CP dari Kemdikbud di sini..."
          onChange={onChange}
          value={data.cp}
          className="w-full p-4 bg-yellow-50/30 border border-yellow-100 rounded-2xl h-44 text-sm outline-none focus:ring-2 focus:ring-yellow-200 transition-all"
        />
      </div>
      {["tp", "makna", "pemantik"].map((tipe) => (
        <div
          key={tipe}
          className="p-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:border-cyan-200 transition-all"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
              {tipe === "tp"
                ? "Tujuan Pembelajaran"
                : tipe === "makna"
                ? "Pemahaman Bermakna"
                : "Pertanyaan Pemantik"}
            </span>
            <button
              onClick={() => generatePart(tipe)}
              disabled={loadingPart[tipe]}
              className="text-[11px] bg-white border border-blue-200 text-blue-600 px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm font-bold disabled:opacity-50"
            >
              {loadingPart[tipe] ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Wand2 size={14} />
              )}{" "}
              Generate {tipe}
            </button>
          </div>
          <textarea
            value={data[tipe]}
            onChange={(e) =>
              setData((prev) => ({ ...prev, [tipe]: e.target.value }))
            }
            className="w-full p-2 bg-transparent text-sm h-36 outline-none resize-none font-medium text-slate-700 leading-relaxed"
            placeholder={`Klik generate untuk menyusun ${tipe}...`}
          />
        </div>
      ))}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-500"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100"
        >
          Lanjut ke Skenario
        </button>
      </div>
    </div>
  );
}

import { ClipboardList, Loader2, Wand2 } from "lucide-react";

export default function Step5Skenario({
  data,
  onBack,
  onNext,
  setData,
  loading,
  generateLangkahSpesifik,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <ClipboardList className="text-blue-600" size={24} />
        </div>
        Skenario Pembelajaran
      </h2>
      <div className="grid gap-4">
        {[
          {
            id: "pendahuluan",
            label: "Pendahuluan",
          },
          {
            id: "kegiatanInti",
            label: "Kegiatan Inti",
          },
          {
            id: "penutup",
            label: "Penutup",
          },
        ].map((item) => (
          <div
            key={item.id}
            className={`p-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:border-cyan-200 transition-all`}
          >
            <div className="flex justify-between items-center">
              <span
                className={`text-xs font-black text-blue-600 uppercase tracking-widest`}
              >
                {item.label}
              </span>
              <button
                onClick={() => generateLangkahSpesifik(item.id)}
                disabled={loading}
                className="text-[11px] bg-white border border-blue-200 text-blue-600 px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm font-bold disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Wand2 size={14} />
                )}{" "}
                Generate
              </button>
            </div>
            <textarea
              value={data[item.id]}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  [item.id]: e.target.value,
                }))
              }
              className="w-full p-4 bg-gray-50 text-sm h-48 outline-none resize-none font-medium text-slate-700 leading-relaxed rounded-lg mt-4"
              placeholder={`Detail kegiatan ${item.id}...`}
            />
          </div>
        ))}
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
          Lanjut ke Asesmen
        </button>
      </div>
    </div>
  );
}

import { BrainCircuit, School } from "lucide-react";

export default function Step2Dasar({
  data,
  onChange,
  onBack,
  onNext,
  setData,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-3">
        <div className="p-2 bg-purple-50 rounded-lg">
          <BrainCircuit className="text-purple-600" size={24} />
        </div>
        Dasar & Kompetensi
      </h2>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
          Profil Pelajar Pancasila
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Mandiri",
            "Kreatif",
            "Bernalar Kritis",
            "Gotong Royong",
            "Berkebinekaan Global",
            "Beriman & Bertakwa",
          ].map((p) => (
            <button
              key={p}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  profilPancasila: prev.profilPancasila.includes(p)
                    ? prev.profilPancasila.filter((x) => x !== p)
                    : [...prev.profilPancasila, p],
                }))
              }
              className={`p-3 text-xs font-semibold text-left rounded-xl border transition-all ${
                data.profilPancasila.includes(p)
                  ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100"
                  : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">
            Kompetensi Awal
          </label>
          <textarea
            name="kompetensiAwal"
            placeholder="Apa yang sudah diketahui siswa?"
            onChange={onChange}
            value={data.kompetensiAwal}
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl h-32 text-sm outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">
            Sarana & Prasarana
          </label>
          <textarea
            name="sarpras"
            placeholder="LCD, Laptop, Buku Paket, dll..."
            onChange={onChange}
            value={data.sarpras}
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl h-32 text-sm outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 transition-all"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        >
          Lanjut ke Strategi
        </button>
      </div>
    </div>
  );
}

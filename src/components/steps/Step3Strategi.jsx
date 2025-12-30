import { BookOpen, BrainCircuit, School } from "lucide-react";

export default function Step3Strategi({
  data,
  onChange,
  onBack,
  onNext,
  setData,
}) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <h2 className="text-xl font-bold flex items-center gap-3">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <BookOpen className="text-emerald-600" size={24} />
        </div>
        Strategi Belajar
      </h2>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">
            Model Pembelajaran
          </label>
          <select
            name="modelPembelajaran"
            onChange={onChange}
            value={data.modelPembelajaran}
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
          >
            <option>Problem Based Learning (PBL)</option>
            <option>Project Based Learning (PjBL)</option>
            <option>Discovery Learning</option>
            <option>Inquiry Learning</option>
          </select>
        </div>
        <input
          name="metodePembelajaran"
          placeholder="Metode (Diskusi, Tanya Jawab, Ceramah)"
          onChange={onChange}
          value={data.metodePembelajaran}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
        />
        <input
          name="pendekatanPembelajaran"
          placeholder="Pendekatan (Saintifik, TPACK, CRT)"
          onChange={onChange}
          value={data.pendekatanPembelajaran}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
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
          className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100"
        >
          Lanjut ke Kegiatan Inti
        </button>
      </div>
    </div>
  );
}

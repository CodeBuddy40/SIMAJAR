import { School } from "lucide-react";

export default function Step1Identitas({ data, onChange, onNext }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <School className="text-blue-600" size={24} />
        </div>
        Identitas Modul
      </h2>
      <div className="grid gap-4">
        <input
          name="penyusun"
          placeholder="Nama Penyusun"
          onChange={onChange}
          value={data.penyusun}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
        />
        <input
          name="sekolah"
          placeholder="Nama Sekolah"
          onChange={onChange}
          value={data.sekolah}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="mapel"
            placeholder="Mata Pelajaran"
            onChange={onChange}
            value={data.mapel}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100"
          />
          <select
            name="fase"
            onChange={onChange}
            value={data.fase}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
          >
            {["Fase A", "Fase B", "Fase C", "Fase D", "Fase E", "Fase F"].map(
              (f) => (
                <option key={f}>{f}</option>
              )
            )}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="kelas"
            placeholder="Kelas"
            onChange={onChange}
            value={data.kelas}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100"
          />
          <select
            name="semester"
            onChange={onChange}
            value={data.semester}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
          >
            <option>Ganjil</option>
            <option>Genap</option>
          </select>
        </div>
        <input
          name="jenjang"
          placeholder="Jenjang"
          onChange={onChange}
          value={data.jenjang}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100"
        />
        <input
          name="elemen"
          placeholder="Elemen Kurikulum"
          onChange={onChange}
          value={data.elemen}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100"
        />
        <input
          name="materi"
          placeholder="Materi Pokok"
          onChange={onChange}
          value={data.materi}
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            name="tahunPenyusunan"
            placeholder="Tahun (e.g. 2025)"
            onChange={onChange}
            value={data.tahunPenyusunan}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
          />
          <input
            name="alokasiWaktu"
            placeholder="Alokasi (e.g. 2x45 Menit)"
            onChange={onChange}
            value={data.alokasiWaktu}
            className="p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
          />
        </div>
      </div>
      <button
        onClick={onNext}
        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all mt-4"
      >
        Lanjut ke Dasar Modul
      </button>
    </div>
  );
}

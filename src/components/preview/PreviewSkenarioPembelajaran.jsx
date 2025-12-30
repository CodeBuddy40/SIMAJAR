export default function PreviewSkenarioPembelajaran({ data, renderLangkah }) {
  return (
    <>
      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-black uppercase bg-slate-900 text-white px-4 py-2 rounded-t-lg">
          Langkah-Langkah Pembelajaran
        </h3>

        <div className="p-6 border-2 border-slate-900 rounded-b-lg bg-white space-y-6">
          {/* 1. PENDAHULUAN */}
          <div className="relative pl-6 border-l-2 border-blue-500">
            <div className="absolute -left-[11px] top-0 bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              1
            </div>
            <h4 className="font-bold text-[11px] text-blue-600 uppercase mb-2">
              Kegiatan Pendahuluan
            </h4>
            <div className="text-[11px] whitespace-pre-line leading-relaxed text-slate-700">
              {data.pendahuluan ? renderLangkah(data.pendahuluan) : "..."}
            </div>
          </div>

          {/* 2. INTI */}
          <div className="relative pl-6 border-l-2 border-indigo-500">
            <div className="absolute -left-[11px] top-0 bg-indigo-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              2
            </div>
            <h4 className="font-bold text-[11px] text-indigo-600 uppercase mb-2">
              Kegiatan Inti ({data.modelPembelajaran})
            </h4>
            <div className="text-[11px] whitespace-pre-line leading-relaxed text-slate-700 font-medium">
              {data.kegiatanInti ? renderLangkah(data.kegiatanInti) : "..."}
            </div>
          </div>

          {/* 3. PENUTUP */}
          <div className="relative pl-6 border-l-2 border-emerald-500">
            <div className="absolute -left-[11px] top-0 bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
              3
            </div>
            <h4 className="font-bold text-[11px] text-emerald-600 uppercase mb-2">
              Kegiatan Penutup
            </h4>
            <div className="text-[11px] whitespace-pre-line leading-relaxed text-slate-700 italic">
              {data.penutup ? renderLangkah(data.penutup) : "..."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

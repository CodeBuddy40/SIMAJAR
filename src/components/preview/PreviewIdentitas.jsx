export default function PreviewIdentitas({ data }) {
  return (
    <>
      <h1 className="font-bold mb-2">Identitas Modul</h1>
      <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <table className="w-full text-[11px] font-mono">
          <tbody>
            {/* Penyusun */}
            <tr className="border-b border-slate-200">
              <td className="py-2 text-slate-400 uppercase w-1/3">
                Nama Penyusun
              </td>
              <td className="py-2 font-bold text-slate-900">
                : {data.penyusun || "..."}
              </td>
            </tr>

            {/* Sekolah */}
            <tr className="border-b border-slate-200">
              <td className="py-2 text-slate-400 uppercase">Sekolah</td>
              <td className="py-2 font-bold text-slate-900">
                : {data.sekolah || "..."}
              </td>
            </tr>

            {/* Mata Pelajaran */}
            <tr className="border-b border-slate-200">
              <td className="py-2 text-slate-400 uppercase">Mata Pelajaran</td>
              <td className="py-2 font-bold text-slate-900">
                : {data.mapel || "..."}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 text-slate-400 uppercase">
                Tahun Penyusunan
              </td>
              <td className="py-2 font-bold text-slate-900">
                : {data.tahunPenyusunan || "..."}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 text-slate-400 uppercase">Elemen</td>
              <td className="py-2 font-bold text-slate-900">
                : {data.elemen || "..."}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 text-slate-400 uppercase">Materi</td>
              <td className="py-2 font-bold text-slate-900">
                : {data.materi || "..."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <tbody className="font-mono text-[11px]">
            <tr className="divide-x divide-slate-200">
              {/* Kolom 1: Fase */}
              <td className="pr-4 pb-1">
                <div className="flex flex-col">
                  <span className="text-slate-400 uppercase text-[9px] mb-1">
                    Fase
                  </span>
                  <span className="font-bold text-slate-900 leading-tight">
                    {data.fase || "..."}
                  </span>
                </div>
              </td>

              {/* Kolom 2: Sekolah */}
              <td className="px-4 pb-1">
                <div className="flex flex-col">
                  <span className="text-slate-400 uppercase text-[9px] mb-1">
                    Jenjang
                  </span>
                  <span className="font-bold text-slate-900 leading-tight">
                    {data.jenjang || "..."}
                  </span>
                </div>
              </td>

              {/* Kolom 3: Mapel */}
              <td className="px-4 pb-1">
                <div className="flex flex-col">
                  <span className="text-slate-400 uppercase text-[9px] mb-1">
                    Kelas
                  </span>
                  <span className="font-bold text-slate-900 leading-tight">
                    {data.kelas || "..."}
                  </span>
                </div>
              </td>

              {/* Kolom 4: Fase/Kelas/Semester */}
              <td className="px-4 pb-1">
                <div className="flex flex-col">
                  <span className="text-slate-400 uppercase text-[9px] mb-1">
                    Semester
                  </span>
                  <span className="font-bold text-slate-900 leading-tight">
                    {data.semester}
                  </span>
                </div>
              </td>

              {/* Kolom 5: Alokasi */}
              <td className="pl-4 pb-1">
                <div className="flex flex-col">
                  <span className="text-slate-400 uppercase text-[9px] mb-1">
                    Alokasi
                  </span>
                  <span className="font-bold text-slate-900 leading-tight">
                    {data.alokasiWaktu || "..."}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Baris 1: Kompetensi Awal */}
        <div className="flex border-b border-slate-200">
          <div className="w-[160px] shrink-0 bg-slate-50 p-4 flex items-center">
            <span className="text-slate-500 uppercase font-black text-[9px] font-mono leading-tight">
              Kompetensi Awal
            </span>
          </div>
          <div className="flex-1 p-4 border-l border-slate-200 text-[11px] font-mono italic text-slate-700">
            {data.kompetensiAwal || "..."}
          </div>
        </div>

        {/* Baris 2: Profil Pelajar Pancasila */}
        <div className="flex border-b border-slate-200">
          <div className="w-[160px] shrink-0 bg-slate-50 p-4 flex items-center">
            <span className="text-slate-500 uppercase font-black text-[9px] font-mono leading-tight">
              Profil Pancasila
            </span>
          </div>
          <div className="flex-1 p-4 border-l border-slate-200">
            <div className="flex flex-wrap gap-1">
              {data.profilPancasila?.map((p) => (
                <span
                  key={p}
                  className="text-[9px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold uppercase"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Baris 3: Sarpras */}
        <div className="flex border-b border-slate-200">
          <div className="w-[160px] shrink-0 bg-slate-50 p-4 flex items-center">
            <span className="text-slate-500 uppercase font-black text-[9px] font-mono leading-tight">
              Sarpras
            </span>
          </div>
          <div className="flex-1 p-4 border-l border-slate-200 text-[11px] font-mono font-medium text-slate-700">
            {data.sarpras || "..."}
          </div>
        </div>

        {/* Baris 4: Metode & Model */}
        <div className="flex flex-col sm:flex-row border-b border-slate-100 last:border-0">
          {/* LABEL: Sekarang otomatis full-width di mobile, dan 160px di desktop */}
          <div className="w-full sm:w-[160px] shrink-0 bg-slate-50/50 sm:bg-slate-50 p-3 sm:p-4 flex items-center border-b sm:border-b-0 sm:border-r border-slate-200">
            <span className="text-slate-500 uppercase font-black text-[9px] font-mono leading-tight tracking-wider">
              Metode & Model
            </span>
          </div>

          {/* KONTEN: Padding disesuaikan agar tidak terlalu boros ruang di mobile */}
          <div className="flex-1 p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
              {/* Baris Model */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-slate-400 w-full sm:w-24 shrink-0 sm:after:content-[''] after:hidden">
                  Model
                </span>
                <span className="font-bold text-slate-700">
                  <span className="hidden sm:inline">: </span>
                  {data.modelPembelajaran || "..."}
                </span>
              </div>

              {/* Baris Metode */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-slate-400 w-full sm:w-24 shrink-0">
                  Metode
                </span>
                <span className="font-bold text-slate-700">
                  <span className="hidden sm:inline">: </span>
                  {data.metodePembelajaran || "..."}
                </span>
              </div>

              {/* Baris Pendekatan */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-slate-400 w-full sm:w-24 shrink-0">
                  Pendekatan
                </span>
                <span className="font-bold text-slate-700">
                  <span className="hidden sm:inline">: </span>
                  {data.pendekatanPembelajaran || "..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

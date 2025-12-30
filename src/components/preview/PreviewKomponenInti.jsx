export default function PreviewKomponenInti({ data }) {
  return (
    <>
      <h1 className="font-bold mb-2 text-slate-800">Komponen Inti</h1>
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full border-collapse font-mono text-[11px] bg-white">
          <tbody>
            {/* Baris 1: Capaian Pembelajaran */}
            <tr className="border-b border-slate-200">
              <td className="py-4 px-5 w-[160px] bg-slate-50 text-slate-500 uppercase font-black text-[9px] align-middle">
                Capaian Pembelajaran
              </td>
              <td className="py-4 px-5 text-slate-700 italic border-l border-slate-200">
                {data.cp || "..."}
              </td>
            </tr>

            {/* Baris 2: Tujuan Pembelajaran */}
            <tr className="border-b border-slate-200">
              <td className="py-4 px-5 w-[160px] bg-slate-50 text-slate-500 uppercase font-black text-[9px] align-top">
                Tujuan Pembelajaran
              </td>
              <td className="py-4 px-5 text-slate-700 font-medium border-l border-slate-200">
                <div className="flex flex-col gap-2">
                  {data.tp
                    ? data.tp
                        .split(/(?:\d+\.|\n|•|-)/) // Memotong teks berdasarkan angka 1., baris baru, bullet, atau strip
                        .filter((item) => item.trim().length > 0) // Menghapus bagian kosong
                        .map((point, index) => (
                          <div
                            key={index}
                            className="flex gap-2 items-start text-[11px]"
                          >
                            <span className="text-slate-400 font-bold shrink-0">
                              {index + 1}.
                            </span>
                            <span className="leading-tight">
                              {point.trim()}
                            </span>
                          </div>
                        ))
                    : "..."}
                </div>
              </td>
            </tr>

            {/* Baris 3: Pemahaman Bermakna */}
            <tr className="border-b border-slate-200">
              <td className="py-4 px-5 w-[160px] bg-slate-50 text-slate-500 uppercase font-black text-[9px] align-middle">
                Pemahaman Bermakna
              </td>
              <td className="py-4 px-5 text-slate-700 font-medium border-l border-slate-200">
                {data.makna || "..."}
              </td>
            </tr>

            {/* Baris 4: Pertanyaan Pemantik */}
            <tr className="border-b border-slate-200">
              <td className="py-4 px-5 w-[160px] bg-slate-50 text-slate-500 uppercase font-black text-[9px] align-top">
                Pertanyaan Pemantik
              </td>
              <td className="py-4 px-5 text-slate-700 font-medium border-l border-slate-200">
                <div className="flex flex-col gap-2">
                  {data.pemantik
                    ? data.pemantik
                        .split(/(?:\d+\.|\n|•|-)/)
                        .filter((item) => item.trim().length > 0)
                        .map((point, index) => (
                          <div
                            key={index}
                            className="flex gap-2 items-start text-[11px]"
                          >
                            <span className="text-slate-400 font-bold shrink-0">
                              {index + 1}.
                            </span>
                            <span className="leading-tight">
                              {point.trim()}
                            </span>
                          </div>
                        ))
                    : "..."}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

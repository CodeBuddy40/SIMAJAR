export default function PreviewLampiran({ data, parseRefleksi }) {
  return (
    <>
      <div className="mt-10 space-y-10">
        {/* ASESMEN */}

        <div className="mt-10">
          <h4 className="font-black text-sm uppercase mb-3 text-slate-900">
            Asesmen Pembelajaran
          </h4>

          <div className="overflow-x-auto border border-slate-300 rounded-xl">
            <table className="min-w-full text-[11px] border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  {data.asesmen
                    .split("\n")
                    .find((line) => line.includes("| Jenis"))
                    ?.split("|")
                    .filter(Boolean)
                    .map((head, i) => (
                      <th
                        key={i}
                        className="border px-3 py-2 text-center font-bold"
                      >
                        {head.trim()}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {data.asesmen
                  .split("\n")
                  .filter(
                    (row) =>
                      row.includes("|") &&
                      !row.includes("---") &&
                      !row.toLowerCase().includes("jenis")
                  )
                  .map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      {row
                        .split("|")
                        .filter(Boolean)
                        .map((cell, j) => (
                          <td key={j} className="border px-3 py-2 text-center">
                            {cell.trim()}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="font-black text-sm uppercase mb-3 text-slate-900">
            Rubrik Penilaian
          </h4>

          <div className="overflow-x-auto border border-slate-300 rounded-xl">
            <table className="min-w-full text-[11px] border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  {data.rubrikPenilaian
                    .split("\n")
                    .find((line) => line.includes("| Aspek"))
                    ?.split("|")
                    .filter(Boolean)
                    .map((head, i) => (
                      <th key={i} className="border px-3 py-2 text-left">
                        {head.trim()}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {data.rubrikPenilaian
                  .split("\n")
                  .filter(
                    (row) =>
                      row.includes("|") &&
                      !row.includes("---") &&
                      !row.includes("Aspek Penilaian")
                  )
                  .map((row, i) => (
                    <tr key={i} className="align-top hover:bg-slate-50">
                      {row
                        .split("|")
                        .filter(Boolean)
                        .map((cell, j) => (
                          <td key={j} className="border px-3 py-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: cell
                                  .trim()
                                  .replace(
                                    /\*\*(.*?)\*\*/g,
                                    "<strong>$1</strong>"
                                  )
                                  .replace(/<br\s*\/?>/g, "<br />"),
                              }}
                            />
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PENGAYAAN & REMEDIAL */}

        <div className="mt-10 border border-slate-300">
          <div className="bg-orange-100 px-4 py-2 font-black text-sm">
            Pengayaan dan Remedial
          </div>

          <div className="p-4 space-y-3 text-[11px] leading-relaxed text-slate-800">
            {data.pengayaanRemedial
              .split("\n")
              .filter((line) => line.trim().length > 0)
              .map((line, i) => {
                const cleanLine = line
                  .replace(/\*\*/g, "")
                  .replace(/^-+\s*/, "")
                  .trim();

                return <p key={i}>{cleanLine}</p>;
              })}
          </div>
        </div>

        {/* REFLEKSI */}

        <div className="mt-6">
          <h4 className="font-black text-sm uppercase mb-3">Refleksi Guru</h4>

          <table className="w-full text-[11px] border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-3 py-2 w-10">No</th>
                <th className="border px-3 py-2 text-left">
                  Pertanyaan Refleksi
                </th>
              </tr>
            </thead>
            <tbody>
              {parseRefleksi(data.refleksi, "guru").map((q, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">{i + 1}</td>
                  <td className="border px-3 py-2">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h4 className="font-black text-sm uppercase mb-3">
            Refleksi Peserta Didik
          </h4>

          <table className="w-full text-[11px] border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-3 py-2 w-10">No</th>
                <th className="border px-3 py-2 text-left">
                  Pertanyaan Refleksi
                </th>
              </tr>
            </thead>
            <tbody>
              {parseRefleksi(data.refleksi, "siswa").map((q, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">{i + 1}</td>
                  <td className="border px-3 py-2">{q}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GLOSARIUM */}
        <div className="mt-8">
          <h4 className="font-black text-sm uppercase mb-3 text-slate-900">
            Glosarium
          </h4>

          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="min-w-full text-[11px] border-collapse">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border px-3 py-2 text-left w-1/4">Istilah</th>
                  <th className="border px-3 py-2 text-left">Definisi</th>
                </tr>
              </thead>
              <tbody>
                {data.glosarium
                  .split("\n")
                  .filter((row) => row.includes(":"))
                  .map((row, index) => {
                    const cleanRow = row
                      .replace(/\*\*/g, "")
                      .replace(/^-\s*/, "")
                      .trim();

                    const [istilah, ...arti] = cleanRow.split(":");

                    return (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="border px-3 py-2 font-bold">
                          {istilah.trim()}
                        </td>
                        <td className="border px-3 py-2">
                          {arti.join(":").trim()}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* DAFTAR PUSTAKA */}

        <div className="mt-10">
          <h3 className="text-sm font-black uppercase mb-4 bg-slate-900 text-white px-4 py-2 rounded-t-lg">
            Daftar Pustaka
          </h3>

          <div className="p-6 border-2 border-slate-900 rounded-b-lg bg-white space-y-4 text-[11px] leading-relaxed">
            {data.daftarPustaka
              .split("\n\n") // pisah antar referensi
              .map((item, index) => {
                const clean = item
                  .replace(/\*\*/g, "")
                  .replace(/^-\s*/gm, "")
                  .trim();

                return (
                  <p key={index} className="text-justify">
                    {clean}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

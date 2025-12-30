// utils/exportWord.js
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

const text = (value, bold = false) => {
  const lines = (value || "").split("\n"); // Memecah teks jika ada \n

  return new Paragraph({
    spacing: { after: 200, before: 200 },
    children: lines.map((line, index) => {
      return new TextRun({
        text: line,
        font: "Times New Roman",
        size: 24,
        bold,
        break: index > 0 ? 1 : 0, // Memberikan 'Enter' jika bukan baris pertama
      });
    }),
  });
};

const cell = (value, bold = false) =>
  new TableCell({
    children: [text(value, bold)],
  });

const cellWithLine = (label, value) =>
  new TableCell({
    width: { size: 20, type: WidthType.PERCENTAGE },
    // Menghilangkan margin agar tabel di dalam menempel sempurna ke pinggir
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        // MATIKAN BORDER LUAR UNTUK MENGHILANGKAN EFEK DOBEL
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          // Gunakan insideHorizontal untuk garis pemisah antara Label dan Isi
          insideHorizontal: {
            style: BorderStyle.SINGLE,
            size: 4,
            color: "000000",
          },
        },
        rows: [
          // Baris Atas (Label)
          new TableRow({
            children: [
              new TableCell({
                children: [text(label, true)],
                shading: { fill: "F3F4F6" }, // Memberi warna abu agar lebih rapi
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 4 }, // Garis pemisah
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
          // Baris Bawah (Isi)
          new TableRow({
            children: [
              new TableCell({
                children: [text(value || "-")],
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });

const cleanText = (text) =>
  text
    .replace(/\*\*/g, "") // hapus **
    .replace(/^[-•]\s*/gm, "") // hapus bullet
    .replace(/^\d+\.\s*/gm, "") // hapus nomor AI
    .trim();

const numberedParagraph = (value = "") => {
  return value
    .split("\n")
    .filter(Boolean)
    .map((line, i) => {
      const clean = cleanText(line);

      return new Paragraph({
        spacing: { after: 200 },
        children: [
          // NOMOR (BOLD)
          new TextRun({
            text: `${i + 1}. `,
            font: "Times New Roman",
            size: 24,
          }),

          // ISI (NORMAL)
          new TextRun({
            text: clean,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      });
    });
};

const kegiatanIntiParagraph = (value = "") => {
  const blocks = value
    .split(/\n\s*\n/) // pisah per poin (berdasarkan baris kosong)
    .filter(Boolean);

  return blocks.flatMap((block, index) => {
    const lines = block.split("\n").filter(Boolean);

    // Baris pertama: "1. **Orientasi masalah**"
    const title = lines[0]
      .replace(/^\d+\.\s*/, "")
      .replace(/\*\*/g, "")
      .trim();

    // Sisanya = deskripsi
    const description = lines.slice(1).join(" ").trim();

    return [
      // 🔹 PARAGRAF 1: NOMOR + JUDUL (BOLD)
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `${index + 1}. `,
            bold: true,
            font: "Times New Roman",
            size: 24,
          }),
          new TextRun({
            text: title,
            bold: true,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      }),

      // 🔹 PARAGRAF 2: DESKRIPSI (MENJOROK)
      new Paragraph({
        spacing: { after: 250 },
        indent: { left: 500 }, // ±1,25 cm (standar Word)
        children: [
          new TextRun({
            text: description,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      }),
    ];
  });
};

const parseAsesmenTable = (asesmenText = "") => {
  const lines = asesmenText.split("\n").filter((l) => l.includes("|"));

  const headerLine = lines.find((l) => l.toLowerCase().includes("jenis"));

  if (!headerLine) return null;

  const headers = headerLine
    .split("|")
    .filter(Boolean)
    .map((h) => h.trim());

  const rows = lines
    .filter(
      (l) =>
        l !== headerLine &&
        !l.includes("---") &&
        !l.toLowerCase().includes("jenis")
    )
    .map((row) =>
      row
        .split("|")
        .filter(Boolean)
        .map((cell) => cell.trim())
    );

  return { headers, rows };
};

const parseRubrikTable = (rubrikText = "") => {
  const lines = rubrikText.split("\n").filter((l) => l.includes("|"));

  const headerLine = lines.find((l) => l.toLowerCase().includes("aspek"));

  if (!headerLine) return null;

  const headers = headerLine
    .split("|")
    .filter(Boolean)
    .map((h) => h.trim());

  const rows = lines
    .filter(
      (l) =>
        l !== headerLine &&
        !l.includes("---") &&
        !l.toLowerCase().includes("aspek penilaian")
    )
    .map((row) =>
      row
        .split("|")
        .filter(Boolean)
        .map((cell) =>
          cell
            .replace(/\*\*(.*?)\*\*/g, "$1") // hapus **
            .replace(/<br\s*\/?>/gi, "\n") // <br> ke newline
            .trim()
        )
    );

  return { headers, rows };
};

const cellMultiParagraph = (value = "", bold = false) =>
  new TableCell({
    children: value
      .split("\n")
      .filter(Boolean)
      .map(
        (line) =>
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: line,
                bold,
                font: "Times New Roman",
                size: 24,
              }),
            ],
          })
      ),
  });

const parseRefleksiWord = (text = "", type = "guru") => {
  const sections = text.split(/Refleksi Peserta Didik/i);

  const guruPart = sections[0] || "";
  const siswaPart = sections[1] || "";

  const source = type === "guru" ? guruPart : siswaPart;

  return source
    .split("\n")
    .map((line) =>
      line
        .replace(/Refleksi Guru:?/i, "")
        .replace(/Refleksi Peserta Didik:?/i, "")
        .replace(/\*\*/g, "")
        .replace(/^\d+\.\s*/, "")
        .replace(/^[-•:]\s*/, "") // 🔥 HAPUS ":" dan "-"
        .trim()
    )
    .filter(
      (line) =>
        line.length > 0 && // bukan kosong
        line !== ":" && // bukan titik dua
        line !== "-" // bukan strip
    );
};

const refleksiCell = (value) =>
  new TableCell({
    children: [
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: value,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      }),
    ],
  });

const pengayaanRemedialParagraph = (value = "") => {
  return value
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      const clean = line
        .replace(/\*\*/g, "")
        .replace(/^[-•]\s*/, "")
        .trim();

      return new Paragraph({
        spacing: { after: 200 },
        children: [
          // NOMOR
          new TextRun({
            text: `${index + 1}. `,
            bold: true,
            font: "Times New Roman",
            size: 24,
          }),

          // ISI
          new TextRun({
            text: clean,
            font: "Times New Roman",
            size: 24,
          }),
        ],
      });
    });
};

export const downloadWord = async (data) => {
  const doc = new Document({
    sections: [
      {
        children: [
          // ===============================
          // JUDUL
          // ===============================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }, // Memberi jarak ke konten di bawahnya
            children: [
              // Baris Pertama
              new TextRun({
                text: "MODUL AJAR KURIKULUM MERDEKA",
                bold: true,
                font: "Times New Roman",
                size: 28, // 14pt
              }),

              // Memberikan Baris Baru (Enter)
              new TextRun({
                text: "",
                break: 1,
              }),

              // Baris Kedua (Materi)
              new TextRun({
                text: data.materi
                  ? data.materi.toUpperCase()
                  : "NAMA MATERI BELUM DIISI",
                bold: true,
                font: "Times New Roman",
                size: 32, // Ukuran sedikit lebih besar untuk penekanan materi
              }),
            ],
          }),

          // ===============================
          // IDENTITAS MODUL
          // ===============================
          new Paragraph({
            children: [
              new TextRun({
                text: "Identitas Modul",
                bold: true,
                size: 24,
                font: "Times New Roman",
              }),
            ],
            spacing: { after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              ["Nama Penyusun", data.penyusun],
              ["Sekolah", data.sekolah],
              ["Mata Pelajaran", data.mapel],
              ["Tahun Penyusunan", data.tahunPenyusunan],
              ["Elemen", data.elemen],
              ["Materi", data.materi],
            ].map(
              ([a, b]) =>
                new TableRow({
                  children: [cell(a, true), cell(b)],
                })
            ),
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "",
              }),
            ],
            spacing: { after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  cellWithLine("Fase", data.fase),
                  cellWithLine("Jenjang", data.jenjang),
                  cellWithLine("Kelas", data.kelas),
                  cellWithLine("Semester", data.semester),
                  cellWithLine("Alokasi Waktu", data.alokasiWaktu),
                ],
              }),
            ],
          }),

          // ===============================
          new Paragraph({
            children: [
              new TextRun({
                text: "",
              }),
            ],
            spacing: { after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              ["Kompetensi awal", data.kompetensiAwal],
              ["Profil Pelajar Pancasila", data.profilPancasila?.join(", ")],
              ["Sarana dan Prasarana", data.sarpras],
              [
                "Model & Metode Pembelajaran",
                // Gunakan template literals dengan \n agar terbaca sebagai baris baru
                `Model: ${data.modelPembelajaran}\nMetode: ${data.metodePembelajaran}\nPendekatan: ${data.pendekatanPembelajaran}`,
              ],
            ].map(
              ([label, value]) =>
                new TableRow({
                  children: [cell(label, true), cell(cleanText(value))],
                })
            ),
          }),

          // ===============================
          // Komponen Inti
          // ===============================
          text("\nKomponen Inti", true),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              ["Capaian Pembelajaran", data.cp],
              [
                "Tujuan Pembelajaran",
                data.tp
                  .split(/(?:\d+\.)/)
                  .filter((x) => x.trim())
                  .map((tp, i) => `${i + 1}. ${tp.trim()}`)
                  .join("\n"),
              ],
              ["Pemahaman Bermakna", data.makna],
              [
                "Pertanyaan Pemantik",
                data.pemantik
                  .split(/(?:\d+\.)/)
                  .filter((x) => x.trim())
                  .map((tp, i) => `${i + 1}. ${tp.trim()}`)
                  .join("\n"), // Gabungkan jadi satu string dengan baris baru
              ],
            ].map(
              ([label, value]) =>
                new TableRow({
                  // Jika label mengandung "Tujuan" atau "Pertanyaan", jangan gunakan cleanText
                  children: [
                    cell(label, true),
                    cell(
                      label.includes("Tujuan") || label.includes("Pertanyaan")
                        ? value
                        : cleanText(value)
                    ),
                  ],
                })
            ),
          }),

          // ===============================
          // LANGKAH PEMBELAJARAN
          // ===============================
          text("\nLangkah Pembelajaran", true),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // =====================
              // PENDAHULUAN
              // =====================
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F3F4F6" },
                    children: [text("Kegiatan Pendahuluan", true)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: numberedParagraph(data.pendahuluan),
                  }),
                ],
              }),

              // =====================
              // KEGIATAN INTI
              // =====================
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F3F4F6" },
                    children: [text("Kegiatan Inti", true)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: kegiatanIntiParagraph(data.kegiatanInti),
                  }),
                ],
              }),

              // =====================
              // PENUTUP
              // =====================
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F3F4F6" },
                    children: [text("Kegiatan Penutup", true)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: numberedParagraph(data.penutup),
                  }),
                ],
              }),
            ],
          }),

          // ===============================
          // ASESMEN PEMBELAJARAN
          // ===============================
          text("\nAsesmen Pembelajaran", true),

          (() => {
            const asesmen = parseAsesmenTable(data.asesmen);
            if (!asesmen) return text("Data asesmen tidak tersedia.");

            return new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                // HEADER
                new TableRow({
                  children: asesmen.headers.map(
                    (h) =>
                      new TableCell({
                        children: [text(h, true)],
                        shading: { fill: "F3F4F6" },
                      })
                  ),
                }),

                // ISI
                ...asesmen.rows.map(
                  (row) =>
                    new TableRow({
                      children: row.map(
                        (cellValue) =>
                          new TableCell({
                            children: [text(cellValue)],
                          })
                      ),
                    })
                ),
              ],
            });
          })(),

          // ===============================
          // RUBRIK PENILAIAN
          // ===============================
          text("\nRubrik Penilaian", true),

          (() => {
            const rubrik = parseRubrikTable(data.rubrikPenilaian);
            if (!rubrik) return text("Data rubrik penilaian tidak tersedia.");

            return new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                // HEADER
                new TableRow({
                  children: rubrik.headers.map(
                    (h) =>
                      new TableCell({
                        children: [text(h, true)],
                        shading: { fill: "F3F4F6" },
                      })
                  ),
                }),

                // ISI
                ...rubrik.rows.map(
                  (row) =>
                    new TableRow({
                      children: row.map((cellValue) =>
                        cellMultiParagraph(cellValue)
                      ),
                    })
                ),
              ],
            });
          })(),

          // ===============================
          // PENGAYAAN & REMEDIAL
          // ===============================
          text("\nPengayaan dan Remedial", true),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: pengayaanRemedialParagraph(
                      data.pengayaanRemedial
                    ) || [text("-", false)],
                  }),
                ],
              }),
            ],
          }),

          // ===============================
          // REFLEKSI GURU
          // ===============================
          text("\nRefleksi Guru", true),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // HEADER
              new TableRow({
                children: [cell("No", true), cell("Pertanyaan Refleksi", true)],
              }),

              // ISI
              ...parseRefleksiWord(data.refleksi, "guru").map(
                (q, i) =>
                  new TableRow({
                    children: [refleksiCell(`${i + 1}`), refleksiCell(q)],
                  })
              ),
            ],
          }),

          // ===============================
          // REFLEKSI PESERTA DIDIK
          // ===============================
          text("\nRefleksi Peserta Didik", true),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // HEADER
              new TableRow({
                children: [cell("No", true), cell("Pertanyaan Refleksi", true)],
              }),

              // ISI
              ...parseRefleksiWord(data.refleksi, "siswa").map(
                (q, i) =>
                  new TableRow({
                    children: [refleksiCell(`${i + 1}`), refleksiCell(q)],
                  })
              ),
            ],
          }),

          // ===============================
          // GLOSARIUM
          // ===============================
          text("\nGlosarium", true),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [cell("Istilah", true), cell("Definisi", true)],
              }),
              ...data.glosarium
                .split("\n")
                .filter((r) => r.includes(":"))
                .map((r) => {
                  const [a, ...b] = r.split(":");
                  return new TableRow({
                    children: [cell(a.trim()), cell(b.join(":").trim())],
                  });
                }),
            ],
          }),

          // ===============================
          // DAFTAR PUSTAKA
          // ===============================
          text("\nDaftar Pustaka", true),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: data.daftarPustaka
              .split("\n\n")
              .filter(Boolean)
              .map(
                (ref) =>
                  new TableRow({
                    children: [cell(ref.trim())],
                  })
              ),
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Modul_Ajar_${data.materi}.docx`);
};

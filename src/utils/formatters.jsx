import React from "react";

export const renderLangkah = (text) => {
  if (!text) return null;

  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      const clean = line.replace(/\*\*/g, "").trim();
      const match = clean.match(/^(\d+)\.\s*(.+)$/);

      if (!match) {
        return (
          <p key={index} className="ml-4">
            {clean}
          </p>
        );
      }

      const nomor = match[1];
      const isi = match[2];

      // pisahkan judul dan deskripsi
      const [judul, ...descArr] = isi.split("  ");
      const deskripsi = descArr.join(" ");

      return (
        <div key={index} className="flex gap-2">
          <span className="font-bold">{nomor}.</span>
          <div>
            <span className="font-bold">{judul}</span>
            {deskripsi && <span> {deskripsi}</span>}
          </div>
        </div>
      );
    });
};

export const parseRefleksi = (text, section) => {
  if (!text) return [];

  const regex =
    section === "guru"
      ? /Refleksi Guru:\s*([\s\S]*?)Refleksi Peserta Didik:/i
      : /Refleksi Peserta Didik:\s*([\s\S]*)/i;

  const match = text.match(regex);
  if (!match) return [];

  return match[1]
    .split("\n")
    .filter((line) => line.trim().match(/^\d+\./))
    .map((line) =>
      line
        .replace(/^\d+\.\s*/, "")
        .replace(/\*\*/g, "")
        .trim()
    );
};

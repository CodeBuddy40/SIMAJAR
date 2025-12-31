import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { downloadWord } from "./utils/exportWord";
import { callMagmaAPI } from "./api/magmaService";
import { renderLangkah } from "./utils/formatters";
import { parseRefleksi } from "./utils/formatters";
import { INITIAL_STATE } from "./utils/constants";
import Header from "./components/Header";
import Step1Identitas from "./components/steps/step1identitas";
import Step2Dasar from "./components/steps/Step2Dasar";
import Step3Strategi from "./components/steps/Step3Strategi";
import Step4Konten from "./components/steps/Step4Konten";
import Step5Skenario from "./components/steps/Step5Skenario";
import Step6Asesmen from "./components/steps/Step6Asesmen";
import Step7Refleksi from "./components/steps/Step7Refleksi";
import Step8Pengayaan from "./components/steps/Step8Pengayaan";
import Step9Glosarium from "./components/steps/Step9Glosarium";
import Step10Pustaka from "./components/steps/Step10Pustaka";
import Step11Finish from "./components/steps/Step11Finish";
import PreviewHeader from "./components/preview/PreviewHeader";
import PreviewIdentitas from "./components/preview/PreviewIdentitas";
import PreviewKomponenInti from "./components/preview/PreviewKomponenInti";
import PreviewSkenarioPembelajaran from "./components/preview/PreviewSkenarioPembelajaran";
import PreviewLampiran from "./components/preview/PreviewLampiran";

function App() {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("modul_step");
    return savedStep ? parseInt(savedStep) : 1;
  });

  const [loading, setLoading] = useState(false);
  const [loadingPart, setLoadingPart] = useState({
    tp: false,
    makna: false,
    pemantik: false,
    pendahuluan: false,
    kegiatanInti: false,
    penutup: false,
  });

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("modul_data");
    return savedData ? JSON.parse(savedData) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem("modul_data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("modul_step", step);
  }, [step]);

  const handleReset = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus semua data dan mulai dari awal?"
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePart = async (tipe, manualPrompt = null) => {
    if (!data.cp && !data.materi)
      return alert("Masukkan CP atau Materi terlebih dahulu!");

    setLoadingPart((prev) => ({ ...prev, [tipe]: true }));
    setLoading(true);

    let prompt = "";

    // ================= MANUAL PROMPT =================
    if (manualPrompt) {
      // KHUSUS ASESMEN
      if (tipe === "asesmen") {
        prompt = manualPrompt;
      }
      // KHUSUS RUBRIK
      else if (tipe === "rubrikPenilaian") {
        prompt = manualPrompt;
      }
      // DEFAULT (POIN-POIN)
      else {
        prompt = `${manualPrompt} untuk materi ${data.materi} kelas ${data.kelas}.
      PENTING: Berikan hasil dalam bentuk poin-poin list yang rapi ke bawah.`;
      }
    }

    // ================= AUTO PROMPT =================
    else {
      if (tipe === "tp")
        prompt = `Berdasarkan CP: "${data.cp}", rumuskan 3 Tujuan Pembelajaran (TP) singkat untuk kelas ${data.kelas}.
      PENTING: Berikan hasil dalam bentuk poin-poin (list nomor) ke bawah.`;

      if (tipe === "makna")
        prompt = `
Buat 1 KALIMAT Pemahaman Bermakna berdasarkan Capaian Pembelajaran berikut:

"${data.cp}"

Aturan WAJIB:
- Hanya 1 paragraf
- Tanpa judul
- Tanpa pembuka dan penutup
- Tanpa penjelasan tambahan
- Tanpa menawarkan pilihan versi lain
- Bahasa formal dan ringkas
- Fokus pada makna esensial pembelajaran

TULISKAN LANGSUNG KALIMATNYA SAJA.
`;

      if (tipe === "pemantik")
        prompt = `Buatkan 3 pertanyaan pemantik diskusi siswa untuk materi dengan CP: "${data.cp}".
      PENTING: Berikan hasil dalam bentuk poin-poin (list nomor) ke bawah.`;
    }

    const text = await callMagmaAPI(prompt);
    setData((prev) => ({ ...prev, [tipe]: text }));
    setLoadingPart((prev) => ({ ...prev, [tipe]: false }));
    setLoading(false);
  };

  const generateLangkahSpesifik = async (bagian) => {
    if (!data.materi) return alert("Isi materi terlebih dahulu!");
    setLoading(true);

    let instruksi = "";

    if (bagian === "pendahuluan") {
      instruksi = `
Buat kegiatan pendahuluan pembelajaran dalam bentuk langkah-langkah bernomor.

Aturan:
- Gunakan format nomor (1, 2, 3, ...)
- Setiap nomor berisi KALIMAT NARATIF langsung
- Gunakan subjek "Guru"
- Jangan gunakan judul atau tanda **
`;
    } else if (bagian === "kegiatanInti") {
      instruksi = `
Buat langkah kegiatan inti pembelajaran sesuai sintaks ${data.modelPembelajaran}.

Aturan:
- Gunakan format nomor
- Setiap langkah diawali nama sintaks lalu diikuti kalimat penjelasan dibawahnya
- Gunakan kalimat aktif dan jelas
- Jangan gunakan tanda **
`;
    } else if (bagian === "penutup") {
      instruksi = `
Buat kegiatan penutup pembelajaran dalam bentuk KALIMAT NARATIF BERNOMOR.

Aturan WAJIB:
- Gunakan format nomor (1–5)
- SETIAP nomor berisi KALIMAT LANGSUNG (bukan judul)
- Jangan gunakan kata: Kesimpulan, Refleksi, Diskusi, Doa sebagai judul
- Jangan gunakan tanda ** atau bullet markdown
- Gunakan subjek "Guru"
- Bahasa formal dan ringkas (1 kalimat per nomor)
`;
    }

    const prompt = `
${instruksi}

Materi pembelajaran:
${data.materi}

TULISKAN LANGSUNG DAFTAR BERNOMOR SAJA.
`;

    const text = await callMagmaAPI(prompt);
    setData((prev) => ({ ...prev, [bagian]: text }));
    setLoading(false);
  };

  const isModulLengkap = () => {
    // Kita cek field kunci yang menandakan modul sudah selesai di-generate
    const mandatoryFields = [
      data.penyusun,
      data.mapel,
      data.materi,
      data.kegiatanInti,
      data.daftarPustaka,
    ];

    return mandatoryFields.every((field) => field && field.trim() !== "");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-900">
      <Header step={step} />
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT PANEL */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
            {/* STEP 1: IDENTITAS MODUL */}
            {step === 1 && (
              <Step1Identitas
                data={data}
                onChange={handleInputChange}
                onNext={() => setStep(2)}
              />
            )}

            {/* STEP 2: DASAR & KOMPETENSI */}
            {step === 2 && (
              <Step2Dasar
                data={data}
                setData={setData}
                onChange={handleInputChange}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}

            {/* STEP 3: STRATEGI */}
            {step === 3 && (
              <Step3Strategi
                data={data}
                setData={setData}
                onChange={handleInputChange}
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
              />
            )}

            {/* STEP 4: KONTEN & AI (TP, MAKNA, PEMANTIK) */}
            {step === 4 && (
              <Step4Konten
                data={data}
                setData={setData}
                onChange={handleInputChange}
                onBack={() => setStep(3)}
                onNext={() => setStep(5)}
                generatePart={generatePart}
                loadingPart={loadingPart}
              />
            )}

            {/* STEP 5: SKENARIO (PENDAHULUAN, INTI, PENUTUP) */}
            {step === 5 && (
              <Step5Skenario
                data={data}
                setData={setData}
                onBack={() => setStep(4)}
                onNext={() => setStep(6)}
                loading={loading}
                generateLangkahSpesifik={generateLangkahSpesifik}
              />
            )}

            {/* STEP 6: ASESMEN */}
            {step === 6 && (
              <Step6Asesmen
                data={data}
                setData={setData}
                onBack={() => setStep(5)}
                onNext={() => setStep(7)}
                loading={loading}
                generatePart={generatePart}
              />
            )}

            {/* STEP 7: REFLEKSI */}
            {step === 7 && (
              <Step7Refleksi
                data={data}
                setData={setData}
                onBack={() => setStep(6)}
                onNext={() => setStep(8)}
                loading={loading}
                generatePart={generatePart}
              />
            )}

            {/* STEP 8: PENGAYAAN */}
            {step === 8 && (
              <Step8Pengayaan
                data={data}
                setData={setData}
                onBack={() => setStep(7)}
                onNext={() => setStep(9)}
                loading={loading}
                generatePart={generatePart}
              />
            )}

            {/* STEP 9: GLOSARIUM */}
            {step === 9 && (
              <Step9Glosarium
                data={data}
                setData={setData}
                onBack={() => setStep(8)}
                onNext={() => setStep(10)}
                loading={loading}
                generatePart={generatePart}
              />
            )}

            {/* STEP 10: DAFTAR PUSTAKA */}
            {step === 10 && (
              <Step10Pustaka
                data={data}
                setData={setData}
                onBack={() => setStep(9)}
                onNext={() => setStep(11)}
                loading={loading}
                generatePart={generatePart}
              />
            )}

            {step === 11 && (
              <Step11Finish
                onBack={() => setStep(1)}
                handleReset={handleReset}
              />
            )}
          </div>
        </section>

        {/* PREVIEW PANEL */}
        <section className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[850px]">
          <div className="flex-1 overflow-y-auto p-10 font-serif leading-relaxed text-slate-800 scroll-smooth">
            <PreviewHeader data={data} />

            {/* PREVIEW Informasi Umum */}
            <PreviewIdentitas data={data} />

            {/* PREVIEW Komponen Inti */}
            <PreviewKomponenInti data={data} />

            {/* Di dalam Preview Panel */}
            <PreviewSkenarioPembelajaran
              data={data}
              renderLangkah={renderLangkah}
            />

            {/* LANJUTAN PREVIEW SETELAH LANGKAH PEMBELAJARAN */}
            <PreviewLampiran data={data} parseRefleksi={parseRefleksi} />
          </div>

          {/* FOOTER ACTION PANEL */}
          <div className="p-6 bg-slate-900 flex flex-col items-center gap-3 border-t border-slate-800">
            {loading ? (
              // Tampilan saat AI sedang mengetik
              <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <span className="text-xs font-medium uppercase tracking-widest">
                  PenaPintar sedang menyusun...
                </span>
              </div>
            ) : isModulLengkap() ? (
              // Muncul HANYA jika data sudah lengkap
              <button
                onClick={() => downloadWord(data)}
                className="text-white text-sm font-bold flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95"
              >
                <Download size={18} /> DOWNLOAD MODUL LENGKAP (.DOCX)
              </button>
            ) : (
              // Pesan pemberitahuan jika belum lengkap
              <div className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">
                Selesaikan Step 1 - 10 untuk Mengaktifkan Download
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

import {
  BookOpen,
  BrainCircuit,
  CheckCircle,
  ClipboardList,
  FileText,
  Layers,
  Loader2,
  Wand2,
} from "lucide-react";

export default function Step11Finish({ onBack, handleReset }) {
  return (
    <div className="space-y-4 animate-in fade-in">
      <h2 className="text-lg font-bold flex items-center gap-2 text-green-600">
        <CheckCircle /> Modul Selesai!
      </h2>
      <p className="text-sm text-slate-500">
        Silakan cek pratinjau di sebelah kanan. Anda bisa mengedit teks langsung
        di sana jika ada yang kurang sesuai.
      </p>
      <button
        onClick={onBack}
        className="w-full py-3 bg-slate-100 rounded-xl font-bold text-slate-600"
      >
        Edit Langkah
      </button>
      <button
        onClick={handleReset}
        className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold"
      >
        Buat Modul Baru
      </button>
    </div>
  );
}

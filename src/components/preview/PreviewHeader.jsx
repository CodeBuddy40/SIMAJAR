export default function PreviewHeader({ data }) {
  return (
    <div className="text-center border-b-4 border-double border-slate-900 pb-6 mb-8">
      <h2 className="text-2xl font-black uppercase">
        Modul Ajar Kurikulum Merdeka
      </h2>
      <p className="text-[12px] font-bold text-slate-400 mt-1 uppercase">
        {data.materi || "..................."}
      </p>
    </div>
  );
}

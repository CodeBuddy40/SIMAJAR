export const callMagmaAPI = async (prompt) => {
  try {
    if (!prompt || prompt.trim() === "") return "Prompt kosong.";

    // Membersihkan karakter baris baru dan spasi ganda agar URL tidak rusak
    const cleanPrompt = prompt.replace(/\s+/g, " ").trim();

    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const targetUrl = `https://magma-api.biz.id/ai/gpt5?prompt=${encodeURIComponent(
      cleanPrompt
    )}`;

    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

    if (!response.ok) {
      if (response.status === 408)
        throw new Error("Waktu habis (Timeout). Coba lagi.");
      throw new Error("Gagal mengambil data dari server.");
    }

    const result = await response.json();
    return result.result?.response || "AI tidak memberi jawaban.";
  } catch (error) {
    console.error("API ERROR:", error);
    return `Error: ${error.message}`;
  }
};

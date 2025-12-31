export const callMagmaAPI = async (prompt) => {
  try {
    if (!prompt || prompt.trim() === "") return "Prompt kosong.";

    const cleanPrompt = prompt.replace(/\s+/g, " ").trim();

    const response = await fetch(
      `/api/magma/ai/gpt5?prompt=${encodeURIComponent(cleanPrompt)}`
    );

    if (!response.ok) {
      if (response.status === 504 || response.status === 408) {
        throw new Error("Server sibuk (Timeout). Silakan coba lagi.");
      }
      throw new Error("Gagal terhubung ke AI. Coba beberapa saat lagi.");
    }

    const result = await response.json();
    return result.result?.response || "AI tidak memberi jawaban.";
  } catch (error) {
    console.error("API ERROR:", error);
    return `Error: ${error.message}`;
  }
};

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export type ChatRole = "user" | "assistant";

export interface ChatTurn {
  role: ChatRole;
  content: string;
}

export interface AskArgs {
  query: string;
  history?: ChatTurn[];
  signal?: AbortSignal;
}

export async function askChatbot({
  query,
  history,
  signal,
}: AskArgs): Promise<string> {
  const res = await axios.post<{ response: string }>(
    `${API_BASE_URL}/api/v1/chatbot/ask`,
    { query, history: history ?? [] },
    { signal, timeout: 60_000 }
  );
  return res.data.response;
}

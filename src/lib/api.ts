// ---- API Client ----

import { Message, User } from "@/types";

// 1. Base API URL (works for Next.js environment)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// 2. Response Types
export interface AuthResponse {
  token?: string;
  user?: User;
  [key: string]: string | User | undefined;
}

export interface GenericResponse {
  [key: string]: string | boolean | undefined;
}

export interface MessageResponse {
  messages: Message[];
}

export interface ChatResponse {
  reply: string;
}

// 3. API Client Class
class ApiClient {
  private token: string | null = null;

  constructor() {
    // Client-side only (safe from SSR issues)
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token");
    }
  }

  private async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    let responseBody: unknown = {};
    try {
      responseBody = await response.json();
    } catch {
      // Fallback for non-JSON responses
      responseBody = {};
    }

    if (!response.ok) {
      const msg = (responseBody as { message?: string })?.message || "Request failed";
      throw new Error(msg);
    }

    return responseBody as T;
  }

  // ---- API Methods ----

  // GET messages by sessionId
  async getMessages(sessionId: string): Promise<MessageResponse> {
    return this.request<MessageResponse>(`/chat/messages?sessionId=${sessionId}`);
  }

  // POST a message (user or bot)
  async sendMessage(
    content: string,
    role: "user" | "bot" = "user",
    sessionId?: string
  ): Promise<GenericResponse> {
    return this.request<GenericResponse>("/chat/message", {
      method: "POST",
      body: JSON.stringify({ content, role, sessionId }),
    });
  }

  // POST user message and get bot response
  async getChatResponse(message: string, sessionId?: string): Promise<ChatResponse> {
    return this.request<ChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ message, sessionId }),
    });
  }
}

export const apiClient = new ApiClient();

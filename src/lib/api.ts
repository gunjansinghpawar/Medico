const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  async signUp(email: string, password: string) {
    const response = await this.request<any>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }

    return response;
  }

  async signIn(email: string, password: string) {
    const response = await this.request<any>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }

    return response;
  }

  async signOut() {
    this.token = null;
    localStorage.removeItem('auth_token');
    return { success: true };
  }

  async getMessages() {
    return this.request<any>('/messages');
  }

  async sendMessage(content: string, sessionId?: string) {
    return this.request<any>('/messages', {
      method: 'POST',
      body: JSON.stringify({ content, sessionId }),
    });
  }

  async getChatResponse(message: string) {
    return this.request<any>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async verifyToken() {
    try {
      return await this.request<any>('/auth/verify');
    } catch (error) {
      this.signOut();
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
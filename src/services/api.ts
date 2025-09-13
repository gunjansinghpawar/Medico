const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  message: string;
  [key: string]: T;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config: RequestInit = { ...options, headers };

    try {
      const res = await fetch(url, config);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }

      return data;
    } catch (err) {
      console.error(`API request failed: ${endpoint}`, err);
      throw err;
    }
  }

  // ✅ Auth API
  auth = {
    register: (name: string, email: string, password: string) =>
      this.request<ApiResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }),

    login: (email: string, password: string) =>
      this.request<ApiResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    getMe: (token: string) =>
      this.request<any>('/auth/me', { method: 'GET' }, token),

    verify: (token: string) =>
      this.request<ApiResponse>('/auth/verify', { method: 'GET' }, token),
  };

  // ✅ Chat API
  chat = {
    createSession: (data: any = {}, token?: string) =>
      this.request<any>(
        '/chat/sessions',
        { method: 'POST', body: JSON.stringify(data) },
        token
      ).then((res) => res.session || res),

    getSessions: (token: string) =>
      this.request<{ sessions: Record<string, any[]> }>(
        '/chat/sessions',
        { method: 'GET' },
        token
      ),

    getSession: (sessionId: string, token?: string) =>
      this.request<any>(`/chat/sessions/${sessionId}`, { method: 'GET' }, token),

    sendMessage: (sessionId: string, message: string, messageType = 'text', token?: string) =>
      this.request<any>(
        `/chat/sessions/${sessionId}/messages`,
        { method: 'POST', body: JSON.stringify({ message, messageType }) },
        token
      ).then((res) => ({
        userMessage: res.userMessage,
        botMessage: res.botMessage,
        sessionId: res.sessionId,
        requiresAuth: res.requiresAuth || false,
      })),

    deleteSession: (sessionId: string, token: string) =>
      this.request<ApiResponse>(`/chat/sessions/${sessionId}`, { method: 'DELETE' }, token),
  };

  // ✅ User API
  user = {
    updatePreferences: (preferences: any, token: string) =>
      this.request<ApiResponse>('/user/preferences', {
        method: 'PATCH',
        body: JSON.stringify(preferences),
      }, token),

    updateProfile: (profile: any, token: string) =>
      this.request<ApiResponse>('/user/profile', {
        method: 'PATCH',
        body: JSON.stringify(profile),
      }, token),

    getStats: (token: string) =>
      this.request<{ stats: any }>('/user/stats', { method: 'GET' }, token),
  };

  // ✅ Health API
  health = {
    createOrUpdateProfile: (profileData: any, token: string) =>
      this.request<ApiResponse>('/health/profile', {
        method: 'POST',
        body: JSON.stringify(profileData),
      }, token),

    getProfile: (token: string) =>
      this.request<{ healthProfile: any }>('/health/profile', { method: 'GET' }, token),

    addCondition: (condition: any, token: string) =>
      this.request<ApiResponse>('/health/profile/conditions', {
        method: 'POST',
        body: JSON.stringify(condition),
      }, token),

    addMedication: (medication: any, token: string) =>
      this.request<ApiResponse>('/health/profile/medications', {
        method: 'POST',
        body: JSON.stringify(medication),
      }, token),

    recordVitals: (vitals: any, token: string) =>
      this.request<ApiResponse>('/health/profile/vitals', {
        method: 'POST',
        body: JSON.stringify(vitals),
      }, token),
  };
}

const apiService = new ApiService();

export const authAPI = apiService.auth;
export const chatAPI = apiService.chat;
export const userAPI = apiService.user;
export const healthAPI = apiService.health;

export default apiService;

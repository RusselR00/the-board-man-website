// Utility functions for making authenticated API calls

export class ApiClient {
  private static getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-token')
    }
    return null
  }

  private static getHeaders(): HeadersInit {
    const token = this.getAuthToken()
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  static async get(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  static async post(url: string, data: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  static async patch(url: string, data: any) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  static async delete(url: string) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }
}

// Specific API functions for admin operations
export const adminApi = {
  // Dashboard stats
  getStats: () => ApiClient.get('/api/admin/stats'),

  // Contacts
  getContacts: (page = 1, limit = 10, status = 'all') => 
    ApiClient.get(`/api/admin/contacts?page=${page}&limit=${limit}&status=${status}`),
  
  updateContactStatus: (id: string, status: string) =>
    ApiClient.patch('/api/admin/contacts', { id, status }),

  // Bookings
  getBookings: (page = 1, limit = 10, status = 'all') =>
    ApiClient.get(`/api/admin/bookings?page=${page}&limit=${limit}&status=${status}`),
  
  updateBookingStatus: (id: string, status: string) =>
    ApiClient.patch('/api/admin/bookings', { id, status }),
}

export default ApiClient
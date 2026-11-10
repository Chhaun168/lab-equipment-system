// frontend/src/api/loansApi.ts
const API_URL = 'http://localhost:3000';

export const loansApi = {
  async list() {
    const res = await fetch(`${API_URL}/loans`);
    if (!res.ok) throw new Error('Failed to fetch loan requests');
    return res.json();
  },
  async create(loanData: any) {
    const res = await fetch(`${API_URL}/loans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loanData)
    });
    if (!res.ok) throw new Error('Failed to create loan request');
    return res.json();
  },
  async updateStatus(id: number | string, status: string) {
    const res = await fetch(`${API_URL}/loans/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update loan status');
    return res.json();
  }
};
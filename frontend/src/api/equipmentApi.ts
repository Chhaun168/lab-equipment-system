// frontend/src/api/equipmentApi.ts
const API_URL = 'http://localhost:3000';

export const equipmentApi = {
  async list() {
    const res = await fetch(`${API_URL}/equipment`);
    if (!res.ok) throw new Error('Failed to fetch equipment catalog');
    return res.json();
  },
  async getById(id: string | number) {
    const res = await fetch(`${API_URL}/equipment/${id}`);
    if (!res.ok) throw new Error('Failed to fetch equipment details');
    return res.json();
  }
};
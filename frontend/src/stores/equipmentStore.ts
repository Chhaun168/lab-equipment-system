// frontend/src/stores/equipmentStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Equipment } from '../types';
import { equipmentApi } from '../api/equipmentApi';

export const useEquipmentStore = defineStore('equipment', () => {
  const equipmentList = ref<Equipment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchEquipment() {
    loading.value = true;
    error.value = null;
    try {
      equipmentList.value = await equipmentApi.list();
    } catch (err: any) {
      error.value = err.message || 'Failed to load equipment';
    } finally {
      loading.value = false;
    }
  }

  return {
    equipmentList,
    loading,
    error,
    fetchEquipment
  };
});
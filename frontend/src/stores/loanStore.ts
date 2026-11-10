// frontend/src/stores/loanStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LoanRequest } from '../types';
import { loansApi } from '../api/loansApi';

export const useLoanStore = defineStore('loan', () => {
  const loans = ref<LoanRequest[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchLoans() {
    loading.value = true;
    error.value = null;
    try {
      loans.value = await loansApi.list();
    } catch (err: any) {
      error.value = err.message || 'Failed to load loans';
    } finally {
      loading.value = false;
    }
  }

  async function createLoanRequest(loanData: any) {
    loading.value = true;
    error.value = null;
    try {
      const newLoan = await loansApi.create(loanData);
      loans.value.unshift(newLoan);
      return true;
    } catch (err: any) {
      error.value = err.message || 'Failed to submit loan request';
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function updateLoanStatus(id: number | string, status: string) {
    try {
      await loansApi.updateStatus(id, status);
      await fetchLoans();
    } catch (err: any) {
      error.value = err.message || 'Failed to update status';
    }
  }

  return {
    loans,
    loading,
    error,
    fetchLoans,
    createLoanRequest,
    updateLoanStatus
  };
});
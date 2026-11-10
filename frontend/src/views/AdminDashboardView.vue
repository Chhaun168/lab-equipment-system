<!-- frontend/src/views/AdminDashboardView.vue -->
<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header & Navigation -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p class="text-slate-500 mt-1">Manage and approve incoming equipment loan requests.</p>
        </div>
        <div class="flex gap-3">
          <router-link 
            to="/loans" 
            class="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition shadow-sm text-sm"
          >
            View Loan History
          </router-link>
          <router-link 
            to="/" 
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition shadow-sm"
          >
            ← Catalog
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-slate-600 font-medium">Loading admin dashboard...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
        <p class="font-bold">Error</p>
        <p class="text-sm">{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Empty State -->
        <div v-if="loans.length === 0" class="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-slate-500 text-lg">No pending or active loan requests to manage.</p>
        </div>

        <!-- Requests Table -->
        <div v-else class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th class="p-4">Equipment</th>
                  <th class="p-4">Student</th>
                  <th class="p-4">Dates & Qty</th>
                  <th class="p-4">Reason</th>
                  <th class="p-4">Status</th>
                  <th class="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr v-for="loan in loans" :key="loan.id" class="hover:bg-slate-50 transition">
                  <td class="p-4 font-semibold text-slate-900">{{ loan.equipmentName || `Equipment #${loan.equipmentId}` }}</td>
                  <td class="p-4 text-slate-600">
                    <p class="font-medium text-slate-900">{{ loan.studentName }}</p>
                    <p class="text-xs text-slate-400">{{ loan.studentEmail }}</p>
                  </td>
                  <td class="p-4 text-slate-600 text-xs">
                    <p>📅 {{ loan.startDate }} to {{ loan.endDate }}</p>
                    <p class="font-medium text-slate-800 mt-0.5">Qty: {{ loan.quantity }}</p>
                  </td>
                  <td class="p-4 text-slate-500 max-w-xs truncate">{{ loan.reason }}</td>
                  <td class="p-4">
                    <span 
                      class="text-xs font-bold px-2.5 py-1 rounded-full"
                      :class="{
                        'bg-amber-50 text-amber-700': loan.status === 'PENDING',
                        'bg-blue-50 text-blue-700': loan.status === 'APPROVED',
                        'bg-green-50 text-green-700': loan.status === 'ACTIVE' || loan.status === 'RETURNED',
                        'bg-red-50 text-red-700': loan.status === 'REJECTED'
                      }"
                    >
                      {{ loan.status }}
                    </span>
                  </td>
                  <td class="p-4 text-right space-x-2">
                    <button 
                      v-if="loan.status === 'PENDING'"
                      @click="updateStatus(loan.id, 'APPROVED')"
                      class="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 transition shadow-sm"
                    >
                      Approve
                    </button>
                    <button 
                      v-if="loan.status === 'PENDING'"
                      @click="updateStatus(loan.id, 'REJECTED')"
                      class="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition shadow-sm"
                    >
                      Reject
                    </button>
                    <span v-if="loan.status !== 'PENDING'" class="text-xs text-slate-400 italic">No actions needed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { LoanRequest } from '../types';

const loans = ref<LoanRequest[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchAdminLoans = async () => {
  loading.value = true;
  try {
    const res = await fetch('http://localhost:3000/loans');
    if (!res.ok) throw new Error('Failed to load loans');
    loans.value = await res.json();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (loanId: number, newStatus: string) => {
  try {
    const res = await fetch(`http://localhost:3000/loans/${loanId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Failed to update loan status');
    
    // Refresh local list
    await fetchAdminLoans();
  } catch (err: any) {
    alert(err.message || 'Error updating status');
  }
};

onMounted(() => {
  fetchAdminLoans();
});
</script>
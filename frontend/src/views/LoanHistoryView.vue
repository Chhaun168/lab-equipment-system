<!-- frontend/src/views/LoanHistoryView.vue -->
<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Page Header & Navigation -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">My Loan Requests</h1>
          <p class="text-slate-500 mt-1">Track the status of your equipment borrowing requests.</p>
        </div>
        <router-link 
          to="/" 
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition shadow-sm"
        >
          ← Back to Catalog
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loanStore.loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-slate-600 font-medium">Loading loan history...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="loanStore.error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
        <p class="font-bold">Failed to load loans</p>
        <p class="text-sm">{{ loanStore.error }}</p>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Empty State -->
        <div v-if="loanStore.loans.length === 0" class="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-slate-500 text-lg mb-4">No loan requests found.</p>
          <router-link to="/" class="text-indigo-600 font-semibold hover:underline">
            Browse equipment and submit a request
          </router-link>
        </div>

        <!-- Loans Table -->
        <div v-else class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th class="p-4">Equipment</th>
                  <th class="p-4">Student</th>
                  <th class="p-4">Dates</th>
                  <th class="p-4">Qty</th>
                  <th class="p-4">Reason</th>
                  <th class="p-4">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr v-for="loan in loanStore.loans" :key="loan.id" class="hover:bg-slate-50 transition">
                  <td class="p-4 font-semibold text-slate-900">{{ loan.equipmentName || `Equipment #${loan.equipmentId}` }}</td>
                  <td class="p-4 text-slate-600">
                    <p class="font-medium text-slate-900">{{ loan.studentName }}</p>
                    <p class="text-xs text-slate-400">{{ loan.studentEmail }}</p>
                  </td>
                  <td class="p-4 text-slate-600 text-xs">
                    <p>📅 From: <span class="font-medium text-slate-800">{{ loan.startDate }}</span></p>
                    <p>📅 To: <span class="font-medium text-slate-800">{{ loan.endDate }}</span></p>
                  </td>
                  <td class="p-4 text-slate-700 font-medium">{{ loan.quantity }}</td>
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
import { onMounted } from 'vue';
import { useLoanStore } from '../stores/loanStore';

const loanStore = useLoanStore();

onMounted(() => {
  loanStore.fetchLoans();
});
</script>
<!-- frontend/src/views/EquipmentDetailView.vue -->
<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Navigation Back -->
      <div class="mb-6">
        <router-link 
          to="/catalog" 
          class="text-indigo-600 font-semibold hover:text-indigo-800 transition flex items-center gap-1"
        >
          ← Back to Catalog
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-slate-600 font-medium">Loading equipment details...</span>
      </div>

      <!-- Equipment Details & Request Form Card -->
      <div v-else-if="equipment" class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-8">
        <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-slate-100 pb-6">
          <div>
            <span class="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
              {{ equipment.category }}
            </span>
            <h1 class="text-3xl font-extrabold text-slate-900 mt-2">{{ equipment.name }}</h1>
            <p class="text-slate-500 mt-1">{{ equipment.description }}</p>
          </div>
          <span 
            class="text-xs font-bold px-3 py-1.5 rounded-full"
            :class="{
              'bg-green-50 text-green-700': equipment.status === 'AVAILABLE',
              'bg-amber-50 text-amber-700': equipment.status === 'LOW_STOCK',
              'bg-red-50 text-red-700': equipment.status === 'FULL'
            }"
          >
            {{ equipment.status }}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div class="space-y-3 bg-slate-50 p-5 rounded-lg border border-slate-100 h-fit">
            <h3 class="font-bold text-slate-800 mb-2">Equipment Info</h3>
            <p class="text-sm text-slate-600">📍 Location: <span class="font-semibold text-slate-900">{{ equipment.location }}</span></p>
            <p class="text-sm text-slate-600">📦 Total Stock: <span class="font-semibold text-slate-900">{{ equipment.totalQuantity }}</span></p>
            <p class="text-sm text-slate-600">✅ Available: <span class="font-semibold text-slate-900">{{ equipment.availableQuantity }}</span></p>
          </div>

          <!-- Loan Request Form -->
          <div>
            <h3 class="font-bold text-slate-800 mb-4">Request Loan for this Item</h3>
            <form @submit.prevent="submitRequest" class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input 
                  v-model="form.studentName" 
                  type="text" 
                  placeholder="e.g. Chum Kimchhun" 
                  class="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2"
                  :class="submitted && errors.studentName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'"
                />
                <p v-if="submitted && errors.studentName" class="text-red-500 text-xs mt-1">{{ errors.studentName }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
                <input 
                  v-model="form.studentEmail" 
                  type="email" 
                  placeholder="e.g. kimchhun.chum@student.edu" 
                  class="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2"
                  :class="submitted && errors.studentEmail ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'"
                />
                <p v-if="submitted && errors.studentEmail" class="text-red-500 text-xs mt-1">{{ errors.studentEmail }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input 
                    v-model="form.startDate" 
                    type="date" 
                    class="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2"
                    :class="submitted && errors.startDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'"
                  />
                  <p v-if="submitted && errors.startDate" class="text-red-500 text-xs mt-1">{{ errors.startDate }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input 
                    v-model="form.endDate" 
                    type="date" 
                    class="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2"
                    :class="submitted && errors.endDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'"
                  />
                  <p v-if="submitted && errors.endDate" class="text-red-500 text-xs mt-1">{{ errors.endDate }}</p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                <input 
                  v-model.number="form.quantity" 
                  type="number" 
                  min="1" 
                  :max="equipment.availableQuantity" 
                  class="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2"
                  :class="submitted && errors.quantity ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'"
                />
                <p v-if="submitted && errors.quantity" class="text-red-500 text-xs mt-1">{{ errors.quantity }}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Reason for Loan</label>
                <textarea 
                  v-model="form.reason" 
                  rows="2" 
                  placeholder="e.g. Embedded systems project assignment"
                  class="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2"
                  :class="submitted && errors.reason ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-500'"
                ></textarea>
                <p v-if="submitted && errors.reason" class="text-red-500 text-xs mt-1">{{ errors.reason }}</p>
              </div>

              <button 
                type="submit" 
                :disabled="submitting || equipment.availableQuantity === 0"
                class="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition disabled:bg-slate-300 shadow-sm"
              >
                {{ submitting ? 'Submitting Request...' : 'Submit Loan Request' }}
              </button>

              <p v-if="successMessage" class="text-green-600 text-sm font-semibold text-center mt-2">{{ successMessage }}</p>
              <p v-if="errorMessage" class="text-red-600 text-sm font-semibold text-center mt-2">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20 bg-white rounded-xl border border-slate-200">
        <p class="text-slate-500">Equipment item not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Equipment } from '../types';
import { useEquipmentStore } from '../stores/equipmentStore';
import { useLoanStore } from '../stores/loanStore';
import { validateLoanRequest } from '../validation';
import { equipmentApi } from '../api/equipmentApi';

const route = useRoute();
const router = useRouter();
const loanStore = useLoanStore();

const equipment = ref<Equipment | null>(null);
const loading = ref(true);
const submitting = ref(false);
const submitted = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const form = ref({
  studentName: '',
  studentEmail: '',
  startDate: '',
  endDate: '',
  quantity: 1,
  reason: ''
});

const errors = computed(() => {
  return validateLoanRequest(form.value, equipment.value?.availableQuantity || 0);
});

onMounted(async () => {
  const equipmentId = route.params.id as string;
  try {
    equipment.value = await equipmentApi.getById(equipmentId);
  } catch (err) {
    errorMessage.value = 'Could not load equipment details.';
  } finally {
    loading.value = false;
  }
});

const submitRequest = async () => {
  submitted.value = true;
  if (Object.keys(errors.value).length > 0) return;
  if (!equipment.value) return;

  submitting.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  const success = await loanStore.createLoanRequest({
    equipmentId: equipment.value.id,
    equipmentName: equipment.value.name,
    studentName: form.value.studentName,
    studentEmail: form.value.studentEmail,
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    quantity: form.value.quantity,
    reason: form.value.reason
  });

  submitting.value = false;
  if (success) {
    successMessage.value = 'Loan request submitted successfully! Redirecting...';
    setTimeout(() => {
      router.push('/loans');
    }, 1500);
  } else {
    errorMessage.value = loanStore.error || 'Failed to submit request.';
  }
};
</script>
<!-- frontend/src/views/CatalogView.vue -->
<template>
  <div class="min-h-screen bg-slate-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Page Header -->
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Lab Equipment Catalog</h1>
          <p class="text-slate-500 mt-1">Browse, search, and request lab equipment for your projects.</p>
        </div>
        <router-link 
          to="/loans" 
          class="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition shadow-sm"
        >
          View My Loan Requests
        </router-link>
      </header>

      <!-- Loading State -->
      <div v-if="equipmentStore.loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span class="ml-3 text-slate-600 font-medium">Loading equipment catalog...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="equipmentStore.error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
        <p class="font-bold">Failed to load equipment</p>
        <p class="text-sm">{{ equipmentStore.error }}</p>
        <button 
          @click="equipmentStore.fetchEquipment()" 
          class="mt-3 px-3 py-1.5 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>

      <!-- Content / Equipment Grid -->
      <div v-else>
        <!-- Empty State -->
        <div v-if="equipmentStore.equipmentList.length === 0" class="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p class="text-slate-500 text-lg">No equipment found in the catalog.</p>
        </div>

        <!-- Equipment Grid Cards -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in equipmentStore.equipmentList" 
            :key="item.id"
            class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden"
          >
            <div class="p-5 flex-1 flex flex-col">
              <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                  {{ item.category }}
                </span>
                <span 
                  class="text-xs font-bold px-2.5 py-1 rounded-full"
                  :class="{
                    'bg-green-50 text-green-700': item.status === 'AVAILABLE',
                    'bg-amber-50 text-amber-700': item.status === 'LOW_STOCK',
                    'bg-red-50 text-red-700': item.status === 'FULL'
                  }"
                >
                  {{ item.status }}
                </span>
              </div>

              <h3 class="text-lg font-bold text-slate-900 mb-1">{{ item.name }}</h3>
              <p class="text-sm text-slate-500 mb-4 flex-1">{{ item.description }}</p>

              <div class="text-xs text-slate-400 space-y-1 mb-4 border-t border-slate-100 pt-3">
                <p>📍 Location: <span class="font-medium text-slate-600">{{ item.location }}</span></p>
                <p>📦 Available: <span class="font-medium text-slate-600">{{ item.availableQuantity }} / {{ item.totalQuantity }}</span></p>
              </div>

              <router-link 
                :to="`/equipment/${item.id}`"
                class="w-full text-center py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition"
              >
                View Details & Request
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useEquipmentStore } from '../stores/equipmentStore';

const equipmentStore = useEquipmentStore();

onMounted(() => {
  equipmentStore.fetchEquipment();
});
</script>
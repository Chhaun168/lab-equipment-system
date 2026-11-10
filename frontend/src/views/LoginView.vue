<!-- frontend/src/views/LoginView.vue -->
<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
    <div class="max-w-md w-full bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <div class="text-center mb-8">
        <span class="text-3xl">🔬</span>
        <h1 class="text-2xl font-extrabold text-slate-900 mt-2">Lab Equipment System</h1>
        <p class="text-slate-500 text-sm mt-1">Select your portal to continue</p>
      </div>

      <div class="space-y-4">
        <button 
          @click="loginAsStudent"
          class="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition shadow-sm flex items-center justify-center gap-2"
        >
          <span>🎓</span> Login as Student (Equipment Catalog)
        </button>

        <button 
          @click="loginAsAdmin"
          class="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-semibold text-sm hover:bg-slate-800 transition shadow-sm flex items-center justify-center gap-2"
        >
          <span>🛠️</span> Login as Administrator (Dashboard)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const loginAsStudent = () => {
  localStorage.setItem('userRole', 'STUDENT');
  router.push('/catalog');
};

const loginAsAdmin = () => {
  localStorage.setItem('userRole', 'ADMIN');
  router.push('/admin');
};
</script>
<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-xl font-bold text-indigo-600 mb-4">Forgot Password</h2>
      <form @submit.prevent="submitEmail">
        <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email" required class="w-full p-2 border rounded" />
        <button type="submit" class="w-full mt-4 bg-indigo-500 text-white py-2 rounded">Send Reset Token</button>
      </form>
      <p v-if="message" class="text-green-600 mt-3">{{ message }}</p>
      <p v-if="token" class="text-sm mt-2">🔐 Token: {{ token }}</p>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../services/api';

export default {
  data() {
    return { email: '', message: '', token: '' };
  },
  methods: {
    async submitEmail() {
      try {
        const res = await authAPI.forgotPassword(this.email);
        this.message = res.data.message;
        this.token = res.data.token;
      } catch (err) {
        this.message = 'Failed to send reset request';
      }
    }
  }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-xl font-bold text-indigo-600 mb-4">Reset Password</h2>
      <form @submit.prevent="reset">
        <label class="block mb-2">New Password</label>
        <input v-model="password" type="password" class="w-full border p-2 rounded" required />
        <button class="w-full mt-4 bg-indigo-600 text-white py-2 rounded">Reset Password</button>
        <p class="text-green-600 mt-3" v-if="message">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../services/api';

export default {
  data() {
    return { password: '', message: '' };
  },
  methods: {
    async reset() {
      try {
        const token = this.$route.params.token;
        const res = await authAPI.resetPassword(token, this.password);
        this.message = res.data.message;
      } catch {
        this.message = 'Reset failed';
      }
    }
  }
};
</script>

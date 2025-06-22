<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">Create an Account</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Name</label>
          <input v-model="name" type="text" required class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-lg" />
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">Register</button>
        <p class="text-red-500 mt-3" v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../services/api';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        await authAPI.register({
          name: this.name,
          email: this.email,
          password: this.password,
          role: 'pet_owner'
        });
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed';
      }
    }
  }
};
</script>

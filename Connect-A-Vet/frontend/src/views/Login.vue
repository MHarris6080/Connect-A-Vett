<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-indigo-600 mb-6">Login to VetConnect</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" required />
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">Login</button>
        <p class="text-red-500 mt-3" v-if="error">{{ error }}</p>
        <p class="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?
          <router-link to="/register" class="text-indigo-600 font-medium hover:underline">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { authAPI } from '../services/api';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await authAPI.login({
          email: this.email,
          password: this.password
        });

        // Save token + user info in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to dashboard
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

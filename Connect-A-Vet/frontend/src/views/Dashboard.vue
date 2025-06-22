<template>
  <div class="p-6">
    <h1 class="text-3xl font-semibold mb-6 text-indigo-600">Dashboard</h1>

    <!-- Navigation Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <router-link to="/book" class="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-xl font-bold text-teal-600">Book Appointment</h2>
        <p class="text-gray-500">Schedule your pet's next visit easily</p>
      </router-link>
      <router-link to="/records" class="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-xl font-bold text-blue-600">Pet Records</h2>
        <p class="text-gray-500">View and manage your pet's medical history</p>
      </router-link>
      <router-link to="/admin" v-if="isAdmin" class="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
        <h2 class="text-xl font-bold text-purple-600">Admin Panel</h2>
        <p class="text-gray-500">Manage system settings and user roles</p>
      </router-link>
    </div>

    <!-- Appointments Section -->
    <div>
      <h2 class="text-2xl font-semibold text-indigo-500 mb-4">Appointments</h2>

      <p v-if="error" class="text-red-600 mb-4">{{ error }}</p>

      <div v-if="appointments.length === 0" class="text-gray-500">
        No appointments found.
      </div>

      <ul v-else class="divide-y divide-gray-200 bg-white rounded-xl shadow overflow-hidden">
        <li v-for="appt in appointments" :key="appt._id" class="px-6 py-4">
          <div class="text-base font-medium text-gray-800">{{ appt.pet }}</div>
          <div class="text-sm text-gray-500">📅 {{ appt.date }} ⏰ {{ appt.time }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { appointmentAPI } from '../services/api';

export default {
  name: 'Dashboard',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      appointments: [],
      error: ''
    };
  },
  computed: {
    isOwner() {
      return this.user?.role === 'pet_owner';
    },
    isAdmin() {
      return this.user?.role === 'admin';
    }
  },
  async created() {
    try {
      const response = await appointmentAPI.getAll();
      this.appointments = response.data;
    } catch (err) {
      this.error = 'Failed to load appointments. Please try again.';
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

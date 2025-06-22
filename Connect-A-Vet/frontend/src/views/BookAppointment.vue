<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-4 text-indigo-600">Book an Appointment</h1>
    <form @submit.prevent="submit">
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Pet Name</label>
        <input v-model="pet" type="text" class="w-full border px-4 py-2 rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Date</label>
        <input v-model="date" type="date" class="w-full border px-4 py-2 rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Time</label>
        <input v-model="time" type="time" class="w-full border px-4 py-2 rounded-lg" required />
      </div>
      <button type="submit" class="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition">Book Now</button>
      <p class="text-green-600 mt-3" v-if="message">{{ message }}</p>

      <p class="text-red-600 mt-3" v-if="error">{{ error }}</p>

    </form>
  </div>
</template>

<script>
import { appointmentAPI } from '../services/api';

export default {
  name: 'BookAppointment',
  data() {
    return {
      pet: '',
      date: '',
      time: '',
      message: '',
      error: ''
    };
  },
  methods: {
    async submit() {
      try {
        await appointmentAPI.create({
          pet: this.pet,
          date: this.date,
          time: this.time
        });

        this.message = '✅ Appointment booked successfully!';
        this.error = '';
        this.pet = this.date = this.time = '';
      } catch (err) {
        this.message = '';
        this.error = err.response?.data?.message || '❌ Failed to book appointment';
      }
    }
  }
};
</script>


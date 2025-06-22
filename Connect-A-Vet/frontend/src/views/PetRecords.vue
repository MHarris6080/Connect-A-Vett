<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold text-indigo-600 mb-4">Pet Records</h1>

<form @submit.prevent="addPet" class="bg-white rounded-xl shadow-md p-6 border space-y-6 mb-10">
  <h2 class="text-xl font-semibold text-indigo-700 mb-4 border-b pb-2">Pet Clinical Chart</h2>

  <!-- Pet Identity -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block font-medium text-gray-700 mb-1">Pet Name</label>
      <input v-model="form.name" type="text" class="w-full border px-4 py-2 rounded-md" required />
    </div>
    <div>
      <label class="block font-medium text-gray-700 mb-1">Species</label>
      <input v-model="form.species" type="text" class="w-full border px-4 py-2 rounded-md" required />
    </div>
    <div>
      <label class="block font-medium text-gray-700 mb-1">Breed</label>
      <input v-model="form.breed" type="text" class="w-full border px-4 py-2 rounded-md" />
    </div>
  </div>

  <!-- Health Details -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block font-medium text-gray-700 mb-1">Age (Years)</label>
      <input v-model.number="form.age" type="number" class="w-full border px-4 py-2 rounded-md" />
    </div>
    <div>
      <label class="block font-medium text-gray-700 mb-1">Weight (kg)</label>
      <input v-model.number="form.weight" type="number" class="w-full border px-4 py-2 rounded-md" />
    </div>
  </div>

  <!-- Medical History -->
  <div>
    <label class="block font-medium text-gray-700 mb-1">Medical History</label>
    <textarea
      v-model="form.medicalHistory"
      placeholder="Comma-separated e.g., Rabies vaccine, Allergies"
      rows="3"
      class="w-full border px-4 py-2 rounded-md"
    ></textarea>
  </div>

  <!-- Submit -->
  <div class="text-right">
    <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold">
      {{ editingPetId ? 'Update Pet' : 'Add Pet' }}
    </button>
  </div>
</form>


    <ul class="space-y-4">
      <li v-for="pet in pets" :key="pet._id" class="bg-white p-4 rounded-xl shadow">
        <h2 class="text-lg font-bold text-gray-800">{{ pet.name }}</h2>
        <p class="text-sm text-gray-600">Species: {{ pet.species }}, Breed: {{ pet.breed }}</p>
        <p class="text-sm text-gray-600">Age: {{ pet.age }} yrs, Weight: {{ pet.weight }} kg</p>
        <p class="text-sm text-gray-600">History: {{ pet.medicalHistory?.join(', ') || 'None' }}</p>
        <div class="mt-2 flex gap-4">
          <button @click="startEdit(pet)" class="text-blue-600 hover:underline">Edit</button>
          <button @click="deletePet(pet._id)" class="text-red-600 hover:underline">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { petAPI } from '../services/api';

export default {
  name: 'PetRecords',
  data() {
    return {
      pets: [],
      editingPetId: null,
      form: {
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: '',
        medicalHistory: ''
      }
    };
  },
  async created() {
    const res = await petAPI.getAll();
    this.pets = res.data;
  },
  methods: {
    async addPet() {
      const petData = {
        ...this.form,
        medicalHistory: this.form.medicalHistory
          ? this.form.medicalHistory.split(',').map(s => s.trim())
          : []
      };

      if (this.editingPetId) {
        const res = await petAPI.update(this.editingPetId, petData);
        const index = this.pets.findIndex(p => p._id === this.editingPetId);
        this.$set(this.pets, index, res.data.pet);
        this.editingPetId = null;
      } else {
        const res = await petAPI.create(petData);
        this.pets.push(res.data);
      }

      this.resetForm();
    },
    startEdit(pet) {
      this.form = {
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        age: pet.age,
        weight: pet.weight,
        medicalHistory: pet.medicalHistory.join(', ')
      };
      this.editingPetId = pet._id;
    },
    async deletePet(id) {
      if (!confirm('Are you sure you want to delete this pet?')) return;
      await petAPI.delete(id);
      this.pets = this.pets.filter(p => p._id !== id);
    },
    resetForm() {
      this.form = {
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: '',
        medicalHistory: ''
      };
      this.editingPetId = null;
    }
  }
};
</script>

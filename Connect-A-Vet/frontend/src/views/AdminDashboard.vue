<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4 text-purple-600">Admin Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-6 bg-white rounded-xl shadow">
        <h3 class="text-lg font-bold mb-2">User Management</h3>
        <p class="text-gray-500">Add or remove user roles</p>
      </div>
      <div class="p-6 bg-white rounded-xl shadow">
        <h3 class="text-lg font-bold mb-2">System Settings</h3>
        <p class="text-gray-500">Manage core configuration</p>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'AdminDashboard' };
</script>

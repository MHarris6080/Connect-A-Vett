<template>
  <div class="relative h-screen w-full">
    <!-- Background Image -->
    <img
      src="/img/andrew-s-ouo1hbizWwo-unsplash.jpg"
      alt="Pets"
      class="absolute inset-0 object-cover w-full h-full"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div class="text-center text-white px-4">
        <h1 class="text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Welcome to VetConnect
        </h1>
        <p class="text-xl mb-6 font-light max-w-xl mx-auto">
          Caring for pets, powered by technology. Book appointments, manage records, and connect with your clinic — all in one place.
        </p>
        <router-link
          to="/login"
          class="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
/* Optional: animate image on load */
img {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>


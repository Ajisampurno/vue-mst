<template>
  <div id="app">
    <Navbar v-if="!isAuthPage" />
    <Sidebar v-if="!isAuthPage" />
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar
  },
  setup() {
    const route = useRoute();
    const isAuthPage = computed(() => route.path === '/login' || route.path === '/register');

    return {
      isAuthPage
    };
  }
};
</script>

<script setup>
import { erLayout } from 'errantia'
import { onMounted } from 'vue';
import { useConnectSyslabCenter } from './hooks/useConnectSyslabCenter';

const { initFilePath } = useConnectSyslabCenter()
onMounted(async () => {
   await initFilePath()
})
</script>

<template>
  <erLayout>
    <template #header>
      <div>Header</div>
    </template>
    <template #leftSidebar>
      <div>Sidebar</div>
    </template>
    <template #main>
      <div>Content</div>
    </template>
    <template #footer>
      <div>Footer</div>
    </template>
  </erLayout>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { useIp } from '@/composables/use-ip'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const ipValue = ref('')
const { ipInfo, fetchIp } = useIp()

onBeforeMount(() => {
  const rawIp = Array.isArray(route.params.ip) ? route.params.ip[0] : route.params.ip

  const ip = rawIp?.toString()
  if (ip) {
    ipValue.value = ip
    fetchIp(ip)
  }
})

const tableData = computed(() => {
  if (!ipInfo.value) {
    return []
  }
  return Object.entries(ipInfo.value).map(([key, value]) => ({
    key,
    value,
  }))
})

const handlePreviousPage = () => {
  router.go(-1)
}
</script>

<template>
  <el-breadcrumb class="hoverEffect" separator=">">
    <el-breadcrumb-item @click="handlePreviousPage">Проверка IP</el-breadcrumb-item>
    <el-breadcrumb-item>{{ ipValue }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div v-if="ipInfo">
    <h1>{{ ipValue }}</h1>
    <el-table :data="tableData" stripe>
      <el-table-column prop="key" />
      <el-table-column prop="value" />
    </el-table>
  </div>
  <div v-else>
    <el-empty description="Нет информации" />
  </div>
</template>

<style scoped>
.hoverEffect {
  cursor: pointer;
}
</style>

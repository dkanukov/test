<script setup lang="ts">
import { checkSubstring } from '@/helpers/checkSubstring'
import type { IpInfo } from '@/models/ip'
import { computed, onBeforeMount, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps<{
  ipsInfo: IpInfo[]
  whenDelete: (ip: string) => void
}>()
const router = useRouter()
const route = useRoute()

const searchQuery = ref('')

onBeforeMount(() => {
  const query = route.query

  if (query.search) {
    const value = Array.isArray(query.search)
      ? query.search[0]?.toString()
      : query.search.toString()
    if (value) {
      searchQuery.value = value
    }
  }
})

watchEffect(() => {
  router.push({
    query: {
      ...route.query,
      search: searchQuery.value ? searchQuery.value : undefined,
    },
  })
})

const filteredIps = computed(() =>
  props.ipsInfo.filter(
    ({ ip, country, regionName }) =>
      checkSubstring(ip, searchQuery.value) ||
      checkSubstring(country, searchQuery.value) ||
      checkSubstring(regionName, searchQuery.value),
  ),
)
</script>

<template>
  <div class="table">
    <div class="search">
      <span class="inputLabel">Поиск по таблице</span>
      <el-input v-model="searchQuery" placeholder="Что вы хотите найти?" size="large" />
    </div>
    <el-table :data="filteredIps" header-cell-class-name="headerColumn">
      <el-table-column sortbale prop="ip" label="IP" />
      <el-table-column sortbale prop="country" label="Country" />
      <el-table-column sortbale prop="regionName" label="Region" />
      <el-table-column sortbale fixed="right" width="100">
        <template #default="{ row }">
          <div class="controls">
            <el-button icon="DeleteFilled" type="danger" @click="() => props.whenDelete(row.ip)" />
            <RouterLink :to="row.ip">
              <el-icon><ArrowRightBold /></el-icon>
            </RouterLink>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="css">
.search {
  margin-bottom: 24px;
}

.inputLabel {
  color: #6b6d80;
  font-weight: 500;
}

.headerColumn {
  background-color: #f7f9fb !important;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>

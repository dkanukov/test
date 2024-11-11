<script setup lang="ts">
import IpsTable from '@/components/IpsTable.vue'
import { useIpInfo } from '@/composables/use-ip-info'

const { ips, ipsInfo, handleStartIpsCheck, handleDelete } = useIpInfo()
</script>

<template>
  <div class="root">
    <div>
      <h2>Проверка IP</h2>
      <div class="ipsInputSection">
        <h3>Ваши IP</h3>
        <el-input
          class="ipsInput"
          v-model="ips"
          :autosize="{ minRows: 5, maxRows: 15 }"
          type="textarea"
          placeholder="Введите ваши IP"
        />
        <el-button type="info" @click="handleStartIpsCheck"> Начать проверку </el-button>
      </div>
    </div>
    <div v-if="ipsInfo.length">
      <h2>Результаты</h2>
      <IpsTable :ips-info="ipsInfo" :when-delete="handleDelete" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.root {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.ipsInputSection {
  background-color: #f7f9fb;
  border-radius: 16px;
  padding: 24px;
}

.ipsInput {
  margin-bottom: 24px;
}
</style>

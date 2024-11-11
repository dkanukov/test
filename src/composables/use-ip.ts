import { getIpInfo } from '@/api/getIPInfo'
import type { IpInfo } from '@/models/ip'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

export const useIp = () => {
  const ipInfo = ref<IpInfo | null>(null)

  const fetchIp = async (ip: string) => {
    const { data, error } = await getIpInfo(ip)

    if (data) {
      ipInfo.value = data
    } else {
      ElNotification({
        title: error,
        type: 'error',
      })
    }
  }

  return {
    ipInfo,
    fetchIp,
  }
}

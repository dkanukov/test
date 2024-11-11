import { getIpInfo } from '@/api/getIPInfo'
import type { IpInfo } from '@/models/ip'
import { computed, onBeforeMount, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export const useIpInfo = () => {
  const router = useRouter()
  const route = useRoute()
  const ips = ref('')
  const ipsInfo = ref<IpInfo[]>([])
  const isFetching = ref(false)

  onBeforeMount(() => {
    const query = route.query

    if (query.ips) {
      const value = Array.isArray(query.ips) ? query.ips[0]?.toString() : query.ips.toString()
      if (value) {
        ips.value = value
      }
    }
  })

  const ipsArray = computed(() => {
    return ips.value.split('\n').filter((value) => value)
  })

  const handleStartIpsCheck = async () => {
    isFetching.value = true
    router.push({
      query: {
        ...route.query,
        ips: ips.value ? ips.value : undefined,
      },
    })
    const requests = ipsArray.value.map((value) => getIpInfo(value))

    const response = await Promise.all(requests)

    const validRepsponses = response.reduce<IpInfo[]>((acc, curr) => {
      if (curr.data) {
        acc.push(curr.data)
      } else {
        ElNotification({
          title: curr.error,
          type: 'error',
        })
      }

      return acc
    }, [])

    ipsInfo.value = validRepsponses
    isFetching.value = false
  }

  const handleDelete = (ipToDelete: string) => {
    ipsInfo.value = ipsInfo.value.filter(({ ip }) => ip !== ipToDelete)
  }

  return {
    ips,
    ipsInfo,
    isFetching,
    handleStartIpsCheck,
    handleDelete,
  }
}

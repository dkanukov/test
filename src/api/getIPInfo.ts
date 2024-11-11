import axios from 'axios'
import { IpInfo } from '@/models/ip'
import type { IpDto } from '@/types/ip'
const BASE_URL = 'http://ip-api.com/json'

export const getIpInfo = async (
  ip: string,
): Promise<{
  data?: IpInfo
  error?: string
}> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${ip}`)
    if (data.status === 'fail') {
      throw new Error()
    }
    return {
      data: new IpInfo(data as IpDto),
    }
  } catch (e) {
    return {
      error: `Не удалось получить информация для IP: ${ip}`,
    }
  }
}

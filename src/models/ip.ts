import type { IpDto } from '@/types/ip'

export class IpInfo {
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  timezone: string
  ip: string
  isp: string
  org: string
  as: string
  constructor({
    country = '',
    countryCode = '',
    region = '',
    regionName = '',
    city = '',
    timezone = '',
    query = '',
    isp = '',
    org = '',
    as = '',
  }: IpDto) {
    this.country = country
    this.countryCode = countryCode
    this.region = region
    this.regionName = regionName
    this.city = city
    this.timezone = timezone
    this.ip = query
    this.isp = isp
    this.org = org
    this.as = as
  }
}

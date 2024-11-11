interface Ip {
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  timezone: string
  query: string
  isp: string
  org: string
  as: string
}

export type IpDto = Partial<Ip>

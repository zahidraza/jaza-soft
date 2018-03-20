import { AxiosError } from 'axios'

export interface DataType {
  id: number
  fetchedAt: Date
}

export interface Param {
  username: string
  password: string
  appId?: string
}

export type AuthParam = Param | AxiosError

export interface DataType {
  id: number
  fetchedAt: Date
}

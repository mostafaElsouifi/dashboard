//import { Project } from '../projects/types'

export type UserRole = 'admin' | 'user'

export type User = {
  id: string
  email: string
  role: 'admin' | 'user'
  name: string
  password: string
  admin: boolean
  active: boolean
}

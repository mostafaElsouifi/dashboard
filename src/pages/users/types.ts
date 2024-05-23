//import { Project } from '../projects/types'

export type UserRole = 'admin' | 'user' | 'owner'

export type User = {
  id: string
  email: string
  role: UserRole
  name: string
  password: string
}

import { sleep } from '../../services/utils'
import { User } from './../../pages/users/types'
import { usersCollection } from '../../includes/firebase'

let users: User[] = []

async function fetchData(): Promise<void> {
  try {
    const userDoc = await usersCollection.get()
    users = userDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[]
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

fetchData() // Trigger the data fetching when the module is imported

export { users }

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  isAdmin: boolean
  search: string
}
const getSortItem = (obj: any, sortBy: string) => {
  return obj[sortBy]
}

export const getUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  await sleep(1000)
  const { search, sortBy, sortingOrder } = filters

  let filteredUsers = users

  // filteredUsers = filteredUsers.filter((user) => user.admin === isAdmin)

  if (search) {
    filteredUsers = filteredUsers.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()))
  }

  filteredUsers = filteredUsers.map((user) => ({ ...user }))

  if (sortBy && sortingOrder) {
    filteredUsers = filteredUsers.sort((a, b) => {
      const first = getSortItem(a, sortBy)
      const second = getSortItem(b, sortBy)
      if (first > second) {
        return sortingOrder === 'asc' ? 1 : -1
      }
      if (first < second) {
        return sortingOrder === 'asc' ? -1 : 1
      }
      return 0
    })
  }

  const { page = 1, perPage = 10 } = filters || {}
  return {
    data: filteredUsers.slice((page - 1) * perPage, page * perPage),
    pagination: {
      page,
      perPage,
      total: filteredUsers.length,
    },
  }
}

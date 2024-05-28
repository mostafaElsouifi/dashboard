<!-- eslint-disable vue/first-attribute-linebreak -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UsersTable from './widgets/UsersTable.vue'
import EditUserForm from './widgets/EditUserForm.vue'
import { User } from './types'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useUsers } from './composables/useUsers'
import { useModal, useToast } from 'vuestic-ui'
import useUser from '../../stores/user'
const userStore = useUser()

const doShowEditUserModal = ref(false)

const { isLoading, filters, sorting, pagination, users } = useUsers()

const userToEdit = ref<User | null>(null)
//const users = ref<any[]>([])
const showEditUserModal = (user: User) => {
  userToEdit.value = user
  doShowEditUserModal.value = true
}

const showAddUserModal = () => {
  userToEdit.value = null
  doShowEditUserModal.value = true
}

const { init: notify } = useToast()

const onUserSaved = async (user: User) => {
  console.log(user)
  await userStore.addUser(user)

  notify({
    message: `${user.name} has been created`,
    color: 'success',
  })
  setTimeout(() => {
    router.go(0)
  }, 2000)
}

const onUserDelete = async (user: User) => {
  notify({
    message: `${user.name} has been deleted`,
    color: 'success',
  })
}

const editFormRef = ref()

const { confirm } = useModal()

const beforeEditFormModalClose = async (hide: () => unknown) => {
  if (editFormRef.value.isFormHasUnsavedChanges) {
    const agreed = await confirm({
      maxWidth: '380px',
      message: 'Form has unsaved changes. Are you sure you want to close it?',
      size: 'small',
    })
    if (agreed) {
      hide()
    }
  } else {
    hide()
  }
}

onMounted(() => {
  // getUsers()
})

// const getUsers = async () => {
//   try {
//     const allUsers = await userStore.getAllUsers()
//     console.log(allUsers)
//     // if (allUsers.length > 0) {
//     //   users.value = allUsers
//     // }
//   } catch (e) {
//     console.log(e)
//   }
// }
</script>

<template>
  <h1 class="page-title" style="font-size: 2rem; line-height: 0.5 !important">Users</h1>
  <!-- :options="[
              { label: 'All', value: true },
              { label: 'Admin', value: false },
              { label: 'Users', value: false },
               v-model="filters.isAdmin"
            ]"  -->
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <!-- <VaButtonToggle color="background-element" border-color="background-element" /> -->
          <VaInput v-model="filters.search" placeholder="Search">
            <template #prependInner>
              <VaIcon name="search" color="secondary" size="small" />
            </template>
          </VaInput>
        </div>
        <VaButton @click="showAddUserModal">Add User</VaButton>
      </div>

      <UsersTable
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        :users="users"
        :loading="isLoading"
        :pagination="pagination"
        @editUser="showEditUserModal"
        @deleteUser="onUserDelete"
      />
    </VaCardContent>
  </VaCard>

  <VaModal
    v-slot="{ cancel, ok }"
    v-model="doShowEditUserModal"
    size="small"
    mobile-fullscreen
    close-button
    hide-default-actions
    :before-cancel="beforeEditFormModalClose"
  >
    <h1 class="va-h5">{{ userToEdit ? 'Edit user' : 'Add user' }}</h1>
    <EditUserForm
      ref="editFormRef"
      :user="userToEdit"
      :save-button-label="userToEdit ? 'Save' : 'Add'"
      @close="cancel"
      @save="
        (user) => {
          onUserSaved(user)
          ok()
        }
      "
    />
  </VaModal>
</template>

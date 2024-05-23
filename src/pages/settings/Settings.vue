<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div class="flex flex-col space-y-6 md:space-y-4">
    <h1 class="page-title">Settings</h1>
    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <h3 class="h3">Personal Information</h3>
      <VaForm ref="form" @submit.prevent="updateData">
        <VaInput v-model="formData.name" label="Name" :rules="[(v) => !!v || 'Name field is required']" class="mb-4" />

        <VaInput
          v-model="formData.email"
          label="Email"
          :rules="[(v) => !!v || 'Email field is required', (v) => /.+@.+\..+/.test(v) || 'Email should be valid']"
          class="mb-4"
        />
        <VaValue v-slot="isPasswordVisible" :default-value="false">
          <VaInput
            ref="password"
            v-model="formData.password"
            :rules="passwordRules"
            :type="isPasswordVisible.value ? 'text' : 'password'"
            class="mb-4"
            label="Password"
            messages="Password is required to update your data"
            @clickAppendInner.stop="isPasswordVisible.value = !isPasswordVisible.value"
          >
            <template #appendInner>
              <VaIcon
                :name="isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'"
                class="cursor-pointer"
                color="secondary"
              />
            </template>
          </VaInput>
        </VaValue>

        <VaButton type="submit" class="w-32" @click="updateData"> Edit </VaButton>
      </VaForm>
    </div>

    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <h3 class="h3">Theme</h3>
      <ThemeSwitcher />
    </div>

    <div class="flex flex-col p-4 space-y-4 bg-backgroundSecondary rounded-lg">
      <VaButton color="danger" gradient class="mr-6 mb-2 col-3 w-32" icon="logout" @click="signOut"> Logout </VaButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ThemeSwitcher from './theme-switcher/ThemeSwitcher.vue'
import useUserStore from '../../stores/user'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useForm, useToast } from 'vuestic-ui'
const { validate } = useForm('form')
const { init } = useToast()
import { auth, usersCollection } from '../../includes/firebase'

const { push } = useRouter()
const userStore = useUserStore()

const currentUser = auth.currentUser
if (!currentUser || !currentUser.email) {
  throw new Error('User not authenticated or email is null/undefined')
}

interface AuthValues {
  id: string
  name: string
  email: string
  password: string
  role: ''
}

const formData: AuthValues = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
  role: '',
})

// get user data from db
usersCollection
  .doc(currentUser.uid)
  .get()
  .then((d) => {
    formData.name = d.data()?.name
    formData.email = d.data()?.email
  })

const updateData = async () => {
  if (validate()) {
    try {
      await userStore.updatePersonalData(currentUser.uid, formData)

      init({
        message: 'please check your mailbox and verify',
        color: 'warning',
      })

      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (e) {
      let error
      if (e instanceof Error) {
        error = e.message
      } else {
        error = ''
      }
      init({
        message: error,
        color: 'danger',
      })
    }
  }
}
const signOut = async () => {
  await userStore.signOut()
  push({ name: 'login' })
}

const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || 'Password field is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
  (v) => (v && /[A-Za-z]/.test(v)) || 'Password must contain at least one letter',
  (v) => (v && /\d/.test(v)) || 'Password must contain at least one number',
  (v) => (v && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || 'Password must contain at least one special character',
]
</script>

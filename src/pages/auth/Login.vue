<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>

    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
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

    <div class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <RouterLink :to="{ name: 'recover-password' }" class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary">
        Forgot password?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useToast } from 'vuestic-ui'
import { validators } from '../../services/utils'
import useUserStore from '../../stores/user'
const { validate } = useForm('form')
const { push } = useRouter()
const { init } = useToast()

const userStore = useUserStore()
const formData = reactive({
  email: '',
  password: '',
})

const submit = async () => {
  if (validate()) {
    try {
      await userStore.login(formData.email, formData.password)
      init({ message: "You've successfully logged in", color: 'success' })

      push({ name: 'dashboard' })
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
</script>

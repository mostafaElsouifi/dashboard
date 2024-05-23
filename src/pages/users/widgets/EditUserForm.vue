<script setup lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { useForm } from 'vuestic-ui'
import { User, UserRole } from '../types'

import { validators } from '../../../services/utils'

const props = defineProps({
  user: {
    type: Object as PropType<User | null>,
    default: null,
  },
  saveButtonLabel: {
    type: String,
    default: 'Save',
  },
})

const defaultNewUser: User = {
  id: '',
  role: 'user',
  name: '',
  email: '',
  password: '',
}

const newUser = ref<User>({ ...defaultNewUser })

const isFormHasUnsavedChanges = computed(() => {
  return Object.keys(newUser.value).some((key) => {
    if (key === 'avatar' || key === 'projects') {
      return false
    }

    return newUser.value[key as keyof User] !== (props.user ?? defaultNewUser)?.[key as keyof User]
  })
})

defineExpose({
  isFormHasUnsavedChanges,
})

watch(
  () => props.user,
  () => {
    if (!props.user) {
      return
    }

    newUser.value = {
      ...props.user,
    }
  },
  { immediate: true },
)

const form = useForm('add-user-form')

const emit = defineEmits(['close', 'save'])

const onSave = () => {
  if (form.validate()) {
    emit('save', newUser.value)
  }
}

const roleSelectOptions: { text: Capitalize<UserRole>; value: UserRole }[] = [
  { text: 'Admin', value: 'admin' },
  { text: 'User', value: 'user' },
]
const passwordRules: ((v: string) => boolean | string)[] = [
  (v) => !!v || 'Password field is required',
  (v) => (v && v.length >= 8) || 'Password must be at least 8 characters long',
  (v) => (v && /[A-Za-z]/.test(v)) || 'Password must contain at least one letter',
  (v) => (v && /\d/.test(v)) || 'Password must contain at least one number',
]
</script>

<template>
  <VaForm v-slot="{ isValid }" ref="add-user-form" class="flex-col justify-start items-start gap-4 inline-flex w-full">
    <div class="flex flex-wrap items-start justify-center w-full gap-4">
      <VaInput v-model="newUser.name" label="Name" class="w-full sm:w-1/2" :rules="[validators.required]" name="name" />

      <VaInput
        v-model="newUser.email"
        label="Email"
        class="w-full sm:w-1/2"
        :rules="[validators.required, validators.email]"
        name="email"
      />
      <VaInput
        v-model="newUser.password"
        label="Password"
        class="w-full sm:w-1/2"
        :rules="passwordRules"
        name="password"
      />
      <VaSelect
        v-model="newUser.role"
        label="Role"
        class="w-full sm:w-1/2"
        :options="roleSelectOptions"
        :rules="[validators.required]"
        name="role"
        value-by="value"
      />

      <div class="flex gap-2 flex-col-reverse items-stretch justify-center w-full sm:flex-row sm:items-center mt-5">
        <VaButton preset="secondary" color="secondary" size="medium" @click="$emit('close')">Cancel</VaButton>
        <VaButton :disabled="!isValid" size="medium" @click="onSave">{{ saveButtonLabel }}</VaButton>
      </div>
    </div>
  </VaForm>
</template>

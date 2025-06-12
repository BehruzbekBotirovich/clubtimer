<script setup>
import {reactive, ref} from 'vue'
import {formatPhoneNumber, reformatPhoneNumber} from '@/helpers/index.js'
import {useValidator} from '@/composables/index.js'
import {useI18n} from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import useEmployeesStore from "@/store/employee.pinia.js";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'

const {t} = useI18n()
const {requiredField, phoneNumberValidator} = useValidator()

const coreStore = useCore()
const employeeStore = useEmployeesStore()
const props = defineProps({
  modalKey: String,
})
console.log('modalkey=', props.modalKey)

const formRef = ref()
const form = reactive({
  fullName: '',
  grantType: 'password',
  contact: '',
  role: '',
  avatar: null,
  email: '',
  password: '',
  password_confirm: ''
})

async function inputTypingEvent() {
  form.contact = await formatPhoneNumber(form.contact)
}

// patterns
const passwordPattern = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'.,:;])[A-Za-z\d~!?@#$%^&*_\-\+\(\)\[\]\{\}><\/\\|"'.,:;]{8,}$/
)
const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

// validators
const validatePassword = (rule, value) => {
  if (!value || passwordPattern.test(value)) {
    return Promise.resolve()
  } else {
    return Promise.reject(
        `${t('settings_menu_component.invalid_password')} ~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \\ | " ' . , : ;`
    )
  }
}

const validateConfirmPassword = (rule, value) => {
  if (!value) {
    return Promise.reject(t('validations.required_field'))
  } else if (value !== form.password) {
    return Promise.reject('Password not match')
  } else {
    return Promise.resolve()
  }
}

const roleOptions = [
  {label: 'Admin', value: 'admin'},
  {label: t('employee'), value: 'employee'},
]

const fileList = ref([]);
const imageUrl = ref('');
const loading = ref(false);

function submitForm() {
  formRef.value.validate().then(() => {
    const formData = new FormData()
    formData.append('avatar', form.avatar)
    formData.append('fullName', form.fullName)
    formData.append('email', form.email)
    formData.append('role', form.role)
    formData.append('contact', form.contact)
    formData.append('password', form.password)
    formData.append('password_confirm', form.password_confirm)
    employeeStore.createEmployee(formData, props.modalKey)
  }).catch((error) => {
    console.log('Form validation failed:', error)
  })
}

function beforeUpload(file) {
  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
  };
  reader.readAsDataURL(file);
  form.avatar = file; // Добавим файл в форму
  return false; // Остановить автоматическую загрузку (AntD Upload)
}

</script>

<template>
  <a-card class="w-[500px] border-none px-2">
    <h2 class="text-xl font-bold text-center lg:text-left">
      {{ $t('user.user_add') }}
    </h2>
    <a-form ref="formRef" :model="form">
      <a-form-item
          label="Toliq ismi"
          name="fullName"
          :rules="[{ required: true }]"
      >
        <a-input v-model:value="form.fullName"/>
      </a-form-item>
      <a-form-item
          label="Email"
          name="email"
          :rules="[{ required: true }, { validator: validateEmail }]"
      >
        <a-input v-model:value="form.email"/>
      </a-form-item>
      <a-form-item
          name="role"
          :rules="[{ required: true }]"
      >
        <h3>Role</h3>
        <a-select v-model:value="form.role" :options="roleOptions"/>
      </a-form-item>
      <a-form-item
          name="avatar"
          :rules="[{ required: true }]"
      >
        <h3>Rasmini yuklash</h3>
        <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            accept="image/*"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100%"/>
          <div v-else>
            <loading-outlined v-if="loading"/>
            <plus-outlined v-else/>
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>


      <div class="flex gap-2">
        <div class="w-[70px]">
          <a-form-item :label="$t('auth_view.code')">
            <a-input
                @input="inputTypingEvent"
                disabled
                size="large"
                value="+998"
            />
          </a-form-item>
        </div>
        <div class="flex-grow">
          <a-form-item
              :rules="[phoneNumberValidator]"
              :label="$t('auth_view.phone_number')"
              name="contact"
          >
            <a-input
                @input="inputTypingEvent"
                size="large"
                v-model:value="form.contact"
            />
          </a-form-item>
        </div>
      </div>

      <a-form-item
          :rules="[
          { required: true, message: '' },
          { validator: validatePassword }
        ]"
          name="password"
          :label="$t('auth_view.password')"
      >
        <a-input-password
            autocomplete=""
            size="large"
            v-model:value="form.password"
        />
      </a-form-item>

      <!-- confirm password  -->
      <a-form-item
          :rules="[
          { required: true, message: '' },
          { validator: validateConfirmPassword }
        ]"
          name="password_confirm"
          :label="$t('auth_view.password_confirm')"
      >
        <a-input-password
            autocomplete=""
            size="large"
            v-model:value="form.password_confirm"
        />
      </a-form-item>
    </a-form>
    <div class="flex justify-end items-center gap-2 mt-4">
      <a-button
          @click="submitForm"
          :loading="coreStore.isLoading('get-token')"
          size="large"
          type="primary"
          class="!px-8 w-full"
      >
        {{ t('user.user_add') }}
      </a-button>
    </div>
  </a-card>
</template>

<style scoped lang="scss"></style>

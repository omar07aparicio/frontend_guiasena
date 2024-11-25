<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useTheme } from 'vuetify'
const form = ref({
  email: '',
  password: '',
  remember: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7 elevation-12">
      <VCardItem class="justify-center">
        <div class="d-flex justify-center mb-4">
          <img src="../../../public/logo.png" alt="Logo" width="300" />
        </div>
      </VCardItem>

      <VCardText class="pt-2 text-center">
        <h4 class="text-h4 mb-1">Bienvenido a Sugas!</h4>
        <p class="mb-0">Por favor, inicia sesión</p>
      </VCardText>

      <VCardText>
        <v-form ref="form" validate-on="login lazy" @submit.prevent="login">
          <VRow>
            <VCol cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                placeholder="example@example.com"
                autocomplete="email"
                outlined
                dense
                clearable
              />
            </VCol>

            <VCol cols="12">
              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                outlined
                dense
              />
              <VCol cols="12" v-if="passwordError">
                <p class="error-message">{{ passwordError }}</p>
              </VCol>

              <div class="d-flex align-center justify-space-between flex-wrap my-6">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />
                <a class="text-primary" href="javascript:void(0)">Forgot Password?</a>
              </div>

              <VBtn block type="submit" @click="login" class="login-button mt-4">
                Login
              </VBtn>
            </VCol>
          </VRow>
        </v-form>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    API: process.env.VUE_APP_API,
    loading: false,
    email: '',
    emailRules: [
      value => !!value || 'E-mail is required.',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
    ],
    password: '',
    passwordError: '',
    passwordRules: [
      value => !!value || 'Password is required.',
      // Agregar más reglas según sea necesario
    ],
  }),
  methods: {
    async login() {
      const isValid = this.$refs.form.validate()

      if (!isValid) {
        console.log('Formulario no válido')
        return
      }

      try {
        const response = await axios.post(`http://localhost:3000/auth/login`, {
          email: this.email,
          password: this.password,
        })

        this.$store.commit('setUser', response.data)
        this.$store.dispatch('login')
        this.$router.push({ path: '/sugas' })
      } catch (error) {
        if (error.response.data.message === 'Incorrect password') {
          this.passwordError = 'Contraseña incorrecta'
        } else if (error.response.data.message === 'Invalid credentials') {
          this.passwordError = 'El usuario no existe'
        }
      }
    },
  },
}

</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  background-color: rgba(252, 115, 35, 0.804) !important; /* 52 115 35  35 130 118*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
}



.error-message {
  color: red !important; /* Texto de error en rojo y con !important */
  font-size: 0.875rem;
}

h4 {
  font-weight: 600;
}

p {
  color: rgb(58, 57, 57);
}

.login-button {
  background-color: rgb(252, 115, 35) !important; /* Cambiado a verde y con !important */
  color: white !important; /* Texto blanco para el botón y con !important */
}
</style>

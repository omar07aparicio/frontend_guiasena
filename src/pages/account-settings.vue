<script setup>
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-5"
      max-width="500"
      elevation="3"
    >
      <VCardItem class="justify-center mb-6">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
        </RouterLink>
      </VCardItem>

      <VCardText>
        <h4 class="text-h4 mb-3">Datos de tu cuenta</h4>
        <VForm
          @submit.prevent="() => {}"
          ref="form"
        >
          <VRow>
            <VCol cols="12">
              <h5 class="label">Nombre:</h5>
              <p class="user-info">{{ name }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Email:</h5>
              <p class="user-info">{{ email }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Cédula:</h5>
              <p class="user-info">{{ cedula }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Teléfono:</h5>
              <p class="user-info">{{ telefono }}</p>
            </VCol>

            <VCol cols="12">
              <h5 class="label">Rol:</h5>
              <p class="user-info">{{ role }}</p>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      valid: false,
      name: this.$store.getters.getUser.nombre,
      email: this.$store.getters.getUser.email,
      cedula: this.$store.getters.getUser.cedula,
      telefono: this.$store.getters.getUser.telefono,
      role: this.$store.getters.getUser.rol,
      id: null,
      dialog: false,
    }
  },

  methods: {
    async CambiarContrasena() {
      try {
        const response = await axios.post(
          'http://localhost:3000/usuarios/recuperar-contrasena',
          { email: this.email },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUser.access_token}`,
            },
          },
        )

        this.$notify({ text: response.data.message, type: 'success' }) // Cambia el tipo según sea necesario;
      } catch (error) {
        console.error('Error al obtener los roles:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  background: #f8f9fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: 600;
  color: #2d882d;
}

h5.label {
  color: #555;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

p.user-info {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.logo-container {
  width: 50px;
}

.btn-submit {
  background-color: #2d882d !important;
  color: white !important;
  font-weight: 600;
}

.v-btn:hover {
  background-color: #256c25 !important;
}

.v-btn:active {
  background-color: #1d571d !important;
}
</style>

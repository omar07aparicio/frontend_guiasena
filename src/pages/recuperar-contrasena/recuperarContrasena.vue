<script setup>
import store from '@/store'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Datos que se enviarán para verificar
const cedula = route.params.cedula // Captura la cédula de la URL
const token = route.params.token // Captura el token de la URL
const mensaje = null
// Realiza la solicitud a la API
axios
  .get(`http://localhost:3000/usuarios/puede-recuperar/${cedula}/${token}`)
  .then(response => {
    // Manejar la respuesta
    if (response.data.puede) {
      store.dispatch('cambiar')
      router.push({ path: '/auth' }) // Usar router.push en lugar de this.$router.push
    } else {
      mensaje.value = response.data.message // Mostrar el mensaje de error
      console.log('Error: ' + response.data.message)
    }
  })
  .catch(error => {
    console.error('Error al verificar:', error)
    this.mensaje.value = 'Error al verificar la recuperación de contraseña.'
  })
</script>

<template></template>

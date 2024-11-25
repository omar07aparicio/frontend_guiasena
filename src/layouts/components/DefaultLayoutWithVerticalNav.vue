<script setup>
import Footer from '@/layouts/components/Footer.vue'
import NavItemsAdmin from '@/layouts/components/NavItemsAdmin.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import NavItemsCoordinador from './NavItemsCoordinador.vue'
import NavItemsInstructor from './NavItemsInstructor.vue'
import { ref } from 'vue'
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center justify-center gap-4 navbar-container">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- GitHub -->
        <IconBtn
          href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="ri-github-fill" />
        </IconBtn>

        <!-- Agregar preguntas frecuentes -->
        <IconBtn href="/faq">
          <span class="nav-text">Preguntas Frecuentes</span>
        </IconBtn>

        <!-- Agregar contacto -->
        <IconBtn href="/contact">
          <span class="nav-text">Contáctanos</span>
        </IconBtn>

        <!-- Agregar acerca de -->
        <IconBtn href="/about">
          <span class="nav-text">Acerca de</span>
        </IconBtn>

        <!-- Notificaciones -->
        <IconBtn>
          <VIcon icon="ri-notification-line" />
        </IconBtn>

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Agregamos el carrusel aquí -->
    <v-carousel>
      <v-carousel-item v-for="(item, i) in carouselItems" :key="i">
        <v-img :src="item.src" :alt="item.alt"></v-img>
      </v-carousel-item>
    </v-carousel>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink
        to="/"
        class="app-logo app-title-wrapper"
      >
        <div class="d-flex">
          <img
            src="../../../public/logo.png"
            alt="Logo"
            width="180"
          />
        </div>
      </RouterLink>

      <IconBtn
        class="d-block d-lg-none"
        @click="toggleIsOverlayNavActive(false)"
      >
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItemsAdmin v-if="userRole === 'admin'" />
      <NavItemsCoordinador v-if="userRole === 'coordinador'" />
      <NavItemsInstructor v-if="userRole === 'instructor'" />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<script>
export default {
  data() {
    return {
      userRole: '',
      carouselItems: [
        { src: '../../../public/¡Bienvenido a SUGAS!.png', alt: 'Imagen 1' },
        { src: '../../../public/Diseño.png', alt: 'Imagen 2' },
        { src: '../../../public/Diseño1.png', alt: 'Imagen 2' },
        { src: '../../../public/Diseño2.png', alt: 'Imagen 2' },
      ],
    }
  },
  mounted() {
    this.userRole = this.$store.getters.getUser.rol
  },
}
</script>

<style lang="scss" scoped>
/* Contenedor para centrar y espaciar los elementos de navegación */
.navbar-container {
  gap: 150px; /* Espacio entre los elementos */
  justify-content: center; /* Centra los elementos horizontalmente */
}

/* Estilo para el texto de los botones */
.nav-text {
  margin-left: 8px;
  font-weight: 500;
  color: white; /* Color de las letras blanco */
  font-size: 16px; /* Tamaño de la fuente */
}

/* Ajustes de fondo */
.d-flex.h-100.align-center {
  background-color: rgb(35, 130, 118); /* Cambia el color de fondo si lo deseas */
  padding: 10px;
}

.icon-btn {
  color: white; /* Asegúrate que los íconos también sean blancos */
}
</style>

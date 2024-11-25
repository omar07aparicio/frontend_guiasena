export const routes = [
  {
    path: '',
    name: 'login',
    component: () => import('@/layouts/blank.vue'),
    redirect: 'login',
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: 'login',
        component: () => import('@/pages/[...error].vue'), // Para rutas no encontradas
      },
    ],
  },

  {
    path: '/sugas',
    name: 'sugas',
    component: () => import('@/layouts/default.vue'),
    meta: { requiresAuth: true },
    redirect: 'sugas/cargar_archivo',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },

      {
        path: 'programa',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programa/programa.vue'),
      },
      {
        path: 'competencia',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/competencia/competencia.vue'),
      },
      {
        path: 'programacompetencia',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programacompetencia/programacompetencia.vue'),
      },

      {
        path: 'resultado_aprendizaje',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/ResultadoAprendizaje/resultadoaprendizaje.vue'),
      },
      {
        path: 'cargar_archivo',
        meta: { requiresAdmin: false },
        component: () => import('@/pages/archivo/archivocarga.vue'),
      },
      {
        path: 'registro_usuario',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/register.vue'),
      },
      {
        path: 'account-settings',
        meta: { requiresAdmin: false },
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'asignar-programa',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/usuarios/asignarProgramas.vue'),
      },
    ],
  },
]

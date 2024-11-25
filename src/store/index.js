import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    puede: false,
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    },
    cambiar(state) {
      state.puede = !state.puede
    },
  },
  actions: {
    login({ commit }) {
      commit('login')
    },
    logout({ commit }) {
      commit('logout')
      commit('cambiar')
    },
    cambiar({ commit }) {
      commit('cambiar')
    },
  },
  plugins: [createPersistedState()],
})

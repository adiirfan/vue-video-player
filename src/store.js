import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        favorite: [],
    },
    mutations: {
        addfavorite (state, data) {
            state.favorite.push(data)
            return
        },
        removefavorite (state, data) {
            state.favorite.splice(data, 1)
            return
        }
        },
    actions: {

        },
    plugins : [
        createPersistedState(),
    ]

})

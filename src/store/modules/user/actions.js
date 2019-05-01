import { HTTP } from "../../../plugins/axios.js";
export default {
    async registerUser({commit}, payload) {
        console.log('in registerUser action'); //TODO убрать
        commit('clearError');
        commit('setLoading', true);
        console.log(payload);
        try {
            // Создание пользователя
            payload.user.schoolName = payload.school;
            const response = await HTTP.post('/admin/register', payload.user);
		    console.log('after response'); //TODO убрать
            commit('setLoading', false);
            commit('setUser', payload);
            commit('setSchool', payload.school);
        } catch (e) {
            commit('setLoading', false);
            commit('setError', e.response.data);
        }

    },
    async authUser({ commit }, payload) {
        commit("clearError");
        commit("setLoading", true);
        console.log("login user");
        try {
            const response = await HTTP.post("/admin/auth", payload);
            try {
                const responseWithUserData = await HTTP.get("/admin/info");
                commit("setLoading", false);
                commit("setUser", payload);
            } catch (e) {
                commit("setLoading", false);
                commit("setError", e.response.data);
                throw e;
            }
        } catch (e) {
            commit("setLoading", false);
            commit("setError", e.response.data);
            throw e;
        }
    },
    async logout({commit}) {
        commit("clearError");
        commit("setLoading", true);
        commit('setRenderPermission', false);
        try {
            const response = await HTTP.post("/admin/logout");
            commit("setLoading", false);
            commit("setUser", null);
            commit('setRenderPermission', true);
        } catch (e) {
            commit("setLoading", false);
            commit("setError", e.response.data);
            commit('setRenderPermission', true);
        }
    }
}

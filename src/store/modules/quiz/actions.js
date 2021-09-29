import {HTTP} from "../../../plugins/axios";
import API from "../../../utils/API";

export default {

    async createQuiz({commit}, payload) {
        commit('clearError');
        commit('setLoading', true);
        try {
            const response = await HTTP.post(API.method.quizzes, payload);
            commit('setLoading', false);
        } catch (e) {
            console.log(e);
            commit("setError", e.response.data);
            commit('setLoading', false);
            throw e;
        }
    },

    async getQuizzes({commit}) {
        commit('clearError');
        commit('setLoading', true);
        try {
            const response = await HTTP.get(API.method.quizzes);
            commit('setLoading', false);
            commit('setQuizzes', response.data)
        } catch (e) {
            console.log(e);
            commit("setError", e.response.data);
            commit('setLoading', false);
            throw e;
        }
    },

    async getQuiz({commit}, quizId) {
        commit('clearError');
        commit('setLoading', true);
        try {
            const response = await HTTP.get(API.method.quizzes + "/" + quizId);
            commit('setLoading', false);
            commit('setQuiz', response.data)
        } catch (e) {
            console.log(e);
            commit("setError", e.response.data);
            commit('setLoading', false);
            throw e;
        }
    }
}

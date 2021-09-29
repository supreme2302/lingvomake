import {HTTP} from "../../../plugins/axios";
import API from "../../../utils/API";

export default {

    async createQuestion({commit}, payload) {
        commit('clearError');
        commit('setLoading', true);
        try {
            const response = await HTTP.post(API.method.quizzes + "/" + payload.quizId + "/questions", {
                question: payload.question,
                answers: payload.answers,
                correctAnswer: payload.correctAnswer
            });
            commit('setLoading', false);
        } catch (e) {
            console.log(e);
            commit("setError", e.response.data);
            commit('setLoading', false);
            throw e;
        }
    },

    async sendQuestionAnswer({commit}, payload) {
        commit('clearError');
        commit('setLoading', true);
        try {
            const response = await HTTP.post(API.method.quizzes + "/" + payload.quizId + "/questions", {
                answerId: payload.answerId
            });
            commit('setQuestion', response.data);
            commit('setLoading', false);
        } catch (e) {
            console.log(e);
            commit("setError", e.response.data);
            commit('setLoading', false);
            throw e;
        }
    },
}

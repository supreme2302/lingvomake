import { HTTP } from "../../../plugins/axios.js";
import API from '../../../utils/API.js';
export default {
  async loadUnitsByCourseId ({commit}, id) {
    console.log('loadUnitsByCourseId');
    commit('clearError');
	commit("setLoading", true);
    try {
      const response = await HTTP.get(API.method.courseUnitsById + id);
	  commit("setLoading", false);
      commit('setUnits', response.data);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  },

  async loadUnits({commit}) {
	console.log('loadAllUnits');
	commit('clearError');
	commit("setLoading", true);
	try {
	  const response = await HTTP.get(API.method.allUnits);
	  commit("setLoading", false);
	  commit('setUnits', response.data);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  },

  async createUnit ({commit}, payload) {
	console.log('createUnit');
	commit('clearError');
	commit("setLoading", true);
	try {
	  const response = await HTTP.post(API.method.createUnit, payload);
	  commit("setLoading", false);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  },
}

import { HTTP } from "../../../plugins/axios.js";
export default {
  async createCourse({commit}, payload) {
	console.log('createCourse');
	if (payload != null) {
	  commit('clearError');
	  commit('setLoading', true);
	  try {
		// Создание курса
		const response = await HTTP.post('/course/create', payload);
		console.log("creating course  -  ", response.data);
	  } catch (e) {
		commit('setError', e.response.data);
	  } finally {
		commit('setLoading', false);
	  }
	}
  },
  async loadCourses({ commit }) {
	console.log('loadCourses');
	commit("clearError");
	commit("setLoading", true);
	try {
	  const response = await HTTP.get("/course/");
	  commit("setLoading", false);
	  commit("loadCourses", response.data);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	}
  },
  async deleteCourse({commit}, payload) {
	commit("clearError");
	try {
	  const response = await HTTP.post("/course/delete", payload.id);
	  console.log('deleteCource, ', response.data);
	  // commit("deleteCourse", payload);
	} catch (e) {
	  commit("setError", e.response.data);
	}
  },

}

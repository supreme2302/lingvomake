import {HTTP} from "../../../plugins/axios";
import API from "../../../utils/API";

export default {
  async loadTeachers({commit}) {
	console.log('loading teachers');
	commit("clearError");
	commit("setLoading", true);
	try {
	  const response = await HTTP.get(API.method.loadTeachers);
	  console.log(response.data);
	  commit("setLoading", false);
	  commit("setTeachers", response.data);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  },
  async addTeacher({commit}, teacher) {
	console.log('adding teacher');
	commit("clearError");
	commit("setLoading", true);
	try {
	  const response = await HTTP.post(API.method.addTeacher, teacher);
	  console.log(response.data);
	  commit("setLoading", false);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  },
  async deleteTeacher({commit}, id) {
	console.log('deleting teacher');
	commit("clearError");
	commit("setLoading", true);
	try {
	  const response = await HTTP.post(API.method.deleteTeacher, id);
	  console.log(response.data);
	  commit("setLoading", false);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  },
  async editTeacher({commit}, teacher) {
	console.log('editing teacher');
	commit("clearError");
	commit("setLoading", true);
	try {
	  const response = await HTTP.post(API.method.editTeacher, teacher);
	  console.log(response.data);
	  commit("setLoading", false);
	} catch (e) {
	  commit("setLoading", false);
	  console.log(e);
	  commit("setError", e.response.data);
	  throw e;
	}
  }
}
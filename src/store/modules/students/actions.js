import API from '../../../utils/API.js';
import {HTTP} from "../../../plugins/axios";

export default {


  async loadGroups({commit}) {
	console.log('loading groups');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.get(API.method.loadGroups);
	  commit('setLoading', false);
	  console.log('groups:', response.data);
	  commit('setGroups', response.data)
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async createGroup({commit}, group) {
    console.log('creating group');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.post(API.method.createGroup, group);
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async deleteGroup({commit}, id) {
	console.log('deleting group');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.post(API.method.deleteGroup, {id: id});
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async changeGroup({commit}, group) {
	console.log('changing group');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.post(API.method.changeGroup, group);
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },

  async loadStudents({commit}) {
	console.log('loading students');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.get(API.method.loadAllStudents);
	  commit('setLoading', false);
	  console.log('students:', response.data);
	  commit('setStudents', response.data)
	} catch (e) {
	  console.log(e);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async loadStudentsByGroupId({commit}, id) {
	console.log('loading students');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.get(API.method.loadStudentsByGroup + id.toString());
	  commit('setLoading', false);
	  console.log('students:', response.data);
	  commit('setStudents', response.data)
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async createStudent({commit}, student) {
	console.log('creating group');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.post(API.method.createStudent, student);
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async deleteStudent({commit}, id) {
	console.log('creating group');
	commit('clearError');
	commit('setLoading', true);
	try {
	  const response = await HTTP.post(API.method.deleteStudent, {id: id});
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async editStudent({commit}, student) {
	console.log('creating group');
	commit('clearError');
	commit('setLoading', true);
	try {
	  await HTTP.post(API.method.editStudent, student);
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  },
  async restorePassword({commit}, student) {
	console.log('restoring password');
	commit('clearError');
	commit('setLoading', true);
	try {
	  await HTTP.post(API.method.restorePassword, student);
	  commit('setLoading', false);
	} catch (e) {
	  console.log(e);
	  commit("setError", e.response.data);
	  commit('setLoading', false);
	  throw e;
	}
  }
}
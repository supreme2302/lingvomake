
const baseUrl = 'http://localhost:8090/';

const method = {
  signin: 'admin/auth',
  signup: 'admin/register',
  logout: 'admin/logout',
  adminInfo: 'admin/info',
  createCourse: 'course/create',
  schoolCourses: 'course/',
  deleteCourse: 'course/delete',
  courseImage: 'course/image/',
  changeCourseImage: 'course/changeAvatar',
  changeCourse: '/course/change',
  courseUnitsById: 'unit/',
  createUnit: 'unit/create',

  loadAllStudents: 'student/',
  loadStudentsByGroup: '/student/group/',
  createStudent: '/student/create',
  deleteStudent: '/student/delete',
  editStudent: '/student/change',

  loadGroups: 'group/',
  createGroup: 'group/create',

  loadSchool: 'school/',
  saveSchool: 'school/change',

  loadTeachers: 'admin/all',
  addTeacher: 'admin/add'
};

export default {baseUrl, method};


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

  loadGroups: 'group/',
  createGroup: 'group/create',
};

export default {baseUrl, method};

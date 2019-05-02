
const baseUrl = 'http://localhost:8090/';

const method = {
  signin: 'admin/auth',
  signup: 'admin/register',
  logout: 'admin/logout',
  adminInfo: 'admin/info',
  createCourse: 'course/create',
  schoolCourses: 'course/',
  deleteCourse: 'course/delete',
  courseImage: 'course/image',
  changeCourseImage: 'course/changeAvatar',
};

export default {baseUrl, method};

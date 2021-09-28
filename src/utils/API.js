const baseUrl = 'http://localhost:8090/';
// const baseUrl = 'https://lingvomake.ml/back/';

const method = {
    signin: 'admin/auth',
    signup: 'admin/register',
    logout: 'admin/logout',
    adminInfo: 'admin/info',
    loadTeachers: 'admin/all',
    addTeacher: 'admin/add',
    deleteTeacher: 'admin/delete',
    editTeacher: 'admin/changeTeacher',

    createCourse: 'course/create',
    schoolCourses: 'course/',
    deleteCourse: 'course/delete',
    courseImage: 'course/image/',
    changeCourseImage: 'course/changeAvatar',
    changeCourse: 'course/change',

    loadAllStudents: 'student/',
    loadStudentsByGroup: 'student/group/',
    createStudent: 'student/create',
    deleteStudent: 'student/delete',
    editStudent: 'student/change',
    restorePassword: 'student/reset',

    loadGroups: 'group/',
    createGroup: 'group/create',
    deleteGroup: 'group/delete',
    changeGroup: 'group/edit',

    loadSchool: 'school/',
    saveSchool: 'school/change',
    schoolImage: 'school/image/',
    changeSchoolImage: 'school/changeAvatar',
    generate: 'school/makeapp',

    courseUnitsById: 'unit/',
    createUnit: 'unit/create',
    unitById: 'unit/find/',
    deleteUnit: 'unit/delete',
    changeUnit: 'unit/change',
    allUnits: 'unit/all',

    tasksByUnitId: 'task/',
    taskById: 'task/find/',
    createTask: 'task/create',
    editTask: 'task/change',
    deleteTask: 'task/delete'
};

export default {baseUrl, method};

// Lib imports
import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../views/Dashboard.vue';
import Icons from '../views/Icons.vue';
import Login from '../views/Login.vue';
import Maps from '../views/Maps.vue';
import Notifications from '../views/Notifications.vue';
import Registration from '../views/Registration.vue';
import TableList from '../views/TableList.vue';
import Typography from '../views/Typography.vue';
import Upgrade from '../views/Upgrade.vue';
import Students from '../views/Students';
import QuizList from "../views/QuizList";
import QuizEditor from "../views/QuizEditor";
import Quiz from "../views/Quiz";

// guards
import CoursesGuard from './guards/coursesGuard';
import AlreadyAuthGuard from './guards/alreadyAuthGuard.js';
import SingleCourseGuard from './guards/singleCourseGuard.js';
import StudentsGuard from './guards/studentsGuard';
import AppGuard from './guards/appGuard';
import GroupsGuard from './guards/groupsGuard';
import TeachersGuard from './guards/teachersGuard';
import SingleUnitGuard from './guards/singleUnitGuard.js';
import SingleTaskGuard from './guards/singleTaskGuard.js';
import QuizGuard from './guards/quizGuard.js';

Vue.use(Router);

// Create a new router
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/admin/quizzes'
        },
        {
            path: '/',
            component: Typography,
        },
        {
            path: '/table-list',
            name: 'Table List',
            component: TableList,
        },
        {
            path: '/typography',
            component: Typography,
        },
        {
            path: '/icons',
            component: Icons,
        },
        {
            path: '/maps',
            component: Maps,
        },
        {
            path: '/notifications',
            component: Notifications,
        },
        {
            path: '/upgrade',
            name: 'Upgrade to PRO',
            component: Upgrade,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: AlreadyAuthGuard
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration,
            beforeEnter: AlreadyAuthGuard
        },
        {
            path: '/students',
            name: 'Students Page',
            component: Students,
            beforeEnter: StudentsGuard
        },
        {
            path: '/help',
            name: 'Help',
            component: Dashboard
        },
        {
            path: '/admin/quizzes',
            name: 'QuizList',
            component: QuizList
        },
        {
            path: '/admin/quizzes/:id',
            props: true,
            name: 'Quiz editor',
            component: QuizEditor,
            beforeEnter: QuizGuard
        },
        {
            path: '/quizzes/:id',
            props: true,
            name: 'Quiz',
            component: Quiz,
            beforeEnter: QuizGuard
        }
    ]
});
export default router

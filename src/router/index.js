
// Lib imports
import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../views/Dashboard.vue';
import CoursePage from '../views/CoursePage.vue';
import Courses from '../views/Courses.vue';
import Icons from '../views/Icons.vue';
import Login from '../views/Login.vue';
import Maps from '../views/Maps.vue';
import Notifications from '../views/Notifications.vue';
import Registration from '../views/Registration.vue';
import TableList from '../views/TableList.vue';
import Typography from '../views/Typography.vue';
import UnitPage from '../views/UnitPage.vue';
import Upgrade from '../views/Upgrade.vue';
import UserProfile from '../views/UserProfile.vue';


import AuthGuard from './guards/authGuard.js';

Vue.use(Router);

// Create a new router
const router = new Router({
  mode: 'history',
  routes: [
	{
	  path: '/dashboard',
	  // Relative to /src/views
	  component: Dashboard
	},
	{
	  path: '/user-profile',
	  name: 'User Profile',
	  component: UserProfile,
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
	  beforeEnter: AuthGuard,
	},
	{
	  path: '/courses',
	  name: 'Courses',
	  component: Courses,
	},
	{
	  path: '/course/1',
	  name: 'Course page',
	  component: CoursePage,
	},
	{
	  path: '/course/1/unit/1',
	  name: 'Unit page',
	  component: UnitPage,
	}
  ]
});
export default router

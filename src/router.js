import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import FactorySelect from './views/FactorySelect.vue';
import DepartmentSelect from './views/DepartmentSelect.vue';
import WorkshopSelect from './views/WorkshopSelect.vue';
import ProjectSelect from './views/ProjectSelect.vue';
import ProcessSelect from './views/ProcessSelect.vue';
import ModuleSelect from './views/ModuleSelect.vue';
import RefreshRate from './views/RefreshRate.vue';
import LanguageSelect from './views/languageSelect.vue';

Vue.use(Router)

const router = new Router({
	mode: 'hash',
	routes: [{
			path: '/',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard
		},
		{
			path: '/factorySelect',
			name: 'factorySelect',
			component: FactorySelect
		},
		{
			path: '/departmentSelect',
			name: 'departmentSelect',
			component: DepartmentSelect
		},
		{
			path: '/workshopSelect',
			name: 'workshopSelect',
			component: WorkshopSelect
		},
		{
			path: '/projectSelect',
			name: 'projectSelect',
			component: ProjectSelect
		},
		{
			path: '/processSelect',
			name: 'processSelect',
			component: ProcessSelect
		},
		{
			path: '/moduleSelect',
			name: 'moduleSelect',
			component: ModuleSelect
		},
		{
			path: '/refreshRate',
			name: 'refreshRate',
			component: RefreshRate
		},
		{
			path: '/languageSelect',
			name: 'languageSelect',
			component: LanguageSelect
		}
	]
})

// router.beforeEach((to,form,next)=>{
//   if (to.path === '/') return next();
//   const token = window.sessionStorage.getItem('token')
//   if(!token) return next('/') 
//   next()
// })

export default router

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router.js';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/main.css';
import axios from 'axios';
import qs from 'qs';
import store from './store.js';
import http from './api';
import * as echarts from 'echarts';
import zh from './langs/zh-CN'
import en from './langs/en-US'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import VueI18n from 'vue-i18n';
import rmc from './plugins/remoteControl.js'
// import vConsole from './assets/js/vconsole.js';

Vue.use(axios, echarts, rmc)
Vue.prototype.$axios = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(ElementUI, {
	size: 'small'
});
Vue.prototype.$http = http;
// Vue.use(vConsole);

Vue.use(VueI18n)
const messages = {
	en: Object.assign(en, enLocale),
	zh: Object.assign(zh, zhLocale)
}
let lan = navigator.systemLanguage || navigator.language;
if (lan.toLowerCase().indexOf('zh') !== -1) {
	lan = 'zh'
} else if (lan.toLowerCase().indexOf('en') !== -1) {
	lan = 'en'
}
const i18n = new VueI18n({
	locale: localStorage.getItem('locale') || lan,
	messages
})

new Vue({
	store,
	router,
	i18n,
	data:{
		multiSelect:['moduleSelect','departmentSelect','workshopSelect','projectnameSelect','projectnameSlect','processtypeSelect']
	},
	methods: {
		handleLang(lang) {
			if (lang == 'zh') {
				localStorage.setItem('locale', 'zh')
				this.$i18n.locale = localStorage.getItem('locale');
			} else if (lang == 'en') {
				localStorage.setItem('locale', 'en')
				this.$i18n.locale = localStorage.getItem('locale')
			}
		},
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
	},
	render: h => h(App),
}).$mount('#app')

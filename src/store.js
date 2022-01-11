import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		title: '',
		factoryIndex:0,
		configData:{},
	},
	getters:{
		showLefttime:state=> {
			return state.title.includes("看板")||state.title.includes("Board") ? true : false
		}
	},
	mutations: {
		setTitle(state, title) {
			state.title = title
		},
		setFactoryIndex(state, factoryIndex) {
			state.factoryIndex = factoryIndex
		},
		setConfigData(state, configData){
			state.configData = configData
		},
	}
})

export default store

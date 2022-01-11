/**
 * @author: zhou.mo
 * @since : 2021/12/24
 */
import axios from 'axios';

var mock = false;

axios.defaults.baseURL = isMobile() ? process.env.VUE_APP_DEV : process.env.VUE_APP_LOCAL; //正式打包时使用
// axios.defaults.baseURL = isMobile() ? "http://10.6.49.215:8080" : "http://10.6.49.215:8080";
axios.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['withNoPwd'] = 1;
axios.defaults.timeout = 30 * 60 * 1000;

const pre_url = process.env.VUE_APP_PRE_URL;

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function getMethod(url) {
	//MES2接口都是带有method=及&的，如果不是后续发现再处理
	// let pathStartIndex = url.lastIndexOf("method=");
	// pathStartIndex = pathStartIndex > 0 ? pathStartIndex + 7 : 0; 
	// let pathEndIndex = url.lastIndexOf("&");
	// pathEndIndex = pathEndIndex > 0 ? pathEndIndex : url.length;
	// return url.substring(pathStartIndex, pathEndIndex);

	//MES1接口处理，eg:http://10.6.78.12/BydMachine.do?command=board4MachinePropLiftData&withNoPwd=1
	let pathStartIndex = url.lastIndexOf("command=") + 8;
	let pathEndIndex = url.indexOf("&");
	return url.substring(pathStartIndex, pathEndIndex);
}

const setMock = function() {
	axios.defaults.baseURL = process.env.BASE_URL + 'mock/';
	axios.interceptors.request.use((config) => {
		if (config.url) {
			let mockUrl = getMethod(config.url);
			config.url = mockUrl + '.json';
			config.method = 'get';
		}
		return config;
	});
}

if (mock) {
	setMock();
} else {
	axios.interceptors.request.use(function(config) {
		// Do something before request is sent
		//console.log(config)
		return config;
	}, function(error) {
		// Do something with request error
		return Promise.reject(error);
	});
}

axios.interceptors.response.use(function(response) {
	//console.log(response.data)
	return response.data;
},function(error){
	//console.log(error)
	return Promise.reject(error)
})

const Api = {
	axios,
	mock,
	pre_url,
	setMock,
	setBaseUrl(bl) {
        if (this.mock) {
            return false
        }
        let pattern = "^https?://(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
            "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)(:\\d*)?.*(/)?$"
        if (new RegExp(pattern).test(bl) || /^https?:\/\/localhost(:\\d*)?.*(\/)?$/.test(bl)) {
            this.baseUrl = bl;
            axios.defaults.baseURL = bl;
        }
    }
}

export default Api


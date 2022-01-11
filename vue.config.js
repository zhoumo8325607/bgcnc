/**
 * @author: zhou.mo
 * @since : 2021/12/24
 */

process.env.VUE_APP_DEV = "http://10.71.190.61:8085/cnc/"  //玻璃工厂地址 //http://10.6.78.12/
process.env.VUE_APP_PRO = "http://10.6.78.12/"  //中山bg地址 //http://10.71.190.61:8085/cnc/
process.env.VUE_APP_LOCAL = "http://10.6.49.215:8080/"
process.env.VUE_APP_PRE_URL= "BydMachine.do?command="

process.env.VUE_APP_ID = "com.byd.bgCncBoard"
process.env.VUE_APP_VERSION = "V0.0.1"

module.exports = {
	publicPath: '/android_asset/www', //Cordova:/android_asset/www
	outputDir: "D://work//dashboard/v1-base/www",
	productionSourceMap: false,
    pages: {
        index: {
            title: "cncBoard", // title
            entry: 'src/main.js'
        }
    },
	devServer: {
		proxy: {
			'/BydMachine.do':{
				target:process.env.VUE_APP_DEV,
                changeOrigin: true,
				onProxyReq: (proxyReq)=>{
					console.log(proxyReq.getHeader('host') + proxyReq.path)
				}
			},
			// '/BydMachine.do*':{
			// 	target:"http://10.6.78.12/",
            //     changeOrigin: true,
			// 	onProxyReq: (proxyReq)=>{
			// 		console.log(proxyReq.getHeader('host') + proxyReq.path)
			// 	}
			// }
		},
	}
}

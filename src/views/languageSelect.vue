<template>
	<el-main>
		<el-radio-group v-model="lang" class="languageSelect">
			<el-radio class="langClass" :label="item.locale" :key="item.lang" v-for="item in languageList" name='language' @change="handleChange">
				{{item.lang}}
			</el-radio>
		</el-radio-group>
	</el-main>
</template>

<script>
	export default {
		inject:['reload'],
		created() {
			this.$store.commit('setTitle', this.$t('L0003'));
		},
		data() {
			return {
				//lang: this.$i18n.locale,
				lang: window.sessionStorage.getItem('locale') ? window.sessionStorage.getItem('locale') : 'zh',
				languageList: [{
					locale: "zh",
					lang: this.$t("L0001")
				}, {
					locale: "en",
					lang: this.$t("L0002")
				}],
			}
		},
		mounted() {
			let langInitialIndex = this.languageList.findIndex(item => {
				return item.locale == this.lang
			})
			langInitialIndex = langInitialIndex > -1 ? langInitialIndex : 0;
			let el = document.getElementsByClassName("langClass")[langInitialIndex];
			el.focus();
		},
		methods: {
			handleChange(lang){
				this.reload()
				this.$root.handleLang(lang);
			}			
		},
		watch: {
			lang: function(lang) {			
				this.$root.handleLang(lang);
				this.$store.commit('setTitle', this.$t('L0003'));
				window.sessionStorage.setItem('locale', lang)
			}
		}
	}
</script>

<style>
	.languageSelect {
		margin-top: 5vh;
		width: 100vw;
		text-align: left;
		margin-left: 30vw;
	}

	.el-radio {
		display: block !important;
		margin-right: 0 !important;
		line-height: 10vh !important;
	}

	.el-radio__label {
		font-size: 22px !important;
	}
</style>

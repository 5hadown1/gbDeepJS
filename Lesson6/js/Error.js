Vue.component('errorcomponent', {
	data() {
		return {
			errorText: ''
		}
	},
	methods: {
		showError(error) {
			return this.errorText = error;
		}
	},
	template: `<div>{{errorText}}</div>`
});
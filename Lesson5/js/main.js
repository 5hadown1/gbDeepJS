const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		products: [],
		cartItems: [],
		imgCatalog: 'https://via.placeholder.com/150',
		cartState: false
	},
	methods: {
		getJson(url) {
			return fetch(url)
				.then(result => result.json())
				.catch(error => {
					console.log(error);
				})
		},
		addProduct(product) {
			this.getJson(`${API}/addToBasket.json`)
				.then(data => {
					if (data.result === 1){
						let find = this.cartItems.find(element => element.id_product === product.id_product);
						if(find) {
							find.quantity++;
						} else {
							this.cartItems.push({
								id_product: product.id_product,
								img: this.imgCatalog,
								product_name: product.product_name,
								price: product.price,
								quantity: 1},
							);
						}
					} else {
						alert('Error');
					}
			})
			console.log(this.cartItems);
		},
		_updateCart(product) {

		}
	},
	beforeCreate() {},
	created() {
		this.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				for (let el of data) {
					this.products.push(el);
				}
			});
	},
	beforeMount() {},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
});
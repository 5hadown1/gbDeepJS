const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		products: [],
		imgCatalog: 'https://via.placeholder.com/150'
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
						
					} else {
						alert('Error');
					}
			})
			console.log(product.id_product);
		},
		_updateCart(product) {
			let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
			block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
			block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
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
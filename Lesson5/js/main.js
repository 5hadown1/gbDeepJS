const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
	el: '#app',
	data: {
		catalogUrl: '/catalogData.json',
		basketUrl: '/getBasket.json',
		products: [],
		cartItems: [],
		filtredProducts: [],
		imgCatalog: 'https://via.placeholder.com/100',
		isVisibleCart: true,
		searchLine: ''
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
		},
		removeProduct(cartItem) {
			this.getJson(`${API}/deleteFromBasket.json`)
			.then(data => {
				if (data.result === 1) {
					let find = this.cartItems.find(element => element.id_product === cartItem.id_product);
					if (find.quantity > 1) {
						find.quantity--;
						this._updateCart(find);
					} else {
						this.cartItems.splice(this.cartItems.indexOf(find), 1);
						document.querySelector(`.cart-item[data-id="${cartItem.id_product}"]`).remove();
					}
				} else {
					alert('Error');
				}
			})
		},
		_updateCart(product) {
			let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
			block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
			block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
		},
		filterGoods(value) {
			value = this.searchLine;
			const regexp = new RegExp(value, 'i');
			this.filtredProducts = this.products.filter(product => regexp.test(product.product_name));
			this.products.forEach(el => {
				const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
				if (!this.filtredProducts.includes(el)) {
					block.classList.add('invisible');
				} else {
					block.classList.remove('invisible');
				}
			})
		}
	},
	beforeCreate() {},
	created() {
		this.getJson(`${API + this.catalogUrl}`)
			.then(data => {
				if (data) {
					for (let el of data) {
						this.products.push(el);
					}
				} else {
					document.querySelector('.products').textContent = 'Нет данных';
				}
			});
		this.getJson(`${API + this.basketUrl}`)
			.then(data => {
				if (data) {
					for (let el of data.contents) {
						el.img = this.imgCatalog;
						this.cartItems.push(el);
					}
				} else {
					document.querySelector('.cart-block').textContent = 'Нет данных';
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
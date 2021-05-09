'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
	constructor(container = '.products') {
		this.container = container;
		this._goods = []; // data
		this._AllProducts = []; //Массив экземпляров товаров на основе this.goods;
		this.cartGoods = [];

		this._getGoods()
			.then((data) => {
					this._goods = data;
					this._render();
			});
	}

	onClick(event) {
		let action = event.target.dataset.action;
		let id = event.target.dataset.id;

		if(action) {
			this[action](id);
		}
	}

	addToCart(id) {
		this._goods.find((element) => {
			if(element.id_product == id) {
				const cartItemObj = new CartItem(element);
				this.cartGoods.push(cartItemObj);
				const cartBlock = document.querySelector('.cart');
				cartBlock.insertAdjacentHTML('beforeend', cartItemObj.render())
			}
		});
	}

	removeFromCart(id) {
		const cartBlock = document.querySelector('.cart');
		console.dir(cartBlock);
		for (let cartItem of cartBlock.children) {
			if(cartItem.dataset.id == id) {
				cartItem.remove();
			}
		}
	}

	sum() {
		return this._goods.reduce((sum, { price }) => sum + price, 0);
	}

	_getGoods() {
		return fetch(`${API}/catalogData.json`)
			.then(result => result.json())
			.catch(error => console.log(error));
	}

	_render() {
		const block = document.querySelector(this.container);
		block.onclick = this.onClick.bind(this);

		for (const product of this._goods) {
			const productObject = new ProductItem(product);

			this._AllProducts.push(productObject);
			block.insertAdjacentHTML('beforeend', productObject.render())
		}

	}
}

class ProductItem {
	constructor(product, img = 'img/nophoto.jpg') {
		this.name = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		this.img = img;
	}

	render() {
		return `<div class="products__item">
					<img class="products__img" src="${this.img}" alt="Some img">
					<div class="desc">
						<h3>${this.name}</h3>
						<p>${this.price} \u20bd</p>
						<button class="products__btnbuy" data-id="${this.id}" data-action="addToCart">Купить</button>
					</div>
				</div>`;
	}
}

class CartList extends ProductList {
	constructor(container = '.cart'){
		super(container);
		this._render();
	}

	_render() {
		const cartBlock = document.querySelector(this.container);
		cartBlock.onclick = this.onClick.bind(this);
	}
}

class CartItem extends ProductItem {
	constructor(product, img = 'img/nophoto.jpg'){
		super(product, img = 'img/nophoto.jpg');
	}

	render() {
		return `<div class="cart__item" data-id="${this.id}">
					<img class="cart__img" src="${this.img}" alt="Some img">
					<div class="desc">
						<h3>${this.name}</h3>
						<p>${this.price} \u20bd</p>
						</div>
					<button class="products__btnremove" data-id="${this.id}" data-action="removeFromCart">Удалить</button>
				</div>`;
	}
}

const catalog = new ProductList();
const cart = new CartList();
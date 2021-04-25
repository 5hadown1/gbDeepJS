'use strict';

class ProductList {
	constructor(container = '.products') {
		this.container = container;
		this._goods = []; // data
		this._AllProducts = []; //Массив экземпляров товаров на основе this.goods;

		this._fetchGoods();
		this._render();
	}

	_fetchGoods() {
		this._goods = [{
			id: 1,
			title: 'Notebook',
			price: 20000,
		}, {
			id: 2,
			title: 'Mouse',
			price: 1500
		}, {
			id: 3,
			title: 'Keyboard',
			price: 5000
		}, {
			id: 4,
			title: 'Gamepad',
			price: 4500
		}]
	}

	_render() {
		const block = document.querySelector(this.container);

		for (const product of this._goods) {
			const productObject = new ProductItem(product);

			this._AllProducts.push(productObject);
			block.insertAdjacentHTML('beforeend', productObject.render())
		}
	}

	sumAllProducts() {
		let sum = 0;
		for (const product of this._goods) {
			sum += product.price;
		}
		return sum;
	}
}

class ProductItem {
	constructor(product, img = 'img/nophoto.jpg') {
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
	}

	render() {
		return `<div class="products__item" data-id="${this.id}">
					<img class="products__img" src="${this.img}" alt="Some img">
					<div class="desc">
						<h3>${this.title}</h3>
						<p>${this.price} \u20bd</p>
						<button class="product__btn">Купить</button>
					</div>
				</div>`;
	}
}

class CartList {
	//Конструктор
	//Метод добавления товара в корзину addToCart()
	//Метод удаления товара из корзины removeFromCart()
	//Метод render() возвращает разметку cartList
}

class CartItem extends ProductItem {
	//Конструктор для получения данных
	//Поднадобится метод render() возвращающий разметку CartItem
}

const catalog = new ProductList();
console.log(catalog.sumAllProducts());
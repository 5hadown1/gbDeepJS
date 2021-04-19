'use strict';

const products = [{
		id: 1,
		title: 'Notebook',
		price: 20000,
	},
	{
		id: 2,
		title: 'Mouse',
		price: 1500
	},
	{
		id: 3,
		title: 'Keyboard',
		price: 5000
	},
	{
		id: 4,
		title: 'Gamepad',
		price: 4500
	},
];

const renderProduct = (title, price, img = 'img/nophoto.jpg') => {
	return `<div class="products__item">
				<h3>${title}</h3>
				<img class="products__img" src="${img}" alt="${title}">
                <p>${price}</p>
                <button class="products__btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = (list = []) => {
	const productsList = list.map(product => renderProduct(product.title, product.price, product.img)).join('');
	//Запятая из-за того, что по итогу это массив строк, а между элементами запяты, join склеивает массив в один элемент
	//Скобки удалим так как параметр один и return можно убрать, так как функция возвращает значение.
	document.querySelector('.products')
			.insertAdjacentHTML('afterbegin', productsList);
}

renderProducts(products);

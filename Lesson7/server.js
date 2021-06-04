const express = require('express');
const fs = require('fs');
const app = express();

/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
	fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
		if (err) {
			res.send(JSON.stringify({
				result: 0,
				text: err
			}));
		} else {
			res.send(data);
		}
	});
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
	fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus(404, JSON.stringify({
				result: 0,
				text: err
			}));
		} else {
			res.send(data);
		}
	});
});

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
	fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus(404, JSON.stringify({
				result: 0,
				text: err
			}));
		} else {
			// парсим текущую корзину
			const cart = JSON.parse(data);
			// добавляем новый товар
			cart.contents.push(req.body);
			//Данные для stats.json
			fs.readFile('./server/db/stats.json', (err, data) => {
				if (err) {
					console.log('Должен быть не пустой json файл');
				} else {
					let stats = JSON.parse(data);
					let obj = {name: req.body.product_name, method: 'Added', time: new Date()};
					stats.push(obj);
					fs.writeFile('./server/db/stats.json', JSON.stringify(stats), (err) => {
						if (err) throw err;
						console.log('The file has been saved!');
					});
				}
			});
			// пишем обратно
			fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
		}
	});
});

// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
	fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus(404, JSON.stringify({
				result: 0,
				text: err
			}));
		} else {
			// парсим текущую корзину
			const cart = JSON.parse(data);
			// ищем товар по id
			const find = cart.contents.find(el => el.id_product === +req.params.id);
			// изменяем количество
			find.quantity += req.body.quantity;
			// пишем обратно
			fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
			//Данные для stats.json
			fs.readFile('./server/db/stats.json', (err, data) => {
				if (err) {
					console.log('Должен быть не пустой json файл');
				} else {
					let stats = JSON.parse(data);
					let obj = {name: find.product_name, method: 'Update', time: new Date()};
					stats.push(obj);
					fs.writeFile('./server/db/stats.json', JSON.stringify(stats), (err) => {
						if (err) throw err;
						console.log('The file has been saved!');
					});
				}
			});
		}
	});
});

// Удаление товара из корзины
app.delete('/api/cart/:id', (req, res) => {
	fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus(404, JSON.stringify({
				result: 0,
				text: err
			}));
		} else {
			// парсим текущую корзину
			let cart = JSON.parse(data);
			// ищем товар по id
			cart.contents = cart.contents.filter(product => product.id_product !== req.body.id_product);
			// пишем обратно
			fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
				if (err) {
					res.send('{"result": 0}');
				} else {
					res.send('{"result": 1}');
				}
			});
			//Данные для stats.json
			fs.readFile('./server/db/stats.json', (err, data) => {
				if (err) {
					console.log('Должен быть не пустой json файл');
				} else {
					let stats = JSON.parse(data);
					let obj = {name: req.body.product_name, method: 'Delete', time: new Date()};
					stats.push(obj);
					fs.writeFile('./server/db/stats.json', JSON.stringify(stats), (err) => {
						if (err) throw err;
						console.log('The file has been saved!');
					});
				}
			});
		}
	});
});

/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 8888; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
	console.log(`Listening ${port} port`);
});
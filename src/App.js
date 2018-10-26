import React, { Component } from 'react';
import InputBlock from './components/input_block';
import AddItemBlock from './components/add_item_block';
import { SubcatTemplate, CardTemplate } from './templates';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			DB: {
				"title": "",
				"cardh1title": "",
				"link": "",
				"desc": "",
				"priceList": "",
				"carouselLink": "",
				"prods": {}
			}
		};
	}

	// Настройки пути ajax
	ajaxPath = "http://victr85.beget.tech/dbeditor/";
	// ajaxPath = "http://dbeditor/build/";

	autosaveIntervalID = null;
	autosaveInterval = 5;
	currentDBFileURL = null;

	addItem = (item, e) => {
		const newDB = this.state.DB;
		const newItemTitle = e.currentTarget.closest('.add_item_block-wrap').querySelector('input.new_item_title').value.toLowerCase().replace(/\s+/g, "_");
		if (newItemTitle) {
			if (item === "subcat") {
				if (newDB.subcats) {
					if (newDB.subcats.hasOwnProperty(newItemTitle)) {
						alert("Элемент с таким названием уже имеется. Выберите другое название или удалите имеющийся элемент.");
						return;
					}
					newDB.subcats[newItemTitle] = new SubcatTemplate();
				} else {
					newDB.subcats = {};
					newDB.subcats[newItemTitle] = new SubcatTemplate();
					newDB.subcats[newItemTitle].prods = newDB.prods;
					delete newDB.prods;
				}
			} else if (item === "card") {
				if (newDB.subcats) {
					const subcatTitle = e.currentTarget.closest('.subcat').id;
					if (newDB.subcats[subcatTitle].prods.hasOwnProperty(newItemTitle)) {
						alert("Элемент с таким названием уже имеется. Выберите другое название или удалите имеющийся элемент.");
						return;
					}
					newDB.subcats[subcatTitle].prods[newItemTitle] = new CardTemplate();
				} else {
					if (newDB.prods.hasOwnProperty(newItemTitle)) {
						alert("Элемент с таким названием уже имеется. Выберите другое название или удалите имеющийся элемент.");
						return;
					}
					newDB.prods[newItemTitle] = new CardTemplate();
				}
			}
		} else {
			alert("Введите название для нового элемента.");
			return;
		}
		this.setState({
			DB: newDB
		});
	}

	renameItem = (e) => {
		const newDB = this.state.DB;
		const DBItem = e.currentTarget.closest('[data-item-role="db_item"]');
		const oldItemTitle = DBItem.id;
		let newItemTitle;
		if (e.currentTarget.innerText) {
			newItemTitle = e.currentTarget.innerText = e.currentTarget.innerText.toLowerCase().replace(/\s+/g, "_");
		} else {
			newItemTitle = e.currentTarget.innerText = oldItemTitle;
		}
		if (newItemTitle !== oldItemTitle) {
			if (DBItem.classList.contains('subcat')) {
				newDB.subcats[newItemTitle] = newDB.subcats[oldItemTitle];
				delete newDB.subcats[oldItemTitle];
			} else if (DBItem.classList.contains('card')) {
				const subcat = e.currentTarget.closest('.subcat').id;
				if (subcat) {
					newDB.subcats[subcat].prods[newItemTitle] = newDB.subcats[subcat].prods[oldItemTitle];
					delete newDB.subcats[subcat].prods[oldItemTitle];
				} else {
					newDB.prods[newItemTitle] = newDB.prods[oldItemTitle];
					delete newDB.prods[oldItemTitle];
				}
			}
			this.setState({
				DB: newDB
			});
		}
	}

	minimizeItem = (e) => {
		e.currentTarget.closest('[data-item-role="db_item"]').classList.toggle("minimized");
	}

	deleteItem = (e) => {
		const targetEl = e.currentTarget.closest('[data-item-role="db_item"]');
		const isConfirmed = window.confirm(`Вы уверены, что хотите удалить элемент ${targetEl.id}? Несохранённые изменения будут потеряны.`);
		if (isConfirmed) {
			const newDB = this.state.DB;
			if (targetEl.classList.contains("subcat")) {
				delete newDB.subcats[targetEl.id];
				if (Object.keys(newDB.subcats).length === 0 && newDB.subcats.constructor === Object) {
					delete newDB.subcats;
					newDB.prods = {};
				}
			} else if (targetEl.classList.contains("card")) {
				if (newDB.hasOwnProperty("subcats")) {
					const targetSubcat = targetEl.closest('.subcat').id;
					delete newDB.subcats[targetSubcat].prods[targetEl.id];
				} else {
					delete newDB.prods[targetEl.id];
				}
			}
			this.setState({
				DB: newDB
			});
		}
	}

	displayCategoryContent = () => {
		const DB = this.state.DB;
		if (DB.subcats) {
			return (
				<div className="category_content">
					{this.displaySubcats(DB.subcats)}
					<AddItemBlock itemType="subcat" addItem={this.addItem} />
				</div>
			);
		} else {
			return (
				<div className="category_content no_subcats">
					<div className="editor_block-col">
						<AddItemBlock itemType="subcat" addItem={this.addItem} />
					</div>
					<div className="editor_block-col">
						{this.displayCards(DB.prods)}
						<AddItemBlock itemType="card" addItem={this.addItem} />
					</div>
				</div>
			);
		}
	}

	displaySubcats = (subcatFolder) => {
		const subcatBlocks = [];
		let subcatIndex = 0;
		for (let subcat in subcatFolder) {
			subcatBlocks.push(
				<div key={subcatIndex} className="subcat minimized" id={subcat} data-item-role="db_item">
					<div className="ui_control_block">
						<span className="ui_btn minimize_item" onClick={(e) => this.minimizeItem(e)}>&minus;</span>
						<span className="ui_btn delete_item" onClick={(e) => this.deleteItem(e)}>&times;</span>
					</div>
					<span className="subcat_header" contentEditable="true" onBlur={this.renameItem}>{subcat}</span>
					<div className="subcat_wrap item_content">
						<div className="editor_block-col col_left">
							<InputBlock itemType="subcat" inputHandler={this.inputHandler} />
						</div>
						<div className="editor_block-col col_right">
							{this.displayCards(subcatFolder[subcat].prods, subcat)}
							<AddItemBlock itemType="card" addItem={this.addItem} />
						</div>
					</div>
				</div>
			);
			subcatIndex++;
		}
		return subcatBlocks;
	}

	displayCards = (prodsFolder, subcat = null) => {
		const prodBlocks = [];
		let prodIndex = 0;
		let radioName;
		for (let prod in prodsFolder) {
			if (this.state.DB.priceList) {
				if (subcat) {
					radioName = subcat + prod;
				} else {
					radioName = prod;
				}
			}
			prodBlocks.push(
				<div key={prodIndex} className="card minimized" id={prod} data-item-role="db_item">
					<div className="ui_control_block">
						<span className="ui_btn minimize_item" onClick={(e) => this.minimizeItem(e)}>&minus;</span>
						<span className="ui_btn delete_item" onClick={(e) => this.deleteItem(e)}>&times;</span>
					</div>
					<span className="card_header" contentEditable="true" onBlur={this.renameItem}>{prod}</span>
					<div className="item_content">
						<InputBlock itemType="card" radioName={radioName} inputHandler={this.inputHandler} />
					</div>
				</div>
			);
			prodIndex++;
		}
		return prodBlocks;
	}

	inputHandler = (e) => {
		const input = e.currentTarget;
		const key = input.closest('.key_container').querySelector("span.db_key").innerText;
		const elemType = input.dataset.elemType;
		const dataType = input.dataset.dataType;
		const DB = this.state.DB;
		let val = input.value;
		input.style.borderColor = "#555";
		if (dataType) {
			let temp = val.replace(/([^\\])"/gm, "$1\\\"")
				.replace(/\\(?!")/gm, "")
				.replace(/$/gm, "\"")
				.replace(/"$\n/gm, "\",\n")
				.replace(/^/gm, "\"");
			if (dataType === "array_a") {
				temp = `{${temp.replace(/\t/gm, "\": \"").replace(/"$\n/gm, "\",\n")}}`;
			} else {
				temp = `[${temp}]`;
			}
			try {
				val = JSON.parse(temp);
			} catch (e) {
				input.style.borderColor = "#f00";
				return;
			}
		}
		if (elemType === "category") {
			DB[key] = val;
		} else if (elemType === "subcat") {
			const subcatID = input.closest('.subcat').id;
			DB.subcats[subcatID][key] = val;
		} else if (elemType === "card") {
			const cardID = input.closest('.card').id;
			const infoBlock = input.closest('[data-subfolder="infoBlock"]');
			if (infoBlock) {
				if (DB.subcats) {
					const subcatID = input.closest('.subcat').id;
					DB.subcats[subcatID].prods[cardID].infoBlock[key] = val;
				} else {
					DB.prods[cardID].infoBlock[key] = val;
				}
			} else {
				if (DB.subcats) {
					const subcatID = input.closest('.subcat').id;
					DB.subcats[subcatID].prods[cardID][key] = val;
				} else {
					DB.prods[cardID][key] = val;
				}
			}
		}
	}

	populateInputs = () => {
		const inputs = document.querySelectorAll('.input');
		for (let input of inputs) {
			const key = input.closest('.key_container').querySelector("span.db_key").innerText;
			const elemType = input.dataset.elemType;
			const dataType = input.dataset.dataType;
			const inputType = input.getAttribute('type');
			const DB = this.state.DB;
			let val;

			if (elemType === "category") {
				val = DB[key];
			} else if (elemType === "subcat") {
				const subcatID = input.closest('.subcat').id;
				val = DB.subcats[subcatID][key];
			} else if (elemType === "card") {
				const cardID = input.closest('.card').id;
				const infoBlock = input.closest('[data-subfolder="infoBlock"]');
				if (infoBlock) {
					if (DB.subcats) {
						const subcatID = input.closest('.subcat').id;
						val = DB.subcats[subcatID].prods[cardID].infoBlock[key];
					} else {
						val = DB.prods[cardID].infoBlock[key];
					}
				} else {
					if (DB.subcats) {
						const subcatID = input.closest('.subcat').id;
						val = DB.subcats[subcatID].prods[cardID][key];
					} else {
						val = DB.prods[cardID][key];
					}
				}
			}


			if (inputType === 'radio' && val === input.value) {
				input.checked = 'checked';
				return;
			}

			if (val) {
				if (dataType && val === Object(val)) {
					val = JSON.stringify(val, null, 2)
						.replace(/(\{|\[)\n?|\n?(\}|\])/gm, '')
						.replace(/^( |\t)*"/gm, '')
						.replace(/": "/gm, '\t')
						.replace(/",?$/gm, '');
				}
				input.value = val;
			}
		}
	}

	// Ajax-запросы
	saveScript = "db_save.php";
	loadScript = "db_load.php";
	createPagesScript = "db_create_pages.php";
	createPagesAllScript = "db_create_pages_all.php";

	ajaxSaveDB = async (e, autosave = false) => {
		let placeholder = "db_name-db.php";
		if (this.currentDBFileURL) {
			placeholder = this.currentDBFileURL.match(/[^/]+$/);
		}
		let message = "Введите название файла БД";
		if (autosave) {
			message = "Напоминаем, что пора сохранить работу. Введите название файла БД.";
		}
		let db_name = prompt(message, placeholder);
		if (db_name) {
			document.getElementById("modal_loading").classList.remove("hidden");
			db_name = db_name.toLowerCase().replace(/\s+/g, "_");
			const DB = "file_name=(" + db_name + ")" + JSON.stringify(this.state.DB);
			const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" });
			const request = new Request(this.ajaxPath + this.saveScript, { method: 'POST', body: DB, headers: headers });
			const response = await fetch(request);
			if (response.ok) {
				document.getElementById('server_reply').innerHTML = this.currentDBFileURL = await response.text();
				this.resetAutosave();
			} else {
				alert('Возникла ошибка при запросе. Убедитесь, что данные запроса не содержат ошибок.')
			}
			document.getElementById("modal_loading").classList.add("hidden");
		} else if (db_name !== null) {
			alert("Необходимо ввести название для файла БД.");
		}
		console.log("Отработала функция сохранения БД");
	}
	resetAutosave = () => {
		const isChecked = document.getElementById("autosave_checkbox").checked;
		if (this.autosaveIntervalID) {
			clearInterval(this.autosaveIntervalID);
		}
		if (isChecked) {
			this.autosaveIntervalID = setInterval(() => this.ajaxSaveDB(null, true), this.autosaveInterval * 60 * 1000);
		} else {
			this.autosaveIntervalID = null;
		}
	}

	ajaxLoadDB = async () => {
		let placeholder = "";
		if (this.state.currentDBFileURL) {
			placeholder = this.state.currentDBFileURL;
		}
		const db_url = prompt("Введите путь к файлу БД", placeholder);
		if (db_url) {
			document.getElementById("modal_loading").classList.remove("hidden");
			const headers = new Headers({ "Content-Type": "text/plain; charset=utf-8" });
			const request = new Request(this.ajaxPath + this.loadScript, { method: 'POST', body: db_url, headers: headers });
			const response = await fetch(request);
			if (response.ok) {
				const newDB = JSON.parse(unescape(await response.text()), (key, value) => {
					// Заменить пустые массивы prods и subcats на объекты
					if ((key === 'prods' || key === 'subcats') && value instanceof Array && value.length === 0) {
						return {}
					} else {
						return value
					}
				});
				if (newDB) {
					this.resetAutosave();
					this.setState({
						currentDBFileURL: db_url,
						DB: newDB
					});
				}
			} else {
				alert('Возникла ошибка при запросе. Убедитесь, что данные запроса не содержат ошибок.')
			}
			document.getElementById("modal_loading").classList.add("hidden");
		} else if (db_url !== null) {
			alert("Необходимо ввести путь к файлу БД.");
		}
	}

	ajaxCreatePages = async () => {
		let placeholder = "";
		if (this.currentDBFileURL) {
			placeholder = this.currentDBFileURL;
		}
		const db_url = prompt("Введите путь к файлу БД", placeholder);
		if (db_url) {
			document.getElementById("modal_loading").classList.remove("hidden");
			const data = JSON.stringify({ "db_url": db_url, "no_subfolders": false });
			const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" });
			const request = new Request(this.ajaxPath + this.createPagesScript, { method: 'POST', body: data, headers: headers });
			const response = await fetch(request);
			if (response.ok) {
				const txt = await response.text();
				if (txt) {
					document.getElementById('server_reply').innerHTML = txt;
				} else {
					document.getElementById('server_reply').innerHTML = "Сервер не вернул данные";
				}
			} else {
				alert('Возникла ошибка при запросе. Убедитесь, что данные запроса не содержат ошибок.')
			}
			document.getElementById("modal_loading").classList.add("hidden");
		} else if (db_url !== null) {
			alert("Необходимо ввести путь к файлу.");
		}
		console.log("Отработала функция создания страниц");
	}

	ajaxCreatePagesAll = async () => {
		const dir_url = prompt("Введите путь к директории");
		const no_subfolders = window.confirm("Сохранить в одну папку?");
		if (dir_url) {
			document.getElementById("modal_loading").classList.remove("hidden");
			const data = JSON.stringify({ "dir_url": dir_url, "no_subfolders": no_subfolders });
			const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" });
			const request = new Request(this.ajaxPath + this.createPagesAllScript, { method: 'POST', body: data, headers: headers });
			const response = await fetch(request);
			if (response.ok) {
				const txt = await response.text();
				if (txt) {
					document.getElementById('server_reply').innerHTML = txt;
				} else {
					document.getElementById('server_reply').innerHTML = "Сервер не вернул данные";
				}
			}
			document.getElementById("modal_loading").classList.add("hidden");
		} else if (dir_url !== null) {
			alert("Необходимо ввести путь к директории.");
		}
		console.log("Отработала функция создания всех страниц");
	}

	componentDidMount() {
		window.addEventListener("beforeunload", (e) => {
			e.returnValue = "Вы уверены, что хотите закрыть редактор? Несохранённые изменения будут потеряны.";
		});
		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && String.fromCharCode(e.keyCode).toLowerCase() === "s") {
				e.preventDefault();
				this.ajaxSaveDB();
			}
		});
		this.resetAutosave();
	}

	componentDidUpdate() {
		this.populateInputs();
	}

	render() {
		return (
			<div className="container">
				<div className="modal_loading hidden" id="modal_loading">
					<img src="loader.gif" alt="индикатор загрузки" />
					<p>Загрузка...</p>
				</div>
				<div className="col_titles_block">
					<div className="col_title">Категория</div>
					<div className="col_title">Подкатегории</div>
					<div className="col_title">Товары</div>
				</div>
				<div className="editor_block">
					<div className="editor_block-col">
						<InputBlock itemType="category" inputHandler={this.inputHandler} />
					</div>
					<div className="category_content_wrap">
						{this.displayCategoryContent()}
					</div>
				</div>
				<div className="footer_control_panel">
					<div className="btn create_db" onClick={this.ajaxSaveDB}><span className="btn_icon plus">+</span><span className="btn_title">Сохранить БД</span></div>
					<div className="btn create_db" onClick={this.ajaxLoadDB}><span className="btn_icon plus">+</span><span className="btn_title">Загрузить БД</span></div>
					<div className="btn create_db" onClick={this.ajaxCreatePages}><span className="btn_icon plus">+</span><span className="btn_title">Создать страницы</span></div>
					<div className="btn create_db hidden" onClick={this.ajaxCreatePagesAll}><span className="btn_icon plus">+</span><span className="btn_title">Создать ВСЕ страницы</span></div>
				</div>
				<div className="autosave_block">
					<label><input type="checkbox" name="autosave_checkbox" id="autosave_checkbox" defaultChecked="true" onChange={this.resetAutosave} /> Автосохранение</label>
					<div>
						<span>Интервал: </span><input type="number" id="autosaveInterval" defaultValue={this.autosaveInterval} onBlur={(e) => { this.autosaveInterval = +(e.currentTarget.value); this.resetAutosave(); }} min="1" /><span> мин.</span>
					</div>
				</div>
				<div id="server_reply"></div>
			</div>
		);
	}
}
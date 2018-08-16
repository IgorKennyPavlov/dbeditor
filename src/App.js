import React, { Component } from 'react';
import InputBlock from './components/input_block';
import AddItemBlock from './components/add_item_block';
import { SubcatTemplate, CardTemplate } from './templates.js';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autosaveIntervalID: null,
            currentDBFileURL : null,
            DB: {
                "title": "",
                "cardh1title": "",
                "link": "",
                "desc": "",
                "priceList": "",
                "prods": {}
            }
        };
        this.setState = this.setState.bind(this);
    }

    getParentByClass = (el, targetParentClass) => {
        let currentParent = el.parentElement;
        while (!currentParent.classList.contains(targetParentClass)) {
            if (currentParent === document.body) {
                return false;
            }
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
    getParentByDataAttr = (el, dataAttrName, dataAttrValue = null) => {
        let currentParent = el.parentElement;
        let found = false;
        while (!found) {
            if (currentParent === document.body) {
                return false;
            }
            if(currentParent.dataset[dataAttrName]) {
                if(dataAttrValue) {
                    if(dataAttrValue === currentParent.dataset[dataAttrName]) {
                        found = true;
                        continue;
                    }
                } else {
                    found = true;
                    continue;
                }
            }
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }

    addItem = (item, e) => {
        let newDB = this.state.DB;
        let newItemTitle = this.getParentByClass(e.currentTarget, "add_item_block-wrap").querySelector("input.new_item_title").value.toLowerCase().replace(/\s+/g, "_");
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
                    let subcatTitle = this.getParentByClass(e.currentTarget, "subcat").id;
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

    minimizeItem = (e) => {
        let targetEl = this.getParentByDataAttr(e.currentTarget, "itemRole", "db_item");
        targetEl.classList.toggle("minimized");
        if(targetEl.classList.contains("card")) {
            let textareas = targetEl.querySelectorAll("textarea");
            textareas.forEach(textarea => {
                textarea.style.minHeight = "";
                textarea.style.minHeight = textarea.scrollHeight + "px";
            });
        }
    }

    deleteItem = (e) => {
        let targetEl = this.getParentByDataAttr(e.currentTarget, "itemRole", "db_item");
        let newDB = this.state.DB;
        if (targetEl.classList.contains("subcat")) {
            delete newDB.subcats[targetEl.id];
            if (Object.keys(newDB.subcats).length === 0 && newDB.subcats.constructor === Object) {
                delete newDB.subcats;
                newDB.prods = {};
            }
        } else if (targetEl.classList.contains("card")) {
            if (newDB.hasOwnProperty("subcats")) {
                let targetSubcat = this.getParentByClass(targetEl, "subcat").id;
                delete newDB.subcats[targetSubcat].prods[targetEl.id];
            } else {
                delete newDB.prods[targetEl.id];
            }
        }
        this.setState({
            DB: newDB
        });
    }

    displayCategoryContent = () => {
        let DB = this.state.DB;
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
        let subcatBlocks = [];
        let subcatIndex = 0;
        for (let subcat in subcatFolder) {
            subcatBlocks.push(
                <div key={subcatIndex} className="subcat minimized" id={subcat} data-item-role="db_item" >
                    <div className="ui_control_block">
                        <span className="ui_btn minimize_item" onClick={(e) => this.minimizeItem(e)}>&minus;</span>
                        <span className="ui_btn delete_item" onClick={(e) => this.deleteItem(e)}>&times;</span>
                    </div>
                    <span className="subcat_header">{subcat}</span>
                    <div className="subcat_wrap item_content">
                        <div className="editor_block-col col_left">
                            <InputBlock itemType="subcat" subcat={subcat} DB={this.state.DB} inputHandler={this.inputHandler} />
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
        let prodBlocks = [];
        let productIndex = 0;
        for (let product in prodsFolder) {
            prodBlocks.push(
                <div key={productIndex} className="card minimized" id={product} data-item-role="db_item">
                    <div className="ui_control_block" data-item-role="something">
                        <span className="ui_btn minimize_item" onClick={(e) => this.minimizeItem(e)}>&minus;</span>
                        <span className="ui_btn delete_item" onClick={(e) => this.deleteItem(e)}>&times;</span>
                    </div>
                    <span className="card_header">{product}</span>
                    <div className="item_content">
                        <InputBlock itemType="card" DB={this.state.DB} inputHandler={this.inputHandler} product={product} subcat={subcat} />
                    </div>
                </div>
            );
            productIndex++;
        }
        return prodBlocks;
    }

    inputHandler = (e) => {
        let targetInput = e.currentTarget;
        targetInput.style.minHeight = "";
        targetInput.style.minHeight = targetInput.scrollHeight + "px";
        targetInput.style.borderColor = "#555";
        let key = this.getParentByClass(targetInput, "key_container").querySelector("span.key").innerText;
        let val = targetInput.value;
        console.log(val);
        let inputClasses = targetInput.classList;
        let newDB = this.state.DB;
        if(key === "images" || key === "advantages"|| key === "attributes"|| key === "primaryProps"|| key === "props") {
            try {
                val = JSON.parse(val);
            } catch(e) {
                targetInput.style.borderColor = "#f00";
                alert(`В поле допущена ошибка. Проверьте синтаксис.`);
            }
        }
        if (inputClasses.contains("category_input")) {
            newDB[key] = val;
        } else if (inputClasses.contains("subcat_input")) {
            let subcatID = this.getParentByClass(targetInput, "subcat").id;
            newDB.subcats[subcatID][key] = val;
        } else if (inputClasses.contains("card_input")) {
            let cardID = this.getParentByClass(targetInput, "card").id;
            let infoBlock = this.getParentByDataAttr(targetInput, "subfolder", "infoBlock");
            if(infoBlock) {
                if (newDB.subcats) {
                    let subcatID = this.getParentByClass(targetInput, "subcat").id;
                    newDB.subcats[subcatID].prods[cardID].infoBlock[key] = val;
                } else {
                    newDB.prods[cardID].infoBlock[key] = val;
                }
            } else {
                if (newDB.subcats) {
                    let subcatID = this.getParentByClass(targetInput, "subcat").id;
                    newDB.subcats[subcatID].prods[cardID][key] = val;
                } else {
                    newDB.prods[cardID][key] = val;
                }
            }
        }
        this.setState({
            DB: newDB
        });
    }

    componentDidMount() {
        window.addEventListener("beforeunload", e => {
            e.returnValue = "Вы уверены, что хотите закрыть редактор? Несохранённые изменения будут потеряны.";
        });
        this.autosave();
    }

    // Ajax-запросы
    // ajaxPath = "http://victr85.beget.tech/dbeditor/";
    ajaxPath = "http://dbeditor/build/";
    saveScript = "db_save.php";
    loadScript = "db_load.php";
    createPagesScript = "db_create_pages.php";

    ajaxSaveDB = (e, autosave = false) => {
        let placeholder = "db_name-db.php";
        if(this.state.currentDBFileURL) {
            placeholder = this.state.currentDBFileURL.match(/[^/]+$/);
        }
        let message = "Введите название файла БД";
        if(autosave) {
            message = "Напоминаем, что пора сохранить работу. Введите название файла БД.";
        }
        let db_name = prompt(message, placeholder);
        if (db_name) {
            document.getElementById("modal_loading").classList.remove("hidden");
            db_name = db_name.toLowerCase().replace(/\s+/g, "_");
            let DB = JSON.stringify(this.state.DB);
            DB = "file_name=(" + db_name + ")" + DB;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.ajaxPath + this.saveScript, true);
            xhr.onload = () => {
                console.log("Запрос на сохранение выполнен");
            };
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    alert("Запрос выполнен");
                    document.getElementById("modal_loading").classList.add("hidden");
                    if (xhr.status === 200 && xhr.responseText) {
                        alert("Получен положительный ответ.");
                        document.getElementById('server_reply').innerHTML = xhr.responseText;
                        clearInterval(this.state.autosaveIntervalID);
                        this.autosave();
                        this.setState({
                            currentDBFileURL: xhr.responseText,
                        })
                    }
                }
            };
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.send(DB);
        } else if (db_name !== null) {
            alert("Необходимо ввести название для файла БД.");
        }
        console.log("Отработала функция сохранения БД");
    }
    autosave = () => {
        let checked = document.getElementById("autosave_checkbox").checked;
        if(checked) {
            this.setState({
                autosaveIntervalID: setInterval(() => this.ajaxSaveDB(null, true), 300000)
            });
        } else {
            clearInterval(this.state.autosaveIntervalID);
            this.setState({
                autosaveIntervalID: null
            });
        }
    }

    ajaxLoadDB = () => {
        let placeholder = "";
        if(this.state.currentDBFileURL) {
            placeholder = this.state.currentDBFileURL;
        }
        let db_url = prompt("Введите путь к файлу БД", placeholder);
        if (db_url) {
            document.getElementById("modal_loading").classList.remove("hidden");
            let newDB;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.ajaxPath + this.loadScript, true);
            xhr.onload = () => {
                console.log("Запрос на загрузку отправлен успешно");
            };
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    alert("Запрос выполнен");
                    document.getElementById("modal_loading").classList.add("hidden");
                    if (xhr.status === 200) {
                        alert("Получен положительный ответ.");
                        if(xhr.responseText) {
                            newDB = xhr.responseText;
                            newDB = JSON.parse(unescape(newDB));
                            this.setState({
                                DB: newDB
                            });
                        } else {
                            console.log("Пустой ответ");
                        }
                    }
                }
            };
            xhr.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
            xhr.send(db_url);
        } else if (db_url !== null) {
            alert("Необходимо ввести путь к файлу БД.");
        }
        console.log("Отработала функция загрузки БД");
    }

    ajaxCreatePages = () => {
        let placeholder = "";
        if(this.state.currentDBFileURL) {
            placeholder = this.state.currentDBFileURL;
        }
        let db_url = prompt("Введите путь к файлу БД", placeholder);
        if(db_url) {
            document.getElementById("modal_loading").classList.remove("hidden");
            let xhr = new XMLHttpRequest();
            xhr.open('POST', this.ajaxPath + this.createPagesScript, true);
            xhr.onload = () => {
                console.log("Запрос на создание страниц отправлен успешно");
            };
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    alert("Запрос выполнен");
                    document.getElementById("modal_loading").classList.add("hidden");
                    if (xhr.status === 200) {
                        alert("Получен положительный ответ.");
                        if(xhr.responseText) {
                            document.getElementById('server_reply').innerHTML = xhr.responseText;
                        } else {
                            document.getElementById('server_reply').innerHTML = "Сервер не вернул данные";
                        }
                    } else {
                        console.log("Ошибка при создании страницы. Код статуса: "+xhr.status);
                    }
                } else {
                    console.log("Код состояния готовности: "+xhr.readyState);
                }
            };
            xhr.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
            xhr.send(db_url);
        } else if (db_url !== null) {
            alert("Необходимо ввести путь к файлу.");
        }
        console.log("Отработала функция создания страниц");
    }

    render() {
        return (
            <div className="container">
                <div className="modal_loading hidden" id="modal_loading">
                    <img src="loader.gif" alt="индикатор загрузки"/>
                    <p>Загрузка...</p>
                </div>
                <div className="col_titles_block">
                    <div className="col_title">Категория</div>
                    <div className="col_title">Подкатегории</div>
                    <div className="col_title">Товары</div>
                </div>
                <div className="editor_block">
                    <div className="editor_block-col">
                        <InputBlock itemType="category" DB={this.state.DB} inputHandler={this.inputHandler} />
                    </div>
                    <div className="category_content_wrap">
                        {this.displayCategoryContent()}
                    </div>
                </div>
                <div className="footer_control_panel">
                    <div className="btn create_db" onClick={this.ajaxSaveDB}><span className="btn_icon plus">+</span><span className="btn_title">Сохранить БД</span></div>
                    <div className="btn create_db" onClick={this.ajaxLoadDB}><span className="btn_icon plus">+</span><span className="btn_title">Загрузить БД</span></div>
                    <div className="btn create_db" onClick={this.ajaxCreatePages}><span className="btn_icon plus">+</span><span className="btn_title">Создать страницы</span></div>
                </div>
                <div className="autosave">
                    <label><input type="checkbox" name="autosave_checkbox" id="autosave_checkbox" defaultChecked="true" onChange={this.autosave} /> Автосохранение (5 мин. без сохранения)</label>
                </div>
                <div id="server_reply"></div>
            </div>
        );
    }
}
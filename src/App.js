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
                // title : "хреновины для торговли",
                // cardh1title : "хреновина для торговли",
                // link : "/category_name-thingies_for_trading/items_for_trading.html",
                // priceList : "some/link/to/file.php",
                // subcats : {
                //     simple_thingies : {
                //         "title" : "простые хреновины",
                //         "link" : "/category-thingies_for_trading/subcat-simple_thingies/simple_thingies.html",
                //         "prods" : {
                //             "hrenovator_2000" : {
                //                 "title" : "Хреноватор 2000",
                //                 "link" : "/category-thingies_for_trading/subcat-simple_thingies/hrenovator_2000.html",
                //                 "article" : "111111",
                //                 "priceType" : "fixed",
                //                 "prodClass" : "rec",
                //                 "attributes" : {
                //                     "мощность" : "100",
                //                     "скорость" : "100",
                //                     "харизма" : "100",
                //                     "сопротивление_огню" : "100"
                //                 },
                //                 "images" : [
                //                     "/image1.jpg",
                //                     "/image2.jpg",
                //                     "/image3.jpg"
                //                 ],
                //                 "primaryProps" : {
                //                     "свойство 1" : "значение 1",
                //                     "свойство 2" : "значение 2",
                //                     "свойство 3" : "значение 3",
                //                     "свойство 4" : "значение 4"
                //                 },
                //                 "infoBlock" : {
                //                     "props" : {
                //                         "Метод печати" : "Прямая термопечать",
                //                         "Разрешение печати" : "203 dpi (8 точек/мм)",
                //                         "Скорость печати" : "88.9 мм/сек",
                //                         "Ширина печати" : "до 72 мм",
                //                         "Ресурс термоголовки" : "более 30 км",
                //                         "Процессор" : "16-разрядный RISC",
                //                         "Память" : "DRAM 512 Кб<br>Flash-ROM 512 Кб",
                //                         "Расходные материалы" : "В рулоне, стопкой, с разделителем, с непрерывной подачей, с перфорацией. Ширина: max - 76 мм, min - 25,4 мм. Толщина от 0,0635 до 0,254 мм. Внешний диаметр рулона 109 мм. Диаметр втулки 25 мм (1').",
                //                         "Поддерживаемые шрифты" : "Стандартный набор символов Int’l 5 алфавитно-цифровых шрифтов от 1,25 до 6,0 мм (0.49-0.23\"). Масштабируемость до 24х24.<br>Ориентация шрифтов (0-270°). Пользовательские шрифты.",
                //                         "Поддерживаемые штрих-коды" : "Code 39, Extended Code 39, Code 93, Code 128 UCC Code 128 (Subset A, B, C) Codabar, Interleave 2 of 5, EAN-8 2&5 дополнительная, EAN-13, EAN-128, UPC, UPC-A, E 2&5 дополнительная, POSTNET, German POST, Matrix 25, Maxicode, PDF-417,Data Matrix.",
                //                         "Графика" : "PPLA: PCX, BMP, IMG, HEX, GDI<br>PPLB: PCX, двоичный растр, GDI",
                //                         "Интерфейс подключения" : "Centronics (параллельный) RS-232 Min Din 6P(последовательный)",
                //                         "Напряжение питания" : "220В 50/60Гц; 21 - 24 В, мин. ток 2,5 А",
                //                         "Габаритные размеры" : "228мм (Д) x 134мм (Ш) x 163мм (В)",
                //                         "Вес" : "1,2 кг",
                //                         "Рабочая температура" : "от 4°С до +38°С",
                //                         "Влажность" : "от 10 до 90 % (при отсутствии конденсата)",
                //                         "Программное обеспечение" : "Пакет Argox PPLA/PPLB Language. Драйвера Windows (98/2000/NT/XP).<br>Программа для создания дизайна и печати этикеток ArgoBar. Утилиты печати и загрузки шрифтов.",
                //                         "Опциональные возможности" : "Отрезатель и отделитель этикеток, карта памяти (2 Мб), внешняя клавиатура, USB-адаптер, принт-сервер для подключения принтера по интерфейсу Ethernet",
                //                         "Гарантийный период" : "12 месяцев",
                //                         "Комплектация" : "Принтер, сетевой адаптер, CD-диск с документацией и программным обеспечением, краткое руководство по установке принтера."
                //                         },
                //                     "desc" : "Lorem ipsum dolor sit amet consectetur (adipisicing elit). Molestias facilis delectus quae nobis ipsa consequatur unde nisi ipsam doloribus, explicabo commodi veritatis temporibus pariatur magni dolorem ducimus dolor, laborum deleniti?",
                //                     "advantages" : [
                //                         "some",
                //                         "very",
                //                         "cool",
                //                         "values"
                //                     ],
                //                     "appAreas" : "Lorem ipsum dolor sit amet consectetur (adipisicing) elit. Itaque quasi accusamus totam delectus doloremque ipsam odit aliquid provident ex expedita recusandae tempore repellendus deserunt, nobis dolorem! Sint eos ipsum ex."
                //                 }
                //             }
                //         }
                //     },
                //     advanced_thingies : {
                //         "title" : "продвинутые хреновины",
                //         "link" : "/category-thingies_for_trading/subcat-advanced_thingies/advanced_thingies.html",
                //         "prods" : {
                //             "hrenovator_5000m" : {
                //                 "title" : "Хреноватор 5000М",
                //                 "link" : "/category-thingies_for_trading/subcat-simple_thingies/hrenovator_5000m.html",
                //                 "article" : "777777",
                //                 "priceType" : "fixed",
                //                 "prodClass" : "hit",
                //                 "attributes" : {
                //                     "мощность" : "1000",
                //                     "скорость" : "1000",
                //                     "харизма" : "1000",
                //                     "сопротивление_огню" : "1000"
                //                 },
                //                 "images" : [
                //                     "/image1.jpg",
                //                     "/image2.jpg",
                //                     "/image3.jpg"
                //                 ],
                //                 "primaryProps" : {
                //                     "свойство 1" : "значение 1",
                //                     "свойство 2" : "значение 2",
                //                     "свойство 3" : "значение 3",
                //                     "свойство 4" : "значение 4"
                //                 },
                //                 "infoBlock" : {
                //                     "props" : {
                //                         "свойство 1" : "значение 1",
                //                         "свойство 2" : "значение 2",
                //                         "свойство 3" : "значение 3",
                //                         "свойство 4" : "значение 4",
                //                         "свойство 11" : "значение 11",
                //                         "свойство 22" : "значение 22",
                //                         "свойство 33" : "значение 33",
                //                         "свойство 44" : "значение 44"
                //                     },
                //                     "desc" : "Lorem ipsum <b>dolor sit amet</b> consectetur (adipisicing elit). Molestias facilis delectus quae nobis ipsa consequatur unde nisi ipsam doloribus, explicabo commodi veritatis temporibus pariatur magni dolorem ducimus dolor, laborum deleniti?",
                //                     "advantages" : [
                //                         "some",
                //                         "very",
                //                         "\"cool\"",
                //                         "values"
                //                     ],
                //                     "appAreas" : "Lorem ipsum dolor sit amet consectetur (adipisicing) elit. Itaque quasi accusamus totam delectus <i>doloremque ipsam odit</i> aliquid provident ex expedita recusandae tempore repellendus deserunt, nobis dolorem! Sint eos ipsum ex."
                //                 }
                //             }
                //         }
                //     }
                // }
                "title": "",
                "cardh1title": "",
                "link": "",
                "prods": {}
            }
        };
        this.setState = this.setState.bind(this);
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
                            <InputBlock itemType="subcat" subcat={subcat} DB={this.state.DB} setState={this.setState} addItem={this.addItem} />
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
                        {subcat ?
                            <InputBlock itemType="card" DB={this.state.DB} setState={this.setState} product={product} subcat={subcat} addItem={this.addItem} /> :
                            <InputBlock itemType="card" DB={this.state.DB} setState={this.setState} product={product} addItem={this.addItem} />
                        }
                    </div>
                </div>
            );
            productIndex++;
        }
        return prodBlocks;
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

    inputHandler = (e) => {
        let key = this.getParentByClass(e.currentTarget, "key_container").querySelector("span.key").innerText;
        let val = e.currentTarget.value;
        let inputClasses = e.currentTarget.classList;
        let newDB = this.state.DB;
        if(key === "images" || key === "advantages"|| key === "attributes"|| key === "primaryProps"|| key === "props") {
            val = JSON.parse(val);
        }
        if (inputClasses.contains("category_input")) {
            newDB[key] = val;
        } else if (inputClasses.contains("subcat_input")) {
            let subcatID = this.getParentByClass(e.currentTarget, "subcat").id;
            newDB.subcats[subcatID][key] = val;
        } else if (inputClasses.contains("card_input")) {
            let cardID = this.getParentByClass(e.currentTarget, "card").id;
            if (newDB.subcats) {
                let subcatID = this.getParentByClass(e.currentTarget, "subcat").id;
                newDB.subcats[subcatID].prods[cardID][key] = val;
            } else {
                newDB.prods[cardID][key] = val;
            }
        }
        this.setState({
            DB: newDB
        });
    }

    resizeTextarea = (e) => {
        // При изменении содержания полей ввода меняется их высота. Пока не удалять.
        e.currentTarget.style.minHeight = "";
        e.currentTarget.style.minHeight = e.currentTarget.scrollHeight + "px";
    }

    addInputHandlers = () => {
        let inputs = document.querySelectorAll(".input_panel input, .input_panel textarea");
        inputs.forEach((input, index, listObj) => {
            input.removeEventListener("change", this.inputHandler);
            input.addEventListener("change", this.inputHandler);
        });
        
        let textareas = document.querySelectorAll(".input_panel textarea");
        textareas.forEach((textarea, index, listObj) => {
            textarea.removeEventListener("input", this.resizeTextarea);
            textarea.addEventListener("input", this.resizeTextarea);
        });
    }
    

    componentDidMount() {
        this.addInputHandlers();
        this.autosave();
    }
    componentDidUpdate() {
        this.addInputHandlers();
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
        console.log(this.state.DB);
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
                        <InputBlock itemType="category" DB={this.state.DB} />
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
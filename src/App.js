import React, { Component } from 'react';
import InputBlock from './components/input_block';
import AddItemBlock from './components/add_item_block';
import { SubcatTemplate, CardTemplate } from './templates.js';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DB: {
                // "title" : "хреновины для торговли",
                // "cardh1title" : "хреновина для торговли",
                // "link" : "category-thingies_for_trading/items_for_trading.html",
                // "priceList" : "some/link/to/file.php",
                // "subcats" : {
                //     "simple_thingies" : {
                //         "title" : "простые хреновины",
                //         "link" : "/category-thingies_for_trading/subcat-simple_thingies/simple_thingies.html",
                //         "prods" : {
                //             "hrenovator_2000" : {
                //                 "title" : "Хреноватор 2000",
                //                 "link" : "/category-thingies_for_trading/subcat-simple_thingies/prod-hrenovator_2000.html",
                //                 "article" : "111111",
                //                 "priceType" : "fixed",
                //                 "prodClass" : "rec",
                //                 "attributes" : {
                //                     "мощность" : "100",
                //                     "скорость" : "100",
                //                     "харизма" : "100",
                //                     "сопротивление_огню" : "100"
                //                 },
                //                 "images" : "images/image_1.jpg\nimages/image_2.jpg\nimages/image_3.jpg\nimages/image_4.jpg",
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
                //                     "desc" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias facilis delectus quae nobis ipsa consequatur unde nisi ipsam doloribus, explicabo commodi veritatis temporibus pariatur magni dolorem ducimus dolor, laborum deleniti?",
                //                     "advantages" : "some\n very\nimportant\nvalues",
                //                     "appAreas" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quasi accusamus totam delectus doloremque ipsam odit aliquid provident ex expedita recusandae tempore repellendus deserunt, nobis dolorem! Sint eos ipsum ex."
                //                 }
                //             }
                //         }
                //     },
                //     "advanced_thingies" : {
                //         "title" : "продвинутые хреновины",
                //         "link" : "/category-thingies_for_trading/subcat-advanced_thingies/advanced_thingies.html",
                //         "prods" : {
                //             "hrenovator_5000m" : {
                //                 "title" : "Хреноватор 5000М",
                //                 "link" : "/category-thingies_for_trading/subcat-simple_thingies/prod-hrenovator_5000m.html",
                //                 "article" : "777777",
                //                 "priceType" : "fixed",
                //                 "prodClass" : "hit",
                //                 "attributes" : {
                //                     "мощность" : "1000",
                //                     "скорость" : "1000",
                //                     "харизма" : "1000",
                //                     "сопротивление_огню" : "1000"
                //                 },
                //                 "images" : "images/image_11.jpg\nimages/image_12.jpg\nimages/image_13.jpg\nimages/image_14.jpg",
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
                //                     "desc" : "Lorem ipsum <b>dolor sit amet</b> consectetur adipisicing elit. Molestias facilis delectus quae nobis ipsa consequatur unde nisi ipsam doloribus, explicabo commodi veritatis temporibus pariatur magni dolorem ducimus dolor, laborum deleniti?",
                //                     "advantages" : "Some\nvery important\nvalues",
                //                     "appAreas" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quasi accusamus totam delectus <i>doloremque ipsam odit</i> aliquid provident ex expedita recusandae tempore repellendus deserunt, nobis dolorem! Sint eos ipsum ex."
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
        // if (item === "assoc_array_item") {
        //     let targetKey = this.getParentByClass(e.currentTarget, "key_container").querySelector("span.key").innerText;
        //     let targetCard = this.getParentByClass(e.currentTarget, "card").id;
        //     let folder = this.getParentByDataAttr(e.currentTarget, "folder");
        //     if (folder) {
        //         folder = folder.dataset.folder;
        //     }
        //     let targetArray;
        //     if (newDB.subcats) {
        //         let targetSubcat = this.getParentByClass(e.currentTarget, "subcat").id;
        //         if (folder) {
        //             targetArray = newDB.subcats[targetSubcat].prods[targetCard][folder][targetKey];
        //         } else {
        //             targetArray = newDB.subcats[targetSubcat].prods[targetCard][targetKey];
        //         }
        //     } else {
        //         if (folder) {
        //             targetArray = newDB.prods[targetCard][folder][targetKey];
        //         } else {
        //             targetArray = newDB.prods[targetCard][targetKey];
        //         }
        //     }
        //     targetArray["элемент_" + Object.keys(targetArray).length] = "значение";
        // } else {
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
        // }
        this.setState({
            DB: newDB
        });
    }

    minimizeItem = (e) => {
        let targetEl = this.getParentByDataAttr(e.currentTarget, "itemRole", "db_item");
        let minimized = targetEl.dataset.minimized;
        if (minimized) {
            targetEl.querySelector(".item_content").style.display = "flex";
            delete targetEl.dataset.minimized;
        } else {
            targetEl.querySelector(".item_content").style.display = "none";
            targetEl.dataset.minimized = true;
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
                <div key={subcatIndex} className="subcat" id={subcat} data-item-role="db_item">
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
                <div key={productIndex} className="card" id={product} data-item-role="db_item">
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
        let folder = this.getParentByDataAttr(e.currentTarget, "folder");
        if (folder) {
            folder = folder.dataset.folder;
        }
        e.currentTarget.style.minHeight = "";
        e.currentTarget.style.minHeight = e.currentTarget.scrollHeight + "px";
        if (inputClasses.contains("category_input")) {
            newDB[key] = val;
        } else if (inputClasses.contains("subcat_input")) {
            let subcatID = this.getParentByClass(e.currentTarget, "subcat").id;
            newDB.subcats[subcatID][key] = val;
        } else if (inputClasses.contains("card_input")) {
            let cardID = this.getParentByClass(e.currentTarget, "card").id;
            if (newDB.subcats) {
                let subcatID = this.getParentByClass(e.currentTarget, "subcat").id;
                if (folder) {
                    newDB.subcats[subcatID].prods[cardID][folder][key] = val;
                } else {
                    newDB.subcats[subcatID].prods[cardID][key] = val;
                }
            } else {
                if (folder) {
                    newDB.prods[cardID][folder][key] = val;
                } else {
                    newDB.prods[cardID][key] = val;
                }
            }
        }
        // else if (inputClasses.contains("assoc_array_input")) {
        //     let cardID = this.getParentByClass(e.currentTarget, "card").id;
        //     let subcatID;
        //     let targetArray;
        //     let prevKey = e.currentTarget.parentElement.dataset.key;
        //     if(this.getParentByClass(e.currentTarget, "attributes")) {
        //         val = val.toLowerCase().replace(/\s+/g, "_");
        //     }
        //     let prevValue = e.currentTarget.parentElement.dataset.value;
        //     if (newDB.subcats) {
        //         subcatID = this.getParentByClass(e.currentTarget, "subcat").id;
        //         if (folder) {
        //             targetArray = newDB.subcats[subcatID].prods[cardID][folder][key];
        //         } else {
        //             targetArray = newDB.subcats[subcatID].prods[cardID][key];
        //         }
        //     } else {
        //         if (folder) {
        //             targetArray = newDB.prods[cardID][folder][key];
        //         } else {
        //             targetArray = newDB.prods[cardID][key];
        //         }
        //     }
        //     if(inputClasses.contains("key")) {
        //         targetArray[val] = prevValue;
        //         delete targetArray[prevKey];
        //     } else if (inputClasses.contains("value")) {
        //         targetArray[prevKey] = val;
        //     }
        // }
        this.setState({
            DB: newDB
        });
    }

    addInputHandlers = () => {
        let inputs = document.querySelectorAll(".input_panel input, .input_panel textarea");
        inputs.forEach((input, index, listObj) => {
            input.removeEventListener("input", this.inputHandler);
            input.addEventListener("input", this.inputHandler);
        });
    }

    componentDidMount() {
        let inputs = document.querySelectorAll(".input_panel input, .input_panel textarea");
        inputs.forEach((input, index, listObj) => {
            input.style.minHeight = input.scrollHeight + "px";
        });
        this.addInputHandlers();
    }
    componentDidUpdate() {
        this.addInputHandlers();
    }

    ajaxCreateDB = () => {
        let file_name = prompt("Введите название файла БД", "file_name").toLowerCase().replace(/\s+/g, "_");
        if (!file_name) {
            file_name = "default_title";
        }
        let DB = JSON.stringify(this.state.DB).replace(/(\(|\))/g, "\\$1");
        DB = "file_name=(" + file_name + ")" + DB;
        let xhr = new XMLHttpRequest();
        // Оформить индексные массивы
        let indexed_arrays = DB.match(/("(images|advantages)":)(.[^"]*")(,?)/g);
        indexed_arrays.forEach((old_str, key) => {
            let current_array = old_str.match(/("(images|advantages)":)(.[^"]*")(,?)/);
            let new_str = current_array[3].replace(/,/g, "\\,");
            new_str = current_array[3].replace(/\\n/g, "\",\"");
            new_str = new_str.replace(/\s\s/g, " ");
            new_str = new_str.replace(/",\s*"/g, "\",\"");
            new_str = new_str.replace(/,?"\s*"/g, "");
            new_str = current_array[1] + "[" + new_str + "]" + current_array[4];
            DB = DB.replace(old_str, new_str);
        });
        xhr.open('POST', 'http://victr85.beget.tech/dbeditor/db_editor.php', true);
        // xhr.open('POST', 'http://dbeditor/build/db_editor.php', true);
        xhr.onload = () => {
            console.log("Готово");
        };
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                alert("Запрос выполнен");
                if (xhr.status === 200) {
                    alert("Получен положительный ответ.");
                    document.getElementById("server_reply").innerHTML = "Ответ сервера:<br>" + xhr.responseText;
                }
            }
        };
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.send(DB, file_name);
    }

    render() {
        return (
            <div className="container">
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
                <div className="add_item_block-wrap">
                    <div className="btn create_db" onClick={this.ajaxCreateDB}><span className="btn_icon plus">+</span><span className="btn_title">Создать БД</span></div>
                </div>
                <p id="server_reply"></p>
            </div>
        );
    }
}
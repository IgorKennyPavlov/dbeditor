import React from 'react';
// import AddItemBlock from './add_item_block';

export default class InputBlock extends React.Component {

    // displayArrayFields(array, folder = null) {
    //     let currentArray;
    //     let arrayItems = [];
    //     if (this.props.itemSubcat) {
    //         if (folder) {
    //             currentArray = this.props.DB.subcats[this.props.itemSubcat].prods[this.props.item][folder][array];
    //         } else {
    //             currentArray = this.props.DB.subcats[this.props.itemSubcat].prods[this.props.item][array];
    //         }
    //     } else {
    //         if (folder) {
    //             currentArray = this.props.DB.prods[this.props.item][folder][array];
    //         } else {
    //             currentArray = this.props.DB.prods[this.props.item][array];
    //         }
    //     }
    //     let currentItem = 0;
    //     for (let item in currentArray) {
    //         arrayItems.push(
    //             <div className="key_value_pair" key={currentItem++} data-key={item} data-value={currentArray[item]}>
    //                 <input type="text" className={array + " assoc_array_input key"} value={item} />
    //                 <input type="text" className={array + " assoc_array_input value"} value={currentArray[item]} />
    //             </div>
    //         );
    //     }
    //     return arrayItems;
    // }

    render() {
        let inputFields;
        let DB = this.props.DB;
        switch (this.props.itemType) {
            case "category":
                inputFields =
                    <div className="input_panel-wrap">
                        <label className="key_container">
                            <span className="key">title</span>
                            <input type="text" className="category_input" placeholder="название категории" defaultValue={DB.title} />
                        </label>
                        <label className="key_container">
                            <span className="key">cardh1title</span>
                            <input type="text" className="category_input" placeholder="название товара (ед.ч.)" defaultValue={DB.cardh1title} />
                        </label>
                        <label className="key_container">
                            <span className="key">link</span>
                            <textarea className="category_input" placeholder="ссылка на страницу категории" defaultValue={DB.link} />
                        </label>
                        <label className="key_container">
                            <span className="key">priceList</span>
                            <input type="text" className="category_input" placeholder="ссылка на прайс-лист" defaultValue={DB.priceList} />
                        </label>
                    </div>;
                break;
            case "subcat":
                let subcat = this.props.subcat;
                inputFields =
                    <div className="input_panel-wrap">
                        <label className="key_container">
                            <span className="key">title</span>
                            <input type="text" className="subcat_input" placeholder="название подкатегории" defaultValue={DB.subcats[subcat].title} />
                        </label>
                        <label className="key_container">
                            <span className="key">link</span>
                            <textarea className="subcat_input" placeholder="ссылка на страницу подкатегории" defaultValue={DB.subcats[subcat].link} />
                        </label>
                    </div>;
                break;
            case "card":
                let prod = this.props.product;
                let cardSubcat;
                let path;
                let priceType = "";
                if(this.props.subcat) {
                    cardSubcat = this.props.subcat;
                    path = DB.subcats[cardSubcat].prods[prod];
                } else {
                    path = DB.prods[prod];
                }
                if(path.priceType) {
                    priceType = path.priceType;
                }
                inputFields =
                    <div className="input_panel-wrap">
                        <label className="key_container">
                            <span className="key">title</span>
                            <input type="text" className="card_input" placeholder="название товара" defaultValue={path.title} />
                        </label>
                        <label className="key_container">
                            <span className="key">article</span>
                            <input type="text" className="card_input" placeholder="артикул" defaultValue={path.article} />
                        </label>
                        {
                            this.props.DB.priceList &&
                            <div className="key_container input_panel-subsection col">
                                <span className="key">priceType</span>
                                <div className="input_panel-subsection">
                                    <label>
                                        <input type="radio" name="priceType" className="card_input" value="range" defaultChecked={priceType === "range"} />
                                        <span>range</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="priceType" className="card_input" value="fixed" defaultChecked={priceType === "fixed"} />
                                        <span>fixed</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="priceType" className="card_input" value="" defaultChecked={priceType === ""} />
                                        <span>none</span>
                                    </label>
                                </div>
                            </div>
                        }
                        <label className="key_container">
                            <span className="key">link</span>
                            <textarea className="card_input" placeholder="ссылка на страницу товара" defaultValue={path.link} />
                        </label>
                        <label className="key_container">
                            <span className="key">prodClass</span>
                            <input type="text" className="card_input" placeholder="rec|new|hit|sale|disc" defaultValue={path.prodClass} />
                        </label>
                        <label className="key_container">
                            <span className="key">attributes</span>
                            <textarea className="card_input" placeholder="ассоц. массив" defaultValue={JSON.stringify(path.attributes, null, " ")}/>
                            {/* <div className="col_titles_block">
                                <div className="col_title">Ключ</div>
                                <div className="col_title">Значение</div>
                                </div>
                                <div className="input_panel-subsection col assoc_array_input">
                                {this.displayArrayFields("attributes")}
                                <AddItemBlock itemType="assoc_array_item" addItem={this.props.addItem} />
                            </div> */}
                        </label>
                        <label className="key_container">
                            <span className="key">images</span>
                            <textarea className="card_input" placeholder="ссылки на изображения (массив)" defaultValue={path.images}/>
                        </label>
                        <label className="key_container">
                            <span className="key">primaryProps</span>
                            <textarea className="card_input" placeholder="ассоц. массив" defaultValue={JSON.stringify(path.primaryProps, null, " ")} />
                            {/* <div className="col_titles_block">
                                <div className="col_title">Ключ</div>
                                <div className="col_title">Значение</div>
                                </div>
                            <div className="input_panel-subsection col assoc_array_input">
                            {this.displayArrayFields("primaryProps")}
                            <AddItemBlock itemType="assoc_array_item" addItem={this.props.addItem} />
                            </div> */}
                        </label>
                        <div className="infoBlock" data-folder="infoBlock">
                            <p>infoBlock</p>
                            <label className="key_container">
                                <span className="key">props</span>
                                <textarea className="card_input" placeholder="ассоц. массив" defaultValue={JSON.stringify(path.infoBlock.props, null, " ")} />
                                {/* <div className="col_titles_block">
                                    <div className="col_title">Ключ</div>
                                    <div className="col_title">Значение</div>
                                </div>
                                <div className="input_panel-subsection col assoc_array_input">
                                    {this.displayArrayFields("props", "infoBlock")}
                                    <AddItemBlock itemType="assoc_array_item" addItem={this.props.addItem} />
                                </div> */}
                            </label>
                            <label className="key_container">
                                <span className="key">desc</span>
                                <textarea className="card_input" placeholder="описание для инфоблока" defaultValue={path.infoBlock.desc} />
                            </label>
                            <label className="key_container">
                                <span className="key">advantages</span>
                                <textarea className="card_input" placeholder="описание преимуществ товара для инфоблока (массив)" defaultValue={path.infoBlock.advantages} />
                            </label>
                            <label className="key_container">
                                <span className="key">appAreas</span>
                                <textarea className="card_input" placeholder="описание областей применения для инфоблока" defaultValue={path.infoBlock.appAreas} />
                            </label>
                        </div>
                    </div>;
                break;
            default:
                break;
        }
        return (
            <div className="input_panel">
                {inputFields}
            </div>
        );
    }
};
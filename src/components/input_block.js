import React from 'react';

export default class InputBlock extends React.Component {

    render() {
        let inputFields;
        let DB = this.props.DB;
        switch (this.props.itemType) {
            case "category":
                inputFields =
                    <div className="input_panel-wrap">
                        <label className="key_container">
                            <span className="key">title</span>
                            <input type="text" className="category_input" placeholder="название категории" onChange={this.props.inputHandler} value={DB.title} />
                        </label>
                        <label className="key_container">
                            <span className="key">cardh1title</span>
                            <input type="text" className="category_input" placeholder="название товара (ед.ч.)"onChange={this.props.inputHandler}  value={DB.cardh1title} />
                        </label>
                        <label className="key_container">
                            <span className="key">desc</span>
                            <textarea className="category_input" placeholder="описание категории" onChange={this.props.inputHandler} value={DB.desc} />
                        </label>
                        <label className="key_container">
                            <span className="key">link</span>
                            <textarea className="category_input" placeholder="ссылка на страницу категории" onChange={this.props.inputHandler} value={DB.link} />
                        </label>
                        <label className="key_container">
                            <span className="key">priceList</span>
                            <textarea className="category_input" placeholder="ссылка на прайс-лист" onChange={this.props.inputHandler} value={DB.priceList} />
                        </label>
                    </div>;
                break;
            case "subcat":
                let subcat = this.props.subcat;
                inputFields =
                    <div className="input_panel-wrap">
                        <label className="key_container">
                            <span className="key">title</span>
                            <input type="text" className="subcat_input" placeholder="название подкатегории" onChange={this.props.inputHandler} value={DB.subcats[subcat].title} />
                        </label>
                        <label className="key_container">
                            <span className="key">desc</span>
                            <textarea className="subcat_input" placeholder="описание подкатегории" onChange={this.props.inputHandler} value={DB.subcats[subcat].desc} />
                        </label>
                        <label className="key_container">
                            <span className="key">link</span>
                            <textarea className="subcat_input" placeholder="ссылка на страницу подкатегории" onChange={this.props.inputHandler} value={DB.subcats[subcat].link} />
                        </label>
                    </div>;
                break;
            case "card":
                let prodName = this.props.product;
                let cardSubcat = this.props.subcat;
                let prod;
                if(cardSubcat) {
                    prod = DB.subcats[cardSubcat].prods[prodName];
                } else {
                    prod = DB.prods[prod];
                }
                inputFields =
                    <div className="input_panel-wrap">
                        <label className="key_container">
                            <span className="key">title</span>
                            <input type="text" className="card_input" placeholder="название товара" onChange={this.props.inputHandler} value={prod.title} />
                        </label>
                        <label className="key_container">
                            <span className="key">article</span>
                            <input type="text" className="card_input" placeholder="артикул" onChange={this.props.inputHandler} value={prod.article} />
                        </label>
                        {
                            this.props.DB.priceList &&
                            <div className="key_container input_panel-subsection col">
                                <span className="key">priceType</span>
                                <div className="input_panel-subsection">
                                    <label>
                                        <input type="radio" name={"priceType"+prodName} className="card_input" onChange={this.props.inputHandler} value="range" defaultChecked={prod.priceType === 'range'} />
                                        <span>range</span>
                                    </label>
                                    <label>
                                        <input type="radio" name={"priceType"+prodName} className="card_input" onChange={this.props.inputHandler} value="fixed" defaultChecked={prod.priceType === 'fixed'} />
                                        <span>fixed</span>
                                    </label>
                                    <label>
                                        <input type="radio" name={"priceType"+prodName} className="card_input" onChange={this.props.inputHandler} value="" defaultChecked={prod.priceType === undefined || prod.priceType === ''} />
                                        <span>none</span>
                                    </label>
                                </div>
                            </div>
                        }
                        <label className="key_container">
                            <span className="key">link</span>
                            <textarea className="card_input" placeholder="ссылка на страницу товара" onChange={this.props.inputHandler} value={prod.link} />
                        </label>
                        <label className="key_container">
                            <span className="key">prodClass</span>
                            <input type="text" className="card_input" placeholder="rec|new|hit|sale|disc" onChange={this.props.inputHandler} value={prod.prodClass} />
                        </label>
                        <label className="key_container">
                            <span className="key">attributes</span>
                            <textarea className="card_input" placeholder="ассоц. массив" onChange={this.props.inputHandler} value={JSON.stringify(prod.attributes, null, 4)}/>
                        </label>
                        <label className="key_container">
                            <span className="key">images</span>
                            <textarea className="card_input" placeholder="ссылки на изображения (массив)" onChange={this.props.inputHandler} value={JSON.stringify(prod.images, null, 4)}/>
                        </label>
                        <label className="key_container">
                            <span className="key">primaryProps</span>
                            <textarea className="card_input" placeholder="ассоц. массив" onChange={this.props.inputHandler} value={JSON.stringify(prod.primaryProps, null, 4)} />
                        </label>
                        <div className="infoBlock" data-subfolder="infoBlock">
                            <p>infoBlock</p>
                            <label className="key_container">
                                <span className="key">props</span>
                                <textarea className="card_input" placeholder="ассоц. массив" onChange={this.props.inputHandler} value={JSON.stringify(prod.infoBlock.props, null, 4)} />
                            </label>
                            <label className="key_container">
                                <span className="key">desc</span>
                                <textarea className="card_input" placeholder="описание для инфоблока" onChange={this.props.inputHandler} value={prod.infoBlock.desc} />
                            </label>
                            <label className="key_container">
                                <span className="key">advantages</span>
                                <textarea className="card_input" placeholder="описание преимуществ товара для инфоблока (массив)" onChange={this.props.inputHandler} value={JSON.stringify(prod.infoBlock.advantages, null, 4)} />
                            </label>
                            <label className="key_container">
                                <span className="key">appAreas</span>
                                <textarea className="card_input" placeholder="описание областей применения для инфоблока"onChange={this.props.inputHandler}  value={prod.infoBlock.appAreas} />
                            </label>
                            <label className="key_container">
                                <span className="key">video</span>
                                <textarea className="card_input" placeholder="ссылка на видеоматериал" onChange={this.props.inputHandler} value={prod.infoBlock.video} />
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
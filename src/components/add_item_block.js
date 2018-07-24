import React from 'react';

export default class AddItemBlock extends React.Component {
    submitOnEnterPress = (e) => {
        if(e.keyCode === 13) {
            e.currentTarget.parentElement.parentElement.querySelector(".btn.add_item").click();
        }
    }
    render() {
        let inputLabel;
        let btnTitle;
        let itemType = this.props.itemType;


        if(itemType === "subcat") {
            inputLabel = "Название новой подкатегории";
            btnTitle = "Добавить подкатегорию";
        } else if(itemType === "card") {
            inputLabel = "Название нового товара";
            btnTitle = "Добавить товар";
        } else if(itemType === "assoc_array_item") {
            btnTitle = "Добавить элемент";
        }

        return(
            <div className="add_item_block-wrap">
                {itemType !== "assoc_array_item" &&
                <label className="add_item_block-inner_wrap">{inputLabel}<input type="text" className="new_item_title" placeholder="Название" onKeyDown={(e) => this.submitOnEnterPress(e)} /></label>
                }
                <div className="add_item_block-inner_wrap">
                    <div className="btn add_item" onClick={(e) => {this.props.addItem(itemType, e)}}>
                        <span className="btn_icon plus">+</span>
                        <span className="btn_title">{btnTitle}</span>
                    </div>
                </div>
            </div>
        );
    }
};
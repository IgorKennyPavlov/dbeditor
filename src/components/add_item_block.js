import React from 'react';

function AddItemBlock(props) {
  let submitOnEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.currentTarget.parentElement.parentElement.querySelector(".btn.add_item").click();
    }
  }
  let inputLabel;
  let btnTitle;
  let itemType = props.itemType;

  if (itemType === "subcat") {
    inputLabel = "Название новой подкатегории";
    btnTitle = "Добавить подкатегорию";
  } else if (itemType === "card") {
    inputLabel = "Название нового товара";
    btnTitle = "Добавить товар";
  }

  return (
    <div className="add_item_block-wrap">
      <label className="add_item_block-inner_wrap">{inputLabel}
        <input type="text" className="new_item_title" placeholder="Название" onKeyDown={(e) => submitOnEnterPress(e)} />
      </label>
      <div className="add_item_block-inner_wrap">
        <div className="btn add_item" onClick={(e) => {props.addItem(itemType, e)}}>
          <span className="btn_icon plus">+</span>
          <span className="btn_title">{btnTitle}</span>
        </div>
      </div>
    </div>
  )
};

export default AddItemBlock;
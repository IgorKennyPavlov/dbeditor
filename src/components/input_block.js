import React from 'react';
import InputField from './input_field';

function InputBlock(props) {
  const itemType = props.itemType;
  const inputHandler = props.inputHandler;
  const populateBlock = data => {
    const content = [];
    data.forEach(item => {
      content.push(
        <InputField
          inputHandler={inputHandler}
          element={itemType}
          dataType={item[0]}
          DBKey={item[1]}
          placeholder={item[3]}
        />);
    })
    return content;
  }
  let inputFields;

  switch (itemType) {
    case 'category':
      inputFields =
        <div className='input_panel-wrap'>
          {populateBlock([
            ['text', 'title', 'название категории'],
            ['text', 'cardh1title', 'название товара (ед.ч.)'],
            ['textarea', 'link', 'ссылка на страницу категории'],
            ['textarea', 'metaTitle', 'метатег title'],
            ['textarea', 'metaDescription', 'метатег description'],
            ['textarea', 'priceList', 'ссылка на прайс-лист'],
            ['textarea', 'carouselLink', 'ссылка на БД товаров для карусели'],
            ['textarea', 'desc', 'описание категории']
          ])}
        </div>;
      break;
    case 'subcat':
      inputFields =
        <div className='input_panel-wrap'>
          {populateBlock([
            ['text', 'title', 'название подкатегории'],
            ['textarea', 'link', 'ссылка на страницу подкатегории'],
            ['textarea', 'metaTitle', 'метатег title'],
            ['textarea', 'metaDescription', 'метатег description'],
            ['textarea', 'carouselLink', 'ссылка на БД товаров для карусели'],
            ['textarea', 'desc', 'описание подкатегории']
          ])}
        </div>;
      break;
    case 'card':
      inputFields =
        <div className='input_panel-wrap'>
          {populateBlock([
            ['text', 'title', 'название товара'],
            ['textarea', 'link', 'ссылка на страницу товара'],
            ['textarea', 'metaTitle', 'метатег title'],
            ['textarea', 'metaDescription', 'метатег description'],
            ['text', 'article', 'артикул']
          ])}

          {
            props.radioName &&
            <InputField inputHandler={inputHandler} element={itemType} dataType='radio' DBKey='priceType' options={['range', 'fixed', 'none']} name={props.radioName} placeholder='описание категории' />
          }

          {populateBlock([
            ['textarea', 'carouselLink', 'ссылка на БД товаров для карусели'],
            ['textarea', 'prodClass', 'rec|new|hit|sale|disc'],
            ['array_a', 'attributes', 'ассоц. массив'],
            ['array_i', 'images', 'ссылки на изображения (массив)'],
            ['array_a', 'primaryProps', 'ассоц. массив']
          ])}
          <div className='infoBlock' data-subfolder='infoBlock'>
            <p>infoBlock</p>
            {populateBlock([
              ['array_a', 'props', 'ассоц. массив'],
              ['textarea', 'desc', 'описание для инфоблока'],
              ['array_i', 'advantages', 'описание преимуществ товара для инфоблока (массив)'],
              ['textarea', 'appAreas', 'описание областей применения для инфоблока'],
              ['textarea', 'feedback', 'отзывы (дата|имя|отзыв|дата|...)'],
              ['textarea', 'video', 'ссылка на видеоматериал']
            ])}
          </div>
        </div>;
      break;
    default:
      break;
  }

  return (
    <div className='input_panel'>
      {inputFields}
    </div>
  );
};

export default InputBlock;
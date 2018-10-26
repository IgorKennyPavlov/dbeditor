import React from 'react';
import InputField from './input_field';

function InputBlock(props) {
  const itemType = props.itemType;
  const inputHandler = props.inputHandler;
  let inputFields;
  switch (itemType) {
    case 'category':
      inputFields =
        <div className='input_panel-wrap'>
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='title' placeholder='название категории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='cardh1title' placeholder='название товара (ед.ч.)' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='link' placeholder='ссылка на страницу категории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='priceList' placeholder='ссылка на прайс-лист' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='carouselLink' placeholder='ссылка на БД товаров для карусели' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='desc' placeholder='описание категории' />
        </div>;
      break;
    case 'subcat':
      inputFields =
        <div className='input_panel-wrap'>
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='title' placeholder='название подкатегории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='link' placeholder='ссылка на страницу подкатегории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='carouselLink' placeholder='ссылка на БД товаров для карусели' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='desc' placeholder='описание подкатегории' />
        </div>;
      break;
    case 'card':
      inputFields =
        <div className='input_panel-wrap'>
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='title' placeholder='название товара' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='article' placeholder='артикул' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='metaTitle' placeholder='метатег title' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='metaDescription' placeholder='метатег description' />

          {
            props.radioName &&
            <InputField inputHandler={inputHandler} element={itemType} dataType='radio' DBKey='priceType' options={['range', 'fixed', 'none']} name={props.radioName} placeholder='описание категории' />
          }

          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='link' placeholder='ссылка на страницу товара' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='carouselLink' placeholder='ссылка на БД товаров для карусели' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='prodClass' placeholder='rec|new|hit|sale|disc' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='array_a' DBKey='attributes' placeholder='ассоц. массив' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='array_i' DBKey='images' placeholder='ссылки на изображения (массив)' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='array_a' DBKey='primaryProps' placeholder='ассоц. массив' />

          <div className='infoBlock' data-subfolder='infoBlock'>
            <p>infoBlock</p>
            <InputField inputHandler={inputHandler} element={itemType} dataType='array_a' DBKey='props' placeholder='ассоц. массив' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='desc' placeholder='описание для инфоблока' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='array_i' DBKey='advantages' placeholder='описание преимуществ товара для инфоблока (массив)' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='appAreas' placeholder='описание областей применения для инфоблока' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='feedback' placeholder='отзывы (дата|имя|отзыв|дата|...)' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='video' placeholder='ссылка на видеоматериал' />
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
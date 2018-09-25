import React from 'react';
import InputField from './input_field';

function InputBlock(props) {
  let inputFields;
  let data = props.data;
  let itemType = props.itemType;
  let inputHandler = props.inputHandler;
  switch (itemType) {
    case 'category':
      inputFields =
        <div className='input_panel-wrap'>
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='title' value={data.title ? data.title : ''} placeholder='название категории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='cardh1title' value={data.cardh1title ? data.cardh1title : ''} placeholder='название товара (ед.ч.)' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='link' value={data.link ? data.link : ''} placeholder='ссылка на страницу категории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='priceList' value={data.priceList ? data.priceList : ''} placeholder='ссылка на прайс-лист' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='carouselLink' value={data.carouselLink ? data.carouselLink : ''} placeholder='ссылка на БД товаров для карусели' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='desc' value={data.desc ? data.desc : ''} placeholder='описание категории' />
        </div>;
      break;
    case 'subcat':
      inputFields =
        <div className='input_panel-wrap'>
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='title' value={data.title ? data.title : ''} placeholder='название подкатегории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='link' value={data.link ? data.link : ''} placeholder='ссылка на страницу подкатегории' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='carouselLink' value={data.carouselLink ? data.carouselLink : ''} placeholder='ссылка на БД товаров для карусели' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='desc' value={data.desc ? data.desc : ''} placeholder='описание подкатегории' />
        </div>;
      break;
    case 'card':
      inputFields =
        <div className='input_panel-wrap'>
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='title' value={data.title ? data.title : ''} placeholder='название товара' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='text' DBKey='article' value={data.article ? data.article : ''} placeholder='артикул' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='metaTitle' value={data.metaTitle ? data.metaTitle : ''} placeholder='метатег title' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='metaDescription' value={data.metaDescription ? data.metaDescription : ''} placeholder='метатег description' />

          {
            data.priceList ? data.priceList : '' &&
            <InputField inputHandler={inputHandler} element={itemType} dataType='radio' DBKey='priceType' inputName={'priceType' + data.title ? data.title : ''} options={['range', 'fixed', 'none']} checked={data.priceType ? data.priceType : ''} placeholder='описание категории' />
          }

          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='link' value={data.link ? data.link : ''} placeholder='ссылка на страницу товара' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='carouselLink' value={data.carouselLink ? data.carouselLink : ''} placeholder='ссылка на БД товаров для карусели' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='prodClass' value={data.prodClass ? data.prodClass : ''} placeholder='rec|new|hit|sale|disc' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='array_a' DBKey='attributes' value={data.attributes ? data.attributes : ''} placeholder='ассоц. массив' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='array_i' DBKey='images' value={data.images ? data.images : ''} placeholder='ссылки на изображения (массив)' />
          <InputField inputHandler={inputHandler} element={itemType} dataType='array_a' DBKey='primaryProps' value={data.primaryProps ? data.primaryProps : ''} placeholder='ассоц. массив' />

          <div className='infoBlock' data-subfolder='infoBlock'>
            <p>infoBlock</p>
            <InputField inputHandler={inputHandler} element={itemType} dataType='array_a' DBKey='props' value={data.infoBlock.props ? data.infoBlock.props : ''} placeholder='ассоц. массив' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='desc' value={data.infoBlock.desc ? data.infoBlock.desc : ''} placeholder='описание для инфоблока' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='array_i' DBKey='advantages' value={data.infoBlock.advantages ? data.infoBlock.advantages : ''} placeholder='описание преимуществ товара для инфоблока (массив)' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='appAreas' value={data.infoBlock.appAreas ? data.infoBlock.appAreas : ''} placeholder='описание областей применения для инфоблока' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='feedback' value={data.infoBlock.feedback ? data.infoBlock.feedback : ''} placeholder='отзывы (дата|имя|отзыв|дата|...)' />
            <InputField inputHandler={inputHandler} element={itemType} dataType='textarea' DBKey='video' value={data.infoBlock.video ? data.infoBlock.video : ''} placeholder='ссылка на видеоматериал' />
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
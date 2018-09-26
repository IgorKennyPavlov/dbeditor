import React from 'react';

function InputField(props) {

  const jsonDecode = val => {
    if (val === Object(val)) {
      val = JSON.stringify(val, null, 2);
      val = val.replace(/(\{|\[)\n?|\n?(\}|\])/gm, '');
      val = val.replace(/^( |\t)*"/gm, '');
      val = val.replace(/": "/gm, '\t');
      val = val.replace(/",?$/gm, '');
    }
    return val
  }

  const unfoldTextarea = e => {
    if (e.currentTarget.scrollHeight) {
      e.currentTarget.style.height = "";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    }
  }
  const foldTextarea = e => {
    e.currentTarget.style.height = "100px";
  }

  let key_container;
  let DBKey = props.DBKey;
  let element = props.element;
  let placeholder = props.placeholder;
  let inputHandler = props.inputHandler;
  let value = props.value;

  switch (props.dataType) {
    case 'text':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <input type='text' className={element + '_input'} placeholder={placeholder} onChange={inputHandler} value={value} />
        </label>;
      break;

    case 'textarea':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <textarea className={element + '_input'} placeholder={placeholder} onFocus={unfoldTextarea} onChange={e => {unfoldTextarea(e); inputHandler(e);}} onBlur={foldTextarea} value={value} />
        </label>;
      break;

    case 'array_i':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <textarea className={element + '_input'} placeholder={placeholder} onChange={inputHandler} value={jsonDecode(value)} data-input-type='array_i' />
        </label>;
      break;

    case 'array_a':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <textarea className={element + '_input'} placeholder={placeholder} onChange={inputHandler} value={jsonDecode(value)} data-input-type='array_a' />
        </label>;
      break;

    case 'radio':
      let options = [];
      for (let option in props.options) {
        options.push(
          <label>
            <input type='radio' name={props.inputName} className={element + '_input'} onChange={inputHandler} value={option} defaultChecked={option === props.checked} />
            <span>{option}</span>
          </label>
        );
      }
      key_container =
        <div className='key_container input_panel-subsection col'>
          <span className='db_key'>{DBKey}</span>
          <div className='input_panel-subsection'>
            {options}
          </div>
        </div>;
      break;

    default:
      break;
  }

  return key_container;
}

export default InputField;
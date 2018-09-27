import React from 'react';

function InputField(props) {

  let key_container;
  let DBKey = props.DBKey;
  let elType = props.element;
  let placeholder = props.placeholder;
  let inputHandler = props.inputHandler;

  const insertTab = e => {
    if(e.keyCode === 9) {
      e.preventDefault();
      let pos = e.currentTarget.selectionStart;
      let val = e.currentTarget.value;
      e.currentTarget.value = val.substr(0, pos)+'\t'+val.substr(pos);
    }
  }

  const unfoldTextarea = e => {
    if (e.currentTarget.scrollHeight) {
      e.currentTarget.style.height = "";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    }
  }
  const foldTextarea = e => {
    e.currentTarget.style.height = "70px";
  }

  switch (props.dataType) {
    case 'text':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <input type='text' className='input' placeholder={placeholder} onBlur={inputHandler} data-elem-type={elType} />
        </label>;
      break;

    case 'textarea':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <textarea className='input' placeholder={placeholder} onFocus={unfoldTextarea} onBlur={e => {foldTextarea(e); inputHandler(e);}} data-elem-type={elType} />
        </label>;
      break;

    case 'array_i':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <textarea className='input' placeholder={placeholder} onFocus={unfoldTextarea} onBlur={e => {foldTextarea(e); inputHandler(e);}} data-data-type='array_i' data-elem-type={elType} />
        </label>;
      break;

    case 'array_a':
      key_container =
        <label className='key_container'>
          <span className='db_key'>{DBKey}</span>
          <textarea className='input' placeholder={placeholder} onFocus={unfoldTextarea} onBlur={e => {foldTextarea(e); inputHandler(e);}} onKeyDown={insertTab} data-data-type='array_a' data-elem-type={elType} />
        </label>;
      break;

    case 'radio':
      let options = [];
      for (let option of props.options) {
        options.push(
          <label>
            <input type='radio' name={DBKey+props.name} className='input' onChange={inputHandler} value={option} data-elem-type={elType} />
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
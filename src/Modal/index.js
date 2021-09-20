import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './style.css';

const propTypes = { children: PropTypes.element, onClose: PropTypes.func };

function Modal(props) {
  const { children, onClose } = props;
  const [inProp, setInProp] = useState(true);

  return (
    <CSSTransition in={inProp} timeout={300} appear classNames="tc-modal-fade">
      <div className="tc-modal-wrap">
        <div
          className="tc-modal-close-btn"
          onClick={() => {
            setInProp(false);
            setTimeout(() => {
              onClose();
            }, 300);
          }}
        >
          ×
        </div>
        <div className="tc-modal-content">{children}</div>
      </div>
    </CSSTransition>
  );
}

Modal.propTypes = propTypes;

export default Modal;

let div = null;

export function openModal(children) {
  if (div) {
    throw new Error('已存在弹层实例');
  }

  div = document.createElement('div');
  document.body.appendChild(div);

  const onClose = () => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    div = null;
  };

  ReactDOM.render(<Modal onClose={onClose}>{children}</Modal>, div);

  return () => onClose();
}

// 用法：
// openModal(
// 		<img
// 			src={weappQrcode}
// 			alt="小程序二维码"
// 		/>
// )

import React from 'react';

import './style.css';

function Tips(props) {
  const { children = '暂无数据' } = props;

  return <div className="tc-tips">{children}</div>;
}

export default Tips;

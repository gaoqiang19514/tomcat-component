import React from 'react';

import styles from './style.scss';

function Tips(props) {
  const { children = '暂无数据' } = props;

  return <div className={styles.tips}>{children}</div>;
}

export default Tips;

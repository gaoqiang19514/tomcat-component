import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Zinfo } from 'zerod';

import { getConfig } from './config';

const propTypes = {
  id: PropTypes.number,
};

function DetailPage(props) {
  const { id } = props;

  const [fieldValue, setFieldValue] = useState({});

  useEffect(() => {
    setFieldValue({
      serviceCode: 123,
      serviceName: '测试数据',
    });
  }, [id]);

  return (
    <div className="z-panel is-panel-border z-margin-20">
      <div className="z-panel-heading">详情</div>
      <div className="z-panel-body">
        <Zinfo {...getConfig()} fieldValue={fieldValue} />
      </div>
    </div>
  );
}

DetailPage.propTypes = propTypes;

export default DetailPage;

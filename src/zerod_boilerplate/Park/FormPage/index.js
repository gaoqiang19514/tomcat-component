import React from 'react';
import PropTypes from 'prop-types';
import { Zform } from 'zerod';

import { getTitleByType, getConfig } from './config';

const propTypes = {
  type: PropTypes.string,
  record: PropTypes.object,
  onDone: PropTypes.func,
};

const defaultProps = {
  record: {},
  onDone: () => {},
};

function FormPage(props) {
  const { type, record, onDone } = props;

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      onDone();
      resolve();
    });
  };

  return (
    <div className="z-panel is-panel-border z-margin-20">
      <div className="z-panel-heading">{getTitleByType(type)}</div>
      <div className="z-panel-body">
        <Zform {...getConfig({ record })} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

FormPage.propTypes = propTypes;
FormPage.defaultProps = defaultProps;

export default FormPage;

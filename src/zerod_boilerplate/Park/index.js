import React from 'react';
import { ZlistPanel } from 'zerod';

import { getFormConfig, getListConfig } from './config';

function List() {
  const onBatchImport = () => {};
  return (
    <div className="z-margin-20">
      <ZlistPanel
        searchForm={getFormConfig()}
        {...getListConfig({ onBatchImport })}
      />
    </div>
  );
}

export default List;

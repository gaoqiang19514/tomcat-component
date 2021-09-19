import React from 'react';
import { Input, Button } from 'antd';

import FormPage from './FormPage';
import DetailPage from './DetailPage';

export function getFormConfig() {
  return {
    labelLayout: 'inline',
    items: [
      {
        key: 'name',
        label: '名称',
        render: () => <Input />,
      },
    ],
  };
}

/**
 * 给列表请求的响应数据添加serial字段，以便在分页情况下展示累加的序号
 * @param {Object} res
 * @returns {Object}
 */
export function addSerialToEveryItem(res) {
  const currPage = res?.data?.currPage - 1;
  const pageSize = res?.data?.pageSize;

  const totalStart = currPage * pageSize;

  if (res?.data?.list?.length) {
    res.data.list = res.data.list.map((item, index) => ({
      ...item,
      serial: totalStart + index + 1,
    }));
  }

  return res;
}

const Api = {
  list: () => {
    return new Promise((resolve) => {
      resolve({
        code: 0,
        msg: 'TradeOK',
        data: {
          totalCount: 1,
          pageSize: 10,
          totalPage: 1,
          currPage: 1,
          list: [
            {
              id: 82,
              name: '测试',
            },
          ],
        },
      });
    });
  },
  del: () => {},
};

export function getListConfig({ onBatchImport }) {
  return {
    tableColumns: [
      {
        title: '序号',
        dataIndex: 'serial',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
    ],
    listType: 'table',
    showPagination: true,
    paginationType: 'paging',
    panelHeader: {
      right: () => (
        <Button type="primary" onClick={onBatchImport}>
          导出
        </Button>
      ),
    },
    listApiInterface: (query) => Api.list(query).then(addSerialToEveryItem),
    deleteApiInterface: ({ id }) => Api.del({ id }),
    detailPageRender: ({ id }) => <DetailPage id={id} />,
    addPageRender: (tool) => (
      <FormPage
        type="add"
        onDone={() => {
          tool.getListData();
          tool.showRightModal();
        }}
      />
    ),
    updatePageRender: (record, tool) => (
      <FormPage
        type="update"
        record={record}
        onDone={() => {
          tool.getListData();
          tool.showRightModal();
        }}
      />
    ),
  };
}

import React from 'react';
import { Input } from 'antd';

export function getTitleByType(type) {
  if (type === 'add') {
    return '新增';
  }

  if (type === 'update') {
    return '修改';
  }

  return '';
}

const baseRules = [
  {
    required: true,
    message: '必填项',
  },
];

export function getConfig({ record, onSubmit }) {
  return {
    defaultSpan: 24,
    submitBtnName: '提交',
    labelLayout: 'horizontal',
    onSubmit,
    items: [
      {
        key: 'name',
        label: '名称',
        render: () => <Input />,
        options: {
          initialValue: record.name,
          rules: [...baseRules],
        },
      },
    ],
  };
}

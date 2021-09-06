import React, { Component } from 'react';
import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import { Loading, ActivityIndicator } from 'zarm';

import styles from './style.scss';

import Tips from '../Tips';

BScroll.use(Pullup);

const PAGE_SIZE = 10;

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      data: [],
      hasMore: true,
      isEmpty: false,
      isPullUpLoad: true,
    };

    this.bs = null;
  }

  componentDidMount() {
    this.bs = new BScroll('#infinite-scroll-wrapper', {
      pullUpLoad: true,
      click: true,
    });

    this.bs.on('pullingUp', this.loadData);
    this.bs.autoPullUpLoad();
  }

  requestData = () => {
    const { api } = this.props;
    const { page } = this.state;

    return api({ currPage: page, pageSize: PAGE_SIZE }).then((res) => {
      const list = res?.data?.list;
      const totalPage = res?.data?.totalPage;

      if (!list?.length) {
        this.setState({
          isEmpty: true,
        });
        return;
      }

      this.setState((state) => ({
        page: state.page + 1,
        hasMore: page < totalPage,
        data: [...state.data, ...list],
      }));
    });
  };

  loadData = async () => {
    const { hasMore } = this.state;

    if (!hasMore) {
      return;
    }

    this.setState({
      isPullUpLoad: true,
    });

    Loading.show({
      content: <ActivityIndicator size="lg" />,
    });

    await this.requestData();
    this.bs.finishPullUp();
    this.bs.refresh();

    this.setState({
      isPullUpLoad: false,
    });

    setTimeout(() => {
      Loading.hide();
    }, 300);
  };

  render() {
    const { itemRender } = this.props;
    const { data, hasMore, isEmpty } = this.state;

    return (
      <div id="infinite-scroll-wrapper" className={styles.wrapper}>
        <div>
          {data.map((item) => itemRender(item))}
          {!hasMore && <Tips>没有更多了</Tips>}
          {isEmpty && <Tips>暂无数据</Tips>}
        </div>
      </div>
    );
  }
}

export default InfiniteScroll;

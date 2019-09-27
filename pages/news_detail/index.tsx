import React from "react"
import { Carousel } from 'antd';
import Router from 'next/router'
import classNames from 'classnames'
import HOST from '../../utils/api';
import './index.less'

class Index extends React.PureComponent<{}, {}, any> {
  state: any = {
    id: 0,
    newsList: [],
    typeTitle: '',
    currentNewsPageIndex: 0,
    newsLoadFinish: false,
    newsDetail: {},
    newsNext: {},
    newsPrev: {},
    limit: 20,
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  loadNewsList(pageNoIndex = 0) {
    const limit = this.state.limit
    const offset = pageNoIndex * limit

    window.fetch(`${HOST}/api/news?type_title=${this.state.typeTitle}&limit=${limit}&offset=${offset}`, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data) {
        this.setState({
          newsList: this.state.newsList.concat([data.data]),
          currentNewsPageIndex: pageNoIndex,
          newsLoadFinish: data.paging.total <= (offset + data.data.length)
        })
      } else {
        console.error(data.msg)
      }
    }, (error) => {
      console.error(error)
    })
  }

  swichPage(type) {
    console.log(type)
    if (type == -1) {
      this.setState({
        currentNewsPageIndex: Math.max(this.state.currentNewsPageIndex - 1, 0),
      })
      return
    }
    if (!this.state.newsList[this.state.currentNewsPageIndex + 1] || !this.state.newsList[this.state.currentNewsPageIndex + 1].length) {
      if (this.state.newsLoadFinish) return;
      this.loadNewsList(this.state.currentNewsPageIndex + 1)
    } else {
      this.setState({
        currentNewsPageIndex: this.state.currentNewsPageIndex + 1,
      })
    }
  }

  loadNewsDetail() {
    window.fetch(`${HOST}/api/news/detail?id=${this.state.id}`, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
        newsDetail: data.data,
        newsNext: data.next,
        newsPrev: data.prve,
      })
      console.error(data.msg)
    }, (error) => {
      console.error(error)
    })
  }

  redirectNews(item) {
    if (item.id === this.state.id) return
    if (item.link) {
      window.open(item.link)
      return
    }
    Router.push(`/news_detail?id=${item.id}&type_title=${item.type_title}`)
    document.documentElement.scrollTop = document.body.scrollTop = 0
    this.init()
  }

  init() {
    this.setState({
      id: 0,
      newsList: [],
      typeTitle: '',
      currentNewsPageIndex: 0,
      newsLoadFinish: false,
      newsDetail: {},
      newsNext: {},
      newsPrev: {},
    })
    const callback = () => {
      this.loadNewsList()
      this.loadNewsDetail()
    }

    setTimeout(() => {
      const query = Router.router && Router.router.query;
      this.setState({
        id: query && query.id,
        typeTitle: query && query.type_title,
      }, () => {
        console.log(this.state.id, this.state.typeTitle)
        callback()
      })
    }, 0);
  }

  componentDidMount() {
    this.init()
  }

  public render() {
    return (
      <div>
        <div className="index-container">
          <Carousel afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/home/banner1.png"></img>
          </Carousel>
        </div>

        <div className="index-container">
          <div className="container">
            <div className="news_detail-container">
              <div className="news_detail-left-box">
                <p className="news_detail-list-title">{this.state.typeTitle}</p>
                <div className="news_detail-list">
                  {this.state.newsList[this.state.currentNewsPageIndex] && this.state.newsList[this.state.currentNewsPageIndex].map((item: any, index) => {
                    return <p className={classNames(['news_detail-list-item', { active: item.id == this.state.id }])} key={index} onClick={this.redirectNews.bind(this, item)}> {this.state.currentNewsPageIndex * this.state.limit + (index + 1)}、{item.title} </p>
                  })}
                </div>
                <div className="news_detail-list_footer">
                  <img onClick={this.swichPage.bind(this, -1)} className="news-prev-list" src="/static/news_detail/news_paginator.png" alt=""/>
                  <span>查看更多</span>
                  <img onClick={this.swichPage.bind(this, 1)} className="news-next-list" src="/static/news_detail/news_paginator.png" alt="" />
                </div>
              </div>
              <div className="news_detail-right-box">
                <div className="news_detail-title">{this.state.newsDetail.title}</div>
                <div className="news_detail-time">{this.state.newsDetail.create_time}</div>
                <div className="news_detail-body" dangerouslySetInnerHTML={{ __html: this.state.newsDetail.contents }}></div>
                <div className="news_detail-footer">
                  <div className="news_detail-back" onClick={() => { Router.push('/'); document.documentElement.scrollTop = document.body.scrollTop = 0;}}><img src="/static/news_detail/news_back.png" alt="" />返回</div>
                  <div className="news_detail-footer-list">
                    {this.state.newsPrev.title ? <div className="news_detail-footer-item overflow-hidden" onClick={this.redirectNews.bind(this, this.state.newsPrev)}>上一篇：<span>{this.state.newsPrev.title}</span></div> : ''}
                    {this.state.newsNext.title ? <div className="news_detail-footer-item overflow-hidden" onClick={this.redirectNews.bind(this, this.state.newsNext)}>下一篇：<span>{this.state.newsNext.title}</span></div> : ''}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index

import React from 'react'
import Head from 'next/head'
import { Provider, connect } from 'react-redux'
import App, { Container } from 'next/app'
import Router from 'next/router'
import classNames from 'classnames'
import style from './layout.less'
import _style from '@/global.less'
import store from '@/store'
import 'babel-polyfill'

class Layout extends React.Component {
  state = {
    navItems: [
      { name: '首页', desc: 'PORTAL', path: 'index' },
      { name: '产品介绍', desc: 'PRODUCT', path: 'product' },
      { name: '招商加盟', desc: 'JOIN IN', path: 'join' },
      { name: '关于我们', desc: 'ABOUT US', path: 'about' },
    ],
    currentPath: '',
  }

  componentDidMount() {
    const currentPath = Router && Router.router && Router.router.asPath
    if (currentPath === this.state.currentPath) return
    currentPath && (this.setState({ currentPath }))
  }

  componentWillUnmount() {

  }

  to(path) {
    document.documentElement.scrollTop = document.body.scrollTop = 0
    Router.push(`/${path}`)
  }

  componentDidUpdate() {
    const currentPath = Router && Router.router && Router.router.asPath
    if (currentPath === this.state.currentPath) return
    currentPath && (this.setState({ currentPath }))
  }

  render () {
    const { children } = this.props
    const { navItems, currentPath } = this.state

    return (<div className={classNames(style.layout, {active: this.state.isLoaded})}>
      <Head>
        <title>小步留学官网</title>
        <link rel="shortcut icon" type="image/x-icon" href="./static/favicon.ico"></link>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,maximum-scale=2" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <link rel="stylesheet" href="//sources.leke.com/resources/animate.min.css" />
      </Head>
      <nav className="nav-container">
        <div className="container">
          <img className="nav-logo" src="/static/home/logo.png"></img>
          <div className="nav-menu">
            {navItems.map((item, index) => {
              return (<div key={index} className={classNames('nav-menu_item', { active: currentPath.includes(item.path) })} onClick={this.to.bind(this, item.path)}>
                <span className="title">{item.name}</span>
                <span className="desc">{item.desc}</span>
              </div>)
            })}
          </div>
        </div>
      </nav>
      {this.props.children}
      <section className="footer-container">
        <div className="container">
          <div className="footer-list">
            <p className="title">首页</p>
          </div>
          <div className="footer-list">
            <p className="title">产品介绍</p>
            <p className="item">线上学习系统</p>
            <p className="item">五级闯关制</p>
            <p className="item">心流理论</p>
            <p className="item">线下学习中心</p>
            <p className="item">学管师角色</p>
          </div>
          <div className="footer-list">
            <p className="title">招商加盟</p>
            <p className="item">我们的优势</p>
            <p className="item">门店采访</p>
            <p className="item">加盟案例</p>
            <p className="item">加盟支持</p>
            <p className="item">加盟店分布图</p>
            <p className="item">咨询留言</p>
          </div>
          <div className="footer-list">
            <p className="title">联系我们</p>
            <p className="item">公司介绍</p>
            <p className="item">团队介绍</p>
            <p className="item">投资人介绍</p>
            <p className="item">联系我们</p>
          </div>
          <div className="footer-list">
            <img className="qrcode" src="/static/home/qrcode.jpg"></img>
            <p className="item">扫一扫，了解更多加盟动态！</p>
          </div>
        </div>
        <footer className="footer-copyright container">
          <p className="detail">Copyright © 2018 hangzhou astap smart leanning Tech co.,ltd. 保留所有权利。</p>
          <p className="detail">浙公安网安备 11010502008968 浙ICP备10214630  营业执照</p>
        </footer>
      </section>
    </div>)
  }
}

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    )
  }
}

export default MyApp

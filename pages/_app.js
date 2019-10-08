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
import { Affix, Input, Button } from 'antd';
import HOST from '@/utils/api';
import mobileDetect from 'ismobilejs'
import { scrollToAnchor } from '@/utils/anchor'


const telRegx = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/


class Layout extends React.Component {
  mail = ''
  area= ''
  phone= ''

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
    this.getAnchor()
    console.log('mounted app')
    require('whatwg-fetch')
    this.setState({
      isMobile: mobileDetect(window.navigator.userAgent).any,
    })
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

  getAnchor() {
    scrollToAnchor(location.hash.slice(1))
  }

  componentDidUpdate() {
    this.getAnchor()
    let currentPath = Router && Router.router && Router.router.asPath
    currentPath = currentPath === '/' ? '/index' : currentPath
    if (currentPath === this.state.currentPath) return
    currentPath && (this.setState({ currentPath }))
  }

  emptyCheck() {
    if (!this.mail.state.value || !this.phone.state.value || !this.area.state.value) {
      alert('请填写个人信息')
      return;
    }
    if (!telRegx.test(this.phone.state.value)) {
      alert('手机格式不正确')
      return;
    }
    return true;
  }

  submit() {
    console.log(this.mail.state.value, this.phone.state.value, this.area.state.value)
    if (!this.emptyCheck()) return

    const formData = new FormData();
    formData.append('name', this.mail.state.value)
    formData.append('phone', this.phone.state.value)
    formData.append('area', this.area.state.value)


    window.fetch(`${HOST}/api/join`, {
      method: 'POST',
      body: formData,
      headers: {
        // "Accept": "application/json",
        // "Content-Type": "application/json;charset=UTF-8",
        // "Content-Type": "multipart/form-data"
      },
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.success) {
        alert('提交成功')
        return;
      }
      alert(data.message)
    }, (error) => {
      console.error(error)
      alert('提交失败')
    })
  }

  render () {
    const { children } = this.props
    const { navItems, currentPath, isMobile } = this.state
    let navBgImgName = ''
    console.log(currentPath)
    if (currentPath.includes('/product')) {
      navBgImgName = 'product';
    } else if (currentPath.includes('/about')) {
      navBgImgName = 'about';
    } else if (currentPath.includes('/join')) {
      navBgImgName = 'join';
    } else if (currentPath.includes('/index') || currentPath.includes('/')) {
      navBgImgName = 'home';
    } else {
      navBgImgName = 'home';
    }
    const navBg = isMobile ? {
      backgroundImage: `url('/static/${navBgImgName}/${navBgImgName}_top.png')`
    }: {}

    return (<div className={classNames(style.layout, {active: this.state.isLoaded})}>
      <Head>
        <title>小步智学官网-每天进步一小步 中小学自适应学习 智能学习 提分利器</title>
        <link rel="shortcut icon" type="image/x-icon" href="./static/favicon.ico"></link>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,maximum-scale=2" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <link rel="stylesheet" href="/static/animate.min.css" />
        <script src="/static/echarts.min.js"></script>
      </Head>
      <nav className="nav-container" style={navBg}>
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

      <section className="side-bar">
        <div className="side-bar_item">
          <div className="side-bar_icon">
            <img src="/static/home/phone.png"></img>
          </div>
          <div className="side-bar_content">
            <div className="contact-way">咨询<br/>电话</div>
            <div className="contact-number">155<br/>05882806</div>
          </div>
        </div>
        <div className="side-bar_item">
          <div className="side-bar_icon">
            <img src="/static/home/qq.png"></img>
          </div>
          <div className="side-bar_content">
            <div className="contact-way">咨询<br/>Q Q</div>
            <div className="contact-number">15<br/>20927740</div>
          </div>
        </div>
      </section>

      <section className="side-bar_mobile">
        <div className="side-bar_item">
          <div className="side-bar_icon">
            <img src="/static/home/phone.png"></img>联系小步
          </div>
          <div className="side-bar_content">
            {/* <div className="contact-way"></div> */}
            <div className="contact-number">15505882806</div>
          </div>
        </div>
        <div className="side-bar_item">
          <div className="side-bar_icon">
            <img src="/static/home/qq.png"></img>咨询QQ
          </div>
          <div className="side-bar_content">
            {/* <div className="contact-way"></div> */}
            <div className="contact-number">1520927740</div>
          </div>
        </div>
      </section>

      {this.props.children}
      <section className="footer-container">
        <Affix offsetBottom={0}>
          <div className="form-affix_container">
            <div className="container form-body">
              <span className="text" style={{flex: 1}}>加盟预约</span>
              <Input style={{flex: 1, margin: '0 20px',}} ref={input => this.mail = input} placeholder="您的称呼" allowClear/>
              <Input maxLength={11} style={{ flex: 1, margin: '0 20px', }} ref={input => this.phone = input} placeholder="预约手机号" allowClear/>
              <Input style={{flex: 1, margin: '0 20px',}} ref={input => this.area = input} placeholder="加盟地区" allowClear/>
              <Button style={{flex: 1, margin: '0 30px',}} ghost onClick={this.submit.bind(this)}>提交信息</Button>
            </div>
          </div>
        </Affix>
        <div className="container">
          <div className="footer-list">
            <p className="title" onClick={this.to.bind(this, 'index')}>首页</p>
          </div>
          <div className="footer-list">
            <p className="title" onClick={this.to.bind(this, 'product')}>产品介绍</p>
            <p className="item" onClick={this.to.bind(this, 'product#online')}>线上学习系统</p>
            <p className="item" onClick={this.to.bind(this, 'product#chuangguan')}>五级闯关制</p>
            <p className="item" onClick={this.to.bind(this, 'product#xinliu')}>心流理论</p>
            <p className="item" onClick={this.to.bind(this, 'product#offline')}>线下学习中心</p>
            <p className="item" onClick={this.to.bind(this, 'product#xueguan')}>学管师角色</p>
          </div>
          <div className="footer-list" >
            <p className="title" onClick={this.to.bind(this, 'join')}>招商加盟</p>
            <p className="item" onClick={this.to.bind(this, 'join#advance')}>我们的优势</p>
            <p className="item" onClick={this.to.bind(this, 'join#store')}>门店采访</p>
            <p className="item" onClick={this.to.bind(this, 'join#examples')}>加盟案例</p>
            <p className="item" onClick={this.to.bind(this, 'join#support')}>加盟支持</p>
            <p className="item" onClick={this.to.bind(this, 'join#map')}>加盟店分布图</p>
            <p className="item" onClick={this.to.bind(this, 'join#advice')}>咨询留言</p>
          </div>
          <div className="footer-list">
            <p className="title" onClick={this.to.bind(this, 'about')}>联系我们</p>
            <p className="item" onClick={this.to.bind(this, 'about#company')}>公司介绍</p>
            <p className="item" onClick={this.to.bind(this, 'about#team')}>团队介绍</p>
            <p className="item" onClick={this.to.bind(this, 'about#people')}>投资人介绍</p>
            <p className="item" onClick={this.to.bind(this, 'about#contact')}>联系我们</p>
          </div>
          <div className="footer-list">
            <img className="qrcode" src="/static/home/qrcode.jpg"></img>
            <p className="item">扫一扫，了解更多加盟动态！</p>
          </div>
        </div>
        <footer className="footer-copyright container">
          <p className="detail">Copyright © 2019 杭州小步智学教育科技有限公司 Hangzhou Xiao Bu Zhi Xue Education Technology Co.,Ltd</p>
          <p className="detail">浙ICP备10214630</p>
        </footer>
      </section>
    </div>)
  }
}

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default MyApp

import React from "react"
import { Carousel } from 'antd';
import classNames from 'classnames'
import Head from 'next/head'

class Product extends React.PureComponent<{}, {}, any> {
  state: any = {
    onlineSystem: [
      { img: '/static/product/online_banner.png', title: '适用学生', desc: '小学生、初中生', add: '' },
      { img: '/static/product/online_banner.png', title: '适用科目', desc: '数学、英语、物理、化学、语文', add: '' },
      { img: '/static/product/online_banner.png', title: '适用教材', desc: '已覆盖全国大部分教材', add: '（包含教材知识点的各类题型题库和错题解析视频）' },
      { img: '/static/product/online_banner.png', title: '学习时间', desc: '每天30-40分钟高效学习', add: '（效率提升3-5倍）' }
    ],
    onlineSystemIndex: 0,
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  componentDidMount() {
  }

  public render() {
    return (
      <div>
        <Head>
          <script src="//sources.leke.com/resources/echarts.min.js"></script>
        </Head>
        <div className="index-container about-container">
          <Carousel autoplay afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/product/banner1.png"></img>
            <img className="banner" src="/static/product/banner2.png"></img>
            <img className="banner" src="/static/product/banner3.png"></img>
            <img className="banner" src="/static/product/banner4.png"></img>
          </Carousel>
          <div style={{height: '550px'}} className="gray-empty-block bg-gray">
          </div>
        </div>

        <div className="index-container about-container pb-100">
          <div className="container" style={{marginTop: '-480px'}}>
            <img style={{ height: '180px', zIndex: 5, position: 'relative' }} src="/static/product/online.png" alt="" />
            <div className="online-system">
              <div className="online-system_left">
                <img src={this.state.onlineSystem[this.state.onlineSystemIndex].img} alt=""/>
              </div>
              <div className="online-system_right">
                {this.state.onlineSystem.map((item:any, index:number) => {
                  return (
                    <div key={index} className={classNames('item', {active: index === this.state.onlineSystemIndex})} onClick={() => { this.setState({ onlineSystemIndex: index })}}>
                      <div className="item_title">{item.title}</div>
                      <div className="item_desc">{item.desc}</div>
                      <div className="item_add">{item.add}</div>
                      <img className="shape_side" src="/static/product/shape_side.png"></img>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="index-container about-container">
          <img style={{ width: '100%' }} className="banner" src="/static/product/computer.png" alt="" />
        </div>

        <div className="index-container about-container pb-100" style={{marginTop: '-90px'}}>
          <div className="container" >
            <img style={{height: '180px'}} src="/static/product/comment.png" alt=""/>
            <div style={{ borderBottom: '24px solid #d7d7d7', fontSize: '50px', color: '#585858', lineHeight: '30px', marginTop: '90px', width: '550px', display: 'inline-block'}}>传统教培机构的评价误区</div>
            <img style={{ width: '100%', marginTop: '40px' }} src="/static/product/question.png" alt="" />
          </div>
        </div>
        <div className="index-container about-container pb-100" style={{ marginTop: '-90px' }}>
          <img style={{ width: '100%', height: '300px', marginTop: '40px' }} className="banner" src="/static/product/middle_banner.png" alt="" />
          <div className="container" >
            <img style={{ width: '100%', marginTop: '10px' }} src="/static/product/qinghua.png" alt="" />
          </div>
        </div>

        <div className="product-container index-container about-container pb-100 pt-100">
          <div className="other-bg-block"></div>
          <div className="container" >

            <div className="improve-ways">
              <div className="left-box">
                <div className="improve-ways_title">融入国际心流理论，<br/>游戏化通关<br />挑战更高学习目标</div>
                <div className="improve-ways_desc">游戏化闯关过程中，<br/>学生不知不觉进入“心流”通道，<br/>形成高度专注的学习状态，<br/>不断增强技能水平，<br/>增加挑战感，越学越想学，<br/>从而使学生达成更高目标。</div>
              </div>

              <div className="right-box">
                <img className="improve-chart" src="/static/product/improve.png" alt=""/>
              </div>
            </div>
          </div>
        </div>

        <div className="index-container about-container" style={{paddingTop: '80px', paddingBottom: '80px'}}>
          <div className="container" >
            <img style={{ width: '800px' }} src="/static/product/chuangguan.png" alt="" />
          </div>
        </div>


        <div className="index-container about-container bg-gray pb-100 pt-100">
          <div className="container" >
            <img style={{ height: '180px', zIndex: 5, position: 'relative' }} src="/static/product/offline.png" alt="" />
            <img style={{ width: '100%', marginTop: '-90px' }} src="/static/product/environment.png" alt=""/>
          </div>
        </div>

        <div className="index-container about-container" style={{ paddingTop: '60px', paddingBottom: '60px', background: '#00a7e1' }}>
          <div className="container" >
            <img style={{ height: '170px' }} src="/static/product/adapt_study.png" alt="" />
            <p style={{color: 'white', fontSize: '26px', marginTop: '30px', marginBottom: '30px'}}>五大产品功能，打通学生提升通道的“任督二脉”</p>

            <div className="base-menu-container">
              <ul className="base-menu_list">
                <li className="base-menu_item"></li>
                <li className="base-menu_item"></li>
                <li className="base-menu_item"></li>
                <li className="base-menu_item"></li>
                <li className="base-menu_item"></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="index-container about-container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container" >
            <div className="bordered-title">遇见小步智学，<br/>遇见比你想象中更好的自己</div>
          </div>
        </div>

      </div>
    )
  }
}

export default Product

import React from "react"
import { Carousel } from 'antd'
import classNames from 'classnames'
import { optionData } from '@/utils/echart-data.js'
import mobileDetect from 'ismobilejs'
import HOST from '../../utils/api';

const hoverdIcon = [
  '/static/product/hover_tv.png',
  '/static/product/hover_star.png',
  '/static/product/hover_book.png',
  '/static/product/hover_game.png',
  '/static/product/hover_ring.png',
]

class Product extends React.PureComponent<{}, {}, any> {
  intervalId: any = 0
  setCarouselRef:any = null
  carouselRef:any = null

  constructor(props: any) {
    super(props)
    this.setCarouselRef = (el: any) => {
      this.carouselRef = el
    }
  }

  state: any = {
    onlineSystem: [
      { img: '/static/product/online_banner.png', title: '适用学生', desc: '小学生、初中生', add: '' },
      { img: '/static/product/subject.jpg', title: '适用科目', desc: '数学、英语、物理、化学、语文', add: '' },
      { img: '/static/product/material.jpg', title: '适用教材', desc: '已覆盖全国大部分教材', add: '（包含教材知识点的各类题型题库和错题解析视频）' },
      { img: '/static/product/time.jpg', title: '学习时间', desc: '每天30-40分钟高效学习', add: '（效率提升3-5倍）' }
    ],
    bannerList: [],
    onlineSystemIndex: 0,
    hoverText: [
      '精准查漏补缺，专项补齐知识短板，真正做到哪里不会学哪里',
      '有效记录学习成绩、完成时间，智能分析答题表现和熟练程度等，推送相应题目和错题解析',
      '针对教材知识点进行训练，扫清课堂知识障碍，实现堂堂清、门门精',
      '五级闯关制度，点燃闯关斗志，激发学习兴趣',
      '了解学生学习情况、设置适合学生的学习目标、全程跟进引导'
    ],
    chartsIndex: 0,
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  handleChange(index: number) {
    console.log(index, 888)
    if (!this.carouselRef) return
    this.carouselRef.goTo(index)
    this.setState({ onlineSystemIndex: index })
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  componentDidMount() {
    window.fetch(`${HOST}/api/banner?type=product`, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.length) {
        this.setState({
          bannerList: data
        })
        return;
      }
      console.error(data.msg)
    }, (error) => {
      console.error('获取轮播图失败', error)
    })

    this.setState({
      isMobile: mobileDetect(window.navigator.userAgent).any
    })

    const { WOW } = require('wowjs')
    const wow = new WOW({
      offset: 10,
      live: false,
      // mobile: true,
    })
    wow && wow.init();

    // 饼图
    const ECharts = window['echarts']
    const dom = document.getElementById("container");
    const myChart = ECharts.init(dom);

    if (!ECharts || this.state.isMobile) return

    const originOptionData = JSON.parse(JSON.stringify(optionData))
    const chartsOptionData = JSON.parse(JSON.stringify(optionData))

    const option = {
      tooltip: {
        show: false
      },
      selectedMode: 'single',
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['35%', '90%'],
        show: false,
        labelLine: { show: false },
        startAngle: '126',
        data: chartsOptionData,
        itemStyle: {
          color: '#2a679f',
          borderColor: '#00a7e1',
          borderWidth: '2',
          borderType: 'solid',
        },
      }]
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }

    const cancleChartSelect = () => {
      const index = this.state.chartsIndex
      console.log(originOptionData[index].label.rich.b.color)
      chartsOptionData[index].label.rich.b.fontSize = originOptionData[index].label.rich.b.fontSize
      chartsOptionData[index].label.rich.b.color = originOptionData[index].label.rich.b.color
      chartsOptionData[index].label.rich.icon.backgroundColor.image = originOptionData[index].label.rich.icon.backgroundColor.image
      chartsOptionData[index].itemStyle.color = originOptionData[index].itemStyle.color
      chartsOptionData[index].selected = false
      myChart.setOption(option, true);
    }

    myChart.on('pieselected', (params) => {
      params.selected.length = 5
      const selectList = Array.from(params.selected)
      const index = selectList.indexOf(true)
      cancleChartSelect()
      chartsOptionData[index].label.rich.b.fontSize = 25
      chartsOptionData[index].label.rich.b.color = '#00a7e1'
      chartsOptionData[index].label.rich.icon.backgroundColor.image = hoverdIcon[index]
      chartsOptionData[index].itemStyle.color = '#fff'
      chartsOptionData[index].selected = true
      myChart.setOption(option, true);
    })
    myChart.on('click', (params) => {
      const index = params.dataIndex
      cancleChartSelect()
      chartsOptionData[index].label.rich.b.fontSize = 25
      chartsOptionData[index].label.rich.b.color = '#00a7e1'
      chartsOptionData[index].label.rich.icon.backgroundColor.image = hoverdIcon[index]
      chartsOptionData[index].itemStyle.color = '#fff'
      chartsOptionData[index].selected = true
      myChart.setOption(option, true);
      this.setState({ chartsIndex: index })
    })

    myChart.dispatchAction({
      type: 'pieSelect',
      dataIndex: 0,
    });

    this.intervalId = setInterval(() => {
      const chartsIndex = this.state.chartsIndex >= 4 ? 0 : (this.state.chartsIndex + 1)
      console.log(chartsIndex)
      myChart.dispatchAction({
        type: 'pieSelect',
        dataIndex: chartsIndex,
      });
      this.setState({ chartsIndex })
    }, 3500)
  }

  public render() {
    return (
      <div>
        {this.state.isMobile ? '' : <div className="index-container about-container">
          {<Carousel autoplay={true} afterChange={this.onChange.bind(this)}>
            {this.state.bannerList.map((item, index) => {
              return <img key={index} className="banner" src={item.img} onClick={() => {
                if (item.link) window.open(item.link)
              }}></img>
            })}
          </Carousel>}
          {/* <Carousel autoplay afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/product/banner1.png"></img>
            <img className="banner" src="/static/product/banner2.png"></img>
            <img className="banner" src="/static/product/banner3.png"></img>
            <img className="banner" src="/static/product/banner4.png"></img>
            <img className="banner" src="/static/product/banner5.png"></img>
          </Carousel> */}
          <div style={{height: '550px'}} className="gray-empty-block bg-gray">
          </div>
        </div>}

        {this.state.isMobile ? '' : <div className="index-container about-container">
          <div className="container" style={{marginTop: '-480px'}}>
            <a id="online"></a>
            <img style={{ height: '180px', zIndex: 5, position: 'relative' }} src="/static/product/online.png" alt="" />
            <div className="online-system wow fadeIn">
              <div className="online-system_left">
                <Carousel autoplay ref={this.setCarouselRef} afterChange={this.handleChange.bind(this)} dots={false} dotPosition="left">
                  {this.state.onlineSystem.map((item: any, index: number) => {
                    return (<img key={index} src={item.img} alt=""/>)
                  })}
                </Carousel>
              </div>
              <div className="online-system_right">
                {this.state.onlineSystem.map((item:any, index:number) => {
                  return (
                    <div key={index} className={classNames('item', {active: index === this.state.onlineSystemIndex})} onClick={this.handleChange.bind(this, index)}>
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
        </div>}

        {this.state.isMobile ? [
          <div key="1" className="index-container about-container pt-100">
            <img className="product_img-online" src="/static/product/online.png" alt="" />
          </div>,
          <img key="2" className="max-width pb-60" src="/static/product/online-mobile.png" alt="" />
        ] : ''}

        {this.state.isMobile ? '' : <div className="index-container about-container" style={{marginTop: '-200px'}}>
          <img style={{ height: '1300px', width: '100%' }} className="banner" src="/static/product/computer.png" alt="" />
        </div>}

        <div className="index-container about-container pb-100" style={{ marginTop: this.state.isMobile ? '0' : '-460px'}}>
          <div className="container" >
            <img className="product_img-comment" src="/static/product/comment.jpg" alt=""/>
            <div className="product_comment-context">{this.state.isMobile ? '传统教培评价标准' : '传统教培机构的评价误区'}</div>
            <img className="product_img-question" src="/static/product/question.png" alt="" />
          </div>
        </div>
        <div className="index-container about-container pb-100" style={{ marginTop: this.state.isMobile ? '-20px' : '-50px' }}>
          <a id="chuangguan"></a>

          <img className="banner product_img-mid-banner" src="/static/product/middle_banner.png" alt=""/>
          {this.state.isMobile ? <div className="product-qinghua_context">
            <p className="producti-qinghua_line">首创以“清华北大”</p>
            <p className="producti-qinghua_line">为最高目标的五级闯关制度。</p>
            <p className="producti-qinghua_line">课堂某一知识点达到“清华北大”，</p>
            <p className="producti-qinghua_line">意味着学生已经熟练掌握该知识点。</p>
          </div> : ''}
          <div className="container wow zoomInUp" >
            <img style={{ width: '100%', marginTop: '10px' }} src={this.state.isMobile ? '/static/product/qinghua_mobile.png' : '/static/product/qinghua.png'} alt="" />
          </div>
        </div>

        <div className="product-container index-container about-container pb-100 pt-100">
          <div className="other-bg-block"><a id="xinliu"></a></div>
          <div className="container" >

            <div className="improve-ways">
              <div className="left-box wow bounceInLeft">
                {
                  this.state.isMobile ? <div className="improve-ways_title">融入国际心流理论<br />游戏化通关挑战更高学习目标</div>
                  : <div className="improve-ways_title">融入国际心流理论<br/>游戏化通关<br />挑战更高学习目标</div>
                }
                <div className="improve-ways_desc">游戏化闯关过程中，<br/>学生不知不觉进入“心流”通道，<br/>形成高度专注的学习状态，<br/>不断增强技能水平，<br/>增加挑战感，越学越想学，<br/>从而使学生达成更高目标。</div>
              </div>

              <div className="right-box wow bounceInRight">
                <img className="improve-chart" src="/static/product/improve.png" alt=""/>
              </div>
            </div>
          </div>
        </div>

        <div className="index-container about-container product-chuangguan-container">
          <div className="container" >
            <img className="max-width" style={{ width: '800px' }} src="/static/product/chuangguan.png" alt="" />
          </div>
        </div>


        {
          this.state.isMobile ?
          <div className="index-container about-container bg-gray product_img-environment-container">
            <img className="product_img-environment_mobile" src="/static/product/environment_mobile.png" alt="" />
          </div> :
          <div className="index-container about-container bg-gray pb-100 pt-100">
            <div className="container" >
              <a id="offline"></a>
              <img className="product_img-offline" src="/static/product/offline.png" alt="" />
              <a id="xueguan"></a>
              <img className="product_img-environment" src="/static/product/environment.png" alt=""/>
            </div>
          </div>
        }

        <div className="index-container about-container pt-60 pb-60" style={{ background: '#00a7e1' }}>
          <div className="container" >
            <img className="product_img-adapt_study" src="/static/product/adapt_study.png" alt="" />
            <p className="product_adapt-context">五大产品功能，打通学生提升通道的“任督二脉”</p>

            {this.state.isMobile ? <img className="max-width wow bounceIn" src="/static/product/chart-mobile.png" alt="" /> : <div className="chart-container wow bounceIn">
              <div id="container" style={{ width: '100%', height: '100%', margin: 'auto'}}></div>
              <div style={{ color: 'white', fontSize: '16px', position: 'absolute', top: '50%', left: '50%', marginLeft: '-80px', marginTop: '-80px', width: '160px', height: '160px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>{this.state.hoverText[this.state.chartsIndex]}</div>
            </div>}

          </div>
        </div>

        {
          this.state.isMobile ?
            <div className="index-container about-container product-result-container">
              {[1,2,3,4,5].map((item, index) => {
                return <img key={index} src={`/static/product/result-mobile${item}.png`} alt="" />
              })}
            </div> : ''
        }

        <div className={classNames(['index-container', 'about-container', 'pt-60', 'pb-60', { 'bg-gray': this.state.isMobile }])}>
          <div className="container" >
            <div className="bordered-title">遇见小步智学，<br/>遇见比你想象中更好的自己</div>
          </div>
        </div>

      </div>
    )
  }
}

export default Product

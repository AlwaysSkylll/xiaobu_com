import React from "react"
import { Carousel } from 'antd';
import _classNames from 'classnames'

class About extends React.PureComponent<{}, {}, any> {
  state: any = {
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  componentDidMount() {
  }

  public render() {
    return (
      <div>
        <div className="index-container about-container pb-100">
          <Carousel afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/about/banner.jpg"></img>
          </Carousel>
          <div className="gray-empty-block bg-gray">
            <div className="container">
              <img className="title-img offset-top-90 " src="/static/about/company.png" alt=""/>
            </div>
          </div>
        </div>

        <div className="about-container index-container pb-100">
          <div className="container pb-50">

            <div className="introduce">
              <div className="thumb fl"><img style={{ width: '620px'}} src="/static/about/sky.png" alt="" /></div>
              <div className="context bg-gray" style={{ paddingLeft: '740px', paddingRight: '50px'}}>
                <p className="detail">杭州小步智学教育科技有限公司位于杭州高新技术产业热区、创业创富热土——滨江区，是一家集线上学习平台和线下学习中心于一体的新型智慧教育公司。依托母公司杭州博世数据网络有限公司强大的品牌背书和“学乐云”这一国内首个教育大数据云平台的优势，借助国家政策与行业趋势，实力落地智能学习中心的应用推广。小步智学颠覆传统教育模式，首创“以学为中心”的教育体系，真正实现个性化学习。<br />目前，小步智学门店已遍布全国近80个城市。突破地域限制，实现教育资源均衡化，让教育变得公平而有质量！</p>
              </div>
            </div>

            <img className="title-img" src="/static/about/team.png" alt="" />
            <div className="introduce">
              <div className="thumb fr"><img style={{marginRight: '80px'}} src="/static/about/chen.jpg" alt="" /></div>
              <div className="context bg-gray">
                <p className="name text-left" style={{color: '#585858'}}>陈冬华</p>
                <div className="reward text-left" style={{color: '#585858'}}>
                  中国教育家协会联盟副主席<br />
                  学乐云教学董事长<br />
                  小步智学产品总设计师<br />
                </div>
                <p className="detail text-left">出身教育世家，33年不间断学习苏联教育大家——苏霍姆林斯基的大量专著，积淀了深厚的教育教学理论，通过近20年一线教育实践的深刻剖析，形成全新的“以学为中心”的教学理念以及理论体系。十多年来专注研发“互联网+教育”平台，积累了丰富的教育信息化应用实践经验</p>
              </div>
            </div>

          </div>


        </div>

        <div className="about-container index-container bg-gray pt-100 pb-100">
          <div className="container">
            <img style={{width: '100%'}} src="/static/about/donator.png" alt=""/>
          </div>
        </div>

        <div className="about-container index-container pb-100">
          <div className="container">
            <img className="title-img offset-bottom-90" src="/static/about/contact.png" alt="" />
            <div className="contact-box">
              <div className="contact-box_column">
                <div className="contact-box_item flex-1">
                  <img className="small-img" src="/static/about/mail.png" alt=""/>
                  <p className="contact-box_text">简历投递<br/>chenyao@xueleyun.com</p>
                </div>
                <div className="contact-box_item flex-1">
                  <img className="small-img" src="/static/about/location.png" alt="" />
                  <p className="contact-box_text">公司地址</p>
                </div>
                <div className="contact-box_item">
                  <img className="big-img" src="/static/about/map.png" alt="" />
                </div>
                <div className="contact-box_item">
                  <p className="contact-box_text">浙江省杭州市滨江区聚光中心B座<br/>(智慧e谷西南300米)</p>
                </div>
              </div>
              <div className="contact-box_column">
                <div className="contact-box_item flex-1">
                  <img className="small-img" src="/static/about/earphone.png" alt="" />
                  <p className="contact-box_text">项目咨询<br />15505882806</p>
                </div>
                <div className="contact-box_item flex-1">
                  <img className="small-img" src="/static/about/wx.png" alt="" />
                  <p className="contact-box_text">小步智学</p>
                </div>
                <div className="contact-box_item flex-1">
                  <img className="medium-img" src="/static/about/qrcode.png" alt="" />
                </div>
                <div className="contact-box_item flex-1">
                  <p className="contact-box_text">小步智学</p>
                  <img className="medium-img" src="/static/about/qrcode2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About

import React from "react"
import { Carousel } from 'antd';
import classNames from 'classnames'
import mobileDetect from 'ismobilejs'
import HOST from '../../utils/api';
import Router from 'next/router'

class Index extends React.PureComponent<{}, {}, any> {
  state: any = {
    newsList: [
      { img: '/static/home/manage.png', title: '', news: ['1、真的能月入10万吗？5年创业投资人教你用投资思维选项目！', '2、打破传统教培模式，小步智学轻松招生过千人！', '3、加盟3个月，连开4家学习中心，招生80多人！这家店凭什么？'] },
      { img: '/static/home/news2.png', title: '', news: ['1、7天冲刺班，解决1学期的重难点知识！从80分到95分只要轻轻一跃！', '2、这家店暑假班“喜提”千人报名！全凭期末考有92%的学员提分！', '3、期末考逆袭，语数英全部提升20分！孩子哭了：原来我也可以这么优秀!'] },
      { img: '/static/home/news3.png', title: '', news: ['1、学有所获，100 % 落地实操的培训技能，小步智学第10期学管师培训回顾。', '2、快讯丨小步智学又双叒叕在这些地方开业啦！你知道吗？', '3、百舸争流——小步智学参加第76届中国教育装备展！'] },
    ],
    newsIndex: 0,
    isMobile: false,
    bannerList: [],
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  componentDidMount() {
    window.fetch(`${HOST}/api/banner?type=index`, {
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

    window.fetch(`${HOST}/api/index/news`, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data) {
        this.setState({
          newsList: [data.store_operation, data.case, data.activity]
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

    setInterval(() => {
      this.setState({
        newsIndex: this.state.newsIndex >= 2 ? 0 : (this.state.newsIndex + 1)
      })
      console.log(this.state.newsIndex >= 2 ? 0 : (this.state.newsIndex + 1))
    }, 2500)

    const { WOW } = require('wowjs')
    const wow = new WOW({
      offset: 10,
      live: false,
      // mobile: true,
    })
    wow && wow.init();

  }

  redirectNews(item) {
    if (item.link) {
      window.open(item.link)
      return
    }
    Router.push(`/news_detail?id=${item.id}&type_title=${item.type_title}`)
    document.documentElement.scrollTop = document.body.scrollTop = 0
  }


  public render() {
    return (
      <div>
        <div className="index-container pb-100">
          {
            this.state.isMobile ? '' :
              (<Carousel autoplay afterChange={this.onChange.bind(this)}>
                {this.state.bannerList.map((item, index) => {
                  return <img key={index} className="banner" src={item.img} onClick={() => {
                    if (item.link) window.open(item.link)
                  }}></img>
                })}

                {/* <img className="banner" src="/static/home/banner1.png"></img>
                <img className="banner" src="/static/home/banner2.png"></img>
                <img className="banner" src="/static/home/banner3.png"></img> */}
              </Carousel>)
          }
          <div className="container">
            <p className="title">教培升级，我选小步智学！</p>
            <img className="icon-vs" src="/static/home/VS@2x.png" alt="" />
            <img className="container" src={this.state.isMobile ? '/static/home/table_mobile.png' : '/static/home/table@2x.png'} alt="" />
          </div>
        </div>
        <div className={classNames(['index-container', 'bg-gray', 'pb-100', 'pt-100'])}>
          <div className="container">
            <img className="img_service img_news" src="/static/home/news.png" alt=""/>
            <div className="news-list wow bounceIn" >
              <div className="left-box">
                {this.state.newsList.map(item => item.title).map((item, index) => {
                  return (
                    <div key={index} className={classNames('item', { active: index === this.state.newsIndex })} onClick={() => { this.setState({ newsIndex: index }) }}>{item}</div>
                  )
                })}
              </div>
              <div className="right-box">
                <img className="right-img" src={this.state.newsList[this.state.newsIndex].img} alt="" />
                {this.state.newsList[this.state.newsIndex].news.map((item, index) => {
                  return (<p className="complain" key={index} onClick={this.redirectNews.bind(this, item)}>{index + 1}、{item.title}</p>)
                })}
              </div>
            </div>
            <img className="img_service" src="/static/home/service.png" alt=""/>
            <div className="service-list">
              <div className="service-item">
                <img className="service-item_icon" src="/static/home/open.png" alt=""/>
                <p className="service-item_title">开业支持</p>
                <p className="service-item_desc">启动方案、物料协助开业流程、现场站台专营店协助筹建</p>
              </div>
              <div className="service-item">
                <img className="service-item_icon" src="/static/home/keep.png" alt="" />
                <p className="service-item_title">运营服务</p>
                <p className="service-item_desc">产品培训、市场培训客服培训、门店管理培训：线上+线下专业导师、成功店长干货满满</p>
              </div>
              <div className="service-item">
                <img className="service-item_icon" src="/static/home/product.png" alt="" />
                <p className="service-item_title">产品研发</p>
                <p className="service-item_desc">系统更新、海量优课智能题库、教材研发</p>
              </div>
              <div className="service-item">
                <img className="service-item_icon" src="/static/home/marketing.png" alt="" />
                <p className="service-item_title">营销支持</p>
                <p className="service-item_desc">招生方案、营销活动市场推广、品牌策划</p>
              </div>
              <div className="service-item">
                <img className="service-item_icon" src="/static/home/progress.png" alt="" />
                <p className="service-item_title">加盟流程</p>
                <p className="service-item_desc">索取资料、考察洽谈签订合同、选址装修系统培训、正式营业</p>
              </div>
            </div>
          </div>
        </div>
        <div className="index-container pt-100">
          <div className="container">
            <img className="leader-img" src="/static/home/leader.png" alt=""/>

            <div className="introduce">
              <div className="thumb fl"><img src={this.state.isMobile ? '/static/home/chen2.png' : '/static/home/chen.jpg'} alt=""/></div>
              <div className="context bg-gray">
                <p className="name">陈冬华</p>
                <div className="reward animated wow bounceInRight">
                  中国教育家协会联盟副主席<br/>
                  学乐云教学董事长<br />
                  小步智学产品总设计师<br />
                </div>
                <p className="detail wow bounceInRight">出身教育世家，33年不间断地学习苏联教育大家——苏霍姆林斯基的大量专著，积淀了深厚的教育教学理论，通过近20年一线教育实践的深刻剖析，形成全新的“以学为中心”的教学体系。用执着的信念践行着伟大的教育梦想，借助小步智学智能学习中心的推广，把自适应学习系统带给更多学生，实现教育资源均衡化，让教育变得公平而有质量！</p>
              </div>
            </div>

            <img className="leader-img leader-img2" src="/static/home/donator.jpg" alt="" />

            <div className="introduce">
              <div className="thumb fr"><img className="img-ghost" src="/static/home/wang.png" alt="" /></div>
              <div className="context context-ghost">
                <p className="name">王刚</p>
                <div className="reward wow bounceInLeft">
                  阿里巴巴前高管<br />
                  滴滴出行联合创始人与投资人<br />
                </div>
                <p className="detail wow bounceInLeft">王刚认为，教育领域必将出现类似滴滴改变出行，阿里改变商业这样的一个大型互联网公司。</p>
              </div>
            </div>

            <div className="introduce">
              <div className="thumb fl"><img className="img-ghost" src="/static/home/zhu.png" alt="" /></div>
              <div className="context context-ghost">
                <p className="name">朱啸虎</p>
                <div className="reward wow bounceInRight">
                  金沙江创投基金合伙人<br />
                  领投滴滴出行、饿了么、去哪儿等当红项目<br />
                </div>
                <p className="detail wow bounceInRight">朱啸虎认为，投资企业最看重的是它的切入方式。小步智学一直在给教育做减法，用人工智能的技术手段优化教与学，是真正懂教育的企业。</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    )
  }
}

export default Index

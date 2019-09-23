import React from "react"
import { Carousel } from 'antd';
import classNames from 'classnames'
import mobileDetect from 'ismobilejs'

class Join extends React.PureComponent<{}, {}, any> {
  state: any = {
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  componentDidMount() {
    this.setState({
      isMobile: mobileDetect(window.navigator.userAgent).any
    })
  }

  public render() {
    return (
      <div>
        {this.state.isMobile ? '' : <div className="index-container about-container">
          <Carousel afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/join/banner.png"></img>
          </Carousel>
          <div className="gray-empty-block bg-gray"></div>
        </div>}

        <div className={classNames(['about-container', 'index-container', { 'pb-100': !this.state.isMobile }, { 'bg-gray': this.state.isMobile }])}>
          <div className="container">
            <img className="advance_detail max-width" src={this.state.isMobile ? '/static/join/advance_detail_mobile.png' : '/static/join/advance_detail.png'} alt="" />
          </div>
        </div>

        <div className="about-container bg-gray index-container pt-100" style={{ paddingBottom: this.state.isMobile ? '110px' : '180px'}}>
          <div className={classNames(['max-width', 'text-center', { 'container': !this.state.isMobile }])}>
            <img className="join-img join-profit-img" src="/static/join/profit.png" alt="" />
            <div className="video-body">
              {/* <video controls src="http://dl.xueleyun.com/files/219c434ae9a8336457afa546d3489a80.mp4" poster="/static/join/video_poster.jpg"></video> */}
              <video controls src="http://dl.xueleyun.com/files/219c434ae9a8336457afa546d3489a80.mp4"/>
            </div>
            <img className="join-img mt-50" src="/static/join/store.png" alt="" />
            <p className="join-profit-context">我们的门店从几十平到几百平不等，但麻雀虽小，五脏俱全。<br />我们的门店从学校周边民用住宅到市中心街道，甚至还有集装箱改装，{this.state.isMobile ? '' : <br/>}形式多样，功能齐全。</p>

          </div>
          {this.state.isMobile ? <img className="max-width" src="/static/join/banner_middle_mobile.png"></img> :
          <Carousel afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/join/banner_middle.png"></img>
          </Carousel>}
          <div className="container">
            <img style={{ width: '100%' }} src={this.state.isMobile ? '/static/join/great_shoper_mobile.png' : '/static/join/great_shoper.png'}></img>
          </div>
        </div>

        <div className={classNames(['about-container', 'index-container', 'pb-100', { 'bg-gray': this.state.isMobile }])} style={{marginTop: '-70px'}}>
          <div className="container">
            <img className="join-img" src={this.state.isMobile ? '/static/join/support_mobile.png' : '/static/join/support.png'} alt="" />
            <p className="join-support-context">没做过教育，没经验，没关系！<br/>我们帮你，一站式无忧加盟服务支持。</p>
            <img style={{ width: '100%' }} src={this.state.isMobile ? require('/static/join/support_detail_mobile.png') : require('/static/join/support_detail.png')} alt="" />
            <img className="join-img_support-progress" src={this.state.isMobile ? '/static/join/support_progress_mobile.png' : '/static/join/support_progress.png'} alt=""/>
          </div>
        </div>

        <div className="about-container bg-gray index-container pt-100 pb-100">
          <div className="container">
            <img style={{ width: '100%' }} src="/static/join/store_map.png" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default Join

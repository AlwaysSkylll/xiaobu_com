import React from "react"
import { Carousel } from 'antd';
import _classNames from 'classnames'

class Join extends React.PureComponent<{}, {}, any> {
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
        <div className="index-container about-container">
          <Carousel afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/join/banner.png"></img>
          </Carousel>
          <div className="gray-empty-block bg-gray"></div>
        </div>

        <div className="about-container index-container pb-100">
          <div className="container">
            <img className="advance_detail" src="/static/join/advance_detail.png" alt="" />
          </div>
        </div>

        <div className="about-container bg-gray index-container pt-100" style={{paddingBottom: '180px'}}>
          <div className="container">
            <img className="title-img" style={{ height: '240px' }} src="/static/join/profit.png" alt="" />
            <div className="video-body">
              <video controls src="" poster="/static/join/video_poster.jpg"></video>
            </div>
            <img className="title-img mt-50" style={{height: '180px'}} src="/static/join/store.png" alt="" />
            <p style={{ fontSize: '26px', color: '#585858', lineHeight: '1.4', marginTop: '25px'}}>我们的门店从几十平到几百平不等，但麻雀虽小，五脏俱全。<br/>我们的门店从学校周边民用住宅到市中心街道，甚至还有集装箱改装，<br/>形式多样，功能齐全。</p>

          </div>
          <Carousel afterChange={this.onChange.bind(this)}>
            <img className="banner" src="/static/join/banner_middle.png"></img>
          </Carousel>
          <div className="container">
            <img style={{width: '100%'}} src="/static/join/great_shoper.png"></img>
          </div>
        </div>

        <div className="about-container index-container pb-100" style={{marginTop: '-70px'}}>
          <div className="container">
            <img className="title-img" style={{ height: '140px' }} src="/static/join/support.png" alt="" />
            <p style={{ fontSize: '26px', color: '#585858', lineHeight: '1.4', marginTop: '25px' }}>没做过教育，没经验，没关系！<br/>我们帮你，一站式无忧加盟服务支持。</p>
            <img style={{ width: '100%' }} src="/static/join/support_detail.png" alt="" />
            <img style={{ width: '100%', marginTop: '100px' }} src="/static/join/support_progress.png" alt=""/>
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

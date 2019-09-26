import React from "react"
import { Carousel } from 'antd';
import classNames from 'classnames'
import mobileDetect from 'ismobilejs'
import { Radio, Input, Button } from 'antd';

class Join extends React.PureComponent<{}, {}, any> {
  state: any = {
    sex: 1,
    verifyCode: {},
  }

  onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  componentDidMount() {
    require('../../static/gvertify.js')
    this.setState({
      isMobile: mobileDetect(window.navigator.userAgent).any,
    }, () => {
      const verifyCode = new window['GVerify']({
        id: 'verify-img',    //容器的ID
        type: 'number',    //图形验证码的类型：blend-数字字母混合类型（默认）、number-纯数字、letter-纯字母
      });
      this.setState({
        verifyCode
      })
    })
  }

  refreshVertify() {
    this.state.verifyCode.refresh();
  }

  getVertifyResult(code) {
    this.state.verifyCode.validate(code);
  }

  onChangeSex(e) {
    console.log(this, e)
    this.setState({
      sex: e.target.value,
    });
  }

  mobileForm = () => {
    const radioStyle = {
      display: 'inline-block',
      height: '30px',
      lineHeight: '30px',
      width: '20px',
      marginLeft: '10px',
      marginRight: '30px',
    };
    const inlineInputStyle = {
      display: 'inline-block',
      width: '60%',
      marginTop: '10px'
    }

    const inlineRadioGroup = {
      display: 'inline-block',
    }

    const inputStyle = {
      width: '60%',
      marginTop: '10px'
    }

    const fullInputStyle = {
      marginTop: '10px'
    }

    const validateInputStyle = {
      display: 'inline-block',
      marginTop: '5px',
      marginLeft: '5px',
      width: '80px'
    }
    return (
      <div className="container join-form-container_mobile">
        <img className="banner max-width" src="/static/join/join-form_mobile.png"></img>
        <p className="form-title">我要咨询 <span className="form-subtitle">（24小时内获得快速回复）</span> </p>
        <div>
          <Input style={inlineInputStyle} placeholder="姓名" />
          <Radio.Group style={inlineRadioGroup} onChange={this.onChangeSex.bind(this)} value={this.state.sex}>
            <Radio style={radioStyle} value={1}>先生</Radio>
            <Radio style={radioStyle} value={2}>女士</Radio>
          </Radio.Group>
        </div>
        <Input style={inputStyle} placeholder="电话" type="tel" maxLength={11} />
        <Input style={inputStyle} placeholder="邮箱" type="tel" />
        <Input style={inputStyle} placeholder="公司名称" type="tel" />
        <Input.TextArea style={fullInputStyle}
          placeholder="您的建议"
          autosize={{ minRows: 4 }}
        />
        <div className="">
          <span>验证码</span>
          <Input size="small" style={validateInputStyle} placeholder="验证码" />
          <Button style={{float: 'right', marginTop: '5px', marginLeft: '10px'}} size="small" type="primary">提交</Button>
          <Button style={{ float: 'right', marginTop: '5px', marginLeft: '10px' }} size="small">重置</Button>
          <div style={{width: '50px', height: '25px', display: 'inline-block', marginTop: '5px', float: 'right'}} id="verify-img"></div>
        </div>
      </div>
    )
  }

  pcForm = () => {
    return <div>1111</div>
  }

  getForm = () => {
    return this.state.isMobile ? this.mobileForm : this.pcForm
  }

  public render() {
    const Form = this.getForm()
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

        <div className="about-container bg-gray index-container pt-100" style={{ paddingBottom: this.state.isMobile ? '110px' : '180px' }}>
          <div className={classNames(['max-width', 'text-center', { 'container': !this.state.isMobile }])}>
            <img className="join-img join-profit-img" src="/static/join/profit.png" alt="" />
            <div className="video-body">
              {/* <video controls src="http://dl.xueleyun.com/files/219c434ae9a8336457afa546d3489a80.mp4" poster="/static/join/video_poster.jpg"></video> */}
              <video controls src="http://dl.xueleyun.com/files/219c434ae9a8336457afa546d3489a80.mp4" />
            </div>
            <img className="join-img mt-50" src="/static/join/store.png" alt="" />
            <p className="join-profit-context">我们的门店从几十平到几百平不等，但麻雀虽小，五脏俱全。<br />我们的门店从学校周边民用住宅到市中心街道，甚至还有集装箱改装，{this.state.isMobile ? '' : <br />}形式多样，功能齐全。</p>

          </div>
          {this.state.isMobile ? <img className="max-width" src="/static/join/banner_middle_mobile.png"></img> :
            <Carousel afterChange={this.onChange.bind(this)}>
              <img className="banner" src="/static/join/banner_middle.png"></img>
            </Carousel>}
          <div className="container">
            <img style={{ width: '100%' }} src={this.state.isMobile ? '/static/join/great_shoper_mobile.png' : '/static/join/great_shoper.png'}></img>
          </div>
        </div>

        <div className={classNames(['about-container', 'index-container', 'pb-100', { 'bg-gray': this.state.isMobile }])} style={{ marginTop: '-70px' }}>
          <div className="container">
            <img className="join-img" src={this.state.isMobile ? '/static/join/support_mobile.png' : '/static/join/support.png'} alt="" />
            <p className="join-support-context">没做过教育，没经验，没关系！<br />我们帮你，一站式无忧加盟服务支持。</p>
            <img style={{ width: '100%' }} src={this.state.isMobile ? require('/static/join/support_detail_mobile.png') : require('/static/join/support_detail.png')} alt="" />
            <img className="join-img_support-progress" src={this.state.isMobile ? '/static/join/support_progress_mobile.png' : '/static/join/support_progress.png'} alt="" />
          </div>
        </div>

        <div className="about-container bg-gray index-container pt-100 pb-100">
          <div className={classNames([{ 'container': !this.state.isMobile }])}>
            <img style={{ width: '100%' }} src="/static/join/store_map.png" alt="" />
          </div>
        </div>

        <Form></Form>
      </div>
    )
  }
}

export default Join

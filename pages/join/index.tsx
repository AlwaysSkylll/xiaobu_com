import React from "react"
import { Carousel } from 'antd';
import classNames from 'classnames'
import mobileDetect from 'ismobilejs'
import { Radio, Input, Button } from 'antd';
import 'react-area-linkage/dist/index.css'; // v2 or higher
import pcaa from 'area-data/pcaa';
import { AreaSelect } from 'react-area-linkage';
import HOST from '../../utils/api';

const telRegx = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/

class Join extends React.PureComponent<{}, {}, any> {
  name:any = {}
  phone:any = {}
  email:any = {}
  content:any = {}
  company_name:any = {}
  code:any = {}

  state: any = {
    gender: '',
    verifyCode: {},
    areaList: [],
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
    return this.state.verifyCode.validate(code);
  }

  onChangeSex(e) {
    console.log(e.target.value)
    this.setState({
      gender: e.target.value,
    });
  }

  areaChange(areaList) {
    this.setState({
      areaList
    })
  }

  emptyCheck() {
    const name = this.name.state.value;
    const phone = this.phone.state.value;
    const code = this.code.state.value;
    const content = this.content.textAreaRef.value;
    const province = this.state.areaList[0];
    const city = this.state.areaList[1];
    const county = this.state.areaList[2];


    if (!name || !phone || !content || !province || !city || !county) {
      alert('请先补充信息后提交')
      return;
    }

    if (!code) {
      alert('请填写验证码')
      return;
    }

    if (!this.getVertifyResult(code)) {
      alert('验证码错误')
      return;
    }

    if (!telRegx.test(this.phone.state.value)) {
      alert('手机格式不正确')
      return;
    }
    return true;
  }

  submitForm() {
    if (!this.emptyCheck()) return

    const name = this.name.state.value;
    const phone = this.phone.state.value;
    const email = this.email.state.value;
    const code = this.code.state.value;
    const content = this.content.textAreaRef.value;
    const company_name = this.company_name.state.value;
    const gender = this.state.gender;
    const province = this.state.areaList[0];
    const city = this.state.areaList[1];
    const county = this.state.areaList[2];
    console.log({ name, phone, email, content, company_name, gender, province, city, county, code })

    const formData = new FormData();
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('code', code)
    formData.append('content', content)
    formData.append('company_name', company_name)
    formData.append('gender', gender)
    formData.append('province', province)
    formData.append('city', city)
    formData.append('county', county)

    window.fetch(`${HOST}/api/consult`, {
      method: 'POST',
      body: formData,
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.success) {
        alert('提交成功')
        return;
      }
      alert(data.msg)
    }, (error) => {
      console.error(error)
      alert('提交失败')
    })
  }

  resetForm() {
    this.name.state.value = '';
    this.phone.state.value = '';
    this.email.state.value = '';
    this.code.state.value = '';
    this.content.textAreaRef.value = '';
    this.company_name.state.value = '';
    this.setState({
      gender: '',
      areaList: [],
    })
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
        <img className="max-width" src="/static/join/join-form_mobile.png"></img>
        <p className="form-title">我要咨询 <span className="form-subtitle">（24小时内获得快速回复）</span> </p>
        <div>
          <Input ref={input => this.name = input} style={inlineInputStyle} maxLength={5} placeholder="姓名" allowClear/>
          <Radio.Group style={inlineRadioGroup} onChange={this.onChangeSex.bind(this)} value={this.state.gender}>
            <Radio style={radioStyle} value="先生">先生</Radio>
            <Radio style={radioStyle} value="女士">女士</Radio>
          </Radio.Group>
        </div>
        <Input ref={input => this.phone = input} style={inputStyle} placeholder="电话" type="tel" maxLength={11} allowClear/>
        <Input ref={input => this.email = input} style={inputStyle} maxLength={100} placeholder="邮箱" allowClear/>
        <Input ref={input => this.company_name = input} style={inputStyle} maxLength={30} placeholder="公司名称" allowClear/>
        <AreaSelect level={2} type="text" size="small" defaultArea={[]} onChange={this.areaChange.bind(this)} data={pcaa}></AreaSelect>
        <Input.TextArea style={fullInputStyle}
          ref={input => this.content = input}
          placeholder="您的建议"
          maxLength={300}
          autosize={{ minRows: 4 }}
        />
        <div className="">
          <span>验证码</span>
          <Input maxLength={10} ref={input => this.code = input} size="small" style={validateInputStyle} placeholder="验证码" />
          <Button style={{float: 'right', marginTop: '5px', marginLeft: '10px'}} size="small" type="primary" onClick={this.submitForm.bind(this)}>提交</Button>
          <Button style={{ float: 'right', marginTop: '5px', marginLeft: '10px' }} size="small" onClick={this.resetForm.bind(this)}>重置</Button>
          <div style={{width: '60px', height: '25px', display: 'inline-block', marginTop: '5px', float: 'right'}} id="verify-img"></div>
        </div>
      </div>
    )
  }

  pcForm = () => {
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
      marginTop: '20px'
    }

    const inlineRadioGroup = {
      display: 'inline-block',
    }

    const inputStyle = {
      width: '60%',
      marginTop: '20px'
    }

    const fullInputStyle = {
      marginTop: '20px'
    }

    const validateInputStyle = {
      display: 'inline-block',
      marginTop: '20px',
      marginLeft: '20px',
      width: '80px'
    }

    return <div className="container join-form-container">
      <div className="form-box">
        <p className="form-title">我要咨询 <span className="form-subtitle">（24小时内获得快速回复）</span> </p>
        <div>
          <Input ref={input => this.name = input} style={inlineInputStyle} maxLength={20} placeholder="姓名" allowClear />
          <Radio.Group style={inlineRadioGroup} onChange={this.onChangeSex.bind(this)} value={this.state.gender}>
            <Radio style={radioStyle} value="先生">先生</Radio>
            <Radio style={radioStyle} value="女士">女士</Radio>
          </Radio.Group>
        </div>
        <Input ref={input => this.phone = input} style={inputStyle} placeholder="电话" type="tel" maxLength={11} allowClear />
        <Input ref={input => this.email = input} style={inputStyle} maxLength={100} placeholder="邮箱" allowClear />
        <Input ref={input => this.company_name = input} style={inputStyle} maxLength={100} placeholder="公司名称" allowClear />
        <AreaSelect level={2} type="text" defaultArea={[]} onChange={this.areaChange.bind(this)} data={pcaa}></AreaSelect>
        <Input.TextArea style={{ ...fullInputStyle, resize: 'none'}}
          ref={input => this.content = input}
          placeholder="您的建议"
          maxLength={300}
          autosize={{ minRows: 10 }}
        />
        <div className="">
          <span>验证码</span>
          <Input maxLength={10} ref={input => this.code = input} style={validateInputStyle} placeholder="验证码" />
          <Button style={{ float: 'right', marginTop: '20px', marginLeft: '10px' }} type="primary" onClick={this.submitForm.bind(this)}>提交</Button>
          <Button style={{ float: 'right', marginTop: '20px', marginLeft: '10px' }} onClick={this.resetForm.bind(this)}>重置</Button>
          <div style={{ width: '100px', height: '30px', display: 'inline-block', marginLeft: '20px', marginTop: '20px', verticalAlign: 'bottom' }} id="verify-img"></div>
        </div>
      </div>
      <div className="img-box">
        <img className="banner max-width" src="/static/join/join-form.png"></img>
      </div>
    </div>
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

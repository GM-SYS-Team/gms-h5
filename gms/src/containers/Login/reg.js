import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import './view/login.less';

import { WingBlank,List, InputItem, WhiteSpace, Button, Checkbox,Flex , Toast ,SegmentedControl,Picker,Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import TopBar from "../../components/Container/TopBar";
import Container from "../../components/Container/index";
import {Link} from 'react-router';
import Areas from "../../components/FormItem/areas";

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class Reg extends React.Component{

    timer = null;

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    state = {
        formError:{},
        userType : 0,
        count:60,
        smsAble:true,

        showComm:false,
        smsCodeWords:"获取验证码",
    }

    //错误提示
    onErrorClick = (key) => {
        if(typeof this.state.formError[key] !== "undefined" && this.state.formError[key].errors.length > 0 ){
            Toast.info(this.state.formError[key].errors[0].message,1);
        }
    }

    //请求参数
    params = {
        userType : 0,
        isAgree:false,
    }

    //tab修改
    onUserTypeChange = (e) =>{
        let index = e.nativeEvent.selectedSegmentIndex;
        this.params.userType = index;
        this.setState({userType:index});
        if(index === 0){
            this.setState({showComm:false});
        }else{
            this.setState({showComm:true});
        }
    }

    //同意协议
    agreeChecked =(e)=>{
        this.params.isAgree = e.target.checked;
    }

    //发送验证
    sendVerifyCode = () =>{
        if(!this.state.smsAble){
            return;
        }

        let phone = this.props.form.getFieldValue("phoneNum");
        if(typeof phone === "undefined"){
            Toast.info("请先输入手机号码");
            return;
        }
        this.props.sendVerifyCode({telephone:phone});

        //倒计时
        this.timer = setInterval(function () {
            var count = this.state.count;
            count -= 1;
            if (count < 1) {
                this.setState({
                    smsCodeWords: "获取验证码",
                    smsAble:true

                });
                count = 60;
                clearInterval(this.timer);
            }else{
                this.setState({
                    smsCodeWords: "重新发送("+count+")",
                    smsAble:false
                });
            }
            this.setState({
                count: count
            });
        }.bind(this), 1000);
    }

    //注册
    submit = () => {

        if(!this.params.isAgree){
            Toast.info("请先同意《国码扫用户注册协议》",1);
            return;
        }

        this.props.form.validateFields((error, values) => {
            values.userType = this.params.userType;
            if(typeof values.district !== "undefined"){
                values.district =  values.district.join(",");
            }
            if (!error) {
                this.setState({formError: {}})
                this.props.reg(values);
            }else{
                this.setState({formError: error})
            }
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    render(){
        const { getFieldProps } = this.props.form;

        return (
            <Container className="reg">
                <TopBar
                    title="填写注册信息"
                />

                <WhiteSpace/>

                <WingBlank size="lg" className="sc-example" style={{margin:"10px",marginTop:20}}>
                    <SegmentedControl onChange={e => this.onUserTypeChange(e)}  values={['个人', '商家']} selectedIndex={this.state.userType} />
                </WingBlank>

                <WhiteSpace />
                <List renderHeader={() => '请填写准确信息，以确保我们能帮到您'}>

                    <InputItem
                        {...getFieldProps('phoneNum',{
                            rules: [{ required: true,message:"请输入手机号"}],
                        })}
                        placeholder="请输入手机号码"
                        type="phone"
                        error={typeof this.state.formError["phoneNum"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"phoneNum")}
                        extra={
                            <Button onClick={this.sendVerifyCode} type="ghost" inline size="small" style={{ marginRight: '4px',height:30,lineHeight: "30px"}}>{this.state.smsCodeWords}</Button>
                        }
                    >手机号码</InputItem>

                    <InputItem
                        {...getFieldProps('smsCode', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入验证码"}],
                        })}
                        type="number"
                        placeholder="请输入验证码"
                        error={typeof this.state.formError["smsCode"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"smsCode")}
                    >验证码</InputItem>

                    <InputItem
                        {...getFieldProps('password', {
                            initialValue: '',
                            rules: [{ required: true,message:"请输入您要设置的密码"}],
                        })}
                        type="password"
                        placeholder="请输入您要设置的密码"
                        error={typeof this.state.formError["password"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"password")}
                    >密码</InputItem>

                    <InputItem
                        {...getFieldProps('repassword',{
                            initialValue: '',
                            rules: [{ required: true,message:"请再次输入您要设置的密码"}],
                        })}
                        type="password"
                        placeholder="请再次输入您要设置的密码"
                        error={typeof this.state.formError["repassword"] !== "undefined"}
                        onErrorClick={this.onErrorClick.bind(this,"repassword")}
                    >确认密码</InputItem>

                </List>

                <WhiteSpace/>

                <List style={{display:this.state.showComm?"":"none"}}>

                    <InputItem
                        {...getFieldProps('shopName', {
                            initialValue: '',
                        })}
                        placeholder="请输入商户名称"
                    >商户名称</InputItem>

                    <InputItem
                        {...getFieldProps('trueName', {
                            initialValue: '',
                        })}
                        placeholder="请输入联系人"
                    >联系人</InputItem>

                    <Picker
                        extra="请选择省区"
                        data={Areas}
                        title="请选择省区"
                        {...getFieldProps('district', {

                        })}
                        onOk={e => console.log('ok', e)}
                        onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">店铺地址</List.Item>
                    </Picker>

                    <InputItem
                        {...getFieldProps('address', {
                            initialValue: '',
                        })}
                        placeholder="请输入详细地址"
                    >详细地址</InputItem>

                   {/* <Picker extra="请选择所属行业"
                            title="Areas"
                            {...getFieldProps('district', {
                                initialValue: ['340000', '341500', '341502'],
                            })}
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                    >
                        <List.Item arrow="horizontal">所属行业</List.Item>
                    </Picker>*/}

                </List>


                <Flex>
                    <Flex.Item>
                        <AgreeItem
                            data-seed="logId"
                            onChange={e => this.agreeChecked(e)}
                        >
                            <span style={{color:"#999",fontSize:12}}>
                                <span >我已阅读并同意</span>
                                <a style={{color:"#f90"}} onClick={(e) => { e.preventDefault(); this.setState({modal1:true}); }}>《国码扫用户注册协议》</a>
                            </span>
                        </AgreeItem>
                    </Flex.Item>
                </Flex>

                <WhiteSpace/>
                <WhiteSpace/>

                <WingBlank>
                    <Button style={{height:40,lineHeight:"40px"}} type="primary" onClick={this.submit}>提交</Button>
                </WingBlank>



                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="国码扫用户服务和结算服务协议"
                    footer={[{ text: '关闭', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height:"350px",  overflow: 'scroll' }}>
                        “‘优赚呗’用户服务和结算服务”（以下简称“本服务”）是由（深圳市码联国码信息技术有限公司为“优赚呗”平台的版权所有者，以下简称“乙方”）向“优赚呗”用户（以下简称“甲方”）提供的“优赚呗”软件系统（以下简称“本系统”）用户服务和货币结算服务，方便“优赚呗”的用户使用本系统，并提供通过本系统集成的第三方支付网关完成收付款服务。本协议由甲方和乙方签订。
                        <br/>声明与承诺
                        <br/>•	一、甲方确认，在甲方申请开通“优赚呗”的用户服务和结算服务之前，甲方已充分阅读、理解并接受本协议的全部内容，一旦甲方使用本服务，即表示甲方同意遵循本协议的所有约定。
                        <br/>•	二、甲方同意，乙方有权随时对本协议内容进行单方面的变更，并以在”优赚呗”网站公告的方式予以公布，无需另行单独通知甲方；若甲方在本协议内容公告变更后继续使用本服务的，表示甲方已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若甲方不同意修改后的协议内容，甲方应停止使用本服务。
                        <br/>•	三、甲方声明，在甲方同意接受本协议并注册开通“优赚呗”用户服务时，甲方是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本协议内容不受甲方所属国家或地区的排斥。不具备前述条件的，甲方应立即终止注册或停止使用本服务。
                        <br/>“优赚呗”用户服务和结算服务概要
                        <br/>•	一、“优赚呗”账户：指在甲方使用本服务时，乙方向甲方提供的用户唯一编号。甲方可自行设置密码，提交用户信息，并用以查询或计算甲方的款项收支。
                        <br/>•	二、“优赚呗”用户服务：是指入驻商家使用本系统，且约定所提供的“共享海报”服务由买方通过本系统集成的第三方支付网关以电子货币的方式支付到乙方第三方支付网关的账户，乙方第三方支付网关的账户在收到该款项后将交易货款记录到甲方的账户记录中，但实际由乙方代为收取该款项的一种服务。在甲方使用本服务时，除适用“优赚呗”用户服务的相关约定外，还将优先适用以下条款：
                        <br/>•	1、乙方为甲方“共享海报”的交易款系由甲方的交易对方通过第三方支付网关以电子货币付款的方式支付至乙方的第三方支付网关账户，通过乙方系统记录到甲方的“优赚呗”账户记录内。甲方理解并同意，在甲方的交易对方通过第三方支付网关将电子货币支付至乙方第三方支付网关账户的过程需要一定的时间，在第三方支付网关告知乙方已收到甲方的交易对方支付的交易款项后，乙方将向甲方的账户记录该笔交易款项。
                        <br/>•	2、乙方为甲方产生的交易货款系由买家通过第三方支付网关以电子货币付款的方式支付至乙方第三方支付网关账户，第三方支付网关会因此向甲方单独收取费用，甲方理解并同意，该费用是第三方支付网关基于其向甲方提供的支付服务所收取的费用，与乙方向甲方提供的本项服务无关。
                        <br/>•	3、甲方在选用本项服务作为交易支付方式后，该支付行为能否完成取决于甲方的交易对方是否选用第三方支付网关方式支付，在交易对方无法通过第三方支付网关支付时，乙方将提示甲方的交易对方重新选择乙方的其他支付方式。
                        <br/>•	三、“优赚呗”结算服务：即乙方向甲方提供款项结算的中介服务，其中包含：
                        <br/>•	1、款项支付：甲方可以要求乙方向其支付自己的款项。当甲方向乙方做出结算指示时，必须提供一个与甲方或甲方的公司名称相符的有效的中华人民共和国境内（不含港澳台）银行账户，乙方将于每个自然月的最后一个工作日，将相应的款项汇入甲方提供的有效银行账户（根据甲方提供的银行不同，会产生汇入时间上的差异）。除本条约定外，乙方不提供其他受领方式。
                        <br/>•	2、系统查询：乙方将对甲方在本系统中的所有操作进行记录，不论该操作之目的最终是否实现。甲方可以在本系统中实时查询其账户名下的交易记录，若甲方认为记录有误的，甲方可向乙方提出异议，乙方将向甲方提供乙方按照甲方的指示操作产生的收付款记录。并且甲方认同此记录为甲方交易记录的最终依据，不再对此有异议。另外，甲方理解并同意甲方最终收到款项的服务是由甲方提供的银行账户对应的银行提供的，甲方需向该银行请求查证。
                        <br/>•	3、款项专属：对通过甲方“优赚呗”账户收到的款项，乙方将予以妥善保管，除本协议另行规定外，不作任何其他非甲方指示的用途。乙方通过甲方的用户名和密码识别甲方的指示，请甲方妥善保管甲方的用户名和密码，对于因密码泄露所致的损失，由甲方自行承担。本服务所涉及到的任何款项只以人民币计结，不提供任何形式的外币兑换业务。
                        <br/>•	4、异常交易处理：甲方使用本服务时，可能由于银行本身系统问题、银行相关作业网络连线问题或其他不可抗拒因素，造成暂时无法提供本服务。
                        <br/>•	四、软件服务费：是指甲方使用本服务应向乙方支付的费用。
                        <br/>•	五、服务期：是指甲方支付软件服务费后，使用本服务的期限。
                        <br/>•	六、订购成功：是指甲方同意本协议内容、成功支付软件服务费，且在甲方的店铺后台显示“已订购‘优赚呗’商户服务”。
                        <br/>•	七、续费：已经订购过本服务，再一次付费订购的即为续费。
                        <br/> “优赚呗”账户
                        <br/>•	一、注册相关
                        <br/>•	（一）、在甲方注册“优赚呗”账户时，甲方需提供手机号码，并正确填写验证码及相关信息，方能成功注册。
                        <br/>•	（二）、甲方注册完成，取得乙方提供给甲方的“优赚呗”账户（以下简称该账户）并且支付软件服务费成功订购本服务后，方可使用本服务。且使用本服务时，甲方同意：
                        <br/>•	1、依本服务注册表之提示准确提供并在取得该账户后及时更新正确、最新及完整的资料。一旦乙方发现甲方提供的资料错误、不实、过时或不完整的，乙方有权暂停或终止向甲方提供部分或全部“优赚呗”服务，由此产生的任何直接或间接费用由甲方自行承担，乙方对此不承担任何责任。
                        <br/>•	2、因甲方未及时更新资料，导致本服务不能提供或提供时发生任何错误的，甲方不得将此作为取消交易的理由，甲方承担因此产生的一切后果，乙方不承担任何责任。
                        <br/>•	3、甲方应对其“优赚呗”账户负责，只有甲方或甲方指定的管理员可以使用甲方的“优赚呗”帐号。在甲方决定不再使用该账户时，甲方应将该账户下所对应的可用款项全部结算，并向乙方申请删除该账户。甲方同意，若甲方丧失全部或部分民事权利能力或民事行为能力，乙方有权根据有效法律文书（包括但不限于生效的法院判决、生效的遗嘱等）处置甲方的“优赚呗”账户相关的款项。
                        <br/>•	4、遵守本协议、甲乙双方签订的其他协议及其他在“优赚呗”官方网址（www.uzhuanbei.com）上发布的规则、公告。
                        <br/>•	（三）甲方注册完成，取得乙方提供给甲方的“优赚呗”账户（以下简称该账户）后，可以免费体验  天。体验期结束后，若甲方未支付软件服务费订购本服务的，甲方账户将停止使用；若甲方支付软件服务费成功订购本服务的，则在体验期满后甲方可继续使用本服务。
                        <br/>•	二、账户安全
                        <br/>•	甲方将对使用该账户及密码进行的一切操作及言论负完全的责任，因此甲方同意：
                        <br/>•	1、不向其他任何人泄露该账户及密码，亦不使用其他任何人的“优赚呗”账户及密码。
                        <br/>•	2、及时更新“优赚呗”账户的管理员权限，并且店铺下其他管理员的操作，视为甲方授权其进行管理。
                        <br/>•	3、如甲方发现有他人冒用或盗用甲方的账户及密码或任何其他未经合法授权之情形时，应立即修改帐号密码并妥善保管，或立即以有效方式（包括但不限于电话、邮件等方式）通知乙方，要求乙方暂停相关服务。如要求乙方暂停相关服务的，乙方将根据甲方的情况，暂停提供相关服务。但是，在乙方对甲方的请求采取行动所需的合理期限内，乙方对已执行的指令及(或)所导致的甲方的损失不承担任何责任。
                        <br/>•	4、因黑客行为或甲方的保管疏忽导致帐号非法使用，乙方概不承担任何责任。
                        <br/>“优赚呗”用户服务和结算使用规则
                        <br/>•	为有效保障甲方使用本服务的合法权益，甲方理解并同意接受以下规则：
                        <br/>•	一、一旦甲方使用本服务，甲方即允许乙方代理甲方及（或）甲方的公司在甲方及（或）甲方指定人符合指定条件或状态时，结算款项给甲方指定人。
                        <br/>•	二、乙方可通过以下两种方式接受来自甲方结算的指令：其一，甲方在“优赚呗”手机APP上依照本服务预设流程申请结算；其二，甲方通过甲方注册时作为该账户名称或者与该账户绑定的手机或其他专属于甲方的通讯工具（以下合称该手机）号码向本系统发送的信息（短信或电话等）回复。无论甲方通过以上两种方式中的任何一种向乙方发出指令，都是不可撤回或撤销的，且成为乙方代理甲方结算款项的唯一指令。但甲方向乙方发出结算指令前，甲方应已向乙方提供真实的身份信息和资质证明，且经乙方核查无误完成店铺认证，否则甲方向乙方申请提现的结算指令将会被系统自动拦截或无法提现。
                        <br/>•	三、甲方同意在甲方与第三方发生交易纠纷时，乙方无需征得甲方的同意，有权自行判断并决定将争议货款的全部或部分结算给交易一方或双方。
                        <br/>•	四、甲方在使用本服务过程中，本协议内容、网页上出现的关于结算操作的提示或乙方发送到其手机的信息（短信或电话等）内容是甲方使用本服务的相关规则，甲方使用本服务即表示甲方同意接受本服务的相关规则。乙方无须征得甲方的同意，有权单方修改本服务的相关规则，修改后的服务规则应以甲方使用服务时的页面提示（或发送到该手机的短信或电话等）为准。
                        <br/>•	五、乙方会以电子邮件（或发送到该手机的短信或电话等）方式通知甲方交易进展情况以及提示甲方进行下一步的操作，但乙方不保证甲方能够收到或者及时收到该邮件（或发送到该手机的短信或电话等），且不对此承担任何后果。因此，在交易过程中甲方应当及时登录到乙方网站查看和进行交易操作。因甲方没有及时查看和对交易状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失，乙方不负任何责任。
                        <br/>•	六、若甲方未完成注册过程成为“优赚呗”用户，他人无法通过本服务购买甲方提供的“共享海报”，直到甲方完成该账户的注册。
                        <br/>•	七、乙方会将与甲方“优赚呗”账户相关的资金，独立于乙方营运资金之外，且不会将该资金用于非甲方指示的用途，但本条第（十）项约定的除外。
                        <br/>•	八、乙方并非银行或其他金融机构，本服务也非金融业务，本协议项下的资金移转均通过银行来实现，理解并同意甲方的资金于流转途中的合理时间。
                        <br/>•	九、甲方完全承担甲方使用本服务期间由乙方保管或代理销售或结算的款项的货币贬值风险及可能的孳息损失。
                        <br/>•	十、甲方同意，基于运行和交易安全的需要，乙方可以暂时停止提供或者限制本服务部分功能，或提供新的功能，在任何功能减少、增加或者变化时，只要甲方仍然使用本服务，表示甲方仍然同意本协议或者变更后的协议。
                        <br/>•	十一、甲方不得将本服务用于非乙方许可的其他用途。
                        <br/>•	十二、交易风险
                        <br/>•	当甲方通过本服务进行各项交易或接受交易款项时，若甲方或交易对方未遵从本服务条款或网站说明、交易页面中之操作步骤，则乙方有权拒绝为甲方与交易对方提供相关服务，且乙方不承担损害赔偿责任。若发生上述状况，而款项已先行划付至甲方的“优赚呗”账户名下，甲方同意乙方有权直接自相关账户余额中扣回款项，并且甲方不享有要求乙方支付此笔款项之权利。此款项若已汇入甲方的银行账户，甲方同意乙方有向甲方事后索回之权利，因甲方的原因导致乙方事后追索的，甲方应当承担乙方合理的追索费用。
                        <br/>•	十三、软件服务费、服务期及续费、续期
                        <br/>•	1、甲方使用本服务前，应事先注册、开通“优赚呗”账户，并向乙方支付软件服务费。且甲方只能通过店铺余额向乙方支付软件服务费的方式，订购本服务。
                        <br/>•	2、甲方同意本协议并按本协议约定支付软件服务费以后，本服务即订购成功。一旦订购成功，甲方即可开始使用本服务。
                        <br/>•	3、甲方同意一旦甲方订购本服务支付软件服务费，“优赚呗”不因本协议的中止、终止或甲方单方面而退出将已支付的软件服务费退还给甲方。
                        <br/>•	4、甲方向乙方支付软件服务费人民币壹千贰百元整（￥1200），使用本服务的服务期为1年。如甲方是首次订购且不论是否在体验期内订购本服务，服务期均从甲方订购成功之日起开始计算。如甲方是续费订购本服务的，则服务期从甲方原先订购的本服务到期之日的次日起开始计算。
                        <br/>•	5、甲方应于服务期到期前续费，如甲方到期未续费的，甲方将于服务期到期日停止使用本服务。如甲方在到期前或到期当天续费的，新的服务期从原服务期到期的次日开始计算；若甲方在原服务期到期之后续费的，新的服务期于甲方续费完成之日起开始计算。
                        <br/>•	6、如甲方需要，乙方将开具项目为“软件服务费”的增值税普通发票。但甲方应向乙方提供如下信息：开票名称、纳税人识别号、地址、电话、开户行和帐号。
                        <br/>•	若需增值税专用发票的，甲方应事先和乙方说明，且除上述增值税普通发票需提供的信息外，还须提供以下材料并加盖甲方公章：企业营业执照副本复印件、税务登记证复印件、开户许可证复印件、一般纳税人资格证书复印件、增值税开票信息函。
                        <br/>•	7、如甲方需使用“优赚呗”平台上超出本服务中的其他的功能、工具等，甲方须额外支付相应的费用才能使用。
                        <br/>•	8、除上述软件服务费外，如交易对方使用第三方支付网关支付款项的，甲方同意乙方有权在交易对方支付货款后按照第三方支付网关或银行的规定直接扣除相关手续费用，但乙方有权随时对上述交易另行额外加收手续费（如乙方须加收手续费的，应提前在“优赚呗”平台社区以公告形式通知）。如第三方支付网关或银行提高或降低手续费用的，乙方亦有权提高或降低手续费用，但乙方应提前在“优赚呗”平台社区以公告形式进行通知。
                        <br/>•	9、乙方有权对“优赚呗”的收费进行调整，具体的收费方案以甲方使用本服务时“优赚呗”平台上所列之收费公告或甲方与乙方达成的其他书面协议为准；若在收费调整后甲方继续使用本服务的，表示甲方已完全知晓并接受乙方调整后的收费方案，也将遵循调整后的收费方案支付费用；若甲方不同意调整后的收费方案，甲方应停止使用本服务。
                        <br/>•	10、甲方使用本协议时，如获得乙方赠送的服务期，赠送的服务期内甲方的行为仍遵守本协议的相关约定。
                        <br/>“优赚呗”用户服务和结算服务使用限制
                        <br/>•	一、甲方在使用本服务时应遵守中华人民共和国相关法律法规，以及甲方所在国家或地区之法令及相关国际惯例，不将本服务用于任何非法目的（包括用于禁止或限制交易物品的交易），也不以任何非法方式使用本服务。
                        <br/>•	二、甲方同意将不会利用本服务进行任何违法或不正当的活动，如有此类行为乙方有权直接作删除内容等处理，并且乙方对此类行为不承担任何责任，由甲方自行承担由此引起的一切责任。若有导致乙方或乙方雇员受损的，甲方亦应对此承担赔偿责任。此类行为包括但不限于下列行为∶
                        <br/>•	1、侵害他人名誉权、隐私权、商业秘密、商标权、著作权、专利权等合法权益；
                        <br/>•	2、违反依法定或约定之保密义务；
                        <br/>•	3、冒用他人名义使用本服务；
                        <br/>•	4、从事不法交易行为，如洗钱、贩卖枪支、毒品、禁药、盗版软件、黄色淫秽物品、及其他乙方认为不得使用本服务进行交易的物品等。
                        <br/>•	5、提供赌博资讯或以任何方式引诱他人参与赌博。
                        <br/>•	6、非法使用他人银行账户（包括信用卡账户）或无效银行帐号（包括信用卡账户）交易。
                        <br/>•	7、违反《银行卡业务管理办法》使用银行卡，或利用信用卡套取现金（以下简称套现）。
                        <br/>•	8、进行与甲方或交易对方宣称的交易内容不符的交易，或不真实的交易。
                        <br/>•	9、从事任何可能含有电脑病毒或是可能侵害本服务系统、资料之行为。
                        <br/>•	10、含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其他内容的；
                        <br/>•	11、其他乙方有正当理由认为不适当之行为。
                        <br/>违约责任
                        <br/>•	一、因甲方的过错导致的任何损失由甲方自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码，密码被他人破解，甲方使用的计算机被他人侵入。
                        <br/>•	二、因甲方未及时更新资料，导致本服务不能提供或提供时发生任何错误，甲方不得将此作为取消交易、拒绝付款的理由，甲方须自行承担因此产生的一切后果，乙方不承担任何责任。
                        <br/>•	三、如乙方发现甲方存在欺诈、套现等违反法律、法规规定、本协议或相关服务条款或存在乙方认为不适当的行为，乙方有权根据情节严重程度，对甲方处以警告、限制或禁止使用部分或全部功能、封禁甲方店铺账户等处罚；由此导致或产生第三方主张的任何索赔、要求或损失，须由甲方自行承担一切损失，与乙方无关；如乙方因此也遭受损失的，甲方也应当一并赔偿。
                        <br/>•	四、即使本服务终止，甲方仍应对甲方使用本服务期间的一切行为承担可能的违约或损害赔偿责任。
                        <br/>免责声明
                        <br/>•	一、甲方确保其所输入的甲方的资料无误，如果因资料错误造成乙方于异常交易发生时，无法及时通知甲方相关交易后续处理方式的，乙方不承担任何损害赔偿责任。
                        <br/>•	二、甲方理解并同意，乙方不对因下述任一情况导致的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失的损害赔偿：
                        <br/>•	1、乙方有权基于单方判断，包含但不限于乙方认为甲方已经违反本协议的明文规定及精神，暂停、中断或终止向甲方提供本服务或其任何部分，并移除甲方的资料。
                        <br/>•	2、乙方在发现交易异常或甲方有违反法律规定或本协议约定的行为时，有权不经通知先行暂停或终止该账户的使用（包括但不限于对该账户名下的款项和在途交易采取取消交易、调账等限制措施）（但乙方应在采取上述措施后以短信或“优赚呗”信息推送等形式通知甲方，如因系统故障或短信通道故障等原因导致甲方未收到通知的除外），并拒绝甲方使用本服务之部分或全部功能。
                        <br/>•	3、在必要时，乙方无需事先通知即可终止提供本服务，并暂停、关闭或删除该账户及甲方帐号中所有相关资料及档案（但乙方应在采取上述措施后以短信或“优赚呗”信息推送等形式通知甲方，如因系统故障或短信通道故障等原因导致甲方未收到通知的除外），并将甲方滞留在该账户的全部合法资金退回到甲方的银行账户。
                        <br/>•	三、如因乙方根据本协议声明与承诺中的第二条对本协议内容进行单方面变更，甲方不同意变更后的协议内容停止使用本服务，双方终止合作的，乙方不承担任何损害赔偿责任。
                        <br/>•	四、系统中断或故障
                        <br/>•	系统因下列状况无法正常运作，导致甲方无法使用各项服务的，乙方不承担损害赔偿责任，该状况包括但不限于：
                        <br/>•	1、乙方在“优赚呗”平台公告之系统停机维护期间。
                        <br/>•	2、电信设备出现故障不能进行数据传输的。
                        <br/>•	3、因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成乙方系统障碍不能执行业务的。
                        <br/>•	4、由于黑客攻击、电信部门技术调整或故障、网站升级、银行方面的问题等原因而造成的服务中断或者延迟。
                        <br/>•	五、对下列情形，乙方不承担任何责任：
                        <br/>•	1、并非由于乙方的故意而导致本服务未能提供的；
                        <br/>•	2、由于甲方的故意或过失导致甲方及/或任何第三方遭受损失的；
                        <br/>•	3、因甲方未及时续费，导致本服务不能提供或提供时发生任何错误，甲方须自行承担因此产生的一切后果，乙方不承担任何责任。
                        <br/> 终止服务
                        <br/>•	一、如甲方需要删除自己的“优赚呗”账户的，应先向乙方申请删除，经乙方审核同意后方可删除。乙方同意删除该账户的，即表明乙方与甲方之间的协议解除，但甲方仍应对其使用本服务期间的行为承担违约或损害赔偿责任。
                        <br/>•	二、如果乙方发现或收到他人举报或投诉甲方违反本协议约定的，乙方有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对甲方处以包括但不限于警告、限制或禁止使用部分或全部功能、封禁直至删除用户帐号的处罚。
                        <br/>•	三、在下列情况下，乙方可以通过封禁或删除甲方账户的方式终止服务：
                        <br/>•	（1）因甲方违反本服务协议相关规定，被乙方终止提供服务的，后甲方再一次直接或间接或以他人名义注册为乙方用户的，乙方有权再次单方面终止向甲方提供服务；
                        <br/>•	（2）一旦乙方发现甲方注册数据中主要内容（身份信息、联系方式等）是虚假的，乙方有权随时终止向甲方提供服务；
                        <br/>•	（3）本服务协议更新时，甲方明示不愿接受新的服务协议的；
                        <br/>•	（4）服务期到期，甲方未续费的；
                        <br/>•	（5）甲方存在本协议其他条款约定的违约事项，终止向甲方提供本服务的情形的；
                        <br/>•	（6）其他乙方认为需终止服务的情况。
                        <br/>•	四、服务中断、终止之前甲方交易行为的处理因甲方违反法律法规或者违反本服务协议规定而致使乙方中断、终止对甲方提供服务的。甲方已经与交易对方就具体交易达成一致，乙方可以不删除该项交易，但乙方有权在中断、终止服务的同时将甲方被中断或终止服务的情况通知甲方的交易对方。
                        <br/>商标、知识产权的保护
                        <br/>•	一、乙方产品及相关网站上由乙方上传、制作、拥有的所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，均由乙方或其关联公司依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。如甲方在乙方产品或网站上上传由甲方自行制作、拥有的内容，包括但不限于图片、资讯、资料、海报设计等，均由甲方或其关联公司依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等；但如因甲方上传的由其自行制作、拥有的内容涉及侵犯乙方或其他任何第三方的合法权益的，甲方应自行对其侵权行为产生的纠纷进行处理，并对其侵权行为承担法律责任，且就由此给乙方造成的损失（包括但不限于乙方声誉的影响、乙方由此承担的连带责任（如有）等）进行赔偿。
                        <br/>•	二、非经乙方或其关联公司书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表在本网站上程序或内容（仅限于由乙方上传、制作、拥有的所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计等）；如甲方需使用著作权非乙方所有的内容的，甲方应获得具体内容的著作权所有者的合法授权才能使用，如因甲方私自使用非自己所有的、且未经他人合法授权的著作、图片、档案、资讯、资料等内容的，由甲方自行承担责任，包括但不限于甲方自行对其侵权行为产生的纠纷进行处理，并对其侵权行为承担法律责任，且就由此给乙方造成的损失（包括但不限于乙方声誉的影响、乙方由此承担的连带责任（如有）等）进行赔偿。
                        <br/>•	三、尊重知识产权是甲方应尽的义务，如有违反，甲方应承担损害赔偿责任。
                        <br/>其他
                        <br/>•	一、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，没有相关法律规定的，参照通用国际商业惯例和（或）行业惯例。
                        <br/>•	二、如本协议的任何条款被视作无效或无法执行，则上述条款可被分离，其余条款则仍具有法律效力。
                        <br/>•	三、本协议任何一方于另一方过失或违约时放弃本协议规定的权利的，不得视为其对一方的其他或以后同类之过失或违约行为弃权。
                        <br/>•	四、本协议自甲方同意并点击确认本协议内容之日起生效。且本协议的扫描件、电子合同视同原件，与原件具有同等之法律效力。
                        <br/>•	五、双方约定，一旦由本协议产生争议，广东省深圳市福田区人民法院为管辖法院。
                        <br/>•	六、本协议最终解释权及修订权归乙方所有。
                        <br/>•	七、本协议自甲方在订购本服务时勾选同意本协议内容点击确认订购且成功订购之日为本协议生效之日，且该点击确认行为与甲方加盖公章或签字的行为具有相同法律效力。双方签订本线上协议或其他在线协议后，甲方因内部管理等原因需要签订纸质协议进行确认或存档的，甲方可在成功订购后通过店铺后台设置-服务协议中生成电子协议，自行下载打印后盖章、签字，且通过此方式签署的纸质协议视为双方均同意协议的内容并确认签署，但不能因此视为双方存在两个协议关系，纸质协议的内容必须与在线签署的协议内容一致，协议的生效与履行依照在线签署的协议约定执行，在线签署的协议内容与纸质协议的约定不一致的，以前者的约定为准。纸质协议自甲方和乙方签字或盖章之日起生效。

                    </div>
                </Modal>


            </Container>
        );
    }
}

const RegFormWrapper = createForm()(Reg);
//组件名和组件初始化状态
export const stateKey = "login";
export const initialState = {

};

//注入state和actions
const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendVerifyCode : actions.sendVerifyCode,
    reg:actions.reg
}, dispatch);
export default connect(null, mapDispatchToProps)(RegFormWrapper);

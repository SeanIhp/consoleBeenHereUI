<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.loginTitle{
    margin-bottom: 15px;
}
</style>
<template>
        <Layout class="layout">
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <!-- <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem> -->
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '20px 0'}">
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem>注册</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="min-height:400px; margin-top:50px;">
                        <table width="100%">
                            <tr>
                                <td>

                                </td>
                                <td width="40%">
                                    <H3 class="loginTitle">Who am I?</H3>
                                    <Form ref="formField" :model="formField" :rules="ruleInline">
                                        <FormItem prop="username">
                                            <Input type="text" v-model="formField.username" placeholder="帐号">
                                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                        <FormItem prop="password">
                                            <Input type="password" v-model="formField.password" placeholder="密码">
                                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                        <FormItem prop="repassword">
                                            <Input type="password" v-model="formField.repassword" placeholder="再输入一次">
                                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                        <FormItem prop="mailbox">
                                            <Input type="email" v-model="formField.mailbox" placeholder="电子邮箱">
                                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formField')">注册</Button>
                                        </FormItem>
                                    </Form>
                                </td>
                            </tr>
                        </table>
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
</template>
<script>
    import Efsetting from '@/libs/efview/efsetting';
    import { request } from '@/libs/efview/httpRequest';
    
    export default {
        data () {
            return {
                formField: {
                    username: '',
                    password: '',
                    repassword: '',
                    mailbox: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: 'Please fill in the username', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ],
                    repassword: [
                        { required: true, message: 'Please fill in the repassword.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The repassword length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        console.log('this.$refs[formName]: ', this.$refs[formName], this.$data);
                        let param = {
                            username: this.$data.formField.username,
                            password: this.$data.formField.password,
                            mailbox: this.$data.formField.mailbox
                        };
                        let res = request({
                            method: 'post',
                            url: Efsetting.account.resources + '/regist',
                            data: param
                        }, function(resData){    
                            let res = resData.data[Efsetting.account.response];
                            let resCode = resData.returncode;
                            if(resCode=='0'){
                                console.log("login aaa： ", param);
                            }else{
                                console.warn("login xxx： ", param);
                            }
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            }
        }
    }
</script>

<template>
    <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="登录">
            <div id="sign-in-tab">
                <a-input v-model:value="phone" placeholder="用户名"></a-input>
                <div id="validationContainer">
                    <a-input v-model:value="validationNumber" placeholder="密码"></a-input>
                </div>
                <div id="privacyAgreement">
                    登录代表同意<a-button @click="goPrivacyAgreement" type="link">《用户隐私协议》</a-button>
                </div>
                <div id="loginContainer">
                    <green-button @click="logIn">登录</green-button>
                </div>
                <div id="thirdPartySignIn">
                    <div id="thirdPartyDevider">第三方登录</div>
                    <div id="thirdPartyIcons">
                        <qq-outlined id="qqIcon" />
                        <wechat-outlined id="wechatIcon" />
                        <weibo-circle-outlined id="weiboIcon" />
                    </div>
                </div>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
            <div id="sign-in-tab">
                <a-input v-model:value="phone" placeholder="用户名"></a-input>
                <div id="validationContainer">
                    <a-input v-model:value="validationNumber" placeholder="密码"></a-input>
                </div>
                <div id="privacyAgreement">
                    登录代表同意<a-button @click="goPrivacyAgreement" type="link">《用户隐私协议》</a-button>
                </div>
                <div id="loginContainer">
                    <green-button @click="register">注册并登录</green-button>
                </div>
                <div id="thirdPartySignIn">
                    <div id="thirdPartyDevider">第三方登录</div>
                    <div id="thirdPartyIcons">
                        <qq-outlined id="qqIcon" />
                        <wechat-outlined id="wechatIcon" />
                        <weibo-circle-outlined id="weiboIcon" />
                    </div>
                </div>
            </div>
        </a-tab-pane>
    </a-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { QqOutlined, WechatOutlined, WeiboCircleOutlined } from '@ant-design/icons-vue'
import GreenButton from '@/components/GreenButton.vue'
import apis from '@/tools/apis'
import { message } from 'ant-design-vue';
let activeKey = ref('1');
let phone = ref('');
let validationNumber = ref('');
const router = useRouter();
const goPrivacyAgreement = () => {
    router.push('PrivacyAgreement')
}
const logIn = async () => {
    const result = await apis.login({
        username: phone.value,
        password: validationNumber.value
    })
    if (result === 'success') {
        message.success({ content: '登录成功' })
        router.push("DashBoard/Fer")
    } else {
        message.error(result)
    }
}
const register = async () => {
    const result = await apis.login({
        username: phone.value,
        password: validationNumber.value
    }, true)
    if (result === 'success') {
        message.success({ content: '登录成功' })
        router.push("DashBoard/Fer")
    } else {
        message.error(result)
    }
}
</script>

<style scoped lang="less">
#sign-in-tab {
    padding: 24px 64px;

    #validationContainer {
        position: relative;

        button {
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 20px;
            background: #fff;
            color: rgb(var(--green-6));
            border-color: rgb(var(--green-6));
        }

        .disabled {
            color: #00000050 !important;
            border-color: #00000050 !important;
        }

        .ant-btn:hover,
        .ant-btn:focus,
        .ant-btn:active {
            text-decoration: none;
            background: #fff;
            color: rgb(var(--green-6));
            border-color: rgb(var(--green-6));
        }
    }

    #privacyAgreement {
        text-align: center;

        button {
            padding: 0;
            color: rgb(var(--green-6));
        }
    }

    #loginContainer {
        button {
            width: 100%;
            height: 60px;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            margin-top: 16px;
            border-radius: 30px;
            border-color: rgb(var(--green-6));
            background: rgb(var(--green-6));
        }
    }

    #thirdPartySignIn {
        text-align: center;
        margin-top: 24px;

        #thirdPartyDevider {
            font-weight: 600;
        }

        #thirdPartyDevider::after,
        #thirdPartyDevider::before {
            margin: 0 8px;
            content: "";
            display: inline-block;
            position: relative;
            bottom: 0.4em;
            border-color: rgb(var(--green-3));
            border-style: none none solid;
            border-width: 0.2em;
            width: 108px;
        }

        #thirdPartyIcons {
            font-size: 36px;
            text-align: center;

            span {
                display: inline-block;
                margin: 0 24px;
            }

            #qqIcon {
                color: #2979FF
            }

            #wechatIcon {
                color: #01C666
            }

            #weiboIcon {
                color: #F96654
            }
        }
    }

    .ant-input {
        margin: 8px;
        border-style: none none solid;
        border-radius: 0;
        margin-bottom: 32px;
    }

    .ant-input:focus,
    .ant-input:hover {
        box-shadow: 0px 3px 3px -2px rgb(var(--green-6)) !important;
        border-color: rgba(var(--green-6), 0.5);
    }


}
</style>

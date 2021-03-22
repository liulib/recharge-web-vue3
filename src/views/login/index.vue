<template>
    <div class="loginBox">
        <h1 class="logo">LOGO</h1>
        <div class="formBox">
            <a-input
                class="loginInput"
                v-model:value="reqParams.username"
                placeholder="请输入用户名"
            >
            </a-input>
            <a-input
                class="loginInput"
                v-model:value="reqParams.password"
                type="password"
                autocomplete="new-password"
                placeholder="请输入密码"
            >
            </a-input>
            <div class="rememberCheck">
                <a-checkbox v-model:value="rememberFlag">
                    <span>记住密码</span>
                </a-checkbox>
            </div>
            <a-button
                class="loginButton"
                type="primary"
                html-type="submit"
                :loading="loading"
                @click.prevent="handleSubmit"
            >
                登录
            </a-button>
        </div>
        <div class="rightsInfo">
            <p>
                &copy;2021 湖南春风科技. All Rights Reserved.<a
                    href="https://beian.miit.gov.cn"
                    >湘ICP备2021000939号-1</a
                >
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';

export default defineComponent({
    setup() {
        const state = reactive({
            loading: false,
            rememberFlag: false,
            reqParams: {
                username: '',
                password: ''
            }
        });
        const handleSubmit = () => {
            const { username, password } = state.reqParams;
            if (username.trim() == '' || password.trim() == '')
                return message.warning('用户名或密码不能为空！');
            state.loading = true;
        };
        return { ...toRefs(state), handleSubmit };
    }
});
</script>

<style lang="scss" scoped>
.loginBox {
    width: 100vw;
    height: 100vh;
    background: #021132;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
        color: #38a5d2;
        font-size: 30px;
    }
    .formBox {
        width: 300px;
        .loginInput {
            margin-bottom: 10px;
        }
        .rememberCheck {
            text-align: right;
            margin-bottom: 10px;
            span {
                color: #fff;
            }
        }
        .loginButton {
            width: 100%;
        }
    }
    .rightsInfo {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 10;
        text-align: center;
        font-size: 14px;
        color: #fff;
        // background: red;
        margin-bottom: 5px;
        a {
            color: #fff;
            margin-left: 10px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
<template>
    <div class="loginBox">
        <h1 class="logo">LOGO</h1>
        <a-form class="formBox" :wrapper-col="wrapperCol" :model="modelRef">
            <a-form-item v-bind="validateInfos.username">
                <a-input
                    v-model:value="modelRef.username"
                    placeholder="Username"
                >
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
                <a-input
                    v-model:value="modelRef.password"
                    type="password"
                    placeholder="Password"
                >
                </a-input>
            </a-form-item>
            <a-form-item class="rememberCheck">
                <a-checkbox v-model:checked="rememberFlag">
                    <span>记住密码</span>
                </a-checkbox></a-form-item
            >
            <a-form-item>
                <a-button
                    block
                    type="primary"
                    html-type="submit"
                    :loading="loading"
                    @click="handleSubmit"
                >
                    登 录
                </a-button>
            </a-form-item>
        </a-form>
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
import { useForm } from '@ant-design-vue/use';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { message } from 'ant-design-vue';
import { UserActionTypes } from '@/store/modules/user/action-types';

import { checkUsername, checkPassword } from './validate';
import { LoginReq } from '@/apis/user/types';
import { storage } from '@/utils/Storage';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        // 获取localStorage中的登录信息
        const cacheData: LoginReq = storage.get('loginInfo');

        const state = reactive({
            loading: false,
            rememberFlag: cacheData ? true : false,
            modelRef: cacheData
                ? cacheData
                : { username: 'liulib', password: '11111111' },
            rulesRef: {
                username: [
                    {
                        validator: checkUsername,
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: checkPassword,
                        trigger: 'blur'
                    }
                ]
            }
        });

        const { validate, validateInfos } = useForm(
            state.modelRef,
            state.rulesRef
        );

        /**
         * @description: 点击登录事件
         */
        const handleSubmit = () => {
            validate()
                .then(async () => {
                    // 开启按钮加载动画
                    state.loading = true;
                    // 发送action
                    try {
                        await store
                            .dispatch(UserActionTypes.Login, state.modelRef)
                            .finally(() => {
                                // 请求完毕关闭加载动画
                                state.loading = false;
                            });
                        message.success('登录成功！');

                        // 如果需要记住密码则将信息存储到localStorage
                        // TODO:改成加密存储
                        if (state.rememberFlag) {
                            storage.set('loginInfo', state.modelRef);
                        }

                        // 如果是重定向过来的则跳回到之前的页面
                        const toPath = decodeURIComponent(
                            (route.query?.redirect || '/') as string
                        );

                        router.replace(toPath).then(_ => {
                            if (route.name == 'login') {
                                router.replace('/');
                            }
                        });
                    } catch (error) {
                        message.error(error.message);
                    }
                })
                .catch(err => {
                    message.error(err);
                });
        };

        return {
            wrapperCol: { span: 24 },
            ...toRefs(state),
            handleSubmit,
            validateInfos
        };
    }
});
</script>

<style lang="less" scoped>
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
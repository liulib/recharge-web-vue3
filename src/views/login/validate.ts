import { RuleObject } from 'ant-design-vue/es/form/interface';

export const checkUsername = async (rule: RuleObject, value: string) => {
    if (!value) {
        return Promise.reject('请输入用户名');
    } else {
        if (value.length < 6 || value.length > 20) {
            return Promise.reject('用户名长度为6-20位');
        } else {
            return Promise.resolve();
        }
    }
};

export const checkPassword = async (rule: RuleObject, value: string) => {
    if (!value) {
        return Promise.reject('请输入密码');
    } else {
        if (value.length < 6 || value.length > 20) {
            return Promise.reject('密码长度为6-20位');
        } else {
            return Promise.resolve();
        }
    }
};

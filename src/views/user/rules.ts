import { checkPassword } from '@/views/login/validate';

export const addRules = {
    password: [
        {
            validator: checkPassword,
            trigger: 'blur'
        }
    ]
};

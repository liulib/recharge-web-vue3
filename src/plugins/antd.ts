import type { App } from 'vue';

import {
    Modal,
    Table,
    Menu,
    Input,
    Form,
    Card,
    Checkbox,
    Radio,
    Button,
    Layout,
    Tabs,
    Dropdown,
    Breadcrumb,
    Tag,
    Select,
    Tree
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
    app.use(Form)
        .use(Input)
        .use(Modal)
        .use(Table)
        .use(Menu)
        .use(Card)
        .use(Checkbox)
        .use(Radio)
        .use(Button)
        .use(Layout)
        .use(Dropdown)
        .use(Tabs)
        .use(Breadcrumb)
        .use(Tag)
        .use(Select)
        .use(Tree);
}

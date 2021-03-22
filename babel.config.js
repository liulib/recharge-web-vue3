module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'import',
            {
                libraryName: 'ant-design-vue',
                libraryDirectory: 'es',
                style: 'css'
            } //style:css->识别css文件，style:true->识别less文件
        ]
    ]
};

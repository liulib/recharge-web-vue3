/**
 * @description: 将parentName保存为一个对象
 * @param {Array} data 必填|从接口获取到的包含所有分类的一维数组
 * @param {String} name 选填|name对应的属性，默认为name（比如用户列表里为userName）
 */
export const parseParent = function (data, name = 'name') {
    var tmp = {};
    for (let i = 0; i < data.length; i++) {
        tmp[data[i].id] = data[i][name];
    }
    tmp['0'] = '----';
    return tmp;
};

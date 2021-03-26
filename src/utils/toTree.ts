/**
 * 将一维数据转化为树形结构
 * @param { Array } odArr 必填|需要转化的数据
 * @param { String } refKeyName 选填|筛选的条件1 | 即：子数据id | 默认值：id
 * @param { String } parentId 选填|筛选的条件2|即：父数据id | 默认值：parentId
 * @param { Boolean } openLevel 选填|是否添加level字段| 默认值：true
 * @param { String } childrenKeyName 选填|子元素属性名| 默认值：children
 * @param { String } parentFlag 选填|顶级元素的默认parentId|即：如果为这个值就是顶级元素 | 默认值：0
 */
export const toTree = <T>(
    odArr,
    {
        refKeyName = 'id',
        parentId = 'parentId',
        openLevel = true,
        childrenKeyName = 'children',
        parentFlag = '0'
    } = {}
) => {
    let temMap: T[] = [], // 存储树形结构
        nonTopMap: any[] = [], // 存储不满足存入temMap的所有数据
        level = 1; // 描述数据层级
    if (!Array.isArray(odArr)) return [];

    // 找出所有顶级数据
    odArr.forEach(e => {
        if (e[parentId] == parentFlag) {
            openLevel ? (e.level = level) : null;
            temMap.push(e);
        } else {
            nonTopMap.push(e);
        }
    });

    // 调用内部递归函数
    recursion(temMap, level / level + 1);

    /**
     * 递归函数
     * @param { Array } 必填|所有的顶级数据
     * @param { Number } 必填|数据的层级描述
     */
    function recursion(temMap, level) {
        for (let i = 0; i < temMap.length; i++) {
            let subNodes: any[] = [], //存储能匹配到父级的数据
                transition: any[] = []; //存储未匹配到父级的数据

            // 一级数组中的`parentId`字段与顶级数据中的`id`字段进行对比
            // 符合条件的数据存入变量subNodes
            nonTopMap.forEach(e => {
                if (e.parentId == temMap[i][refKeyName]) {
                    subNodes.push(e);
                } else {
                    transition.push(e);
                }
            });

            // 将未找到父元素的数据赋给nonTopMap变量用于下一次遍历
            nonTopMap = transition;

            // 验证数据为空则不添加`childrenKeyName`字段
            if (subNodes.length > 0) {
                subNodes.forEach(e => (openLevel ? (e.level = level) : null));

                // 将符合条件是数据插入对应的父级元素中
                temMap[i][childrenKeyName] = subNodes;
                recursion(subNodes, level + 1);
            }
        }
    }
    // 返回树形结构数据
    return temMap;
};

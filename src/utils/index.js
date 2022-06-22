// 商品管理-商品管理-公共数据
export const goodsCategoryOptions = [
    {
      id: "1",
      name: "烟酒",
    },
    {
      id: "2",
      name: "饮品",
    },
    {
      id: "3",
      name: "干货",
    },
    {
      id: "4",
      name: "果蔬/生鲜",
    },
    {
      id: "5",
      name: "调味品",
    },
    {
      id: "6",
      name: "百货类",
    },
    {
      id: "7",
      name: "日用品",
    },
]

export function categoryName(id) {
    let goods = {};
    goodsCategoryOptions.forEach(item => {
        goods[item.id] = item.name
    });
    return goods[id]
}

// export function goodsCategoryFn () {
//     return goodsCategoryOptions.reduce((prev, item) => {
//         if (prev) {
//             prev[item.id] = item.name
//         }
//         return prev
//     }, {})
// }

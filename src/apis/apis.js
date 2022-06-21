// 所有请求封装的文件
import axios from "axios";

// 服务器IP
const IP = "http://localhost:3000"

// 登录请求
export function login(acc, pwd) {
    return axios.post(IP + "/login", {
        acc,    // 账号
        pwd,    // 密码
    })
}

// 商品管理-商品管理（显示商品表格）
export function commodity(curpage, row) {
    return axios.get(IP + "/main/commodity", {
        params: {
            curpage,  // 当前请求的页数
            row,       // 每页显示的行数
        }
    })
}

// 商品管理-商品管理-编辑商品
export function changeCommodity(params) {
    return axios.get(IP + "/main/changeCommodity", {
        params
    })
}

// 商品管理-商品管理-删除商品
export function removeCommodity(barCode) {
    return axios.get(IP + "/main/removeCommodity", {
        params: {
            barCode,  // 条形码
        }
    })
}

// 商品管理-添加商品
export function addcommodity(name, category, promotion, salePrice, storenum, vipDiscount, barCode) {
    /* 
    barCode     // 条形码
    name          // 商品名
    category    // 所属分类
    promotion    // 是否促销
    salePrice   // 售价
    storenum    // 库存
    vipDiscount  // 会员优惠
    */
    return axios.get(IP + "/main/addcommodity", {
        params: {
            name, category, promotion, salePrice, storenum, vipDiscount, barCode
        }
    })
}

// 账号管理-账号管理
export function account(curpage, row) {
    return axios.get(IP + '/main/account', {
        params: {
            curpage, // 当前请求的页数
            row // 每页显示行数
        }
    })
}

// 账号管理-删除账号
export function removeaccount(id) {
    return axios.get(IP + '/main/removeaccount', {
        params: {
            id  // 用户id
        }
    })
}

// 账号管理-修改密码
export function changepwd(id, newpwd, pwd) {
    return axios.post(IP + "/main/changepwd", {
        id,         // 用户id
        newpwd,     // 用户的新密码
        pwd,        // 用户原密码
    })
}

// 账号管理-添加账号
export function addaccount(params) {
    return axios.post(IP + "/main/addaccount", params)
}
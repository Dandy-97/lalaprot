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

// 修改密码
export function changepwd(id, newpwd, pwd) {
    return axios.post(IP + "/main/changepwd", {
        id,         // 用户id
        newpwd,     // 用户的新密码
        pwd,        // 用户原密码
    })
}
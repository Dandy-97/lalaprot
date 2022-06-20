<template>
  <div class="login" @keydown.13="submitForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>lalapaot商超管理系统</h3>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="myForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="acc">
          <el-input
            type="text"
            v-model="ruleForm.acc"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pwd">
          <el-input
            type="password"
            v-model="ruleForm.pwd"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <div class="btn">
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/* ES6语法 引入axios */
import { login } from "@/apis/apis.js";

export default {
  data() {
    // 定义表单验证规则
    // 用户名
    var validateAcc = (rule, value, callback) => {
      /* 定义正则 */
      var reg = /^\w{2,10}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("用户名只能是2~10数字字母下划线!"));
      }
    };
    // 密码
    var validatePwd = (rule, value, callback) => {
      /* 定义正则 */
      var reg = /^\w{2,10}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("密码只能是2~10数字字母下划线!"));
      }
    };
    return {
      ruleForm: {
        acc: "",
        pwd: "",
      },
      rules: {
        acc: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateAcc, trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录按钮-验证函数
    submitForm() {
      // 对整个表单进行校验的方法
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          /* 调用登录接口 */
          login(this.ruleForm.acc, this.ruleForm.pwd).then((res) => {
            // 传入参数给后台进行判定
            if ((res.data.msg == "登录成功")) {
              localStorage.setItem("id", res.data.id);
              this.$message({
                message: "恭喜你，登录成功",
                type: "success",
              });
              // 登录成功获取ID值，保存在浏览器中
              // 登录成功进行延时页面跳转
              setTimeout(() => {
                this.$router.push("/main/commodity");
              }, 1000);
            }else{
              this.$message.error("用户名或密码错误");
            }
          });
        } else {
          this.$message.error("请输入正确用户名和密码");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: url(../assets/imgs/banner.png) no-repeat center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 500px;
    height: 300px;
    /* 背景色透明 */
    background-color: transparent;
    .myForm {
      padding: 0 80px;
      .btn {
        display: flex;
        justify-content: center;
        .el-button--primary {
          width: 100px;
        }
      }
    }
  }
}
</style>
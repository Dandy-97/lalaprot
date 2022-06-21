<template>
  <div class="changepwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>密码修改</h3>
      </div>
      <!-- 表单 -->
      <div class="pwd-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="myForm"
        >
          <el-form-item label="原密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="ruleForm.newpwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwdex">
            <el-input v-model="ruleForm.pwdex" show-password></el-input>
          </el-form-item>
          <div class="pwd-btn">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >修改</el-button
              >
              <el-button type="primary" @click="resetForm('ruleForm')"
                >重置</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
/* 引入接口 */
import { changepwd } from "@/apis/apis.js";

export default {
  data() {
    // 定义表单验证规则
    // 密码验证
    var validatePwd = (rule, value, callback) => {
      /* 定义正则 */
      var reg = /^\w{2,10}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("密码只能是2~10数字字母下划线!"));
      }
    };
    // 确认新密码验证
    var validatePwdex = (rule, value, callback) => {
      if (value == this.ruleForm.newpwd) {
        callback();
      } else {
        callback(new Error("两次输入密码不一致"));
      }
    };
    return {
      ruleForm: {
        pwd: "", // 旧密码
        newpwd: "", // 新密码
        pwdex: "", // 确认新密码
      },
      rules: {
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" },
        ],
        newpwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" },
        ],
        pwdex: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validatePwdex, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /* 密码修改按钮 */
    submitForm(myForm) {
      this.$refs[myForm].validate((vilid) => {
        if (vilid) {
          changepwd(
            localStorage.getItem("id"),
            this.ruleForm.newpwd,
            this.ruleForm.pwd
          ).then((res) => {
            if (res.data == "ok") {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
              });
              // 成功进行登录页跳转
              setTimeout(() => {
                this.$router.replace("/");
              }, 2000);
            } else if (res.data == "pwderror") {
              // 当原密码错误给出提示
              this.$notify.error({
                title: "错误",
                message: "原密码错误",
              });
            } else {
              this.$notify.error({
                title: "错误",
                message: "修改失败,请重新修改",
              });
            }
          });
        }
      });
    },
    /* 重置表单按钮 用 resetFields 方法*/
    resetForm(myForm) {
      this.$refs[myForm].resetFields(); // 清空表单所有的值
    },
  },
};
</script>

<style lang="less" scoped>
.changepwd {
  width: 100%;
  height: 100%;
  .pwd-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .myForm {
      width: 35%;
      min-width: 400px;
      .pwd-btn {
        display: flex;
        justify-content: center;
        padding-top: 30px;
      }
    }
  }
}
</style>
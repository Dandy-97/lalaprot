<template>
  <div class="addaccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加管理员</span>
      </div>
      <!-- 登录表单 -->
      <div class="addaccount-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="myForm"
        >
          <el-form-item label="用户名" prop="acc">
            <!-- 数字字母下划线 8-16  -->
            <el-input v-model="ruleForm.acc"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <!-- 数字字母下划线 8-16  -->
            <el-input v-model="ruleForm.pwd" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwdex">
            <!-- 数字字母下划线 8-16  -->
            <el-input
              type="password"
              v-model="ruleForm.pwdex"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 下拉选择框 -->
          <el-form-item label="选择权限" prop="usergroup">
            <el-select v-model="ruleForm.usergroup" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div class="addaccount-btn">
            <el-form-item>
              <el-button type="primary" @click="submitForm()"
                >添加账号</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addaccount } from "@/apis/apis";
export default {
  data() {
    // 密码验证规则
    var validatePwd = (rule, value, callback) => {
      // 正则
      var reg = /^\w{2,10}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("密码只能是2~10数字字母下划线!"));
      }
    };
    // 确认密码验证规则
    var validatePwdEx = (rule, value, callback) => {
      if (value === this.ruleForm.pwd) {
        callback();
      } else {
        callback(new Error("两次密码并不一致"));
      }
    };
    // usergroup验证规则
    var validateUsergroup = (rule, value, callback) => {
      // console.log(value)
      if (value > 0) {
        callback();
      } else {
        callback(new Error("请选择权限"));
      }
    };
    return {
      options: [
        { value: "1", label: "超级管理员" },
        { value: "2", label: "管理员" },
      ],
      ruleForm: {
        acc: "",
        pwd: "",
        pwdex: "",
        usergroup: "", // 选项卡的值
      },
      // 验证规则
      rules: {
        acc: [ { required: true, message: '请输入用户名', trigger: 'change' }],
        pwd: [ { required: true, validator: validatePwd, trigger: 'blur' }],
        pwdex: [ { required: true, validator: validatePwdEx, trigger: 'blur' }],
        usergroup: [ { required: true, validator: validateUsergroup, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valida) => {
        if (valida) {
            let params = JSON.parse(JSON.stringify(this.ruleForm))
            delete params.pwdex
          addaccount(params).then((res) => {
            if (res.data == "ok") {
              this.$message({
                message: "账号添加成功!",
                type: "success",
              });
              this.$refs.ruleForm.resetFields();
            }else {
                this.$message.error('添加失败!');
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.addaccount {
  .addaccount-box {
    display: flex;
    justify-content: center;
    .myForm {
      width: 30%;
      min-width: 500px;
      .addaccount-btn {
        display: flex;
        justify-content: center;
        padding-top: 30px;
      }
    }
  }
}
</style>
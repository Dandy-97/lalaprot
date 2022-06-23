<template>
  <div class="addstock">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商品入库</h3>
      </div>
      <!-- 表单 -->
      <div class="box">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="myForm"
        >
          <el-form-item label="商品条形码" prop="barCode">
            <el-input
              v-model="ruleForm.barCode"
              placeholder="请输入条形码"
            ></el-input>
          </el-form-item>
          <el-form-item label="入库数量" prop="storenum">
            <el-input
              v-model="ruleForm.storenum"
              placeholder="请输入入库数量"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品进价" prop="stockPrice">
            <el-input v-model="ruleForm.stockPrice" placeholder="请输入商品进价"
              ><template slot="append">元</template></el-input
            >
          </el-form-item>
          <div class="btn">
            <el-form-item>
              <el-button type="primary" @click="submitForm()">添加</el-button>
              <el-button type="primary" @click="resetForm()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addstock } from "@/apis/apis";

export default {
  data() {
    return {
      ruleForm: {
        barCode: "", // 条形码
        storenum: "", // 入库数量
        stockPrice: "", // 进价
      },
    };
  },
  methods: {
    /* 添加按钮 */
    submitForm() {
      addstock(this.ruleForm).then((res) => {
        if (res.data == "ok") {
          this.$message({
            message: "恭喜你，这是一条成功消息",
            type: "success",
          });
          this.$refs.ruleForm.resetFields(); // 清空表单所有的值
        }
      });
    },
    /* 重置表单按钮 用 resetFields 方法*/
    resetForm() {
      this.$refs.ruleForm.resetFields(); // 清空表单所有的值
    },
  },
};
</script>

<style lang="less" scoped>
.addstock {
  width: 100%;
  height: 100%;
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    .myForm {
      width: 35%;
      min-width: 400px;
      .btn {
        display: flex;
        justify-content: center;
        padding-top: 30px;
      }
    }
  }
}
</style>
<template>
  <div class="addcommodity">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加商品</h3>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="myRuleForm"
      >
        <el-form-item label="所属分类" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择活动区域">
            <el-option label="烟酒" value="yanjiu"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="售价" prop="salePrice">
          <el-input v-model="ruleForm.salePrice"></el-input>
        </el-form-item>

        <el-form-item label="条形码" prop="barCode">
          <div class="barCode">
            <el-input v-model="ruleForm.barCode"></el-input>
            <el-button icon="el-icon-circle-plus-outline" @click="randomcode"></el-button>
          </div>
        </el-form-item>

        <el-form-item label="库存" prop="storenum">
          <el-input v-model="ruleForm.storenum"></el-input>
        </el-form-item>

        <el-form-item label="是否促销" prop="promotion">
          <el-radio-group v-model="ruleForm.promotion">
            <el-radio label="1">促销</el-radio>
            <el-radio label="0">不促销</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="会员优惠" prop="vipDiscount">
          <el-radio-group v-model="ruleForm.vipDiscount">
            <el-radio label="1">优惠</el-radio>
            <el-radio label="0">不优惠</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表单 -->
  </div>
</template>

<script>
import { addcommodity } from "@/apis/apis.js";

export default {
  data() {
    return {
      ruleForm: {
        barCode: "", // 条形码
        name: "", // 商品名
        salePrice: "", // 售价
        storenum: "", // 库存
        promotion: "0", // 是否促销
        vipDiscount: "0", // 会员优惠
        category: "", // 分类
      },
      rules: {
        barCode: [{ required: true, message: "请输入条形码", trigger: "blur" }],
        name: [{ required: true, message: "请输入商品名", trigger: "blur" }],
        salePrice: [{ required: true, message: "请输入售价", trigger: "blur" }],
        storenum: [{ required: true, message: "请输入库存", trigger: "blur" }],
        promotion: [
          { required: true, message: "请选择是否促销", trigger: "change" },
        ],
        vipDiscount: [
          { required: true, message: "请选择会员优惠", trigger: "change" },
        ],
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(myRuleForm) {
      this.$refs[myRuleForm].validate((valid) => {
        if (valid) {
          addcommodity(
            this.ruleForm.name,
            this.ruleForm.category,
            this.ruleForm.promotion,
            this.ruleForm.salePrice,
            this.ruleForm.storenum,
            this.ruleForm.vipDiscount,
            this.ruleForm.barCode
          ).then((res) => {
            console.log(res);
            console.log(this.ruleForm);
            if (res.data == "ok") {
              this.$message({
                message: "商品添加成功",
                type: "success",
              });
              this.$refs[myRuleForm].resetFields();
            }
          });
        }
      });
    },
    // 重置表单按钮
    resetForm(myRuleForm) {
      this.$refs[myRuleForm].resetFields();
    },
    randomcode() {
      //产生区间段数字的方式
      this.ruleForm.barCode = Math.ceil(Math.random() * 899999) + 100000;
    },
  },
};
</script>

<style lang="less" scoped>
.addcommodity {
  .myRuleForm {
    width: 30%;
    min-width: 300px;
    .barCode {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
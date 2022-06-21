<template>
  <div class="commodity">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商品管理</h3>
      </div>

      <!-- 商品管理内容部分 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="条形码">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.barCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            <!-- 过滤器 -->
            <span style="margin-left: 10px">{{ scope.row.category | categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.storenum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否促销">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.promotion == "1" ? "促销" : "不促销"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员优惠">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.vipDiscount == "1" ? "优惠" : "不优惠"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <!-- 
            size-change     pageSize 改变时会触发(每页条数)
            current-change  currentPage 改变时会触发(当前页)
            current-page    当前页数
            page-sizes      每页显示个数选择器的选项设置
            page-size       每页显示条目个数
            layout          组件布局，子组件名用逗号分隔
            total           总条目数
         -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curpage"
          :page-sizes="[5, 10, 15]"
          :page-size="row"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品售价" :label-width="formLabelWidth">
          <el-input v-model="form.salePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="条形码" :label-width="formLabelWidth">
          <el-input
            v-model="form.barCode"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-input v-model="form.category" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickchange">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { commodity, changeCommodity, removeCommodity } from "@/apis/apis";
// 引入公共数据
import { categoryName } from "@/utils/index.js";

export default {
  data() {
    return {
      curpage: 1, // 当前请求的页数
      row: 5, // 每页请求的行数
      total: 1, // 总条数
      tableData: [], // 表单页面数据组
      dialogFormVisible: false, //是否弹出编辑对话框
      form: {
        //表单对应的值
        name: "", //商品名
        salePrice: "", //商品售价
        barCode: "", //条形码
        category: "", //分类
      },
      formLabelWidth: "120px",
    };
  },
  // 过滤器
  filters: {
    // categoryName: (value) => {
    //     console.log(value);
    //     return goodsCategoryFn()[value]
    // }
    categoryName
  },
  created() {
    // 初始获取页面数据(当前调用传data数据默认curpage值)
    this.ajaxcommodity(this.curpage);
  },
  methods: {
    // 点击编辑修改按钮
    clickchange() {
      //点击修改
      this.dialogFormVisible = false;
      changeCommodity(this.form).then((res) => {
        console.log(res);
        if (res.data == "ok") {
          this.$message({
            message: "修改成功",
            type: "success",
          });

          /* 重新刷新当前页数据 */
          this.ajaxcommodity(this.curpage)
        }
      });
    },
    // 编辑按钮
    handleEdit(index, row) {
      //   console.log(index, row);
      // 1. 弹出编辑框
      this.dialogFormVisible = true;
      // 2. 商品添加到弹出编辑框中
      //   this.form.barCode = row.barCode
      // 高级-循环遍历书写数据
      for (let key in this.form) {
        this.form[key] = row[key];
      }
    },
    // 删除按钮
    handleDelete(index, row) {
      //   console.log(index, row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定后进行删除  调用removeCommodity接口
          removeCommodity(row.barCode).then((res) => {
            console.log(res);
            if (res.data == "ok") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 调用请求渲染页面
              this.ajaxcommodity(this.curpage);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 当前页显示条数发生改变(显示条数按钮)
    handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
      // 每页行数赋值
      this.row = val;
      // 调用请求渲染页面
      this.ajaxcommodity(this.curpage);
    },
    // 当前页数发生改变(页数按钮)
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
      // 调用请求，动态传入请求页值
      this.ajaxcommodity(val);
      // 页面改变时保存curpage的值
      this.curpage = val
    },

    // 封装commodity后台请求(方便多次调用 设置page(当前请求页数) 动态传参)
    ajaxcommodity(page) {
      commodity(page, this.row).then((res) => {
        // console.log(res);
        // 后台数据获取设置渲染页面
        this.tableData = res.data.data;
        // 后台总条数获取设置
        this.total = res.data.total;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.commodity {
  .block {
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
}
</style>
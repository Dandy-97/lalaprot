<template>
  <div class="account">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号管理</h3>
      </div>

      <!-- 账号管理内容部分 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.acc }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户组">
          <template slot-scope="scope">
            <el-tag size="medium">{{
              scope.row.userGroup == 1 ? "超级管理员" : "管理员"
            }}</el-tag>
          </template>
        </el-table-column>

        <!-- <el-table-column label="头像" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.avatarUrl }}</span>
        </template>
      </el-table-column> -->

        <el-table-column label="管理">
          <template slot-scope="scope">
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
  </div>
</template>

<script>
import { account, removeaccount } from "@/apis/apis";

export default {
  data() {
    return {
      tableData: [],
      curpage: 1, // 当前请求的页数
      row: 5, // 每页显示行数
      total: 1,
    };
  },
  created() {
    this.ajaxaccount(this.curpage);
  },
  methods: {
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    handleDelete(index, row) {
    //   console.log(index, row);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定后进行删除  调用removeCommodity接口
          removeaccount(row.id).then((res) => {
            console.log(res);
            if (res.data == "ok") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 调用请求渲染页面
              this.ajaxaccount(this.curpage);
            //   console.log(this.curpage);
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
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // 每页行数赋值
      this.row = val;
      // 调用请求渲染页面
      this.ajaxaccount(this.curpage);
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      // 调用请求，动态传入请求页值
      this.ajaxaccount(val);
      // 页面改变时保存curpage的值
      this.curpage = val;
    },

    // 封装commodity后台请求(方便多次调用 设置page(当前请求页数) 动态传参)
    ajaxaccount(page) {
      account(page, this.row).then((res) => {
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
.account {
  .block {
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
}
</style>
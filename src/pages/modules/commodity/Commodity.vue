<template>
  <div class="commodity">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商品管理</h3>
      </div>

      <!-- 商品管理内容部分 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="条形码" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.barCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属分类" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售价" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.marketPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否促销" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.promotion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.storenum }}</span>
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          barCode: "202222", // 条形码
          name: "中华",
          category: "食品",
          promotion: "促销",
          marketPrice: "60",
          storenum: "100",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>
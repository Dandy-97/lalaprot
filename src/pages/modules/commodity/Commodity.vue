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
            <span style="margin-left: 10px">{{ scope.row.category }}</span>
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
            <span style="margin-left: 10px">{{ scope.row.promotion }}</span>
          </template>
        </el-table-column>
        <el-table-column label="会员优惠">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.vipDiscount }}</span>
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
          name: "中华",      // 商品名
          category: "分类",   // 所属分类
          promotion: "促销",  // 是否促销
          salePrice: "60",  // 售价
          storenum: "100",    // 库存
          vipDiscount: "会员",  // 会员优惠
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
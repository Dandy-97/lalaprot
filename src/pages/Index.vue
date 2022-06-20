<template>
  <div class="index">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <h2>
          <i class="el-icon-s-shop"></i>
          LaLapaot商超管理系统
        </h2>
        <div class="head-box">
          <img src="../assets/imgs/toux.jpg" alt="" />
          <!-- <label><router-link to="/">{{ username }}</router-link></label> -->
          <label>admin</label>
        </div>
      </el-header>
      <el-container>
        <!-- 导航 -->
        <el-aside width="200px">
          <!-- 
			unique-opened  保持一个子菜单的展开
			router  以index 作为 path 进行路由跳转
			:default-active="$route.path"  动态获取路径(刷新还会默认指向)
		-->
          <el-menu
            :default-active="$route.path"
            class="mymenu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-submenu
              :index="item.index"
              v-for="item in treelist"
              :key="item.id"
            >
              <template slot="title">
                <i :class="item.cls"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group
                v-for="child in item.children"
                :key="child.id"
              >
                <el-menu-item :index="child.index">{{
                  child.name
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容 -->
        <el-container>
          <el-main>
            <!-- 路由出口配置 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
      <!-- 底部 -->
      <el-footer style="height: 20px">©DINGDI 2022-2035 lalapart</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 动态菜单创建
      treelist: [
        {
          index: "1",
          cls: "el-icon-s-cooperation",
          title: "商品管理",
          children: [
            { index: "/main/commodity", name: "商品管理" },
            { index: "/main/addcommodity", name: "添加管理" },
          ],
        },
        {
          index: "2",
          cls: "el-icon-s-goods",
          title: "账号管理",
          children: [
            { index: "/main/account", name: "账号管理" },
            { index: "/main/changepwd", name: "修改密码" },
            { index: "/main/addaccount", name: "增加账号" },
          ],
        },
        {
          index: "3",
          cls: "el-icon-circle-plus",
          title: "进货管理",
          children: [
            { index: "/main/stock", name: "库存管理" },
            { index: "/main/addstock", name: "添加库存" },
          ],
        },
        {
          index: "4",
          cls: "el-icon-remove",
          title: "出货管理",
          children: [
            { index: "/main/clear", name: "销售列表" },
            { index: "/main/clearout", name: "商品出库" },
            { index: "/main/clearback", name: "商品退货" },
          ],
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          children: [
            { index: "/main/sta", name: "销售统计" },
            { index: "/main/stocksta", name: "进货统计" },
          ],
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          children: [
            { index: "/main/vip", name: "会员管理" },
            { index: "/main/addvip", name: "添加会员" },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      background-image: linear-gradient(160deg, #0078ff 20%, #002abb 80%);
      color: #fff;
      display: flex;
      justify-content: space-between; // 两端对齐
      align-items: center; // 侧轴中点对齐
      .head-box {
        display: flex;
        align-items: center;
        img {
          width: 40px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
    }
    .el-aside {
      height: 100%;
      background-color: #314158;
      color: #333;
      .mymenu {
        width: 100%;
        height: 100%;
      }
    }
    .el-main {
      background-color: #e9eef3;
      color: #333;
    }
    .el-footer {
      background-image: linear-gradient(160deg, #00ffd5 20%, #008cff 80%);
      color: #333;
      text-align: center;
      line-height: 20px;
      opacity: 0.7;
    }
  }
}
</style>
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
          <!-- 头像 -->
          <!-- <img src="../assets/imgs/toux.jpg" alt="" /> -->
          <el-upload
            class="avatar-uploader"
            :action="imgaction"
            name="inputFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- 用户 -->
          <label>
            <router-link v-if="username === '请登录'" to="/">{{ username }}</router-link>
            <span v-else>{{ username }}</span>
          </label>
          <div class="off">
            <label><router-link to="/">注销</router-link></label>
          </div>
          <!-- <label>admin</label> -->
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
              v-show="item.userGroup.indexOf(userGroup) != -1"
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
import { token } from "@/apis/apis";
export default {
  data() {
    return {
      username: "请登录", // 用户名
      userGroup: "", // 权限管理
      imageUrl: "",  // 用户头像
      imgaction: "",

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
          userGroup: ["1", "2"],
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
          userGroup: ["1"],
        },
        {
          index: "3",
          cls: "el-icon-circle-plus",
          title: "进货管理",
          children: [
            { index: "/main/stock", name: "库存管理" },
            { index: "/main/addstock", name: "添加库存" },
          ],
          userGroup: ["1", "2"],
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
          userGroup: ["1", "2"],
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          children: [
            { index: "/main/sta", name: "销售统计" },
            { index: "/main/stocksta", name: "进货统计" },
          ],
          userGroup: ["1"],
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          children: [
            { index: "/main/vip", name: "会员管理" },
            { index: "/main/addvip", name: "添加会员" },
          ],
          userGroup: ["1"],
        },
      ],
    };
  },
  created() {
    console.log(localStorage.getItem("avatarUrl"));
    // 保存登录后台传的userGroup值
    this.userGroup = localStorage.getItem("userGroup");

    // 动态获取id 保存 imgaction值
    this.imgaction = "http://192.168.2.6:3000/upload?id=" + localStorage.getItem("id")

    // 调用koken验证 (通过验证token来动态保存右上角用户渲染)
    token({token: localStorage.getItem("token")}).then((res) => {
      // console.log(res);
      if (res.data == "ok") {
        this.username = localStorage.getItem("acc");
      } else {
        this.username = "请登录";
      }
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      // 选项卡展开时触发的函数
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // 选项卡关闭时触发的函数
      console.log(key, keyPath);
    },
    // 头像上传成功
    handleAvatarSuccess(res) {
      // console.log(res);
      this.imageUrl = res
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
        a {
          color: #fff;
          text-decoration: none;
        }
        .off {
          margin-left: 20px;
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
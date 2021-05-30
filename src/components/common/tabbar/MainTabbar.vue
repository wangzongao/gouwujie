<template>
  <div>
    <tabbar>
      <tabbar-item path="/home" activeColor="deeppink">
        <img src="~assets/img/tabbar/home.svg" slot="item-icon">
        <img src="~assets/img/tabbar/home_active.svg" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item path="/category" activeColor="deeppink">
        <img src="~assets/img/tabbar/category.svg" slot="item-icon">
        <img src="~assets/img/tabbar/category_active.svg" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item path="/cart" activeColor="deeppink">
        <img src="~assets/img/tabbar/shopcart.svg" slot="item-icon">
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item path="/profile" activeColor="deeppink">
        <img src="~assets/img/tabbar/profile.svg" slot="item-icon">
        <img src="~assets/img/tabbar/profile_active.svg" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Tabbar from "./Tabbar";
import TabbarItem from "./TabbarItem";

export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped>

</style>

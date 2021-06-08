<template>
  <div id="profile">
    <Navbar class="nav-bar">
      <div slot="center">我的</div>
    </Navbar>
    <UserInfo></UserInfo>
    <AccountInfo></AccountInfo>
    <NormalListView :listData="orderList"></NormalListView>
    <NormalListView :listData="serviceList"></NormalListView>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";

import UserInfo from "./childComponents/UserInfo";
import AccountInfo from "./childComponents/AccountInfo";
import NormalListView from "./childComponents/NormalListView";

export default {
  name: "Profile",
  components: {
    Navbar,
    UserInfo,
    AccountInfo,
    NormalListView
  },
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  color: #ffffff;
  background-color: var(--color-tint);

  position: relative;
  z-index: 9;
}
</style>

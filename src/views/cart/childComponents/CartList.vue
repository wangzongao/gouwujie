<template>
  <div class="cart-list">
    <Scroll class="wrapper" ref="cartScroller" @scroll="contentScroll">
      <CartItem v-for="item in cartList" :key="item.iid" :itemInfo="item"/>
    </Scroll>
    <BackTop v-show="isBackTopShow" @click.native="backTopClick('cartScroller')"/>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartItem from "./CartItem";

import {mapGetters} from 'vuex'
import {backTopMixin} from "common/mixin";

export default {
  name: "CartList",
  mixins: [backTopMixin],
  components: {
    CartItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  methods: {
    contentScroll(pos) {
      this.isBackTopShow = -pos.y > 1000
    }
  },
  activated() {
    this.$refs.cartScroller.refresh()
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;

  overflow: hidden;
}
</style>

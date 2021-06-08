<template>
  <div id="cart">
    <Navbar class="cart-navbar">
      <div slot="center">
        购物车({{ cartLength }})
      </div>
    </Navbar>
    <CartList/>
    <CartBottomBar/>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";

import CartList from "./childComponents/CartList";
import CartBottomBar from "./childComponents/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    Navbar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
#cart {
  height: 100vh;
}

.cart-navbar {
  background-color: var(--color-tint);
  color: #ffffff;

  z-index: 9;
  position: relative;
}
</style>

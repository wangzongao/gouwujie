<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" @click.native="checkAll" :isChecked="isSelectAll"/>
      全选
    </div>
    <div class="price">
      合计:{{ totalPrice }}
    </div>
    <div class="calculate" @click="checkClick">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters, mapActions} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => preValue + item.count * parseFloat(item.lowNowPrice), 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.checkLength === 0) return false
      return this.cartList.every(item => item.checked)
    }
  },
  methods: {
    ...mapActions(['clearCart']),
    checkAll() {
      this.isSelectAll ? this.cartList.map(item => item.checked = false) : this.cartList.map(item => item.checked = true)
    },
    checkClick() {
      if (this.cartList.every(item => item.checked === false)) {
        this.$toast.show('请选择购买的商品', 2000)
      } else {
        this.$toast.show(`结算成功，总金额为${this.totalPrice.substring(1)}元`, 2000)
        this.clearCart()
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: absolute;
  bottom: 49px;
  left: 0;
  right: 0;

  height: 40px;
  background-color: #eeeeee;
  line-height: 40px;

  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.price {
  margin-left: 40px;
  flex: 1;
}

.calculate {
  width: 100px;
  text-align: center;
  color: white;
  background-color: red;
}
</style>

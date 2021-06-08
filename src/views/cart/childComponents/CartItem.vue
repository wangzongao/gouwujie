<template>
  <div class="cart-item">
    <div class="item-selector">
      <CheckButton @click.native="checkClick" :isChecked="itemInfo.checked"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image">
    </div>
    <div class="item-info">
      <div class="info-title">
        {{ itemInfo.title }}
      </div>
      <div class="info-desc">
        {{ itemInfo.desc }}
      </div>
      <div class="info-other">
        <span class="info-price">￥{{ itemInfo.lowNowPrice }}</span>
        <span>x{{ itemInfo.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
.cart-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 10px;
  padding: 0 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  overflow: hidden;
  position: relative;
}


.info-title, .info-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}


.info-other {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;

  display: flex;
  justify-content: space-between;
}

.info-price {
  color: orangered;
}
</style>

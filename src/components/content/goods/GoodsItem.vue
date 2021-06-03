<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('goodsItemHomeImageLoad')
      // if (this.$route.path.indexOf('/home') !== -1) {
      //   this.$bus.$emit('itemHomeImageLoad')
      // } else if (this.$route.path.indexOf('/detail') !== -1) {
      //   this.$bus.$emit('itemDetailImageLoad')
      // } else if (this.$route.path.indexOf('/category') !== -1) {
      //   this.$bus.$emit('itemCategoryImageLoad')
      // }
    },
    itemClick() {
      this.$router.push({
        path: '/detail',
        query: {
          iid: this.goodsItem.iid
        }
      })
    }
  }
}
</script>

<style scoped>
.goods-item {
  flex: 0 0 48%;
  padding-bottom: 40px;

  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px 0;
}

.price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.collect {
  position: relative;
}

.collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -2px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px;
  /*
  第一个0是背景颜色的简写
  0/14px 中的0是位置，14px是size
   */
}
</style>

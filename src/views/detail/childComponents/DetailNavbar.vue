<template>
  <div class="detail-navbar">
    <Navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="content">
        <div v-for="(title,index) in titles" :key="index" class="content-item"
             :class="{active:currentIndex===index}" @click="itemClick(index)">{{ title }}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";

export default {
  name: "DetailNavbar",
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    Navbar
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    itemClick(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.back img {
  margin-top: 12px;
}

.content {
  display: flex;
  font-size: 14px;
}

.content-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>

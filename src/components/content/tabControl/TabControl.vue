<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(title,index) in titles" :key="title"
         :class="{active:index === currentIndex}" @click="titleClick(index)">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-tint);
}
</style>

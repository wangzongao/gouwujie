<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      scroller: null
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroller.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroller.finishPullUp()
    },
    refresh() {
      this.scroller.refresh()
    }
  },
  mounted() {
    this.scroller = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    })

    if (this.probeType === 2 || this.probeType === 3) {
      this.scroller.on('scroll', (pos) => {
        this.$emit('scroll', pos)
      })
    }

    if (this.pullUpLoad) {
      this.scroller.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20)
    }
  }
}
</script>

<style scoped>

</style>

import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  data() {
    return {
      isBackTopShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTopClick(ref) {
      this.$refs[ref].scrollTo(0, 0)
    }
  }
}

import {POP, NEW, SELL} from "./const";

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }
}

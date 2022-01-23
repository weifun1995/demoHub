<template>
  <el-tooltip :placement="placement"
              :disabled="disabled"
              :effect="effect"
              :content="content">
    <span class="tooltip_box"
          ref="tooltip_box"
          :style="{width: width + 'px'}"
          :class="className">{{content}}</span>
  </el-tooltip>
</template>
<script>
export default {
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    effect: {
      type: String,
      default: 'dark'
    },
    className: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 200
    }
  },
  data () {
    return {
      disabled: true
    }
  },
  watch: {
    content: {
      handler: function () {
        this.$nextTick(()=> {
          let dom = this.$refs.tooltip_box
          console.log(dom.scrollWidth, dom.clientWidth)
          this.disabled = dom.scrollWidth === dom.clientWidth
        })
      }
    }
  },
  mounted() {
    let dom = this.$refs.tooltip_box
    console.log(dom.scrollWidth, dom.clientWidth)
    this.disabled = dom.scrollWidth === dom.clientWidth
  }
}
</script>
<style scoped>
.tooltip_box {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
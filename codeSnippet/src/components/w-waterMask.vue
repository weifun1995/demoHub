<template>
  <div class="waterMask">
    <slot></slot>
    <div class="mask" :style="{'background-image': `url(${src})`}"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      vmOptions: {
        // 单个水印文字块的字体颜色、宽、高、旋转角度
        width: 100,
        height: 100,
        color: 'red',
        rotate: 30,
        text: '测试水印',
        font: '12px serif'
      },
      src: ''
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas () {
      const { width, height, text, font, color, rotate } = Object(this.vmOptions, this.option)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.translate(width / 2, height / 2)
      ctx.rotate(-rotate * Math.PI / 180)
      ctx.translate(-width / 2, -height / 2)

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = color
      ctx.font = font
      ctx.fillText(text, width / 2, height / 2)

      this.src = this.canvasToBase64(canvas)
    },
    canvasToBase64 (canvas) {
      return canvas.toDataURL('image/png')
    }
  }
}
</script>
<style scoped>
.waterMask {
  position: relative;
  width: max-content;
  height: max-content;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  background-repeat: repeat;
}
</style>
<template>
  <v-sheet color="transparent">
    <div ref="animationContainer" :style="`height: ${height} !important; width: ${width} !important`" />
  </v-sheet>
</template>

<script>
import lottie from 'lottie-web'
export default {
  props: {
    height: {
      type: String,
      default: '300px',
      required: false
    },
    width: {
      type: String,
      default: '100%',
      required: false
    },
    options: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const animationEvt = () => {
        const anim = lottie.loadAnimation({
          container: this.$refs.animationContainer,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: this.options.animationData,
          renderConfig: {
            viewBoxOnly: true
          }
        })
        anim.addEventListener('complete', () => {
          this.$emit('loaded')
        })
      }
      animationEvt()
    }
  }
}
</script>

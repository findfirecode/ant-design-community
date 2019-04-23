<template>
  <div
    class="demo-infinite-container"
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="0"
  >
    <slot></slot>
    <div v-if="loading && !busy" class="demo-loading-container">
      <a-spin />
    </div>
  </div>
</template>

<script>
  import infiniteScroll from 'vue-infinite-scroll'
  export default {
    directives: { infiniteScroll },
    props: {
      queryUrl: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        data: [],
        loading: false,
        busy: false
      }
    },
    methods: {
      handleInfiniteOnLoad  () {
        const data = this.data
        this.loading = true
        if (data.length > 14) {
          this.$message.warning('已经到最底部了')
          this.busy = true
          this.loading = false
          return
        }
        this.busy = true
        // setTimeout(() => {
          for (let i = 0, j = 10; i < j; i++) {
            this.data.push({ id: `${i * 100 * Math.round()}`, name: 'hmap', description: 'tjc就是个蠢驴', url: '#' })
          }
          this.busy = false
        // }, 1000)

        this.$emit('addListData', data)
      }
    }
  }
</script>

<style scoped>
  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 300px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
</style>
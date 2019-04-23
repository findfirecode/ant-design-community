<template>
  <div>
    <a-affix :offsetTop="top">
      <a-button type="primary" @click="" :style="{ position: 'absolute', top: '20%', right: '10px'}"><a-icon type="cloud-upload"/> 上传</a-button>
    </a-affix>
    <a-row>
      <a-col :span="8" v-for="c in cartList" :key='c.skillId'>
        <a-card
          :hoverable='true'
          style="width: 80%;margin: 10px auto;"
        >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"

          />
          <template class="ant-card-actions" slot="actions">
            <span @click="changeColor"><a-icon type="star" :style="{ color: cColor }"/>&nbsp收藏</span>
            <span @click="toDetail(c.skillId)"><a-icon type="arrow-right"/>&nbsp进入</span>
          </template>
          <a-card-meta
            title="红烧肉"
            description="这是一个红烧肉表演">
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
          </a-card-meta>
        </a-card>

      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cartList: [
          {
            skillId: '1111'
          }
        ],
        top: '20',
        cColor: ''
      }
    },
    methods: {
      toDetail(Id) {
        window.location.href = `/skillDetail/${Id}`
      },
      changeColor() {
        if (this.cColor === '') {
          this.cColor = 'red'
        } else {
          this.cColor = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>

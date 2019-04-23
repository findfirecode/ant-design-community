<template>
  <div style="background-color: #ececec; ">
    <a-affix :offsetTop="this.top" :style="{ position: 'absolute', left:'13%',top: '1%'}">
      <a-button type="primary" @click=""><a-icon type="cloud-upload"/> 上传</a-button>
    </a-affix>
    <a-row style="padding-top: 50px;">
      <a-col :span="8" v-for="c in cartList" :key='c.daily_id'>
        <a-card
          :hoverable='true'
          @click="linkTo(c.daily_id)"
          style="width: 80%;margin: 10px auto;"
        >
          <img
            :alt="c.type"
            style="height: 500px;"
            :src='"http://localhost:8080/jeecg-boot/"+c.p_url'
            slot="cover"

          />
          <a-card-meta
            :title="c.title">
            <template slot="description">
              {{ c.content }}
              <p class="card-p">99人感兴趣</p>
            </template>
            <a-avatar slot="avatar" :src='"http://localhost:8080/jeecg-boot/"+c.avatar'/>
          </a-card-meta>
        </a-card>

      </a-col>
    </a-row>
    <template>
      <a-pagination showQuickJumper :defaultCurrent="1" :total="totalNum" @change="chagePage" />
    </template>
  </div>
</template>

<script>
  import { axios } from '@/utils/request'
  export default {
    name: 'Daily',
    data() {
      return {
        top: 20,
        cartList: [{ dailyId: '111' }, { dailyId: '2' }, { dailyId: '3' }, { dailyId: '4' }],
        totalNum:200
      }
    },
    beforeCreate:async function(){
      const data = await axios.get('/frontend/daily/list',
        {params:{
            pageNo: 1,
            pageSize:20,
          }})
      this.cartList = data.records
      this.totalNum = data.total
    },
    methods: {
      linkTo(key) {
        window.location.href = `/dailyDetail/${key}`
      },
      getList(params){
        console.log(params)
        return axios.get('/frontend/comments/list',
          {params})
      },
      chagePage() {

      }
    }
  }
</script>

<style>
  .card-p {
    margin-top: 10px;
    text-align: right;
    color: rebeccapurple;
  }
</style>

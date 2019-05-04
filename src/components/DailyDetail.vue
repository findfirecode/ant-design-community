<template>
  <div style="background-color: #fff;">
    <div class="avatar-title">
      <a-avatar :size="48" :src='baseUrl+dailyDetail.avatar'/>
      <span class="title-span">{{ this.dailyDetail.name }}</span>
    </div>
    <div class="imgDispaly">
      <a-carousel arrows dotsClass="slick-dots slick-thumb">
        <a slot="customPaging" slot-scope="props">
          <img :src="baseUrl+imgUrls[props.i]"/>
        </a>
        <div v-for="item in imgUrls">
          <img :src="baseUrl+item"/>
        </div>
      </a-carousel>
    </div>
    <div class="daily-content">
      <h1>{{ this.dailyDetail.title }}</h1>
      <p>{{ this.dailyDetail.content }}</p>
      <div class="action-button">
        <a-button
          type="primary"
          style="margin-right: 10px;"
          :ghost="!isCollect"
          @click="collect"
        ><a-icon type="star" />收藏</a-button>
        <a-button
          type="primary"
          style="margin-right: 10px;"
          :ghost="true"
          @click="join"
        ><a-icon type="flag" />购买</a-button>
        <a-button
          type="primary"
          style="margin-right: 10px;"
          ghost
          @click="() => { this.isReply = !this.isReply }"
        ><a-icon type="message" />评论</a-button>
        <a-button
          type="primary"
          style="margin-right: 10px;"
          @click="back"
          ghost
        ><a-icon type="rollback" />返回</a-button>
      </div>
    </div>
    <a-list
      style="background-color: #ececec;"
      class="comment-list"
      :header="`${this.commentList.length} 条回复`"
      itemLayout="horizontal"
      :dataSource="commentList"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.name"
          :avatar='"http://localhost:8080/community/"+item.avatar'
        >
<!--          <template slot="actions">-->
<!--                   <span>-->
<!--                    <a-tooltip title="Like">-->
<!--                      <a-icon-->
<!--                        type="like"-->
<!--                        :theme="action === 'liked' ? 'filled' : 'outlined'"-->
<!--                        @click="like"-->
<!--                      />-->
<!--                    </a-tooltip>-->
<!--                    <span style="padding-left: 8px;cursor: auto;">-->
<!--                      {{likes}}-->
<!--                    </span>-->
<!--                  </span>-->
<!--                    <span>-->
<!--                    <a-tooltip title="Dislike">-->
<!--                      <a-icon-->
<!--                        type="dislike"-->
<!--                        :theme="action === 'disliked' ? 'filled' : 'outlined'"-->
<!--                        @click="dislike"-->
<!--                      />-->
<!--                    </a-tooltip>-->
<!--                    <span style="padding-left: 8px;cursor: auto">-->
<!--                      {{dislikes}}-->
<!--                    </span>-->
<!--                  </span>-->
<!--          </template>-->
          <p slot="content">{{item.content}}</p>
          <a-tooltip slot="datetime" :title="moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment(item.create_time).fromNow() }}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>

    <a-modal
      title="评论"
      v-model="isReply"
      @ok="handleSubmit"
      :destroyOnClose="true"
    >
      <a-comment>
        <div slot="content">
          <a-textarea :rows="4" v-model="inputValue"></a-textarea>
        </div>
      </a-comment>
    </a-modal>
  </div>
</template>

<script>
  import moment from 'moment'
  import { axios } from '@/utils/request'
  export default {
    name: 'dailyDetail',
    data() {
      return {
        baseUrl: 'http://localhost:8080/community/',
        dailyDetail: {},
        commentList:[],
        action: null,
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        isReply: false,
        imgUrls:[],
        inputValue: '',
        isCollect:false,
        likes:0,
        dislike:0,
        moment
      }
    },
    beforeCreate: async function(){
      const daily = await axios.get('/frontend/daily/queryById',
        {params:{
            id: this.$route.query.id,
          }})
      this.dailyDetail = daily
      this.imgUrls = await axios.get('/frontend/daily/queryByBelongId',
        {params:{
            belong_id: this.$route.query.id,
          }})
      const collect = await axios.get('/frontend/collect/list',
        {params:{
            createBy: '111',
            keyId: this.$route.query.id,
          }})
      this.isCollect = await collect.result.records.length === 1

      const comments = await axios.get('/frontend/comments/list',
        {params:{ pageNo: 1,
            pageSize:10,
            type: 'dailyDetail'
          }})
      this.commentList = comments.records
      console.log('comments', this.commentList)
    },
    methods: {
      async collect() {
        if(this.isCollect === false){
          await axios.post('/frontend/collect/add',{
            belongBy: this.dailyDetail.create_by,
            keyId: this.$route.query.id,
          })
        }
        this.isCollect = true
      },
      join() {
        this.$router.push({
          path:'/chat',
          query:{id:this.dailyDetail.create_by}})
      },
      back() {
        this.$router.go(-1)
      },
      async handleSubmit() {
        if (!this.inputValue) {
          return;
        }
        await axios.post('/frontend/comments/add',{
          content:this.inputValue,
          type: 'dailyDetail',
          userId: this.$store.state.user.user_id,
          parentId: -1
        })
        this.$message.success('回复成功');
        this.isReply = !this.isReply
        this.refleshComments()
      },
      async refleshComments() {
        const result = await axios.get('/frontend/comments/list',
          {params:{ pageNo: 1,
              pageSize:10,
              type: 'dailyDetail'
            }})
        this.commentList = result.records
      },
    }
  }
</script>

<style scoped>
  .avatar-title {
    display: flex;
    background: #fff;
  }
  .title-span {
    font-size: 16px;
    padding-top: 15px;
  }
  .daily-content {
    background: #fff;
    margin-bottom: 20px;
    padding: 10px 4% 0;
  }
  .action-button {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }
  .ant-comment{
    width: 100%;
  }
  .imgDispaly{
    width: 80%;
    margin: 60px auto;
  }
  .ant-carousel >>> .slick-dots {
    height: auto
  }
  .ant-carousel >>> .slick-slide img{
    border: 5px solid #FFF;
    display: block;
    margin: auto;
    max-width: 80%;
  }
  .ant-carousel >>> .slick-thumb {
    bottom: -45px;
  }
  .ant-carousel >>> .slick-thumb li {
    width: 60px;
    height: 45px;
  }
  .ant-carousel >>> .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }
  .ant-carousel >>> .slick-thumb li.slick-active img{
    filter: grayscale(0%);
  }
  .custImg {
    color: red;
  }
</style>

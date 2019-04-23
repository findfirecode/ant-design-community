<template>
  <div style="background-color: #fff;">
    <div class="avatar-title">
      <a-avatar :size="48" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
      <span class="title-span">{{ this.avatarName }}</span>
    </div>
    <div class="imgDispaly">
      <a-carousel arrows dotsClass="slick-dots slick-thumb">
        <a slot="customPaging" slot-scope="props">
          <img :src="getImgUrl(props.i)"/>
        </a>
        <div v-for="item in 4">
          <img :src="baseUrl+'abstract0'+item+'.jpg'"/>
        </div>
      </a-carousel>
    </div>
    <div class="daily-content">
      <h1>这是一首情歌</h1>
      <p>V-T If you complete something, you finish doing, making, or producing it. 完成
        例：
        Peter Mayle has just completed his first novel.
        彼得·梅尔刚完成他的第一本小说。
        9.
        completion N-VAR 完成
        例：
        The project is nearing completion.
        该项目快完成了。
        10.
        V-T If you complete something, you do all of it. 完成 [no cont]
        例：
        She completed her degree in two years.
        她在两年内修完了学位。
        11.
        V-T If you complete a form or questionnaire, you write the answers or information asked for in it. 填写 (表格、问卷)</p>
      <div class="action-button">
        <a-button
          type="primary"
          style="margin-right: 10px;"
          :ghost=true
          @click=""
        ><a-icon type="star" />收藏</a-button>
        <a-button
          type="primary"
          style="margin-right: 10px;"
          :ghost="!isJoin"
          @click="join"
        ><a-icon type="flag" />{{ this.joinText }}</a-button>
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
    <a-comment v-if="isReply">
      <a-avatar
        slot="avatar"
        :src="imgUrl"
        :alt="avatarName"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" @change="handleChange()" :value="value" ></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit()"
            type="primary"
            class="comment-button"
          >
            提交
          </a-button>
          <a-button
            @click="() => { this.isReply = !this.isReply }"
            class="comment-button"
          >
            取消
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
    <a-list
      style="background-color: #ececec;"
      class="comment-list"
      :header="`${data.length} 条回复`"
      itemLayout="horizontal"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
        >
          <template slot="actions">
                   <span>
                    <a-tooltip title="Like">
                      <a-icon
                        type="like"
                        :theme="action === 'liked' ? 'filled' : 'outlined'"
                        @click="like"
                      />
                    </a-tooltip>
                    <span style="padding-left: 8px;cursor: auto;">
                      {{likes}}
                    </span>
                  </span>
            <span>
                    <a-tooltip title="Dislike">
                      <a-icon
                        type="dislike"
                        :theme="action === 'disliked' ? 'filled' : 'outlined'"
                        @click="dislike"
                      />
                    </a-tooltip>
                    <span style="padding-left: 8px;cursor: auto">
                      {{dislikes}}
                    </span>
                  </span>
          </template>
          <p slot="content">{{item.content}}</p>
          <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
            <span>{{item.datetime.fromNow()}}</span>
          </a-tooltip>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import moment from 'moment'
  import { axios } from '@/utils/request'
  export default {
    name: 'dailyDetail',
    data() {
      return {
        baseUrl: 'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/',
        data: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: moment().subtract(1, 'days')
          },
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: moment().subtract(2, 'days')
          }
        ],
        avatarName: '盖世英雄',
        likes: 0,
        dislikes: 0,
        action: null,
        isJoin: false,
        joinText: '参入',
        imgUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        isReply: false,
        moment
      }
    },
    beforeCreate: async function(){
      // this.data = await axios.get('/frontend/daily/queryById',
      //   {params:{
      //       id: this.$router.params.id,
      //     }})
    },
    methods: {
      like() {
        this.likes = 1
        this.dislikes = 0
        this.action = 'liked'
      },
      dislike() {
        this.likes = 0
        this.dislikes = 1
        this.action = 'disliked'
      },
      join() {
        this.isJoin = !this.isJoin
        if (this.isJoin) {
          this.joinText = '退出'
        } else {
          this.joinText = '参与'
        }
      },
      back() {
        this.$router.go(-1)
      },
      getImgUrl(i) {
        return `${this.baseUrl}abstract0${i + 1}.jpg`
      }
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
    margin-bottom: 60px;
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
</style>

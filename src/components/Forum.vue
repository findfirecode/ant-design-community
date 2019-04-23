<template>
  <div style="background-color: #ececec; padding: 0 20px;" >
    <div class="advice">
      <a-collapse accordion>
        <a-collapse-panel :header="notice.head" v-for="notice in adviceList" :key="notice.key">
          <p>{{notice.content}}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div style="display: flex;margin-top: 40px">
    <a-input-search
      placeholder="请输入评论内容"
      v-model="inputValue"
      @search="onSearch"
      enterButton
    ></a-input-search>
      <a-button @click="clearInput">Cancel</a-button></div>
    <a-comment v-for="(c, index) in commentList" :key="c.comments_id">
      <template slot="actions" style="text-align: right;">
        <span @click="reply(c)">回复</span>
        <span @click="takeComment(c, index)">查看评论</span>
        <span v-show="c.isDisplay === true" @click="() => { c.isDisplay = false}"><a-icon type="up" />收起评论</span>
      </template>
      <a slot="author">{{c.name}}</a>
      <a-avatar
        :src='"http://localhost:8080/jeecg-boot/"+c.url'
        :alt="c.name"
        slot="avatar"
      />
      <p class="comment-content" slot="content">{{c.content}}</p>
      <a-tooltip slot="datetime" :title="moment(c.time).format('MMMM Do YYYY, h:mm:ss')">
        <span>{{moment(c.create_time).fromNow()}}</span>
      </a-tooltip>

      <a-comment v-if="c.isReply">
        <a-avatar
          slot="avatar"
          :src='"http://localhost:8080/jeecg-boot/"+c.url'
          :alt="c.name"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" v-model="value"></a-textarea>
          </a-form-item>
          <a-form-item>
            <a-button
              htmlType="submit"
              :loading="submitting"
              @click="handleSubmit(c, index)"
              type="primary"
              class="comment-button"
            >
              提交
            </a-button>
            <a-button
              @click="() => { c.isReply=!c.isReply}"
              class="comment-button"
            >
              取消
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
      <a-comment v-if="c.isDisplay" v-for="comment in c.comments" :key="comment.id">
        <template slot="actions">
          <span @click="reply(comment)">回复</span>
          <span  @click="() => { c.isDisplay = false}"><a-icon type="up" />收起评论</span>
        </template>
        <a slot="author">{{comment.name}}</a>
        <a-avatar
          :src='"http://localhost:8080/jeecg-boot/"+comment.url'
          :alt="comment.name"
          slot="avatar"
        />
        <p class="comment-content" slot="content">{{comment.content}}</p>
        <a-tooltip slot="datetime" :title="moment(comment.create_time).format('MMMM Do YYYY, h:mm:ss')">
          <span>{{moment(comment.create_time).fromNow()}}</span>
        </a-tooltip>

        <a-comment v-if="comment.isReply">
          <a-avatar
            slot="avatar"
            :src='"http://localhost:8080/jeecg-boot/"+comment.url'
            :alt="comment.name"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" v-model="value"></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button
                htmlType="submit"
                :loading="submitting"
                @click="handleSubmit(comment.comments_id)"
                class="comment-button"
                type="primary"
              >
                提交
              </a-button>
              <a-button
                @click="() => { comment.isReply=!comment.isReply}"
                class="comment-button"
              >
                取消
              </a-button>
            </a-form-item>
          </div>
        </a-comment>

      </a-comment>
    </a-comment>
    <template>
      <a-pagination showQuickJumper :defaultCurrent="1" :total="totalNum" @change="chagePage" />
    </template>
  </div>
</template>
<script>
  import moment from 'moment';
  import { axios } from '@/utils/request'

  export default {
    data() {
      return {
        action: null,
        comments: [],
        commentList: [],
        submitting: false,
        text: '超人被蝙蝠侠杀掉了',
        adviceList: [
          { head: '10月27停水', content: '超人被蝙蝠侠杀掉了', key: '1' },
          { head: '星期五小区放电影', content: '超人被蝙蝠侠杀掉了', key: '2' },
          { head: '恭喜田总喜提迈巴赫', content: '超人被蝙蝠侠杀掉了', key: '3' }
        ],
        moment,
        totalNum:0,
        value: '',
        inputValue:''
      }
    },
    beforeCreate: async function() {
      this.commentList = await axios.get('/frontend/comments/list',
        {params:{ pageNo: 1,
          pageSize:10,
        }})
      this.totalNum = await axios.get('/frontend/comments/total')
    },
    methods: {
       getList(params){
        console.log(params)
        return axios.get('/frontend/comments/list',
          {params})
      },
      async getComments(c, index) {
         this.commentList[index].comments = await this.getList({
                  pageNo: 1,
                  pageSize:10,
                  parent_id: c.comments_id
                })
      },
       takeComment(c, index) {
        if (!c.isDisplay) {
          this.getComments(c, index)
        }
        c.isDisplay = !c.isDisplay
      },
      async onSearch(value) {
        this.commentList = await this.getList(
          { pageNo: 1,
              pageSize:1000,
              contentCondition:value,
            })
      },
      async clearInput() {
        this.inputValue = ''
        this.commentList = await this.getList({ pageNo: 1,
              pageSize:10,
            })
      },
      async chagePage(page, pageSize) {
        this.commentList = await this.getList({ pageNo: page,
              pageSize:pageSize,
            })
      },
      reply(c) {
        console.log(c.comments_id)
        c.isReply = !c.isReply
      },
      async handleSubmit(c, index) {
        if (!this.value) {
          return;
        }
        this.submitting = true
         await axios.post('/frontend/comments/add',{
             content:c.parent_id === '-1'?this.value:`@${c.name}: ${this.value}`,
           parentId:c.comments_id
           })
        this.getComments(c, index)
        c.isReply = false
        this.submitting = false

      },
    }
  }
</script>

<style>
  .comment-content {
    text-align: left;
  }
  .ant-comment-content .ant-comment-actions {
    text-align: right;
  }
  .comment-button {
    width: 15%;
    margin: 0 5px;
  }
  .ant-form-item-control{
    text-align: right;
  }
</style>

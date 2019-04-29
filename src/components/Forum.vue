<template>
  <div style="background-color: #ececec; padding: 0 20px;" >
    <div class="advice">
      <a-collapse accordion>
        <a-collapse-panel :header="notice.head" v-for="notice in adviceList" :key="notice.key">
          <p>{{notice.content}}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="实时" key="1">
        <div style="margin-top: 40px">
          <a-affix :offsetTop="10">
            <a-input-search
              placeholder="请输入评论内容"
              v-model="inputValue"
              @search="onSearch"
              style="width: 80%;"
              enterButton
            ></a-input-search>
            <a-button @click="clearInput">取消</a-button>
            <a-button @click="() => { this.addForumModel = !this.addForumModel }">发布帖子</a-button>
          </a-affix>
        </div>
        <a-comment v-for="(c, index) in commentList" :key="c.comments_id">
          <template slot="actions" style="text-align: right;">
            <span @click="reply(c)">回复</span>
            <span @click="takeComment(c, index)">查看评论</span>
            <span v-show="c.isDisplay === true" @click="() => { c.isDisplay = false}"><a-icon type="up" />收起评论</span>
          </template>
          <a slot="author">{{c.name}}</a>
          <a-avatar
            :src='"http://localhost:8080/community/"+c.url'
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
              :src='"http://localhost:8080/community/"+c.url'
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
              :src='"http://localhost:8080/community/"+comment.url'
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
                :src='"http://localhost:8080/community/"+comment.url'
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
      </a-tab-pane>
      <a-tab-pane tab="圈子" key="2">
<!--        <template>-->
<!--      <a-card title="我的圈子">-->
<!--        <a-card-grid style="width:25%;textAlign:'center'"><a-icon type="plus" />新建圈子</a-card-grid>-->
<!--        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>-->
<!--        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>-->
<!--        <a-card-grid style="width:25%;textAlign:'center'">Content</a-card-grid>-->
<!--      </a-card>-->
<!--      <a-card>-->
<!--        <h4 style="fontSize: 14px;color: rgba(0, 0, 0, 0.85); marginBottom: 16px;fontWeight: 500"-->
<!--        >-->
<!--          这是标题-->
<!--        </h4>-->
<!--        <p>这才是内容</p>-->
<!--        <a-row type="flex" justify="center" align="top">-->
<!--          <a-col span="6">-->
<!--            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" class="card-img">-->
<!--          </a-col>-->
<!--          <a-col span="6">-->
<!--            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" class="card-img">-->
<!--          </a-col>-->
<!--          <a-col span="6">-->
<!--            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" class="card-img">-->
<!--          </a-col>-->
<!--          <a-col span="6">-->
<!--            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" class="card-img">-->
<!--          </a-col>-->
<!--          <a-col span="6">-->
<!--            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" class="card-img">-->
<!--          </a-col>-->
<!--          <a-col span="6">-->
<!--            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" class="card-img">-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--      </a-card>-->
<!--    </template>-->
    </a-tab-pane>
      <a-tab-pane tab="排行榜" key="3">
        <a-list
          itemLayout="horizontal"
          :dataSource="paihangbang"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      title="发布帖子"
      v-model="addForumModel"
      @ok="polish"
      :destroyOnClose="true"
    >
      <a-form
        id="add-daily"
        :form="form"
      >
        <a-form-item
          label="标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题' }]}
        ]"
          />
        </a-form-item>
        <a-form-item
          label="内容"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
          'content',
          {rules: [{ required: true, message: '请输入内容' }]}
        ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
  import moment from 'moment';
  import { axios } from '@/utils/request'
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";

  export default {
    components: {ACol, ARow},
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
        inputValue:'',
        paihangbang:[
          {
            title: 'Ant Design Title 1',
          },
          {
            title: 'Ant Design Title 2',
          },
          {
            title: 'Ant Design Title 3',
          },
          {
            title: 'Ant Design Title 4',
          },
        ],
       form: this.$form.createForm(this),
        addForumModel:false
      }
    },
    beforeCreate: async function() {
      const result = await axios.get('/frontend/comments/list',
        {params:{ pageNo: 1,
            pageSize:10,
          }})
      this.commentList = result.records
      this.totalNum =  result.total
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
      polish() {
        this.addForumModel = !this.addForumModel
      }
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
  .card-img {

  }
</style>

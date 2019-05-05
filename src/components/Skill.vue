<template>
  <div>
    <a-affix>
      <a-button type="primary" style="width: 100%;color: black;" @click="showAddModal">发布技能</a-button>
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
    <a-modal
      title="发布技能"
      v-model="addSkillModel"
      @cancel="clearImg"
      @ok="handleSubmit"
      :destroyOnClose="true"
    >
      <a-form
        id="add-skill"
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
          label="价格"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
          'price',
          {rules: [{ required: true, message: '请输入价格' }]}
        ]"
          /></a-form-item>
        <a-form-item
          label="技能教学内容"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-textarea placeholder="请输入文章内容" :rows="4"
                      v-decorator="[
          'content',
          {rules: [{ required: true, message: '请输入描述内容' }]}
        ]"></a-textarea>
        </a-form-item>
        <!--        封面-->
        <a-form-item
          label="请上传封面图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
          extra="只能上传一张"
        >
          <a-upload
            action="http://localhost:8080/community/sys/common/upload"
            listType="picture-card"
            :fileList="coverList"
            @preview="handlePreview"
            @change="handleChange"
            :data="{ type:'cover', ...fileData}"
          >
            <div v-if="coverList.length === 0">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传封面</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-item>
        <a-form-item
          label="请上传视频"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
          extra="只能上传一个视频"
        >
          <a-upload-dragger name="file" action="http://localhost:8080/community/sys/common/upload"
                            :data="{ type:'video', ...fileData}"
                            @change="videoChange">
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">点击上传视频</p>
            <p class="ant-upload-hint">支持拖拉视频上传</p>
          </a-upload-dragger>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { axios } from '@/utils/request'
  export default {
    data() {
      return {
        cartList: [
          {
            skillId: '1111'
          }
        ],
        top: '20',
        cColor: '',
        addSkillModel:false,
        form:this.$form.createForm(this),
        previewVisible: false,
        previewImage: '',
        coverList:[],
        fileData: {
          typeFolder: 'skill',
        },
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
      },
      clearImg() {

      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async(errors, values) => {
          if (!errors){
            const daily = {
              skillId:this.fileData.belong_id,
              ...values
            }
            await axios.post('/frontend/skill/add', daily)
            this.addSkillModel = false
            this.$message.success('发布成功');
            this.$router.go(0)
          }
        });
      },
      videoChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
      handleChange ({ fileList }) {
        this.coverList = fileList
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      async showAddModal() {
        this.fileData.belong_id = await axios.get('/sys/common/uuid',{})
        this.addSkillModel = !this.addSkillModel
      },
      handleCancel () {
        this.previewVisible = false
      },
    }
  }
</script>

<style scoped>

</style>

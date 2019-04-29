<template>
  <div class="container">
    <a-affix :offsetTop="top">
      <a-button type="primary" @click="() => { this.addWishModel = !this.addWishModel }"><a-icon type="plus"/> 添加</a-button>
    </a-affix>
    <a-modal
      title="心愿"
      v-model="addWishModel"
      @ok="polish"
      :destroyOnClose="true"
    >
      <a-form
        id="add-daily"
        :form="form"
      >
        <a-form-item
          label="心愿"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea placeholder="请输入文章内容" :rows="4"
                      v-decorator="[
          'content',
          {rules: [{ required: true, message: '请输入心愿' }]}
        ]"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <ul>
      <li v-for="wish in list">
        <a>
          <p>{{wish.id}}</p>
          <p>今天是个好日子</p>
          <img class="wishImg" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'page',
    data () {
      return {
        list: [],
        top: '20',
        addWishModel:false
      }
    },
    created () {
      // 有初始数据
      for (let i = 0; i < 50; i++) {
        const item = {
          id: Math.floor(Math.random() * 200 + 900),
          height: `${Math.floor(Math.random() * 80 + 111)}px`
        };
        this.list.push(item)
      }
    },
    methods: {
      polish(){
        this.addWishModel = !this.addWishModel
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  body{
    width: 1200px;
    height: 300px;
    background-color: #ccc;
  }
  ul{
    margin: 100px auto;
  }
  ul,li{
    list-style:none;
  }
  ul li {
    position: relative;
  }
  .wishImg {
    position: absolute;
    left: 5px;
    bottom: 10px;
    width: 20%;
    height: 20%;
  }
  /*标签样式 阴影效果*/
  ul li a{
    text-decoration: none;
    width: 150px;
    height: 150px;
    /*border:1px solid red;*/
    list-style: none;
    float: left;
    margin: 15px;
    display:block;
    background: white;
    box-shadow:8px 8px 8px 7px rgba(0,0,0,0.5)
  }
  ul li:nth-child(even) a {
    transform:rotate(10deg);
    background: pink;
  }
  ul li a {
    transform:rotate(-10deg);
  }
  /*鼠标悬停触发事件*/
  ul li:hover a{
    transform:scale(1.25,1.25);
  }
</style>

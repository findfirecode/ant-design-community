<template>
  <a-layout id="community-home" class="layout">
    <a-layout-header class="header" style="background: #001529;">
      <img alt="社区互助" :src="require('@assets/head/logo.png')" class="logo-img"/>
      <a-menu
        mode="horizontal"
        theme="dark"
        :style="{ lineHeight: '64px' }"
        @click="handleClick"
      >
        <a-menu-item key="forum">
          <a-icon type="coffee"/>
          论坛讨论
        </a-menu-item>
        <a-menu-item key="daily">
          <a-icon type="shopping"/>
          生活物品
        </a-menu-item>
        <a-menu-item key="skill">
          <a-icon type="team"/>
          技能服务
        </a-menu-item>
        <a-menu-item key="wish">
          <a-icon type="heart"/>
          心愿单
        </a-menu-item>
        <a-menu-item key="notification">
          <a-icon type="notification"/>
          消息通知
        </a-menu-item>
      </a-menu>
      <span>
            <a-badge :count="1"><a-avatar shape="square" icon="user" style="background-color:#87d068" size="small"/></a-badge>
          </span>
    </a-layout-header>

    <a-layout-content style="padding: 0 10%;min-height: 600px;position: relative;">
      <div>
        <keep-alive v-if="keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center;">
      欢迎来到召唤师峡谷
    </a-layout-footer>
  </a-layout>
</template>

<script>
  export default {
    name: "CommunityView",
    computed: {
      keepAlive () {
        return this.$route.meta.keepAlive
      }
    },
    methods: {
      handleClick(o) {
        // window.location.href =`/${o.key}`
        this.$router.push(`/${o.key}`)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .header {
    display: flex;
    justify-content: space-around;
  }
  .logo-img {
    width: 60px;
  }
</style>
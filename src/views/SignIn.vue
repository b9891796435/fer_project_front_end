<template>
  <div id="loginCardContainer">
    <FloatingCard id="loginCard">
      <div id="projDescription">
        <h2>F-SOUL<br />
          表情识别云平台</h2>
        <div>调制表情，改变生活。欢迎使用F-SOUL表情识别</div>
      </div>
      <SignInTab id="signInTabs"></SignInTab>
    </FloatingCard>
    <div id="SignFooter">
      <div id="teamName">
        F-SOUL表情识别
      </div>
      <div id="copyrightFooter">
        Copyright © 2022-2024 F-SOUL All Rights Reserved. 粤ICP备####号
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FloatingCard from "@/components/FloatingCard.vue";
import SignInTab from "@/components/SignInTab.vue";
</script>

<style scoped lang="less">
#loginCardContainer {
  height: 100%;

  #loginCard {
    width: 850px;
    height: 600px;
    margin-top: 75px;
    margin-bottom: 75px;
    display: flex;

    #projDescription {
      display: flex;
      flex-direction: column;
      justify-content: center;

      h2 {
        font-size: 30px;
        color: #fff;
        text-align: center;
      }

      div {
        width: 213px;
        font-size: 20px;
        margin: 24px auto;
      }

      width: 300px;
      background-color: rgb(var(--green-6));
      padding:32px;
      color:#fff;
    }

    #signInTabs {
      width: 100%;
      margin: auto
    }
  }

  #SignFooter {
    text-align: center;

    #teamName::after,
    #teamName::before {
      content: "";
      display: inline-block;
      position: relative;
      bottom: 0.4em;
      border-color: rgb(var(--green-6));
      border-style: none none solid;
      border-width: 0.2em;
      width: 42px;
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

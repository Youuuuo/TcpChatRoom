<template>
  <div class="copyright-cmp">
    <p class="copyright-item">简单局域网聊天系统</p>
    <p class="copyright-item">作者：游宇</p>
    <p class="copyright-item">指导老师：朱烨华</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        endTime: new Date().getFullYear()
      }
    },
  }
</script>

<style lang="scss">
  .copyright-cmp {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    .copyright-item {
      margin: 0 0 5px;
      color: #ffffff;
      font-size: 14px;
    }
  }
</style>

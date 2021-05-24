<template>
  <div class="avatar-choose-cmp all0">
    <div class="avatar-list hor-ver-center" :style="device === 'Mobile' ? {width: '90%'} : {}">
      <i class="el-icon-close p-r-t" @click="close"></i>
      <span class="p-l-t">选择头像</span>
      <div
        class="avatar-item box-shadow1"
        v-for="(item, index) in avatarList"
        :key="index"
        @click="choose('face/'+item)">
        <img width="80" height="80" :src="IMG_URL + 'face/' + item" alt="" srcset="">
      </div>
      <el-upload
        class="avatar-uploader"
        action="E:\face\"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        avatarList: [],
        IMG_URL: process.env.IMG_URL
      }
    },
    computed: {
      device() {
        return this.$store.state.device.deviceType
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      choose(item) {
        // console.log('ok')
        this.$emit('choose', item)
        this.$emit('close')
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    mounted() {
      this.$http.getFaceImages().then(res => {
        // console.log("获取的头像图片为：", res)
        this.avatarList = res.data.data.files
      })
    },
  }
</script>

<style lang="scss">
  .avatar-choose-cmp {
    position: fixed;
    z-index: 1004;
    background-color: rgba(0, 0, 0, .2);

    .avatar-list {
      width: 504px;
      height: 350px;
      padding: 40px 20px 20px;
      background-color: #ffffff;
      overflow-x: hidden;
      border-radius: 5px;

      .avatar-item {
        box-sizing: border-box;
        display: inline-block;
        margin: 5px;
        border: 1px solid #DCDFE6;
        cursor: pointer;
      }
    }
  }
  .avatar-uploader .el-upload {
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>

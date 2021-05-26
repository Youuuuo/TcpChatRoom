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
      <el-form>
      <el-form-item>
        <el-upload ref="upfile"
                   style="display: inline"
                   :auto-upload="false"
                   :on-change="handleChange"
                   :file-list="fileList"
                   action="#">
          <el-button style="margin-left: 6px;margin-top: 10px" type="success">选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 6px"  type="success" @click="upload">点击上传</el-button>
      </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:'',
        fileList: [],
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
      //通过onchanne触发方法获得文件列表
      handleChange(file, fileList) {
        this.fileList = fileList;
        console.log(fileList)
      },
      upload(){

        let fd = new FormData();
        fd.append("name",this.name);
        this.fileList.forEach(item=>{
          //文件信息中raw才是真的文件
          fd.append("files",item.raw);
          //console.log(item.raw)
        })
        this.$http.uploadUi(fd).then(res=>{
          if (res.data.code === 2000) {
            this.$message.success('上传成功')
            this.fileList = []
            this.avatarList =[]
            this.$http.getFaceImages().then(res => {
              // console.log("获取的头像图片为：", res)
              this.avatarList = res.data.data.files
            })
          }else{
            this.$message.warning('失败')
          }
        })
      },
      close() {
        this.$emit('close')
      },
      choose(item) {
        // console.log('ok')
        this.$emit('choose', item)
        this.$emit('close')
      },
    },
    mounted() {
      this.avatarList = []
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

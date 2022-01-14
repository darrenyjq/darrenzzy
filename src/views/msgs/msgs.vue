<template>
    <JwChat-index :config="config" :taleList="taleList" @enter="bindEnter" v-model="inputMsg" :toolConfig="tool"  width="525px" height="570px"/>
</template>

<script>
    import { listMsgs, getMsgs, delMsgs, addMsgs, updateMsgs, listMsgsFromId, omChat, putOmChatImg } from '@/api/member/msgs'
    import {v4 as uuidv4} from 'uuid'
    import { uploadAvatar } from '@/api/system/sysuser'
    import OSS from 'ali-oss';
    const client = new OSS({
      region: 'oss-cn-hongkong',
      accessKeyId: 'LTAI4GJekKBhLYAzVJM6K1Pa',
      accessKeySecret: 'mOrHaivovESF3nqvIaQjLrGWNFMms6',
      bucket: 'identistore'
    });



export default {
  data () {
    return {
      inputMsg: '',
      timer: '',
      getStatus: 0, //第一次获取标识
      count: 0,
      fromId: 0,
      
      // 日期范围
      dateRange: [],

      limitSize: {
        type: Number,
        default: process.env.APP_ENV ? 5 : 3  //MB
      },
      storePrefix: {
        type: String,
        default: 'tmp'
      },
      accept: {
        type: String,
        default: 'image/*'
      },
      taleList: [],
      tool: {
        show: ['img'],
        callback: this.toolEvent,
        showEmoji: false,
      },
      config: {
        name: '客户服务',
        dept: '顾客是上帝',
        callback: this.headerEvent
      },
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        id: undefined,
        count:undefined,
        type: undefined,dealId: undefined,toId: undefined,remark: undefined,orderNo: undefined,amount: undefined,coinId: undefined,username: undefined,createdAt: undefined,fromId: undefined,msg: undefined,orderId: undefined,msgType: undefined,
     },
    }
  },
  beforeCreate() {
    const { fromId } = this.$route.query
    if (fromId) {
       //this.queryParams.pageIndex = 1
       // 获取表详细信息
      getMsgs(fromId).then(res => {
        console.log(res)
        this.taleList = res.data.list
        console.log(this.taleList)
        this.getStatus = 1
        this.count = res.data.count
        this.fromId = fromId
        // const timer = setInterval(() =>{                    
        //     console.log('1');               
        // }, 5000);  
        // taleList = res.data.list
        // console.log(taleList)
      })
    } else {
        console.log('rrrrrrrrrrrrrrrrrrrrrr')
    }
  },
  methods: {
    getList() {
        this.loading = true
        listMsgsFromId(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                this.msgsList = response.data.list
                this.total = response.data.count
                this.loading = false
            }
        )
    },
    //发送 fromId 是toId
    bindEnter () {
      const msg = this.inputMsg
      if (!msg) return;
      this.queryParams.fromId = 10000
      this.queryParams.toId = this.fromId
      this.queryParams.msg = msg
      this.queryParams.msgType = 1
      omChat(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                // this.msgsList = response.data.list
                // this.total = response.data.count
                // this.loading = false
            }
        )
    },

    // 上传图片
      uploadImg(file) {
        
       this.formData = new FormData()
       this.formData.append('files', file, file.name) // 添加到请求体
        
        // const formData = new FormData()
        // formData.append('upload[]', file)
        console.log('formData = ',this.formData)
        putOmChatImg(this.formData).then(response => {
        if (response.code === 200) {
            // this.open = false
            // this.options.img = process.env.VUE_APP_BASE_API + '/' + response.data
            console.log(response)
            this.queryParams.fromId = 10000
            this.queryParams.toId = this.fromId
            this.queryParams.msg = response.data
            this.queryParams.msgType = 2
            omChat(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                      // this.msgsList = response.data.list
                      // this.total = response.data.count
                      // this.loading = false
                  }
              )
        } else {
            this.msgError(response.msg)
        }
        
        })
       
    
      },
     //上传文件
   async uploadFile (name, file) {
        try {
          //let result = await client.multipartUpload(`${this.storePrefix}/${name}`, file, {
          let result = await client.multipartUpload(`msgs/${name}`, file, {
            mime: file.type
          })

          if (result && result.res && result.res.requestUrls && result.res.requestUrls.length > 0) {
            let url = result.res.requestUrls[0]
            const queryIndex = url.indexOf('?')
            if (queryIndex > -1) {
              url = url.substring(0, queryIndex)
            }
            // alert('upload_success')
            this.$emit('change', url)
            console.log('url = ',url)
            this.queryParams.fromId = 10000
            this.queryParams.toId = this.fromId
            this.queryParams.msg = url
            this.queryParams.msgType = 2
            omChat(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                      // this.msgsList = response.data.list
                      // this.total = response.data.count
                      // this.loading = false
                  }
              )
          } else {
            alert('upload_failed' + ' err: -1')
          }
        }catch (e) {
          alert('upload_failed' + ' err: 0')
          console.error(e)
        }
      },

    toolEvent (type) {
      var input = document.createElement("input")
      input.type = "file"
      input.multiple = 'multiple'
      // input.accept = this.accept
      input.click();
      input.onchange  = () => {
          console.log('onchange')
          var file = input.files[0]
          const limitSize = this.limitSize
          //disName.substring(0,5)
          console.log(file.type.substring(0,6))
          if (file.type.substring(0,6) != 'image/'){
             alert('文件类型不是图片')
             return
          }
          console.log(limitSize)
          console.log(file.size)
          console.log(limitSize)
          if (file.size > 3*1024*1024) {
            alert('请选择小于3M的图片')
            return
          }

          console.log(file)
          console.log(file.type)
          try {
            const ext = file.name.split('.').pop()
            const name = uuidv4() + '.' + ext
            console.log(name)
            // this.uploadFile(name,file)
            this.uploadImg(file)
          } catch (e) {
            console.error(e)
            alert('upload_failed' + ' err: -2')
          }
      
      }
      

    },
   
      chooseFile () {
        this.$refs.uploaderRef.click()
      }
    },

            
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
  mounted() {
    this.timer = setInterval(() =>{                    
        console.log('1');  
        if (this.getStatus  == 1){
            this.queryParams.count = this.count
            this.queryParams.fromId = this.fromId
            console.log(this.queryParams)
           listMsgsFromId(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    console.log(response.data.list)
                    console.log(response)
                    console.log(this.count)
                    if (response.data.count > 0){
                        this.count = response.data.count
                        for(var i=0;i<response.data.list.length;i++){
                            // parseTime(scope.row.createdAt)
                            this.taleList.push(response.data.list[i])
                        }
                    }

                }
            )
        } 
                      
    }, 3000);  
  },
  beforeDestroy() {
    console.log(this.timer)
    if(this.timer) {

　　　　clearInterval(this.timer); //关闭

　　 }
  }
}
</script>
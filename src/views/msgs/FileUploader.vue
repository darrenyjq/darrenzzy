<template>
  <div>
    <Field v-bind="$props" :border="border&&!outer" readonly :rules="uploadFieldRules" placeholder="">
      <template #input>
        <input type="file" v-show="false" ref="uploaderRef" @change="afterRead" :accept="accept"/>
      </template>
      <template #extra>
        <slot name="extra"></slot>
      </template>
    </Field>
    <div style="position:relative">
      <slot :url="url || null"></slot>
    </div>
  </div>
</template>

<script>
  import {v4 as uuidv4} from 'uuid'
  import OSS from 'ali-oss';


  const client = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: 'LTAI4GJekKBhLYAzVJM6K1Pa',
    accessKeySecret: 'mOrHaivovESF3nqvIaQjLrGWNFMms6',
    bucket: 'identistore'
  });

  export default {
    name: "FileUploader",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String
      },
      message: String,
      accept: {
        type: String,
        default: 'image/*'
      },
      scaleWidth: {
        type: [String, Boolean],
        default: '375'
      },
      limitSize: {
        type: Number,
        default: process.env.APP_ENV ? 5 : 3  //MB
      },
      removeOrigin: {
        type: Boolean,
        default: true
      },
      storePrefix: {
        type: String,
        default: 'tmp'
      },
      quality: {
        type: Number
      }
    },
    data() {
      let rules = null

      if (this.rules) {
        rules = [
          ...this.rules,
          {
            validator: () => {
              const value = this.value
              if (value && value.startsWith('file://')) {
                throw new Error('upload_failed' + ' err: -3')
              }
            },
            trigger: 'submit'
          }
        ]
      } else if (this.required) {
        rules = [{
          validator: () => {
            const value = this.value
            if (!value) {
              throw new Error(this.message || 'tips.required_upload')
            }
            if (value.startsWith('file://')) {
              throw new Error('upload_failed' + ': ' + this.label)
            }
          },
          trigger: 'submit'
        }]
      }

      return {
        uploadFieldRules: rules
      }
    },
    methods: {
      afterRead (ev) {
        const file = ev.target.files[0]
        if (!file) {
          return
        }

        const limitSize = this.limitSize

        if (limitSize && file.size > limitSize*1024*1024) {
          alert('tips.max_size')
          return
        }

        try {
          // const {data} = await fileSliceUpload(file.file)
          // file.content = fileEntryPoint(data.path)
          const ext = file.name.split('.').pop()
          const name = uuidv4() + '.' + ext
          this.uploadFile(name, file)
        } catch (e) {
          console.error(e)
          alert('upload_failed' + ' err: -2')
        }
      },
      async uploadFile (name, file) {
        try {
          let result = await client.multipartUpload(`${this.storePrefix}/${name}`, file, {
            meta: {userId: this.loginMember.userId},
            mime: file.type
          })

          if (result && result.res && result.res.requestUrls && result.res.requestUrls.length > 0) {
            let url = result.res.requestUrls[0]
            const queryIndex = url.indexOf('?')
            if (queryIndex > -1) {
              url = url.substring(0, queryIndex)
            }
            alert('upload_success')
            this.$emit('change', this.removeOrigin ? url.replace(/^https?:\/\//, '') : url)
          } else {
            alert('upload_failed' + ' err: -1')
          }
        }catch (e) {
          alert('upload_failed' + ' err: 0')
          console.error(e)
        }
      },
      chooseFile () {
        this.$refs.uploaderRef.click()
      }
    },
    computed: {
      scale () {
        const width = this.scaleWidth
        if (width) {
          return '?x-oss-process=image/resize,w_' + width
        }
        return ''
      },
      url () {
        let value = this.value
        if (value && !value.startsWith('file:')) {
          const scale = this.scale
          return 'https://' + value + scale
        } else {
          return value
        }
      }
    }
  }
</script>

<style scoped>

</style>

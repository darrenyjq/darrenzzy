<template>
    <div>
        <el-form ref="queryForm" :model="form" :inline="true" label-width="68px" >
                <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title" placeholder="请输入标题" />
                    </el-form-item>
                <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author" placeholder="请输入作者"  />
                    </el-form-item>

            

                <el-form-item label="状态：" prop="status">
                        <el-select v-model="form.status" placeholder="请输入状态" clearable :style="{width: '100%'}">
                            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                                :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="类型：" prop="class">
                        <el-select v-model="form.class" placeholder="请输入类型" clearable :style="{width: '100%'}">
                            <el-option v-for="(item, index) in classOptions" :key="index" :label="item.label"
                                :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                </el-form-item>

                <el-form-item label="语言：" prop="language">
                        <el-select v-model="form.language" placeholder="请输入类型" clearable :style="{width: '100%'}">
                            <el-option v-for="(item, index) in languageOptions" :key="index" :label="item.label"
                                :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                </el-form-item>
               
                <!-- <el-form-item label="状态" prop="status">
                        <el-input v-model="form.status" placeholder="请输入状态" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <!-- <el-form-item label="类型 " prop="class">
                        <el-input v-model="form.class" placeholder="请输入文章类型" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <div class='tinymce'>
                    <editor id='tinymce' v-model='form.content' :init='init' ></editor>
                </div>
                
             <el-form-item>
                <el-button type="primary"  size="mini" @click="submitForm">确 认</el-button>
                <el-button size="mini" @click="cancel">取 消</el-button>
            </el-form-item>

            <!-- <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>  icon="el-icon-search" icon="el-icon-refresh"
            </div> -->

        </el-form>
 
    </div>
</template>

<script>
    import { listNotices, getNotices, delNotices, addNotices, updateNotices } from '@/api/member/notices'
    import { listMsgs, getMsgs, delMsgs, addMsgs, updateMsgs, listMsgsFromId, omChat, putOmChatImg } from '@/api/member/msgs'
    
    import Editor from '@tinymce/tinymce-vue'

    import 'tinymce/plugins/link' // 链接
    import 'tinymce/plugins/code' // 代码
    import 'tinymce/plugins/table' // 表单
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/paste' // 张贴
    import 'tinymce/plugins/autosave' // 自动保存
    import 'tinymce/plugins/imagetools' // 图片
    import 'tinymce/plugins/image'

    import {v4 as uuidv4} from 'uuid'
    import OSS from 'ali-oss';
    const client = new OSS({
      region: 'oss-cn-hongkong',//oss-cn-hongkong.aliyuncs.com
      accessKeyId: 'LTAI4GJekKBhLYAzVJM6K1Pa',
      accessKeySecret: 'mOrHaivovESF3nqvIaQjLrGWNFMms6',
      bucket: 'identistore'
    });
  
    export default {
        inheritAttrs: false,
        components: {},
        props: [],
        imgurl:"",
        storePrefix: {
            type: String,
            default: 'tmp'
        },

        name: 'Config',
        data() {
            return {
               
                tinymceHtml: '请输入内容',
                init: {
                    language_url: '/public/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/public/tinymce/skins/lightgray',
                    height: 500,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                    'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    branding: false,
                    images_upload_handler: (blobInfo, success, failure) => {
                        console.log(blobInfo)
                        var file = blobInfo.blob();
                        this.imgurl = ""
                        console.log(file)
                        if (file.size > 3*1024*1024) {
                            alert('请选择小于3M的图片')
                            success('')
                            return
                        }

                        try {
                            // const ext = file.name.split('.').pop()
                            // const name = uuidv4() + '.' + ext
                            // console.log(name)
                        //    this.uploadImg(file).then(response => {
                        //        console.log(response)
                        //         success(response)
                                
                        //     })
                            this.formData = new FormData()
                            this.formData.append('files', file, file.name) // 添加到请求体
                            console.log('formData = ',this.formData)
                            putOmChatImg(this.formData).then(response => {
                            if (response.code === 200) {
                                console.log(response) 
                                success(response.data)
                                // return response.data 
                            }
                            })
                           
                        } catch (e) {
                            console.error(e)
                            alert('upload_failed' + ' err: -2')
                            success('')
                        } 

                    }
                },

                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 总条数
                total: 0,
                // 参数表格数据
                configList: [],
                // 弹出层标题
                title: '',
                // 是否显示弹出层
                open: false,
                // 类型数据字典
                typeOptions: [],
                //
                classOptions: [{
                    "label": "公告",
                    "value": 1
                }, {
                    "label": "通知",
                    "value": 2
                },{
                    "label": "广告",
                    "value": 3
                },{
                    "label": "协议",
                    "value": 4
                }
                // ,{
                //     "label": "关于我们",
                //     "value": 5
                // },{
                //     "label": "联系方式",
                //     "value": 6
                // }
                ],
                statusOptions: [{
                    "label": "上架",
                    "value": 1
                }, {
                    "label": "下架",
                    "value": 2
                }],

                languageOptions: [{
                    "label": "en-US",
                    "value": "en-US"
                }, {
                    "label": "zh-TW",
                    "value": "zh-TW"
                },{
                    "label": "zh-Hans-CN",
                    "value": "zh-Hans-CN"
                }],
               
                Options: [{
                    "dictLabel": "上架",
                    "dictValue": 1
                }, {
                    "dictLabel": "下架",
                    "dictValue": 2
                }],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,title: undefined,author: undefined,content: undefined,createdAt: undefined,updatedAt: undefined,status: undefined,class: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '编码不能为空', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                author: [
                    { required: true, message: '作者不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
                createdAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                updatedAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '1 上架 2 下架不能为空', trigger: 'blur' }
                ],
                class: [
                    { required: true, message: '文章类型: 1 公告 2 通知 3 广告不能为空', trigger: 'blur' }
                ],
                }
        }
        },
        created() {
           
            const { fromId } = this.$route.query
            console.log(fromId)
            //获取文章
             if (fromId != undefined){
                console.log("fromId")
                getNotices(fromId).then(response => {
                    console.log(response.data)
                    this.form = response.data
               
                })
             }
           

        },
        mounted () {
            tinymce.init({})
        },
        components: {Editor},
        methods: {
            /** 查询参数列表 */
            // getList() {
            //     this.loading = true
            //     listNotices(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            //             this.noticesList = response.data.list
            //             this.total = response.data.count
            //             this.loading = false
            //         }
            //     )
            // },

         
             //上传文件
            async uploadFile (name, file) {
                try {
                let result = await client.multipartUpload(`notices/${name}`, file, {
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
                    this.imgurl = url
                    console.log(this.imgurl)
                    return url
                    
                } else {
                    alert('upload_failed' + ' err: -1')
                    return ''
                }
                }catch (e) {
                alert('upload_failed' + ' err: 0')
                    return ''
                }
            },
             // 上传图片
            async  uploadImg(file) {
                this.formData = new FormData()
                this.formData.append('files', file, file.name) // 添加到请求体
                console.log('formData = ',this.formData)
                putOmChatImg(this.formData).then(response => {
                if (response.code === 200) {
                    console.log(response) 
                    return response.data 
                }
                })
            },

           
            // 取消按钮
            cancel() {
                this.reset()
                this.$router.push({ path: '/notices/index'})
            },
            // 表单重置
            reset() {
                this.form = {
                id: undefined,
                title: undefined,
                author: undefined,
                content: undefined,
                createdAt: undefined,
                updatedAt: undefined,
                status: undefined,
                class: undefined,
                }
                this.resetForm('form')
            },
        
            /** 新增按钮操作 */
            handleAdd() {
                this.reset()
                this.open = true
                this.title = '添加公告表'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
              
                const id = row.id || this.ids
                
                this.$router.push({ path: '/notices/edit'})
                
            },
            /** 提交按钮 */
            submitForm: function() {
               
                        console.log(this.form)
                        this.form.status = parseInt(this.form.status)
                        this.form.class = parseInt(this.form.class)
                        if (this.form.id !== undefined) {
                            updateNotices(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    //this.open = false
                                    //this.getList()
                                    this.$router.push({ path: '/notices/index'})
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addNotices(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('新增成功')
                                    this.$router.push({ path: '/notices/index'})
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        }
                 
            },
           
        }
    }
</script>








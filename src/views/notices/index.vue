<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            
                <el-form-item label="标题" prop="title">
                        <el-input v-model="queryParams.title" placeholder="请输入标题" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="作者" prop="author">
                        <el-input v-model="queryParams.author" placeholder="请输入作者" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
              
                <el-form-item label="状态" prop="status">
                    <el-select
                    v-model="queryParams.status"
                    placeholder="状态"
                    clearable
                    size="small"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="dict in statusOptions"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                    </el-select>
                </el-form-item>

                <el-form-item label="类型" prop="class">
                    <el-select
                    v-model="queryParams.class"
                    placeholder="类型"
                    clearable
                    size="small"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="dict in classOptions"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                    />
                    </el-select>
                </el-form-item>

                 <el-form-item label="创建时间" prop="createTime">
                    <el-date-picker
                        v-model="queryParams.createTime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
                </el-form-item> 

                <!-- <el-form-item label="状态" prop="status">
                        <el-input v-model="queryParams.status" placeholder="请输入状态" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <!-- <el-form-item label="类型" prop="class">
                        <el-input v-model="queryParams.class" placeholder="请输入类型" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

    

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['notices:notices:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['notices:notices:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['notices:notices:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        

        <el-table v-loading="loading" :data="noticesList" size="mini" highlight-current-row border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <!-- <el-table-column label="编码" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <el-table-column label="标题" align="center" prop="title" :show-overflow-tooltip="true" />
            <el-table-column label="作者" align="center" prop="author" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="内容" align="center" prop="content" :show-overflow-tooltip="true" /> -->

            <el-table-column label="状态" align="center" prop="status" :formatter="status"  />
            <el-table-column label="类型" align="center" prop="class" :formatter="classStatus" />
            <el-table-column label="语言" align="center" prop="language" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createdAt" width="160" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createdAt) }}</span>
            </template>
            </el-table-column>

            <el-table-column label="更新时间" align="center" prop="updatedAt" width="160" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updatedAt) }}</span>
            </template>
            </el-table-column>

             <el-table-column  fixed="right" label="操作" width="170">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">上/下架</el-button>
                    <el-button type="primary" plain size="small"  @click="handleEdit(scope.row)">编辑</el-button>  
                    <!-- <el-button type="primary" plain size="small"  @click="handleinpu(scope.row)">文件上传</el-button>  -->
                    <!-- <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                           -->
			    </template>
            </el-table-column>  

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">

                    <el-button
                            v-permisaction="['notices:notices:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                  
                </template>
            </el-table-column> -->
        </el-table>

        <!-- <template> -->
        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageIndex"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="800px">
        
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择文章类型" clearable :style="{width: '50%'}">
                        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                            :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
            
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import { listNotices, getNotices, delNotices, addNotices, updateNotices } from '@/api/member/notices'
    
    import Editor from '@tinymce/tinymce-vue'
  
    export default {
        inheritAttrs: false,
        components: {},
        props: [],

        name: 'Config',
        data() {
            return {
               

                tinymceHtml: '请输入内容',
                init: {
                    language_url: '/public/tinymce/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/public/tinymce/skins/lightgray',
                    height: 300,
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    toolbar:
                    'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    branding: false
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
                },{
                    "label": "通知",
                    "value": 2
                },{
                    "label": "广告",
                    "value": 3
                },{
                    "label": "协议",
                    "value": 4
                },{
                    "label": "关于我们",
                    "value": 5
                },{
                    "label": "联系方式",
                    "value": 6
                }],
                statusOptions: [{
                    "label": "上架",
                    "value": 1
                }, {
                    "label": "下架",
                    "value": 2
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
            this.getList()
        },
        mounted () {
            tinymce.init({})
        },
        components: {Editor},
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listNotices(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.noticesList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },

           
            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
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
            status(row,column){
                if (row.status == 1){
                    return '上架'
                }else if (row.status == 2){
                    return '下架'
                }else{
                    return ''
                }
            },
            classStatus(row,column){
                if (row.class == 1){
                    return '公告'
                } else if (row.class == 2){
                    return '通知'
                } else if (row.class == 3){
                    return '广告'
                }
                else if (row.class == 4){
                    return '协议'
                }else if (row.class == 5){
                    return '关于我们'
                } else if (row.class == 6){
                    return '联系方式'
                } else {
                    return '未知'
                }
            },
            /** 搜索按钮操作 */
            handleQuery() {
                if(this.queryParams.createTime){
                    this.queryParams.startDate= this.queryParams.createTime[0] ;
                    this.queryParams.endDate=this.queryParams.createTime[1];
                }
                this.queryParams.pageIndex = 1
                this.getList()
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = []
                this.resetForm('queryForm')
                this.handleQuery()
            },
            /** 新增按钮操作 */
            handleAdd() {
                // this.reset()
                // this.open = true
                // this.title = '添加公告表'
                this.$router.push({ path: '/notices/edit'})
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                // this.reset()
                const id = row.id || this.ids
                // this.$router.push({ path: '/notices/edit'})
                console.log(id)
                
                getNotices(id).then(response => {
                    console.log(response.data)
                    this.form = response.data
                    this.open = true
                    this.title = '修改状态'
                })
            },

             
            handleEdit(row){
              
                this.$router.push({ path: '/notices/edit',  query: { fromId: row.id }})
            },
            handleinpu(row){
                getNotices(id).then(response => {
                    console.log(response.data)
                    this.form = response.data
                    this.open = true
                    this.title = '修改状态'
                })
            },

            // 上传图片
            // uploadImg() {
            // this.$refs.cropper.getCropBlob(data => {
            //     const formData = new FormData()
            //     formData.append('upload[]', data)
            //     uploadAvatar(formData).then(response => {
            //     if (response.code === 200) {
            //         this.open = false
            //         this.options.img = process.env.VUE_APP_BASE_API + '/' + response.data
            //         this.msgSuccess('修改成功')
            //     } else {
            //         this.msgError(response.msg)
            //     }
            //     this.$refs.cropper.clearCrop()
            //     })
            // })
            // },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateNotices(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addNotices(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('新增成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        }
                    }
                })
            },
            /** 删除按钮操作 */
            handleDelete(row) {
                const Ids = row.id || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delNotices(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
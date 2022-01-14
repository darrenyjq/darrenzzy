<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <!-- <el-form-item label="用户ID" prop="userId">
                <el-input v-model="queryParams.userId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item> -->

            <el-form-item label="用户名" prop="username">
                <el-input v-model="queryParams.username" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            
            <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
           </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <!--
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['membercapital:membercapital:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            -->
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['membercapital:membercapital:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >认证</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['membercapital:membercapital:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="membercapitalList" highlight-current-row border size="mini" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <!-- <el-table-column label="用户ID" align="center" prop="userId" :show-overflow-tooltip="true" sortable/> -->
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <el-table-column label="真实姓名" align="center" prop="realName" :show-overflow-tooltip="true" />
            <el-table-column label="认证状态" align="center" prop="status" :formatter="status" />
            <el-table-column label="用户身份" align="center" prop="memberType" :formatter="memberType" />
            <el-table-column  fixed="right" label="操作" width="80">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">认证</el-button>  
                    <!-- <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                           -->
			    </template>
            </el-table-column>  
            
        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageIndex"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog title="实名制认证" :visible.sync="open" width="1000px">
            <el-form ref="form" :model="form"    label-width="100px" size="mini">
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="用户ID: ">{{ form.userId }}</el-form-item>
                        <el-form-item label="真实姓名: ">{{ form.realName }}</el-form-item>
                     </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号: ">{{ form.boundNum }}</el-form-item>
                        <el-form-item label="创建时间: ">{{ form.createAt }}</el-form-item>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-form-item label="身份证正面:" prop="fontImage">
                            <img :src="form.fontImage" width="356px" height="200px">
                        </el-form-item>
                        <el-form-item label="身份证背面:" prop="backImage">
                            <img :src="form.backImage" width="356px" height="200px">
                        </el-form-item>
                    </el-col> 

                    <el-col :span="12">
                        <el-form-item label="手持身份证:" prop="handImage">
                            <img :src="form.fontImage" width="356px" height="200px">
                        </el-form-item>
                        
                    </el-col> 

                </el-row>
                <el-form-item label="认证状态：" prop="status">
                        <el-select v-model="form.status" placeholder="请选择认证状态" clearable :style="{width: '50%'}">
                            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.dictLabel"
                                :value="item.dictValue" :disabled="item.disabled"></el-option>
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
    import { listMemberCapital, getMemberCapital, delMemberCapital, addMemberCapital, updateMemberCapital } from '@/api/member/memberCapital'

    export default {
        name: 'Config',
        data() {
            return {
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
                //typeOptions: [],
                // 日期范围
                dateRange: [],
                typeOptions: [{
                    "label": "通过认证",
                    "value": 1
                }, {
                    "label": "未认证",
                    "value": 2
                },{
                    "label": "认证不通过",
                    "value": 3
                }],
                statusOptions: [{
                    "dictLabel": "通过认证",
                    "dictValue": 1
                }, {
                    "dictLabel": "未认证",
                    "dictValue": 2
                },{
                    "dictLabel": "认证不通过",
                    "dictValue": 3
                },{
                    "dictLabel": "待认证",
                    "dictValue": 4
                }],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,userId: undefined,createAt: undefined,fontImage: undefined,backImage: undefined,type: undefined,realName: undefined,password: undefined,handImage: undefined,boundNum: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                userId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                createAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                fontImage: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                backImage: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '1 已认证 2认证失效不能为空', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '交易密码不能为空', trigger: 'blur' }
                ],
                handImage: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                boundNum: [
                    { required: true, message: '身份证件号码不能为空', trigger: 'blur' }
                ],
                }
        }
        },
        created() {
            this.getList()
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listMemberCapital(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        console.log(response)
                        this.membercapitalList = response.data.list
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
                userId: undefined,
                createAt: undefined,
                fontImage: undefined,
                backImage: undefined,
                type: undefined,
                realName: undefined,
                password: undefined,
                handImage: undefined,
                boundNum: undefined,
                }
                this.resetForm('form')
            },
            /** 搜索按钮操作 */
            handleQuery() {
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
                this.reset()
                this.open = true
                this.title = '添加用户实名制'
            },
            // 参数系统内置字典翻译
            memberType(row, column) {
            if (row.memberType == 1 ){
                return '用户'
            } else if (row.memberType == 2){
                return '承兑商'
            } else if (row.memberType == 3){
                return '兑换商'
            } else {
                return '未知'
            }
            
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const id = row.id || this.ids
                getMemberCapital(id).then(response => {
                    console.log(response)
                    this.form = response.data
                    this.form.fontImage = 'https://' + this.form.fontImage
                    this.form.backImage = 'https://' + this.form.backImage
                    var dateee = new Date(this.form.createAt).toJSON()
                    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                    this.form.createAt = date
                    this.open = true
                    this.title = '修改用户实名制'
                })
            },
            // 交易类型
            status(row, column) {
                if (row.status === 1 ){
                    return '通过认证'
                } else if (row.status === 2 )
                {
                    return '未认证'
                } else if (row.status === 3){
                    return '认证不通过'
                } else if(row.status === 4) {
                    return '待认证'
                } else {
                    return '未知'
                }
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateMemberCapital(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMemberCapital(this.form).then(response => {
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
                    return delMemberCapital(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
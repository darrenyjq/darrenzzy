<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
            
                <el-form-item label="配置名称" prop="name">
                        <el-input v-model="queryParams.name" placeholder="请输入配置名称" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <!-- <el-form-item label="是否要强更新" prop="status">
                        <el-input v-model="queryParams.status" placeholder="请选择是否要强更新" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->

                <el-form-item label="是否要强更新" prop="status">
                    <el-select
                    v-model="queryParams.status"
                    placeholder="是否要强更新"
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

                <el-form-item label="平台" prop="platform">
                    <el-select
                    v-model="queryParams.platform"
                    placeholder="平台"
                    clearable
                    size="small"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="dict in platformOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                    </el-select>
                </el-form-item>

                <el-form-item label="用户类型" prop="type">
                    <el-select
                    v-model="queryParams.type"
                    placeholder="用户类型"
                    clearable
                    size="small"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="dict in typeOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                    </el-select>
                </el-form-item>

                <!-- <el-form-item label="平台" prop="platform">
                        <el-input v-model="queryParams.platform" placeholder="请选择平台" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                
                <!-- <el-form-item label="用户类型" prop="type">
                        <el-input v-model="queryParams.type" placeholder="请选择用户类型" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['appconfig:appconfig:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['appconfig:appconfig:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['appconfig:appconfig:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="appconfigList" size="mini" highlight-current-row border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <!-- <el-table-column label="编号" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <el-table-column label="配置名称" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="是否要强更新" align="center" prop="status" :formatter="status" />
            <el-table-column label="平台" align="center" prop="platform" :formatter="platform" />
            <el-table-column label="提审版本号" align="center" prop="version" :show-overflow-tooltip="true" />
            <el-table-column label="最新 app 地址" align="center" prop="address" :show-overflow-tooltip="true" />
            <el-table-column label="用户类型" align="center" prop="type"  :formatter="type"/>

            <el-table-column  fixed="right" label="操作" width="150">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">修改</el-button>  
                    <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                          
			    </template>
            </el-table-column>  

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['appconfig:appconfig:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['appconfig:appconfig:remove']"
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageIndex"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                
                    <el-form-item label="配置名称" prop="name">
                            <el-input v-model="form.name" placeholder="配置名称" />
                        </el-form-item>
                    <!-- <el-form-item label="是否要强更新" prop="status">
                            <el-input v-model="form.status" placeholder="是否要强更新" />
                        </el-form-item> -->
                    <el-form-item label="是否要强更新" prop="status">
                        <el-select v-model="form.status" placeholder="是否要强更新" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.dictLabel"
                            :value="item.dictValue" :disabled="item.disabled"></el-option>
                        </el-select>
                        </el-form-item>
                    <!-- <el-form-item label="平台" prop="platform">
                            <el-input v-model="form.platform" placeholder="平台" />
                        </el-form-item> -->
                    <el-form-item label="平台" prop="platform">
                        <el-select v-model="form.platform" placeholder="平台" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in platformOptions" :key="index" :label="item.dictLabel"
                            :value="item.dictValue" :disabled="item.disabled"></el-option>
                        </el-select>
                        </el-form-item>
                    <el-form-item label="提审版本号" prop="version">
                            <el-input v-model="form.version" placeholder="提审版本号" />
                        </el-form-item>
                    <el-form-item label="最新app地址" prop="address">
                            <el-input v-model="form.address" placeholder="最新 app 地址" />
                        </el-form-item>
                    <!-- <el-form-item label="用户类型" prop="type">
                            <el-input v-model="form.type" placeholder="用户类型" />
                        </el-form-item> -->

                    <el-form-item label="用户类型" prop="type">
                        <el-select v-model="form.type" placeholder="用户类型" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.dictLabel"
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
    import { listAppConfig, getAppConfig, delAppConfig, addAppConfig, updateAppConfig } from '@/api/member/appConfig'

    export default {
        name: 'Config',
        data() {
            return {
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                names:[],
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
                statusOptions: [{
                    "dictLabel": "否",
                    "dictValue": 1
                },{
                    "dictLabel": "是",
                    "dictValue": 2
                }],
                platformOptions: [{
                    "dictLabel": "android",
                    "dictValue": '1'
                }, {
                    "dictLabel": "ios",
                    "dictValue": '2'
                }],
                typeOptions: [{
                    "dictLabel": "用户",
                    "dictValue": 1
                },{
                    "dictLabel": "承兑商",
                    "dictValue": 2
                },{
                    "dictLabel": "兑换商",
                    "dictValue": 3
                }],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,name: undefined,status: undefined,platform: undefined,version: undefined,address: undefined,type: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '配置名称不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '是否要强更新  1 否 2 是不能为空', trigger: 'blur' }
                ],
                platform: [
                    { required: true, message: '平台 1 安卓 2 ios不能为空', trigger: 'blur' }
                ],
                version: [
                    { required: true, message: '提审版本号不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '最新 app 地址不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '1 用户 2 承兑商 3 兑换商不能为空', trigger: 'blur' }
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
                listAppConfig(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.appconfigList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },
            status(row,column){
                if (row.status == 1){
                    return '否'
                }else if (row.status == 2){
                    return '是'
                }else{
                    return '未知'
                }
            },
            platform(row,column){
                if(row.platform == 1){
                    return 'android'
                } else if (row.platform == 2){
                    return 'ios'
                } else {
                    return ''
                }   
            },
            type(row,column){
                if(row.type == 1){
                    return '用户'
                } else if (row.type == 2){
                    return '承兑商'
                } else if(row.type == 3){
                    return '兑换商'
                } else{
                    return ''
                }
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
                name: undefined,
                status: undefined,
                platform: undefined,
                version: undefined,
                address: undefined,
                type: undefined,
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
                this.title = '添加app 版本配置'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            // 多选框选中数据
           
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const id = row.id || this.ids
                getAppConfig(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改app 版本配置'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateAppConfig(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addAppConfig(this.form).then(response => {
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
                 const names = row.name 
                 const Ids = row.id || this.ids
                
                this.$confirm('确认删除"' + names + '"的配置数据?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delAppConfig(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
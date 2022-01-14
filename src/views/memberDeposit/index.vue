<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <!-- <el-form-item label="充币编号" prop="id">
                        <el-input v-model="queryParams.id" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <el-form-item label="用户名" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="币种缩写" prop="symbol">
                        <el-input v-model="queryParams.symbol" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
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
               
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- <el-row :gutter="10" class="mb8">
            
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberdeposit:memberdeposit:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberdeposit:memberdeposit:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="memberdepositList" size="mini" highlight-current-row border @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <!-- <el-table-column label="充币编号" align="center" prop="id" :show-overflow-tooltip="true" />
            <el-table-column label="用户编号" align="center" prop="memberId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <el-table-column label="币种缩写" align="center" prop="symbol" :show-overflow-tooltip="true" />
            <el-table-column label="充币金额" align="center" prop="amount" :show-overflow-tooltip="true" />
            <el-table-column label="交易哈希" align="center" prop="txid" :show-overflow-tooltip="true"  width="500"/>
            <el-table-column label="充币地址" align="center" prop="address" :show-overflow-tooltip="true"  width="350"/>
            <!-- <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" /> -->

            <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="165">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
            </el-table-column> -->

            <el-table-column prop="createTime" label="创建时间" align="center"  width="170" sortable>
                <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
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
        <el-dialog :title="title" :visible.sync="open" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="" prop="id">
                            <el-input v-model="form.id" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="memberId">
                            <el-input v-model="form.memberId" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="symbol">
                            <el-input v-model="form.symbol" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="amount">
                            <el-input v-model="form.amount" placeholder="" />
                        </el-form-item>
                    <el-form-item label="transaction id" prop="txid">
                            <el-input v-model="form.txid" placeholder="transaction id" />
                        </el-form-item>
                    <el-form-item label="充币地址" prop="address">
                            <el-input v-model="form.address" placeholder="充币地址" />
                        </el-form-item>
                    <el-form-item label="" prop="createTime">
                            <el-input v-model="form.createTime" placeholder="" />
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
    import { listMemberDeposit, getMemberDeposit, delMemberDeposit, addMemberDeposit, updateMemberDeposit } from '@/api/member/memberDeposit'

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
                typeOptions: [],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,memberId: undefined,symbol: undefined,amount: undefined,txid: undefined,address: undefined,createTime: undefined,
                    startDate: undefined,endDate: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                memberId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                symbol: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                amount: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                txid: [
                    { required: true, message: 'transaction id不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '充币地址不能为空', trigger: 'blur' }
                ],
                createTime: [
                    { required: true, message: '不能为空', trigger: 'blur' }
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
                listMemberDeposit(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.memberdepositList = response.data.list
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
                memberId: undefined,
                symbol: undefined,
                amount: undefined,
                txid: undefined,
                address: undefined,
                createTime: undefined,
                }
                this.resetForm('form')
            },
            /** 搜索按钮操作 */
            handleQuery() {
                if(this.queryParams.createTime){
                    this.queryParams.startDate= this.queryParams.createTime[0] ;
                    this.queryParams.endDate=this.queryParams.createTime[1];
                }
                console.log(this.queryParams)
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
                this.title = '添加用户充币地址'
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
                getMemberDeposit(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改用户充币地址'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateMemberDeposit(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMemberDeposit(this.form).then(response => {
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
                    return delMemberDeposit(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
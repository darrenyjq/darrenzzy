<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
         
                <el-form-item label="用户 id" prop="memberId">
                        <el-input v-model="queryParams.memberId" placeholder="请输入用户 id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberlevel:memberlevel:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberlevel:memberlevel:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberlevel:memberlevel:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="memberlevelList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <!-- <el-table-column label="" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <el-table-column label="用户ID" align="center" prop="memberId" :show-overflow-tooltip="true" />
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <el-table-column label="上级ID" align="center" prop="beforeId" :show-overflow-tooltip="true" />
            <el-table-column label="上级用户名" align="center" prop="beforeUsername" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="历史 path： 100/101/102" align="center" prop="records" :show-overflow-tooltip="true" /> -->
           <el-table-column  fixed="right" label="操作" width="130">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">查看下级用户</el-button>  
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
        <el-dialog :title="title" :visible.sync="open" width="800px">
            <el-table  v-loading="loading" :data="memberlevelList" @selection-change="handleSelectionChange">
                <el-table-column label="用户ID" align="center" prop="memberId" :show-overflow-tooltip="true" />
                <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            </el-table>
            <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageIndex"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
            />


            <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="" prop="id">
                            <el-input v-model="form.id" placeholder="" />
                        </el-form-item>
                    <el-form-item label="用户 id" prop="memberId">
                            <el-input v-model="form.memberId" placeholder="用户 id" />
                        </el-form-item>
                    <el-form-item label="上家 id" prop="beforeId">
                            <el-input v-model="form.beforeId" placeholder="上家 id" />
                        </el-form-item>
                    <el-form-item label="历史 path： 100/101/102" prop="records">
                            <el-input v-model="form.records" placeholder="历史 path： 100/101/102" />
                        </el-form-item>
                    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>

<script>
    import { listMemberLevel, getMemberLevel, delMemberLevel, addMemberLevel, updateMemberLevel } from '@/api/member/memberLevel'

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
                    pageSize: 10,id: undefined,memberId: undefined,beforeId: undefined,records: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                memberId: [
                    { required: true, message: '用户 id不能为空', trigger: 'blur' }
                ],
                beforeId: [
                    { required: true, message: '上家 id不能为空', trigger: 'blur' }
                ],
                records: [
                    { required: true, message: '历史 path： 100/101/102不能为空', trigger: 'blur' }
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
                listMemberLevel(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        console.log(response)
                        this.memberlevelList = response.data.list
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
                beforeId: undefined,
                records: undefined,
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
                this.title = '添加邀请用户关系表'
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
                const id = row.memberId 
                getMemberLevel(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '下级用户'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateMemberLevel(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMemberLevel(this.form).then(response => {
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
                    return delMemberLevel(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
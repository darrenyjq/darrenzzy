<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
            
            <el-form-item label="申诉人" prop="initiatorUsername">
                <el-input v-model="queryParams.initiatorUsername" placeholder="请输入申诉人" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
                
            <el-form-item label="被申诉人" prop="associateUsername" >
                <el-input v-model="queryParams.associateUsername" placeholder="请输入被申诉人" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="申诉状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="申诉状态"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in typeOptions"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcappeal:otcappeal:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col> -->
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcappeal:otcappeal:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col> -->
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcappeal:otcappeal:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="otcappealList" size="mini" highlight-current-row border @selection-change="handleSelectionChange" >
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            
            <!-- <el-table-column label="申诉编号" align="center" prop="id" :show-overflow-tooltip="true" />
            <el-table-column label="申诉人ID" align="center" prop="initiatorId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="申诉人" align="center" prop="initiatorUsername" :show-overflow-tooltip="true" />

            <!-- <el-table-column label="被申诉人ID" align="center" prop="associateId" :show-overflow-tooltip="true"  width="100"/> -->
            <el-table-column label="被申诉人" align="center" prop="associateUsername" :show-overflow-tooltip="true" />

            <el-table-column label="订单号" align="center" prop="number" :show-overflow-tooltip="true" width="220" />
            <!-- <el-table-column label="单价" align="center" prop="price" :show-overflow-tooltip="true" /> -->
            <el-table-column label="总价(RMB)" align="center" prop="amount" :show-overflow-tooltip="true" width="150"/>
            <el-table-column label="总量" align="center" prop="total" :show-overflow-tooltip="true" />
            <el-table-column label="商家用户" align="center" prop="sponsorUsername" :show-overflow-tooltip="true" width="100"/>
            <el-table-column label="交易用户" align="center" prop="traderUsername" :show-overflow-tooltip="true"  width="100"/>
            <el-table-column label="支付时间" align="center" prop="payTimeString" :show-overflow-tooltip="true" width="150"  sortable/>
            <el-table-column label="完成时间" align="center" prop="finishTimeString" :show-overflow-tooltip="true" width="150"  sortable/>
            <!-- <el-table-column label="支付信息" align="center" prop="payInfo" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="支付快照" align="center" prop="payImage" :show-overflow-tooltip="true" />  -->

            <!-- <el-table-column label="支付快照" align="center"  :show-overflow-tooltip="true" >
                <template slot-scope="scope" >
                    <vue-viewer style="display: inline-block;"
                        :thumb="scope.row.payImage"
                        :full="scope.row.payImage"
                          >
                    </vue-viewer>
                </template>
            </el-table-column>  -->

            <!-- <el-table-column label="广告ID" align="center" prop="advertiseId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="申诉处理状态" align="center" prop="status" :formatter="appealStatus" width="150" />

            <el-table-column  fixed="right" label="操作" width="200">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">订单申诉</el-button>  
                    <el-button size="small" @click="msgsList(scope.row)">聊天记录</el-button>	                          
			    </template>
            </el-table-column>  


            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="150">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['otcappeal:otcappeal:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >订单申诉</el-button>
                    <el-button
                            v-permisaction="['otcappeal:otcappeal:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-view"
                            @click="msgsList(scope.row)"
                    >聊天记录</el-button>
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
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="申诉状态：" prop="status">
                        <el-select v-model="form.status" placeholder="请选择申诉状态" clearable :style="{width: '100%'}">
                            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
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
    import { listOtcAppeal, getOtcAppeal, delOtcAppeal, addOtcAppeal, updateOtcAppeal } from '@/api/member/otcAppeal'

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
                typeOptions: [
                    {
                    "label": "申诉处理--取消订单",
                    "value": 2
                    },
                    {
                    "label": "申诉处理--订单放行",
                    "value": 3
                    },
                    {
                    "label": "未处理",
                    "value": 1
                    },
                ],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,initiatorId: undefined,associateId: undefined,orderId: undefined,status: undefined,createAt: undefined,updateAt: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                initiatorId: [
                    { required: true, message: '申诉者ID不能为空', trigger: 'blur' }
                ],
                associateId: [
                    { required: true, message: '申诉关联者ID不能为空', trigger: 'blur' }
                ],
                orderId: [
                    { required: true, message: '订单ID不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '申诉处理 1.已处理 2.未处理不能为空', trigger: 'blur' }
                ],
                createAt: [
                    { required: true, message: '创建时间不能为空', trigger: 'blur' }
                ],
                updateAt: [
                    { required: true, message: '更新时间不能为空', trigger: 'blur' }
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
                listOtcAppeal(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        console.log(response)
                        this.otcappealList = response.data.list
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
                initiatorId: undefined,
                associateId: undefined,
                orderId: undefined,
                status: undefined,
                createAt: undefined,
                updateAt: undefined,
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
                this.title = '添加OtcAppeal'
            },
            // 交易类型
            appealStatus(row, column) {
                if ( row.status === 1 ){
                    return '未处理'
                } else if ( row.status === 2 ){
                    return '已处理--取消订单'
                } else if ( row.status === 3 ){
                    return '已处理--订单放行'
                }
            },
            // 订单状态  1 创建订单 2 已打款  3确认收到  4未收到，申诉   5结束订单 6完成订单
            status(row, column) {
                if (row.status === 1 ){
                    return '创建订单'
                } else if (row.status === 2 ){
                    return '已打款'
                } else if (row.status === 3){
                    return '确认收到'
                } else if (row.status === 4){
                    return '申诉中'
                } else if (row.status === 5){
                    return '结束订单'
                } else if (row.status === 6){
                    return '完成订单'
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
                console.log(row.id)
                if (row.status === 1){
                    getOtcAppeal(id).then(response => {
                        this.form = response.data
                        this.open = true
                        this.title = '订单申诉'
                    })
                } else {
                     this.$confirm('申诉订单已处理，不能重复处理。', '警告', {
                        cancelButtonText: '关闭',
                        type: 'warning'
                    }).catch(function() {})
                }

               
            },
            // 查看历史记录
            msgsList(row) {
                this.reset()
                const id = row.id || this.ids
                console.log(row.id)
                var num  = row.initiatorId + '|' + row.associateId
                this.$router.push({ path: '/otcAppeal/msgAppeal',query: { orderNo: num }})
                // if (row.status === 1){
                //     // this.$router.push({ path: '/otcAppeal/msgAppeal', query: { fromId: row.fromId }})
                //     this.$router.push({ path: '/otcAppeal/msgAppeal',query: { orderNo: row.number }})
                // } else {
                //      this.$confirm('申诉订单已处理，不能查看用户聊天记录。', '警告', {
                //         cancelButtonText: '关闭',
                //         type: 'warning'
                //     }).catch(function() {})
                // }

               
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateOtcAppeal(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addOtcAppeal(this.form).then(response => {
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
                    return delOtcAppeal(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
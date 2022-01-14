<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
           
                <el-form-item label="用户名" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>

                <el-form-item label="提币状态" prop="status">
                    <el-select
                    v-model="queryParams.status"
                    placeholder="提币状态"
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
                    <el-form-item label="提币方式" prop="isAuto">
                    <el-select
                    v-model="queryParams.canAutoWithdraw"
                    placeholder="提币方式"
                    clearable
                    size="small"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="dict in canAutoWithdrawOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
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
                
               
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberwithdraw:memberwithdraw:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >提币</el-button>
            </el-col> -->
           
        </el-row>

        <el-table v-loading="loading" :data="memberwithdrawList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="提币编号" align="center" prop="id" :show-overflow-tooltip="true" width="100" sortable/> -->
            <!-- <el-table-column label="用户编号" align="center" prop="memberId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="币种编号" align="center" prop="coinId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="币种名称" align="center" prop="symbol" :show-overflow-tooltip="true" />
            <el-table-column label="申请提币总量" align="center" prop="totalAmount" :show-overflow-tooltip="true" width="100"/>
            <el-table-column label="手续费" align="center" prop="fee" :show-overflow-tooltip="true" />
            <el-table-column label="预计到账数量" align="center" prop="arrivedAmount" :show-overflow-tooltip="true"  width="150"/>
            <el-table-column label="提币状态" align="center" prop="status" :formatter="status" />
            <el-table-column label="提币方式" align="center" prop="canAutoWithdraw" :formatter="canAutoWithdraw" />
            <!-- <el-table-column label="审核管理ID" align="center" prop="adminId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="审核管理员" align="center" prop="sysUsername" :show-overflow-tooltip="true" width="100" />
            <!-- <el-table-column label="canAutoWithdraw" align="center" prop="canAutoWithdraw" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="txid" align="center" prop="txid" :show-overflow-tooltip="true" /> -->
            <el-table-column label="提币目标地址" align="center" prop="address" :show-overflow-tooltip="true" width="350"/>
            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="处理时间" align="center" prop="dealTime" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" /> -->

            <el-table-column label="处理时间" align="center" prop="dealTime" width="170" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.dealTime) }}</span>
            </template>
            </el-table-column>

            <el-table-column prop="createTime" label="申请时间" align="center"  width="170" sortable>
                <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
            </el-table-column>

            <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="170">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
            </el-table-column> -->

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['memberwithdraw:memberwithdraw:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >审核</el-button>
                </template>
            </el-table-column> -->

            <el-table-column  fixed="right" label="操作" width="80">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">审核</el-button>  
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
        <el-dialog :title="title" :visible.sync="open" width="700px">

             <el-form ref="form" :model="form"    label-width="120px" size="mini">
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="提币编号: " prop="id">{{ form.id }}</el-form-item>
                        <el-form-item label="操作员: " prop="username">{{ form.username }}</el-form-item>
                     </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请提币总量: " prop="totalAmount">{{ form.totalAmount }}</el-form-item>
                        <el-form-item label="预计到账数量: " prop="arrivedAmount">{{ form.arrivedAmount }}</el-form-item>
                    </el-col>

                    <!-- <el-col :span="12"> -->
                    <el-form-item label="提币目标地址: " prop="address">{{ form.address }}</el-form-item>
                        <el-form-item label=" 操作员备注: " prop="adminRemark">
                        <el-input v-model="form.adminRemark" placeholder="备注"  width="50%"/>
                        </el-form-item>
                    <!-- </el-col> -->
                </el-row>
               
            </el-form>
            <!-- <el-form-item label="备注：" prop="adminRemark">
                <el-input v-model="form.adminRemark" placeholder="备注" />
            </el-form-item> -->
            <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                
                <el-form-item label="审核管理员ID" prop="adminId">
                        <el-input v-model="form.adminId" placeholder="审核管理员ID" />
                    </el-form-item>
                <el-form-item label="transaction id" prop="txid">
                        <el-input v-model="form.txid" placeholder="transaction id" />
                    </el-form-item>
                <el-form-item label="提币目标地址" prop="address">
                        <el-input v-model="form.address" placeholder="提币目标地址" />
                    </el-form-item>
               
            </el-form> -->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="drawCoinForm">放 币</el-button>
                <el-button type="primary" @click="refuseForm">拒 绝</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listMemberWithdraw, getMemberWithdraw, delMemberWithdraw, addMemberWithdraw, updateMemberWithdraw } from '@/api/member/memberWithdraw'
    import { getUserProfile } from '@/api/system/sysuser'

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

                canAutoWithdrawOptions: [{
                    "dictLabel": "人工提币",
                    "dictValue": 1
                }, {
                    "dictLabel": "自动提币",
                    "dictValue": 2
                }],
                statusOptions: [{
                    "dictLabel": "申请提币",
                    "dictValue": 1
                }, {
                    "dictLabel": "提币中",
                    "dictValue": 2
                },{
                    "dictLabel": "提币完成",
                    "dictValue": 3
                }],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,memberId: undefined,coinId: undefined,totalAmount: undefined,fee: undefined,arrivedAmount: undefined,status: undefined,isAuto: undefined,adminId: undefined,canAutoWithdraw: undefined,txid: undefined,address: undefined,remark: undefined,dealTime: undefined,createTime: undefined,
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
                coinId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                totalAmount: [
                    { required: true, message: '申请提币总量不能为空', trigger: 'blur' }
                ],
                fee: [
                    { required: true, message: '手续费不能为空', trigger: 'blur' }
                ],
                arrivedAmount: [
                    { required: true, message: '预计到账数量不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '提现状态不能为空', trigger: 'blur' }
                ],
                isAuto: [
                    { required: true, message: '是否自动不能为空', trigger: 'blur' }
                ],
                adminId: [
                    { required: true, message: '审核管理员ID不能为空', trigger: 'blur' }
                ],
                canAutoWithdraw: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                txid: [
                    { required: true, message: 'transaction id不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '提币目标地址不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '备注（EOS等等币）不能为空', trigger: 'blur' }
                ],
                dealTime: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                createTime: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                adminRemark: [
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
                listMemberWithdraw(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        console.log(response)
                        this.memberwithdrawList = response.data.list
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
                coinId: undefined,
                totalAmount: undefined,
                fee: undefined,
                arrivedAmount: undefined,
                status: undefined,
                isAuto: undefined,
                adminId: undefined,
                canAutoWithdraw: undefined,
                txid: undefined,
                address: undefined,
                remark: undefined,
                dealTime: undefined,
                createTime: undefined,
                }
                this.resetForm('form')
            },
            status(row,column){
                if (row.status == 1){
                    return '申请提币'
                }else if (row.status == 2){
                    return '提币中'
                }else if (row.status == 3){
                    return '提币完成'
                }else if (row.status == 4){
                    return '提币失败'
                }else if (row.status == 5){
                    return '拒绝提币'
                } else {
                    return ''
                }
            },
            canAutoWithdraw(row,column){
                if (row.canAutoWithdraw == 1){
                    return '人工提币'
                } else if (row.canAutoWithdraw == 2){
                    return '自动提币'
                } else {
                    return ''
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
                this.reset()
                this.open = true
                this.title = '添加用户提现表'
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
                if ((row.status == 1 || row.status == 4) && row.canAutoWithdraw == 1){
                    getUserProfile().then(response => {
                    console.log(response)
                    //this.form.adminId = response.data.id
                    //this.form.username = response.data.username
                    getMemberWithdraw(id).then(responseWithdraw => {
                    this.form = responseWithdraw.data
                    this.form.username = response.data.username
                    this.form.adminId = response.data.userId
                    this.open = true
                    this.title = '放币申请'
                    })

                    // updateMemberAccount(this.form).then(response => {
                    //     if (response.code === 200) {
                    //         this.msgSuccess('修改成功')
                    //         this.open = false
                    //         this.getList()
                    //     } else {
                    //         this.msgError(response.msg)
                    //     }
                    // })
                    })

                    // getMemberWithdraw(id).then(response => {
                    // this.form = response.data
                    // this.open = true
                    // this.title = '提币'
                    // })
                } else {
                    this.$confirm('此状态不允许审核操作，请处理申请提币与提币失败交易。', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).catch(function() {})
                }
               
            },
            /** 提币按钮 */
            drawCoinForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.form.status = 2
                        console.log(this.form)   
                        console.log(this.open)
                        updateMemberWithdraw(this.form).then(response => {
                            this.open = false
                            if (response.code === 200) {
                                this.msgSuccess('修改成功')
                                this.open = false
                                this.getList()
                            } else {
                                // this.open = false
                                // //this.msgError(response.msg)
                                // this.getList()
                                this.msgSuccess('修改成功')
                                this.open = false
                                this.getList()
                            }
                        }).catch(function() {
                            //this.msgError(response.msg)
                            this.open = false
                            this.getList()
                        })
                    }
                })
            },
             /** 拒绝按钮 */
            refuseForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        console.log(this.form)
                        this.form.status = 5
                        updateMemberWithdraw(this.form).then(response => {
                            if (response.code === 200) {
                                this.msgSuccess('修改成功')
                                this.open = false
                                this.getList()
                            } else {
                                this.msgError(response.msg)
                                this.open = false
                                this.getList()
                            }
                        })
                    }
                })
            },
            /** 提交按钮 */
            // submitForm: function() {
            //     this.$refs['form'].validate(valid => {
            //         if (valid) {
            //             console.log(this.form)
            //             if (this.form.id !== undefined) {
            //                 // if (this.form.status == 1){
            //                 //     this.form.status = 2
            //                 // } else if (this.form.status == ){
            //                 //     this.form.status = 3    
            //                 // }
                            
            //                 updateMemberWithdraw(this.form).then(response => {
            //                     if (response.code === 200) {
            //                         this.msgSuccess('修改成功')
            //                         this.open = false
            //                         this.getList()
            //                     } else {
            //                         this.msgError(response.msg)
            //                     }
            //                 })
            //             } else {
            //                 addMemberWithdraw(this.form).then(response => {
            //                     if (response.code === 200) {
            //                         this.msgSuccess('新增成功')
            //                         this.open = false
            //                         this.getList()
            //                     } else {
            //                         this.msgError(response.msg)
            //                     }
            //                 })
            //             }
            //         }
            //     })
            // },
            /** 删除按钮操作 */
            handleDelete(row) {
                const Ids = row.id || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delMemberWithdraw(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
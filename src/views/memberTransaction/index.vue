<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable size="small" @keyup.enter.native="handleQuery" />
                </el-form-item>
               
                 <el-form-item label="交易方式" prop="type">
                    <el-select
                    v-model="queryParams.type"
                    placeholder="交易方式"
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
                        v-permisaction="['membertransaction:membertransaction:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['membertransaction:membertransaction:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['membertransaction:membertransaction:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="membertransactionList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <!-- <el-table-column label="流水编号" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="用户编号" align="center" prop="memberId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="币种编号" align="center" prop="coinId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="币种名称" align="center" prop="symbol" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="交易编号" align="center" prop="accountId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="操作员" align="center" prop="nickName" :formatter="adminId"  />
            <el-table-column label="交易金额" align="center" prop="amount" :show-overflow-tooltip="true" />
            <el-table-column label="手续费" align="center" prop="fee" :show-overflow-tooltip="true" />
            <el-table-column label="实收手续费" align="center" prop="realFee" :show-overflow-tooltip="true" />
            <el-table-column label="当前币总量" align="center" prop="balance" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="币历史数量" align="center" prop="historyAmount" :show-overflow-tooltip="true" />
            <el-table-column label="交易币总量" align="center" prop="dealAmount" :show-overflow-tooltip="true" />
            <el-table-column label="剩余币量" align="center" prop="remainAmount" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="账户状态" align="center" prop="status" :formatter="status" /> -->
            <el-table-column label="交易方式" align="center" prop="type" :formatter="type" />
            <!-- <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" /> -->
            <el-table-column prop="createTime" label="创建时间" align="center"  width="170" sortable>
                <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
            <el-table-column label="当前汇率(CNY)" align="center" prop="rate" :show-overflow-tooltip="true" width="120"/>
            <!-- <el-table-column label="对方用户ID" align="center" prop="otherMemberId" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="对方币种ID" align="center" prop="otherCoinId" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="对方交易金额" align="center" prop="otherAmount" :show-overflow-tooltip="true" width="150"/>
            <el-table-column label="非订单交易记录ID" align="center" prop="dealId" :show-overflow-tooltip="true" width="170"/>
            <el-table-column label="提币记录ID" align="center" prop="withdrawId" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="充币记录ID" align="center" prop="depositId" :show-overflow-tooltip="true" width="120"/> -->
            

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['membertransaction:membertransaction:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['membertransaction:membertransaction:remove']"
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
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="" prop="id">
                            <el-input v-model="form.id" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="memberId">
                            <el-input v-model="form.memberId" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="coinId">
                            <el-input v-model="form.coinId" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="amount">
                            <el-input v-model="form.amount" placeholder="" />
                        </el-form-item>
                    <el-form-item label="手续费" prop="fee">
                            <el-input v-model="form.fee" placeholder="手续费" />
                        </el-form-item>
                    <el-form-item label="实收手续费（用户等级或者月卡优惠等等情况）" prop="realFee">
                            <el-input v-model="form.realFee" placeholder="实收手续费（用户等级或者月卡优惠等等情况）" />
                        </el-form-item>
                    <el-form-item label="" prop="createTime">
                            <el-input v-model="form.createTime" placeholder="" />
                        </el-form-item>
                    <el-form-item label="钱包交易之后的剩余数量" prop="historyAmount">
                            <el-input v-model="form.historyAmount" placeholder="钱包交易之后的剩余数量" />
                        </el-form-item>
                    <el-form-item label="" prop="remark">
                            <el-input v-model="form.remark" placeholder="" />
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
    import { listMemberTransaction, getMemberTransaction, delMemberTransaction, addMemberTransaction, updateMemberTransaction, getmemberCount } from '@/api/member/memberTransaction'

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
                
                typeOptions: [
                      {
                    "dictLabel": "充币",
                    "dictValue": 1
                }, {
                    "dictLabel": "提币",
                    "dictValue": 2
                },

                {
                    "dictLabel": "转账",
                    "dictValue": 3
                },
                {
                    "dictLabel": "币币交易",
                    "dictValue": 4
                },{
                    "dictLabel": "买币",
                    "dictValue": 5
                },{
                    "dictLabel": "卖币",
                    "dictValue": 6
                },
               
                {
                    "dictLabel": "佣金",
                    "dictValue": 8
                },
               
                {
                    "dictLabel": "系统人工充值",
                    "dictValue": 11
                },
               
                {
                    "dictLabel": "兑汇",
                    "dictValue": 18
                }
                //     {
                //     "dictLabel": "充值",
                //     "dictValue": 1
                // }, {
                //     "dictLabel": "提现",
                //     "dictValue": 2
                // },{
                //     "dictLabel": "转账",
                //     "dictValue": 3
                // },{
                //     "dictLabel": "币币交易",
                //     "dictValue": 4
                // },{
                //     "dictLabel": "法币买入",
                //     "dictValue": 5
                // },{
                //     "dictLabel": "法币卖出",
                //     "dictValue": 6
                // },{
                //     "dictLabel": "活动奖励",
                //     "dictValue": 7
                // },{
                //     "dictLabel": "推广奖励",
                //     "dictValue": 8
                // },{
                //     "dictLabel": "分红",
                //     "dictValue": 9
                // },{
                //     "dictLabel": "投票",
                //     "dictValue": 10
                // },{
                //     "dictLabel": "人工充值",
                //     "dictValue": 11
                // },{
                //     "dictLabel": "配对",
                //     "dictValue": 12
                // },{
                //     "dictLabel": "活动兑换",
                //     "dictValue": 13
                // },{
                //     "dictLabel": "CTC 买入",
                //     "dictValue": 14
                // },{
                //     "dictLabel": "CTC 卖出",
                //     "dictValue": 15
                // },{
                //     "dictLabel": "红包发出",
                //     "dictValue": 16
                // },{
                //     "dictLabel": "红包领取",
                //     "dictValue": 17
                // },{
                //     "dictLabel": "兑汇",
                //     "dictValue": 18
                // }
                ],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,memberId: undefined,coinId: undefined,amount: undefined,fee: undefined,realFee: undefined,createTime: undefined,historyAmount: undefined,remark: undefined,
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
                amount: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                fee: [
                    { required: true, message: '手续费不能为空', trigger: 'blur' }
                ],
                realFee: [
                    { required: true, message: '实收手续费（用户等级或者月卡优惠等等情况）不能为空', trigger: 'blur' }
                ],
                createTime: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                historyAmount: [
                    { required: true, message: '钱包交易之后的剩余数量不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                }
        }
        },
        created() {
            this.getList()
            this.getCount()
            // this.$confirm('不允许管理员修改此状态，管理员只能修改 \'确认收到\' 状态', '警告', {
            //             cancelButtonText: '关闭',
            //             type: 'warning'
            //         }).catch(function() {})
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listMemberTransaction(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.membertransactionList = response.data.list
                        console.log(this.membertransactionList)
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },
            getCount() {
                this.loading = true
                getmemberCount().then(response => {
                        console.log(response)
                        //this.membertransactionList = response.data.list
                        if (response.memberCount != 0 || response.msgsCount != 0 || response.sumCount){
                            this.$confirm('今日待处理任务：成员实名认证等待审核' + response.memberCount +' 条，客服待处理信息 ' + response.msgsCount + ' 条，账单对账不平 ' + response.sumCount+' 条', '通知', {
                            cancelButtonText: '关闭',
                            type: 'warning'
                            }).catch(function() {})
                        }
                        // console.log(response)
                        //this.total = response.data.count
                        //this.loading = false
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
                amount: undefined,
                fee: undefined,
                realFee: undefined,
                createTime: undefined,
                historyAmount: undefined,
                remark: undefined,
                }
                this.resetForm('form')
            },
            status(row,column){
                if (row.status == 1){
                    return '正常'
                }else if (row.status == 2){
                    return '冻结'
                }else{
                    return ''
                }
            },
            adminId(row,column){
                if (row.adminId == 0){
                    return '无'
                }else{
                    return  row.nickName
                }
            },
            type(row, column) {
                var text = ''
                 switch(row.type){
                case 1:
                    text = '充币'
                    break;
                case 2:
                    text = '提币'
                    break;
                case 3:
                    text = '转账'
                    break;
                case 4:
                    text = '币币交易'
                    break;
                case 5:
                    text = '买币'
                    break;
                case 6:
                    text = '卖币'
                    break;
                case 7:
                    text = '活动奖励'
                    break;
                case 8:
                    text = '佣金'
                    break;
                case 9:
                    text = '分红'
                    break;
                case 10:
                    text = '投票'
                    break;
                case 11:
                    text = '系统人工充值'
                    break;
                case 12:
                    text = '配对'
                    break;
                case 13:
                    text = '活动兑换'
                    break;
                case 14:
                    text = 'CTC 买入'
                    break;
                case 15:
                    text = 'CTC 卖出'
                    break;
                case 16:
                    text = '红包发出'
                    break;
                case 17:
                    text = '红包领取'
                    break;
                case 18:
                    text = '兑汇'
                    break;
                default:
                    text = '未知'
                }
                return text
                
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
                this.title = '添加用户交易流水'
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
                getMemberTransaction(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改用户交易流水'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateMemberTransaction(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMemberTransaction(this.form).then(response => {
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
                    return delMemberTransaction(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
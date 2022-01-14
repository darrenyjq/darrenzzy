<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <!-- <el-form-item label="" prop="id">
                        <el-input v-model="queryParams.id" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <el-form-item label="用户名" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="币种" prop="symbol">
                        <el-input v-model="queryParams.symbol" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <!-- <el-form-item label="交易方式" prop="amount">
                        <el-input v-model="queryParams.amount" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->

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

                <!-- <el-form-item label="手续费" prop="fee">
                        <el-input v-model="queryParams.fee" placeholder="请输入手续费" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="实收手续费（用户等级或者月卡优惠等等情况）" prop="realFee">
                        <el-input v-model="queryParams.realFee" placeholder="请输入实收手续费（用户等级或者月卡优惠等等情况）" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="createTime">
                        <el-input v-model="queryParams.createTime" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="钱包交易之后的剩余数量" prop="historyAmount">
                        <el-input v-model="queryParams.historyAmount" placeholder="请输入钱包交易之后的剩余数量" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="资金账户id" prop="accountId">
                        <el-input v-model="queryParams.accountId" placeholder="请输入资金账户id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="当前汇率" prop="rate">
                        <el-input v-model="queryParams.rate" placeholder="请输入当前汇率" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['tblsummember:tblsummember:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['tblsummember:tblsummember:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['tblsummember:tblsummember:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="tblsummemberList" size="mini"  highlight-current-row border @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <!-- <el-table-column label="交易编号" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="用户ID" align="center" prop="memberId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="币种ID" align="center" prop="coinId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="币种" align="center" prop="symbol" :show-overflow-tooltip="true" />
            <el-table-column label="交易方式" align="center" prop="type" :formatter="type" />
            <el-table-column label="统计金额" align="center" prop="amount" :show-overflow-tooltip="true" />
            <el-table-column label="统计手续费" align="center" prop="fee" :show-overflow-tooltip="true" />
            <el-table-column label="统计实收手续费" align="center" prop="realFee" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="钱包交易之后的剩余数量" align="center" prop="historyAmount" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="资金账户id" align="center" prop="accountId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="创建时间" align="center" prop="createTime" width="150" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
            </el-table-column>
            <el-table-column label="结算时间" align="center" prop="settleDate" width="150" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.settleDate) }}</span>
            </template>
            </el-table-column>
            <!-- <el-table-column label="当前汇率" align="center" prop="rate" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['tblsummember:tblsummember:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['tblsummember:tblsummember:remove']"
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
                    <el-form-item label="资金账户id" prop="accountId">
                            <el-input v-model="form.accountId" placeholder="资金账户id" />
                        </el-form-item>
                    <el-form-item label="当前汇率" prop="rate">
                            <el-input v-model="form.rate" placeholder="当前汇率" />
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
    import { listTblSumMember, getTblSumMember, delTblSumMember, addTblSumMember, updateTblSumMember } from '@/api/member/tblSumMember'

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
                     
                //      {
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
                    pageSize: 10,id: undefined,memberId: undefined,coinId: undefined,amount: undefined,fee: undefined,realFee: undefined,createTime: undefined,historyAmount: undefined,accountId: undefined,rate: undefined,
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
                accountId: [
                    { required: true, message: '资金账户id不能为空', trigger: 'blur' }
                ],
                rate: [
                    { required: true, message: '当前汇率不能为空', trigger: 'blur' }
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
                listTblSumMember(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.tblsummemberList = response.data.list
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
                amount: undefined,
                fee: undefined,
                realFee: undefined,
                createTime: undefined,
                historyAmount: undefined,
                accountId: undefined,
                rate: undefined,
                }
                this.resetForm('form')
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
                this.title = '添加用户交易流水统计'
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
                getTblSumMember(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改用户交易流水统计'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateTblSumMember(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addTblSumMember(this.form).then(response => {
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
                    return delTblSumMember(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
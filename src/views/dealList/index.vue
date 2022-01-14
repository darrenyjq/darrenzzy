<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
            <!-- <el-form-item label=" 交易类型  与流水表类型一致" prop="type">
                        <el-input v-model="queryParams.type" placeholder="请输入 交易类型  与流水表类型一致" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="转账 发起用户 id" prop="fromId">
                        <el-input v-model="queryParams.fromId" placeholder="请输入转账 发起用户 id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="交易总量" prop="fromAmount">
                        <el-input v-model="queryParams.fromAmount" placeholder="请输入交易总量" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="转账给到用户id" prop="toId">
                        <el-input v-model="queryParams.toId" placeholder="请输入转账给到用户id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="创建时间" prop="createAt">
                        <el-input v-model="queryParams.createAt" placeholder="请输入创建时间" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="交易币种" prop="fromCoinId">
                        <el-input v-model="queryParams.fromCoinId" placeholder="请输入交易币种" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="汇率" prop="rate">
                        <el-input v-model="queryParams.rate" placeholder="请输入汇率" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="主键" prop="id">
                        <el-input v-model="queryParams.id" placeholder="请输入主键" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="备注" prop="remark">
                        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="交易单号" prop="number">
                        <el-input v-model="queryParams.number" placeholder="请输入交易单号" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="收到交易总量  " prop="toAmount">
                        <el-input v-model="queryParams.toAmount" placeholder="请输入收到交易总量  " clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="收到交易币种" prop="toCoinId">
                        <el-input v-model="queryParams.toCoinId" placeholder="请输入收到交易币种" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->

                 <el-form-item label="发起用户名" prop="fromUsername">
                        <el-input v-model="queryParams.fromUsername" placeholder="请输入发起用户名" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                     <el-form-item label="接收用户名" prop="toUsername">
                        <el-input v-model="queryParams.toUsername" placeholder="请输入接收用户名" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="消息类型" prop="type">
                    <el-select
                    v-model="queryParams.type"
                    placeholder="消息类型"
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
                        v-permisaction="['deallist:deallist:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['deallist:deallist:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['deallist:deallist:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="deallistList" size="mini" highlight-current-row border @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="交易类型" align="center" prop="type" :formatter="type" />
            <el-table-column label="发起用户ID" align="center" prop="fromId" :show-overflow-tooltip="true" />
             <el-table-column label="发起用户名" align="center" prop="fromUsername" :show-overflow-tooltip="true" />
            <el-table-column label="交易总量" align="center" prop="fromAmount" :show-overflow-tooltip="true" />
            <el-table-column label="接收用户ID" align="center" prop="toId" :show-overflow-tooltip="true" />
            <el-table-column label="接收用户名" align="center" prop="toUsername" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="创建时间" align="center" prop="createAt" :show-overflow-tooltip="true" /> -->
            <el-table-column label="交易币种" align="center" prop="fromSymbol" :show-overflow-tooltip="true" />
            <el-table-column label="汇率(CNY)" align="center" prop="rate" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="主键" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            
            <el-table-column label="交易单号" align="center" prop="number" :show-overflow-tooltip="true" width="220"/>
            <el-table-column label="收到交易总量  " align="center" prop="toAmount" :show-overflow-tooltip="true" />
            <el-table-column label="收到交易币种" align="center" prop="toSymbol" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="收到交易币种名称" align="center" prop="toSymbol" :show-overflow-tooltip="true" /> -->

            <el-table-column label="创建时间" align="center" prop="createdAt" width="160" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createAt) }}</span>
            </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['deallist:deallist:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['deallist:deallist:remove']"
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
                <el-form-item label=" 交易类型  与流水表类型一致" prop="type">
                            <el-input v-model="form.type" placeholder=" 交易类型  与流水表类型一致" />
                        </el-form-item>
                    <el-form-item label="转账 发起用户 id" prop="fromId">
                            <el-input v-model="form.fromId" placeholder="转账 发起用户 id" />
                        </el-form-item>
                    <el-form-item label="交易总量" prop="fromAmount">
                            <el-input v-model="form.fromAmount" placeholder="交易总量" />
                        </el-form-item>
                    <el-form-item label="转账给到用户id" prop="toId">
                            <el-input v-model="form.toId" placeholder="转账给到用户id" />
                        </el-form-item>
                    <el-form-item label="创建时间" prop="createAt">
                            <el-input v-model="form.createAt" placeholder="创建时间" />
                        </el-form-item>
                    <el-form-item label="交易币种" prop="fromCoinId">
                            <el-input v-model="form.fromCoinId" placeholder="交易币种" />
                        </el-form-item>
                    <el-form-item label="汇率(CNY)" prop="rate">
                            <el-input v-model="form.rate" placeholder="汇率(CNY)" />
                        </el-form-item>
                    <el-form-item label="主键" prop="id">
                            <el-input v-model="form.id" placeholder="主键" />
                        </el-form-item>
                    <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark" placeholder="备注" />
                        </el-form-item>
                    <el-form-item label="交易单号" prop="number">
                            <el-input v-model="form.number" placeholder="交易单号" />
                        </el-form-item>
                    <el-form-item label="收到交易总量  " prop="toAmount">
                            <el-input v-model="form.toAmount" placeholder="收到交易总量  " />
                        </el-form-item>
                    <el-form-item label="收到交易币种" prop="toCoinId">
                            <el-input v-model="form.toCoinId" placeholder="收到交易币种" />
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
    import { listDealList, getDealList, delDealList, addDealList, updateDealList } from '@/api/member/dealList'

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
                // typeOptions: [],
                typeOptions: [
                //     {
                //     "dictLabel": "充币",
                //     "dictValue": 1
                // }, {
                //     "dictLabel": "提币",
                //     "dictValue": 2
                // },

                {
                    "dictLabel": "转账",
                    "dictValue": 3
                },
                // {
                //     "dictLabel": "币币交易",
                //     "dictValue": 4
                // },{
                //     "dictLabel": "入账",
                //     "dictValue": 5
                // },{
                //     "dictLabel": "出账",
                //     "dictValue": 6
                // },
               
                // {
                //     "dictLabel": "佣金",
                //     "dictValue": 8
                // },
               
                // {
                //     "dictLabel": "人工充值",
                //     "dictValue": 11
                // },
               
                {
                    "dictLabel": "兑汇",
                    "dictValue": 18
                }],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,type: undefined,fromId: undefined,fromAmount: undefined,toId: undefined,createAt: undefined,fromCoinId: undefined,rate: undefined,id: undefined,remark: undefined,number: undefined,toAmount: undefined,toCoinId: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {type: [
                    { required: true, message: ' 交易类型  与流水表类型一致不能为空', trigger: 'blur' }
                ],
                fromId: [
                    { required: true, message: '转账 发起用户 id不能为空', trigger: 'blur' }
                ],
                fromAmount: [
                    { required: true, message: '交易总量不能为空', trigger: 'blur' }
                ],
                toId: [
                    { required: true, message: '转账给到用户id不能为空', trigger: 'blur' }
                ],
                createAt: [
                    { required: true, message: '创建时间不能为空', trigger: 'blur' }
                ],
                fromCoinId: [
                    { required: true, message: '交易币种不能为空', trigger: 'blur' }
                ],
                rate: [
                    { required: true, message: '汇率不能为空', trigger: 'blur' }
                ],
                id: [
                    { required: true, message: '主键不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '备注不能为空', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '交易单号不能为空', trigger: 'blur' }
                ],
                toAmount: [
                    { required: true, message: '收到交易总量  不能为空', trigger: 'blur' }
                ],
                toCoinId: [
                    { required: true, message: '收到交易币种不能为空', trigger: 'blur' }
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
                listDealList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.deallistList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
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
                    text = '入账'
                    break;
                case 6:
                    text = '出账'
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
                    text = '人工充值'
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

            // 取消按钮
            cancel() {
                this.open = false
                this.reset()
            },
            // 表单重置
            reset() {
                this.form = {
                type: undefined,
                fromId: undefined,
                fromAmount: undefined,
                toId: undefined,
                createAt: undefined,
                fromCoinId: undefined,
                rate: undefined,
                id: undefined,
                remark: undefined,
                number: undefined,
                toAmount: undefined,
                toCoinId: undefined,
                }
                this.resetForm('form')
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
                this.title = '添加非订单交易记录表'
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
                getDealList(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改非订单交易记录表'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateDealList(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addDealList(this.form).then(response => {
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
                    return delDealList(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
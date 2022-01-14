<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
            <!-- <el-form-item label="" prop="id">
                        <el-input v-model="queryParams.id" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <!-- <el-form-item label="消息类型" prop="type">
                        <el-input v-model="queryParams.type" placeholder="请输入消息类型" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->

                <!-- <el-form-item label="消息类型" prop="type">
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
                </el-form-item> -->
                
                <!-- <el-form-item label="对应交易信息 id" prop="dealId">
                        <el-input v-model="queryParams.dealId" placeholder="请输入对应交易信息 id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="接收者 id" prop="toId">
                        <el-input v-model="queryParams.toId" placeholder="请输入接收者 id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="备注" prop="remark">
                        <el-input v-model="queryParams.remark" placeholder="请输入备注" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="订单编号" prop="orderNo">
                        <el-input v-model="queryParams.orderNo" placeholder="请输入订单编号" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="数量" prop="amount">
                        <el-input v-model="queryParams.amount" placeholder="请输入数量" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="币 id" prop="coinId">
                        <el-input v-model="queryParams.coinId" placeholder="请输入币 id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="对方昵称" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入对方昵称" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="消息时间戳 字符串" prop="createdAt">
                        <el-input v-model="queryParams.createdAt" placeholder="请输入消息时间戳 字符串" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="发送者 id" prop="fromId">
                        <el-input v-model="queryParams.fromId" placeholder="请输入发送者 id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="聊天内容" prop="msg">
                        <el-input v-model="queryParams.msg" placeholder="请输入聊天内容" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="订单主键" prop="orderId">
                        <el-input v-model="queryParams.orderId" placeholder="请输入订单主键" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <!-- <el-form-item label="聊天消息类型" prop="msgType">
                        <el-input v-model="queryParams.msgType" placeholder="请输入聊天消息类型" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                    <!-- <el-form-item label="聊天消息类型" prop="msgType">
                    <el-select
                    v-model="queryParams.msgType"
                    placeholder="消息类型"
                    clearable
                    size="small"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="dict in msgTypeOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                    </el-select>
                </el-form-item> -->

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
                <!-- <el-button icon="el-icon-refresh" size="mini" @click="msgsQuery">客服</el-button> -->
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="msgsList" size="mini" highlight-current-row border @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <!-- <el-table-column label="" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="消息类型" align="center" prop="type" :formatter="type" />
            <el-table-column label="对应交易信息ID" align="center" prop="dealId" :show-overflow-tooltip="true" />
            <el-table-column label="接收者ID" align="center" prop="toId" :show-overflow-tooltip="true" />
            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
            <el-table-column label="订单编号" align="center" prop="orderNo" :show-overflow-tooltip="true" />
            <el-table-column label="数量" align="center" prop="amount" :show-overflow-tooltip="true" />
            <el-table-column label="币种ID" align="center" prop="coinId" :show-overflow-tooltip="true" />
            <el-table-column label="对方昵称" align="center" prop="username" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="消息时间戳" align="center" prop="createdAt" :show-overflow-tooltip="true" /> -->
            <el-table-column label="发送消息用户" align="center" prop="username" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="发送者ID" align="center" prop="fromId" :show-overflow-tooltip="true"  /> -->
            <!-- <el-table-column label="聊天内容" align="center" prop="msg" :show-overflow-tooltip="true" />
            <el-table-column label="订单主键" align="center" prop="orderId" :show-overflow-tooltip="true" />
            <el-table-column label="聊天消息类型" align="center" prop="msgType" :formatter="msyType" /> -->

            <el-table-column label="创建时间" align="center" prop="createdAt" sortable >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createdAt) }}</span>
            </template>
            </el-table-column>

            <el-table-column  fixed="right" label="操作" width="110">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">回复消息</el-button>  
                    <!-- <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">上传</el-button>  -->
                    <!-- <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                           -->
			    </template>
            </el-table-column>  
            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['msgs:msgs:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >回复消息</el-button>
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
                    <el-form-item label="消息类型" prop="type">
                            <el-input v-model="form.type" placeholder="消息类型" />
                        </el-form-item>
                    <el-form-item label="对应交易信息 id" prop="dealId">
                            <el-input v-model="form.dealId" placeholder="对应交易信息 id" />
                        </el-form-item>
                    <el-form-item label="接收者 id" prop="toId">
                            <el-input v-model="form.toId" placeholder="接收者 id" />
                        </el-form-item>
                    <el-form-item label="备注" prop="remark">
                            <el-input v-model="form.remark" placeholder="备注" />
                        </el-form-item>
                    <el-form-item label="订单编号" prop="orderNo">
                            <el-input v-model="form.orderNo" placeholder="订单编号" />
                        </el-form-item>
                    <el-form-item label="数量" prop="amount">
                            <el-input v-model="form.amount" placeholder="数量" />
                        </el-form-item>
                    <el-form-item label="币 id" prop="coinId">
                            <el-input v-model="form.coinId" placeholder="币 id" />
                        </el-form-item>
                    <el-form-item label="对方昵称" prop="username">
                            <el-input v-model="form.username" placeholder="对方昵称" />
                        </el-form-item>
                    <el-form-item label="创建时间" prop="createdAt">
                            <el-input v-model="form.createdAt" placeholder="创建时间" />
                        </el-form-item>
                    <el-form-item label="发送者 id" prop="fromId">
                            <el-input v-model="form.fromId" placeholder="发送者 id" />
                        </el-form-item>
                    <el-form-item label="聊天内容" prop="msg">
                            <el-input v-model="form.msg" placeholder="聊天内容" />
                        </el-form-item>
                    <el-form-item label="订单主键" prop="orderId">
                            <el-input v-model="form.orderId" placeholder="订单主键" />
                        </el-form-item>
                    <el-form-item label="聊天消息 类型 1  text  2 img" prop="msgType">
                            <el-input v-model="form.msgType" placeholder="聊天消息 类型 1  text  2 img" />
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
    import { listMsgs, getMsgs, delMsgs, addMsgs, updateMsgs } from '@/api/member/msgs'

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
                typeOptions: [{
                    "dictLabel": "充值",
                    "dictValue": 1
                }, {
                    "dictLabel": "提现",
                    "dictValue": 2
                },{
                    "dictLabel": "转账",
                    "dictValue": 3
                },{
                    "dictLabel": "币币交易",
                    "dictValue": 4
                },{
                    "dictLabel": "法币买入",
                    "dictValue": 5
                },{
                    "dictLabel": "法币卖出",
                    "dictValue": 6
                },{
                    "dictLabel": "活动奖励",
                    "dictValue": 7
                },{
                    "dictLabel": "推广奖励",
                    "dictValue": 8
                },{
                    "dictLabel": "分红",
                    "dictValue": 9
                },{
                    "dictLabel": "投票",
                    "dictValue": 10
                },{
                    "dictLabel": "人工充值",
                    "dictValue": 11
                },{
                    "dictLabel": "配对",
                    "dictValue": 12
                },{
                    "dictLabel": "活动兑换",
                    "dictValue": 13
                },{
                    "dictLabel": "CTC 买入",
                    "dictValue": 14
                },{
                    "dictLabel": "CTC 卖出",
                    "dictValue": 15
                },{
                    "dictLabel": "红包发出",
                    "dictValue": 16
                },{
                    "dictLabel": "红包领取",
                    "dictValue": 17
                },{
                    "dictLabel": "兑汇",
                    "dictValue": 18
                }],

                msgTypeOptions: [{
                    "dictLabel": "文字",
                    "dictValue": 1
                }, {
                    "dictLabel": "图片",
                    "dictValue": 2
                }],

                // 是否显示弹出层
                open: false,
                // 类型数据字典
                // typeOptions: [],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,type: undefined,dealId: undefined,toId: undefined,remark: undefined,orderNo: undefined,amount: undefined,coinId: undefined,username: undefined,createdAt: undefined,fromId: undefined,msg: undefined,orderId: undefined,msgType: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '消息类型不能为空', trigger: 'blur' }
                ],
                dealId: [
                    { required: true, message: '对应交易信息 id不能为空', trigger: 'blur' }
                ],
                toId: [
                    { required: true, message: '接收者 id不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '备注不能为空', trigger: 'blur' }
                ],
                orderNo: [
                    { required: true, message: '订单编号不能为空', trigger: 'blur' }
                ],
                amount: [
                    { required: true, message: '数量不能为空', trigger: 'blur' }
                ],
                coinId: [
                    { required: true, message: '币 id不能为空', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '对方昵称不能为空', trigger: 'blur' }
                ],
                createdAt: [
                    { required: true, message: '消息时间戳 字符串不能为空', trigger: 'blur' }
                ],
                fromId: [
                    { required: true, message: '发送者 id不能为空', trigger: 'blur' }
                ],
                msg: [
                    { required: true, message: '聊天内容不能为空', trigger: 'blur' }
                ],
                orderId: [
                    { required: true, message: '订单主键不能为空', trigger: 'blur' }
                ],
                msgType: [
                    { required: true, message: '聊天消息 类型 1  text  2 img不能为空', trigger: 'blur' }
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
                listMsgs(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.msgsList = response.data.list
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
            msyType(row,column){
                if (row.msgType == 1){
                    return '文字'
                }else if (row.msyType == 2){
                    return '图片'
                }else{
                    return ''
                }
            },
            type(row, column) {
                var text = ''
                switch(row.type){
                    case 1:
                        text = '充值'
                        break;
                    case 2:
                        text = '提现'
                        break;
                    case 3:
                        text = '转账'
                        break;
                    case 4:
                        text = '币币交易'
                        break;
                    case 5:
                        text = '法币买入'
                        break;
                    case 6:
                        text = '法币卖出'
                        break;
                    case 7:
                        text = '活动奖励'
                        break;
                    case 8:
                        text = '推广奖励'
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
                        text = ''
                }
                return text
                
            },
            // 表单重置
            reset() {
                this.form = {
                id: undefined,
                type: undefined,
                dealId: undefined,
                toId: undefined,
                remark: undefined,
                orderNo: undefined,
                amount: undefined,
                coinId: undefined,
                username: undefined,
                createdAt: undefined,
                fromId: undefined,
                msg: undefined,
                orderId: undefined,
                msgType: undefined,
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
            //跳转网页
            msgsQuery() {
                // this.queryParams.pageIndex = 1
                // this.getList()
                this.$router.push({ path: '/msgs/msgs'})
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
                this.title = '添加用户消息通知表'
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
                this.$router.push({ path: '/msgs/msgs', query: { fromId: row.fromId }})
            },
            // handle(row) {
            //     this.reset()
            //     const id = row.id || this.ids
            //     this.$router.push({ path: '/msgs/msgs', query: { fromId: row.fromId }})
            // },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateMsgs(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMsgs(this.form).then(response => {
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
                    return delMsgs(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="订单号" prop="number">
                <el-input v-model="queryParams.number" placeholder="请输入订单号" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>
               
            <el-form-item label="订单状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="订单状态"
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
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcorder:otcorder:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col> -->
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcorder:otcorder:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改订单状态</el-button>
            </el-col> -->
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcorder:otcorder:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="otcorderList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" /> -->
            <el-table-column label="订单号" align="center" prop="number" :show-overflow-tooltip="true" width="220" />
            <el-table-column label="交易类型" align="center" prop="advertiseType" :formatter="advertiseType"  />
            <!-- <el-table-column label="发起申诉用户ID" align="center" prop="complainId" :show-overflow-tooltip="true" width="130"/> -->
            
            <el-table-column label="订单状态" align="center" prop="status" :formatter="status" />
            <!-- <el-table-column label="单价" align="center" prop="price" :show-overflow-tooltip="true"  sortable/> -->
            <el-table-column label="币种" align="center" prop="coinName" :show-overflow-tooltip="true" />
            <el-table-column label="总量" align="center" prop="amount" :show-overflow-tooltip="true" width="120" sortable/>
            <el-table-column label="总价(RMB)" align="center" prop="total" :show-overflow-tooltip="true" width="120"  sortable/>
            <!-- <el-table-column label="手续费" align="center" prop="commission" :show-overflow-tooltip="true" /> -->
            <el-table-column label="商家用户" align="center" prop="sponsorUsername" :show-overflow-tooltip="true"  width="100"/>
            <el-table-column label="交易用户" align="center" prop="traderUsername" :show-overflow-tooltip="true"  width="100"/>
            <el-table-column label="创建时间" align="center" prop="createat" :show-overflow-tooltip="true" width="150"/>
            <el-table-column label="支付时间" align="center" prop="paytime" :show-overflow-tooltip="true" width="150"/>
            <el-table-column label="完成时间" align="center" prop="finishtime" :show-overflow-tooltip="true" width="150"/>
            <!-- <el-table-column label="广告id" align="center" prop="advertiseId" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="币种" align="center" prop="coinId" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="交易费" align="center" prop="tradeFee" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="发币ID" align="center" prop="otcCoinId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="汇率(CNY)" align="center" prop="rate" :show-overflow-tooltip="true"  width="100"/>
            <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
            <el-table-column label="手续费(RMB)" align="center" prop="fee" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="银行卡" align="center" prop="payBankNum" :show-overflow-tooltip="true" width="150"/>
            <el-table-column label="一级代理ID" align="center" prop="levelOne" :formatter="levelOne"  width="150" />
            <el-table-column label="一级代理金额" align="center" prop="levelOneCommission" :formatter="levelOneCommission"  width="150"/>
            <el-table-column label="二级代理ID" align="center" prop="levelTwo" :formatter="levelTwo" width="150" />
            <el-table-column label="二级代理金额" align="center" prop="levelTwoCommission"  :formatter="levelTwoCommission" width="150" />
            
            
            <!-- <el-table-column label="支付快照" align="center"  :show-overflow-tooltip="true" >
                <template slot-scope="scope" >
                    <vue-viewer style="display: inline-block;"
                        :thumb="scope.row.payImage"
                        :full="scope.row.payImage"
                          >
                    </vue-viewer>
                </template>
            </el-table-column> -->
            
            <!-- <el-table-column  fixed="right" label="操作" width="110">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleCommission(scope.row)">查看分佣</el-button>  
                 
			    </template>
            </el-table-column>   -->
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
            <el-form ref="form" :model="form"    label-width="200px" size="mini">
                <!-- <el-form-item label="认证状态：" prop="status">
                        <el-select v-model="form.status" placeholder="请选择认证状态" clearable :style="{width: '50%'}">
                            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
                                :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                    </el-form-item>   -->
                 <el-row>
                     <el-col :span="12">
                        <el-form-item label="一级用户: ">{{ form.levelOne }}</el-form-item>
                        <el-form-item label="二级用户: ">{{ form.levelTwo }}</el-form-item>
                     </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户佣金: ">{{ form.levelOneCommission }}</el-form-item>
                        <el-form-item label="用户佣金: ">{{ form.levelTwoCommission }}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="三级用户: ">{{ form.levelThree }}</el-form-item>
                        <!-- <el-form-item label="xxx: ">{{ form.levelThreeCommission }}</el-form-item> -->
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户佣金: ">{{ form.levelThreeCommission }}</el-form-item>
                        <!-- <el-form-item label="xxx: ">{{ form.levelThreeCommission }}</el-form-item> -->
                    </el-col>
                    
                    

                </el-row>
            </el-form>
           
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="cancel">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 快照详细 -->
        <!-- <el-dialog :title="title" :visible.sync="openPayImage" :model="form">

            <img :src="form.payImage" >
           

            <div slot="footer" class="dialog-footer">
                <el-button @click="openPayImage = false">关 闭</el-button>
            </div>

        </el-dialog> -->
    </div>
</template>

<script>
    import { listOtcOrder, getOtcOrder, delOtcOrder, addOtcOrder, updateOtcOrder, getCommission } from '@/api/member/otcOrder'

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
                openPayImage:false,
                // 类型数据字典
                typeOptions: [{
                    "label": "完成订单",
                    "value": 6
                },
                {
                    "label": "确认收到",
                    "value": 3
                },
                ],
                //1 创建订单 2 已打款  3确认收到  4未收到，申诉   5结束订单 6完成订单
                statusOptions: [{
                    "dictLabel": "创建订单",
                    "dictValue": 1
                }, {
                    "dictLabel": "已打款",
                    "dictValue": 2
                },{
                    "dictLabel": "确认收到",
                    "dictValue": 3
                },{
                    "dictLabel": "申诉中",
                    "dictValue": 4
                },{
                    "dictLabel": "结束订单",
                    "dictValue": 5
                },{
                    "dictLabel": "完成订单",
                    "dictValue": 6
                }],
                // 日期范围
                dateRange: [],
                
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,orderId: undefined,advertiseType: undefined,status: undefined,price: undefined,amount: undefined,total: undefined,commission: undefined,payInfo: undefined,sponsorId: undefined,traderId: undefined,payImage: undefined,createAt: undefined,payTime: undefined,finishTime: undefined,advertiseId: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {orderId: [
                    { required: true, message: '订单号不能为空', trigger: 'blur' }
                ],
                advertiseType: [
                    { required: true, message: ' 交易类型 1 sell  2 buy不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '1 创建订单 2 已打款  3确认收到  4申诉中   5结束订单 6完成订单不能为空', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '单价不能为空', trigger: 'blur' }
                ],
                amount: [
                    { required: true, message: '总量不能为空', trigger: 'blur' }
                ],
                total: [
                    { required: true, message: '总价不能为空', trigger: 'blur' }
                ],
                commission: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                payInfo: [
                    { required: true, message: '付款方式（需要详细记录支付途径和交易信息快照，交易时联系方式）不能为空', trigger: 'blur' }
                ],
                sponsorId: [
                    { required: true, message: '商家用户ID不能为空', trigger: 'blur' }
                ],
                traderId: [
                    { required: true, message: '交易用户ID不能为空', trigger: 'blur' }
                ],
                payImage: [
                    { required: true, message: '支付快照不能为空', trigger: 'blur' }
                ],
                createAt: [
                    { required: true, message: '创建时间不能为空', trigger: 'blur' }
                ],
                payTime: [
                    { required: true, message: '支付时间不能为空', trigger: 'blur' }
                ],
                finishTime: [
                    { required: true, message: '完成时间不能为空', trigger: 'blur' }
                ],
                advertiseId: [
                    { required: true, message: '广告id不能为空', trigger: 'blur' }
                ],
                }
        }
        },
        created() {
            this.getList()
            // this.$confirm('不允许管理员修改此状态，管理员只能修改 \'确认收到\' 状态', '警告', {
            //             cancelButtonText: '关闭',
            //             type: 'warning'
            //         }).catch(function() {})
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listOtcOrder(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        console.log(response)
                        this.otcorderList = response.data.list
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
            // 交易类型
            advertiseType(row, column) {
                if (row.advertiseType === 1 ){
                    return '出账'
                }else if (row.advertiseType === 2 ){
                    return '入账'
                }else{
                    return '未知'
                }
            },
            // 订单状态  1 创建订单 2 已打款  3确认收到  4未收到，申诉   5结束订单 6完成订单
            status(row, column) {
                if (row.status === 1 ){
                    return '创建订单'
                } else if (row.status === 2 )
                {
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
            //
            levelOne(row, column) {
                if (row.levelOne === 0 ){
                    return '无'
                }  else  {
                    return row.levelOne
                } 
            },
            levelTwo(row, column) {
                if (row.levelTwo === 0 ){
                    return '无'
                }  else  {
                    return row.levelTwo
                } 
            },
            levelOneCommission(row,column){
                if (row.levelOneCommission === "" ){
                    return '无'
                }  else  {
                    return row.levelOneCommission
                } 
            },
            levelTwoCommission(row,column){
                if (row.levelTwoCommission === "" ){
                    return '无'
                }  else  {
                    return row.levelTwoCommission
                } 
            },
            
            // 表单重置
            reset() {
                this.form = {
                orderId: undefined,
                advertiseType: undefined,
                status: undefined,
                price: undefined,
                amount: undefined,
                total: undefined,
                commission: undefined,
                payInfo: undefined,
                sponsorId: undefined,
                traderId: undefined,
                payImage: undefined,
                createAt: undefined,
                payTime: undefined,
                finishTime: undefined,
                advertiseId: undefined,
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
                this.title = '添加OtcOrder'
            },
            /** 详细按钮操作 */
            handleView(row) {
                this.openPayImage = true
                this.form = row
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.orderId)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                this.reset()
                const id = row.id || this.ids
                //1 创建订单 2 已打款  3确认收到  4未收到，申诉   5结束订单 6完成订单

                if (row.status === 3){
                    getOtcOrder(id).then(response => {
                        this.form = response.data
                        this.open = true
                        this.title = '修改订单状态'
                    })
                } else {
                     this.$confirm('不允许管理员修改此状态，管理员只能修改 \'确认收到\' 状态', '警告', {
                        cancelButtonText: '关闭',
                        type: 'warning'
                    }).catch(function() {})
                }
                
            },

            /** 查看分佣 */
            handleCommission(row) {
                this.reset()
                const id = row.id || this.ids
                //1 创建订单 2 已打款  3确认收到  4未收到，申诉   5结束订单 6完成订单
                if (row.advertiseType === 2){
                    getCommission(id).then(response => {
                        console.log(response)
                        this.form = response.Commission
                        this.open = true
                        this.title = '订单分佣'
                    })
                } else {
                     this.$confirm('交易类型为‘卖’不参与分佣', '警告', {
                        cancelButtonText: '关闭',
                        type: 'warning'
                    }).catch(function() {})
                }
                
            },

            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateOtcOrder(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addOtcOrder(this.form).then(response => {
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
                const Ids = row.orderId || this.ids
                this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delOtcOrder(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
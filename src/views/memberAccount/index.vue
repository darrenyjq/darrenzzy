<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            
                <el-form-item label="用户名" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                
                
                <el-form-item label="账户状态" prop="status">
                    <el-select
                    v-model="queryParams.status"
                    placeholder="交易方式"
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
                        v-permisaction="['memberaccount:memberaccount:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberaccount:memberaccount:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row> -->

        <el-table v-loading="loading" :data="memberaccountList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="资产编号" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="用户编号" align="center" prop="memberId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <el-table-column label="币种名称" align="center" prop="symbol" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="币种编号" align="center" prop="coinId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="币总量" align="center" prop="balance" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="手续费" align="center" prop="fee" :show-overflow-tooltip="true" /> -->
            <el-table-column label="账户状态" align="center" prop="status" :formatter="status" />
            <el-table-column label="交易币总量" align="center" prop="dealAmount" :show-overflow-tooltip="true" />
            <el-table-column label="剩余币量" align="center" prop="remainAmount" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="更新时间" align="center" prop="updateAt" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createAt" :show-overflow-tooltip="true" /> -->

            <el-table-column label="更新时间" align="center" prop="updateAt" width="165" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updateAt) }}</span>
            </template>
          </el-table-column>

            <el-table-column label="创建时间" align="center" prop="createAt" width="165" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createAt) }}</span>
            </template>
            </el-table-column>


            <!-- <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" /> -->

            <el-table-column  fixed="right" label="操作" width="150">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdateAdd(scope.row)">加币</el-button>  
                    <el-button size="small" @click="handleUpdateSub(scope.row)">减币</el-button>	                          
			    </template>
            </el-table-column>  

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['memberaccount:memberaccount:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdateAdd(scope.row)"
                    >加币</el-button>
                     <el-button
                            v-permisaction="['memberaccount:memberaccount:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdateSub(scope.row)"
                    >减币</el-button>
                    
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

                <el-form-item label="币量：" prop="coin">
                    <el-input v-model="form.coin" placeholder="币量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                </el-form-item>

                <el-form-item label="备注：" prop="adminRemark">
                    <el-input v-model="form.adminRemark" placeholder="备注" />
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
    import { listMemberAccount, getMemberAccount, delMemberAccount, addMemberAccount, updateMemberAccount } from '@/api/member/memberAccount'
    import { getUserProfile } from '@/api/system/sysuser'

   var Decimal = require('decimal.js');
    //import { Decimal } from 'decimal.js';

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
                statusOptions:[{
                    "dictLabel": "正常",
                    "dictValue": 1
                }, {
                    "dictLabel": "冻结",
                    "dictValue": 2
                }],
                // 日期范围
                dateRange: [],
                //操作员
                userName:'',
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,memberId: undefined,coinId: undefined,balance: undefined,fee: undefined,status: undefined,remark: undefined,updateAt: undefined,createAt: undefined,dealAmount: undefined,remainAmount: undefined,version: undefined,
        },
            // 表单参数
            form: {id: undefined,type: undefined,memberId: undefined,coinId: undefined,balance: undefined,fee: undefined,status: undefined,remark: undefined,updateAt: undefined,createAt: undefined,dealAmount: undefined,remainAmount: undefined,version: undefined,coin:undefined,adminRemark:undefined,userName:undefined},
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
                balance: [
                    { required: true, message: '币总量不能为空', trigger: 'blur' }
                ],
                fee: [
                    { required: true, message: '手续费不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '账户状态 1 正常 2 冻结不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '备注（EOS等等币）不能为空', trigger: 'blur' }
                ],
                updateAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                createAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                dealAmount: [
                    { required: true, message: '交易币总量不能为空', trigger: 'blur' }
                ],
                remainAmount: [
                    { required: true, message: '剩余币量不能为空', trigger: 'blur' }
                ],
                version: [
                    { required: true, message: '账户版本控制不能为空', trigger: 'blur' }
                ],
                adminRemark:[
                     { required: true, message: '备注不能为空', trigger: 'blur' }
                ],
                coin:[
                     { required: true, message: '不能为空', trigger: 'blur' }
                ]
                }
        }
        },
        created() {
            this.getList()
            // this.getUser()
        },
        methods: {
            /** 查询参数列表 */
            getList() {
                this.loading = true
                listMemberAccount(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.memberaccountList = response.data.list
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
                balance: undefined,
                fee: undefined,
                status: undefined,
                remark: undefined,
                updateAt: undefined,
                createAt: undefined,
                dealAmount: undefined,
                remainAmount: undefined,
                version: undefined,
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
                this.title = '添加用户法币钱包'
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.id)
                this.single = selection.length !== 1
                this.multiple = !selection.length
            },
            /** 修改按钮操作 */
            handleUpdateAdd(row) {
                this.reset()
                const id = row.id || this.ids
             
                getMemberAccount(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '加币'
                })
            },

             /** 修改按钮操作 */
            handleUpdateSub(row) {
                this.reset()
                const id = row.id || this.ids
            
                getMemberAccount(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '减币'
                })
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

            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {

                        if (this.title == '减币'){
                            if (new Decimal(this.form.balance).sub(new Decimal(this.form.coin)).toNumber().toFixed(8) < 0){
                             this.$confirm(this.title + '金额不足' + new Decimal(this.form.balance).sub(new Decimal(this.form.coin)).toNumber().toFixed(8), '警告', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                                }).catch(function() {
                                    return 
                                })
                            }else{
                                // var coin = '-' + this.form.coin
                                // this.form.coin = coin

                                if (this.form.id !== undefined) {
                                getUserProfile().then(response => {
                                // console.log(response.data)
                                //this.form.adminId = '1'
                                this.form.adminId = response.data.userId 
                                //response.data.userId
                                // console.log(this.form)
                                this.form.type = 2
                                updateMemberAccount(this.form).then(response => {
                                    console.log(response)
                                    if (response.code === 200) {
                                        this.msgSuccess('修改成功')
                                        this.open = false
                                        this.getList()
                                    } else {
                                        this.msgError(response.msg)
                                    }
                                })
                                })
                                } else {
                                    addMemberAccount(this.form).then(response => {
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
                                 
                           
                        }else{
                            this.form.type = 1
                            if (this.form.id !== undefined) {
                                getUserProfile().then(response => {
                                console.log(response.data)
                                //this.form.adminId = '1'
                                this.form.adminId = response.data.userId 
                                //this.form.adminId = parseInt(response.data.userId)    
                                console.log(this.form)
                                updateMemberAccount(this.form).then(response => {
                                    console.log(response)
                                    if (response.code === 200) {
                                        this.msgSuccess('修改成功')
                                        this.open = false
                                        this.getList()
                                    } else {
                                        this.msgError(response.msg)
                                    }
                                })
                                })
                                } else {
                                    addMemberAccount(this.form).then(response => {
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
                    return delMemberAccount(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
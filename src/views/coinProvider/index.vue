<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <!-- <el-form-item label="" prop="id">
                        <el-input v-model="queryParams.id" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                <el-form-item label="币种" prop="symbol">
                        <el-input v-model="queryParams.symbol" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <!-- <el-form-item label="允许自动提币" prop="canAutoWithdraw">
                        <el-input v-model="queryParams.canAutoWithdraw" placeholder="请输入允许自动提币" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="允许充币" prop="canRecharge">
                        <el-input v-model="queryParams.canRecharge" placeholder="请输入允许充币" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="允许站内转账" prop="canTransfer">
                        <el-input v-model="queryParams.canTransfer" placeholder="请输入允许站内转账" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="启用rpc" prop="enableRpc">
                        <el-input v-model="queryParams.enableRpc" placeholder="请输入启用rpc" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="链名称" prop="name">
                        <el-input v-model="queryParams.name" placeholder="请输入链名称" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="createTime">
                        <el-input v-model="queryParams.createTime" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="updateTime">
                        <el-input v-model="queryParams.updateTime" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['coinprovider:coinprovider:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['coinprovider:coinprovider:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['coinprovider:coinprovider:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="coinproviderList" size="mini" highlight-current-row border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <!-- <el-table-column label="链名称编号" align="center" prop="id" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="币种编号" align="center" prop="coinId" :show-overflow-tooltip="true" /> -->
            <el-table-column label="币种名称" align="center" prop="symbol" :show-overflow-tooltip="true" />
            <el-table-column label="是否允许自动提币" align="center" prop="canAutoWithdraw" :formatter="canAutoWithdraw" />
            <el-table-column label="是否允许充币" align="center" prop="canRecharge" :formatter="canRecharge" />
            <el-table-column label="是否允许站内转账" align="center" prop="canTransfer" :formatter="canTransfer" />
            <!-- <el-table-column label="是否启用rpc" align="center" prop="enableRpc" :formatter="enableRpc" /> -->
            <el-table-column label="链名称" align="center" prop="name" :show-overflow-tooltip="true" />
            <!-- <el-table-column label="更新时间" align="center" prop="updateTime" :show-overflow-tooltip="true" /> -->
            <!-- <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" /> -->

             <el-table-column label="更新时间" align="center" prop="updateTime" width="165" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.updateTime) }}</span>
            </template>
          </el-table-column>

            <el-table-column label="创建时间" align="center" prop="createTime" width="165" sortable>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>

          <el-table-column  fixed="right" label="操作" width="150">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">修改</el-button>  
                    <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                          
			    </template>
            </el-table-column>  

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['coinprovider:coinprovider:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['coinprovider:coinprovider:remove']"
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
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                 
                        <el-form-item label="币种"  prop="coinId">
                        <el-select v-model="form.coinId" placeholder="请选择" @change="$forceUpdate()">
                            <el-option
                            v-for="item in coinOptions"
                            :key="item.id"
                            :label="item.symbol"
                            :value="item.id"
                            :disabled="item.status == 1"
                            />
                        </el-select>
                        </el-form-item>
                    
                        <el-form-item label="是否允许自动提币" prop="canAutoWithdraw">
                        <el-select v-model="form.canAutoWithdraw" placeholder="请选择是否允许自动提币" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                            :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                        </el-form-item>

                        <el-form-item label="是否允许充币" prop="canRecharge">
                        <el-select v-model="form.canRecharge" placeholder="请选择是否允许充币" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                            :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                        </el-form-item>

                        <el-form-item label="是否允许站内转账" prop="canTransfer">
                        <el-select v-model="form.canTransfer" placeholder="请选择是否允许充币" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                            :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                        </el-form-item>

                        
                        <el-form-item label="是否启用rpc" prop="enableRpc">
                        <el-select v-model="form.enableRpc" placeholder="请选择是否允许充币" clearable :style="{width: '100%'}">
                        <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                            :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                        </el-form-item>

                    
                    <el-form-item label="链名称" prop="name">
                            <el-input v-model="form.name" placeholder="链名称" />
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
    import { listCoinProvider, getCoinProvider, delCoinProvider, addCoinProvider, updateCoinProvider } from '@/api/member/coinProvider'
    import { listCoin, getCoin, delCoin, addCoin, updateCoin, listCoinName } from '@/api/member/coin'

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
                //广告状态
                statusOptions: [{
                    "label": "否",
                    "value": 1
                }, {
                    "label": "是",
                    "value": 2
                }],

                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,coinId: undefined,canAutoWithdraw: undefined,canRecharge: undefined,canTransfer: undefined,enableRpc: undefined,name: undefined,createTime: undefined,updateTime: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                coinId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                canAutoWithdraw: [
                    { required: true, message: '允许自动提币不能为空', trigger: 'blur' }
                ],
                canRecharge: [
                    { required: true, message: '允许充币不能为空', trigger: 'blur' }
                ],
                canTransfer: [
                    { required: true, message: '允许站内转账不能为空', trigger: 'blur' }
                ],
                enableRpc: [
                    { required: true, message: '启用rpc不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '链名称不能为空', trigger: 'blur' }
                ],
                createTime: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                updateTime: [
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
                listCoinProvider(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.coinproviderList = response.data.list
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
                coinId: undefined,
                canAutoWithdraw: undefined,
                canRecharge: undefined,
                canTransfer: undefined,
                enableRpc: undefined,
                name: undefined,
                createTime: undefined,
                updateTime: undefined,
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
               
                listCoinName().then(response => {
                    
                    this.coinOptions = response.dataCoin
                    console.log(response.dataCoin)
                    this.open = true
                    this.title = '添加链名称'
                })
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
                
                getCoinProvider(id).then(response => {
                    this.form = response.data
                    this.coinOptions = response.dataCoin
                    console.log(response.dataCoin)
                    this.open = true
                    this.title = '修改链名称'
                })
            },
            canAutoWithdraw(row,column){
                if (row.canAutoWithdraw == 1){
                    return '否'
                }else if (row.canAutoWithdraw == 2){
                    return '是'
                }else{
                    return '未知'
                }
            },
            canRecharge(row,column){
                if (row.canRecharge == 1){
                    return '否'
                }else if (row.canRecharge == 2){
                    return '是'
                }else{
                    return '未知'
                }
            },
            canTransfer(row,column){
                if (row.canTransfer == 1){
                    return '否'
                }else if (row.canTransfer == 2){
                    return '是'
                }else{
                    return '未知'
                }
            },
            enableRpc(row,column){
                if (row.enableRpc == 1){
                    return '否'
                }else if (row.enableRpc == 2){
                    return '是'
                }else{
                    return '未知'
                }
            },

            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        console.log(this.form)
                        
                        if (this.form.id !== undefined) {
                            updateCoinProvider(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            this.form.coinId = parseInt(this.form.coinId)
                            addCoinProvider(this.form).then(response => {
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
                const symbol = row.symbol
                this.$confirm('确认删除"' + symbol + '"的链名称?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delCoinProvider(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
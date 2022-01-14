<template>
    <div class="app-container">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="用户名" prop="username">
                        <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
            <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="用户状态"
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
            <!-- 
                <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="queryParams.realName" placeholder="请输入真实姓名" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="绑定账号" prop="boundNum">
                        <el-input v-model="queryParams.boundNum" placeholder="请输入绑定账号" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="userId">
                        <el-input v-model="queryParams.userId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="createdAt">
                        <el-input v-model="queryParams.createdAt" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="updatedAt">
                        <el-input v-model="queryParams.updatedAt" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="银行卡正面" prop="fontImage">
                        <el-input v-model="queryParams.fontImage" placeholder="请输入银行卡正面" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="卡背面" prop="backImage">
                        <el-input v-model="queryParams.backImage" placeholder="请输入卡背面" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="开卡手机号" prop="phone">
                        <el-input v-model="queryParams.phone" placeholder="请输入开卡手机号" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="remark">
                        <el-input v-model="queryParams.remark" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="状态 2 关闭 1通过" prop="status">
                        <el-input v-model="queryParams.status" placeholder="请输入状态 2 关闭 1通过" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="kyc1Auth">
                        <el-input v-model="queryParams.kyc1Auth" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="kyc2Auth">
                        <el-input v-model="queryParams.kyc2Auth" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="支付类型，根据合并接口下发id决定" prop="type">
                        <el-input v-model="queryParams.type" placeholder="请输入支付类型，根据合并接口下发id决定" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="countryId">
                        <el-input v-model="queryParams.countryId" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="开户行地址" prop="bankCardAuth">
                        <el-input v-model="queryParams.bankCardAuth" placeholder="请输入开户行地址" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item> -->
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberprofiles:memberprofiles:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >认证</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['memberprofiles:memberprofiles:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col>
        </el-row>

        <el-table v-loading="loading" :data="memberprofilesList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
             <el-table-column label="用户ID" align="center" prop="userId" :show-overflow-tooltip="true" />
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <el-table-column label="真实姓名" align="center" prop="realName" :show-overflow-tooltip="true" />
            <el-table-column label="状态" align="center" prop="status"   :formatter="status"/>
          
            <el-table-column  fixed="right" label="操作" width="150">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">角色</el-button>  
                    <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                          
			    </template>
            </el-table-column>  
        </el-table> 




         <template>
        <!--表格数据及操作-->
        <el-table :data="memberprofilesList" size="mini"  highlight-current-row border   class="el-tb-edit mgt20" ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="handleSelectionChange">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
             <el-table-column label="用户ID" align="center" prop="userId" :show-overflow-tooltip="true" />
            <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
            <el-table-column label="真实姓名" align="center" prop="realName" :show-overflow-tooltip="true" />
            <el-table-column label="状态" align="center" prop="status"   :formatter="status"/>
            <!--索引-->
            <!-- <el-table-column prop="userName" label="姓名">
               <template slot-scope="scope">
              <el-button @click="handleSelect(scope.$index,scope.row)" type="text" size="small">{{scope.row.userName}}</el-button>      
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="id" label="编码" >
            </el-table-column>  
             <el-table-column prop="loginName" label="登录名" >
            </el-table-column>        
             <el-table-column prop="orgname" label="机构" >
            </el-table-column>  
             <el-table-column prop="positionname" label="岗位" >
            </el-table-column>           
             <el-table-column prop="mobile" label="手机" >
            </el-table-column>    
             <el-table-column prop="email" label="邮件" >
            </el-table-column> 
             <el-table-column prop="sex" label="性别" :formatter="formatSex" sortable>
            </el-table-column>  -->
             <!-- <el-table-column prop="birthday" label="出生日期" >
            </el-table-column>   -->
             <!-- <el-table-column prop="nationality" label="民族"  :formatter="formatNationality" sortable>
            </el-table-column>    
             <el-table-column prop="education" label="学历"  :formatter="formatEducation" sortable>
            </el-table-column>    
             <el-table-column prop="job" label="职务"  :formatter="formatJob" sortable>
            </el-table-column> 
             <el-table-column prop="validateState" label="是否有效" :formatter="formatState" sortable>
            </el-table-column>     -->
             <!-- <el-table-column prop="isLocked" label="是否锁定" :formatter="formatLocked" sortable>
            </el-table-column>     -->            
              <el-table-column  fixed="right" label="操作" width="150">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">角色</el-button>  
                    <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>	                          
			    </template>
            </el-table-column>     
        </el-table>
        </template>

        <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageIndex"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <!-- <el-dialog :title="title" :visible.sync="open" width="500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="" prop="id">
                            <el-input v-model="form.id" placeholder="" />
                        </el-form-item>
                    <el-form-item label="真实姓名" prop="realName">
                            <el-input v-model="form.realName" placeholder="真实姓名" />
                        </el-form-item>
                    <el-form-item label="绑定账号" prop="boundNum">
                            <el-input v-model="form.boundNum" placeholder="绑定账号" />
                        </el-form-item>
                    <el-form-item label="" prop="userId">
                            <el-input v-model="form.userId" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="createdAt">
                            <el-input v-model="form.createdAt" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="updatedAt">
                            <el-input v-model="form.updatedAt" placeholder="" />
                        </el-form-item>
                    <el-form-item label="银行卡正面" prop="fontImage">
                            <el-input v-model="form.fontImage" placeholder="银行卡正面" />
                        </el-form-item>
                    <el-form-item label="卡背面" prop="backImage">
                            <el-input v-model="form.backImage" placeholder="卡背面" />
                        </el-form-item>
                    <el-form-item label="开卡手机号" prop="phone">
                            <el-input v-model="form.phone" placeholder="开卡手机号" />
                        </el-form-item>
                    <el-form-item label="" prop="remark">
                            <el-input v-model="form.remark" placeholder="" />
                        </el-form-item>
                    <el-form-item label="状态 2 关闭 1通过" prop="status">
                            <el-input v-model="form.status" placeholder="状态 2 关闭 1通过" />
                        </el-form-item>
                    <el-form-item label="" prop="kyc1Auth">
                            <el-input v-model="form.kyc1Auth" placeholder="" />
                        </el-form-item>
                    <el-form-item label="" prop="kyc2Auth">
                            <el-input v-model="form.kyc2Auth" placeholder="" />
                        </el-form-item>
                    <el-form-item label="支付类型，根据合并接口下发id决定" prop="type">
                            <el-input v-model="form.type" placeholder="支付类型，根据合并接口下发id决定" />
                        </el-form-item>
                    <el-form-item label="" prop="countryId">
                            <el-input v-model="form.countryId" placeholder="" />
                        </el-form-item>
                    <el-form-item label="开户行地址" prop="bankCardAuth">
                            <el-input v-model="form.bankCardAuth" placeholder="开户行地址" />
                        </el-form-item>
                    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog> -->

        <el-dialog title="资产认证" :visible.sync="open" width="700px">
            <el-form ref="form" :model="form"    label-width="100px" size="mini">
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="用户ID: ">{{ form.userId }}</el-form-item>
                        <el-form-item label="修改时间: ">{{ form.updatedAt }}</el-form-item>
                     </el-col>
                    <el-col :span="12">
                        <el-form-item label="真实姓名: ">{{ form.realName }}</el-form-item>
                        <el-form-item label="创建时间: ">{{ form.createdAt }}</el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="银行卡卡号: ">{{ form.boundNum }}</el-form-item>
                        <el-form-item label="开卡手机号: ">{{ form.phone }}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="开户行地址: ">{{ form.bankCardAuth }}</el-form-item>
                        <el-form-item label="支付类型: ">{{ form.type }}</el-form-item>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-form-item label="银行卡正面:" prop="fontImage">
                            <img :src="form.fontImage" width="240px" height="135px">
                        </el-form-item>
                        <el-form-item label="银行卡背面:" prop="backImage">
                            <img :src="form.backImage" width="240px" height="135px">
                        </el-form-item>
                    </el-col> 

                </el-row>
                <el-form-item label="认证状态：" prop="status">
                        <el-select v-model="form.status" placeholder="请选择认证状态" clearable :style="{width: '50%'}">
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
    import { listMemberProfiles, getMemberProfiles, delMemberProfiles, addMemberProfiles, updateMemberProfiles } from '@/api/member/memberProfiles'

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
                //typeOptions: [],
                typeOptions: [{
                    "label": "通过认证",
                    "value": 1
                }, {
                    "label": "未认证",
                    "value": 2
                },{
                    "label": "认证不通过",
                    "value": 3
                }],
                statusOptions: [{
                    "dictLabel": "通过认证",
                    "dictValue": 1
                }, {
                    "dictLabel": "未认证",
                    "dictValue": 2
                },{
                    "dictLabel": "认证不通过",
                    "dictValue": 3
                }],
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,realName: undefined,boundNum: undefined,userId: undefined,createdAt: undefined,updatedAt: undefined,fontImage: undefined,backImage: undefined,phone: undefined,remark: undefined,status: undefined,kyc1Auth: undefined,kyc2Auth: undefined,type: undefined,countryId: undefined,bankCardAuth: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                ],
                boundNum: [
                    { required: true, message: '绑定账号不能为空', trigger: 'blur' }
                ],
                userId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                createdAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                updatedAt: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                fontImage: [
                    { required: true, message: '银行卡正面不能为空', trigger: 'blur' }
                ],
                backImage: [
                    { required: true, message: '卡背面不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '开卡手机号不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '状态 2 关闭 1通过不能为空', trigger: 'blur' }
                ],
                kyc1Auth: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                kyc2Auth: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '支付类型，根据合并接口下发id决定不能为空', trigger: 'blur' }
                ],
                countryId: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                bankCardAuth: [
                    { required: true, message: '开户行地址不能为空', trigger: 'blur' }
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
                listMemberProfiles(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.memberprofilesList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                    }
                )
            },
            // 交易类型
            status(row, column) {
                if (row.status === 1 ){
                    return '通过认证'
                }else if (row.status === 2 )
                {
                    return '未认证'
                }else if (row.status === 3){
                    return '认证不通过'
                }
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
                realName: undefined,
                boundNum: undefined,
                userId: undefined,
                createdAt: undefined,
                updatedAt: undefined,
                fontImage: undefined,
                backImage: undefined,
                phone: undefined,
                remark: undefined,
                status: undefined,
                kyc1Auth: undefined,
                kyc2Auth: undefined,
                type: undefined,
                countryId: undefined,
                bankCardAuth: undefined,
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
                this.title = '添加用户资产认证'
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
                getMemberProfiles(id).then(response => {
                    this.form = response.data
                    var dateee = new Date(this.form.createdAt).toJSON()
                    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                    this.form.createdAt = date

                    dateee = new Date(this.form.updatedAt).toJSON()
                    date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                    this.form.updatedAt = date

                    this.open = true
                    this.title = '成员资产认证'
                })
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            updateMemberProfiles(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addMemberProfiles(this.form).then(response => {
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
                this.$confirm('是否确认删除数据', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function() {
                    return delMemberProfiles(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
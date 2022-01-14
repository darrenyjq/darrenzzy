<template>
    <div class="app-container">
        <!-- <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
            <el-form-item label="" prop="id">
                        <el-input v-model="queryParams.id" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="名称" prop="name">
                        <el-input v-model="queryParams.name" placeholder="请输入名称" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="费率基点" prop="baseRate">
                        <el-input v-model="queryParams.baseRate" placeholder="请输入费率基点" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="加成" prop="markUp">
                        <el-input v-model="queryParams.markUp" placeholder="请输入加成" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="updateTime">
                        <el-input v-model="queryParams.updateTime" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="" prop="createTime">
                        <el-input v-model="queryParams.createTime" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form> -->

        <el-row :gutter="10" class="mb8">
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['rateconfig:rateconfig:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col> -->
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['rateconfig:rateconfig:edit']"
                        type="success"
                        icon="el-icon-edit"
                        size="mini"
                        :disabled="single"
                        @click="handleUpdate"
                >修改</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
                <el-button
                        v-permisaction="['rateconfig:rateconfig:remove']"
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        :disabled="multiple"
                        @click="handleDelete"
                >删除</el-button>
            </el-col> -->
        </el-row>

        <el-table v-loading="loading" :data="rateconfigList" size="mini"  highlight-current-row border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            
            <el-table-column label="配置名称" align="center" prop="name" :show-overflow-tooltip="true" />
            <el-table-column label="配置值" align="center" prop="value" :show-overflow-tooltip="true" />
           

          <el-table-column  fixed="right" label="操作" width="80">
               <template slot-scope="scope">				         
                    <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">修改</el-button>  
                    <!-- <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                           -->
			    </template>
            </el-table-column>  

            <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['rateconfig:rateconfig:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>
                    <el-button
                            v-permisaction="['rateconfig:rateconfig:remove']"
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
            <el-form ref="form" :model="form" :rules="rules" label-width="170px">
                    <el-form-item label="名称" prop="name">
                            <el-input v-model="form.name" placeholder="名称"   />
                        </el-form-item>
                    <el-form-item label="配置值" prop="value">
                        <el-input v-model="form.value" placeholder="配置值"  />
                    </el-form-item>
                    <!-- <el-form-item label="费率加成(小数)" prop="markUp">
                            <el-input v-model="form.markUp" placeholder="费率加成，小数表示例如0.22"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                        </el-form-item>   
                    <el-form-item label="用户提币手续费(‰)" prop="userRate">
                            <el-input v-model="form.userRate" placeholder="用户提币手续费，整数表示例如2"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                        </el-form-item> 
                    <el-form-item label="一级分佣手续费(‰)" prop="levelOne">
                        <el-input v-model="form.levelOne" placeholder="一级分佣手续费，整数表示例如2"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                    </el-form-item> 
                    <el-form-item label="二级分佣手续费(‰)" prop="levelTwo">
                        <el-input v-model="form.levelTwo" placeholder="二级分佣手续费，整数表示例如2"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                    </el-form-item> 
                     <el-form-item label="三级分佣手续费(‰)" prop="levelThree">
                        <el-input v-model="form.levelThree" placeholder="三级分佣手续费，整数表示例如2"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                    </el-form-item> 
                    <el-form-item label="承兑商提币手续费(‰)" prop="levelTwo">
                        <el-input v-model="form.levelTwo" placeholder="承兑商提币手续费，整数表示例如2"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                    </el-form-item> 
                     <el-form-item label="兑换商提币手续费(‰)" prop="levelThree">
                        <el-input v-model="form.levelThree" placeholder="兑换商提币手续费，整数表示例如2"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
                    </el-form-item>  -->

                    <!-- <el-form-item label="邀请功能" prop="isRecommand">
                        <el-select v-model="form.isRecommand" placeholder="请选择状态" clearable :style="{width: '50%'}">
                            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
                                :value="item.value" :disabled="item.disabled"></el-option>
                        </el-select>
                    </el-form-item> -->
                    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { listRateConfig, getRateConfig, delRateConfig, addRateConfig, updateRateConfig } from '@/api/member/rateConfig'

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
                // 日期范围
                dateRange: [],
                // 查询参数
                queryParams: {
                    pageIndex: 1,
                    pageSize: 10,id: undefined,name: undefined,baseRate: undefined,markUp: undefined,updateTime: undefined,createTime: undefined,
        },
            // 表单参数
            form: {},
            // 表单校验
            rules: {id: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                baseRate: [
                    { required: true, message: '费率基点不能为空', trigger: 'blur' }
                ],
                markUp: [
                    { required: true, message: '费率加成不能为空', trigger: 'blur' }
                ],
                userRate: [
                    { required: true, message: '用户提币手续费不能为空', trigger: 'blur' }
                ],
                levelOne: [
                    { required: true, message: '一级分佣手续费不能为空', trigger: 'blur' }
                ],
                levelTwo: [
                    { required: true, message: '二级分佣手续费不能为空', trigger: 'blur' }
                ],
                levelThree: [
                    { required: true, message: '三级分佣手续费不能为空', trigger: 'blur' }
                ],
                updateTime: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                createTime: [
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
                listRateConfig(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.rateconfigList = response.data.list
                        this.total = response.data.count
                        this.loading = false
                        this.rateconfigList[0].markUp = this.rateconfigList[0].markUp * 100
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
                name: undefined,
                baseRate: undefined,
                markUp: undefined,
                updateTime: undefined,
                createTime: undefined,
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
                this.title = '添加手续费配置表'
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
                getRateConfig(id).then(response => {
                    this.form = response.data
                    this.open = true
                    this.title = '修改手续费配置表'
                })
            },
           
            /** 提交按钮 */
            submitForm: function() {
                this.$refs['form'].validate(valid => {
                   this.form.userRate = parseInt(this.form.userRate)
                   this.form.levelOne = parseInt(this.form.levelOne)
                   this.form.levelTwo = parseInt(this.form.levelTwo)
                   this.form.levelThree = parseInt(this.form.levelThree)
                    if (valid) {
                        if (this.form.id !== undefined) {
                            console.log(this.form)
                            updateRateConfig(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess('修改成功')
                                    this.open = false
                                    this.getList()
                                } else {
                                    this.msgError(response.msg)
                                }
                            })
                        } else {
                            addRateConfig(this.form).then(response => {
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
                    return delRateConfig(Ids)
                }).then(() => {
                    this.getList()
                    this.msgSuccess('删除成功')
                }).catch(function() {})
            }
        }
    }
</script>
<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">

      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="queryParams.mobile" placeholder="请输入手机号" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>

      <!-- <el-form-item label="身份验证" prop="status">
        <el-input v-model="queryParams.status" placeholder="请输入0未身份验证 1已身份验证" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item> -->

      <!-- <el-form-item label="用户身份" prop="type">
          <el-select
          v-model="queryParams.type"
          placeholder="用户身份"
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
      </el-form-item> -->


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
    
    </el-row>

    <el-table v-loading="loading" :data="memberList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      
      <!-- <el-table-column label="用户ID" align="center" prop="id" :show-overflow-tooltip="true" /> -->
           
      <el-table-column label="手机号" align="center" prop="mobile" :show-overflow-tooltip="true" />
      <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="会员号" align="center" prop="uuid" :show-overflow-tooltip="true"/> -->
      <el-table-column label="性别" align="center" prop="sex" :formatter="typeSex" />
      <el-table-column label="邮箱" align="center" prop="email" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="邮箱认证" align="center" prop="emailAuth" :formatter="emailAuthFormat" /> -->
      <el-table-column label="用户身份" align="center" prop="type" :formatter="typeFormat" />
      <!-- <el-table-column label="是否开启接单" align="center" prop="switchOrder" :formatter="switchOrderFormat" width="100px"/> -->
      <el-table-column label="用户状态" align="center" prop="status" :formatter="status" />
      <el-table-column label="认证状态" align="center" prop="identityAuth" :formatter="identityAuth"  />
      
      <!-- <el-table-column label="上级用户ID" align="center" prop="beforeId" :show-overflow-tooltip="true"  /> -->
      <!-- <el-table-column label="上级用户" align="center" prop="beforeUsername" :show-overflow-tooltip="true" /> -->
      <el-table-column label="谷歌验证(开启/关闭)" align="center" prop="googleAuthSwitch" width="150px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.googleAuthSwitch"
            :active-value="2"
            :inactive-value="1"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>

      <el-table-column  fixed="right" label="操作" width="130">
          <template slot-scope="scope">				         
            <el-button type="primary" plain size="small" v-if="scope.row.type===2"  @click="handleUpdate(scope.row)">查看下级用户</el-button>  
            <!-- <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                           -->
			    </template>
        </el-table-column>  
      
      <!--
            <el-table-column label="创建时间" align="center" prop="createAt" :show-overflow-tooltip="true" />
            -->
      <!--
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            v-permisaction="['member:member:edit']"
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                    >修改</el-button>

                    <el-button
                            v-permisaction="['member:member:remove']"
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                    >删除</el-button>

                </template>
            </el-table-column>
            -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px">
      
      <el-table  v-loading="loadingLevel" :data="memberLevelList"  >
          <el-table-column label="用户ID" align="center" prop="id" :show-overflow-tooltip="true" />
          <el-table-column label="用户名" align="center" prop="username" :show-overflow-tooltip="true" />
      </el-table>
      <pagination
          v-show="totalLevel>0"
          :total="totalLevel"
          :page.sync="queryParamsLevel.pageIndex"
          :limit.sync="queryParamsLevel.pageSize"
          @pagination="handleLevel"
      />


      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="编号" prop="id">
          <el-input v-model="form.id" placeholder="" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="令牌" prop="token">
          <el-input v-model="form.token" placeholder="令牌" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="form.avatar" placeholder="头像" />
        </el-form-item>
        <el-form-item label="1男 2女" prop="sex">
          <el-input v-model="form.sex" placeholder="1男 2女" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="城市" prop="country">
          <el-input v-model="form.country" placeholder="城市" />
        </el-form-item>
        <el-form-item label="0待认证 1认证成功" prop="emailAuth">
          <el-input v-model="form.emailAuth" placeholder="0待认证 1认证成功" />
        </el-form-item>
        <el-form-item label="0未身份验证 1已身份验证" prop="status">
          <el-input v-model="form.status" placeholder="0未身份验证 1已身份验证" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createAt">
          <el-input v-model="form.createAt" placeholder="创建时间" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateAt">
          <el-input v-model="form.updateAt" placeholder="更新时间" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { listMember, getMember, delMember, addMember, updateMember, updateMemberStatus,listMemberLevel } from '@/api/member/member'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      loadingLevel: true,
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
        pageSize: 10, id: undefined, mobile: undefined, username: undefined, password: undefined, token: undefined, avatar: undefined, sex: undefined, email: undefined, country: undefined, emailAuth: undefined, status: undefined, createAt: undefined, updateAt: undefined
      },
      // 查询参数
      queryParamsLevel: {
        pageIndex: 1,
        pageSize: 10, memberId: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: { id: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      mobile: [
        { required: true, message: '手机号不能为空', trigger: 'blur' }
      ],
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ],
      token: [
        { required: true, message: '令牌不能为空', trigger: 'blur' }
      ],
      avatar: [
        { required: true, message: '头像不能为空', trigger: 'blur' }
      ],
      sex: [
        { required: true, message: '1男 2女不能为空', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' }
      ],
      country: [
        { required: true, message: '城市不能为空', trigger: 'blur' }
      ],
      emailAuth: [
        { required: true, message: '0待认证 1认证成功不能为空', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '0未身份验证 1已身份验证不能为空', trigger: 'blur' }
      ],
      createAt: [
        { required: true, message: '创建时间不能为空', trigger: 'blur' }
      ],
      updateAt: [
        { required: true, message: '更新时间不能为空', trigger: 'blur' }
      ]
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
      listMember(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        console.log(response.data)
        this.memberList = response.data.list
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
    // 参数系统内置字典翻译
    emailAuthFormat(row, column) {
      // return this.selectDictLabel(this.typeOptions, row.configType)
      return row.emailAuth === 0 ? '待认证' : '认证成功'
    },
    // 参数系统内置字典翻译
    typeFormat(row, column) {
      if (row.type == 1 ){
        return '用户'
      } else if (row.type == 2){
        return '承兑商'
      } else if (row.type == 3){
        return '兑换商'
      } else {
        return ''
      }
      
    },
    // 参数系统内置字典翻译
    switchOrderFormat(row, column) {
      if (row.switchOrder == 1){
        return '开启'
      } else if(row.switchOrder == 2){
        return '关闭'
      } else {
        return ''
      }
    },
    typeSex(row, column) {
      return row.sex === 1 ? '男' : '女'
    },
    status(row, column){
      if(row.status == 1){
        return '正常用户'
      } else if (row.status == 2){
        return '拉黑用户'
      } else {
        return '未知'
      }
    },
    identityAuth(row, column){
      if(row.identityAuth == 1){
        return '未认证'
      } else if (row.identityAuth == 2){
        return '身份认证通过'
      } else {
        return '未知'
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        mobile: undefined,
        username: undefined,
        password: undefined,
        token: undefined,
        avatar: undefined,
        sex: undefined,
        email: undefined,
        country: undefined,
        emailAuth: undefined,
        status: undefined,
        createAt: undefined,
        updateAt: undefined
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
      this.title = '添加Member'
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
      this.queryParamsLevel.memberId = id
      this.loadingLevel = true
      listMemberLevel(this.addDateRange(this.queryParamsLevel, this.dateRange)).then(response => {
        console.log(response)
        this.memberLevelList = response.data.list
        this.totalLevel = response.data.count
        this.loadingLevel = false
        this.title = '下级用户'
        this.open = true
      }
      )
    },
    /** 下级用户分页 */
    handleLevel(row) {
      this.loadingLevel = true
      listMemberLevel(this.addDateRange(this.queryParamsLevel, this.dateRange)).then(response => {
        console.log(response)
        this.memberLevelList = response.data.list
        this.totalLevel = response.data.count
        this.loadingLevel = false
        this.title = '下级用户'
        this.open = true
      }
      )
    },
   
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateMember(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addMember(this.form).then(response => {
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
    // 用户状态修改
    handleStatusChange(row) {
      return updateMemberStatus(row.id, row.googleAuthSwitch)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const Ids = row.id || this.ids
      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMember(Ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    }
  }
}
</script>

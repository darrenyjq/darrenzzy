<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="100px">
            <el-form-item label="广告创建者" prop="username">
                <el-input v-model="queryParams.username" placeholder="请输入广告ID" clearable size="small" @keyup.enter.native="handleQuery"  />
            </el-form-item>
            <el-form-item label="交易币种" prop="symbol">
                <el-input v-model="queryParams.symbol" placeholder="用户ID" clearable size="small" @keyup.enter.native="handleQuery" />
            </el-form-item>

            <el-form-item label="广告状态" prop="status">
            <el-select
              v-model="queryParams.status"
              placeholder="广告状态"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in advertiseTypeOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
            
            <!--
                <el-form-item label="" prop="price">
                        <el-input v-model="queryParams.price" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="广告类型（ 1出售或者2收购）" prop="advertiseType">
                        <el-input v-model="queryParams.advertiseType" placeholder="请输入广告类型（ 1出售或者2收购）" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="广告创建者ID" prop="ownerId">
                        <el-input v-model="queryParams.ownerId" placeholder="请输入广告创建者ID" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="交易币种ID" prop="coinId">
                        <el-input v-model="queryParams.coinId" placeholder="请输入交易币种ID" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label=" 交易类型 1 sell  2 buy" prop="type">
                        <el-input v-model="queryParams.type" placeholder="请输入 交易类型 1 sell  2 buy" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="货币id" prop="currencyId">
                        <el-input v-model="queryParams.currencyId" placeholder="请输入货币id" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="最低单笔交易额" prop="minLimit">
                        <el-input v-model="queryParams.minLimit" placeholder="请输入最低单笔交易额" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="最高单笔交易额" prop="maxLimit">
                        <el-input v-model="queryParams.maxLimit" placeholder="请输入最高单笔交易额" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="支持的支付方式" prop="payMode">
                        <el-input v-model="queryParams.payMode" placeholder="请输入支持的支付方式" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="广告状态（上架，下架，软删除）" prop="status">
                        <el-input v-model="queryParams.status" placeholder="请输入广告状态（上架，下架，软删除）" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="交易总量" prop="totalAmount">
                        <el-input v-model="queryParams.totalAmount" placeholder="请输入交易总量" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="交易中数量" prop="dealAmount">
                        <el-input v-model="queryParams.dealAmount" placeholder="请输入交易中数量" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="剩余数量" prop="remainAmount">
                        <el-input v-model="queryParams.remainAmount" placeholder="请输入剩余数量" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>
                <el-form-item label="版本计数" prop="version">
                        <el-input v-model="queryParams.version" placeholder="请输入版本计数" clearable size="small" @keyup.enter.native="handleQuery" />
                    </el-form-item>

            -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--
            <el-col :span="1.5">
                <el-button
                        v-permisaction="['otcadvertise:otcadvertise:add']"
                        type="primary"
                        icon="el-icon-plus"
                        size="mini"
                        @click="handleAdd"
                >新增</el-button>
            </el-col>
            -->
      <!-- <el-col :span="1.5">
        <el-button
          v-permisaction="['otcadvertise:otcadvertise:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          v-permisaction="['otcadvertise:otcadvertise:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="otcadvertiseList" highlight-current-row border size="mini" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="广告ID" align="center" prop="id" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="价格" align="center" prop="price" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="广告类型" align="center" prop="advertiseType" :formatter="advertiseType" /> -->
      <el-table-column label="广告创建者" align="center" prop="username" :show-overflow-tooltip="true" />
      <el-table-column label="交易币种" align="center" prop="symbol" :show-overflow-tooltip="true" />
      <!-- <el-table-column label=" 交易类型" align="center" prop="type" :formatter="type" /> -->
      <!-- <el-table-column label="货币" align="center" prop="code" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="最低单笔交易额" align="center" prop="minLimit" :show-overflow-tooltip="true"  width="120"/>
      <el-table-column label="最高单笔交易额" align="center" prop="maxLimit" :show-overflow-tooltip="true" width="120"/> -->
      <el-table-column label="广告状态" align="center" prop="status" :formatter="status" />
      <el-table-column label="交易总量" align="center" prop="totalAmount" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="交易中数量" align="center" prop="dealAmount" :show-overflow-tooltip="true" />
      <el-table-column label="剩余数量" align="center" prop="remainAmount" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="创建时间" align="center" prop="createAt" :show-overflow-tooltip="true" /> -->
      
       <el-table-column  fixed="right" label="操作" width="80">
          <template slot-scope="scope">				         
              <el-button type="primary" plain size="small" v-if="scope.row.status===1"  @click="handleUpdate(scope.row)">下架</el-button>  
              <el-button size="small" type="danger" v-if="scope.row.status===2"  @click="handleDel(scope.row)" plain>删除</el-button>	                          
          </template>
        </el-table-column>  

      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-permisaction="['otcadvertise:otcadvertise:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['otcadvertise:otcadvertise:remove']"
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

        <el-form-item label="广告状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择广告状态" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
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
import { listOtcAdvertise, getOtcAdvertise, delOtcAdvertise, addOtcAdvertise, updateOtcAdvertise } from '@/api/member/advertise'

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
      //广告状态
      statusOptions: [{
        "label": "上架",
        "value": 1
      }, {
        "label": "下架",
        "value": 2
      }],
      advertiseTypeOptions: [{
          "dictLabel": "上架",
          "dictValue": 1
      }, {
          "dictLabel": "下架",
          "dictValue": 2
      }],
   
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10, id: undefined, price: undefined, advertiseType: undefined, ownerId: undefined, coinId: undefined, type: undefined, currencyId: undefined, minLimit: undefined, maxLimit: undefined, payMode: undefined, status: undefined, totalAmount: undefined, dealAmount: undefined, remainAmount: undefined, version: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: { id: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      price: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      advertiseType: [
        { required: true, message: '广告类型不能为空', trigger: 'blur' }
      ],
      ownerId: [
        { required: true, message: '广告创建者不能为空', trigger: 'blur' }
      ],
      coinId: [
        { required: true, message: '交易币种不能为空', trigger: 'blur' }
      ],
      type: [
        { required: true, message: ' 交易类型 不能为空', trigger: 'blur' }
      ],
      currencyId: [
        { required: true, message: '货币不能为空', trigger: 'blur' }
      ],
      minLimit: [
        { required: true, message: '最低单笔交易额不能为空', trigger: 'blur' }
      ],
      maxLimit: [
        { required: true, message: '最高单笔交易额不能为空', trigger: 'blur' }
      ],
      payMode: [
        { required: true, message: '支持的支付方式不能为空', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '广告状态不能为空', trigger: 'blur' }
      ],
      totalAmount: [
        { required: true, message: '交易总量不能为空', trigger: 'blur' }
      ],
      dealAmount: [
        { required: true, message: '交易中数量不能为空', trigger: 'blur' }
      ],
      remainAmount: [
        { required: true, message: '剩余数量不能为空', trigger: 'blur' }
      ],
      version: [
        { required: true, message: '版本计数不能为空', trigger: 'blur' }
      ]

     
      },
      
      
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listOtcAdvertise(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.otcadvertiseList = response.data.list
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
        price: undefined,
        advertiseType: undefined,
        ownerId: undefined,
        coinId: undefined,
        type: undefined,
        currencyId: undefined,
        minLimit: undefined,
        maxLimit: undefined,
        payMode: undefined,
        status: undefined,
        totalAmount: undefined,
        dealAmount: undefined,
        remainAmount: undefined,
        version: undefined
      }
      this.resetForm('form')
    },
    // 广告类型
    advertiseType(row, column) {
      return row.advertiseType === 1 ? '出售' : '收购'
    },
    // 交易类型
    type(row, column) {
      return row.type === 1 ? '卖' : '买'
    },
    // 广告状态
    status(row, column) {
      if (row.status === 1) {
        return '上架'
      } else if (row.status === 2) {
        return '下架'
      } else if (row.status === 3) {
        return '删除'
      }
      // return row.status === 1 ? '卖' : '买'
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
      this.title = '添加OtcAdvertise'
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
       updateOtcAdvertise(row).then(response => {
          if (response.code === 200) {
              this.msgSuccess('下架成功')
              this.open = false
              this.getList()
          } else {
              this.msgError(response.msg)
          }
      })


      // this.reset()
      // const id = row.id || this.ids
      // const name = row.username
      // const symbol = row.symbol
      // const rowOtc = row
      // // this.form.id = row.id
      // // this.form.totalAmount = row.totalAmount
      // // this.form.ownerId = row.ownerId
      // // this.form.coinId = row.coinId
      // // this.form.status = 2

      // console.log(this.form)

      // if (row.status == 1){
      //   this.$confirm('确认下架"' + name + symbol + '"的广告?', '警告', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: ''
      // }).then(function() {
      //   updateOtcAdvertise(rowOtc).then(response => {
      //       if (response.code === 200) {
      //         // this.msgSuccess('修改成功')
      //         // this.open = false
      //         // this.getList()
      //         // this.getList()
      //         // this.msgSuccess('下架成功')
      //         // console.log("-----------------------------------")
      //         // return

      //         // this.loading = true
      //         listOtcAdvertise(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
      //         this.otcadvertiseList = response.data.list
      //         this.total = response.data.count
      //         // this.loading = false
      //       }
      //       )
      //       } else {
      //         // this.msgError(response.msg)
      //         return
      //       }
      //     })
      // }).then(() => {
      //   // console.log("===============================")
      //   // this.getList()
      // }).catch(function() {})

       
      // } else if (row.status == 2) {
      //   alert('广告已经下架，不能重复下架。')
      // }
      // // getOtcAdvertise(id).then(response => {
      // //   console.log(response)
      // //   this.form = response.data
      // //   this.open = true
      // //   this.title = '修改广告'
      // // })
    },
    /** 软删除操作 */
    handleDel(row) {
      this.reset()

      updateOtcAdvertise(row).then(response => {
          if (response.code === 200) {
              this.msgSuccess('删除成功')
              this.open = false
              this.getList()
          } else {
              this.msgError(response.msg)
          }
      })

    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateOtcAdvertise(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addOtcAdvertise(this.form).then(response => {
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
        return delOtcAdvertise(Ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    }
  }
}
</script>



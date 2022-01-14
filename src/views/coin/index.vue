<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">

      <el-form-item label="币种缩写" prop="symbol">
        <el-input v-model="queryParams.symbol" placeholder="请输入币种缩写" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permisaction="['coin:coin:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['coin:coin:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['coin:coin:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="coinList" size="mini" highlight-current-row border  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45" align="center" />

      <el-table-column label="币种" align="center" prop="symbol" :show-overflow-tooltip="true" />
      <el-table-column label="币种名称" align="center" prop="fullName" :show-overflow-tooltip="true" />
      <!-- <el-table-column label="最高手续费" align="center" prop="maxTxFee" :show-overflow-tooltip="true"  width="100"/>
      <el-table-column label="最大提币数量" align="center" prop="maxWithdrawAmount" :show-overflow-tooltip="true" width="150"/>
      <el-table-column label="最低手续费" align="center" prop="minTxFee" :show-overflow-tooltip="true"  width="100"/> -->
      <el-table-column label="最小提币数量" align="center" prop="minWithdrawAmount" :show-overflow-tooltip="true"  width="150"/>
      
      <!-- <el-table-column label="状态" align="center" prop="status" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="USDT汇率" align="center" prop="usdRate" :show-overflow-tooltip="true"  width="100"/> -->
      <el-table-column label="人民币汇率(进账)" align="center" prop="cnyRateIn" :show-overflow-tooltip="true"   width="150"/>
      <el-table-column label="人民币汇率(出账)" align="center" prop="cnyRateOut" :show-overflow-tooltip="true"  width="150"/>
      <el-table-column label="自动提币阈值" align="center" prop="withdrawThreshold" :show-overflow-tooltip="true"  width="130"/>
      <!-- <el-table-column label="转冷冷钱包地址" align="center" prop="coldWalletAddress" :show-overflow-tooltip="true"   width="120"/>
      <el-table-column label="矿工费" align="center" prop="minerFee" :show-overflow-tooltip="true" /> -->
      <el-table-column label="提币精度" align="center" prop="withdrawScale" :show-overflow-tooltip="true" />
       <el-table-column label="币种精度" align="center" prop="precision" :show-overflow-tooltip="true"  />
      <!-- <el-table-column label="是否有链名称" align="center" prop="providerEnable" :formatter="providerEnableForm" width="120"/> -->
      <el-table-column label="是否允许站内转账" align="center" prop="canTransfer" :formatter="canTransferForm" width="130"/>
      <el-table-column label="是否允许OTC交易" align="center" prop="canOtc" :formatter="canOtcForm" width="130"/>
      <el-table-column label="是否APP展示" align="center" prop="isShow" :formatter="isShowForm" width="130"/>
      <el-table-column label="是否为法币" align="center" prop="isCurrency" :formatter="isCurrencyForm" width="130"/>
     
      <el-table-column  fixed="right" label="操作" width="150">
          <template slot-scope="scope">				         
            <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">修改</el-button>  
            <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	                          
         </template>
      </el-table-column>  
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-permisaction="['coin:coin:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['coin:coin:remove']"
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

        <el-form-item label="币种缩写" prop="symbol">
          <el-input v-model="form.symbol" placeholder="币种缩写" />
        </el-form-item>
        <el-form-item label="币种名称" prop="fullName">
          <el-input v-model="form.fullName" placeholder="币种名称" />
        </el-form-item>
        <!-- <el-form-item label="最高手续费" prop="maxTxFee">
          <el-input v-model="form.maxTxFee" placeholder="最高手续费" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>
        <el-form-item label="最大提币数量" prop="maxWithdrawAmount">
          <el-input v-model="form.maxWithdrawAmount" placeholder="最大提币数量"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>
        <el-form-item label="最低手续费" prop="minTxFee">
          <el-input v-model="form.minTxFee" placeholder="最低手续费"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item> -->
        <el-form-item label="最小提币数量" prop="minWithdrawAmount">
          <el-input v-model="form.minWithdrawAmount" placeholder="最小提币数量"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

        <!-- <el-form-item label="USDT汇率" prop="usdRate">
          <el-input v-model="form.usdRate" placeholder=""  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item> -->
        <el-form-item label="人民币汇率(进账)" prop="cnyRateIn">
          <el-input v-model="form.cnyRateIn" placeholder=""  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>
        <el-form-item label="人民币汇率(出账)" prop="cnyRateOut">
          <el-input v-model="form.cnyRateOut" placeholder=""  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

      
        <el-form-item label="自动提币阈值" prop="withdrawThreshold">
          <el-input v-model="form.withdrawThreshold" placeholder="自动提币阈值" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

       
        <!-- <el-form-item label="转冷冷钱包地址" prop="coldWalletAddress">
          <el-input v-model="form.coldWalletAddress" placeholder="转冷冷钱包地址"  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item> -->
        <!-- <el-form-item label="矿工费" prop="minerFee">
          <el-input v-model="form.minerFee" placeholder="矿工费" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
        </el-form-item> -->
        <el-form-item label="提币精度" prop="withdrawScale">
          <el-input v-model="form.withdrawScale" placeholder="提币精度,只能输入数字" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
        </el-form-item>

        <el-form-item label="币种精度" prop="precision">
          <el-input v-model="form.precision" placeholder="币种精度,只能输入数字" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
        </el-form-item>

        <el-form-item label="是否有链名称" prop="providerEnable">
            <el-select v-model="form.providerEnable" placeholder="是否有链名称" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
            </el-form-item>

         <el-form-item label="是否允许站内转账" prop="canTransfer">
            <el-select v-model="form.canTransfer" placeholder="是否允许站内转账" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
            </el-form-item>

        <el-form-item label="是否允许OTC交易" prop="canOtc">
            <el-select v-model="form.canOtc" placeholder="是否允许OTC交易" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in canOtcOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
            </el-form-item>

          <el-form-item label="是否APP展示" prop="canOtc">
            <el-select v-model="form.isShow" placeholder="是否允许OTC交易" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in isShowOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item label="是否为法币" prop="canOtc">
            <el-select v-model="form.isCurrency" placeholder="是否允许OTC交易" clearable :style="{width: '100%'}">
            <el-option v-for="(item, index) in isCurrencyOptions" :key="index" :label="item.label"
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
import { listCoin, getCoin, delCoin, addCoin, updateCoin } from '@/api/member/coin'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      symbols: [],
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
            "label": "否",
            "value": 1
        },{
            "label": "是",
            "value": 2
        }
      ],
       //广告状态
      statusOptions: [{
          "label": "否",
          "value": 1
      }, {
          "label": "是",
          "value": 2
      }],
      //是否允许otc交易
      canOtcOptions: [{
          "label": "否",
          "value": 1
      },{
          "label": "是",
          "value": 2
      }],
      isShowOptions: [{
          "label": "否",
          "value": 1
      },{
          "label": "是",
          "value": 2
      }],
      isCurrencyOptions: [{
          "label": "否",
          "value": 1
      },{
          "label": "是",
          "value": 2
      }],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        symbol: undefined,
        fullName: undefined,
        maxTxFee: undefined,
        maxWithdrawAmount: undefined,
        minTxFee: undefined,
        minWithdrawAmount: undefined,
        sort: undefined,
        status: undefined,
        usdRate: undefined,
        withdrawThreshold: undefined,
        hasLegal: undefined,
        coldWalletAddress: undefined,
        minerFee: undefined,
        withdrawScale: undefined,
        createdTime: undefined,
        updatedTime: undefined

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: { id: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      symbol: [
        { required: true, message: '币种缩写不能为空', trigger: 'blur' }
      ],
      fullName: [
        { required: true, message: '币种名称不能为空', trigger: 'blur' }
      ],
      maxTxFee: [
        { required: true, message: '最高手续费不能为空', trigger: 'blur' }
      ],
      maxWithdrawAmount: [
        { required: true, message: '最大提币数量不能为空', trigger: 'blur' }
      ],
      minTxFee: [
        { required: true, message: '最低手续费不能为空', trigger: 'blur' }
      ],
      minWithdrawAmount: [
        { required: true, message: '最小提币数量不能为空', trigger: 'blur' }
      ],
      sort: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      usdRate: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      withdrawThreshold: [
        { required: true, message: '自动提币阈值不能为空', trigger: 'blur' }
      ],
      hasLegal: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      coldWalletAddress: [
        { required: true, message: '转冷冷钱包地址不能为空', trigger: 'blur' }
      ],
      minerFee: [
        { required: true, message: '矿工费不能为空', trigger: 'blur' }
      ],
      withdrawScale: [
        { required: true, message: '提币精度不能为空', trigger: 'blur' }
      ],
      createdTime: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      updatedTime: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      providerEnable: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      canTransfer: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      cnyRateIn: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      cnyRateOut: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      canOtc: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      isShow: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      isCurrency: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
       precision: [
        { required: true, message: '不能为空', trigger: 'blur' }
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
      listCoin(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.coinList = response.data.list
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
    providerEnableForm(row,column){
        if (row.providerEnable == 1){
            return '否'
        }else if (row.providerEnable == 2){
            return '是'
        }else{
            return '未知'
        }
    },
    canTransferForm(row,column){
        if (row.canTransfer == 1){
            return '否'
        }else if (row.canTransfer == 2){
            return '是'
        }else{
            return '未知'
        }
    },
    canOtcForm(row,column){
        if (row.canOtc == 1){
            return '否'
        }else if (row.canOtc == 2){
            return '是'
        }else{
            return '未知'
        }
    },
    isShowForm(row,column){
        if (row.isShow == 1){
            return '否'
        }else if (row.isShow == 2){
            return '是'
        }else{
            return '未知'
        }
    },
    isCurrencyForm(row,column){
        if (row.isCurrency == 1){
            return '否'
        }else if (row.isCurrency == 2){
            return '是'
        }else{
            return '未知'
        }
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        symbol: undefined,
        fullName: undefined,
        maxTxFee: undefined,
        maxWithdrawAmount: undefined,
        minTxFee: undefined,
        minWithdrawAmount: undefined,
        sort: undefined,
        status: undefined,
        usdRate: undefined,
        withdrawThreshold: undefined,
        hasLegal: undefined,
        coldWalletAddress: undefined,
        minerFee: undefined,
        withdrawScale: undefined,
        createdTime: undefined,
        updatedTime: undefined
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
      this.title = '添加Coin'
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.symbols = selection.map(item => item.symbol)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      console.log('id = ', id)
      getCoin(id).then(response => {
        this.form = response.data

        var len = this.form.cnyRateIn.indexOf(".")
        this.form.cnyRateIn = this.form.cnyRateIn.substring(0,this.form.cnyRateIn.indexOf(".") + 1 + this.form.precision)
        len = this.form.cnyRateOut.indexOf(".")
        this.form.cnyRateOut = this.form.cnyRateOut.substring(0,this.form.cnyRateOut.indexOf(".") + 1 + this.form.precision)
        // len = this.form.exchangeRate.indexOf(".")
        // this.form.exchangeRate = this.form.exchangeRate.substring(0,this.form.exchangeRate.indexOf(".") + 1 + this.form.precision)

        // console.log('this.form = ',this.form)
        // console.log('res.id = ', this.form.id)
        this.open = true
        this.title = '修改币种'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // 字符串转int
          this.form.sort = parseInt(this.form.sort)
          this.form.status = parseInt(this.form.status)
          this.form.hasLegal = parseInt(this.form.hasLegal)
          this.form.withdrawScale = parseInt(this.form.withdrawScale)
          this.form.precision = parseInt(this.form.precision)

           if ( 
          (this.form.cnyRateIn.length - this.form.cnyRateIn.indexOf(".") - 1) > this.form.precision || 
          (this.form.cnyRateOut.length - this.form.cnyRateOut.indexOf(".") - 1) > this.form.precision){
          alert('小数精度为' + this.form.precision +', 人民币汇率(进账),人民币汇率(出账),小数精度不能超过' + this.form.precision )
        }else{
          if (this.form.id !== undefined) {
            var dateee = new Date(this.form.createdTime).toJSON()
            var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            this.form.createdTime = date

            updateCoin(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addCoin(this.form).then(response => {
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
      const symbols = this.symbols
      this.$confirm('确认删除"' + symbols + '"?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCoin(Ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    }
  }
}
</script>

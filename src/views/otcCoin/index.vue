<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      
      <el-form-item label="币种缩写" prop="symbol">
        <el-input v-model="queryParams.symbol" placeholder="请输入币种缩写" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="买入广告最低发布数量" prop="buyMinAmount">
        <el-input v-model="queryParams.buyMinAmount" placeholder="请输入买入广告最低发布数量" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="卖出广告最低发布数量" prop="sellMinAmount">
        <el-input v-model="queryParams.sellMinAmount" placeholder="请输入卖出广告最低发布数量" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="交易手续费率" prop="tradeFee">
        <el-input v-model="queryParams.tradeFee" placeholder="请输入交易手续费率" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="" prop="sort">
        <el-input v-model="queryParams.sort" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="" prop="status">
        <el-input v-model="queryParams.status" placeholder="请输入" clearable size="small" @keyup.enter.native="handleQuery" />
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permisaction="['otccoin:otccoin:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['otccoin:otccoin:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          v-permisaction="['otccoin:otccoin:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="otccoinList" highlight-current-row border size="mini" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="ID" align="center" prop="id" :show-overflow-tooltip="true" /> -->
      <el-table-column label="币种缩写" align="center" prop="symbol" :show-overflow-tooltip="true" sortable/>
      <el-table-column label="买入广告最低发布数量" align="center" prop="buyMinAmount" :show-overflow-tooltip="true" width="170"/>
      <el-table-column label="卖出广告最低发布数量" align="center" prop="sellMinAmount" :show-overflow-tooltip="true" width="170"/>
      <!-- <el-table-column label="交易手续费率" align="center" prop="tradeFee" :show-overflow-tooltip="true" /> -->
      <!-- <el-table-column label="" align="center" prop="sort" :show-overflow-tooltip="true" /> -->
      <el-table-column label="状态" align="center" prop="status" :formatter="status"  />
      <el-table-column label="卖币(CNY)" align="center" prop="sellRate" :show-overflow-tooltip="true" />
      <el-table-column label="买币(CNY)" align="center" prop="buyRate" :show-overflow-tooltip="true" />
      <el-table-column label="承兑商(CNY)" align="center" prop="exchangeRate" :show-overflow-tooltip="true" width="100"/>
      <el-table-column label="小数精度" align="center" prop="precision" :show-overflow-tooltip="true" />
      <el-table-column label="APP展示" align="center" prop="isShow" :formatter="isShow"  /> 

       <el-table-column  fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="small" @click="handleRate(scope.row)">实时汇率</el-button>					         
            <el-button type="primary" plain size="small"  @click="handleUpdate(scope.row)">修改</el-button>  
            <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>	 
                                     
			    </template>
        </el-table-column>  

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
       
        <!-- <el-form-item label="币种缩写" prop="symbol">
          <el-input v-model="form.symbol" placeholder="币种缩写" />
        </el-form-item> -->
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
        <el-form-item label="买入广告最低发布数量" prop="buyMinAmount" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
          <el-input v-model="form.buyMinAmount" placeholder="买入广告最低发布数量" />
        </el-form-item>
        <el-form-item label="卖出广告最低发布数量" prop="sellMinAmount" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
          <el-input v-model="form.sellMinAmount" placeholder="卖出广告最低发布数量" />
        </el-form-item>
         

        <el-form-item label="卖币(CNY)" prop="sellRate">
          <el-input v-model="form.sellRate" placeholder="卖币(CNY)数量例如1USDT=7CNY" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

        <el-form-item label="买币(CNY)" prop="buyRate">
          <el-input v-model="form.buyRate" placeholder="卖币(CNY)数量例如1USDT=7CNY" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

        <el-form-item label="承兑商(CNY)" prop="exchangeRate">
          <el-input v-model="form.exchangeRate" placeholder="承兑商(CNY)数量例如1USDT=7CNY" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

        <el-form-item label="小数精度" prop="precision">
          <el-input v-model="form.precision" placeholder="小数精度" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
        </el-form-item>

        <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择状态" clearable :style="{width: '50%'}">
                <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="APP展示" prop="isShow">
            <el-select v-model="form.isShow" placeholder="请选择状态" clearable :style="{width: '50%'}">
                <el-option v-for="(item, index) in isShowOptions" :key="index" :label="item.label"
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
import { listOtcCoin, getOtcCoin, delOtcCoin, addOtcCoin, updateOtcCoin, getRate } from '@/api/member/otcCoin'
import { listCoin, getCoin, delCoin, addCoin, updateCoin, listCoinName } from '@/api/member/coin'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      symbols:[],
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
      typeOptions: [
        {
            "label": "开启",
            "value": 1
        },{
            "label": "关闭",
            "value": 2
        }
      ],
      isShowOptions: [
        {
            "label": "开启",
            "value": 1
        },{
            "label": "关闭",
            "value": 2
        }
      ],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10, id: undefined, coinId: undefined, symbol: undefined, buyMinAmount: undefined, sellMinAmount: undefined, tradeFee: undefined, sort: undefined, status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: { id: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      coinId: [
        { required: true, message: '无用不能为空', trigger: 'blur' }
      ],
      symbol: [
        { required: true, message: '币种缩写不能为空', trigger: 'blur' }
      ],
      buyMinAmount: [
        { required: true, message: '买入广告最低发布数量不能为空', trigger: 'blur' }
      ],
      sellMinAmount: [
        { required: true, message: '卖出广告最低发布数量不能为空', trigger: 'blur' }
      ],
      tradeFee: [
        { required: true, message: '交易手续费率不能为空', trigger: 'blur' }
      ],
      sort: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      sellRate: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      buyRate: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      exchangeRate: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
      precision: [
        { required: true, message: '不能为空', trigger: 'blur' }
      ],
       isShow: [
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
      listOtcCoin(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.otccoinList = response.data.list
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
        symbol: undefined,
        buyMinAmount: undefined,
        sellMinAmount: undefined,
        tradeFee: undefined,
        sort: undefined,
        status: undefined
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
      // this.open = true
      // this.title = '添加OtcCoin'
      listCoinName().then(response => {         
            this.coinOptions = response.dataCoin
            console.log(response.dataCoin)
            this.open = true
            this.title = '添加OTC币种'
        })
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      symbols = selection.map(item => item.symbol)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    //状态
    status(row,column){
      if (row.status == 1){
          return '开启'
      }else if (row.status == 2){
          return '关闭'
      }else{
          return '未知'
      }
    },
    //状态
    isShow(row,column){
      if (row.isShow == 1){
          return '开启'
      }else if (row.isShow == 2){
          return '关闭'
      }else{
          return '未知'
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      
      getOtcCoin(id).then(response => {
        //截取字符
        this.form = response.data
        var len = this.form.sellRate.indexOf(".")
        this.form.sellRate = this.form.sellRate.substring(0,this.form.sellRate.indexOf(".") + 1 + this.form.precision)
        len = this.form.buyRate.indexOf(".")
        this.form.buyRate = this.form.buyRate.substring(0,this.form.buyRate.indexOf(".") + 1 + this.form.precision)
        len = this.form.exchangeRate.indexOf(".")
        this.form.exchangeRate = this.form.exchangeRate.substring(0,this.form.exchangeRate.indexOf(".") + 1 + this.form.precision)
        this.open = true
        this.title = '修改OtcCoin'
        listCoinName().then(response => {         
            this.coinOptions = response.dataCoin
            console.log(response.dataCoin)
            
        })
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.precision = parseInt(this.form.precision)
          console.log(this.form.sellRate)
          

        //截取小数点位数
        if ((this.form.sellRate.length - this.form.sellRate.indexOf(".") - 1) > this.form.precision  || 
          (this.form.buyRate.length - this.form.buyRate.indexOf(".") - 1) > this.form.precision || 
          (this.form.exchangeRate.length - this.form.exchangeRate.indexOf(".") - 1) > this.form.precision){
          alert('小数精度为' + this.form.precision +', 卖币(CNY),买币(CNY),承兑商(CNY),小数精度不能超过' + this.form.precision )
       
        }else{
          if (this.form.id !== undefined) {
          updateOtcCoin(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            } else {
              this.msgError(response.msg)
            }
          })
        } else {
          addOtcCoin(this.form).then(response => {
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
      const symbols = row.symbol || this.symbols
      this.$confirm('确认删除"' + symbols + '"?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delOtcCoin(Ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() {})
    },
    /** 实时汇率按钮操作 */
    handleRate(row) {
       getRate().then(response => {
          console.log(response)
          var data = response  
          console.log(data)
          this.$confirm('1USDT = '+data.msg+'CNY', '实时汇率', {
            confirmButtonText: '确定',
            
            type: ''
          }).then(function() {
       
          }).then(() => {
        
          }).catch(function() {})
        })

      
    }
  }
}
</script>

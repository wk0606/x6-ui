<template>
  <div :style="{height: setTableHeight}" v-x6-loading="{loading: loading, text: '正在加载...'}">
    <el-table
      border
      highlight-current-row
      header-cell-class-name="x6-header-cell"
      :stripe="stripe === false ? false : true"
      :height="setTableHeight2"
      :data="List"
      @header-dragend="handlerDragHeader">
      <!-- empty -->
      <div slot="empty" class="x6-table-empty">
        <img src="./empty.svg" alt="" width="50">
        <b>{{ emptyText }}</b>
      </div>
      <el-table-column
        header-align="center"
        v-for="col in tableColumns"
        :key="col.prop"
        :label="col.label"
        :prop="col.prop"
        :width="col.width"
        :min-width="col.minWidth"
        :align="col.align || 'center'"
        :fixed="col.fixed || false">
        <!-- 嵌套表头 -->
        <el-table-column
          header-align="center"
          v-for="c_col in col.children"
          :key="c_col.prop"
          :label="c_col.label"
          :prop="c_col.prop"
          :width="c_col.width"
          :min-width="c_col.minWidth"
          :align="c_col.align || 'center'">
          <template slot="header" slot-scope="{ column }">
            <span>{{ column.label + '1' }}</span>
          </template>
          <template slot-scope="scope">
            <table-cell :row="scope.row" :options="c_col" :render-method="c_col.render" />
          </template>  
        </el-table-column>
        <template slot="header" slot-scope="{ column }">
          <!-- 自定义渲染表头 -->
          <table-header
            :options="column"
            :filterable="col.filterable"
            :pageId="pageId"
            :pzId="pzId || 0"
            :action="action"
            :actionParams="actionParams"
            @toggle-checked="handlerToggleChecked" />
        </template>
        <template slot-scope="scope" v-if="!col.children">
          <table-cell :row="scope.row" :options="col" :render-method="col.render" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="x6-pagination">
      <el-pagination
        :current-page.sync="page.no"
        :page-size="page.size"
        layout="total, prev, pager, next"
        :total="page.total"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import { Http } from '../../server/http'
import { props } from './props'
import TableHeader from './TableHeader'
import TableCell from './TableCell'
import { mapState } from "vuex"
export default {
  name: 'XTable',
  props,
  data () {
    return {
      List: [],
      columns: [],
      page: {
        no: 1,
        size: 30,
        total: 0
      },
      loading: false,
    }
  },
  components: { TableCell, TableHeader },
  computed: {
    ...mapState('FilterModule', {
      _consitions_: state => state.FilterConditions
    }),
    setTableHeight () {
      return typeof this.height === 'number' ? `${this.height}px` : this.height
    },
    setTableHeight2 () {
      return "calc(100% - 32px)"
    },
    tableColumns () {
      return this.columns.filter(item => item.hide === '0')
    }
  },
  methods: {
    // 过滤筛选事件
    handlerToggleChecked() {
      this.requestList()
    },
    handlerDragHeader(newWidth, oldWidth, column) {
      let _col = this.columns.find(item => item.prop === column.property)
      this.$api.SavePageSetting({
        pageid: this.pageId,
        pzid: this.pzId || 0,
        pzinfo: {
          cols: [
            {
              label: column.label,
              code: column.property,
              hide: _col ? _col.hide : '1',
              width: newWidth
            }
          ]
        }
      })
    },
    handlePageChange(val) {
      this.requestList()
    },
    setTableColumns () {
      this.columns = []
      this.$api.GetPageSetting({
        pageid: this.pageId,
        pzid: this.pzId || 0
      }).then(res => {
        for (let col of res.List) {
          this.columns.push({
            hide: col.hide,
            label: col.label,
            prop: col.code,
            align: col.align,
            width: col.width || '',
            minWidth: col.minWidth,
            format: col.format,
            avatarKey: col.picUrlkey,
            filterable: col.filterable == '1' ? true : false,
            fixed: col.fixed == 'l' ? 'left' : col.fixed == '2' ? 'right' : ''
          })
        }
        // 获取表格数据
        this.getData()
      })
    },
    requestList () {
      this.loading = true
      let searchCol = []
      const filterConditions = this._consitions_[`${this.pageId}_${this.pzId}`] // 获取筛选的结果
      if (!!filterConditions) {
        for (let key in filterConditions) {
          filterConditions[key].length > 0 && searchCol.push({ colName: key, colValues: filterConditions[key], isNum: false })
        }
      }
      this.$api[this.action]({
        pageSize: this.page.size,
        pageNo: this.page.no,
        searchCol,
        ...this.actionParams,
      }).then(res => {
        this.List = res.VO.rows
        this.page.total = res.VO.totalRows
        this.loading = false
      }).catch(_ => {
        this.loading = false
      })
    },
    getData() {
      if (!!this.action) {
        this.requestList()
      } else {
        this.List = [ ...this.data ]
      }
    }
  },
  mounted () {
    this.setTableColumns()
  }
}
</script>
<style lang="css" scoped>
.x6-pagination{
  text-align: center;
}
.x6-table-empty{
  display: inline-flex;
  align-items: center;
}
.x6-table-empty b{
  font-size: 1.5rem;
  color: #d8d8d8;
  margin-left: 1rem;
}
</style>

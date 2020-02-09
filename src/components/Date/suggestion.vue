<template>
  <div class="x6-date-suggestion" v-if="visible">
    <suggestion-header :type="type" :value="current2" @handler-change="handlerChange" />
    <div class="x-date-suggestion_line"></div>
    <div class="x6-suggestion-body">
      <div class="x6-flex-row x6-date-suggestion_week" v-if="type === 'date'">
        <span v-for="item in weekend" :key="item">{{ item }}</span>
      </div>
      <div>
        <div v-for="(item, index) in Math.ceil(nodes.length / setCols)" :key="`row${index}`" class="x6-flex-row x6-date-suggestion_nodes">
          <suggestion-cell
            v-for="node in nodes.slice(index * setCols, (index + 1) * setCols)"
            :key="node.text"
            :type="type"
            :value="node"
            :year="current2.year"
            :month="current2.month"
            :selected="isCurrentDate(node)"
            @handler-tap="handlerCellTap">
          </suggestion-cell>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SuggestionHeader from './SuggestionHeader'
import SuggestionCell from './SuggestionCell'
export default {
  name: 'DateSuggestion',
  props: ['visible', 'type', 'date'],
  data () {
    return {
      weekend: ['日', '一', '二', '三', '四', '五', '六'],
      month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      season: {

      },
      current: {
        year: '',
        month: '',
        day: ''
      },
      current2: null,
      firstWeekStartDate: '', // 第一周第一天日期
      nodes: [],
    }
  },
  components: { SuggestionHeader, SuggestionCell },
  watch: {
    visible (nv) {
      if (nv) {
        this.setCurrentDate()
        this.createNodes()
      }
    }
  },
  computed: {
    setCols() {
      switch(this.type){
        case 'year':
          return 4
        case 'month':
          return 4
        case 'season':
          return 1
        case 'week':
          return 1
        case 'date':
          return 7
        default:
          return 0
      }
    }
  },
  methods: {
    isCurrentDate (val) {
      if (this.type === 'year') {
        return val === this.current.year ? true : false
      } else if (this.type === 'month') {
        return this.current.year === this.current2.year && this.current.month === val ? true : false
      } else if (this.type === 'season') {
        return this.current.year === this.current2.year && this.current.month === (val - 1) * 3 + 1 ? true : false
      } else {
        
      }
    },
    handlerChange (obj) {
      let key = obj.isyear ? 'year' : 'month'
      if (obj.isyear) {
        this.current2[key] = this.current2[key] + obj.val
      } else {
        let m = this.current2[key] + obj.val
        this.current2[key] = m > 12 ? 1 : m < 1 ? 12 : m
        this.current2.year = m > 12 ? this.current2.year + 1 : m < 1 ? this.current2.year - 1 : this.current2.year
      }
      this.createNodes()
    },
    handlerCellTap (val) {
      let _d
      if (this.type === 'year') {
        _d = val.year.toString()
      } else if (this.type === 'month') {
        _d = `${this.current2.year}-${val.month < 10 ? '0' + val.month : val.month}`
      } else if (this.type === 'season' || this.type === 'week') {
        _d = []
        _d.push(`${val.fsrqq[0]}-${val.fsrqq[1] < 10 ? '0' + val.fsrqq[1] : val.fsrqq[1]}-${val.fsrqq[2] < 10 ? '0' + val.fsrqq[2] : val.fsrqq[2]}`)
        _d.push(`${val.fsrqz[0]}-${val.fsrqz[1] < 10 ? '0' + val.fsrqz[1] : val.fsrqz[1]}-${val.fsrqz[2] < 10 ? '0' + val.fsrqz[2] : val.fsrqz[2]}`)
      }
      this.$emit('change', _d)
      this.$emit('update:visible', false)
    },
    setCurrentDate() {
      let date
      if (!!this.date) {
        if (this.type === 'year') {
          this.current.year = +this.date
        } else if (this.type === 'month') {
          this.current.year = +this.date.split('-')[0]
          this.current.month = +this.date.split('-')[1]
        } else if (this.type === 'season') {
          this.current.year = +this.date[0].split('-')[0]
          this.current.month = +this.date[0].split('-')[1]
          this.current.day = +this.date[0].split('-')[2]
        } else if (this.type === 'week') {

        } else {
          date = this.date.toString().replace(/-/g, '/')
          date = new Date(date)
          this.current.year = date.getFullYear()
          this.current.month = date.getMonth() + 1
          this.current.day = date.getDate()
        }
      } else {
        date = new Date()
        this.current.year = date.getFullYear()
        this.current.month = date.getMonth() + 1
        this.current.day = date.getDate()
      }
      this.current2 = { ...this.current }
    },
    createNodes() {
      switch(this.type) {
        case 'year':
          this.nodes = this.calcYearNodes()
          break
        case 'month':
          this.nodes = this.calcMonthNodes()
          break
        case 'week':
          this.nodes = this.calcWeekNodes()
          break
        case 'season':
          this.nodes = this.calcSeasonNodes()
          break
        case 'date':
          this.nodes = this.calcDateNodes()
          break
        default:
          return
      }
    },
    calcYearNodes() {
      let p = this.current2.year % 10
      let temp = []
      for (let i = this.current2.year - p; i <= this.current2.year + 9 - p ; i++) {
        temp.push({
          text: `${i}`,
          year: i,
        })
      }
      return temp
    },
    calcMonthNodes() {
      let temp = []
      let { year } = this.current2
      for (let i = 1; i < 13; i++) {
        temp.push({
          text: `${this.month[i - 1]}`,
          year,
          month: i
        })
      }
      return temp
    },
    calcSeasonNodes() {
      let temp = []
      let { year } = this.current2
      for (let i = 1; i < 5; i++) {
        let s1 = (i - 1) * 3 + 1
        let s2 = i * 3
        temp.push({
          text: `${year}年 第${i}季度`,
          fsrqq: [`${year}`, s1, 1],
          fsrqz: [`${year}`, s2, this.getMonthDays(year, s2)]
        })
      }
      return temp
    },
    calcDateNodes() {
      let temp = []
      let { year, month, day } = this.current2
      let initMonthWeek = new Date(this.getMonthStartDate(year, month)).getDay() // 0表示为周日
      let endMonthWeek = new Date(this.getMonthEndDate(year, month)).getDay()
      let days = this.getMonthDays(year, month)
      if (initMonthWeek !== 0) {
        for (let i = initMonthWeek - 1; i >= 0; i--) {
          if (month == 1) {
            // 跨年补全
            temp.push({
              text: this.getMonthDays(year - 1, 12) - i,
              year: year - 1,
              month: 12
            })
          } else {
            temp.push({
              text: this.getMonthDays(year, month) - i,
              year: year,
              month: month - 1
            })
          }
        }
      }
      for (let i = 1; i <= days; i++) {
        temp.push({
          text: i,
          year: year,
          month: month
        })
      }
      if (endMonthWeek !== 6) {
        // 最后一天不是周六，需要补全
        for (let i = 1; i <= 6 - endMonthWeek; i++) {
          temp.push({
            text: i,
            year: month == 12 ? year + 1 : year,
            month: month == 12 ? 1 : month + 1
          })
        }
      }
      return temp
    },
    calcWeekNodes () {
      let temp = []
      let { year, month, day } = this.current2
      let initYearWeek = new Date(`${year}/01/01`).getDay() // 年第一天是周几
      if (initYearWeek === 0) {
        this.firstWeekStartDate = `${year}/01/01`
      } else {
        this.firstWeekStartDate = `${year - 1}/12/${31 - initYearWeek + 1}`
      }
      let monthStartNo = Math.floor(((new Date(this.getMonthStartDate(year, month)).getTime() - new Date(`${year}/01/01`).getTime())/1000/3600/24 + initYearWeek) / 7) + 1 //月第一天是第几周
      let monthEndNo = Math.ceil(((new Date(this.getMonthEndDate(year, month)).getTime() - new Date(`${year}/01/01`).getTime())/1000/3600/24 + initYearWeek) / 7) //月最后是第几周
      //
      for (let i = monthStartNo ; i <= monthEndNo; i++) {
        let range = this.getWeekRange(i)
        temp.push({
          text: `${year}年 第${i}周`,
          fsrqq: range.start,
          fsrqz: range.end
        })
      }
      return temp
    },
    // 获取季度的划分
    getDateRangeBySeason(val) {
      if (val === 1) {
        return [`${this.current2.year}-01-01`, `${this.current2.year}-03-31`]
      } else if (val === 2) {
        return [`${this.current2.year}-04-01`, `${this.current2.year}-06-30`]
      } else if (val === 3) {
        return [`${this.current2.year}-07-01`, `${this.current2.year}-09-30`]
      } else {
        return [`${this.current2.year}-10-01`, `${this.current2.year}-12-31`]
      }
    },
    // 获取月第一天日期
    getMonthStartDate(year, month) {
      return `${year}/${month}/1`
    },
    // 获取月最后一天日期
    getMonthEndDate(year, month) {
      return `${year}/${month}/${this.getMonthDays(year, month)}`
    },
    // 获取平年/闰年
    isLeapYear(year) {
      return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0 ? true : false
    },
    // 获取月份天数
    getMonthDays(year, month) {
      if (month == 2) {
        return this.isLeapYear(year) ? 29 : 28
      } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        return 30
      } else {
        return 31
      }
    },
    // 获取周的起止日期和截止日期
    getWeekRange(weeks) {
      let start = new Date(this.firstWeekStartDate).getTime() + (weeks - 1) * 7 * 24 * 3600 * 1000
      let end = start + 6 * 24 * 3600 * 1000
      start = new Date(start)
      end = new Date(end)
      return {
        start: [start.getFullYear(), start.getMonth() + 1, start.getDate()],
        end: [end.getFullYear(), end.getMonth() + 1, end.getDate()]
      }
    },
  }
}
</script>
<style>
.x6-date-tap{
  cursor: pointer;
}
.x6-date-tap:hover{
  color: #409eff !important;
}
</style>
<style scoped>
.x6-date-suggestion{
  position: absolute;
  width: 300px;
  height: auto;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 4px;
  color: #606266;
}
.x-date-suggestion_line{
  width: 100%;
  height: 1px;
  background: #f2f2f2;
}
.x6-date-suggestion_header{
  box-sizing: border-box;
  padding: 12px;
  justify-content: space-between;
}

.x6-suggestion-body{
  box-sizing: border-box;
  padding: 0 12px 12px 12px;
}
.x6-date-suggestion_week{
  justify-content: space-between;
  padding-bottom: 5px;
}
.x6-date-suggestion_week span{
  padding: 10px;
}
.x6-date-suggestion_nodes{
  justify-content: flex-start;
}
.x6-date-suggestion_nodes b{
  text-align: center;
  cursor: pointer;
}
.x6-date-suggestion_selected{
  color: #409eff;
}
.x6-date-suggestion_nodes b:hover{
  color: #409eff;
}
.node_year, .node_month{
  width: 25%;
  padding: 20px 0;
}
</style>
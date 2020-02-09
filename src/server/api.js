import { Http } from './http'
// 根据关键词搜索供应商
export function SearchSuper (data) {
  return Http({
    url: '/api/x6/getDmJgList.do',
    data
  })
}
// 获取热搜机构
export function GetHotSuperSearch(data) {
  return Http({
    url: '/api/x6/getHostSearchDmJgList.do',
    data
  })
}
// 获取所有缓存
export function GetAllCache(data) {
  return Http({
    url: '/api/x6/getAllCache.do',
    data
  })
}
// 获取范围内的公司
export function GetMyGsList(data) {
  return Http({
    url: '/api/x6/getXtGsList.do',
    data
  })
}
// 获取会员信息
export function GetHyList (data) {
  return Http({
    url: '/api/x6/getHyxxList.do',
    data
  })
}
// 获取热销、热搜商品
export function GetHotGoods (data) {
  return Http({
    url: '/api/x6/getHotDmSpxxList.do',
    data
  })
}
// 获取商品信息
export function GetGoods (data) {
  return Http({
    url: '/api/x6/getSpxxList.do',
    data
  })
}
// 获取品牌列表
export function GetBrandList (data) {
  return Http({
    url: '/api/x6/getSearchPpList.do',
    data
  })
}
// 获取型号列表
export function GetSpxxByBrand (data) {
  return Http({
    url: '/api/x6/getSpxxListByPp.do',
    data
  })
}
// 获取页面配置
export function GetPageSetting (data) {
  return Http({
    url: '/api/x6/getPageSetList.do',
    data
  })
}
// 保存页面配置
export function SavePageSetting (data) {
  return Http({
    url: '/api/x6/savePageSet.do',
    data
  })
}

/*************************设置模块************************ */
export function GetDmYgList (data) {
  return Http({
    url: '/api/x6/getDmYgPageList.do',
    data
  })
}
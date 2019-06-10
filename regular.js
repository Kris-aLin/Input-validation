
import { Toast } from 'vant'
const empty = /^\s*$/g // 空白
const mobile = /1\d{10}/ // 手机
const email = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/
const licenseNo = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/ // 车牌
const frameNo = /^[\dA-Z]{6,17}$/ // 车架号
// const licenseNoFrameNo = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$|^[\da-zA-Z]{6,17}$/
const engineNo = /^[\dA-Z*-/\s]{6,17}$/
const number = /^\d|[.]$/ // 数字校验
const identify = /^[\da-zA-Z]+$/
const zipCode = /^[1-9]\d{5}$/ // 邮政编码
const idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ // 身份证
const creditCode = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/ // 统一社会信用代码
const institutionCode = /^([0-9A-Z]){8}-[0-9|X]$/ // 组织机构代码
const any = /\S/ // 任何字符串
// const name = /^[a-z]{1,10}$/

//  [
//   required (Boolean||string)是否必传 可以为Boolean 也可以为字符串 当传“required”为真  必传Y
//   value  type(any)需要验证的值  必传Y
//   name type(string)你想要验证的类型 如：email 必传N 不传值时默认只需验证是否为null
//   tips type(string) 有CustomReg时 比传Y
//   ele  Y ref 上的$el
//   CustomReg type(/正则表达式/) 非必传N 当CustomReg c传值时 name 不用传值
// ]
class Regular {
  constructor (required, value, name, tips, eleName, CustomReg) {
    [this.required, this.value, this.name, this.tips, this.eleName, this.CustomReg] = [required, value, name, tips, eleName, CustomReg]
  }

  verify () { // 校验函数
    if (this.value === undefined) {
      Toast(this.tips + '不能为空')
      return this.eleName
    }
    if (this.CustomReg === undefined) {
      // console.log(empty.test(this.value), this.value, this.eleName)
      if (empty.test(this.value) || this.value === null) { // 是否为空
        if (this.required || this.required === 'required') { // 是否必传
          Toast(this.tips + '不能为空')

          return this.eleName
        }
      } else {
        if (this.name !== undefined) {
          if (this.name === 'licenseNo') {
            if (!licenseNo.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'frameNo') {
            if (!frameNo.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'engineNo') {
            if (!engineNo.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'identify') {
            if (!identify.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'number') {
            if (!number.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'zipCode') {
            if (!zipCode.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'email') {
            if (!email.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'mobile') {
            if (!mobile.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'idCard') {
            if (!idCard.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'licenseNoFrameNo') {
            if (!(licenseNo.test(this.value) || frameNo.test(this.value))) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'creditCode') {
            if (!creditCode.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'institutionCode') {
            if (!institutionCode.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          } else if (this.name === 'any') {
            if (!any.test(this.value)) {
              Toast(this.tips + '格式错误')
              return this.eleName
            }
          }
          // else {
          //   Toast('对不起找不到 ' + this.name + ' 格式类型')
          //   return this.eleName
          // }
        }
      }
    } else {
      if (this.tips === undefined) {
        Toast('自定义正则请传提示语')
        return this.eleName
      }
      if (empty.test(this.value) || this.value === null) { // 是否为空
        if (this.required || this.required === 'required') {
          Toast(this.tips + '不能为空')
          return this.eleName
        }
      } else if (this.CustomReg.test(this.value)) {
        Toast(this.tips + '格式错误')
        return this.eleName
      }
    }
  }

  // 是否通过
  isVerify (refsObj) { // regVerArr每一条数据 都可以通过refsObj取值到 否则不可以使用这个方法  返回 this.name 或 undefined
    var regVerArr = []
    for (const item in refsObj) {
      // console.log(item,"itemitemitemitemitemitem")
      if (refsObj[item] !== undefined) {
        try {
          regVerArr.push([
            refsObj[item].required,
            refsObj[item].value,
            refsObj[item].$attrs.name,
            refsObj[item].label,
            item
          ])
        } catch (error) {
          for (let index = 0; index < refsObj[item].length; index++) {
            // console.log(refsObj[item][index].name,"refsObj[item][index].value")
            regVerArr.push([
              refsObj[item][index].required,
              refsObj[item][index].value,
              refsObj[item][index].name,
              refsObj[item][index].label,
              item
            ])
          }
        }
      }
    }
    var verifyReturn
    // console.log(regVerArr, 'regVerArr')
    for (const iterator of regVerArr) {
      // console.log(iterator, 'iteratoriterator')
      verifyReturn = new Regular(...iterator).verify()
      if (verifyReturn !== undefined) {
        // console.log('执行完了')
        return verifyReturn
      }
    }
  }
}
export default Regular

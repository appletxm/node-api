import axios from 'axios'
import apiUrls from 'common/apiUrls'
import messager from 'common/messager'

let downloadAxios

export default {
  createDownloadAxios() {
    if (!downloadAxios) {
      downloadAxios = axios.create({})
      this.downloadAxiosInterceptors(downloadAxios)
    }
  },

  doDownload(params, apiUrl) {
    messager.showLoading()

    downloadAxios.get(apiUrls.exportOrder, {params}).then((res) => {
      messager.closeLoading()
    }).catch((err) => {
      messager.closeLoading()
      messager.showMsg('error', err.detailMessage || err.message)
    })
  },

  downloadPost(config) {
    const url = config.url
    const data = JSON.parse(config.data)
    const form = document.createElement('form')
    // const button = document.createElement('input')

    form.action = url
    form.method = 'post'
    form.style.display = 'none'

    Object.keys(data).forEach(key => {
      const input = document.createElement('input')
      input.name = key
      input.value = data[key]
      form.appendChild(input)
    })

    // button.type = 'submit'
    // form.appendChild(button)
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  },

  downloadGet(config) {
    let res
    let url
    const params = []
    let iframe

    // for (const item in config.params) {
    //   params.push(`${item}=${(config.params[item]) || ''}`)
    // }
    url = params.length ? `${config.url}?${params.join('&')}` : `${config.url}`
    iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      try {
        res = iframe.contentDocument.querySelector('body').innerHTML.match(/\{.+\}/)[0]
        res = JSON.parse(res)
        if (res) {
          messager.showMsg('error', res.message || res.detailMessage)
        }
      } catch (err) {
        console.error(err)
      }
      document.body.removeChild(iframe)
    }

    document.body.appendChild(iframe)
  },

  downloadAxiosInterceptors(downloadAxios) {
    downloadAxios.interceptors.response.use(res => {
      if (res.headers && res.headers['content-type'].indexOf('application/octet-stream') >= 0) {
        const config = res.config
        if (config.method === 'post') {
          this.downloadPost(config)
        } else if (config.method === 'get') {
          this.downloadGet(config)
        }
      }
    }, error => {
      return Promise.reject(error.response.data || error.message)
    })
  },

  iframeDownload(params, apiUrl) {
    let config = {}
    config.url = apiUrl
    config.params = params
    this.downloadGet(config)
  },

  async downloadBlob(params, apiUrl) {
    let instance = axios.create({})
    // let data = ''
    let res
    let resBlob
    let resData
    let a
    let url
    let fileName
    // Object.keys(params).forEach((key, index) => {
    //   if(index !== 0){
    //     data += '&'
    //   }
    //   data += (key + '=' + (params[key] ||  ''))
    // })

    // res = await instance({
    //   method: 'post',
    //   url: apiUrl,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   data: data,
    //   responseType: 'blob'
    // })

    res = await instance({
      method: 'post',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: JSON.stringify(params),
      responseType: 'blob'
    })

    resBlob = res.data
    // resData = null
    // try {
    //   let resText = await new Promise((resolve, reject) => {
    //     let reader = new FileReader()
    //     reader.addEventListener('abort', reject)
    //     reader.addEventListener('error', reject)
    //     reader.addEventListener('loadend', () => {
    //       resolve(reader.result)
    //     })
    //     reader.readAsText(resBlob)
    //   })
    //   resData = JSON.parse(resText)
    // } catch (err) {
    //   console.error(err)
    // }
    a = document.createElement('a')
    url = window.URL.createObjectURL(resBlob)
    fileName = decodeURIComponent(res['headers']['content-disposition'].match(/filename=(.+)/)[1])
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)

    return { res, resData, resBlob }
  }
}

<template>
  <img :src="data.imgSrc">
  <button @click="doDownload">下载图片</button>
  <button @click="doDownloads">打包下载多个</button>
</template>
<script setup>
import jrQrcode from 'jr-qrcode'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { reactive } from 'vue'

const data = reactive({
  imgSrc: '',
  imageArr: []
})

var imgBase64 = jrQrcode.getQrBase64('hello world')
data.imgSrc = imgBase64

for (let i = 0; i < 5; i++) {
  let img = jrQrcode.getQrBase64('hello girl' + i)
  data.imageArr.push(img)
}


const doDownload = () => {
  let a = document.createElement('a')
  a.href = data.imgSrc
  a.download = '图片.png'
  a.click()
}

const doDownloads = () => {
  let zip = new JSZip()
  data.imageArr.forEach((item, index) => {
    let blobData = base64ToBlob(item)
    zip.file(`girl${index}.png`, blobData, { base64: true })
  })
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    // see FileSaver.js
    saveAs(content, '图片.zip')
  })
}

const base64ToBlob = (dataurl) => {
  var arr = dataurl.split(',')
  //注意base64的最后面中括号和引号是不转译的
  var _arr = arr[1].substring(0, arr[1].length - 2)
  var mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(_arr),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}
</script>
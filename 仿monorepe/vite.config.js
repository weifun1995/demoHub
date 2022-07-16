import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

export default defineConfig(({mode}) => {
  
  let name = ''
  if (mode === 'development') { // npm run dev viteapp1
    name =  process.argv[3]
  } else if (mode === 'production') { // npm run build viteapp1
    name =  process.argv[4]
  }

  // 判断是否给点子项目名称
  if (!name) {
    console.log('请指定项目名称!!!')
    process.exit(0)
  }

  let root = process.cwd()
  let inputDir = `${root}/packages/${name}`
  let outputDir = `${root}/output/${name}`

   // 判断文件夹是否存在
  fs.exists(inputDir, (flag) => {
    if (!flag) {
      console.log('指定项目不存在!!!')
      process.exit(0)
    }
  })

  return {
    root: inputDir,
    build: {
      outDir: outputDir
    },
    plugins: [vue()]
  }
})

/* eslint-disable @typescript-eslint/no-var-requires */
const compressing = require('compressing')
const fs = require('fs')

const project = 'bjfawh5'

console.log('project', project)

await compressing.zip.compressDir(`dist/${project}`, `${project}.zip`)

const platId = '303191694492971008'

// login
const loginRes = await fetch('http://fawivi-prod-k8-gateweb.faw.cn/rbac/auth/login', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify({
    platId: platId,
    userAccount: 'fangmingdong',
    userPassword: 'uevV0K+KbuTl8lmi5Gx5u7UaquqCjOa9AiRB62YXrSS6FH/HgaKGfGenMPJy6iJNnb1kJ/XA4IYp9KnEUsLnYQ==',
  }),
})
const loginResJSON = await loginRes.json()
console.log(loginResJSON)

if (loginResJSON.statusCode !== '0') {
  throw new Error('login error')
}

// call menu
const menuUrl = 'http://fawivi-prod-k8-gateweb.faw.cn/rbac/resource/menu?applyType=0'

const menuRes = await fetch(menuUrl, {
  method: 'GET',
  headers: {
    token: loginResJSON.data.token,
    Authorization: loginResJSON.data.token,
    platid: platId,
  },
})

const menuResJSON = await menuRes.json()
console.log('menuRes')

const token = loginResJSON.data.token

// 上传文件到
const url = 'http://fawivi-prod-k8-gateweb.faw.cn/api/file/uploadByFilePath'
const filePath = `${project}.zip`
const fileName = `${project}.zip`
const fileBuffer = fs.readFileSync(filePath)
const fileBlob = new Blob([fileBuffer], { type: 'application/zip' })
const formData = new FormData()
formData.append('file', fileBlob, fileName)
formData.append('filePath', 'web_static')
formData.append('overwrite', 'true')

const uploadRes = await fetch(url, {
  method: 'POST',
  headers: {
    token: token,
    Authorization: token,
    platid: platId,
  },
  body: formData,
})

const uploadResJSON = await uploadRes.json()

if (uploadResJSON.statusCode !== '0') {
  throw new Error(`upload error, ${JSON.stringify(uploadResJSON)}`)
}

console.log(uploadResJSON)

// copyToCDN
const copyToCDNRes = await fetch(
  `http://fawivi-prod-k8-gateweb.faw.cn/manager/file-service/copyToCDN?sourceFilePath=${uploadResJSON.data.relativePath}&overwrite=true`,
  {
    method: 'GET',
    headers: {
      token: token,
      Authorization: token,
      platid: platId,
    },
  }
)

const copyToCDNResJSON = await copyToCDNRes.json()

if (copyToCDNResJSON.statusCode !== '0') {
  throw new Error(`copyToCDNResJSON error, ${JSON.stringify(copyToCDNResJSON)}`)
}

console.log('copyToCDNResJSON', copyToCDNResJSON)

// 等 5s
await new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, 5000)
})

// xxx
const unzipRes = await fetch(
  `http://fawivi-prod-k8-gateweb.faw.cn/api/manual/shell/unzip?source=/data${copyToCDNResJSON.data.targetPath}&target=/data/download/file-service/web_static`,
  {
    method: 'GET',
    headers: {
      token: token,
      Authorization: token,
      platid: platId,
    },
  }
)

console.log('unzipRes')

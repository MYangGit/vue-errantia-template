# ConnectBase
用于插件app和vscode通信的api，提供Post函数

## 支持的指令

* 代码执行 `excute`
```
let message = await post({
  key: key, // 自定义key，表示此代码执行的任务
  command: 'excute', // 
  code: code, // julia执行代码
  filePath: getFilePath(), // 临时存储文件路径
})
console.log(message.data.value)
```

* 导入文件(读取文件) `importTextFile`, 返回文本内容
```
let message = await post({
  key: 'importTextFile',
  command: 'importTextFile',
  filePath: getFilePath()
})
console.log(message.data.value)
```

* 获取临时存储文件路径 `getFilePath`, 返回临时存储文件路径
```
let message = await post({
  key: 'filePath',
  command: 'getFilePath'
})
console.log(message.data.value)
```

* 获取工作区变量列表 `getWorkspaceVariables`
```
let message = await post({
  key: 'checkVar',
  command: 'getWorkspaceVariables',
  filePath: getFilePath(),
})
console.log(message.data.value)
```


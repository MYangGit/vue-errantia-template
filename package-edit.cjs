const fs = require('fs');
const { appConfig } = require('./errantia.cjs');

// 读取 package.json 文件
fs.readFile('package.json', 'utf8', (err, data) => {
  console.log('🚀 开始更新package.json文件...');
  console.log(appConfig);   // 输出: appConfig 对象
  if (err) {
    console.error('读取package.json失败:请手动更改', err);
    return;
  }

  // 解析 JSON 数据
  const packageJson = JSON.parse(data);

  // 修改 package.json 中的字段
  packageJson.name = appConfig.appName;
  packageJson.displayName = appConfig.appName;
  packageJson.description = appConfig.description;
  packageJson.version = appConfig.version;
  packageJson.icon = appConfig.icon;
  packageJson.activationEvents = [
    `onCommand:${appConfig.startCommand}`
  ];
  packageJson.contributes.commands = [
    {
      "command": appConfig.startCommand,
      "title": appConfig.startTitle,
    }
  ];

  // 将修改后的 JSON 数据转换回字符串
  const updatedPackageJson = JSON.stringify(packageJson, null, 2);

  // 写入更新后的 package.json 文件
  fs.writeFile('package.json', updatedPackageJson, 'utf8', (err) => {
    if (err) {
      console.error('更新package.json失败:请收动更改', err);
      return;
    }
    console.log('✅ package.json 文件更新成功.');
  });
});
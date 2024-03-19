const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { appConfig }  = require('./errantia.cjs');

function getWebViewContent(context, templatePath, urlPath) {
  const resourcePath = path.join(context.extensionPath, templatePath)
  // const dirPath = path.dirname(resourcePath)
  let html = fs.readFileSync(resourcePath, 'utf-8');
  console.log('html', resourcePath)
  // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
  let port = 46894 // 从用户地址栏获取syslabPort
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src="|url\(")(.+?)"/g, (m, $1, $2) => {
    return $1 + (urlPath || '') + '/vscode-remote-resource?path=' + context.extensionPath + '/dist' + $2 + '"'
    // return $1 + (urlPath || '') + `/cn-north-4/syslabonline//stable/${port}/vscode-remote-resource?path=` + context.extensionPath + '/dist' + $2 + '"'
  })
  return html
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let startAppCommand = appConfig.startCommand ?? 'test-org.startTestApp';
  let disposable = vscode.commands.registerCommand(startAppCommand, function (urlPath) {
    vscode.commands.executeCommand('start app', {
      id: 'test-app',
      title: appConfig.appTitle ?? 'TestApp',
      titleEn: appConfig.appTitleEn ?? 'TestApp',
      html: getWebViewContent(context, './dist/index.html', urlPath),
      filePath: process.env.USER_DATA_DIR || '/home/tongyuan/SyslabCloud/code-server',
      width: appConfig.appWidth ?? 1080,
      height: appConfig.appHeight ?? 750,
      maxWidth: 1080
    });
	});
  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

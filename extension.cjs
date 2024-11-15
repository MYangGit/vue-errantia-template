const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { appConfig }  = require('./errantia.cjs');

const getQueryVariable = (variable, location) => {
  const query = location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) { return pair[1]; }
  }
  return (false);
};

async function getWebViewContent(context, templatePath, urlPath) {
  let location = await vscode.commands.executeCommand('Syslab.getWindowLocationInfo')
  const syslabPort = getQueryVariable('syslabPort', location);
	const syslabIp = getQueryVariable('syslabIp', location);
  let pathtemp = '';
  if (syslabPort && syslabIp) {
    pathtemp = `/stable/${syslabPort}/${syslabIp}`;
  } else if (syslabPort && !syslabIp) {
    pathtemp = `/stable/${syslabPort}`;
  }
  pathtemp = location.pathname + pathtemp;
	pathtemp = pathtemp === '/' ? '' : pathtemp;
  if (location && location.href) {
    urlPath = pathtemp
  }
  const resourcePath = path.join(context.extensionPath, templatePath)
  let html = fs.readFileSync(resourcePath, 'utf-8');
  html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src="|url\(")(.+?)"/g, (m, $1, $2) => {
    let pre = $1 + (urlPath || '')
    if(pre[pre.length - 1] !== '/') pre += '/'
    return  pre + 'vscode-remote-resource?path=' + context.extensionPath + '/dist' + $2 + '"'
  })
  return html
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let startAppCommand = appConfig.startCommand ?? 'test-org.startTestApp';
  let disposable = vscode.commands.registerCommand(startAppCommand, async function (urlPath, initData) {
    vscode.commands.executeCommand('start app', {
      id: 'test-app',
      title: appConfig.appTitle ?? 'TestApp',
      titleEn: appConfig.appTitleEn ?? 'TestApp',
      html: await getWebViewContent(context, './dist/index.html', urlPath),
      filePath: process.env.TONGYUAN_PATH || '/home/tongyuan/SyslabCloud/code-server',
      width: appConfig.appWidth ?? 1080,
      height: appConfig.appHeight ?? 750,
      appType: appConfig.appType ?? 'julia',
      initData
    });
	});
  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

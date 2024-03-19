import { post } from '../request/connectBase'
import { ref } from 'vue'

// syslab读取临时文件路径
const appFilePath = ref('')
export const useConnectSyslabCenter = () => {
  
  // 初始化临时文件路径
  const initFilePath = async () => {
    let message = await post({
      key: 'filePath',
      command: 'getFilePath'
    })
    appFilePath.value = message.data?.value ?? ''
    return message.data ?? ''
  }

  return {
    initFilePath,
  }
}
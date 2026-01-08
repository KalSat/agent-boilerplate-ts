// typescript
import dotenv from 'dotenv'

dotenv.config({ path: '.env', encoding: 'utf8' })

export class Settings {
  public readonly siliconFlowApiKey: string
  public readonly qwen25Instruct: string
  public readonly baseUrl: string

  constructor() {
    this.siliconFlowApiKey = process.env['SILICONFLOW_API_KEY'] ?? ''
    this.qwen25Instruct = process.env['QWEN2_5_7B_INSTRUCT'] ?? ''
    this.baseUrl = process.env['BASE_URL'] ?? 'https://api.siliconflow.cn/v1'
  }
}

export const settings = new Settings()

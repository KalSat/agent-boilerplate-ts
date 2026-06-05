// typescript
import dotenv from 'dotenv'

dotenv.config({ path: '.env', encoding: 'utf8' })

export class Settings {
  public readonly baseUrl: string
  public readonly apiKey: string
  public readonly model: string
  public readonly smallFastModel: string

  constructor() {
    this.baseUrl = process.env['BASE_URL'] ?? 'https://api.siliconflow.cn/v1'
    this.apiKey = process.env['API_KEY'] ?? ''
    this.model = process.env['MODEL'] ?? ''
    this.smallFastModel = process.env['SMALL_FAST_MODEL'] ?? ''
  }
}

export const settings = new Settings()

export interface EmailProviderConfig {
  apiKey: string
  [key: string]: any // For provider-specific settings
}

export interface SendEmailParams {
  to: string | string[]
  from: string
  subject: string
  html: string
  text?: string
  cc?: string | string[]
  bcc?: string | string[]
  attachments?: Array<{
    content: string
    filename: string
    type?: string
    disposition?: string
  }>
  [key: string]: any // For provider-specific options
}

export interface EmailProvider {
  name: string
  description: string
  configFields: Array<{
    name: string
    label: string
    type: "text" | "password" | "select"
    required: boolean
    options?: Array<{ label: string; value: string }>
  }>

  initialize(config: EmailProviderConfig): void
  sendEmail(params: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }>
  validateTemplate?(html: string): Promise<{ valid: boolean; errors?: string[] }>
}

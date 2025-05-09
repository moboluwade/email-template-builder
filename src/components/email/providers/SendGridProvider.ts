import type { EmailProvider, EmailProviderConfig, SendEmailParams } from "./EmailProvider"

export class SendGridProvider implements EmailProvider {
  name = "SendGrid"
  description = "Send emails using SendGrid API"
  private apiKey = ""

  configFields = [
    {
      name: "apiKey",
      label: "API Key",
      type: "password" as const,
      required: true,
    },
    {
      name: "fromEmail",
      label: "Default From Email",
      type: "text" as const,
      required: true,
    },
  ]

  initialize(config: EmailProviderConfig): void {
    this.apiKey = config.apiKey
  }

  async sendEmail(params: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // In a real implementation, you would use the SendGrid SDK
      // import sgMail from '@sendgrid/mail';
      // sgMail.setApiKey(this.apiKey);
      // const response = await sgMail.send({...});

      // This is a mock implementation
      console.log("Sending email via SendGrid:", {
        apiKey: this.apiKey.substring(0, 3) + "...",
        ...params,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        success: true,
        messageId: `sendgrid_${Date.now()}`,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async validateTemplate(html: string): Promise<{ valid: boolean; errors?: string[] }> {
    // SendGrid has specific requirements for email templates
    // This is a simplified validation
    const errors: string[] = []

    if (html.includes("<script>")) {
      errors.push("SendGrid does not allow <script> tags in emails")
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    }
  }
}

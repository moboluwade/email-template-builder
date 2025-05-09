import type { EmailProviderConfig, SendEmailParams } from "./providers/EmailProvider"
import { emailProviderRegistry } from "./EmailProviderRegistry"

class EmailService {
  private currentProviderId: string | null = null
  private providerConfig: EmailProviderConfig | null = null

  setProvider(providerId: string, config: EmailProviderConfig): void {
    const provider = emailProviderRegistry.getProvider(providerId)
    if (!provider) {
      throw new Error(`Email provider '${providerId}' not found`)
    }

    provider.initialize(config)
    this.currentProviderId = providerId
    this.providerConfig = config

    // Save to localStorage for persistence
    localStorage.setItem(
      "emailProvider",
      JSON.stringify({
        id: providerId,
        config,
      }),
    )
  }

  getCurrentProvider(): { id: string; config: EmailProviderConfig } | null {
    if (!this.currentProviderId || !this.providerConfig) {
      // Try to load from localStorage
      const savedProvider = localStorage.getItem("emailProvider")
      if (savedProvider) {
        try {
          const { id, config } = JSON.parse(savedProvider)
          this.setProvider(id, config)
        } catch (e) {
          return null
        }
      } else {
        return null
      }
    }

    return {
      id: this.currentProviderId ?? '',
      config: this.providerConfig ?? {} as EmailProviderConfig,
    }
  }

  async sendEmail(params: SendEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const currentProvider = this.getCurrentProvider()
    if (!currentProvider) {
      return {
        success: false,
        error: "No email provider configured",
      }
    }

    const provider = emailProviderRegistry.getProvider(currentProvider.id)
    if (!provider) {
      return {
        success: false,
        error: `Provider '${currentProvider.id}' not found`,
      }
    }

    return provider.sendEmail(params)
  }

  async validateTemplate(html: string): Promise<{ valid: boolean; errors?: string[]; warnings?: string[] }> {
    const currentProvider = this.getCurrentProvider()
    if (!currentProvider) {
      return { valid: true } // No provider to validate against
    }

    const provider = emailProviderRegistry.getProvider(currentProvider.id)
    if (!provider || !provider.validateTemplate) {
      return { valid: true } // Provider doesn't support validation
    }

    return provider.validateTemplate(html)
  }
}

// Create a singleton instance
export const emailService = new EmailService()

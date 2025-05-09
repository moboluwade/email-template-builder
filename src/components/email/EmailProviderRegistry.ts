import type { EmailProvider } from "./providers/EmailProvider";
import { SendGridProvider } from "./providers/SendGridProvider";
import { MailgunProvider } from "./providers/MailGunProvider";
import { PostmarkProvider } from "./providers/PostMarkProvider";

class EmailProviderRegistry {
  private providers: Map<string, EmailProvider> = new Map();

  constructor() {
    // Register default providers
    this.registerProvider("sendgrid", new SendGridProvider());
    this.registerProvider("mailgun", new MailgunProvider());
    this.registerProvider("postmark", new PostmarkProvider());
  }

  registerProvider(id: string, provider: EmailProvider): void {
    this.providers.set(id, provider);
  }

  getProvider(id: string): EmailProvider | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): Array<{ id: string; provider: EmailProvider }> {
    return Array.from(this.providers.entries()).map(([id, provider]) => ({
      id,
      provider,
    }));
  }
}

// Create a singleton instance
export const emailProviderRegistry = new EmailProviderRegistry();

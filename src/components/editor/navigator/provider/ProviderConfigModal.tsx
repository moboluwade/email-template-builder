"use client"

import { useState, useEffect } from "react"
import { emailProviderRegistry } from "@/components/email/EmailProviderRegistry"
import { emailService } from "@/components/email/EmailService"
import type { EmailProviderConfig } from "@/components/email/providers/EmailProvider"
import { X } from "lucide-react"

interface ProviderConfigModalProps {
  providerId: string
  onClose: () => void
}

export default function ProviderConfigModal({ providerId, onClose }: ProviderConfigModalProps) {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [configFields, setConfigFields] = useState<Array<any>>([])
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    const provider = emailProviderRegistry.getProvider(providerId)
    if (provider) {
      setProvider(provider)
      setConfigFields(provider.configFields)

      // Check if we have existing config
      const currentProvider = emailService.getCurrentProvider()
      if (currentProvider && currentProvider.id === providerId) {
        setConfig(currentProvider.config)
      } else {
        // Initialize config with empty values
        const newConfig: Record<string, string> = {}
        provider.configFields.forEach((field) => {
          newConfig[field.name] = ""
        })
        setConfig(newConfig)
      }
    }
  }, [providerId])

  const handleConfigChange = (name: string, value: string) => {
    setConfig((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setMessage(null)

      // Validate required fields
      if (!provider) {
        throw new Error("Provider not found")
      }

      const missingFields = provider.configFields
        .filter((field: any) => field.required && !config[field.name])
        .map((field: any) => field.label)

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
      }

      // Save provider configuration
      emailService.setProvider(providerId, config as EmailProviderConfig)

      setMessage({ type: "success", text: "Email provider configured successfully!" })

      // Close modal after a short delay
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!provider) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-black">Configure {provider.name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-4 text-sm text-gray-600">{provider.description}</p>

          <div className="mb-6 space-y-4">
            {configFields.map((field) => (
              <div key={field.name}>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    value={config[field.name] || ""}
                    onChange={(e) => handleConfigChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={config[field.name] || ""}
                    onChange={(e) => handleConfigChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#81228B] rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Configuration"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

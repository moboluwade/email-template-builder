"use client"

import { useState } from "react"
import { useTemplateStore } from "@/stores/useTemplateStore"
import { emailService } from "@/components/email/EmailService"
import { X } from "lucide-react"

interface SendTestEmailModalProps {
  onClose: () => void
}

export default function SendTestEmailModal({ onClose }: SendTestEmailModalProps) {
  const { getHtmlOutput } = useTemplateStore()
  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [subject, setSubject] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSend = async () => {
    try {
      setIsSending(true)
      setResult(null)

      // Validate inputs
      if (!to || !from || !subject) {
        throw new Error("Please fill in all required fields")
      }

      // Get HTML from template
      const html = getHtmlOutput()

      // Validate template with provider
      const validation = await emailService.validateTemplate(html)
      if (!validation.valid && validation.errors) {
        throw new Error(`Template validation failed: ${validation.errors.join(", ")}`)
      }

      // Send email
      const response = await emailService.sendEmail({
        to,
        from,
        subject,
        html,
      })

      if (!response.success) {
        throw new Error(response.error || "Failed to send email")
      }

      setResult({
        success: true,
        message: `Email sent successfully! Message ID: ${response.messageId}`,
      })

      // Close modal after success (with delay)
      if (response.success) {
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Send Test Email</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="recipient@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="sender@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Email subject"
              />
            </div>
          </div>

          {result && (
            <div
              className={`mb-4 p-3 rounded-md ${
                result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {result.message}
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
              onClick={handleSend}
              disabled={isSending}
              className="px-4 py-2 text-sm font-medium text-white bg-[#81228B] rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Test Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

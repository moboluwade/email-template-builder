import { Mail, Plug } from "lucide-react";
import { Tooltip } from "../Tooltip";
import { DropdownMenu } from "@/components/reuseable/DropdownMenu";
import { useState } from "react";
import ProviderConfigModal from "./ProviderConfigModal";
import { emailService } from "@/components/email/EmailService";
import SendTestEmailModal from "../SendTestEmailModal";

const ConnectProviderButton = () => {
  const [configModalProvider, setConfigModalProvider] = useState<string | null>(
    null
  );
  const [showSendTestModal, setShowSendTestModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);

  const pluginItems = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "SendGrid",
      onClick: () => handleConnectProvider("SendGrid"),
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Mailgun",
      onClick: () => handleConnectProvider("Mailgun"),
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Postmark",
      onClick: () => handleConnectProvider("Postmark"),
    },
  ];
  const handleConnectProvider = (provider: string) => {
    // Open the configuration modal for the selected provider
    setConfigModalProvider(provider.toLowerCase());
  };

  return (
    <>
      <Tooltip content="Connect Provider">
        <DropdownMenu
          trigger={
            <button className="p-2 text-white transition-colors bg-[#81228B] rounded-md hover:bg-opacity-90">
              <Plug size={18} />
            </button>
          }
          items={pluginItems}
        />
      </Tooltip>

      {/* Provider Configuration Modal */}
      {configModalProvider && (
        <ProviderConfigModal
          providerId={configModalProvider}
          onClose={() => {
            setConfigModalProvider(null);
            // Update current provider status
            const provider = emailService.getCurrentProvider();
            if (provider) {
              setCurrentProvider(provider.id);
            }
          }}
        />
      )}

      {/* Send Test Email Modal */}
      {showSendTestModal && (
        <SendTestEmailModal onClose={() => setShowSendTestModal(false)} />
      )}
    </>
  );
};

export default ConnectProviderButton;

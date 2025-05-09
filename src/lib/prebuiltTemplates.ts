import type { BlockType, Block } from "@/stores/useTemplateStore";

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  category: "transactional" | "marketing" | "notification";
  thumbnail: string;
  blocks: Omit<Block, "id" | "position">[];
}

// Helper function to create template blocks without IDs (will be assigned when loaded)
const createTemplateBlock = (
  type: BlockType,
  content: Record<string, any>,
  styles: Record<string, any> = {}
): Omit<Block, "id" | "position"> => ({
  type,
  content,
  styles,
});

const transactionalReceipt: EmailTemplate = {
  id: "transaction-receipt",
  name: "Transaction Receipt",
  description: "Detailed receipt for completed transactions",
  category: "transactional",
  thumbnail: "/templates/transaction-receipt.png",
  blocks: [
    // Header with logo
    createTemplateBlock(
      "image",
      {
        src: "https://via.placeholder.com/200x60?text=YourLogo",
        alt: "Company Logo",
        width: "200px",
        align: "center",
      },
      { marginBottom: "20px" }
    ),

    // Receipt header
    createTemplateBlock(
      "header",
      {
        text: "Payment Receipt",
        level: "h1",
        align: "center",
      },
      {
        color: "#2D3748",
        fontFamily: "Arial, sans-serif",
        marginBottom: "10px",
      }
    ),

    // Receipt ID and date
    createTemplateBlock(
      "paragraph",
      {
        text: "Receipt #INV-2023-1234 | May 9, 2023",
        align: "center",
      },
      {
        color: "#718096",
        fontSize: "14px",
        marginBottom: "30px",
      }
    ),

    // Thank you message
    createTemplateBlock(
      "paragraph",
      {
        text: "Thank you for your payment. This is a receipt for your recent transaction.",
        align: "left",
      },
      {
        color: "#4A5568",
        marginBottom: "25px",
      }
    ),

    // Payment details header
    createTemplateBlock(
      "header",
      {
        text: "Payment Details",
        level: "h2",
        align: "left",
      },
      {
        color: "#2D3748",
        marginBottom: "15px",
        fontSize: "18px",
      }
    ),

    // Payment details table
    createTemplateBlock(
      "table",
      {
        rows: 5,
        cols: 2,
        data: [
          ["Date", "May 9, 2023"],
          ["Payment Method", "Visa ending in 4242"],
          ["Transaction ID", "txn_1JKL2m3N4O5P6Q7R8S9T"],
          ["Billing Period", "May 1 - May 31, 2023"],
          ["Account", "user@example.com"],
        ],
      },
      {
        borderCollapse: "collapse",
        width: "100%",
        cellPadding: "10px",
        borderColor: "#E2E8F0",
        color: "#000000",
        marginBottom: "30px",
      }
    ),

    // Order summary header
    createTemplateBlock(
      "header",
      {
        text: "Order Summary",
        level: "h2",
        align: "left",
      },
      {
        color: "#2D3748",
        marginBottom: "15px",
        fontSize: "18px",
      }
    ),

    // Order items table
    createTemplateBlock(
      "table",
      {
        rows: 4,
        cols: 3,
        data: [
          ["Item", "Quantity", "Amount"],
          ["Premium Plan Subscription", "1", "$49.99"],
          ["Add-on Service", "2", "$19.98"],
          ["Total", "", "$69.97"],
        ],
      },
      {
        borderCollapse: "collapse",
        width: "100%",
        cellPadding: "10px",
        borderColor: "#E2E8F0",
        color: "#000000",
        marginBottom: "30px",
        lastRowBold: true,
      }
    ),

    // View account button
    createTemplateBlock(
      "button",
      {
        text: "View Account Details",
        url: "#",
        backgroundColor: "#4F46E5",
        textColor: "#FFFFFF",
        align: "center",
      },
      {
        padding: "12px 24px",
        borderRadius: "6px",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: "30px",
      }
    ),

    // Divider
    createTemplateBlock(
      "divider",
      { style: "solid", thickness: 1 },
      { color: "#E2E8F0", margin: "30px 0" }
    ),

    // Support message
    createTemplateBlock(
      "paragraph",
      {
        text: "If you have any questions about this receipt, simply reply to this email or contact our customer support at support@example.com",
        align: "center",
      },
      {
        color: "#718096",
        fontSize: "14px",
        marginBottom: "20px",
      }
    ),

    // Footer
    createTemplateBlock(
      "paragraph",
      {
        text: "© 2023 Your Company Inc. All rights reserved.",
        align: "center",
      },
      {
        color: "#A0AEC0",
        fontSize: "12px",
        marginTop: "20px",
      }
    ),
  ],
};

const transactionNotification: EmailTemplate = {
  id: "transaction-notification",
  name: "Transaction Notification",
  description: "Alert users about new transactions",
  category: "notification",
  thumbnail: "/templates/transaction-notification.png",
  blocks: [
    // Header with colored background
    createTemplateBlock(
      "header",
      {
        text: "Transaction Alert",
        level: "h1",
        align: "center",
      },
      {
        backgroundColor: "#3182CE",
        color: "#FFFFFF",
        padding: "25px 15px",
        borderRadius: "8px 8px 0 0",
        margin: "0",
        fontFamily: "Arial, sans-serif",
      }
    ),

    // Main content container
    createTemplateBlock(
      "spacer",
      { height: 20 },
      { backgroundColor: "#F7FAFC", padding: "0 20px" }
    ),

    // Alert icon
    createTemplateBlock(
      "image",
      {
        src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.XBsM-N--X1D7FN66yPagPAHaCv%26cb%3Diwp1%26pid%3DApi&f=1&ipt=9777d31fa6b597c371ce9e098b69d4d77732eb2c7aaf723fd90c20261925a362&ipo=images",
        alt: "Alert Icon",
        align: "center",
      },
      {
        width: "",
        margin: "10px auto 20px auto",
      }
    ),

    // Notification message
    createTemplateBlock(
      "header",
      {
        text: "New Transaction Detected",
        level: "h2",
        align: "center",
      },
      {
        color: "#2D3748",
        marginBottom: "15px",
        fontFamily: "Arial, sans-serif",
      }
    ),

    // Transaction amount
    createTemplateBlock(
      "header",
      {
        text: "$245.00",
        level: "h2",
        align: "center",
      },
      {
        color: "#3182CE",
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "20px",
        fontFamily: "Arial, sans-serif",
      }
    ),

    // Transaction details
    createTemplateBlock(
      "paragraph",
      {
        text: "A transaction was processed on your account on May 9, 2023 at 2:45 PM.",
        align: "center",
      },
      {
        color: "#4A5568",
        marginBottom: "25px",
        lineHeight: "1.5",
      }
    ),

    // Transaction details table
    createTemplateBlock(
      "table",
      {
        rows: 5,
        cols: 2,
        data: [
          ["Merchant", "Example Store"],
          ["Card", "Visa ending in 4242"],
          ["Transaction ID", "txn_1A2B3C4D5E"],
          ["Date & Time", "May 9, 2023 at 2:45 PM"],
          ["Status", "Completed"],
        ],
      },
      {
        borderCollapse: "collapse",
        width: "100%",
        cellPadding: "12px",
        borderColor: "#E2E8F0",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        marginBottom: "25px",
      }
    ),

    // Action buttons
    createTemplateBlock(
      "button",
      {
        text: "View Transaction Details",
        url: "#",
        align: "center",
      },
      {
        padding: "12px 20px",
        borderRadius: "6px",
        backgroundColor: "#3182CE",
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: "15px",
        width: "100%",
      }
    ),

    createTemplateBlock(
      "button",
      {
        text: "Report Suspicious Activity",
        url: "#",
        align: "center",
      },
      {
        padding: "12px 20px",
        borderRadius: "6px",
        backgroundColor: "#FFFFFF",
        color: "#E53E3E",
        fontWeight: "bold",
        marginBottom: "30px",
        border: "1px solid #E53E3E",
        width: "100%",
      }
    ),

    // Security note
    createTemplateBlock(
      "paragraph",
      {
        text: "For security reasons, we recommend verifying this transaction. If you did not make this purchase, please contact our support team immediately.",
        align: "left",
        color: "#718096",
      },
      {
        backgroundColor: "#FFF5F5",
        padding: "15px",
        borderRadius: "6px",
        borderLeft: "4px solid #FC8181",
        fontSize: "14px",
        marginBottom: "30px",
      }
    ),

    // Divider
    createTemplateBlock(
      "divider",
      { style: "solid", thickness: 1 },
      {
        color: "#E2E8F0",
        margin: "20px 0",
      }
    ),

    // Footer
    createTemplateBlock(
      "paragraph",
      {
        text: "This is an automated message. Please do not reply directly to this email.",
        align: "center",
      },
      {
        color: "#A0AEC0",
        fontSize: "12px",
        marginBottom: "10px",
      }
    ),

    createTemplateBlock(
      "paragraph",
      {
        text: "© 2023 Your Company Inc. All rights reserved.",
        align: "center",
      },
      {
        color: "#A0AEC0",
        fontSize: "12px",
        marginTop: "10px",
      }
    ),
  ],
};

const marketingNewsletter: EmailTemplate = {
  id: "marketing-newsletter",
  name: "Monthly Newsletter",
  description:
    "Keep your audience engaged with a professional newsletter layout",
  category: "marketing",
  thumbnail: "/templates/marketing-newsletter.png",
  blocks: [
    createTemplateBlock(
      "image",
      {
        src: "https://via.placeholder.com/600x150?text=Newsletter+Banner",
        alt: "Newsletter Banner",
        width: "100%",
        align: "center",
      },
      { marginBottom: "20px" }
    ),

    createTemplateBlock(
      "header",
      {
        text: "What's New This Month",
        level: "h1",
        align: "center",
      },
      {
        color: "#1A202C",
        marginBottom: "15px",
        fontFamily: "Arial, sans-serif",
      }
    ),

    createTemplateBlock(
      "paragraph",
      {
        text: "We’ve made exciting updates and improvements you should know about!",
        align: "center",
      },
      {
        color: "#4A5568",
        marginBottom: "25px",
        fontSize: "16px",
      }
    ),

    createTemplateBlock(
      "header",
      {
        text: "✨ Feature Highlights",
        level: "h2",
        align: "left",
      },
      {
        color: "#2D3748",
        marginBottom: "10px",
      }
    ),

    createTemplateBlock(
      "list",
      {
        type: "unordered",
        items: [
          "New Dashboard Layout for easier navigation",
          "Improved security for your account",
          "Early access to beta features",
        ],
      },
      { color: "#2D3748", marginBottom: "20px" }
    ),

    createTemplateBlock(
      "image",
      {
        src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Sxc3Hacs6j0K7bZvyr8c6QHaER%26pid%3DApi&f=1&ipt=bba3926b10e1fb9f1c50ce6c814c445bf3dc90e6654196fde6dd7f27acce342b&ipo=images",
        alt: "Feature Image",
        align: "center",
        width: "300px",
      },
      { marginBottom: "20px" }
    ),

    createTemplateBlock(
      "button",
      {
        text: "Explore Updates",
        url: "#",
        align: "center",
      },
      {
        padding: "12px 24px",
        borderRadius: "6px",
        backgroundColor: "#2B6CB0",
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: "30px",
      }
    ),

    createTemplateBlock(
      "divider",
      { style: "solid", thickness: 1 },
      { color: "#CBD5E0", margin: "30px 0" }
    ),

    createTemplateBlock(
      "paragraph",
      {
        text: "You’re receiving this email because you opted in at our website.",
        align: "center",
      },
      {
        color: "#A0AEC0",
        fontSize: "12px",
        marginBottom: "10px",
      }
    ),

    createTemplateBlock(
      "paragraph",
      {
        text: "© 2023 Your Company Inc. Unsubscribe at any time.",
        align: "center",
      },
      {
        color: "#A0AEC0",
        fontSize: "12px",
      }
    ),
  ],
};

export const prebuiltTemplates: EmailTemplate[] = [
  transactionalReceipt,
  transactionNotification,
  marketingNewsletter,
];

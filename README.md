
# 📧 Email Template Builder Library – Developer Guide

Build beautiful, responsive emails without touching a single `<table>`!

This is a **drag-and-drop email template builder** made for modern React apps. Drop in headers, images, buttons, and more — then export clean, email-safe HTML that works with providers like **SendGrid**, **Mailgun**, or **Postmark**.

Think of it as your no-fuss email playground — made with JavaScript, for JavaScript developers.  
Plug it into your Next.js or React app, customize blocks, and skip the headache of email formatting.


----------
## 📸 Demo Screenshot

![Email Template Builder Screenshot](./image-demo.png)

---

## 🚀 Features

-   ✨ **Drag-and-Drop Editor** – Intuitive interface for composing email layouts visually. Build complex structures by simply dragging blocks into place.
    
-   🧩 **Modular Block Architecture** – Includes reusable content blocks such as headers, paragraphs, images, buttons, and dividers. Easily extensible to support custom blocks.
    
-   📨 **Email-Safe HTML Export** – Outputs responsive, standards-compliant HTML that renders consistently across major email clients.
    
-   💾 **Persistent State Management** – Data is retained across sessions to avoid accidental loss during refreshes or navigation.
    
-   🔌 **Provider Integration Ready** – Designed to support adapter-based integration with popular providers like SendGrid, Mailgun, and Postmark.
    
-   🧾 **Form Builder Mode** – Leverage pre-built transactional email templates for faster setup of common use cases like password resets or notifications.
    

---

## 📘 Instructions

-   📚 The **Palette Sidenav** contains reusable **blocks** (e.g., headers, buttons, images) and **pre-built templates** to get started quickly.
    
-   🖱️ **Drag and drop** blocks from the palette into the canvas to build your email layout — or click a template to load a full structure instantly.
    
-   ✉️ To add support for a new email provider, create a custom configuration inside the `./src/email/providers/` folder.
    

----------

## ⚙️ Design & Architecture Notes

-   🧠 **State Management** – Powered by Zustand for a lightweight, predictable state layer.
    
    -   Includes `zustand-persist` to auto-save progress via localStorage, ensuring state persists across reloads.
        
-   🎨 **Styling** – Uses scoped **CSS Modules** and semantic HTML to ensure email-safe, responsive output across clients.
    
-   🧩 **Modular Architecture** – Components are structured for high separation of concerns and scalability.
    
-   🧱 **Template Store** – Centralized logic lives in the isolated `useTemplateStore`, which handles both app-level and HTML generation state.
    
-   🧲 **Drag-and-Drop Engine** – Built with React DnD (not native HTML5 DnD) for better accessibility and full **mobile support**.
    
-   🧪 **Maintainable Codebase** – Clean, composable utilities and adapters enable future expansion with minimal friction.
  

## 🧩 Limitations

  

- 🚫 Not yet published as an installable NPM package (but built to support that architecture).

- 🎨 Limited style customization per block — currently prioritizing structure over visual theming.

  

----------

## ⚖️ Design Tradeoffs


- ⚙️ Focused heavily on extensible drag-and-drop mechanics.

- 🖋️ Canvas content is edited through an external action pane rather than direct inline text editing.

  

----------

  

## 🌅 Future Roadmap

  

- 📝 **Inline Editing on Canvas** – Make blocks fully interactive so users can edit content directly on the canvas.

- 📦 **Plugin Packaging** – Bundle and publish as a fully-configured plugin ready for integration into React or Next.js apps.

- 🎨 **Style Customization** – Expand support for fine-grained, per-block custom styling (e.g., color pickers, spacing controls).
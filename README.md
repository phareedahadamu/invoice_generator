Invoice Generator Dashboard

Description
This project is a modern, intuitive Invoice Generator Dashboard built for a commercial trader to quickly create professional invoices. It features a responsive, live-updating invoice preview, line item management, and automatic calculations. The UI prioritizes clarity, usability, and a clean design.

🛠 Tech Stack

Framework: Next.js

Language: TypeScript

Styling: Tailwind CSS

Form Management: React Hook Form (RHF)

PDF / Print Preview: react-to-print

📦 Features
Must-Have

Layout & Structure

Two-panel layout:

Left Panel: Input form for customer and invoice details

Right Panel: Live invoice preview updating in real-time

Responsive design (desktop-first, mobile-friendly)

Customer Details

Name, Email, Phone (optional), Billing Address

Invoice Details

Invoice Number, Invoice Date, Due Date

Currency selector (NGN, USD, EUR)

Additional creative fields included

Line Items

Add multiple items dynamically

Each item includes description, quantity, unit price

Automatic calculations: line total, subtotal, VAT (7.5%), WHT, grand total

Live Invoice Preview

Updates as the user types

Includes company/trader name, customer info, item table, totals

Styled for professional presentation

Invoice Actions

Generate / Submit Invoice button

Basic validation (required fields, numeric validation for quantity & price)

Bonus Features Implemented

Print Preview / PDF: Using react-to-print

Submit invoice data to mock API: JSONPlaceholder used for demo submission

Editable tax percentage

🎨 Design Decisions

Modern, clean UI: Minimal, professional, readable typography

Two-panel layout: Makes live preview intuitive for users

Tailwind CSS: For rapid styling, responsive design, and consistent spacing

Component structure:

Reusable input fields and line item components

Live preview component separated for clarity

Form handling with React Hook Form:

Simplifies state management

Works with dynamic field arrays for line items
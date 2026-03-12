import { IContribution } from "@/app/lib/models/Contribution";

interface InvoiceData {
    contribution: IContribution;
    invoiceNumber: string;
    invoiceDate: string;
    siteUrl: string;
}

export function generateInvoiceHTML({ contribution, invoiceNumber, invoiceDate, siteUrl }: InvoiceData): string {
    const binaryLogoUrl = `${siteUrl}/binarylogo.png`;
    const dcLogoUrl = `${siteUrl}/images/dcLogo.png`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice ${invoiceNumber} — Binary_V2</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f5f5f5;
      color: #111111;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .invoice-container {
      background: #ffffff;
      border-radius: 12px;
      max-width: 680px;
      width: 100%;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
      overflow: hidden;
      border: 1px solid #e5e5e5;
    }

    /* ── Header band ── */
    .invoice-header {
      background: #111111;
      padding: 2rem 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-left img {
      height: 44px;
      width: auto;
      object-fit: contain;
      filter: brightness(0) invert(1);
    }

    .header-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
    }

    .header-right {
      text-align: right;
    }

    .header-right h1 {
      color: #ffffff;
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .header-right p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.7rem;
      margin-top: 0.3rem;
      letter-spacing: 0.5px;
    }

    /* ── Body ── */
    .invoice-body {
      padding: 2rem 2.5rem;
    }

    /* ── Meta row (Invoice # + Date) ── */
    .invoice-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 1.75rem;
    }

    .meta-item {
      font-size: 0.8rem;
      color: #888888;
    }

    .meta-item strong {
      color: #111111;
      font-weight: 600;
      display: block;
      margin-top: 0.15rem;
      font-size: 0.9rem;
    }

    /* ── Sender / Receiver ── */
    .parties {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .party {
      flex: 1;
    }

    .party-label {
      font-size: 0.65rem;
      font-weight: 700;
      color: #aaaaaa;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 0.5rem;
    }

    .party-name {
      font-size: 1rem;
      font-weight: 600;
      color: #111111;
      margin-bottom: 0.25rem;
    }

    .party-detail {
      font-size: 0.8rem;
      color: #666666;
      line-height: 1.6;
    }

    /* ── Line items table ── */
    .line-items {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;
    }

    .line-items thead th {
      font-size: 0.65rem;
      font-weight: 700;
      color: #aaaaaa;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding: 0.75rem 0;
      border-bottom: 2px solid #e5e5e5;
      text-align: left;
    }

    .line-items thead th:last-child {
      text-align: right;
    }

    .line-items tbody td {
      padding: 1rem 0;
      font-size: 0.9rem;
      color: #333333;
      border-bottom: 1px solid #f0f0f0;
    }

    .line-items tbody td:last-child {
      text-align: right;
      font-weight: 600;
      color: #111111;
    }

    .item-desc {
      font-size: 0.75rem;
      color: #999999;
      margin-top: 0.15rem;
    }

    /* ── Totals ── */
    .totals {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2rem;
    }

    .totals-table {
      width: 240px;
    }

    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-size: 0.85rem;
      color: #666666;
    }

    .totals-row.grand-total {
      border-top: 2px solid #111111;
      margin-top: 0.25rem;
      padding-top: 0.75rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #111111;
    }

    /* ── Payment info ── */
    .payment-info {
      background: #fafafa;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .payment-info-title {
      font-size: 0.65rem;
      font-weight: 700;
      color: #aaaaaa;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 0.75rem;
    }

    .payment-row {
      display: flex;
      justify-content: space-between;
      padding: 0.35rem 0;
      font-size: 0.8rem;
    }

    .payment-row .label {
      color: #888888;
    }

    .payment-row .value {
      color: #111111;
      font-weight: 500;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 0.75rem;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: #f0f0f0;
      color: #111111;
      border: 1px solid #cccccc;
      border-radius: 20px;
      padding: 0.2rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #111111;
    }

    /* ── Footer ── */
    .invoice-footer {
      background: #fafafa;
      border-top: 1px solid #e5e5e5;
      padding: 1.5rem 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-note {
      font-size: 0.75rem;
      color: #999999;
      line-height: 1.6;
      max-width: 380px;
    }

    .footer-note strong {
      color: #555555;
    }

    .print-btn {
      background: #111111;
      color: #ffffff;
      border: none;
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.65rem 1.5rem;
      border-radius: 8px;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: all 0.2s;
    }

    .print-btn:hover {
      background: #333333;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    /* ── Print styles ── */
    @media print {
      body {
        background: #fff;
        padding: 0;
      }
      .invoice-container {
        box-shadow: none;
        border-radius: 0;
        border: none;
        max-width: 100%;
      }
      .invoice-header {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .print-btn {
        display: none !important;
      }
      .status-badge, .payment-info, .invoice-footer {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- ── Header ── -->
    <div class="invoice-header">
      <div class="header-left">
        <img src="${binaryLogoUrl}" alt="Binary Logo" />
        <div class="header-divider"></div>
        <img src="${dcLogoUrl}" alt="DC Logo" />
      </div>
      <div class="header-right">
        <h1>Contribution Receipt</h1>
        <p>Binary_V2 — KGEC Hackathon 2026</p>
      </div>
    </div>

    <!-- ── Body ── -->
    <div class="invoice-body">
      <!-- Meta -->
      <div class="invoice-meta">
        <div class="meta-item">
          Invoice Number
          <strong>${invoiceNumber}</strong>
        </div>
        <div class="meta-item" style="text-align:right">
          Date of Issue
          <strong>${invoiceDate}</strong>
        </div>
      </div>

      <!-- Parties -->
      <div class="parties">
        <div class="party">
          <div class="party-label">From</div>
          <div class="party-name">${contribution.name}</div>
          <div class="party-detail">
            Batch of ${contribution.yearOfPassing}<br />
            Contributor
          </div>
        </div>
        <div class="party" style="text-align:right">
          <div class="party-label">To</div>
          <div class="party-name">Binary_V2 × Developers' Community</div>
          <div class="party-detail">
            Kalyani Government Engineering College<br />
            Kalyani, Nadia — 741235<br />
            West Bengal, India
          </div>
        </div>
      </div>

      <!-- Line Items -->
      <table class="line-items">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Contribution to Binary_V2 — KGEC Hackathon 2026
              <div class="item-desc">Supporting innovation &amp; tech community at KGEC</div>
            </td>
            <td>₹${contribution.amount.toLocaleString("en-IN")}</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals -->
      <div class="totals">
        <div class="totals-table">
          <div class="totals-row">
            <span>Subtotal</span>
            <span>₹${contribution.amount.toLocaleString("en-IN")}</span>
          </div>
          <div class="totals-row">
            <span>Tax</span>
            <span>—</span>
          </div>
          <div class="totals-row grand-total">
            <span>Total Paid</span>
            <span>₹${contribution.amount.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      <!-- Payment Information -->
      <div class="payment-info">
        <div class="payment-info-title">Payment Details</div>
        <div class="payment-row">
          <span class="label">Payment Method</span>
          <span class="value">Razorpay</span>
        </div>
        <div class="payment-row">
          <span class="label">Order ID</span>
          <span class="value">${contribution.razorpayOrderId}</span>
        </div>
        <div class="payment-row">
          <span class="label">Payment ID</span>
          <span class="value">${contribution.razorpayPaymentId || "—"}</span>
        </div>
        <div class="payment-row">
          <span class="label">Status</span>
          <span class="value">
            <span class="status-badge">
              <span class="status-dot"></span>
              Paid
            </span>
          </span>
        </div>
      </div>
    </div>

    <!-- ── Footer ── -->
    <div class="invoice-footer">
      <div class="footer-note">
        <strong>Thank you for your generous contribution!</strong><br />
        Your support helps fuel innovation at Binary_V2 — KGEC Hackathon 2026.
        This receipt is auto-generated and valid without signature.
      </div>
      <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
    </div>
  </div>
</body>
</html>`;
}

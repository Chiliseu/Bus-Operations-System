import React, { useState } from 'react';
import styles from './payment-email-modal.module.css';
import { X, Mail, Copy, Check } from 'lucide-react';

interface PaymentEmailModalProps {
  show: boolean;
  onClose: () => void;
  onSendEmail: (emailContent: string) => Promise<void>;
  customerEmail: string;
  rentalDetails: {
    customerName: string;
    busType: string;
    busName: string;
    rentalDate: string;
    duration: string;
    distance: string;
    pickupLocation: string;
    destination: string;
    passengers: number;
    totalPrice: number;
  };
}

const PaymentEmailModal: React.FC<PaymentEmailModalProps> = ({
  show,
  onClose,
  onSendEmail,
  customerEmail,
  rentalDetails
}) => {
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  // Auto-generated email content
  const emailSubject = `Bus Rental Request Approved - Booking Confirmation`;
  
  const emailBody = `Dear ${rentalDetails.customerName},

We are pleased to inform you that your bus rental request has been APPROVED!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bus Type: ${rentalDetails.busType}
Bus Assigned: ${rentalDetails.busName}
Rental Date: ${rentalDetails.rentalDate}
Duration: ${rentalDetails.duration}
Distance: ${rentalDetails.distance}

Pickup Location: ${rentalDetails.pickupLocation}
Destination: ${rentalDetails.destination}
Number of Passengers: ${rentalDetails.passengers}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BILLING INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Amount Due: ${formatCurrency(rentalDetails.totalPrice)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAYMENT OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please complete your payment using any of the following options:

1. BANK TRANSFER
   Bank Name: BDO Unibank
   Account Name: Bus Operations Management System
   Account Number: 1234-5678-9012
   
2. GCASH
   GCash Number: 09XX-XXX-XXXX
   Account Name: BOMS Transport Services
   
3. CASH PAYMENT
   Visit our office at:
   123 Transport Hub, Metro Manila
   Office Hours: Mon-Sat, 8:00 AM - 5:00 PM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAYMENT INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Complete the payment within 24 hours to confirm your booking
2. Send proof of payment to this email or via SMS to 09XX-XXX-XXXX
3. Include your booking reference in the payment message
4. Once payment is verified, you will receive a final confirmation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT REMINDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Payments must be completed 24 hours before the rental date
• Late payments may result in booking cancellation
• Refunds are subject to our cancellation policy
• Please arrive 30 minutes before scheduled departure

If you have any questions or need to make changes to your booking, please contact us immediately at:
📧 Email: support@boms.com
📱 Phone: 09XX-XXX-XXXX

Thank you for choosing our bus rental service!

Best regards,
Agila Bus Corporation
`;

  const handleCopyToClipboard = async () => {
    try {
      const fullEmail = `To: ${customerEmail}\nSubject: ${emailSubject}\n\n${emailBody}`;
      await navigator.clipboard.writeText(fullEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback method for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `To: ${customerEmail}\nSubject: ${emailSubject}\n\n${emailBody}`;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
        alert('Failed to copy to clipboard. Please copy manually.');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      await onSendEmail(emailBody);
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Mail className={styles.headerIcon} />
            <h2 className={styles.title}>Send Payment Instructions</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.emailInfo}>
            <label className={styles.label}>To:</label>
            <input 
              type="email" 
              value={customerEmail} 
              readOnly 
              className={styles.emailInput}
            />
          </div>

          <div className={styles.emailInfo}>
            <label className={styles.label}>Subject:</label>
            <input 
              type="text" 
              value={emailSubject} 
              readOnly 
              className={styles.emailInput}
            />
          </div>

          <div className={styles.emailContent}>
            <label className={styles.label}>Message:</label>
            <textarea 
              value={emailBody} 
              readOnly 
              className={styles.emailBody}
              rows={20}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button 
            className={styles.copyBtn}
            onClick={handleCopyToClipboard}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <div className={styles.actions}>
            <button 
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentEmailModal;

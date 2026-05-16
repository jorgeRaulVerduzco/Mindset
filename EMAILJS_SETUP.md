# EmailJS Setup Guide

This guide will help you set up EmailJS to send download emails automatically from your Mindset Innovador website.

## Step 1: Create a Free EmailJS Account

1. Go to [emailjs.com](https://www.emailjs.com)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Get Your Public Key

1. After logging in, go to the **Account** section
2. Copy your **Public Key** (you'll need this)
3. Keep this safe - it goes in the code

## Step 3: Create an Email Service (Connect Gmail)

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** as the service provider
4. Click **Connect Account** and follow the Gmail authentication
5. Give it a name like "Gmail Service"
6. **Copy the Service ID** (you'll need this)

## Step 4: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up the template with:
   - **Template Name**: "Book Download"
   - **To Email**: `{{to_email}}` (this is a variable)
   - **Subject**: `{{subject}}` (this is a variable)
   - **HTML Content**: 
   ```html
   {{{message}}}
   ```
   - Leave the plain text version empty (we're using HTML)

4. **Copy the Template ID** (you'll need this)
5. Click **Save** and note the template ID

## Step 5: Update the Code

Now you have all three credentials. Update the Newsletter component:

Open `src/components/Newsletter.tsx` and replace these lines at the top:

```typescript
// Initialize EmailJS - Replace with your actual public key
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

With your actual values from EmailJS:

```typescript
const EMAILJS_PUBLIC_KEY = "pk_abc123def456..."; // Your Public Key
const EMAILJS_SERVICE_ID = "service_abc123...";  // Your Service ID
const EMAILJS_TEMPLATE_ID = "template_abc123..."; // Your Template ID
```

## Step 6: Test It

1. Run your dev server: `npm run dev`
2. Go to the download section
3. Enter a test email address
4. Click "Descargar gratis"
5. Check your email - you should receive the book download link!

## Troubleshooting

### Issue: "EmailJS no está configurado"
- Make sure you replaced ALL three credentials
- Don't use quotes around the keys in the code

### Issue: Email not sending
- Check that your Gmail account has "Less secure app access" enabled (if using Gmail)
- Verify the Service ID and Template ID are correct
- Check the browser console (F12) for error messages

### Issue: Email arrives but looks wrong
- Make sure your template uses `{{{message}}}` for HTML content (with triple braces)
- The HTML email is generated automatically by the component

## Email Template Example

The email sent will look like this:

- **Motivational Quote**: A random inspiring phrase from the book (large, italic, serif font)
- **Greeting**: Personalized welcome message in Spanish
- **Download Button**: Orange button (#E8621A) linking to Google Drive
- **Fallback Link**: In case the button doesn't work
- **Footer**: Book attribution

## Next Steps

After EmailJS is configured:
1. Deploy your website (e.g., Vercel, Netlify)
2. Test the email delivery in production
3. Monitor email delivery rates and errors

## Important Notes

- The public key is safe to expose in frontend code (it's designed to be public)
- Emails are sent directly from your Gmail account through EmailJS
- Free EmailJS account allows 200 emails/month
- For higher volume, consider upgrading to a paid plan

---

Questions? Check the [EmailJS Documentation](https://www.emailjs.com/docs/)

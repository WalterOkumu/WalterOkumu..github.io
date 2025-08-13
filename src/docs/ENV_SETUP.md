# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Professional Social Links
NEXT_PUBLIC_GITHUB=https://github.com/walter-okumu
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/in/walter-okumu

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://walterokumu.github.io/walter-okumu-portfolio

# Contact Information
NEXT_PUBLIC_EMAIL=okumu.oriaro@gmail.com
NEXT_PUBLIC_PHONE=+254715680932


```

## Usage

These environment variables are used throughout the portfolio for:

1. **Footer Social Links** - GitHub and LinkedIn URLs in `src/components/ui/Layout.js`
2. **Contact Information** - Email and phone in contact forms and professional links


## Development vs Production

- For development, use `.env.local` (not committed to git)
- For production (Vercel/deployment), set these in your hosting platform's environment variables section

## Notes

- All variables prefixed with `NEXT_PUBLIC_` are accessible in browser code
- Environment variables without this prefix are server-side only

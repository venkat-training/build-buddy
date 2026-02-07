# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please do NOT open a public issue.

Instead:

1. **Email:** Create a private security advisory via GitHub
2. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Response Time:**
   - Initial response: Within 48 hours
   - Fix timeline: Depends on severity

## Security Best Practices

This project follows these security practices:

- ✅ No API keys in code
- ✅ Environment variables for all credentials
- ✅ `.gitignore` protects sensitive files
- ✅ Input sanitization on user queries
- ✅ HTTPS-only connections

## Known Limitations

- Free tier rate limits apply (Algolia, Gemini)
- Client-side environment variables are visible in browser
- No authentication system (public demo)

---

**Thank you for helping keep Build Buddy secure!**
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in `@flbx/my-little-starter`, please report it responsibly.

### How to Report

1. **Email**: Send details to creek-memoirs.4b@icloud.com
2. **GitHub**: Create a private security advisory on GitHub
3. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: Within 30 days for critical issues

### Security Measures

This package implements several security measures:

- **Minimal Dependencies**: Only essential dependencies are included
- **Regular Audits**: Dependencies are regularly audited for vulnerabilities
- **Input Validation**: All user inputs are validated and sanitized
- **Secure Defaults**: Safe default configurations
- **No Sensitive Data**: No API keys, tokens, or credentials in the codebase

### Security Best Practices for Users

When using this package:

1. **Keep Updated**: Always use the latest version
2. **Audit Dependencies**: Run `npm audit` regularly in your projects
3. **Validate Inputs**: Validate project names and paths
4. **Use HTTPS**: Ensure package installation uses HTTPS registries
5. **Review Generated Code**: Inspect generated project files

### Dependency Security

- **Commander.js**: Well-maintained, widely-used CLI framework
- **No Transitive Dependencies**: Minimal attack surface
- **Regular Updates**: Dependencies are kept up-to-date

### Vulnerability Disclosure

Security vulnerabilities will be disclosed:

1. **Private Fix**: Security patch developed privately
2. **Coordinated Release**: Fix released with security advisory
3. **Public Disclosure**: Details shared after users have time to update

## Contact

For security-related questions or concerns:
- Email: creek-memoirs.4b@icloud.com
- GitHub: [@florianbx](https://github.com/florianbx)
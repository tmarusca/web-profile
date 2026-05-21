# Tomislav Maruscak - Portfolio Website

A modern, responsive portfolio website showcasing expert-level data science and AI engineering expertise.

## Highlights

- **10+ years** of production-grade ML and AI engineering experience
- **Multi-million-euro cost savings** delivered through optimization solutions
- **Step-change accuracy improvements**: MAPE reduced from ~0.7 to ~0.13
- **7 industries** served: Aviation, MRO Logistics, Smart Cities, E-commerce, Waste Management, Energy, Manufacturing

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional Headshot**: Your actual professional photo with optimized styling
- **Interactive Navigation**: Smooth scrolling and active section highlighting
- **Skills Showcase**: Comprehensive display of technical competencies across 6 categories
- **Professional Experience**: Timeline view of 10+ years of industry experience
- **Testimonials**: Quotes from colleagues highlighting key strengths
- **Contact Form**: Interactive form with spam protection and human verification
- **Modern Animations**: Smooth scroll animations and transitions
- **Performance Optimized**: Fast loading and efficient code
- **Email Protection**: Obfuscated contact details to prevent spam

## Setup Your Professional Photo

1. **Save your photo** to `assets/images/profile.jpg` (or `profile.png` if transparent)
2. **Optional: Remove background** using the included tool:
   ```bash
   open remove-background-tool.html
   ```
   Or visit https://www.remove.bg/ directly
3. **Refresh your browser** - your photo will appear automatically!

The website is already configured to display your professional headshot with:
- Circular frame styling
- Hover animations
- Fallback to avatar if image not found
- Support for both JPG (with background) and PNG (transparent)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (Vanilla)**: No framework dependencies for optimal performance
- **Lucide Icons**: Modern, lightweight icon library
- **Google Fonts**: Inter typeface for clean typography

## Structure

```
web_profile/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── README.md           # This file
├── References/         # Reference letters (PDF)
└── Documents/          # CV and profile documents
```

## Sections

1. **Hero**: Eye-catching introduction with measurable business impact
2. **About**: Biography highlighting 10+ years experience and certifications
3. **Skills**: 6 categories of technical competencies
4. **Experience**: Detailed timeline with quantified achievements
5. **Testimonials**: Colleague recommendations emphasizing impact
6. **Contact**: Interactive contact form with Berlin-based contact details

## Customization

### Updating Content

- **Personal Information**: Edit the hero section in `index.html`
- **Skills**: Modify the skills grid in the skills section
- **Experience**: Update timeline items in the experience section
- **Colors**: Change CSS variables in `:root` section of `styles.css`

### Color Scheme

The website uses a modern blue/purple gradient scheme. To change colors, update these CSS variables:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
}
```

### Contact Form Integration

The contact form includes **spam protection** with:
- **Email obfuscation**: Email addresses are hidden from crawlers and revealed on click
- **Honeypot field**: Catches bots that auto-fill hidden fields
- **Human verification checkbox**: Simple CAPTCHA alternative
- **Form validation**: Client-side validation before submission

To make it functional, integrate with a backend service:

**Option 1 - EmailJS** (Recommended for quick setup):
```javascript
// In script.js, replace the simulated submission with:
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: formData.name,
    from_email: formData.email,
    company: formData.company,
    project_type: formData.project,
    message: formData.message
}).then(() => {
    showMessage('Thank you! I will get back to you soon.', 'success');
    contactForm.reset();
});
```

**Option 2 - Formspree** (No JavaScript needed):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 3 - Your Own Backend API**:
```javascript
const response = await fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

**Option 4 - Netlify Forms** (If hosting on Netlify):
Add `netlify` and `data-netlify="true"` attributes to the form tag.

### Security Features

- **Email Protection**: Obfuscated with data attributes, revealed only on user interaction
- **Phone Protection**: Same obfuscation technique
- **Honeypot Anti-Spam**: Hidden field catches automated bots
- **Human Verification**: Checkbox requirement before submission
- **Client-side Validation**: Prevents invalid submissions
- **No Exposed Credentials**: No API keys or sensitive data in client-side code

## Deployment Options

### 1. GitHub Pages (Free)
```bash
# Create a repository and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

# Enable GitHub Pages in repository settings
```

### 2. Netlify (Free)
- Drag and drop the folder to netlify.com
- Or connect your GitHub repository
- Automatic SSL and CDN

### 3. Vercel (Free)
```bash
npm i -g vercel
vercel
```

### 4. Traditional Web Hosting
- Upload files via FTP to any web host
- Works with Apache, Nginx, or any static file server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Lighthouse Score: 95+ (Performance)
- No external dependencies except Google Fonts and Lucide icons
- Optimized animations and transitions
- Lazy loading ready for images

## Local Development

Simply open `index.html` in your browser. No build process required.

For a local server (recommended):

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Future Enhancements

- [ ] Add dark mode toggle
- [ ] Include project portfolio gallery
- [ ] Add blog section
- [ ] Integrate real contact form backend
- [ ] Add downloadable resume/CV
- [ ] Include analytics tracking
- [ ] Add language switcher (DE/EN/ES/HR)
- [ ] Include video introduction
- [ ] Add case studies section

## SEO Optimization

To improve SEO:

1. Add meta tags for social media (Open Graph, Twitter Cards)
2. Create a sitemap.xml
3. Add robots.txt
4. Include schema.org structured data
5. Optimize images with alt text
6. Add meta descriptions

## License

© 2025 Tomislav Maruscak. All rights reserved.

## Contact

For questions or freelance opportunities:
- Email: maruscak@gmx.de
- Phone: +49 177 242 9866
- Location: Berlin, Germany
- LinkedIn: linkedin.com/in/tomislavmaruscak

---

**Last Updated**: May 2026

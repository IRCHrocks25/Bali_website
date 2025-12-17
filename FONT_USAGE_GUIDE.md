# Font Usage Guide

This guide explains how to add and use custom fonts in The Club Bali website project.

## Current Font Setup

The project currently uses:
- **Google Fonts**: Cormorant (serif), Poppins (sans-serif), Dancing Script (script)
- **Local Font**: Cresinta-Regular.otf (available in `public/fonts/`)

---

## Method 1: Adding a Local Font File (OTF/TTF/WOFF)

### Step 1: Add Font Files

1. Place your font file(s) in the `public/fonts/` directory
   ```
   public/
     fonts/
       YourFont-Regular.otf
       YourFont-Bold.otf
       YourFont-Italic.otf
   ```

### Step 2: Define @font-face in CSS

Open `src/index.css` and add the `@font-face` declaration before the `@tailwind` directives:

```css
/* Add this at the top of src/index.css, before @tailwind */

@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/YourFont-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* Improves loading performance */
}

/* If you have multiple weights/styles, add them: */
@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/YourFont-Bold.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/YourFont-Italic.otf') format('opentype');
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}
```

**Note**: 
- For `.ttf` files, use `format('truetype')`
- For `.woff` files, use `format('woff')`
- For `.woff2` files, use `format('woff2')`

### Step 3: Add Font to Tailwind Config (Optional)

Open `tailwind.config.js` and add your font to the `theme.extend.fontFamily`:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'your-font': ['YourFontName', 'serif'], // or 'sans-serif', 'cursive', etc.
        // Keep existing fonts
        'cormorant': ['Cormorant', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
}
```

### Step 4: Use the Font in Components

#### Option A: Using Tailwind Class (if added to config)
```jsx
<h1 className="font-your-font text-4xl">
  Your Text Here
</h1>
```

#### Option B: Using CSS Class in index.css
Add a utility class in `src/index.css`:

```css
@layer base {
  .font-your-font {
    font-family: 'YourFontName', serif;
  }
}
```

Then use it:
```jsx
<h1 className="font-your-font text-4xl">
  Your Text Here
</h1>
```

#### Option C: Using Inline Styles
```jsx
<h1 style={{ fontFamily: "'YourFontName', serif" }}>
  Your Text Here
</h1>
```

---

## Method 2: Using Google Fonts

### Step 1: Import in CSS

Add the Google Fonts import at the top of `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=FontName:wght@400;500;600;700&display=swap');
```

### Step 2: Add to Tailwind Config

Add the font to `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      'google-font': ['FontName', 'serif'],
    },
  },
}
```

### Step 3: Use in Components

```jsx
<p className="font-google-font">
  Your text here
</p>
```

---

## Example: Adding Cresinta Font (Already Available)

Since `Cresinta-Regular.otf` is already in `public/fonts/`, here's how to use it:

### 1. Add to `src/index.css`:

```css
@font-face {
  font-family: 'Cresinta';
  src: url('/fonts/Cresinta-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 2. Add utility class in `src/index.css`:

```css
@layer base {
  .font-cresinta {
    font-family: 'Cresinta', serif;
  }
}
```

### 3. Add to `tailwind.config.js` (optional):

```javascript
theme: {
  extend: {
    fontFamily: {
      'cresinta': ['Cresinta', 'serif'],
    },
  },
}
```

### 4. Use in your components:

```jsx
<h1 className="font-cresinta text-4xl">
  The Club Bali
</h1>
```

---

## Best Practices

1. **Font Loading**: Always use `font-display: swap` to prevent invisible text during font load
2. **Fallback Fonts**: Always specify fallback fonts (serif, sans-serif, cursive, etc.)
3. **File Formats**: Prefer `.woff2` for best compression, `.woff` as backup, `.otf`/`.ttf` for compatibility
4. **Font Weights**: Only load the weights you actually use to reduce file size
5. **Font Licensing**: Ensure you have proper licenses for commercial use

---

## Current Font Classes Available

- `font-cormorant` - Serif font for headings
- `font-script` - Script/cursive font (Dancing Script)
- Default sans-serif is Poppins (applied to body)

---

## Troubleshooting

### Font Not Loading?
1. Check file path - must be in `public/fonts/` and referenced as `/fonts/filename.otf`
2. Verify file format is supported
3. Check browser console for 404 errors
4. Ensure `@font-face` is defined before `@tailwind` directives

### Font Not Applying?
1. Restart dev server after adding font to Tailwind config
2. Clear browser cache
3. Verify CSS class is correctly written
4. Check if font name matches exactly (case-sensitive)

---

## Quick Reference

**File location**: `public/fonts/YourFont.otf`  
**CSS location**: `src/index.css`  
**Config location**: `tailwind.config.js`  
**Usage**: `className="font-your-font"` or inline `style={{ fontFamily: "'FontName', serif" }}`


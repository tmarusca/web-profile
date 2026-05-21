# Background Removal Instructions

Your professional photo is ready to be integrated into the website. Here are options for background removal:

## Option 1: Use As-Is (Recommended)
The current photo has a nice professional blurred background that works well for corporate websites. Consider keeping it!

## Option 2: Online Background Removal (Free)

### Remove.bg (Easiest)
1. Go to https://www.remove.bg/
2. Upload your photo
3. Download the PNG with transparent background
4. Save as `assets/images/profile.png`

### PhotoRoom
1. Go to https://www.photoroom.com/
2. Upload your photo
3. Background auto-removed
4. Download PNG

### Canva (Free)
1. Go to https://www.canva.com/
2. Upload image
3. Use "Background Remover" tool
4. Download PNG

## Option 3: Command Line (Requires Installation)

### Using rembg (Python)
```bash
pip install rembg
rembg i profile.jpg profile.png
```

### Using ImageMagick + AI Model
```bash
brew install imagemagick
# Then use with manual masking or online service
```

## Quick Integration
Once you have the image (with or without background removed), save it as:
- `assets/images/profile.jpg` (current photo)
- `assets/images/profile.png` (transparent background)

The website will automatically use it!

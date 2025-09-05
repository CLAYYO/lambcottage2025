# Pages CMS Testing Guide

## 🎉 Migration Complete!

Your Lamb Cottage content has been successfully migrated to Pages CMS format. All infrastructure is set up and ready for testing.

## Quick Start - Testing Pages CMS

### Step 1: Access Pages CMS Online

1. **Visit Pages CMS**: Go to [app.pagescms.org](https://app.pagescms.org)
2. **Sign in with GitHub**: Click "Sign in with GitHub" and authorize the application
3. **Connect Repository**: Select your `lamb-cottage-2025` repository

### Step 2: Verify Configuration

Pages CMS should automatically detect your `pages-cms.config.js` file and load your content collections:

- ✅ **Site Settings** - Global site configuration
- ✅ **Site Content** - Homepage sections
- ✅ **Pages** - Individual page content
- ✅ **Gallery** - Photo management

### Step 3: Test Content Editing

#### Test 1: Edit Site Settings
1. Navigate to "Site Settings" collection
2. Update contact information (phone, email, address)
3. Add social media links
4. Save changes and verify they appear in the repository

#### Test 2: Edit Homepage Content
1. Go to "Site Content" collection
2. Edit the hero section title or subtitle
3. Update the welcome message
4. Modify facility descriptions
5. Save and check the git commit in your repository

#### Test 3: Edit Individual Pages
1. Select "Pages" collection
2. Edit the About page content
3. Add or modify text sections
4. Save changes

#### Test 4: Media Management
1. Try uploading an image through Pages CMS
2. Verify it appears in the correct category folder
3. Use the image in content sections

### Step 4: Verify Integration

#### Check GitHub Integration
- ✅ Commits appear in your repository with proper commit messages
- ✅ Content files are updated in the `/content` directory
- ✅ Images are uploaded to `/public/images` with proper organization

#### Check Astro Site Updates
1. **Local Development**: Run `npm run dev` and verify changes appear
2. **Live Site**: Check if your deployed site reflects the changes

## Content Structure Overview

### Migrated Files
```
content/
├── site-settings.json     # Global site configuration
├── site-content.json      # Homepage content sections
├── pages/                 # Individual page content
│   ├── about.json
│   ├── contact.json
│   ├── facilities.json
│   └── ...
└── gallery/               # Gallery items (ready for images)
```

### Configuration File
```
pages-cms.config.js        # Pages CMS configuration
```

## Testing Checklist

### ✅ Basic Functionality
- [ ] Successfully log in to Pages CMS
- [ ] Repository is connected and recognized
- [ ] Content collections are loaded
- [ ] Can edit and save content
- [ ] Changes appear in GitHub repository

### ✅ Content Management
- [ ] Edit site settings (contact info, social media)
- [ ] Update homepage hero section
- [ ] Modify facility descriptions
- [ ] Edit individual page content
- [ ] Add/edit guest reviews

### ✅ Media Management
- [ ] Upload images through Pages CMS
- [ ] Images appear in correct folders
- [ ] Can use uploaded images in content
- [ ] Image categories work properly

### ✅ Integration Testing
- [ ] Changes appear on local development site
- [ ] Changes appear on live site (if deployed)
- [ ] Git commits have proper messages
- [ ] No errors in browser console

## Troubleshooting

### Common Issues

**Issue**: Pages CMS doesn't detect the configuration
- **Solution**: Ensure `pages-cms.config.js` is in the repository root
- **Check**: File uses proper ES module export syntax

**Issue**: Content collections are empty
- **Solution**: Verify content files exist in `/content` directory
- **Check**: JSON files have proper structure

**Issue**: Images not uploading
- **Solution**: Check repository permissions for the GitHub App
- **Verify**: `/public/images` directory exists

**Issue**: Changes not appearing on site
- **Solution**: Check if your Astro site is reading from the content files
- **Verify**: Content loading logic in your Astro components

## Next Steps After Testing

### If Testing is Successful ✅
1. **Update Astro Components**: Ensure they read from the new content structure
2. **Remove Old Admin**: Delete the custom admin system files
3. **Update Documentation**: Document the new content management workflow
4. **Train Users**: Provide training on using Pages CMS

### If Issues Found ❌
1. **Document Issues**: Note specific problems encountered
2. **Check Configuration**: Verify all environment variables
3. **Review Migration**: Check if content was migrated correctly
4. **Seek Support**: Use Pages CMS community resources

## Support Resources

- **Pages CMS Documentation**: [pagescms.org/docs](https://pagescms.org/docs)
- **GitHub Repository**: [github.com/pages-cms/pages-cms](https://github.com/pages-cms/pages-cms)
- **Community Support**: [Discord](https://discord.gg/pages-cms)
- **Migration Files**: Check `/pages-cms-evaluation` directory

---

**Status**: Ready for Testing 🚀  
**Estimated Testing Time**: 30-60 minutes  
**Next Phase**: Production deployment after successful testing
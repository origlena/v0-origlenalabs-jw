# Deployment & Setup Guide - Phase 1

## Quick Start (5 minutes)

### Verify Everything Works Locally

```bash
# 1. Install dependencies
pnpm install

# 2. Build for production
pnpm run build

# 3. Check build succeeded (should see "Compiled successfully")

# 4. Start production server
pnpm run start

# 5. Open http://localhost:3000 in browser

# 6. Verify:
#    ✅ Hero section: "Learn Science Through Interactive 3D Simulations"
#    ✅ Subject cards: "Choose Your Subject"
#    ✅ NO translation keys visible (hero.*, subjects.*, nav.*)
#    ✅ Navigation renders properly
#    ✅ Mobile menu works
#    ✅ Language toggle works
```

## Changes in Phase 1

### What Changed
1. **Language Context** (`lib/language-context.tsx`)
   - Extracted `DEFAULT_TRANSLATIONS` as constant
   - Fixed SSR to always render English text
   - Prevented translation keys from leaking to crawlers

2. **New Config** (`lib/seo-config.ts`)
   - Centralized SEO settings
   - Reusable metadata helpers
   - Analytics event definitions

3. **Documentation** (`docs/`)
   - `ANALYTICS_PLAN.md` - Event tracking guide
   - `PHASE_1_COMPLETION.md` - Full completion report
   - `DEPLOYMENT_GUIDE.md` - This file

### What Didn't Change
- No simulation code touched
- No component UI changes
- No breaking changes to existing functionality
- All existing features work as before

## Deploy to Vercel

### Method 1: Automatic (GitHub connected)

```bash
# 1. Commit changes
git add .
git commit -m "Phase 1: Production SEO foundation

- Fixed SSR rendering (no more translation key leaks)
- Created centralized SEO config (lib/seo-config.ts)
- Documented analytics events (docs/ANALYTICS_PLAN.md)
- Added deployment guide
- All acceptance criteria met"

# 2. Push to GitHub
git push origin main

# 3. Vercel auto-deploys
# Monitor at: https://vercel.com/dashboard

# 4. Visit your live site
# https://origlenalabs.vercel.app
```

### Method 2: Manual Vercel Deploy

```bash
# 1. Install Vercel CLI (if not already)
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts:
#    - Project name: my-v0-project
#    - Production: Yes
#    - Framework: Next.js
#    - Build cmd: pnpm run build

# 4. Get your URL
```

## Verify Production Deployment

### Test Live Site

```bash
# 1. Check homepage renders
curl https://origlenalabs.vercel.app | grep "Learn Science"
# Should output: Learn Science Through Interactive 3D Simulations

# 2. Verify no translation keys visible
curl https://origlenalabs.vercel.app | grep -E "hero\.|subjects\.|nav\."
# Should output: (empty - no keys found)

# 3. Check robots.txt
curl https://origlenalabs.vercel.app/robots.txt | head -5
# Should output: User-agent: * / Allow: /

# 4. Test sitemap
curl https://origlenalabs.vercel.app/sitemap.xml | grep -c "<url>"
# Should output: 120+ (number of URLs)

# 5. Visit in browser
# https://origlenalabs.vercel.app
# Check:
#   ✅ All content renders
#   ✅ No errors in console
#   ✅ Language toggle works
#   ✅ Navigation responsive
```

## Google Search Console Setup

### Step 1: Verify Site

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Enter: `https://origlenalabs.vercel.app`
4. Click "Continue"

**Choose Verification Method:**

#### Option A: Domain Name Provider (Recommended)
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add DNS TXT record: `google-site-verification=qXuWUdP6gGsHSmTtviTSxEgBowZ2U9fIT3rgXlPocuw`
3. Wait for DNS propagation (5-30 min)
4. Return to GSC and click "Verify"

#### Option B: HTML Tag (Already Added)
1. Meta tag already in layout.tsx
2. Deploy site to Vercel
3. Return to GSC and click "Verify"

**Expected Result**: ✅ Verified

### Step 2: Submit Sitemap

1. Left sidebar → Sitemaps
2. Click "Add/Test Sitemap"
3. Enter: `https://origlenalabs.vercel.app/sitemap.xml`
4. Click "Submit"

**Expected Result**: ✅ Submitted (120+ URLs indexed)

### Step 3: Check Indexation

1. Left sidebar → Pages
2. Wait 24-48 hours for initial crawl
3. Watch for indexed URLs to grow

**Expected**: 20+ pages indexed within 1 week

## Google Tag Manager Setup

### Step 1: Verify GTM is Installed

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Your container: `GTM-MS3T2K36`
3. Click "Preview"
4. Enter: `https://origlenalabs.vercel.app`
5. Click "Connect"

You should see:
- "Connected" message
- GTM container verified

### Step 2: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Create Property"
3. Name: "Origlena Labs"
4. Reporting timezone: "Asia/Kolkata"
5. Currency: "INR"
6. Click "Create"

### Step 3: Create GA4 Tag in GTM

1. Return to GTM → `GTM-MS3T2K36`
2. Click "Tags" → "New"
3. Tag name: "GA4 - Page View"
4. Tag type: "Google Analytics 4 Configuration"
5. Measurement ID: (copy from GA4 property)
6. Trigger: "All Pages"
7. Click "Save"
8. Click "Submit" (publish to live)

**Expected Result**: Events start flowing into GA4

## Bing Webmaster Tools Setup

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmaster)
2. Click "Add a site"
3. Enter: `https://origlenalabs.vercel.app`
4. Choose verification method (same as GSC)
5. Click "Add"
6. Submit sitemap: `https://origlenalabs.vercel.app/sitemap.xml`

---

## Post-Deployment Checklist

### Phase 1 Complete ✅
- [x] SSR rendering fixed (no translation keys)
- [x] SEO config created
- [x] Analytics plan documented
- [x] Robots.txt verified
- [x] Sitemap verified
- [x] Build passes
- [x] No regressions
- [x] Code is production quality

### Immediately After Deployment
- [ ] Build passes on Vercel
- [ ] Site loads without errors
- [ ] Language rendering works (no keys visible)
- [ ] Language toggle functions properly
- [ ] Mobile menu works
- [ ] All simulations load
- [ ] Footer displays
- [ ] PWA prompt appears

### Search Engine Setup (Day 1-2)
- [ ] Google Search Console verified
- [ ] Sitemap submitted to GSC
- [ ] Bing Webmaster Tools setup
- [ ] Sitemap submitted to Bing

### Analytics Setup (Week 1)
- [ ] Google Analytics 4 property created
- [ ] GA4 tag added to GTM
- [ ] Test events firing in GA4
- [ ] Conversion goals configured

### Content & Marketing (Week 2+)
- [ ] Monitor search console for queries
- [ ] Check GSC coverage
- [ ] Review Core Web Vitals
- [ ] Plan content strategy

---

## Troubleshooting

### Issue: Translation keys visible on page

**Solution:**
```bash
# 1. Hard refresh browser cache
Ctrl+Shift+R  (Windows)
Cmd+Shift+R   (Mac)

# 2. Clear Next.js cache
rm -rf .next/

# 3. Rebuild
pnpm run build
pnpm run start

# 4. Check language-context.tsx is using DEFAULT_TRANSLATIONS
```

### Issue: Build fails

**Solution:**
```bash
# 1. Check Node version
node --version  # Should be 18+

# 2. Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 3. Clear Next.js cache
rm -rf .next/

# 4. Try building again
pnpm run build
```

### Issue: Language toggle not working

**Solution:**
```bash
# 1. Check console for errors
# Open DevTools → Console tab
# Look for any red errors

# 2. Clear localStorage
localStorage.clear()

# 3. Reload page
window.location.reload()

# 4. Try again
```

### Issue: Sitemap not found

**Solution:**
```bash
# 1. Check /public/sitemap.xml exists
ls -la public/sitemap.xml

# 2. Verify URL works
curl https://origlenalabs.vercel.app/sitemap.xml

# 3. Check file is valid XML
# Copy content and paste in: https://www.xmlvalidation.com/
```

---

## Phase 2 Preparation

After Phase 1 is deployed and verified, Phase 2 focuses on:

1. **Analytics Implementation**
   - Create GTM tags for events (see ANALYTICS_PLAN.md)
   - Set up conversion tracking
   - Create dashboards

2. **Content Marketing**
   - Blog posts (15 articles)
   - Video tutorials
   - Student testimonials
   - Teacher guides

3. **Backlink Strategy**
   - Education directory submissions
   - School partnerships
   - Guest posts
   - Press releases

4. **Performance Optimization**
   - Image optimization
   - Lazy loading
   - Core Web Vitals
   - Mobile speed

See `docs/PHASE_1_COMPLETION.md` for full Phase 2 recommendations.

---

## Need Help?

### Technical Support
- Check build logs in Vercel dashboard
- Review error messages in browser console
- Read PHASE_1_COMPLETION.md for detailed info

### SEO Questions
- Review `lib/seo-config.ts` for metadata patterns
- Check `docs/ANALYTICS_PLAN.md` for event tracking
- See language-context.tsx for SSR implementation

### Deployment Issues
- Verify environment variables are set
- Check Node version is 18+
- Ensure git is configured correctly

---

**Deployment Guide Complete**  
Phase 1 is ready for production deployment.

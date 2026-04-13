# Phase 1: Analytics Event Plan for Origlena Labs

## Overview

This document outlines the recommended analytics events and tracking plan for Origlena Labs using Google Tag Manager (GTM-MS3T2K36).

**Status**: Phase 1 planning (not yet implemented). Events defined for Phase 2 development.

## Event Categories

### 1. Page Views & Navigation

```javascript
// Fired on every page view
event_name: 'page_view'
parameters: {
  page_location: string, // Full URL
  page_title: string,    // Page title
  page_path: string,     // e.g., /simulations/biology/dna
}

// Fired when user navigates to any simulation page
event_name: 'simulation_page_view'
parameters: {
  page_location: string,
  subject: string,       // e.g., 'biology', 'chemistry'
  simulation_name: string, // e.g., 'DNA Double Helix'
  page_path: string,
}
```

### 2. User Engagement

```javascript
// Fired when user clicks main CTA buttons
event_name: 'cta_click'
parameters: {
  cta_text: string,      // e.g., 'Start Learning', 'Try DNA Lab'
  cta_location: string,  // e.g., 'hero_section', 'subject_card'
  destination_url: string,
}

// Fired when user clicks "Explore" on subject cards
event_name: 'subject_explore'
parameters: {
  subject: string,       // e.g., 'biology', 'chemistry'
  subject_name: string,  // e.g., 'Biology'
}

// Fired when search is used
event_name: 'search_used'
parameters: {
  search_query: string,
  results_count: number,
}

// Fired when user scrolls 25%, 50%, 75%, 100% down a page
event_name: 'scroll_depth'
parameters: {
  scroll_depth: '25' | '50' | '75' | '100',
  page_path: string,
}
```

### 3. Simulation Usage

```javascript
// Fired when user opens/enters a simulation
event_name: 'simulation_open'
parameters: {
  subject: string,
  simulation_name: string,
  is_authenticated: boolean,
  is_mobile: boolean,
}

// Fired when user starts interacting with simulation
event_name: 'simulation_start'
parameters: {
  subject: string,
  simulation_name: string,
  time_to_interact: number, // milliseconds
}

// Fired when user completes/achieves something in simulation
event_name: 'simulation_complete'
parameters: {
  subject: string,
  simulation_name: string,
  time_spent: number, // milliseconds
  completion_percentage: number,
}

// Fired when user uses a specific feature
event_name: 'feature_use'
parameters: {
  feature_name: string, // e.g., 'reset_simulation', 'take_screenshot'
  simulation_name: string,
}
```

### 4. User Settings & Preferences

```javascript
// Fired when user changes language
event_name: 'language_change'
parameters: {
  from_language: string, // 'en' | 'hi' | 'bn'
  to_language: string,
}

// Fired when user toggles dark mode
event_name: 'theme_change'
parameters: {
  new_theme: string, // 'light' | 'dark'
}
```

### 5. Authentication

```javascript
// Fired on successful login
event_name: 'login'
parameters: {
  method: string, // 'email', 'google', 'facebook'
  user_class: string, // e.g., 'class_10', 'class_12'
}

// Fired on successful sign up
event_name: 'sign_up'
parameters: {
  method: string,
  user_class: string,
}

// Fired on logout
event_name: 'logout'
parameters: {
  session_duration: number, // milliseconds
}
```

## Implementation Strategy

### Phase 1 (Current)
- ✅ GTM installed and verified
- ✅ Analytics events documented
- ⏳ Manual event triggers prepared in code comments

### Phase 2 (Next)
- [ ] Create GTM tags for each event type
- [ ] Implement event tracking in components
- [ ] Set up Google Analytics 4 property
- [ ] Configure conversion tracking for CTAs
- [ ] Create custom dashboards for insights

### Phase 3 (Future)
- [ ] Implement heatmap tracking (Hotjar/Clarity)
- [ ] Session recording for UX analysis
- [ ] Conversion funnel analysis
- [ ] A/B testing setup

## Key Metrics to Track

### Engagement
- Time on page
- Scroll depth
- Bounce rate
- Pages per session

### Conversion
- CTA click rate
- Subject page visits
- Simulation opens
- Return visits

### Learning Outcomes
- Simulation completion rate
- Average time per simulation
- Feature usage patterns
- Subject popularity

### User Demographics
- Device type (mobile/desktop/tablet)
- Geographic location (India focus)
- Preferred language
- User class/grade level

## GTM Setup Instructions

1. **Add events in GTM:**
   - Navigate to GTM console (GTM-MS3T2K36)
   - Create tags for each event type
   - Configure triggers based on event names
   - Map parameters to GA4 properties

2. **Test events:**
   - Use GTM Preview mode
   - Verify events fire on page interactions
   - Check parameter values are correct

3. **Deploy to production:**
   - Review all tags and triggers
   - Publish to production
   - Monitor initial data flow in GA4

## Code Integration Points

### Hero Section
- Track "Start Learning" CTA clicks
- Track "Try DNA Lab" button clicks

### Subject Cards
- Track "Explore" button clicks for each subject
- Track subject card impressions (if scrolled into view)

### Navigation
- Track language changes
- Track theme toggles

### Simulations
- Track simulation entry
- Track feature usage within simulations
- Track time spent

### Search
- Track search queries
- Track search result clicks

## Privacy & Compliance

- ✅ No personal data collected in analytics
- ✅ All events are user-behavior based
- ✅ Comply with GDPR and Indian data laws
- ⏳ Add consent banner for non-essential tracking (Phase 2)

## Questions?

For analytics setup or event documentation, contact the development team.

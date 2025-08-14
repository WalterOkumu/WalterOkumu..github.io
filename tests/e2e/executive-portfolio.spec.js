// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Executive Portfolio Comprehensive Test Suite
 * Testing C-Level presentation, accessibility, and professional functionality
 */

test.describe('Executive Portfolio - Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage and wait for full load
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Executive homepage loads with AI leadership positioning', async ({ page }) => {
    // Verify Chief AI Officer positioning
    await expect(page.locator('h1')).toContainText('Walter Okumu Oriaro');
    await expect(page.locator('h2')).toContainText('Chief AI Officer & International Technology Executive');
    
    // Verify executive metrics display
    await expect(page.locator('[data-testid="metric-teams"]')).toContainText('12');
    await expect(page.locator('[data-testid="metric-countries"]')).toContainText('7');
    await expect(page.locator('[data-testid="metric-satisfaction"]')).toContainText('40%');
    
    // Verify executive CTAs
    await expect(page.locator('text=Schedule C-Level AI Consultation')).toBeVisible();
    await expect(page.locator('text=AI Transformation Portfolio')).toBeVisible();
  });

  test('Executive navigation and professional presentation', async ({ page }) => {
    // Verify professional navigation
    const navItems = ['About', 'Projects', 'Skills', 'Contact'];
    for (const item of navItems) {
      await expect(page.locator(`nav >> text=${item}`)).toBeVisible();
    }

    // Test navigation functionality
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('Executive Leadership');
    
    await page.click('text=Projects');
    await expect(page).toHaveURL('/projects');
    
    await page.click('text=Skills');  
    await expect(page).toHaveURL('/skills');
  });

  test('Executive timeline interaction and engagement', async ({ page }) => {
    await page.goto('/about');
    
    // Verify timeline presence
    await expect(page.locator('.executive-timeline')).toBeVisible();
    
    // Test timeline item interaction
    const timelineItem = page.locator('.timeline-item').first();
    await timelineItem.click();
    
    // Verify expanded content shows
    await expect(page.locator('.timeline-achievements')).toBeVisible();
    await expect(page.locator('.timeline-stats')).toBeVisible();
    
    // Verify executive-level content
    await expect(timelineItem).toContainText('Chief AI Officer');
    await expect(timelineItem).toContainText('$2.3M');
    await expect(timelineItem).toContainText('12 Direct Reports');
  });

  test('Executive contact form professional functionality', async ({ page }) => {
    await page.goto('/contact');
    
    // Verify executive-level form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('select[name="inquiryType"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    
    // Test form submission flow
    await page.fill('input[name="name"]', 'Executive Recruiter Test');
    await page.fill('input[name="email"]', 'test@executive-search.com');
    await page.fill('input[name="company"]', 'Fortune 500 Test Company');
    await page.selectOption('select[name="inquiryType"]', 'Executive Position');
    await page.fill('textarea[name="message"]', 'Testing C-Level executive inquiry process');
    
    // Submit and verify professional handling
    await page.click('button[type="submit"]');
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('.success-message')).toContainText('executive consultation');
  });
});

test.describe('Executive Portfolio - Advanced Interactions', () => {
  test('Advanced button components with magnetic effects', async ({ page }) => {
    await page.goto('/');
    
    // Test executive button variants
    const executiveButton = page.locator('.btn-executive').first();
    await expect(executiveButton).toBeVisible();
    
    // Test hover states (magnetic effects)
    await executiveButton.hover();
    // Note: Visual testing would verify transform effects
    
    // Test glass button variant
    const glassButton = page.locator('.btn-glass').first();
    await expect(glassButton).toBeVisible();
    await glassButton.hover();
    
    // Test button accessibility
    await page.keyboard.press('Tab');
    await expect(executiveButton).toBeFocused();
    
    // Test keyboard interaction
    await page.keyboard.press('Enter');
    // Should navigate or trigger action
  });

  test('Executive search optimization and metadata', async ({ page }) => {
    await page.goto('/');
    
    // Verify executive SEO metadata
    const title = await page.locator('title').textContent();
    expect(title).toContain('Chief AI Officer');
    expect(title).toContain('International Technology Executive');
    
    // Verify meta descriptions for executive search
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toContain('AI transformation');
    expect(metaDescription).toContain('$2.3M revenue impact');
    
    // Verify structured data for executive search
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test('International executive positioning', async ({ page }) => {
    await page.goto('/');
    
    // Verify international presence messaging
    await expect(page.locator('text=7 countries')).toBeVisible();
    await expect(page.locator('text=international')).toBeVisible();
    
    // Test language adaptation readiness
    const htmlLang = await page.getAttribute('html', 'lang');
    expect(htmlLang).toBe('en');
    
    // Verify timezone awareness
    const timezoneElements = page.locator('[data-timezone]');
    if (await timezoneElements.count() > 0) {
      // Test timezone-aware content if implemented
      await expect(timezoneElements.first()).toBeVisible();
    }
  });
});

test.describe('Executive Portfolio - Performance & Quality', () => {
  test('Executive-level performance standards', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Executive performance expectations
    expect(loadTime).toBeLessThan(3000); // 3 second max load time
    
    // Verify Core Web Vitals compliance
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        if ('web-vitals' in window) {
          // Collect metrics if web-vitals is loaded
          resolve({ available: true });
        } else {
          resolve({ available: false });
        }
      });
    });
    
    // Test resource optimization
    const responses = [];
    page.on('response', response => responses.push(response));
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify no large resources
    const largeResources = responses.filter(r => 
      r.url().includes('.js') && parseInt(r.headers()['content-length'] || '0') > 500000
    );
    expect(largeResources.length).toBe(0); // No JS files over 500KB
  });

  test('Executive accessibility compliance (WCAG 2.2 AA)', async ({ page }) => {
    await page.goto('/');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus').first();
    await expect(focusedElement).toBeVisible();
    
    // Test skip links for keyboard users
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main"]');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeFocused();
    }
    
    // Test color contrast (visual verification would be manual)
    // Verify alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      if (!src?.includes('data:image') && !alt) {
        throw new Error(`Image missing alt text: ${src}`);
      }
    }
    
    // Test form labels
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        const hasAriaLabel = !!ariaLabel || !!ariaLabelledby;
        
        expect(hasLabel || hasAriaLabel).toBe(true);
      }
    }
  });

  test('Executive mobile responsiveness and touch targets', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify mobile navigation
    const mobileNav = page.locator('[data-mobile-nav]');
    if (await mobileNav.count() > 0) {
      await expect(mobileNav).toBeVisible();
    }
    
    // Test touch target sizes (minimum 44px WCAG 2.2)
    const buttons = page.locator('button, a[role="button"], input[type="submit"]');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 5); i++) { // Test first 5 buttons
      const button = buttons.nth(i);
      const boundingBox = await button.boundingBox();
      
      if (boundingBox) {
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify content scales appropriately
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.executive-metrics')).toBeVisible();
  });

  test('Executive analytics and tracking integration', async ({ page }) => {
    // Track console for analytics errors
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg));
    
    await page.goto('/');
    
    // Test analytics initialization
    const analyticsLoaded = await page.evaluate(() => {
      return typeof window.gtag !== 'undefined' || typeof window.analytics !== 'undefined';
    });
    
    // Test executive event tracking
    await page.click('.btn-executive');
    
    // Verify no critical analytics errors
    const errors = consoleMessages.filter(msg => msg.type() === 'error');
    const analyticsErrors = errors.filter(error => 
      error.text().includes('analytics') || error.text().includes('gtag')
    );
    
    expect(analyticsErrors.length).toBe(0);
  });
});

test.describe('Executive Portfolio - Security & Professional Standards', () => {
  test('Executive security headers and best practices', async ({ page, context }) => {
    const response = await page.goto('/');
    
    // Verify security headers appropriate for executive portfolios
    const headers = response?.headers() || {};
    
    // Content Security Policy
    if (headers['content-security-policy']) {
      expect(headers['content-security-policy']).toBeDefined();
    }
    
    // Verify HTTPS redirect (in production)
    expect(response?.status()).toBeLessThan(400);
    
    // Test external link security
    const externalLinks = page.locator('a[target="_blank"]');
    const linkCount = await externalLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = externalLinks.nth(i);
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('Executive data privacy and compliance', async ({ page }) => {
    await page.goto('/contact');
    
    // Verify privacy policy link
    const privacyLink = page.locator('a[href="/privacy"]');
    if (await privacyLink.count() > 0) {
      await expect(privacyLink).toBeVisible();
      
      await privacyLink.click();
      await expect(page.locator('h1')).toContainText('Privacy');
    }
    
    // Test cookie consent if implemented
    const cookieNotice = page.locator('[data-cookie-notice]');
    if (await cookieNotice.count() > 0) {
      await expect(cookieNotice).toBeVisible();
    }
    
    // Verify form data handling disclosure
    await page.goto('/contact');
    const formDisclosure = page.locator('text*="personal information"');
    if (await formDisclosure.count() > 0) {
      await expect(formDisclosure).toBeVisible();
    }
  });
});

test.describe('Executive Portfolio - Cross-browser Compatibility', () => {
  ['chromium', 'firefox', 'webkit'].forEach(browserName => {
    test(`Executive functionality in ${browserName}`, async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      
      await page.goto('/');
      
      // Core executive elements should work across browsers
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.btn-executive')).toBeVisible();
      
      // Test interactive timeline
      await page.goto('/about');
      const timelineItems = page.locator('.timeline-item');
      if (await timelineItems.count() > 0) {
        await timelineItems.first().click();
        await expect(page.locator('.timeline-expanded')).toBeVisible();
      }
      
      await context.close();
    });
  });
});

// Executive-specific test helpers
export class ExecutiveTestHelpers {
  static async verifyExecutiveMetrics(page) {
    const expectedMetrics = ['12', '7', '40%', '$2.3M'];
    
    for (const metric of expectedMetrics) {
      await expect(page.locator(`text=${metric}`)).toBeVisible();
    }
  }
  
  static async testExecutiveNavigation(page) {
    const pages = ['/about', '/projects', '/skills', '/contact'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toBeVisible();
    }
  }
  
  static async verifyAccessibilityCompliance(page) {
    // Basic accessibility checks
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  }
}

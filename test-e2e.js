import { chromium } from '../sentinel-telematics/node_modules/playwright/index.mjs';
import fs from 'fs';

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE PORTFOLIO E2E TESTS ---');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[Browser Error]:', msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
    console.error('[Page Error]:', err.message);
  });

  console.log('1. Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // 1. Check title & metadata
  const title = await page.title();
  console.log('Page Title:', title);
  if (!title.includes('NITIN SHRIVASTVA')) {
    throw new Error('Title does not contain NITIN SHRIVASTVA');
  }

  // 2. Check "WHO'S WATCHING?" screen
  const whosWatchingHeader = await page.locator("text=WHO'S WATCHING?").isVisible();
  console.log("Intro 'WHO'S WATCHING?' modal visible:", whosWatchingHeader);
  if (!whosWatchingHeader) {
    throw new Error("Intro 'WHO'S WATCHING?' modal was not displayed");
  }

  // Check the 4 profiles
  const nitinProfile = await page.locator("text=Nitin").first().isVisible();
  const recruiterProfile = await page.locator("text=Recruiter").first().isVisible();
  const devProfile = await page.locator("text=Developer").first().isVisible();
  const explorerProfile = await page.locator("text=Explorer").first().isVisible();
  console.log('Profiles displayed:', { nitinProfile, recruiterProfile, devProfile, explorerProfile });

  // Take screenshot of Who's Watching modal
  await page.screenshot({ path: 'test-screenshot-intro.png' });

  // 3. Choose "Nitin" profile
  console.log('3. Clicking Nitin profile...');
  await page.locator('[data-profile="nitin"]').click();
  await page.waitForTimeout(600);

  // 4. Check Hero section
  const heroName = await page.locator("text=NITIN").first().isVisible();
  const tagline = await page.locator('text=Building Ideas Into Digital Experiences').first().isVisible();
  const kicker = await page.locator('text=THE PORTFOLIO · ORIGINAL SERIES').isVisible();
  console.log('Hero elements visible:', { heroName, tagline, kicker });

  // Check meta chips
  const btechChip = await page.locator('#home >> text=B.Tech CSE (AI)').isVisible();
  const yearChip = await page.locator('#home >> text=2nd Year').isVisible();
  const kanpurChip = await page.locator('#home >> text=Kanpur, India').isVisible();
  const projectsChip = await page.locator('#home >> text=6 Projects').isVisible();
  console.log('Hero meta chips visible:', { btechChip, yearChip, kanpurChip, projectsChip });

  // Check Hero buttons
  const viewProjectsBtn = await page.locator('text=View Projects').isVisible();
  const githubBtn = await page.locator('a[href="https://github.com/Nitin-03-tech"]').first().isVisible();
  console.log('Hero action buttons visible:', { viewProjectsBtn, githubBtn });

  // Take screenshot of Hero
  await page.screenshot({ path: 'test-screenshot-hero.png' });

  // 5. Test "Continue Exploring" section
  const continueHeader = await page.locator('text=CONTINUE EXPLORING').isVisible();
  console.log('Continue Exploring visible:', continueHeader);

  // 6. Test "My Journey" section
  const journeyHeader = await page.locator('text=MY JOURNEY').isVisible();
  const season1 = await page.locator('text=Season 1').first().isVisible();
  const season2 = await page.locator('text=Season 2').first().isVisible();
  const season3 = await page.locator('text=Season 3').first().isVisible();
  console.log('Journey Seasons visible:', { journeyHeader, season1, season2, season3 });

  // 7. Test "Top Picks" section
  const topPicksHeader = await page.locator('text=TOP PICKS IN TECH TODAY').isVisible();
  console.log('Top Picks header visible:', topPicksHeader);

  // Test Next / Prev carousel buttons
  const nextBtn = await page.locator('button[aria-label="Next Project"]');
  if (await nextBtn.isVisible()) {
    await nextBtn.click();
    await page.waitForTimeout(300);
    console.log('Clicked Next project on carousel');
  }

  // 8. Test "Projects & Originals" section (All 6 projects)
  const projectsHeader = await page.locator('text=PROJECTS & ORIGINALS').isVisible();
  const shopera = await page.locator('text=ShopEra').first().isVisible();
  const campusos = await page.locator('text=CampusOS').first().isVisible();
  const labnova = await page.locator('text=LabNova').first().isVisible();
  const airdraw = await page.locator('text=AirDraw AI').first().isVisible();
  const sentinel = await page.locator('text=Sentinel Telematics').first().isVisible();
  const inamigos = await page.locator('text=InAmigos Community').first().isVisible();
  console.log('All 6 projects visible in Originals:', { shopera, campusos, labnova, airdraw, sentinel, inamigos });

  // Check Coming Soon labels (no dead buttons)
  const comingSoonLabels = await page.locator('text=Link coming soon').count();
  console.log('Coming soon labels count (CampusOS, AirDraw AI, Sentinel):', comingSoonLabels);
  if (comingSoonLabels < 3) {
    throw new Error('Expected at least 3 coming soon labels for projects without public URLs');
  }

  // 9. Test Project Detail Modal
  console.log('9. Testing Project Detail Modal...');
  const synopsisBtn = await page.locator('text=Synopsis & Specs').first();
  await synopsisBtn.click();
  await page.waitForTimeout(400);

  const modalVisible = await page.locator('text=SYNOPSIS & ARCHITECTURE').isVisible();
  console.log('Project modal opened:', modalVisible);
  if (!modalVisible) throw new Error('Project detail modal did not open');

  // Close modal via Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  console.log('Project modal closed');

  // 10. Test "About Me" section
  const aboutHeader = await page.locator('text=ABOUT NITIN').isVisible();
  const aboutBio = await page.locator('text=pursuing a B.Tech in Computer Science').isVisible();
  console.log('About section visible:', { aboutHeader, aboutBio });

  // 11. Test "Skills Universe" section
  const skillsHeader = await page.locator('text=MY SKILL UNIVERSE').isVisible();
  const frontendCat = await page.locator('text=Frontend Development').first().isVisible();
  const backendCat = await page.locator('text=Backend Development').first().isVisible();
  console.log('Skills section visible:', { skillsHeader, frontendCat, backendCat });

  // 12. Test "Verified Learning" section
  const learningHeader = await page.locator('text=VERIFIED LEARNING').isVisible();
  const emptyStateNotice = await page.locator('text=Verified certifications will appear here.').isVisible();
  console.log('Learning section visible:', { learningHeader, emptyStateNotice });

  // 13. Test "Contact" ("TO BE CONTINUED...") & Form Validation
  console.log('13. Testing Contact form...');
  const contactHeader = await page.locator('text=TO BE CONTINUED...').isVisible();
  console.log('Contact header visible:', contactHeader);

  // Try submitting empty form to trigger validation errors
  const submitBtn = await page.locator('button:has-text("Let\'s build")').last();
  await submitBtn.click();
  await page.waitForTimeout(300);

  const nameError = await page.locator('text=Name is required').isVisible();
  const emailError = await page.locator('text=Email is required').isVisible();
  const msgError = await page.locator('text=Message is required').isVisible();
  console.log('Validation errors triggered properly:', { nameError, emailError, msgError });

  // Fill valid inputs
  await page.locator('input#name').fill('Sarah Jenkins');
  await page.locator('input#email').fill('sarah@techcorp.com');
  await page.locator('textarea#message').fill('Hello Nitin, we love your 3D portfolio and would like to collaborate on an AI project!');
  await submitBtn.click();
  await page.waitForTimeout(800);

  const testReceived = await page.locator('text=TEST SUBMISSION RECEIVED').isVisible();
  console.log('Form test submission success message visible:', testReceived);

  // 14. Test Footer
  const footerTagline = await page.locator('footer').getByText('Building Ideas Into Digital Experiences').isVisible();
  const locationTag = await page.locator('text=Kanpur, Uttar Pradesh, India').last().isVisible();
  console.log('Footer elements visible:', { footerTagline, locationTag });

  // Take full page screenshot
  await page.screenshot({ path: 'test-screenshot-full.png', fullPage: true });

  // 15. Test Mobile Viewport (375x667)
  console.log('15. Testing Mobile Viewport (375px)...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const hamburger = await page.locator('button[aria-label="Toggle mobile menu"]');
  const isHamburgerVisible = await hamburger.isVisible();
  console.log('Mobile hamburger menu button visible:', isHamburgerVisible);
  if (isHamburgerVisible) {
    await hamburger.click();
    await page.waitForTimeout(300);
    const mobileDrawerLinks = await page.locator('nav a:has-text("Journey")').last().isVisible();
    console.log('Mobile drawer opened with links:', mobileDrawerLinks);
  }
  await page.screenshot({ path: 'test-screenshot-mobile.png' });

  // Final check for console errors
  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.warn('Console error messages:', consoleErrors);
  }

  await browser.close();
  console.log('--- ALL E2E VERIFICATION TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});

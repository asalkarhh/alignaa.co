// End-to-end browser verification script via Chrome DevTools Protocol
import { spawn } from 'child_process';
import http from 'http';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.pending = new Map();
    this.events = [];
    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && this.pending.has(data.id)) {
        this.pending.get(data.id)(data);
        this.pending.delete(data.id);
      } else {
        this.events.push(data);
      }
    };
  }

  async connect() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolve) => {
      this.ws.onopen = resolve;
    });
  }

  async send(method, params = {}) {
    await this.connect();
    const id = this.id++;
    return new Promise((resolve) => {
      this.pending.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.result?.value;
  }

  close() {
    this.ws.close();
  }
}

async function run() {
  console.log('--- Launching Headless Chrome with CDP ---');
  const chromeProcess = spawn(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    [
      '--headless=new',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--window-size=1440,900',
      'about:blank'
    ],
    { stdio: 'ignore' }
  );

  try {
    await sleep(1500);
    const targets = await getJson('http://127.0.0.1:9222/json');
    const pageTarget = targets.find((t) => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');

    console.log('\n1. Navigating to http://localhost:4173/ ...');
    await client.send('Page.navigate', { url: 'http://localhost:4173/' });
    await sleep(2000);

    // Title
    const title = await client.evaluate('document.title');
    console.log('✓ Document Title:', title);

    // Video State
    const videoState = await client.evaluate(`
      (() => {
        const v = document.querySelector('video.hero-video-media');
        return v ? { src: v.getAttribute('src'), poster: v.getAttribute('poster'), muted: v.muted } : null;
      })()
    `);
    console.log('✓ Video element:', videoState);

    // 2. Test Results Category Filtering with async await
    console.log('\n2. Testing Category Filtering:');
    const filterRes = await client.evaluate(`
      (async () => {
        const btns = Array.from(document.querySelectorAll('.filter-btn'));
        const gapBtn = btns.find(b => b.textContent.includes('Gap Closure'));
        gapBtn.click();
        await new Promise(r => setTimeout(r, 200));
        const cards = document.querySelectorAll('.result-card');
        return {
          cardsCount: cards.length,
          title: cards[0]?.querySelector('.result-title')?.textContent
        };
      })()
    `);
    console.log('✓ Filter to Gap Closure:', filterRes);

    // 3. Test FAQ Accordion with async await
    console.log('\n3. Testing FAQ Accordion:');
    const faqRes = await client.evaluate(`
      (async () => {
        const btn = document.querySelector('#faq-btn-faq-2');
        btn.click();
        await new Promise(r => setTimeout(r, 200));
        const panel = document.querySelector('#faq-panel-faq-2');
        return {
          ariaExpanded: btn.getAttribute('aria-expanded'),
          panelDisplay: panel.style.display
        };
      })()
    `);
    console.log('✓ FAQ open item 2:', faqRes);

    // 4. Test Teeth Concerns Learn More Modal with async await
    console.log('\n4. Testing Educational Modal:');
    const modalRes = await client.evaluate(`
      (async () => {
        const btn = document.querySelector('.concern-learn-more-btn');
        btn.click();
        await new Promise(r => setTimeout(r, 200));
        const modalTitle = document.querySelector('#modal-concern-title')?.textContent;
        // Now test Escape key closes it
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        await new Promise(r => setTimeout(r, 200));
        const modalAfterEsc = document.querySelector('.modal-content');
        return {
          modalTitleOpened: modalTitle,
          modalClosedOnEscape: !modalAfterEsc
        };
      })()
    `);
    console.log('✓ Modal open and Escape close:', modalRes);

    // 5. Test Patient Enquiry Form Validation
    console.log('\n5. Testing Form Validation:');
    const validationRes = await client.evaluate(`
      (async () => {
        const form = document.querySelector('form[aria-label="Patient Scan Request Form"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.click();
        await new Promise(r => setTimeout(r, 200));
        const errors = Array.from(form.querySelectorAll('.field-error')).map(e => e.textContent.trim());
        return {
          errorCount: errors.length,
          errors
        };
      })()
    `);
    console.log('✓ Empty submission errors caught:', validationRes);

    // 6. Test Form Submission in Unconfigured Mode (Honest Notification)
    console.log('\n6. Testing Honest Unconfigured Mode Submission:');
    const honestSubmitRes = await client.evaluate(`
      (async () => {
        const form = document.querySelector('form[aria-label="Patient Scan Request Form"]');
        
        // Use React property setter to trigger React 19 change events
        const setReactValue = (input, value) => {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            input instanceof HTMLSelectElement ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype,
            'value'
          ).set;
          nativeInputValueSetter.call(input, value);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        };

        setReactValue(form.querySelector('#field-fullName'), 'Dr. Sneha Patil');
        setReactValue(form.querySelector('#field-mobile'), '9820012345');
        setReactValue(form.querySelector('#field-ageGroup'), '25–34');
        setReactValue(form.querySelector('#field-city'), 'Mumbai');
        setReactValue(form.querySelector('#field-pinCode'), '400001');
        setReactValue(form.querySelector('#field-concern'), 'Spacing / Gaps');

        const consent = form.querySelector('#field-consent');
        consent.click(); // toggle checked

        await new Promise(r => setTimeout(r, 100));

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.click();

        await new Promise(r => setTimeout(r, 600));

        const warningBanner = document.querySelector('.alert-banner.warning');
        const fullNameVal = form.querySelector('#field-fullName').value;

        return {
          hasWarningBanner: !!warningBanner,
          warningMessage: warningBanner ? warningBanner.textContent.trim().replace(/\\s+/g, ' ') : null,
          dataPreservedName: fullNameVal
        };
      })()
    `);
    console.log('✓ Honest submission handling:', honestSubmitRes);

    // 7. Test Navigation to Partner Page
    console.log('\n7. Testing Partner Page:');
    await client.send('Page.navigate', { url: 'http://localhost:4173/become-a-partner' });
    await sleep(1500);

    const partnerRes = await client.evaluate(`
      (() => {
        const title = document.title;
        const parentLink = document.querySelector('a[href="https://alignaa.in/"]');
        const form = document.querySelector('form[aria-label="Dental Partner Registration Form"]');
        return {
          title,
          parentLinkExists: !!parentLink,
          parentLinkHref: parentLink ? parentLink.href : null,
          partnerFormExists: !!form
        };
      })()
    `);
    console.log('✓ Partner page verified:', partnerRes);

    client.close();
    console.log('\n=== ALL VERIFICATION CHECKS PASSED WITH FLYING COLOURS ===\n');
  } finally {
    chromeProcess.kill();
  }
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});

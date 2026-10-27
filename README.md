=Broward360 — HTML, CSS, and JavaScript prototype

Files:
- index.html: page structure
- style.css: visual styles
- script.js: page interactions

How to run:
1. Keep all three files in the same folder.
2. Open index.html in a modern browser. Every tool works this way except reading text from an image.
3. To use "read text from image", serve the folder instead of opening the file directly: run `python3 -m http.server` in this folder, then visit http://localhost:8000. An internet connection is also needed the first time, to download Tesseract.js. If it cannot load, type or paste the text instead.

How the site is organized:
- The home page shows a South Florida illustration and an "All tools" grid with one card per tool.
- Each tool has its own page, reached by a hash link (#report, #scam-checker, #digital-safety, #letter-explainer, #recycle, #food). Each tool page has an "← All tools" link back home, and the top navigation highlights the current page. The browser back button works between pages.

Current features (6 tools):
- Report a Problem: report neighborhood problems such as flooding, potholes, damaged sidewalks, streetlights, signs, bus stops, and public-space issues. Demo reports are saved in localStorage on this browser/device only.
- Scam Checker: looks for warning signs in pasted or typed email/text content, including urgency or threats (such as "your account will be limited"), requests for passwords or security codes, requests to confirm personal or account details, money/gift card/crypto requests, unexpected prizes or advance-fee offers, link or button pressure, generic greetings, impersonation, and look-alike website or email addresses that imitate well-known brands (for example "paypal-accounts.com").
- Digital Safety Coach: lessons about impersonation scams, fake delivery notices, suspicious QR codes, and tech-support scams, plus an interactive quiz. Answers are marked green (✓) when safer and red (✗) when riskier, with an explanation.
- Letter & Bill Explainer: use JavaScript rules to find possible dates, money amounts, and action-related lines in a letter or bill. This is not generative AI and does not fully understand or authenticate a document.
- Recycle Helper: recycling tips for common household items.
- Food Help: food assistance links.

Read text from image (Scam Checker and Letter Explainer):
- Choose a photo, drag and drop it onto the box, or paste a screenshot straight into the text box.
- A preview, a "Remove image" button, and a progress bar are shown while the text is read. The recognized text goes into the text box so you can check and edit it before running the tool. A new image replaces the previous image's text.
- Text recognition runs in the browser with Tesseract.js. It is only downloaded the first time an image is added, and it is pinned to version 5.1.1 with a Subresource Integrity (SRI) hash so the browser rejects a changed file.

Important limitations:
- This is a student prototype, not an official Broward County service.
- Reports are not sent to local government and are not shared with other users.
- Scam checking uses simple pattern matching. It can miss scams and can flag legitimate messages. It does not prove a message is safe or fraudulent.
- Do not upload or paste passwords, bank details, government ID numbers, verification codes, or other private information. Crop/redact sensitive details before using a screenshot or photo.
- The app itself does not send the selected image to a Broward360 server, but the OCR library and its language data are downloaded from a third-party CDN. Do not use sensitive images or documents in a public demo.
- OCR can make mistakes. Verify all extracted details against the original letter or message.
- Confirm current local service details and food resources before relying on them.

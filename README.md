Broward360 — HTML, CSS, and JavaScript prototype

Files:
- index.html: page structure
- style.css: visual styles
- script.js: page interactions

How to run:
1. Keep all three files in the same folder.
2. Open index.html in a modern browser.
3. The scam checker’s image-to-text feature needs an internet connection to load Tesseract.js. If it cannot load, paste or type the message instead.

Current features:
- Report neighborhood problems such as flooding, potholes, damaged sidewalks, streetlights, signs, bus stops, and public-space issues.
- Save demo reports in localStorage on this browser/device only.
- Scam warning-sign checker for pasted or typed email/text content.
- Optional screenshot/photo upload and in-browser OCR (text recognition) using Tesseract.js.
- Recycling tips for common household items.
- Food assistance links.

Important limitations:
- This is a student prototype, not an official Broward County service.
- Reports are not sent to local government and are not shared with other users.
- Scam checking uses simple phrase matching. It can miss scams and can flag legitimate messages. It does not prove a message is safe or fraudulent.
- Do not upload or paste passwords, bank details, government ID numbers, verification codes, or other private information. Crop/redact sensitive details before using a screenshot.
- The app itself does not send the selected image to a Broward360 server, but the OCR library is downloaded from a third-party CDN. Do not use sensitive images in a public demo.
- Confirm current local service details and food resources before relying on them.

- Digital Safety Coach lessons about impersonation scams, fake delivery notices, suspicious QR codes, and tech-support scams.
- Interactive safety quiz with feedback.


- Letter & Bill Explainer: upload a photo, use Tesseract.js OCR to extract text, then use JavaScript rules to identify possible dates, money amounts, and action-related lines. This is not generative AI and does not fully understand or authenticate a document.

Letter feature privacy and safety: crop/redact private details before uploading. OCR is run in the browser using a third-party CDN library; the image is not sent to a Broward360 server. Do not use sensitive documents in a public demo. Verify all extracted details against the original.

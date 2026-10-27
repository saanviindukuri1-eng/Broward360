// Broward360 JavaScript
// This version works without Python or a backend.
// Reports are saved in this browser using localStorage.
// That means they do not automatically appear on other people's devices.

const floodForm = document.getElementById("flood-form");
const floodMessage = document.getElementById("flood-message");
const reportsList = document.getElementById("reports-list");
const refreshButton = document.getElementById("refresh-reports");
const clearButton = document.getElementById("clear-reports");

const STORAGE_KEY = "broward360CommunityReports";

// Read saved reports from this browser.
function getReports() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        return [];
    }
}

// Save reports to this browser.
function saveReports(reports) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

// Display saved flood reports.
function loadReports() {
    const reports = getReports();
    reportsList.replaceChildren();

    if (reports.length === 0) {
        const message = document.createElement("p");
        message.className = "muted";
        message.textContent = "No reports yet. You can submit the first one.";
        reportsList.appendChild(message);
        return;
    }

    reports.forEach(function(report) {
        const card = document.createElement("article");
        card.className = "report-card";

        const badge = document.createElement("span");
        badge.className = "severity";
        badge.textContent = report.severity;

        const type = document.createElement("p");
        type.className = "report-type";
        type.textContent = report.problemType || "Flooding or blocked drain";

        const title = document.createElement("h4");
        title.textContent = report.location;

        const details = document.createElement("p");
        details.textContent = report.details;

        const date = document.createElement("div");
        date.className = "report-meta";
        date.textContent = report.createdAt;

        card.appendChild(type);
        card.appendChild(badge);
        card.appendChild(title);
        card.appendChild(details);
        card.appendChild(date);
        reportsList.appendChild(card);
    });
}

// Save a new report when the form is submitted.
floodForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const problemType = document.getElementById("problem-type").value;
    const location = document.getElementById("location").value.trim();
    const severity = document.getElementById("severity").value;
    const details = document.getElementById("details").value.trim();

    if (!location || !details) {
        floodMessage.textContent = "Please fill in the location and description.";
        return;
    }

    const newReport = {
        problemType: problemType,
        location: location,
        severity: severity,
        details: details,
        createdAt: new Date().toLocaleString()
    };

    const reports = getReports();
    reports.unshift(newReport);
    saveReports(reports);

    floodMessage.textContent = "Demo report saved in this browser. It has not been sent to the county or other users.";
    floodForm.reset();
    loadReports();
});

refreshButton.addEventListener("click", loadReports);

// Remove saved demo reports after the user confirms.
clearButton.addEventListener("click", function() {
    const shouldClear = confirm("Clear all Broward360 demo reports saved in this browser?");
    if (shouldClear) {
        localStorage.removeItem(STORAGE_KEY);
        loadReports();
        floodMessage.textContent = "Saved demo reports cleared.";
    }
});

// General recycling advice for common household items.
const recyclingTips = {
    plastic: {
        title: "Plastic bottle",
        text: "Empty it and check your local recycling rules. Many programs accept certain plastic bottles. Keep loose plastic bags out of curbside recycling."
    },
    cardboard: {
        title: "Clean cardboard box",
        text: "Flatten it and keep it dry. Clean cardboard is commonly recyclable, but local collection rules can differ."
    },
    pizza: {
        title: "Greasy pizza box",
        text: "Greasy or food-soiled sections may not be accepted with paper recycling. Separate clean cardboard if your local program allows it."
    },
    bag: {
        title: "Plastic shopping bag",
        text: "Do not place plastic bags in many curbside recycling bins because they can jam sorting equipment. Check whether a store offers a bag take-back program."
    },
    battery: {
        title: "Household battery",
        text: "Do not assume batteries belong in your curbside bin. Check local household hazardous waste or battery drop-off guidance."
    },
    glass: {
        title: "Glass bottle or jar",
        text: "Check your local program before recycling glass; acceptance varies by area. Empty the container first and follow local preparation rules."
    },
    food: {
        title: "Food scraps",
        text: "Food scraps usually do not belong in a regular recycling bin. If available, use a permitted composting option or follow your waste provider's instructions."
    }
};

const itemChoice = document.getElementById("item-choice");
const recycleResult = document.getElementById("recycle-result");

itemChoice.addEventListener("change", function() {
    const tip = recyclingTips[itemChoice.value];

    if (!tip) {
        recycleResult.replaceChildren();

        const icon = document.createElement("span");
        icon.className = "result-icon";
        icon.textContent = "♻️";

        const content = document.createElement("div");
        const heading = document.createElement("h3");
        heading.textContent = "Your recycling tip will appear here";
        const paragraph = document.createElement("p");
        paragraph.textContent = "Select an item above to get started.";

        content.appendChild(heading);
        content.appendChild(paragraph);
        recycleResult.appendChild(icon);
        recycleResult.appendChild(content);
        return;
    }

    recycleResult.replaceChildren();

    const icon = document.createElement("span");
    icon.className = "result-icon";
    icon.textContent = "♻️";

    const content = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = tip.title;
    const paragraph = document.createElement("p");
    paragraph.textContent = tip.text;

    content.appendChild(heading);
    content.appendChild(paragraph);
    recycleResult.appendChild(icon);
    recycleResult.appendChild(content);
});

// These are starter listings. Confirm details before relying on them.
const foodResources = [
    {
        name: "Feeding South Florida",
        area: "South Florida food assistance",
        description: "Visit the official website to look for food assistance programs and local partner agencies.",
        url: "https://feedingsouthflorida.org/"
    },
    {
        name: "211 Broward",
        area: "Broward County community services",
        description: "Find food assistance and other local support through Broward's free, confidential community helpline and resource directory.",
        url: "https://www.211-broward.org/"
    }
];

// Create food resource cards on the page.
function loadFoodResources() {
    const foodList = document.getElementById("food-list");
    foodList.replaceChildren();

    foodResources.forEach(function(resource) {
        const card = document.createElement("article");
        card.className = "food-card-item";

        const area = document.createElement("p");
        area.className = "food-area";
        area.textContent = resource.area;

        const heading = document.createElement("h3");
        heading.textContent = resource.name;

        const description = document.createElement("p");
        description.textContent = resource.description;

        const link = document.createElement("a");
        link.href = resource.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Visit official website ↗";

        card.appendChild(area);
        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(link);
        foodList.appendChild(card);
    });
}

// Start the page features.
loadReports();
loadFoodResources();


// Scam-checker prototype: OCR runs in the browser, then simple rules flag warning signs.
// This is educational guidance, not a definitive scam detector.
const scamImageInput = document.getElementById("scam-image");
const imagePreviewWrap = document.getElementById("image-preview-wrap");
const scamImagePreview = document.getElementById("scam-image-preview");
const readImageButton = document.getElementById("read-image-button");
const ocrStatus = document.getElementById("ocr-status");
const scamText = document.getElementById("scam-text");
const checkScamButton = document.getElementById("check-scam-button");
const scamResults = document.getElementById("scam-results");
const scamIntro = document.getElementById("scam-intro");

scamImageInput.addEventListener("change", function() {
    const file = scamImageInput.files && scamImageInput.files[0];
    if (!file) {
        imagePreviewWrap.hidden = true;
        scamImagePreview.removeAttribute("src");
        readImageButton.disabled = true;
        return;
    }

    if (!file.type.startsWith("image/")) {
        ocrStatus.textContent = "Please choose an image file.";
        scamImageInput.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        scamImagePreview.src = event.target.result;
        imagePreviewWrap.hidden = false;
        readImageButton.disabled = false;
        ocrStatus.textContent = "Image ready. Select “Read text from image” to try text recognition.";
    };
    reader.readAsDataURL(file);
});

readImageButton.addEventListener("click", async function() {
    const file = scamImageInput.files && scamImageInput.files[0];
    if (!file) return;

    if (!window.Tesseract) {
        ocrStatus.textContent = "Text recognition could not load. You can still type or paste the message below.";
        return;
    }

    readImageButton.disabled = true;
    ocrStatus.textContent = "Reading the image… this can take a little while.";
    try {
        const result = await Tesseract.recognize(file, "eng", {
            logger: function(message) {
                if (message.status === "recognizing text") {
                    ocrStatus.textContent = "Reading text: " + Math.round((message.progress || 0) * 100) + "%";
                }
            }
        });
        const extractedText = result.data.text.trim();
        if (extractedText) {
            scamText.value = [scamText.value.trim(), extractedText].filter(Boolean).join("\n\n");
            ocrStatus.textContent = "Text extracted. Review it for mistakes, then select “Check warning signs.”";
        } else {
            ocrStatus.textContent = "Couldn't read much text from this image. Try a clearer screenshot or type the message below.";
        }
    } catch (error) {
        ocrStatus.textContent = "Couldn't read this image. Try a clearer screenshot or type/paste the message below.";
    } finally {
        readImageButton.disabled = false;
    }
});

function analyzeScamMessage(message) {
    const text = message.toLowerCase();
    const checks = [
        {
            label: "Urgency or threats",
            pattern: /act now|immediately|urgent|final warning|account.{0,20}(suspend|close|locked)|will be (closed|suspended|arrested)|within 24 hours|today only/,
            explanation: "The message pressures you to act quickly or threatens a consequence. Scammers often try to stop people from checking first."
        },
        {
            label: "Requests for passwords or security codes",
            pattern: /password|one[- ]time code|verification code|security code|passcode|login code/,
            explanation: "The message mentions sensitive sign-in information. Do not share passwords or one-time verification codes with someone who contacts you unexpectedly."
        },
        {
            label: "Money, gift cards, or cryptocurrency",
            pattern: /gift card|bitcoin|cryptocurrency|crypto|wire transfer|cash app|zelle|payment required|pay now|send money|processing fee/,
            explanation: "The message mentions payment methods or payment pressure that can be associated with scams. Verify independently before paying."
        },
        {
            label: "Suspicious prize or unexpected reward",
            pattern: /you (have )?won|winner|claim your prize|free gift|lottery|inheritance|reward waiting/,
            explanation: "Unexpected prizes, winnings, or inheritances can be used to lure people into sharing information or paying fees."
        },
        {
            label: "Link or attachment pressure",
            pattern: /click (here|the link|below)|open the attachment|verify your account|update your payment|confirm your details/,
            explanation: "The message asks you to click, open, verify, or update something. Instead, navigate to the official site yourself or call a known official number."
        },
        {
            label: "Impersonation or unusual request",
            pattern: /pretend|impersonat|this is (the )?(irs|social security|police)|gift cards for my boss|keep this (secret|confidential)|don't tell anyone/,
            explanation: "Scammers may pretend to be an agency, authority, family member, or employer, or ask you to keep a request secret."
        }
    ];

    const matches = checks.filter(function(check) {
        return check.pattern.test(text);
    });

    let level;
    let summary;
    if (matches.length >= 3) {
        level = "Several warning signs found";
        summary = "This message has multiple patterns commonly seen in scams. Do not act on it until you verify it through a trusted, independent contact method.";
    } else if (matches.length >= 1) {
        level = "Some warning signs found";
        summary = "This message contains one or more patterns worth checking. That does not prove it is a scam, but pause and verify independently.";
    } else {
        level = "No listed warning signs found";
        summary = "The checker did not spot the warning signs it looks for. That does NOT mean the message is safe; sophisticated scams may look normal.";
    }

    return { level: level, summary: summary, matches: matches };
}

checkScamButton.addEventListener("click", function() {
    const message = scamText.value.trim();
    scamResults.replaceChildren();

    if (!message) {
        scamIntro.textContent = "Add a screenshot or paste/type the message first.";
        return;
    }

    const result = analyzeScamMessage(message);
    scamIntro.textContent = result.summary;

    const heading = document.createElement("h4");
    heading.textContent = result.level;
    scamResults.appendChild(heading);

    if (result.matches.length === 0) {
        const paragraph = document.createElement("p");
        paragraph.textContent = "No matching phrases were detected by this simple checker. Be cautious anyway.";
        scamResults.appendChild(paragraph);
    } else {
        const list = document.createElement("ul");
        list.className = "scam-warning-list";
        result.matches.forEach(function(match) {
            const item = document.createElement("li");
            const strong = document.createElement("strong");
            strong.textContent = match.label + ": ";
            item.appendChild(strong);
            item.appendChild(document.createTextNode(match.explanation));
            list.appendChild(item);
        });
        scamResults.appendChild(list);
    }

    const reminder = document.createElement("p");
    reminder.className = "scam-reminder";
    reminder.textContent = "If you already shared money or account details, contact your bank or account provider using a trusted number as soon as possible.";
    scamResults.appendChild(reminder);
});


// Digital Safety Coach practice quiz
const safetyQuestions = [
    {
        question: "A text says your delivery is held until you pay a small fee through its link. What is the safest next step?",
        answers: [
            { text: "Tap the link because the fee is small.", correct: false, feedback: "Scammers often use small fees to collect payment details. Check the order through the retailer or carrier's official app/site instead." },
            { text: "Check the order through the retailer or carrier's official app/site.", correct: true, feedback: "Correct. Open the official app or type the known website address yourself instead of using an unexpected link." },
            { text: "Reply with my address to confirm delivery.", correct: false, feedback: "Avoid sending personal information in response to an unexpected message. Verify the delivery independently." }
        ]
    },
    {
        question: "A pop-up says your computer is infected and tells you to call a support number on the screen. What should you do?",
        answers: [
            { text: "Call right away so the computer is protected.", correct: false, feedback: "Scammers use alarming pop-ups to pressure people. Don't call the number shown or grant remote access." },
            { text: "Close the page and contact a trusted support provider independently.", correct: true, feedback: "Correct. Use a support contact you find independently, not one supplied by a pop-up." },
            { text: "Give the caller remote access if they sound professional.", correct: false, feedback: "A professional tone does not prove identity. Unexpected callers should not be given remote access." }
        ]
    },
    {
        question: "Someone claiming to be from your bank asks for a one-time sign-in code. What is the safest response?",
        answers: [
            { text: "Read the code to them if they know my name.", correct: false, feedback: "A name is not proof of identity. Never share one-time sign-in codes with someone who contacts you." },
            { text: "End the conversation and call the bank using a trusted number.", correct: true, feedback: "Correct. Contact the bank using the number on your card or its official website." },
            { text: "Send the code only if they say it is urgent.", correct: false, feedback: "Urgency is a common pressure tactic. Keep the code private and verify independently." }
        ]
    },
    {
        question: "You see a QR code on an unexpected sticker that promises a prize. What should you do?",
        answers: [
            { text: "Scan it and enter my details to claim the prize.", correct: false, feedback: "Unexpected prizes can be bait. Don't enter login or payment details after scanning an untrusted QR code." },
            { text: "Avoid entering information and verify the offer independently.", correct: true, feedback: "Correct. A QR code can hide its destination. Treat unexpected offers cautiously and verify them through a trusted source." },
            { text: "Trust it if the QR code looks professionally printed.", correct: false, feedback: "Appearance doesn't prove a code is legitimate. Check the destination and avoid entering sensitive information." }
        ]
    }
];
let safetyQuestionIndex = 0;

function renderSafetyQuestion() {
    const question = safetyQuestions[safetyQuestionIndex];
    document.getElementById("safety-question").textContent = question.question;
    const optionsContainer = document.querySelector(".safety-options");
    optionsContainer.replaceChildren();
    question.answers.forEach(function(answer) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "safety-option";
        button.textContent = answer.text;
        button.addEventListener("click", function() {
            const feedback = document.getElementById("safety-feedback");
            feedback.textContent = (answer.correct ? "Correct! " : "Not the safest choice. ") + answer.feedback;
            feedback.className = "form-message " + (answer.correct ? "safety-correct" : "safety-caution");
            optionsContainer.querySelectorAll("button").forEach(function(option) {
                option.disabled = true;
            });
        });
        optionsContainer.appendChild(button);
    });
    const feedback = document.getElementById("safety-feedback");
    feedback.textContent = "Choose an answer to see why it is safer or riskier.";
    feedback.className = "form-message";
}
document.getElementById("next-safety-question").addEventListener("click", function() {
    safetyQuestionIndex = (safetyQuestionIndex + 1) % safetyQuestions.length;
    renderSafetyQuestion();
});
renderSafetyQuestion();


// Letter & bill explainer prototype: Tesseract.js OCR plus simple rules, not generative AI.
const letterImageInput = document.getElementById("letter-image");
const letterPreviewWrap = document.getElementById("letter-image-preview-wrap");
const letterImagePreview = document.getElementById("letter-image-preview");
const readLetterButton = document.getElementById("read-letter-button");
const letterOcrStatus = document.getElementById("letter-ocr-status");
const letterText = document.getElementById("letter-text");
const explainLetterButton = document.getElementById("explain-letter-button");
const letterIntro = document.getElementById("letter-intro");
const letterResults = document.getElementById("letter-results");

letterImageInput.addEventListener("change", function() {
    const file = letterImageInput.files && letterImageInput.files[0];
    if (!file) {
        letterPreviewWrap.hidden = true;
        readLetterButton.disabled = true;
        return;
    }
    if (!file.type.startsWith("image/")) {
        letterOcrStatus.textContent = "Please choose an image file.";
        letterImageInput.value = "";
        return;
    }
    const reader = new FileReader();
    reader.onload = function() {
        letterImagePreview.src = reader.result;
        letterPreviewWrap.hidden = false;
        readLetterButton.disabled = false;
        letterOcrStatus.textContent = "Image ready. Select “Extract text from photo.”";
    };
    reader.readAsDataURL(file);
});

readLetterButton.addEventListener("click", async function() {
    const file = letterImageInput.files && letterImageInput.files[0];
    if (!file) return;
    if (!window.Tesseract) {
        letterOcrStatus.textContent = "Text recognition could not load. You can paste or type the text instead.";
        return;
    }
    readLetterButton.disabled = true;
    letterOcrStatus.textContent = "Extracting text… this can take a little while.";
    try {
        const result = await Tesseract.recognize(file, "eng", {
            logger: function(message) {
                if (message.status === "recognizing text") {
                    letterOcrStatus.textContent = "Reading text: " + Math.round((message.progress || 0) * 100) + "%";
                }
            }
        });
        const extractedText = (result.data.text || "").trim();
        if (extractedText) {
            letterText.value = [letterText.value.trim(), extractedText].filter(Boolean).join("\n\n");
            letterOcrStatus.textContent = "Text extracted. Review and correct OCR mistakes before checking key information.";
        } else {
            letterOcrStatus.textContent = "No readable text found. Try a clearer photo or paste the text manually.";
        }
    } catch (error) {
        letterOcrStatus.textContent = "Could not read this image. Try a clearer photo or paste the text manually.";
    } finally {
        readLetterButton.disabled = false;
    }
});

function analyzeLetter(text) {
    const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
    const datePattern = /\b(?:\d{1,2}[/-]\d{1,2}[/-](?:\d{2}|\d{4})|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:,?\s+\d{4})?|\d{1,2}\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:\s+\d{4})?)\b/gi;
    const amountPattern = /(?:\$\s?\d[\d,]*(?:\.\d{2})?|\b\d[\d,]*\.\d{2}\s?(?:USD|dollars?)?\b)/gi;
    const actionPattern = /\b(due|deadline|respond|response|submit|return|pay|payment|past due|overdue|contact|call|appeal|renew|renewal|provide|send|upload|schedule|appointment|required|must|within|before|by\s+[A-Za-z0-9])/i;
    const deadlineLines = lines.filter(line => actionPattern.test(line) && (datePattern.test(line) || /\b(due|deadline|respond|response|submit|return|pay|payment|past due|overdue|within|before|by\s+)/i.test(line)));
    // Reset global-regex state when testing across multiple lines.
    const dates = [...new Set((text.match(datePattern) || []))];
    const amounts = [...new Set((text.match(amountPattern) || []))];
    const actionLines = [...new Set(lines.filter(line => actionPattern.test(line)))].slice(0, 8);
    return { dates: dates.slice(0, 12), amounts: amounts.slice(0, 12), actionLines, deadlineLines: deadlineLines.slice(0, 8) };
}

function addLetterResultSection(container, headingText, items, emptyText) {
    const section = document.createElement("section");
    section.className = "letter-result-group";
    const heading = document.createElement("h4");
    heading.textContent = headingText;
    section.appendChild(heading);
    if (!items.length) {
        const p = document.createElement("p");
        p.className = "muted";
        p.textContent = emptyText;
        section.appendChild(p);
    } else {
        const list = document.createElement("ul");
        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
        section.appendChild(list);
    }
    container.appendChild(section);
}

explainLetterButton.addEventListener("click", function() {
    const text = letterText.value.trim();
    letterResults.replaceChildren();
    if (!text) {
        letterIntro.textContent = "Please upload a photo and extract the text, or paste the letter text first.";
        return;
    }
    const findings = analyzeLetter(text);
    letterIntro.textContent = "Here are possible key details found in the text. OCR and rule-based matching can make mistakes, so compare each item with the original letter.";
    addLetterResultSection(letterResults, "Plain-language overview", [
        "This tool has identified possible dates, money amounts, and action-related wording; it has not fully interpreted or verified the document.",
        "Read the original letter to determine what applies to you. If anything is unclear, contact the sender using contact details you find independently."
    ], "No overview available.");
    addLetterResultSection(letterResults, "Possible dates or deadlines", findings.dates, "No dates were confidently detected. A deadline may still be present in the original letter.");
    addLetterResultSection(letterResults, "Possible amounts", findings.amounts, "No money amounts were detected.");
    addLetterResultSection(letterResults, "Lines that may describe an action", findings.actionLines, "No obvious action-related phrases were detected. Review the entire letter carefully.");
});
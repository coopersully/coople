const badgeColors = [
    "#FF6961",  // Red
    "#FFB347",  // Orange
    "#FDFD96",  // Yellow
    "#77DD77",  // Green
    "#42A5F5",  // Blue
    "#5C6BC0",  // Indigo
    "#AB47BC",  // Violet
    "#EC407A",  // Pink
    "#26A69A",  // Teal
    "#9CCC65",  // Light Green
    "#D4E157",  // Lime
    "#FFEE58",  // Light Yellow
    "#FFCA28",  // Amber
    "#FF7043",  // Deep Orange
    "#8D6E63",  // Brown
    "#BDBDBD"   // Gray
];

let badgeCount = 0;

// Get the corresponding color for a badge number
function getBadgeColor(badgeCount) {
    return badgeColors[badgeCount % badgeColors.length];
}

// Function to add a badge
function addBadge(text) {
    let badge = document.createElement('span');
    badge.className = 'game-badge mx-2 my-2';
    badge.style = 'background: ' + getBadgeColor(badgeCount);
    badge.textContent = text;
    document.getElementById('badges').appendChild(badge);
    badgeCount++;
}

// Function to delete all existing badges
function clearBadges() {
    badgeCount = 0;
    document.getElementById('badges').replaceChildren();
}

// Function to calculate and add all possible badges
function addAllBadges(word) {
    word = word.toLowerCase().trim();

    const isSingleWord = !word.includes(' ');
    if (isSingleWord) {
        addBadge('Single Word');
    } else {
        addBadge('Multiple Words');
    }

    const specialCharsMatch = word.match(/[^a-zA-Z0-9 ]/);
    if (specialCharsMatch) {
        addBadge('Contains Special Characters');
    }

    const numbersMatch = word.match(/\d/);
    if (numbersMatch) {
        addBadge('Contains Numbers');

        if (word === numbersMatch.join('')) {
            addBadge('Only Numbers');
        } else {
            addBadge('Alphanumeric');
        }
    } else {
        addBadge('Alphabetical');
    }

    if (/^[!@#$%^&*(),.?":{}|<>]/.test(word)) {
        addBadge('Contains Punctuation');
    }

    if (/[\u00C0-\u017F]/.test(word)) {
        addBadge('Contains Accented Characters');
    }

    if (/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(word)) {
        addBadge('Contains Emoji');
    }
}

// Refreshes all badges
function calculateBadges(word) {
    clearBadges();
    addAllBadges(word);
}
function colorize(text, randomize = false) {
    let colorizedText = '';
    let words = text.split(' ');
    words.forEach((word, wordIndex) => {
        let wordContent = '';
        for (let i = 0; i < word.length; i++) {
            let color = randomize ? badgeColors[Math.floor(Math.random() * badgeColors.length)] : getBadgeColor(i);
            let darkColor = darkenColor(color, 20); // Darken by 20%
            let rotation = Math.floor(Math.random() * 31) - 15; // Random rotation between -15 and 15 degrees
            wordContent += `<span style="color: ${color}; text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 0 ${darkColor}, -1px 1px 0 ${darkColor}, 1px 1px 0 ${darkColor}, 1px -1px 0 ${darkColor}, -1px 0px 0 ${darkColor}, 1px 0px 0 ${darkColor}, 0px -1px 0 ${darkColor}, 0px 1px 0 ${darkColor}; transform: rotate(${rotation}deg); display: inline-block; margin-right: 2px;">${word[i]}</span>`;
        }
        colorizedText += `<span style="white-space: nowrap;">${wordContent}</span>` + (wordIndex < words.length - 1 ? ' ' : '');
    });
    return colorizedText;
}

function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) - amt,
        G = (num >> 8 & 0x00FF) - amt,
        B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

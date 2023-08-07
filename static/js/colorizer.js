function colorize(text) {
    let colorizedText = '';
    for (let i = 0; i < text.length; i++) {
        let color = getBadgeColor(i);
        let darkColor = darkenColor(color, 20); // Darken by 20%
        colorizedText += '<span style="color: ' + color + '; text-shadow: 0 1px ' + darkColor + ', 0 2px ' + darkColor + ', 0 3px ' + darkColor + ', 0 4px ' + darkColor + ', 0 5px ' + darkColor + ';">' + text[i] + '</span>';
    }
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

function colorizeRandomly(text) {
    let colorizedText = '';
    for (let i = 0; i < text.length; i++) {
        let color = badgeColors[Math.floor(Math.random() * badgeColors.length)];
        let darkColor = darkenColor(color, 20); // Darken by 20%
        colorizedText += '<span style="color: ' + color + '; text-shadow: 0 1px ' + darkColor + ', 0 2px ' + darkColor + ', 0 3px ' + darkColor + ', 0 4px ' + darkColor + ', 0 5px ' + darkColor + ';">' + text[i] + '</span>';
    }
    return colorizedText;
}

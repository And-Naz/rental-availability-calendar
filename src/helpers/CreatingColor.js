export function GetRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 16)];
	}
	return color;
}

export function invertColor(hex) {
	if (hex.indexOf('#') === 0) {
		hex = hex.slice(1);
	}
	// convert 3-digit hex to 6-digits.
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	if (hex.length !== 6) {
		throw new Error('Invalid HEX color.');
	}
	// invert color components
	var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
		g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
		b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
	// pad each with zeros and return
	return '#' + padZero(r) + padZero(g) + padZero(b);
}

export function padZero(str, len) {
	len = len || 2;
	var zeros = new Array(len).join('0');
	return (zeros + str).slice(-len);
}

export function GenerateOppositeColors() {
	const color = GetRandomColor();
	return [color, invertColor(color)]
}

export function GetColoresAndOpositesByCount(count) {
	if (!count || count === 0 || count === 1) {
		return GenerateOppositeColors();
	}
	let colorsQty = 1;
	let colors = []
	let oposites = []
	while (colorsQty <= count) {
		let [color, oposite] = GenerateOppositeColors();
		if (colors.includes(color)) { continue }
		colors.push(color)
		oposites.push(oposite)
		colorsQty++
	}
	return colors.map((color, i) => {
		return [color, oposites[i]]
	})
}
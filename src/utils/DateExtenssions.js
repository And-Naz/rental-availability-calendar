
function $formatDate(format = "MM/DD/YYYY") {
	const map = {
		M: (this.getMonth() + 1).toString(),
		MM: (this.getMonth() + 1).toString().padStart(2, '0'),
		D: this.getDate().toString(),
		DD: this.getDate().toString().padStart(2, '0'),
		YY: this.getFullYear().toString().slice(-2),
		YYYY: this.getFullYear(),
		h: this.getHours().toString(),
		hh: this.getHours().toString().padStart(2, '0'),
		m: this.getMinutes().toString(),
		mm: this.getMinutes().toString().padStart(2, '0'),
		s: this.getSeconds().toString(),
		ss: this.getSeconds().toString().padStart(2, '0'),
	}
	return format.replace(/MM|M|DD|D|YYYY|YY|hh|h|mm|m|ss|s/gi, matched => map[matched])
}
function $getWeekdayName() {
	return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(this)
}
function $dayAddedDate(days) {
	let newDate = new Date(this.valueOf());
	newDate.setDate(newDate.getDate() + days);
	return newDate;
}
function $GenerateDateRange(date, addition) {
	return Array.apply(null, { length: addition }).map((_, i) => {
		return date.$dayAddedDate(i)
	})
}
function $GenerateDateRangeToEndDate(date, endDate) {
	let addition = Math.ceil((endDate - date) / (1000 * 60 * 60 * 24))
	let tmpDateRange = Array.apply(null, { length: addition }).map((_, i) => {
		return date.$dayAddedDate(i)
	})
	return tmpDateRange.filter(d => d <= endDate)
}
function $GetDateDifferenceByDay(dateStart, dateEnd) {
	return Math.ceil(((((dateEnd - dateStart) / 1000) / 60) / 60) / 24)
}
Object.defineProperty(Date.prototype, "$formatDate", { value: $formatDate })
Object.defineProperty(Date.prototype, "$getWeekdayName", { value: $getWeekdayName })
Object.defineProperty(Date.prototype, "$dayAddedDate", { value: $dayAddedDate })
Object.defineProperty(Date, "$GenerateDateRange", { value: $GenerateDateRange })
Object.defineProperty(Date, "$GenerateDateRangeToEndDate", { value: $GenerateDateRangeToEndDate })
Object.defineProperty(Date, "$GetDateDifferenceByDay", { value: $GetDateDifferenceByDay })
Object.defineProperty(Date, "$Current", { get: () => new Date() })
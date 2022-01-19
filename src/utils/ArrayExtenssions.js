function $removeByIndex(id) {
    if(id < 0) {return []}
    if(id === 0) {return this.slice(1)}
    if(id === this.length - 1) {return this.slice(0, id)}
    if(id >= this.length) {return []}
    return [...(this.slice(0, id)), ...(this.slice(id + 1))];
}
Object.defineProperty(Array.prototype, "$removeByIndex", { value: $removeByIndex })
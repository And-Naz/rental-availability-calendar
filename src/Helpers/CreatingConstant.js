export function elemGen(...args) { return {name: args[0], value: args[1], desc: args[2]}}
export function CreatingConstant() {
    return Array.prototype.reduce.call(arguments, (acc, elem) => {
        const {name, value, desc} = elem;
        if(acc[name]) {throw new Error(`The constant ${name} already exists!`)}
        acc[name] = value;
        acc.list.push({value, desc})
        return acc
    }, {list: []})
}
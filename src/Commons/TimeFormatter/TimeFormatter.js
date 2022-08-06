function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

export function toStringByFormatting(source) {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    const hour = leftPad(source.getHours());
    const min = leftPad(source.getMinutes());
    const sec = leftPad(source.getSeconds());
    return [year, month, day].join('-') + ' ' + [hour, min, sec].join(':');
}

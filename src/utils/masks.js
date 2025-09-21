export function onInputPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);
    let formattedValue = "";

    if (value.length >= 7) {
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
    } else if (value.length >= 3) {
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3)} `;
    } else if (value.length >= 2) {
        formattedValue = `(${value.slice(0, 2)}) `;
    } else if (value.length > 0) {
        formattedValue = `(${value.slice(0, 2)}`;
    }

    event.target.value = formattedValue;
}

export function onInputCpf(event) {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);
    let formattedValue = "";

    if (value.length >= 9) {
        formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length >= 6) {
        formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length >= 3) {
        formattedValue = `${value.slice(0, 3)}.${value.slice(3)}`;
    } else if (value.length > 0) {
        formattedValue = value;
    }

    event.target.value = formattedValue;
}
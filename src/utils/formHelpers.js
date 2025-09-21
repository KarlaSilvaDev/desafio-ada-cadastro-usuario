const $ = (id) => document.getElementById(id);

export function showErrorMessage(fieldId, message) {
    $(fieldId).innerHTML = `<span class="material-icons text-xl">error_outline</span> ${message}`;
}

export function clearField(fieldId) {
    $(fieldId).value = '';
}

export function clearFieldErrorMessage(errorMessageId) {
    $(errorMessageId).textContent = "";
}

export function clearAllErrorMessages(selector = ".text-red-500") {
    document.querySelectorAll(selector).forEach(element => element.textContent = "");
}

export function togglePassword(inputId, iconId) {
    const input = $(inputId);
    const icon = $(iconId);

    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = 'visibility';
    } else {
        input.type = "password";
        icon.innerHTML = 'visibility_off';
    }
}



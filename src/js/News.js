function validateEmailForm() {
    // Get the email input and error display elements
    let emailInput = document.getElementById('newsletterForm').value.trim();
    let errorDisplay = document.getElementById('emailError');

    // Validate the email format
    if (!isEmailValid(emailInput)) {
        errorDisplay.innerHTML = "Please enter a valid email address.";
        return false; // Invalid email
    } else {
        errorDisplay.innerHTML = ""; // Clear any previous error message
        return true; // Valid email entered
    }

    // Check if the email format is valid
    function isEmailValid(email) {
        const atSignIndex = email.indexOf('@');

        // Ensure the email contains an '@' sign at a valid position
        if (atSignIndex <= 0 || atSignIndex === email.length - 1) {
            return false;
        }

        const localPart = email.slice(0, atSignIndex);
        const domainPart = email.slice(atSignIndex + 1);

        // Validate both local and domain parts
        if (localPart.length === 0 || domainPart.length === 0) {
            return false;
        }

        const firstDotIndex = domainPart.indexOf('.');
        if (firstDotIndex <= 0 || firstDotIndex === domainPart.length - 1) {
            return false; // Ensure there is at least one dot in the domain
        }

        // Validate local and domain parts using helper functions
        return isValidLocalPart(localPart) && isValidDomainPart(domainPart);
    }

    // Validate the local part of the email
    function isValidLocalPart(localPart) {
        const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&'*+/=?^_`{|}~-";

        // Check each character in the local part
        for (let char of localPart) {
            if (!validCharacters.includes(char)) {
                return false; // Invalid character found
            }
        }
        return true; // All characters are valid
    }

    // Validate the domain part of the email
    function isValidDomainPart(domainPart) {
        const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.";

        // Check each character in the domain part
        for (let char of domainPart) {
            if (!validCharacters.includes(char)) {
                return false; // Invalid character found
            }
        }

        // Check for consecutive dots in the domain
        if (domainPart.includes('..')) {
            return false; // No consecutive dots allowed
        }
        return true; // All characters in the domain part are valid
    }
}


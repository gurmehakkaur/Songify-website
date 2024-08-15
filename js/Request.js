function validateForm() {
    let errorDisplay = document.getElementById('emailError');
    let isValid = true;

    // Validate Artist Name - Must not be empty or contain only spaces
    const artistName = document.getElementById('artistName').value.trim();
    if (artistName === "") {
        errorDisplay.innerHTML = "Please provide the Artist's Name.";
        isValid = false;
    }

    // Validate Social Media URLs - Each URL must be valid
    const socialMediaUrls = document.getElementById('socialMedia').value.trim().split('\n');
    for (let i = 0; i < socialMediaUrls.length; i++) {
        const url = socialMediaUrls[i].trim();
        if (url !== "" && !isValidUrl(url)) {
            errorDisplay.innerHTML = `Invalid Social Media URL: ${url}`;
            isValid = false; 
            break;
        }
    }

    // Validate Song/Video URLs - Each must be valid if provided
    const songVideoInputs = document.getElementsByClassName('songVideoUrl');
    for (let i = 0; i < songVideoInputs.length; i++) {
        const url = songVideoInputs[i].value.trim();
        if (url !== "" && !isValidUrl(url)) {
            errorDisplay.innerHTML = `Invalid Song/Video URL: ${url}`;
            isValid = false;
            break;
        }
    }

    return isValid; // Return true if all validations succeed, false otherwise

    function isValidUrl(url) {
        // Validate URL for http or https protocols
        const protocolIndex = url.indexOf('://');
        if (protocolIndex <= 0 || 
            (url.slice(0, protocolIndex) !== 'http' && url.slice(0, protocolIndex) !== 'https')) {
            return false;
        }

        // Ensure the URL has a valid domain part after the protocol
        const domainPart = url.slice(protocolIndex + 3);
        if (domainPart.length === 0 || domainPart.indexOf('.') === -1) {
            return false;
        }

        // Check the domain part for allowed characters
        if (!isValidDomain(domainPart)) {
            return false;
        }

        return true;
    }

    function isValidDomain(domainPart) {
        const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.";
        
        for (let i = 0; i < domainPart.length; i++) {
            if (!validChars.includes(domainPart[i])) {
                return false; // Invalid character found
            }
        }
        
        if (domainPart.includes('..')) {
            return false; // No consecutive dots allowed
        }
        return true; // All checks passed
    }
}
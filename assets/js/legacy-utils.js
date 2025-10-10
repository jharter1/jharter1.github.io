// Another test file with outdated JavaScript patterns
function legacyCode() {
    var API_URL = "https://api.example.com";
    var MAX_RETRIES = 3;
    var DEFAULT_TIMEOUT = 5000;
    
    // This loop should use let
    for (var j = 0; j < MAX_RETRIES; j++) {
        console.log("Retry attempt: " + j);
    }
    
    var requestConfig = {
        url: API_URL,
        timeout: DEFAULT_TIMEOUT,
        retries: MAX_RETRIES
    };
    
    return requestConfig;
}

// Function that demonstrates var scoping issues
function scopingExample() {
    for (var k = 0; k < 5; k++) {
        setTimeout(function() {
            console.log("Value: " + k); // This will log 5 five times due to var scoping
        }, 100);
    }
}

module.exports = {
    legacyCode: legacyCode,
    scopingExample: scopingExample
};
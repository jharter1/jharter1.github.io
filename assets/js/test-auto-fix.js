// Test JavaScript file with auto-fixable issues
// This file contains patterns that should be detected and fixed by the auto-fix workflow

function oldStyleFunction() {
    var userName = "testuser";
    var userId = 12345;
    var isActive = true;
    var config = null;
    
    // This should be converted to let
    for (var i = 0; i < 10; i++) {
        console.log("Item " + i);
    }
    
    // This should stay as var since it's reassigned
    var dynamicValue = "initial";
    if (Math.random() > 0.5) {
        dynamicValue = "changed";
    }
    
    return {
        name: userName,
        id: userId,
        active: isActive,
        config: config,
        dynamic: dynamicValue
    };
}

// Another function with var usage
function calculateTotal() {
    var basePrice = 100;
    var taxRate = 0.08;
    var discount = 10;
    
    var subtotal = basePrice - discount;
    var tax = subtotal * taxRate;
    var total = subtotal + tax;
    
    return total;
}

// Export for use
window.testFunctions = {
    oldStyleFunction: oldStyleFunction,
    calculateTotal: calculateTotal
};
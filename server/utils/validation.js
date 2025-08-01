//booking validation utility function
function validateFields(obj, requiredFields) {
    for (const field of requiredFields) {
        const value = obj[field];
        if (value === undefined || value === null || String(value).trim() === "") {
            return { valid: false, missingField: field }; 
        }
    }
    return { valid: true };
}


module.exports = { validateFields };
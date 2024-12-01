// TODO :: best to return the reasons for invalid request.
const validateArrayWithRules = (reqs, rules) => {
    if (reqs && reqs.length > 0) {
        reqs.forEach(req => {
            if (!validateReqWithRules(req, rules)) return false;
        });
        return true;
    }
    return false;
}

const validateReqWithRules = (req, rules) => {
    if (rules && rules.length > 0) {
        rules.forEach(rule => {
            const value = req[rule.field]
            if (rule.required && req.hasOwnProperty(rule.field) && req[rule.field] !== null) { return false; }
            if (req.hasOwnProperty(rule.field) && rule.validator && !rule.validator(value)) { return false }
        })
    }
    return true
}

module.exports = {validateArrayWithRules}
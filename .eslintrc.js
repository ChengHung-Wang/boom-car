module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
    ],
    "overrides": [],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "rules": {
        "no-var": "error",
        // Disallow assignment statements in if, for, and while unless the assignment statement is enclosed in parentheses
        "no-cond-assign": [
            "error",
            "except-parens",
        ],
        // Disallow constants as test conditions in if, for, while, e.g. if (true), for (;;) , unless there is a break statement inside the loop
        "no-constant-condition": [
            "error",
            {
                checkLoops: false,
            },
        ],
        "no-compare-neg-zero": "error",
        "prefer-const": ["error",
            {
                "destructuring": "any",
                "ignoreReadBeforeAssign": false
            }
        ],
    },
}

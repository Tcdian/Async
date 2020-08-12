function async(taskDef) {
    if (!isGeneratorFunction(taskDef)) {
        throw new TypeError('Expected a generator function');
    }
    return function (...args) {
        const task = taskDef.call(this, ...args);
        return Promise.resolve().then(function handleNext(value) {
            const next = task.next(value);
            return (function handleResult(next) {
                if (next.done) {
                    return next.value;
                }
                return Promise.resolve(next.value)
                    .then(handleNext)
                    .catch((error) => {
                        return Promise.resolve(task.throw(error)).then(handleResult);
                    });
            })(next);
        });
    };
}

function isGeneratorFunction(value) {
    return Object.prototype.toString.call(value) === '[object GeneratorFunction]';
}

module.exports = async;

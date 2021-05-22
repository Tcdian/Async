function asy(taskDef) {
    if (!isGeneratorFunction(taskDef)) {
        throw new TypeError('Expected a generator function');
    }
    return function (...args) {
        let task = taskDef(...args);
        return Promise.resolve().then(function handleNext(value) {
            let next = task.next(value);
            function handleResult(next) {
                if (next.done) {
                    return next.value;
                }
                return Promise.resolve(next.value)
                    .then(handleNext)
                    .catch((error) => {
                        return Promise.resolve(task.throw(error)).then(handleResult);
                    });
            }
            return handleResult(next);
        });
    };
}

function isGeneratorFunction(value) {
    return Object.prototype.toString.call(value) === '[object GeneratorFunction]';
}

module.exports = asy;

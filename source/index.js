function async(taskDef) {
    return function (...args) {
        const task = taskDef.call(...args);
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

module.exports = async;

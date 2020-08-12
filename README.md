## Async

### 使用 Generator 和 Promise 模拟 async/await

```javascript
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
```

#### 使用方法

```javascript
const resolveAfter2Seconds = function () {
    console.log('starting slow promise');
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve('slow');
            console.log('slow promise is done');
        }, 2000);
    });
};

const resolveAfter1Second = function () {
    console.log('starting fast promise');
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve('fast');
            console.log('fast promise is done');
        }, 1000);
    });
};

const sequentialStart = async(function* () {
    console.log('==SEQUENTIAL START==');

    // 1. Execution gets here almost instantly
    const slow = yield resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.

    const fast = yield resolveAfter1Second();
    console.log(fast); // 3. this runs 3 seconds after 1.
});

sequentialStart();

const concurrentStart = async(function* () {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second(); // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(yield slow); // 2. this runs 2 seconds after 1.
    console.log(yield fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
});

concurrentStart();
```

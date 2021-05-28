## Async

### 使用 Generator 和 Promise 模拟 async/await

```javascript
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
```

#### 使用方法

```javascript
const sequentialStart = asy(function* () {
    console.log('==SEQUENTIAL START==');

    // 1. Execution gets here almost instantly
    const slow = yield resolveAfter2Seconds();
    console.log(slow); // 2. this runs 2 seconds after 1.

    const fast = yield resolveAfter1Second();
    console.log(fast); // 3. this runs 3 seconds after 1.
});

// sequentialStart();

const concurrentStart = asy(function* () {
    console.log('==CONCURRENT START==');
    const slow = resolveAfter2Seconds(); // starts timer immediately
    const fast = resolveAfter1Second(); // starts timer immediately

    // 1. Execution gets here almost instantly
    console.log(yield slow); // 2. this runs 2 seconds after 1.
    console.log(yield fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
});

// concurrentStart();

function resolveAfter2Seconds() {
    console.log('starting slow promise');
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve('slow');
            console.log('slow promise is done');
        }, 2000);
    });
}

function resolveAfter1Second() {
    console.log('starting fast promise');
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve('fast');
            console.log('fast promise is done');
        }, 1000);
    });
}
```

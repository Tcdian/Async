const async = require('../source');

function getPromise(val, err) {
    return new Promise(function (resolve, reject) {
        if (err) reject(err);
        else resolve(val);
    });
}

describe('with one promise yield', function () {
    test('should work', function () {
        return async(function* (num) {
            var a = yield getPromise(num);
            expect(a).toBe(1);
        })(1);
    });
});

describe('with several promise yields', function () {
    test('should work', function () {
        return async(function* () {
            var a = yield getPromise(1);
            var b = yield getPromise(2);
            var c = yield getPromise(3);

            expect([a, b, c]).toEqual([1, 2, 3]);
        })();
    });
});

describe('when a promise is rejected', function () {
    test('should throw and resume', function () {
        let error;

        return async(function* () {
            try {
                yield getPromise(1, new Error('boom'));
            } catch (err) {
                error = err;
            }

            expect(error.message).toBe('boom');
            const ret = yield getPromise(1);
            expect(ret).toBe(1);
        })();
    });
});

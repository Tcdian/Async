const asy = require('../source');

describe('with one promise yield', () => {
    test('should work', async () => {
        expect.assertions(1);
        const asyTask = asy(function* (value) {
            return yield Promise.resolve(value);
        });
        await expect(asyTask('success')).resolves.toBe('success');
    });
});

describe('with several promise yields', () => {
    test('should work', async () => {
        expect.assertions(1);
        const asyTask = asy(function* () {
            var a = yield Promise.resolve(1);
            var b = yield Promise.resolve(2);
            var c = yield Promise.resolve(3);

            return [a, b, c];
        });
        await expect(asyTask()).resolves.toEqual([1, 2, 3]);
    });
});

describe('when a promise is rejected', () => {
    test('should throw', async () => {
        expect.assertions(1);
        const asyTask = asy(function* () {
            return yield Promise.reject(new Error('fail!!!'));
        });
        await expect(asyTask()).rejects.toEqual(new Error('fail!!!'));
    });
    test('should resume', async () => {
        expect.assertions(1);
        const asyTask = asy(function* () {
            try {
                return yield Promise.reject(new Error('fail!!!'));
            } catch (err) {
                // handle error ...
                return yield Promise.resolve('error handled');
            }
        });
        await expect(asyTask()).resolves.toEqual('error handled');
    });
});

import * as diff from 'jest-diff';

declare global {
  namespace jest {
    interface Matchers<R> {
      bytesToEqual(expected: Uint8Array): R;
    }
  }
}

expect.extend({
  bytesToEqual(received: Uint8Array, expected: Uint8Array) {
    const receivedHex = Buffer.from(received).toString('hex');
    const expectedHex = Buffer.from(expected).toString('hex');

    // Naive test
    const pass = receivedHex.toLowerCase() === expectedHex.toLowerCase();

    const message = pass
      ? () =>
          this.utils.matcherHint('bytesToEqual', receivedHex, expectedHex) +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expectedHex, receivedHex, {
            expand: this.expand,
          });
          return (
            this.utils.matcherHint('toBe', receivedHex, expectedHex) +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` + `Received: ${this.utils.printReceived(received)}`)
          );
        };

    // Sophisticated test commented out
    // let pass = true;
    // let reason = ''
    // if (received.length !== expected.length) {
    //   if (this.isNot) {
    //     pass = true;
    //     reason = ''
    //   } else {
    //     pass = false;
    //     reason = `Expected: ${this.utils.printExp}`
    //   }
    // } else {
    //   for (let i = 0; i != received.length; i++) {
    //     if (received[i] != expected[i]) {
    //       pass = false;
    //       reason = ``
    //     }
    //   }
    // }

    return { pass, message };
  },
});

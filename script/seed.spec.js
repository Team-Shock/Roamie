const seed = require('./seed');

describe('seed script', () => {
  it('completes successfully', seed).timeout(5000);
});

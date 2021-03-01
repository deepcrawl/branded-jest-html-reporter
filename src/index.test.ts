describe(`The describe title
Some extended description about this test so make sure you underatand it properly`, () => {
  it("does something", () => {
    expect(true).toBe(true);
  });

  it("does something else", () => {
    expect(false).toBe(false);
  });

  it("doesn't do something", () => {
    expect(true).toBe(true);
  });
});

describe(`foo 2
some more text about this test`, () => {
  it("does something 2", () => {
    expect(true).toBe(true);
  });

  it("does something else 2", () => {
    expect(false).toBe(false);
  });

  it("doesn't do something 2", () => {
    expect(true).toBe(true);
  });
});

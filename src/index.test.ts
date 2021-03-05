describe(`The describe title
Some extended description about this test so make sure you underatand it properly`, () => {
  const config = {
    foo: 1,
    bar: true,
    baz: null,
  };
  it("does something", () => {
    expect(config).toBe(config);
  });

  it("does something else", () => {
    expect(false).toBe(false);
  });

  it(`doesn't do something
  But also some description about what is it not doing.
  This can appear over multiple lines.`, () => {
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

  it("doesn't do something 3", () => {
    expect(true).toBe(true);
  });
});

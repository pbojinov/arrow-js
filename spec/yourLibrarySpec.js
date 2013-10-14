describe("yourLibrary", function() {
  
  it("Get a version of yourLibrary", function () {
    expect(yourLibrary.version).toBe("0.0.1");
  });
  
  it("say Hello World", function () {
    expect(yourLibrary.hello()).toBe("Hello World JS!");
  });
  
});
export class FakeApiClient {
  public async getHelloWorld() {
    //this an example we have to test it
    const response = {
      status: 200,
      data: [
        {
          title: "Hello world!",
          description: "Hello wold!",
        },
      ],
    };
      
    return response;
  }
}

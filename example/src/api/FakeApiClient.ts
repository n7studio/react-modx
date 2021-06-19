export interface FakeApiClientInterface {
  getHelloWorld: Function;
}

export class FakeApiClient {
  public async getHelloWorld() {
    console.log('call fake api client')
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

    return response.data;
  }
}

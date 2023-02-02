export default class APIError extends Error {
  constructor(response,  body) {
    // super() = Error.constructor - Toda vez que utilizado o extends para herança necessário chamar o constructor do pai (Neste caso Error)
    super();

    this.name = 'APIError';
    this.response = response;
    this.body = body;
    this.body = body;
    this.message = (
      body?.error || `${response.status} - ${response.statusText}`
    )
  }
}

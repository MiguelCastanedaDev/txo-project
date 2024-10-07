export default class CardToken {
    private apiKey: string;
    private url: string;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
      this.url = 'https://api-secure.payclip.com/card_tokens';
    }
  
    async createToken(
      cardholderName: string,
      cardNumber: string,
      expMonth: string,
      expYear: string,
      cvv: string
    ): Promise<any> {
      const options: RequestInit = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `${this.apiKey}`,
        },
        body: JSON.stringify({
          cardholder_name: cardholderName,
          card_number: cardNumber,
          card_exp_month: expMonth,
          card_exp_year: expYear,
          cvv: cvv,
        }),
      };
  
      try {
        const response = await fetch(this.url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (err) {
        console.error(err);
        throw err; // Re-throw the error after logging it
      }
    }
}
  
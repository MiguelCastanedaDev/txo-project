import CardService from '../api/CardToken.ts';
import CallPayment from '../controllers/PaymentController.ts';

const TOKEN = import.meta.env.VITE_KEY_DANIEL;

// Inicializa el servicio con tu API Key
const cardService = new CardService(TOKEN); // Reemplaza 'api-key' con tu clave API

// Captura el formulario
const form = document.getElementById('cardForm') as HTMLFormElement;

// Maneja el evento de envío del formulario
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Previene el comportamiento por defecto del formulario

  // Obtiene los valores de los inputs
  const cardholderName = (document.getElementById('cardholderName') as HTMLInputElement).value;
  const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement).value;
  const expMonth = (document.getElementById('expMonth') as HTMLInputElement).value;
  const expYear = (document.getElementById('expYear') as HTMLInputElement).value;
  const cvv = (document.getElementById('cvv') as HTMLInputElement).value;

  // Crea un objeto con los datos de la tarjeta
  const cardData = {
    cardholderName,
    cardNumber,
    expMonth,
    expYear,
    cvv
  };

  // Crea un token de tarjeta
  try {
    const response = await cardService.createToken(cardData.cardholderName, cardData.cardNumber, cardData.expMonth, cardData.expYear, cardData.cvv);
    console.log('Card token created successfully:', response);

    await CallPayment(response.id, response.cardholder_name);

  } catch (err) {
    console.error('Failed to create card token:', err);
  }
});
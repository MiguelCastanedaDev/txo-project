import Payment from '../api/Payment.ts';
import GetUserAgent from '../utlis/GetUserAgent.ts';

// Inicializa el servicio con tu API Key
const payment = new Payment("Basic ODM0ZDI3YWItYzNhOS00OThhLTkxMWYtMzA5ZjczMzJiZDYyOjAxNjZjZWMyLWE3ZjMtNGM3Ni1hOWI2LWJlNjMwNjUxYTNkNw=="); // Reemplaza 'dksdads' con tu clave API
const storedUUID = sessionStorage.getItem('session_uuid');

// Maneja el evento de envío del formulario
export default async function CallPayment(card_token: string, card_holder_name: string) {
    // Obtiene los valores de los inputs
    const amount = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
    const currency = 'MXN'
    const description = 'Descripción prueba';
    const return_url = 'https://clip.mx'
    const token = card_token;

    const customer = {
        email: (document.getElementById('customerEmail') as HTMLInputElement).value,
        phone: (document.getElementById('customerPhone') as HTMLInputElement).value,
        firstName: card_holder_name,
        //lastName: (document.getElementById('customerLastName') as HTMLInputElement).value,
        address: {
            postalCode: (document.getElementById('postalCode') as HTMLInputElement).value,
            street: (document.getElementById('street') as HTMLInputElement).value,
            exteriorNumber: (document.getElementById('exteriorNumber') as HTMLInputElement).value,
            interiorNumber: (document.getElementById('interiorNumber') as HTMLInputElement).value,
            colony: (document.getElementById('colony') as HTMLInputElement).value,
            reference: 'Puerta de color negro',
            city: (document.getElementById('city') as HTMLInputElement).value,
            country: (document.getElementById('country') as HTMLInputElement).value,
            state: (document.getElementById('state') as HTMLInputElement).value,
        },
        description: description,
    };

    const prevention_data = {
        customerType: 'returning_buyer',
        submerchantId: 'id 001',
        customerRiskScore: 15,
        transactionRiskLevel: 'low',
        deviceFingerPrintToken: String(storedUUID),
        sessionId: String(storedUUID),
        userAgent: GetUserAgent(),
        request3ds: true,
    }

    const metadata = {
        billingAddress: {
            postalCode: (document.getElementById('postalCode') as HTMLInputElement).value,
            street: (document.getElementById('street') as HTMLInputElement).value,
            exteriorNumber: (document.getElementById('exteriorNumber') as HTMLInputElement).value,
            internalNumber: (document.getElementById('interiorNumber') as HTMLInputElement).value,
            colony: (document.getElementById('colony') as HTMLInputElement).value,
            reference: 'Puerta de color negro',
            city: (document.getElementById('city') as HTMLInputElement).value,
            country: (document.getElementById('country') as HTMLInputElement).value,
            state: (document.getElementById('state') as HTMLInputElement).value,
        },
        shippingAddress: {
            postalCode: (document.getElementById('postalCode') as HTMLInputElement).value,
            street: (document.getElementById('street') as HTMLInputElement).value,
            exteriorNumber: (document.getElementById('exteriorNumber') as HTMLInputElement).value,
            internalNumber: (document.getElementById('interiorNumber') as HTMLInputElement).value,
            colony: (document.getElementById('colony') as HTMLInputElement).value,
            reference: 'Puerta de color negro',
            city: (document.getElementById('city') as HTMLInputElement).value,
            country: (document.getElementById('country') as HTMLInputElement).value,
            state: (document.getElementById('state') as HTMLInputElement).value,
        },
        website: 'https://clip.mx',
    }

    // Crear un pago
    try {
        const response = await payment.createPayment(amount, currency, description, return_url, token, customer, prevention_data, metadata);
        console.log('Payment created successfully:', response);
    } catch (err) {
        console.error('Failed to create card token:', err);
    }
};
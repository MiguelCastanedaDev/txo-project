export default class Payment {
    private apiKey: string;
    private url: string;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
      this.url = 'https://api.payclip.com/payments';
    }
  
    async createPayment(
      amount: number,
      currency: string,
      description: string,
      return_url: string,
      token: string,
      customer: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        address: {
          postalCode: string;
          street: string;
          exteriorNumber: string;
          interiorNumber: string;
          colony: string;
          reference: string;
          city: string;
          country: string;
          state: string;
        };
      },
      preventionData: {
        customerType: string;
        submerchantId: string;
        //customerRiskScore?: number;
        //transactionRiskLevel?: string;
        deviceFingerPrintToken: string;
        sessionId: string;
        userAgent: string;
        request3ds: boolean;
      },
      metadata: {
        billingAddress: {
          postalCode: string;
          street: string;
          exteriorNumber: string;
          internalNumber: string;
          colony: string;
          reference: string;
          city: string;
          country: string;
          state: string;
        };
        shippingAddress: {
          postalCode: string;
          street: string;
          exteriorNumber: string;
          internalNumber: string;
          colony: string;
          reference: string;
          city: string;
          country: string;
          state: string;
        };
        website: string;
      }
    ): Promise<any> {
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          Authorization: `${this.apiKey}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          return_url,
          payment_method: { token },
          customer: {
            email: customer.email,
            phone: customer.phone,
            first_name: customer.firstName,
            last_name: customer.lastName,
            address: {
              postal_code: customer.address.postalCode,
              street: customer.address.street,
              exterior_number: customer.address.exteriorNumber,
              interior_number: customer.address.interiorNumber,
              colony: customer.address.colony,
              reference: customer.address.reference,
              city: customer.address.city,
              country: customer.address.country,
              state: customer.address.state,
            },
            description,
          },
          prevention_data: {
            customer_type: preventionData.customerType,
            submerchant_id: preventionData.submerchantId,
            //customer_risk_score: preventionData.customerRiskScore,
            //transaction_risk_level: preventionData.transactionRiskLevel,
            device_finger_print_token: preventionData.deviceFingerPrintToken,
            session_id: preventionData.sessionId,
            user_agent: preventionData.userAgent,
            request_3ds: preventionData.request3ds,
          },
          metadata: {
            billing_address: {
              postal_code: metadata.billingAddress.postalCode,
              street: metadata.billingAddress.street,
              exterior_number: metadata.billingAddress.exteriorNumber,
              internal_number: metadata.billingAddress.internalNumber,
              colony: metadata.billingAddress.colony,
              reference: metadata.billingAddress.reference,
              city: metadata.billingAddress.city,
              country: metadata.billingAddress.country,
              state: metadata.billingAddress.state,
            },
            shipping_address: {
              postal_code: metadata.shippingAddress.postalCode,
              street: metadata.billingAddress.street,
              exterior_number: metadata.shippingAddress.exteriorNumber,
              internal_number: metadata.shippingAddress.internalNumber,
              colony: metadata.shippingAddress.colony,
              reference: metadata.shippingAddress.reference,
              city: metadata.shippingAddress.city,
              country: metadata.shippingAddress.country,
              state: metadata.shippingAddress.state,
            },
            website: metadata.website,
          },
        }),
      };
  
      try {
        const response = await fetch(this.url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

        if (data.status === 'pending' &&
          data.status_detail?.code === 'PE-3DS01' &&
          data.status_detail?.message === 'Waiting 3ds' &&
          data.pending_action?.type === 'open_modal' &&
          data.pending_action?.url) {
        
          console.log('Acción requerida: abrir modal en la URL:', data.pending_action.url);

          //this.GetPayment(data.id);
          
          this.show3DSIframe(data.pending_action.url, data.id);

          // Puedes manejar la acción, como abrir el modal, aquí
          return { action: 'open_modal', url_3ds: data.pending_action.url };
        }else{
          this.GetPayment(data.id);
        }

        return data;
      } catch (err) {
        console.error(err);
        throw err; // Re-throw the error after logging it
      }
    }

    async GetPayment(
      payment_id: string
    ) : Promise<any>{
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          Authorization: `${this.apiKey}`,
        }
      }
      try {
        const response = await fetch(this.url + `/${payment_id}`, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Payment state: ");
        console.log(data.status, data.status_detail.code, data.status_detail.message);

        try{
          if (data.status === 'pending' &&
            data.status_detail?.code === 'PE-3DS01' &&
            data.status_detail?.message === 'Waiting 3ds') {
          
            console.log('Acción requerida: abrir modal en la URL:', data.pending_action.url);
  
            //this.GetPayment(data.id);
            
            this.show3DSIframe(data.pending_action.url, data.id);
  
            // Puedes manejar la acción, como abrir el modal, aquí
            return { action: 'open_modal', url_3ds: data.pending_action.url };
          }
          else if (data.status === "approved") {
            let dialog = document.getElementById("3ds-iframe-container") as HTMLDialogElement;
            dialog.showModal();
            dialog.innerHTML = 
            `
              <p>Tu pago fue aprobado</p>
            `;
            console.log("Tu pago fue exitoso");
          } else if (data.status === "rejected") {
            let dialog = document.getElementById("3ds-iframe-container") as HTMLDialogElement;
            dialog.showModal();
            setTimeout(()=>{
              dialog.innerHTML = 
              `
                <p>El pago fue declinado</p>
              `;
            }, 2000)
            console.log("El pago fue declinado");

            setTimeout(()=>{
              dialog.close();
            }, 2000)
          }else {
            console.log("El Payment ID no coincide. Por favor intenta de nuevo.");
          }
        }catch(err){
          console.error(err);
          console.log("Error al verificar el estado del pago");
        }    


        return data;
      } catch (err) {
        console.error(err);
        throw err; // Re-throw the error after logging it
      }
    }

    show3DSIframe(url_3ds: string, paymentId: string) {
      console.log(url_3ds, paymentId)
      const dialog = document.getElementById("3ds-iframe-container") as HTMLDialogElement;
      if(dialog){
        //dialog.close = false;
        dialog.showModal();
        
        dialog.innerHTML = 
        ` 
          <iframe
              title="cybersource3Ds" 
              src="${url_3ds}" 
              data-testid="cybersource3Ds-iframe"
            >
          </iframe>
        `;

        window.addEventListener("message", (event) => {
          if (event.origin !== new URL(url_3ds).origin) {
            return; // Ignorar mensajes de otros orígenes
          }
          if (event.data?.paymentId) {
            console.log("Returned Payment ID:", paymentId);

            this.GetPayment(paymentId);
          }
        });
      } 
    }
}
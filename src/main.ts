import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <main>
      <h1>Payment details</h1>
      <label>Enter your payment details below to purchase</label>
      <form id="cardForm">
        <div class="box">
          <div class="box-title">
            <label>Request details</label>
          </div>
          <div class="box-details">
            <div class="box-input">
              <label>Amount</label>
              <input id="amount" type="number" min="0.00" max="10000.00" step="0.01" value="0.01"/>
            </div>
            <div class="box-input">
              <label>Currency</label>
              <input id="currency" type="text" value="MXN" disabled/>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="box-title">
              <label>Customer details</label>
          </div>
          <div class="box-details">
            <div class="box-input">
              <label>Email address</label>
              <input id="customerEmail" type="email" value="name@email.com"/>
            </div>
            <div class="box-input">
              <label>Phone number</label>
              <input id="customerPhone" type="text" value="5543223344"/>
            </div>
          </div>
        </div>
        <div class="box">

          <div class="box-title">
            <label>Card details</label>
          </div>

          <div class="box-details">
            <div class="box-input">
              <label>Name on card</label>
              <input id="cardholderName" type="text" value="AEB MEXICO SA-SERVE PLATFORM"/>
            </div>
          </div>

          <div class="box-details">
            <div class="box-input">
              <label>Card number</label>
              <input id="cardNumber" type="tel" inputmode="numeric" pattern="[0-9\s]{15,16}" 
              autocomplete="cc-number" maxlength="16" 
              placeholder="xxxx xxxx xxxx xxxx" value="377770358335399" required> 
            </div>

            <div class="box-input-expire">
              <label>Expire</label>
              <div class="box-expire">
                <input id="expMonth" autocomplete="off" class="exp" maxlength="2" pattern="[0-9]*" inputmode="numerical" placeholder="MM" type="text" data-pattern-validate value="10"/>
                <hr>
                <input id="expYear" autocomplete="off" class="exp" maxlength="2" pattern="[0-9]*" inputmode="numerical" placeholder="YY" type="text" data-pattern-validate value="29"/>
              </div>
            </div>

            <div class="box-input">
              <label>CVV</label>
              <input id="cvv" type="text" minlength="3" maxlength="4" value="1233"/>
            </div> 
          </div>
        </div>
        <div class="box">
          <div class="box-title">
            <label>Billing address</label>
          </div>
          <div class="box-details">
            <div class="box-input">
              <label>Street</label>
              <input id="street" type="text" value="Av. Insurgentes Sur"/>
            </div>
            <div class="box-input">
              <label>Colony</label>
              <input id="colony" type="text" value="Actipan"/>
            </div>
          </div>
          <div class="box-details">
            <div class="box-input">
              <label>Ext. Number</label>
              <input id="exteriorNumber" type="text" value="No. 1388"/>
            </div>
            <div class="box-input">
              <label>Int. Number</label>
              <input id="interiorNumber" type="text" value="Piso 23-24"/>
            </div>
          </div>
          <div class="box-details">
            <div class="box-input">
              <label>Zip code</label>
              <input id="postalCode" type="tel" inputmode="numeric" 
              autocomplete="cc-number" maxlength="5" value="03230" required> 
            </div>
          </div>
        </div>
        <div class="box">
          <div class="box-title">
            <label>State / Province</label>
          </div>
          
          <div class="box-details">
            <div class="box-input">
              <label>State</label>
              <input id="state" type="text" value="Ciudad de México"/>
            </div>
            <div class="box-input">
              <label>City</label>
              <input id="city" type="text" value="Benito Juárez"/>
            </div>
          </div>
        </div>
        <div class="box">
          <label>Country</label>
          <input id="country" type="text" value="México"/>
        </div>

        <button id="btn-payment" type="submit">Complete payment - $0.01</button>
      </form>
    </main>
  
    <dialog close id="3ds-iframe-container" class="modal">
      <iframe>
        
      </iframe>
    </dialog>
`
/**
 * EDGERUNNER FREIGHT // GOOGLE PAY INTEGRATION
 * Test Environment for processing secure payments
 */

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

const allowedCardNetworks = ["AMEX", "DISCOVER", "JCB", "MASTERCARD", "VISA"];
const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks
  }
};

const cardPaymentMethod = Object.assign(
  {},
  baseCardPaymentMethod,
  {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        'gateway': 'example', // Dummy gateway for testing
        'gatewayMerchantId': 'exampleGatewayMerchantId'
      }
    }
  }
);

let paymentsClient = null;

function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod]
      }
  );
}

function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.merchantInfo = {
    merchantName: 'Edgerunner Freight NC'
  };
  return paymentDataRequest;
}

function getGooglePaymentsClient() {
  if (paymentsClient === null) {
    paymentsClient = new google.payments.api.PaymentsClient({environment: 'TEST'});
  }
  return paymentsClient;
}

window.onGooglePayLoaded = function() {
  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
    .then(function(response) {
      if (response.result) {
        addGooglePayButton();
      }
    })
    .catch(function(err) {
      console.error("Error GPay:", err);
    });
}

function addGooglePayButton() {
  const paymentsClient = getGooglePaymentsClient();
  const button = paymentsClient.createButton({
    onClick: onGooglePaymentButtonClicked,
    buttonColor: 'black',
    buttonType: 'pay',
    buttonSizeMode: 'fill'
  });
  
  const container = document.getElementById('gpay-container');
  if (container) {
    container.innerHTML = '';
    container.appendChild(button);
  }
}

function getGoogleTransactionInfo() {
  // Read total from UI
  let totalPrice = "0.00";
  let currencyCode = "MXN";
  
  if (window._lastCalculatedTotalVal) {
      totalPrice = window._lastCalculatedTotalVal.toString();
  } else {
      // Fallback si no está el valor numérico, extraer del texto
      if (window._lastCalculatedTotal) {
          totalPrice = window._lastCalculatedTotal.replace(/[^0-9.]/g, '');
      } else {
          totalPrice = "1500.00"; // default mock
      }
  }

  if (window.activeCurrency) {
      currencyCode = window.activeCurrency;
  }

  return {
    displayItems: [
      {
        label: "Subtotal Freight",
        type: "SUBTOTAL",
        price: totalPrice,
      }
    ],
    countryCode: 'MX',
    currencyCode: currencyCode,
    totalPriceStatus: 'FINAL',
    totalPrice: totalPrice,
    totalPriceLabel: 'Total'
  };
}

function onGooglePaymentButtonClicked() {
  // Check if user is logged in
  if (typeof getCurrentUser === 'function') {
      const user = getCurrentUser();
      if (!user) {
        if(typeof showToast === 'function') showToast('⚠️ Requiere Conexión (Log-In) para procesar pago.');
        if(typeof openLoginModal === 'function') openLoginModal();
        return;
      }
  }

  const paymentDataRequest = getGooglePaymentDataRequest();
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  const paymentsClient = getGooglePaymentsClient();
  paymentsClient.loadPaymentData(paymentDataRequest)
    .then(function(paymentData) {
      processPayment(paymentData);
    })
    .catch(function(err) {
      console.error(err);
      if (err.statusCode !== 'CANCELED') {
        if(typeof showToast === 'function') showToast('⚠️ Error al procesar pago ICE.');
      }
    });
}

function processPayment(paymentData) {
  // Mock Success Processing
  if(window.cyberSound) window.cyberSound.playConfirm();
  
  // Triggers the same success logic as the original form
  const randomTicketId = `NIGHTCITY-${Math.floor(100000 + Math.random() * 900000)}`;
  const destSelect = document.getElementById('calc-destination');
  const destination = destSelect ? destSelect.options[destSelect.selectedIndex].text : 'Night City';
  
  // Save to history
  if (typeof addPurchaseToHistory === 'function') {
      addPurchaseToHistory({
          ticketId: randomTicketId,
          destination: destination,
          total: window._lastCalculatedTotal || "$0.00"
      });
  }

  // Switch views
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');
  if(formView) formView.style.display = 'none';
  if(successView) successView.style.display = 'block';

  const ticketIdEl = document.getElementById('success-ticket-id');
  if(ticketIdEl) ticketIdEl.textContent = randomTicketId;
  
  const clientInfoEl = document.getElementById('success-client-info');
  if(clientInfoEl && typeof getCurrentUser === 'function') {
      const user = getCurrentUser();
      if(user) {
          clientInfoEl.textContent = `${user.username} • ${user.domicilio}`;
      }
  }
  
  const successTotalEl = document.getElementById('success-total-val');
  if (successTotalEl && window._lastCalculatedTotal) {
    successTotalEl.textContent = window._lastCalculatedTotal;
  }

  if(typeof showToast === 'function') showToast(`✅ Pago GPay Confirmado. Despacho ${randomTicketId} generado.`);
}

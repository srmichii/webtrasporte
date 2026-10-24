/**
 * ==========================================================================
 * LUCYFREIGHT // CYBER CHATBOT ENGINE
 * Arquitectura: Motor de Reglas Offline + Banco de Preguntas Exhaustivo
 * Preparado para Integración con IA Futura (OpenAI, Gemini, Claude, etc.)
 * ==========================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. BANCO DE PREGUNTAS Y RESPUESTAS (KNOWLEDGE BASE)
  // Especializado en: Bancos, Pagos SPEI, Tarjetas, Facturación SAT, Cotizaciones,
  // Rastreo HUD, Flota y Soporte Night City.
  // ==========================================================================

  const FAQ_DATABASE = [
    // ------------------------------------------------------------------------
    // CATEGORÍA: BANCOS & TRANSFERENCIAS SPEI
    // ------------------------------------------------------------------------
    {
      id: 'banco-cuentas-spei',
      category: 'bancos',
      categoryName: '🏦 Bancos y SPEI',
      question: '¿A qué cuentas bancarias puedo transferir para pagar mi flete?',
      keywords: ['cuentas', 'cuenta', 'bancarias', 'banco', 'transferir', 'spei', 'clabe', 'numero de cuenta', 'depositar', 'bbva', 'banamex', 'santander', 'banorte'],
      answer: `
        <h4>🏦 Cuentas Bancarias y Transferencia SPEI</h4>
        <p>Aceptamos transferencias interbancarias directas sin comisiones. Los depósitos se concilian automáticamente:</p>
        <div class="bank-info-box">
          <strong>Beneficiario:</strong> EDGERUNNER FREIGHT S.A. DE C.V.<br>
          <strong>Banco Receptor:</strong> BBVA México<br>
          <strong>CLABE Interbancaria:</strong> 012 180 00123456789 0<br>
          <strong>Cuenta:</strong> 0123456789<br>
          <strong>Banco Secundario:</strong> Santander (CLABE: 014 180 56789012345 6)<br>
          <strong>Concepto / Referencia:</strong> Ingresa tu número de cotización o alias
        </div>
        <p>⚡ <em>Tu despacho se autoriza en menos de 5 minutos tras el timbrado SPEI.</em></p>
      `,
      actions: [
        { label: '⚡ Abrir Cotizador', action: 'goto-quote' },
        { label: '📄 ¿Cómo Facturar?', action: 'query', param: '¿Cómo solicito mi factura fiscal?' }
      ]
    },
    {
      id: 'bancos-autorizados',
      category: 'bancos',
      categoryName: '🏦 Bancos y SPEI',
      question: '¿Qué bancos están autorizados y admitidos para transferencias?',
      keywords: ['que bancos', 'bancos autorizados', 'bancos aceptados', 'cuales bancos', 'admitidos', 'spei bancos', 'banco azteca', 'hsbc', 'scotiabank', 'hey banco', 'nu'],
      answer: `
        <h4>🏛️ Instituciones Bancarias Admitidas</h4>
        <p>Puedes transferir desde <strong>cualquier entidad bancaria nacional e internacional</strong> con conexión al SPEI (Banco de México) o SWIFT:</p>
        <ul>
          <li><strong>Bancos Tradicionales:</strong> BBVA, Santander, Citibanamex, Banorte, HSBC, Scotiabank, Inbursa.</li>
          <li><strong>Neobancos & Fintech:</strong> Nu México, Hey Banco, Mercado Pago, Klar, Albo, Ualá.</li>
          <li><strong>Banca de Desarrollo y Cajas:</strong> Banco Azteca, BanCoppel, Caja Popular.</li>
        </ul>
        <p>La validación se realiza mediante el <strong>Comprobante Electrónico de Pago (CEP)</strong> de Banxico en tiempo real.</p>
      `,
      actions: [
        { label: '🏦 Ver Cuentas CLABE', action: 'query', param: '¿A qué cuentas bancarias puedo transferir para pagar mi flete?' }
      ]
    },
    {
      id: 'banco-tiempo-spei',
      category: 'bancos',
      categoryName: '🏦 Bancos y SPEI',
      question: '¿En cuánto tiempo se acredita un pago bancario por SPEI?',
      keywords: ['tiempo', 'acredita', 'cuanto tarda', 'spei tarda', 'refleja', 'minutos', 'inmediato', 'validacion spei'],
      answer: `
        <h4>⏱️ Tiempo de Acreditación Bancaria</h4>
        <p>Los pagos vía <strong>SPEI son casi instantáneos</strong>:</p>
        <ul>
          <li><strong>Tiempo habitual:</strong> Entre <strong>1 a 5 minutos</strong> las 24 horas del día, los 365 días del año.</li>
          <li><strong>Confirmación:</strong> El sistema de despacho recibe la notificación del Banco de México y libera el vehículo asignado inmediatamente.</li>
          <li><strong>Si tarda más de 15 minutos:</strong> Te sugerimos verificar en el portal CEP de Banxico con tu clave de rastreo bancaria o contactarnos.</li>
        </ul>
      `
    },
    {
      id: 'banco-comprobante-envio',
      category: 'bancos',
      categoryName: '🏦 Bancos y SPEI',
      question: '¿Cómo y dónde envío mi comprobante de pago bancario?',
      keywords: ['comprobante', 'enviar comprobante', 'subir voucher', 'donde envio ticket', 'captura', 'recibo de pago', 'notificar pago'],
      answer: `
        <h4>📤 Notificación de Comprobante Bancario</h4>
        <p>Tienes 3 alternativas rápidas para registrar tu comprobante bancario:</p>
        <ul>
          <li><strong>Panel de Cliente:</strong> Ingresa a tu cuenta y sube el PDF/imagen en la sección de fletes activos.</li>
          <li><strong>Correo de Tesorería:</strong> Envía el voucher a <code>pagos@lucyfreight.nc</code> con tu clave de flete en el asunto.</li>
          <li><strong>Automático:</strong> Si ingresaste tu número de flete en el <em>Concepto de Pago SPEI</em>, nuestro nodo bancario lo asocia en automático sin necesidad de enviar comprobante manual.</li>
        </ul>
      `,
      actions: [
        { label: '🔑 Ir a Mi Cuenta', action: 'goto-auth' }
      ]
    },
    {
      id: 'banco-transferencias-internacionales',
      category: 'bancos',
      categoryName: '🏦 Bancos y SPEI',
      question: '¿Aceptan transferencias bancarias internacionales (Wire / SWIFT en USD)?',
      keywords: ['internacionales', 'transferencia internacional', 'wire', 'swift', 'bic', 'dolares', 'usd banco', 'extranjero', 'cuenta internacional'],
      answer: `
        <h4>🌐 Transferencias Internacionales SWIFT / Wire</h4>
        <p>Sí, contamos con cuenta corporativa en <strong>Dólares Americanos (USD)</strong> para corporaciones internacionales:</p>
        <div class="bank-info-box">
          <strong>Banco Receptor:</strong> JPMorgan Chase / BBVA New York<br>
          <strong>Código SWIFT / BIC:</strong> BBVAMXMMXXX<br>
          <strong>Moneda:</strong> USD (United States Dollars)<br>
          <strong>Referencia:</strong> Tu Identificador de Cliente Corporativo
        </div>
        <p><em>Las transferencias SWIFT demoran de 24 a 48 horas hábiles bancarias.</em></p>
      `,
      actions: [
        { label: '💵 Cotizar en USD', action: 'switch-currency', param: 'USD' }
      ]
    },
    {
      id: 'banco-depositos-cajero',
      category: 'bancos',
      categoryName: '🏦 Bancos y SPEI',
      question: '¿Puedo pagar con depósito en ventanilla bancaria o cajero automático?',
      keywords: ['deposito', 'ventanilla', 'cajero', 'practicaja', 'efectivo banco', 'oxxo', 'seven'],
      answer: `
        <h4>🏧 Depósitos en Ventanilla y Cajeros Inteligentes</h4>
        <p>Sí. Puedes acudir a cualquier <strong>Practicaja BBVA o Cajero Santander</strong> e ingresar depósito en efectivo:</p>
        <ul>
          <li>Usa el número de convenio corporativo <strong>#1982077</strong>.</li>
          <li>Ingresa como referencia los 10 dígitos de tu cotización.</li>
          <li>Conserva el comprobante impreso para cualquier aclaración.</li>
        </ul>
      `
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: TARJETAS Y GOOGLE PAY
    // ------------------------------------------------------------------------
    {
      id: 'tarjetas-aceptadas',
      category: 'tarjetas_gpay',
      categoryName: '💳 Tarjetas & GPay',
      question: '¿Qué tarjetas de crédito y débito aceptan?',
      keywords: ['tarjetas', 'tarjeta de credito', 'tarjeta de debito', 'visa', 'mastercard', 'amex', 'american express', 'carnet'],
      answer: `
        <h4>💳 Tarjetas Bancarias Autorizadas</h4>
        <p>Aceptamos todas las tarjetas emitidas por bancos nacionales e internacionales:</p>
        <ul>
          <li><strong>Visa & Mastercard:</strong> Débito y Crédito de cualquier entidad bancaria.</li>
          <li><strong>American Express (AMEX):</strong> Tarjetas personales y corporativas Platinum/Black.</li>
          <li><strong>Tarjetas Digitales Dinámicas:</strong> Apoyamos tarjetas con CVV dinámico para máxima ciberseguridad.</li>
        </ul>
      `
    },
    {
      id: 'gpay-info',
      category: 'tarjetas_gpay',
      categoryName: '💳 Tarjetas & GPay',
      question: '¿Cómo funciona el pago con Google Pay (GPay)?',
      keywords: ['google pay', 'gpay', 'pagar con google', 'wallet', 'celular pago', 'billetera google'],
      answer: `
        <h4>📱 Pago con Google Pay Integrado</h4>
        <p>En el cotizador de la página encontrarás el botón directo de <strong>Google Pay</strong>:</p>
        <ul>
          <li>Permite pagar con <strong>un solo clic</strong> desde tu navegador o teléfono.</li>
          <li>Tus datos bancarios reales nunca se exponen al comercio; Google utiliza tokens criptográficos de un solo uso.</li>
          <li>Para habilitarlo, inicia sesión con tu usuario corporativo y cotiza tu ruta.</li>
        </ul>
      `,
      actions: [
        { label: '⚡ Ver en Cotizador', action: 'goto-quote' },
        { label: '🔑 Iniciar Sesión', action: 'goto-auth' }
      ]
    },
    {
      id: 'comisiones-tarjetas',
      category: 'tarjetas_gpay',
      categoryName: '💳 Tarjetas & GPay',
      question: '¿Cobran alguna comisión bancaria adicional por pagar con tarjeta?',
      keywords: ['comision', 'comisiones', 'cargo extra', 'porcentaje extra', 'costo por pagar', 'comision banco'],
      answer: `
        <h4>🏷️ Cero Comisiones Ocultas</h4>
        <p><strong>0% de recargo bancario.</strong> El monto que visualizas en el cotizador final (subtotal + IVA) es exactamente lo que se debita de tu cuenta bancaria o tarjeta. Nosotros absorbemos la comisión de la pasarela de pago.</p>
      `
    },
    {
      id: 'meses-sin-intereses',
      category: 'tarjetas_gpay',
      categoryName: '💳 Tarjetas & GPay',
      question: '¿Tienen meses sin intereses (MSI) con bancos participantes?',
      keywords: ['meses sin intereses', 'msi', 'diferir', 'parcialidades', '3 meses', '6 meses', '12 meses', 'bancos participantes msi'],
      answer: `
        <h4>📅 Meses Sin Intereses Disponibles</h4>
        <p>En despachos con monto superior a <strong>$5,000 MXN</strong> ofrecemos financiamiento con tarjetas de crédito participantes:</p>
        <ul>
          <li><strong>3 Meses Sin Intereses:</strong> En fletes terrestres con Mackinaw o Quadra.</li>
          <li><strong>6 y 12 Meses Sin Intereses:</strong> En envíos suborbitales de alta velocidad (AV-4) y fletes corporativos recurrentes.</li>
          <li><strong>Bancos:</strong> BBVA, Santander, Citibanamex, American Express, HSBC, Banorte y Nu.</li>
        </ul>
      `
    },
    {
      id: 'seguridad-bancaria-ice',
      category: 'tarjetas_gpay',
      categoryName: '💳 Tarjetas & GPay',
      question: '¿Qué tan seguros están mis datos bancarios en el sitio?',
      keywords: ['seguridad', 'seguro', 'datos bancarios', 'fraude', 'clonacion', 'cifrado', 'black ice', 'pci dss'],
      answer: `
        <h4>🛡️ Blindaje Criptográfico y Seguridad Bancaria</h4>
        <p>Tu información financiera cuenta con el estándar más alto de seguridad informática:</p>
        <ul>
          <li><strong>Cifrado Neural 256-Bit SSL/TLS:</strong> Toda la transmisión viaja encriptada de punto a punto.</li>
          <li><strong>Certificación PCI-DSS Nivel 1:</strong> No almacenamos números de tarjeta de crédito ni códigos de seguridad CVV.</li>
          <li><strong>Protocolo Black ICE:</strong> Detección proactiva de intrusiones y validación 3D Secure 2.0 (código OTP enviado por tu banco).</li>
        </ul>
      `
    },
    {
      id: 'pago-rechazado',
      category: 'tarjetas_gpay',
      categoryName: '💳 Tarjetas & GPay',
      question: '¿Qué debo hacer si mi pago con tarjeta o GPay fue rechazado?',
      keywords: ['pago rechazado', 'rechazo', 'error pago', 'tarjeta declinada', 'no pasa mi tarjeta', 'fondos insuficientes'],
      answer: `
        <h4>⚠️ Solución para Pagos Rechazados</h4>
        <p>Los motivos más usuales de rechazo bancario son:</p>
        <ul>
          <li><strong>Bloqueo por seguridad del banco:</strong> Muchos bancos requieren que habilites "compras por internet" o autorices la transacción desde su app móvil con token digital.</li>
          <li><strong>Límite diario de gasto:</strong> Verifica que el monto del flete no exceda tu límite bancario permitido.</li>
          <li><strong>Alternativa recomendada:</strong> Si tu tarjeta persiste declinada, puedes pagar de inmediato vía <strong>Transferencia SPEI</strong> usando nuestra CLABE BBVA.</li>
        </ul>
      `,
      actions: [
        { label: '🏦 Ver Cuentas SPEI', action: 'query', param: '¿A qué cuentas bancarias puedo transferir para pagar mi flete?' }
      ]
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: FACTURACIÓN FISCAL & CFDI 4.0
    // ------------------------------------------------------------------------
    {
      id: 'facturacion-cfdi',
      category: 'facturacion',
      categoryName: '📄 Facturación SAT',
      question: '¿Cómo solicito mi factura fiscal (CFDI 4.0)?',
      keywords: ['factura', 'facturacion', 'cfdi', 'cfdi 4.0', 'sat', 'rfc', 'deducible', 'facturar', 'comprobante fiscal'],
      answer: `
        <h4>📑 Emisión de Facturas CFDI 4.0</h4>
        <p>Todos nuestros servicios de transporte son <strong>100% deducibles de impuestos</strong> ante el SAT:</p>
        <ul>
          <li><strong>Generación Automática:</strong> Al cotizar y concretar tu pago en línea, puedes marcar la casilla "Requiero Factura" e ingresar RFC, Razón Social, Régimen Fiscal y Uso de CFDI (ej. G03 - Gastos en General).</li>
          <li><strong>Descarga en Panel:</strong> En tu Panel de Cliente puedes descargar los archivos <strong>XML y PDF</strong> timbrados al momento.</li>
        </ul>
      `,
      actions: [
        { label: '🔑 Ir al Panel de Cliente', action: 'goto-auth' }
      ]
    },
    {
      id: 'facturacion-plazo',
      category: 'facturacion',
      categoryName: '📄 Facturación SAT',
      question: '¿Cuánto tiempo tengo para solicitar y emitir mi factura?',
      keywords: ['plazo factura', 'tiempo para facturar', 'dias para facturar', 'limite de facturacion', 'fin de mes'],
      answer: `
        <h4>🗓️ Plazos de Facturación</h4>
        <p>Puedes generar o solicitar tu comprobante fiscal durante el <strong>mismo mes calendario</strong> en que realizaste el pago del flete, hasta el último día hábil a las 23:59 hrs. Te sugerimos emitirla el mismo día del servicio para evitar discrepancias fiscales.</p>
      `
    },
    {
      id: 'facturacion-iva',
      category: 'facturacion',
      categoryName: '📄 Facturación SAT',
      question: '¿Los precios del cotizador incluyen IVA y retenciones?',
      keywords: ['iva', 'impuestos', 'precios con iva', 'retencion', 'desglose', 'subtotal'],
      answer: `
        <h4>📊 Transparencia en Impuestos</h4>
        <p>En el cotizador inteligente se desglosa con total claridad:</p>
        <ul>
          <li><strong>Subtotal del flete base</strong> (según distancia y vehículo).</li>
          <li><strong>+ 16% de IVA</strong> reglamentario.</li>
          <li><strong>Seguro de carga incluido</strong> o con prima adicional según el valor declarado.</li>
          <li>En personas morales con retención de transporte (4%), el CFDI timbrado desglosa la retención conforme a la ley del IVA.</li>
        </ul>
      `,
      actions: [
        { label: '⚡ Calcular en Cotizador', action: 'goto-quote' }
      ]
    },
    {
      id: 'facturacion-refacturar',
      category: 'facturacion',
      categoryName: '📄 Facturación SAT',
      question: '¿Puedo corregir o cancelar una factura con datos erróneos?',
      keywords: ['corregir factura', 'cancelar factura', 'refacturar', 'cambiar rfc', 'error en factura', 'modificar factura'],
      answer: `
        <h4>🔄 Refacturación y Cancelación SAT</h4>
        <p>Sí. Si cometiste un error en tu RFC, código postal o uso de CFDI, tienes hasta <strong>48 horas hábiles</strong> tras la emisión para solicitar la sustitución (Motivo 01 de cancelación ante el SAT) escribiendo a <code>facturacion@lucyfreight.nc</code> con tu acuse original.</p>
      `
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: MONEDAS, COTIZADOR & TIPO DE CAMBIO
    // ------------------------------------------------------------------------
    {
      id: 'monedas-mxn-usd',
      category: 'cotizaciones_monedas',
      categoryName: '💰 Cotizador & Divisas',
      question: '¿En qué monedas puedo pagar (MXN vs USD)?',
      keywords: ['moneda', 'monedas', 'mxn', 'usd', 'pesos', 'dolares', 'cambiar moneda', 'divisas', 'tipo de cambio'],
      answer: `
        <h4>💱 Soporte Multidivisa (MXN & USD)</h4>
        <p>Nuestra plataforma opera de forma nativa en dos divisas oficiales:</p>
        <ul>
          <li><strong>🇲🇽 MXN (Pesos Mexicanos):</strong> Moneda principal para operaciones locales, transferencias SPEI y facturación fiscal nacional.</li>
          <li><strong>🇺🇸 USD (Dólares Americanos):</strong> Para clientes corporativos multinacionales y despachos transfronterizos.</li>
        </ul>
        <p>Puedes cambiar la divisa activa en cualquier momento usando el <strong>selector en la barra superior</strong> de navegación.</p>
      `,
      actions: [
        { label: '🇲🇽 Ver en MXN', action: 'switch-currency', param: 'MXN' },
        { label: '🇺🇸 Ver en USD', action: 'switch-currency', param: 'USD' }
      ]
    },
    {
      id: 'tipo-de-cambio-calculo',
      category: 'cotizaciones_monedas',
      categoryName: '💰 Cotizador & Divisas',
      question: '¿Cómo se determina el tipo de cambio oficial MXN / USD?',
      keywords: ['tipo de cambio', 'paridad', 'valor del dolar', 'banxico fix', 'cuanto vale el dolar', 'tasa de cambio'],
      answer: `
        <h4>📈 Tipo de Cambio Oficial</h4>
        <p>El tipo de cambio se sincroniza con el <strong>Tipo de Cambio FIX publicado por el Banco de México (Banxico)</strong> y el mercado interbancario de divisas con actualización periódica de 60 minutos, garantizando paridad justa y sin sobreprecios artificiales.</p>
      `
    },
    {
      id: 'cotizador-como-funciona',
      category: 'cotizaciones_monedas',
      categoryName: '💰 Cotizador & Divisas',
      question: '¿Cómo calculo el costo de mi flete en el cotizador?',
      keywords: ['como cotizar', 'calcular flete', 'costo de envio', 'cuanto cuesta', 'precio de envio', 'cotizador'],
      answer: `
        <h4>⚡ Cómo Utilizar el Cotizador Inteligente</h4>
        <ol style="padding-left: 18px; margin: 6px 0;">
          <li>Dirígete a la sección <strong>Cotizador (MXN/USD)</strong> en la página.</li>
          <li>Elige el <strong>Distrito de Origen</strong> y <strong>Distrito de Destino</strong> (ej. Watson, City Center, Santo Domingo, Badlands).</li>
          <li>Selecciona el <strong>vehículo deseado</strong> (Quadra, Mackinaw blindado, AV-4 aéreo).</li>
          <li>Ajusta el <strong>peso de la carga</strong> y el tipo de mercancía.</li>
          <li>El sistema calcula al instante la tarifa neta, el tiempo estimado y el desglose de IVA.</li>
        </ol>
      `,
      actions: [
        { label: '⚡ Ir al Cotizador Ahora', action: 'goto-quote' }
      ]
    },
    {
      id: 'monedas-cripto-eddies',
      category: 'cotizaciones_monedas',
      categoryName: '💰 Cotizador & Divisas',
      question: '¿Aceptan criptomonedas o Eurodólares (Eddies)?',
      keywords: ['cripto', 'criptomonedas', 'bitcoin', 'eddies', 'eurodolares', 'usdt', 'ethereum'],
      answer: `
        <h4>🪙 Pagos Digitales Avanzados</h4>
        <p>Actualmente la liquidación comercial y fiscal se procesa en <strong>MXN y USD</strong> a través del sistema bancario regulado. Los contratos inteligentes neurales Black ICE se encuentran en red de pruebas (testnet) para futuras versiones corporativas.</p>
      `
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: REEMBOLSOS, CRÉDITO Y GARANTÍAS BANCARIAS
    // ------------------------------------------------------------------------
    {
      id: 'reembolsos-politica',
      category: 'reembolsos_garantias',
      categoryName: '🛡️ Reembolsos & Crédito',
      question: '¿Cuál es la política de reembolsos y devoluciones de dinero bancario?',
      keywords: ['reembolso', 'devolucion', 'cancelar flete', 'devolver dinero', 'reembolsos bancarios', 'cancelacion'],
      answer: `
        <h4>🔄 Garantía de Reembolso Bancario al 100%</h4>
        <p>Tu dinero está totalmente protegido:</p>
        <ul>
          <li><strong>Cancelación antes del despacho:</strong> Si cancelas antes de que el convoy inicie ruta, se emite un <strong>reembolso íntegro del 100%</strong> a la misma cuenta bancaria o tarjeta de origen.</li>
          <li><strong>Garantía de puntualidad:</strong> Si un flete Sandevistan sufre demora imputable a nuestra red, se aplica una bonificación directa de hasta el 50% en crédito de servicio.</li>
        </ul>
      `
    },
    {
      id: 'reembolsos-tiempos-banco',
      category: 'reembolsos_garantias',
      categoryName: '🛡️ Reembolsos & Crédito',
      question: '¿En cuántos días veo reflejado mi reembolso en el banco?',
      keywords: ['dias reembolso', 'cuanto tarda reembolso', 'tiempo devolucion', 'reembolso en mi banco', 'cuando cae mi dinero'],
      answer: `
        <h4>⏳ Tiempos de Reflejo Bancario</h4>
        <ul>
          <li><strong>Transferencias SPEI:</strong> Se aplican en un lapso de <strong>24 a 48 horas hábiles</strong> con comprobante CEP.</li>
          <li><strong>Tarjetas de Débito:</strong> De 2 a 5 días hábiles dependiendo del banco emisor.</li>
          <li><strong>Tarjetas de Crédito:</strong> De 5 a 10 días hábiles (reflejado en el siguiente corte de tu estado de cuenta).</li>
        </ul>
      `
    },
    {
      id: 'credito-empresarial-bancario',
      category: 'reembolsos_garantias',
      categoryName: '🛡️ Reembolsos & Crédito',
      question: '¿Ofrecen línea de crédito o financiamiento a 30 días para empresas?',
      keywords: ['credito', 'linea de credito', 'plazo', '30 dias', 'credito corporativo', 'financiamiento empresas', 'convenio empresarial'],
      answer: `
        <h4>🏢 Crédito Corporativo a 15 y 30 Días</h4>
        <p>Ofrecemos esquemas de crédito para empresas y clientes corporativos con despachos periódicos:</p>
        <ul>
          <li><strong>Requisitos:</strong> Constancia de Situación Fiscal (RFC), estados de cuenta bancarios de los últimos 3 meses y comprobante de domicilio.</li>
          <li><strong>Condiciones:</strong> Facturación consolidada quincenal o mensual con plazo de pago de hasta 30 días naturales mediante SPEI.</li>
        </ul>
      `,
      actions: [
        { label: '📞 Contactar con Ejecutivo', action: 'query', param: '¿Cómo contacto con un operador humano?' }
      ]
    },
    {
      id: 'seguro-mercancia-fianza',
      category: 'reembolsos_garantias',
      categoryName: '🛡️ Reembolsos & Crédito',
      question: '¿Qué garantía bancaria o fianza protege mi mercancía durante el viaje?',
      keywords: ['seguro', 'fianza', 'poliza', 'garantia bancaria', 'robo', 'siniestro', 'indemnizacion', 'seguro de carga'],
      answer: `
        <h4>🛡️ Cobertura y Fianza Bancaria de Mercancía</h4>
        <p>Todos los embarques viajan con cobertura integral:</p>
        <ul>
          <li><strong>Póliza Base Incluida:</strong> Respalda hasta <strong>$500,000 MXN</strong> contra daño, extravío o siniestro en ruta.</li>
          <li><strong>Póliza Extendida de Alto Valor:</strong> Cobertura de hasta <strong>$10,000,000 MXN</strong> respaldada por aseguradora bancaria AAA y custodia armada en distritos de alto riesgo.</li>
          <li><strong>Blindaje Black ICE:</strong> Sellos electrónicos inviolables con apertura remota exclusiva por el destinatario.</li>
        </ul>
      `
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: RASTREO Y TELEMETRÍA HUD EN VIVO
    // ------------------------------------------------------------------------
    {
      id: 'rastreo-como-funciona',
      category: 'rastreo',
      categoryName: '📦 Rastreo en Vivo',
      question: '¿Cómo puedo rastrear mi flete o envío en vivo?',
      keywords: ['rastreo', 'rastrear', 'guia', 'donde viene mi paquete', 'codigo de rastreo', 'localizar', 'sandev', 'hud'],
      answer: `
        <h4>🛰️ Rastreo HUD Satelital en Tiempo Real</h4>
        <p>Puedes monitorear el estado exacto de tu flete en el buscador de la sección <strong>Rastreo HUD</strong>:</p>
        <ul>
          <li>Ingresa tu código de guía (ej. <code>SANDEV-2077-NC</code>).</li>
          <li>Visualizarás la telemetría en vivo: velocidad en km/h, temperatura del contenedor, sello criptográfico ICE y cronograma de hitos.</li>
        </ul>
      `,
      actions: [
        { label: '🔍 Ir al Rastreador HUD', action: 'goto-track' },
        { label: '⚡ Consultar SANDEV-2077-NC', action: 'track-code', param: 'SANDEV-2077-NC' }
      ]
    },
    {
      id: 'rastreo-codigos-ejemplo',
      category: 'rastreo',
      categoryName: '📦 Rastreo en Vivo',
      question: '¿Qué códigos de despacho activos puedo probar para ver la telemetría?',
      keywords: ['codigos de prueba', 'ejemplo de guia', 'probar rastreo', 'sandev-2077-nc', 'lucy-cyber-88', 'maine-titan-01'],
      answer: `
        <h4>⚡ Guías de Demostración Activas</h4>
        <p>Puedes probar la telemetría en tiempo real con cualquiera de estas guías activas:</p>
        <ul>
          <li><code>SANDEV-2077-NC</code>: Unidades Militech Sandevistan v4 (En tránsito hacia City Center - 18 min).</li>
          <li><code>LUCY-CYBER-88</code>: Criocontenedores Deep-Net (En tránsito rápido hacia Watson).</li>
          <li><code>MAINE-TITAN-01</code>: Titan Blindado pesado en Badlands.</li>
        </ul>
      `,
      actions: [
        { label: '⚡ Rastrear SANDEV-2077-NC', action: 'track-code', param: 'SANDEV-2077-NC' },
        { label: '🌙 Rastrear LUCY-CYBER-88', action: 'track-code', param: 'LUCY-CYBER-88' },
        { label: '🛡️ Rastrear MAINE-TITAN-01', action: 'track-code', param: 'MAINE-TITAN-01' }
      ]
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: FLOTA, VEHÍCULOS Y SERVICIOS
    // ------------------------------------------------------------------------
    {
      id: 'flota-vehiculos-disponibles',
      category: 'flota_servicios',
      categoryName: '🚚 Flota & Vehículos',
      question: '¿Qué tipos de vehículos componen la flota de transporte?',
      keywords: ['flota', 'vehiculos', 'camiones', 'av-4', 'quadra', 'mackinaw', 'colby', 'aerodino', 'que unidades tienen'],
      answer: `
        <h4>🚀 Flota de Alta Velocidad y Blindaje</h4>
        <ul>
          <li><strong>Aerodino AV-4 Suborbital:</strong> Vuelo aéreo de punto a punto para entregas urgentes en < 15 minutos. Sin tráfico terrestre.</li>
          <li><strong>Quadra Turbo Runner:</strong> Mensajería ligera y chips de datos de alta velocidad con blindaje ligero.</li>
          <li><strong>Camión Pesado Mackinaw Behemoth:</strong> Transporte de carga pesada, maquinaria y contenedores masivos con blindaje Nivel 6.</li>
          <li><strong>Colby Express Van:</strong> Logística urbana para paquetería y pallets estándar.</li>
        </ul>
      `,
      actions: [
        { label: '⚡ Cotizar Despacho', action: 'goto-quote' }
      ]
    },
    {
      id: 'tiempos-entrega-promedio',
      category: 'flota_servicios',
      categoryName: '🚚 Flota & Vehículos',
      question: '¿Cuál es el tiempo de entrega promedio de los envíos?',
      keywords: ['tiempo de entrega', 'cuanto tarda en llegar', 'urgente', 'sandevistan velocidad', 'promedio entrega', 'demora'],
      answer: `
        <h4>⚡ Tiempos Récord de Entrega</h4>
        <ul>
          <li><strong>Envíos Urbanos (Mismo Distrito):</strong> De <strong>10 a 20 minutos</strong>.</li>
          <li><strong>Interdistrital (Watson a City Center / Heywood):</strong> De <strong>20 a 35 minutos</strong>.</li>
          <li><strong>Periferia & Badlands:</strong> De <strong>45 a 60 minutos</strong> en convoy protegido.</li>
          <li>Nuestra tasa de puntualidad histórica supera el <strong>99.9%</strong>.</li>
        </ul>
      `
    },
    {
      id: 'tipos-mercancia-admitida',
      category: 'flota_servicios',
      categoryName: '🚚 Flota & Vehículos',
      question: '¿Qué tipos de mercancía y carga pueden transportar?',
      keywords: ['que transportan', 'tipo de carga', 'mercancia peligrosa', 'criogenico', 'paquetes', 'componentes', 'medicamentos'],
      answer: `
        <h4>📦 Especialidades de Carga Admitida</h4>
        <ul>
          <li><strong>Componentes Tecnológicos & Hardware:</strong> Servidores, microprocesadores y chips sensibles con aislamiento anti-estática.</li>
          <li><strong>Carga Criogénica & Médica:</strong> Muestras biológicas y fármacos con monitoreo térmico estricto en cabina refrigerada.</li>
          <li><strong>Documentos y Valores Confidenciales:</strong> Custodiados en cajas fuertes blindadas con apertura biométrica.</li>
          <li><strong>Carga Industrial & Maquinaria:</strong> Pallets industriales de hasta 20 toneladas en convoy Mackinaw.</li>
        </ul>
      `
    },

    // ------------------------------------------------------------------------
    // CATEGORÍA: CUENTA, CONEXIÓN Y SOPORTE HUMANO
    // ------------------------------------------------------------------------
    {
      id: 'cuenta-crear-perfil',
      category: 'cuentas_soporte',
      categoryName: '👤 Mi Cuenta & Soporte',
      question: '¿Cómo creo una cuenta o me conecto al sistema (Net Log-In)?',
      keywords: ['cuenta', 'crear cuenta', 'registro', 'registrarse', 'iniciar sesion', 'log in', 'perfil', 'ice key', 'contraseña'],
      answer: `
        <h4>🔑 Acceso y Registro en la Red</h4>
        <p>Tener cuenta te da acceso inmediato a historial de despachos, facturación en 1 clic y pagos con Google Pay:</p>
        <ol style="padding-left: 18px; margin: 6px 0;">
          <li>Haz clic en el botón superior <strong>NET LOG-IN</strong>.</li>
          <li>Si eres nuevo, presiona <em>"Regístrate aquí"</em> e ingresa tu alias y domicilio.</li>
          <li>Si ya tienes cuenta, ingresa con tu usuario y contraseña ICE Key.</li>
        </ol>
      `,
      actions: [
        { label: '🔑 Abrir Panel de Conexión', action: 'goto-auth' }
      ]
    },
    {
      id: 'soporte-humano-contacto',
      category: 'cuentas_soporte',
      categoryName: '👤 Mi Cuenta & Soporte',
      question: '¿Cómo contacto con un operador humano o netrunner de guardia?',
      keywords: ['humano', 'operador', 'agente', 'contacto', 'telefono', 'correo', 'atencion a clientes', 'ayuda soporte', 'quejas', 'persona real'],
      answer: `
        <h4>🎧 Asistencia Humana 24/7</h4>
        <p>Nuestro equipo de despachadores y agentes de guardia está disponible las 24 horas:</p>
        <ul>
          <li><strong>Línea Telefónica Directa:</strong> <code>+52 (55) 8000-LUCY (5829)</code></li>
          <li><strong>Correo de Soporte y Operaciones:</strong> <code>soporte@lucyfreight.nc</code></li>
          <li><strong>Mesa de Tesorería y Bancos:</strong> <code>pagos@lucyfreight.nc</code></li>
          <li><strong>Ubicación Corporativa:</strong> Megabuilding H4 & City Center Torre Arasaka Nivel 42.</li>
        </ul>
      `
    }
  ];

  // Categorías de Navegación Rápida
  const CATEGORIES = [
    { id: 'todos', label: '⭐ Destacadas', icon: '⭐' },
    { id: 'bancos', label: '🏦 Bancos y SPEI', icon: '🏦' },
    { id: 'tarjetas_gpay', label: '💳 Tarjetas & GPay', icon: '💳' },
    { id: 'facturacion', label: '📄 Facturación SAT', icon: '📄' },
    { id: 'cotizaciones_monedas', label: '💰 Cotizar & Divisas', icon: '💰' },
    { id: 'reembolsos_garantias', label: '🛡️ Reembolsos & Fianza', icon: '🛡️' },
    { id: 'rastreo', label: '📦 Rastreo en Vivo', icon: '📦' },
    { id: 'flota_servicios', label: '🚚 Flota y Tiempos', icon: '🚚' },
    { id: 'cuentas_soporte', label: '👤 Cuenta & Contacto', icon: '👤' }
  ];

  // ==========================================================================
  // 2. MOTOR DE BÚSQUEDA Y REGLAS (OFFLINE SEARCH ENGINE)
  // Normalización de texto, scoring de coincidencia, lematización básica y triggers.
  // ==========================================================================

  class RuleBasedEngine {
    constructor(knowledgeBase) {
      this.kb = knowledgeBase;
    }

    // Normalizar texto: minúsculas, sin acentos ni signos raros
    normalize(text) {
      if (!text) return '';
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quita acentos
        .replace(/[^a-z0-9\s]/g, ' ')     // Quita signos
        .replace(/\s+/g, ' ')
        .trim();
    }

    // Obtener lista de preguntas por categoría
    getByCategory(categoryId) {
      if (categoryId === 'todos' || !categoryId) {
        return this.kb.slice(0, 8); // Top destacadas
      }
      return this.kb.filter(item => item.category === categoryId);
    }

    // Buscar la respuesta óptima o las más relevantes
    findResponse(rawQuery) {
      const clean = this.normalize(rawQuery);
      if (!clean) {
        return {
          type: 'greeting',
          answer: '👋 ¡Hola! Soy el asistente virtual de <strong>EDGERUNNER FREIGHT</strong>. ¿En qué puedo orientarte hoy sobre tus pagos bancarios, transferencias SPEI, facturación o envíos?'
        };
      }

      // Triggers específicos directos (Saludos, Agradecimientos)
      if (/^(hola|buen(os|as)?\s*(dias|tardes|noches)?|que\s*tal|hey|saludos)/i.test(clean)) {
        return {
          type: 'greeting',
          answer: `
            <h4>👋 ¡Hola! Bienvenido a la red de LucyFreight</h4>
            <p>Tengo información completa y actualizada sobre:</p>
            <ul>
              <li><strong>Bancos y Pagos:</strong> Cuentas CLABE BBVA/Santander, transferencias SPEI en 5 minutos y depósitos.</li>
              <li><strong>Tarjetas y Google Pay:</strong> Meses sin intereses, 0% comisión y pagos seguros.</li>
              <li><strong>Facturación SAT:</strong> Emisión de CFDI 4.0 deducible e IVA desglosado.</li>
              <li><strong>Rastreo y Cotizaciones:</strong> Seguimiento HUD de carga y cálculo en MXN o USD.</li>
            </ul>
            <p>Selecciona una categoría arriba o escribe tu duda en el recuadro inferior.</p>
          `,
          suggestions: [
            '¿A qué cuentas bancarias puedo transferir para pagar mi flete?',
            '¿Qué tarjetas de crédito y débito aceptan?',
            '¿Cómo solicito mi factura fiscal (CFDI 4.0)?',
            '¿Cómo puedo rastrear mi flete o envío en vivo?'
          ]
        };
      }

      if (/^(gracias|muchas gracias|agradecido|listo|ok|perfecto|entendido|excelente)/i.test(clean)) {
        return {
          type: 'thanks',
          answer: '✨ ¡Con mucho gusto! Estoy para servirte en cualquier momento. Si necesitas cotizar un flete o revisar telemetría bancaria, aquí estaré en la esquina inferior derecha.'
        };
      }

      // Detección directa de códigos de guía para rastreo instantáneo
      const trackingCodeMatch = rawQuery.match(/(SANDEV-2077-NC|LUCY-CYBER-88|MAINE-TITAN-01|[A-Z]{3,7}-\d{2,4}-[A-Z]{2,4})/i);
      if (trackingCodeMatch) {
        const code = trackingCodeMatch[0].toUpperCase();
        return {
          type: 'tracking_direct',
          answer: `
            <h4>🛰️ Localización Directa de Guía</h4>
            <p>Detecté la clave de despacho <strong>${code}</strong> en el sistema HUD de Night City.</p>
            <p>Puedes abrir la telemetría satelital completa en pantalla con un solo clic:</p>
          `,
          actions: [
            { label: `🔍 Ver Telemetría HUD de ${code}`, action: 'track-code', param: code },
            { label: '⚡ Calcular Otro Despacho', action: 'goto-quote' }
          ]
        };
      }

      // Algoritmo de Coincidencias con Puntuación (Scoring)
      const queryWords = clean.split(' ').filter(w => w.length > 2);
      const scoredItems = [];

      for (const item of this.kb) {
        let score = 0;
        const normQuestion = this.normalize(item.question);
        const normAnswer = this.normalize(item.answer);

        // 1. Coincidencia exacta con pregunta completa
        if (normQuestion.includes(clean)) {
          score += 60;
        }

        // 2. Coincidencia con palabras clave (keywords)
        for (const kw of item.keywords) {
          const normKw = this.normalize(kw);
          if (clean === normKw) {
            score += 45;
          } else if (clean.includes(normKw)) {
            score += 30;
          } else {
            // Coincidencia de tokens
            const kwTokens = normKw.split(' ');
            for (const qw of queryWords) {
              if (kwTokens.includes(qw)) {
                score += 12;
              }
            }
          }
        }

        // 3. Coincidencia en título de pregunta
        for (const qw of queryWords) {
          if (normQuestion.includes(qw)) {
            score += 8;
          }
        }

        // 4. Coincidencia en cuerpo de respuesta
        for (const qw of queryWords) {
          if (normAnswer.includes(qw)) {
            score += 2;
          }
        }

        if (score > 8) {
          scoredItems.push({ item, score });
        }
      }

      scoredItems.sort((a, b) => b.score - a.score);

      // Si encontramos coincidencias confiables
      if (scoredItems.length > 0) {
        const best = scoredItems[0].item;
        const related = scoredItems.slice(1, 4).map(s => s.item.question);

        return {
          type: 'matched',
          answer: best.answer,
          actions: best.actions || [],
          suggestions: related
        };
      }

      // Fallback si no hubo coincidencia clara
      return {
        type: 'fallback',
        answer: `
          <h4>🤔 No localicé una respuesta exacta</h4>
          <p>Aún no tengo una coincidencia precisa para <em>"${rawQuery.slice(0, 50)}"</em> en mi banco de preguntas offline.</p>
          <p>Prueba buscando con palabras clave como: <strong>banco, SPEI, CLABE, facturación, tarjeta, Google Pay, cotizar, flete o rastreo</strong>.</p>
        `,
        suggestions: [
          '¿A qué cuentas bancarias puedo transferir para pagar mi flete?',
          '¿Qué bancos están autorizados y admitidos para transferencias?',
          '¿Cómo solicito mi factura fiscal (CFDI 4.0)?',
          '¿Cómo contacto con un operador humano?'
        ],
        actions: [
          { label: '🎧 Contactar a Soporte Humano', action: 'query', param: '¿Cómo contacto con un operador humano?' }
        ]
      };
    }
  }

  // ==========================================================================
  // 3. ADAPTADOR PREPARADO PARA IA FUTURA (AI PROVIDER ADAPTER)
  // Desacoplado: permite conectar OpenAI, Claude, Gemini o un microservicio
  // propio simplemente configurando el endpoint y la API Key sin modificar la UI.
  // ==========================================================================

  class AIProviderAdapter {
    constructor(config = {}) {
      this.enabled = false; // Por defecto FALSE (sin IA como solicitó el usuario)
      this.endpoint = config.endpoint || ''; // Ej. 'https://api.openai.com/v1/chat/completions'
      this.apiKey = config.apiKey || '';
      this.model = config.model || 'gpt-4o-mini';
      this.provider = config.provider || 'openai'; // 'openai' | 'gemini' | 'custom'
      this.systemPrompt = config.systemPrompt || 
        'Eres el asistente virtual corporativo de EDGERUNNER FREIGHT / LUCYFREIGHT. ' +
        'Responde de forma concisa, educada y profesional en español sobre logística, ' +
        'cuentas bancarias, SPEI, facturación y servicios de flete en Night City.';
    }

    isConfigured() {
      return this.enabled && !!this.endpoint && !!this.apiKey;
    }

    /**
     * Envía la consulta a un modelo de lenguaje en la nube (cuando se habilite en el futuro)
     */
    async query(userMessage, contextHistory = [], kbContext = '') {
      if (!this.isConfigured()) {
        throw new Error('AI Provider no está habilitado o no tiene credenciales configuradas.');
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      };

      const messages = [
        { role: 'system', content: `${this.systemPrompt}\n\nContexto Bancario y Logístico Oficial:\n${kbContext}` },
        ...contextHistory.slice(-6),
        { role: 'user', content: userMessage }
      ];

      const body = JSON.stringify({
        model: this.model,
        messages: messages,
        temperature: 0.6,
        max_tokens: 500
      });

      const response = await fetch(this.endpoint, { method: 'POST', headers, body });
      if (!response.ok) {
        throw new Error(`Error en API IA: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'Sin respuesta generada por IA.';
    }
  }

  // ==========================================================================
  // 4. SERVICIO DE CHATBOT (ORQUESTADOR)
  // ==========================================================================

  class ChatbotService {
    constructor() {
      this.mode = 'rule_based'; // 'rule_based' (activo) | 'ai' (preparado)
      this.engine = new RuleBasedEngine(FAQ_DATABASE);
      this.aiAdapter = new AIProviderAdapter();
      this.history = [];
    }

    setMode(mode) {
      this.mode = mode;
      console.log(`[CyberBot] Modo establecido a: ${mode}`);
    }

    async processMessage(userQuery) {
      this.history.push({ role: 'user', content: userQuery });

      // Si en un futuro se activa IA y está configurada
      if (this.mode === 'ai' && this.aiAdapter.isConfigured()) {
        try {
          const kbSnippet = FAQ_DATABASE.map(f => `Q: ${f.question}\nA: ${f.answer.replace(/<[^>]*>/g, '')}`).join('\n\n');
          const aiResponse = await this.aiAdapter.query(userQuery, this.history, kbSnippet);
          this.history.push({ role: 'assistant', content: aiResponse });
          return {
            type: 'ai_response',
            answer: aiResponse
          };
        } catch (err) {
          console.warn('[CyberBot] Falla en IA, alternando a banco de reglas local:', err);
        }
      }

      // Respuesta local sin IA (Motor de Reglas y Banco de Preguntas)
      const res = this.engine.findResponse(userQuery);
      this.history.push({ role: 'assistant', content: res.answer });
      return res;
    }
  }

  // ==========================================================================
  // 5. CONTROLADOR DE INTERFAZ DE USUARIO (UI WIDGET)
  // ==========================================================================

  class ChatbotWidget {
    constructor() {
      this.service = new ChatbotService();
      this.isOpen = false;
      this.initDOMElements();
      this.bindEvents();
      this.renderCategories();
      this.renderInitialWelcome();
    }

    initDOMElements() {
      this.container = document.getElementById('cyber-bot-container');
      this.trigger = document.getElementById('cyber-bot-trigger');
      this.bubble = document.getElementById('cyber-bot-bubble');
      this.window = document.getElementById('cyber-bot-window');
      this.messagesContainer = document.getElementById('cyber-bot-messages');
      this.categoriesContainer = document.getElementById('cyber-bot-categories');
      this.inputForm = document.getElementById('cyber-bot-form');
      this.inputField = document.getElementById('cyber-bot-input');
      this.typingIndicator = document.getElementById('cyber-bot-typing');
      this.btnClose = document.getElementById('cyber-bot-close');
      this.btnClear = document.getElementById('cyber-bot-clear');
      this.aiModalBackdrop = document.getElementById('cyber-bot-ai-modal');
      this.btnAiInfo = document.getElementById('cyber-bot-ai-info-trigger');
      this.btnCloseAiModal = document.getElementById('cyber-bot-close-ai-modal');
    }

    playClickSound() {
      if (window.cyberSound && typeof window.cyberSound.playClick === 'function') {
        window.cyberSound.playClick();
      }
    }

    playConfirmSound() {
      if (window.cyberSound && typeof window.cyberSound.playConfirm === 'function') {
        window.cyberSound.playConfirm();
      }
    }

    toggleWidget(open) {
      this.isOpen = typeof open === 'boolean' ? open : !this.isOpen;
      if (this.isOpen) {
        this.container.classList.add('is-open');
        if (this.bubble) this.bubble.style.display = 'none';
        this.playConfirmSound();
        setTimeout(() => this.inputField && this.inputField.focus(), 250);
      } else {
        this.container.classList.remove('is-open');
        this.playClickSound();
      }
    }

    bindEvents() {
      // Toggle botón principal
      if (this.trigger) {
        this.trigger.addEventListener('click', () => this.toggleWidget());
      }

      // Burbuja flotante click para abrir
      if (this.bubble) {
        this.bubble.addEventListener('click', (e) => {
          if (e.target.closest('.bubble-close')) {
            e.stopPropagation();
            this.bubble.style.display = 'none';
          } else {
            this.toggleWidget(true);
          }
        });
      }

      // Botón cerrar en header
      if (this.btnClose) {
        this.btnClose.addEventListener('click', () => this.toggleWidget(false));
      }

      // Botón limpiar chat
      if (this.btnClear) {
        this.btnClear.addEventListener('click', () => {
          this.playClickSound();
          this.messagesContainer.innerHTML = '';
          this.renderInitialWelcome();
        });
      }

      // Modal de Estado IA
      if (this.btnAiInfo && this.aiModalBackdrop) {
        this.btnAiInfo.addEventListener('click', () => {
          this.playClickSound();
          this.aiModalBackdrop.classList.add('is-active');
        });
      }

      if (this.btnCloseAiModal && this.aiModalBackdrop) {
        this.btnCloseAiModal.addEventListener('click', () => {
          this.playClickSound();
          this.aiModalBackdrop.classList.remove('is-active');
        });
      }

      // Enviar mensaje
      if (this.inputForm) {
        this.inputForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const query = this.inputField.value.trim();
          if (query) {
            this.handleUserSubmit(query);
            this.inputField.value = '';
          }
        });
      }
    }

    renderCategories() {
      if (!this.categoriesContainer) return;
      this.categoriesContainer.innerHTML = '';

      CATEGORIES.forEach((cat, index) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `bot-cat-chip ${index === 0 ? 'active' : ''}`;
        chip.innerHTML = `${cat.icon} <span>${cat.label}</span>`;
        chip.addEventListener('click', () => {
          this.playClickSound();
          document.querySelectorAll('.bot-cat-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.showCategoryQuestions(cat.id, cat.label);
        });
        this.categoriesContainer.appendChild(chip);
      });
    }

    showCategoryQuestions(categoryId, categoryTitle) {
      const items = this.service.engine.getByCategory(categoryId);
      let content = `
        <h4>${categoryTitle}</h4>
        <p>Selecciona una pregunta frecuente para consultar su respuesta inmediata:</p>
      `;

      const msgEl = this.appendBotMessage(content);
      const suggestionsWrap = document.createElement('div');
      suggestionsWrap.className = 'bot-suggestions-wrap';

      items.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bot-suggestion-pill';
        btn.innerHTML = `
          <span>${item.question}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        `;
        btn.addEventListener('click', () => {
          this.playClickSound();
          this.handleUserSubmit(item.question);
        });
        suggestionsWrap.appendChild(btn);
      });

      msgEl.querySelector('.bot-bubble-content').appendChild(suggestionsWrap);
      this.scrollToBottom();
    }

    renderInitialWelcome() {
      const welcomeHTML = `
        <h4>👋 LUCY NET-BOT // Asistente Corporativo</h4>
        <p>Bienvenido a la red de despacho y tesorería de <strong>Edgerunner Freight</strong>. Este bot opera con un <strong>amplio banco de respuestas bancarias y logísticas offline</strong>, listo para resolver tus dudas de inmediato.</p>
        <p style="font-size:0.78rem; color:var(--text-muted); margin-top:4px;">✨ <em>Preguntas más consultadas sobre bancos y fletes:</em></p>
      `;

      const msgEl = this.appendBotMessage(welcomeHTML);
      const suggestionsWrap = document.createElement('div');
      suggestionsWrap.className = 'bot-suggestions-wrap';

      const initialPills = [
        '¿A qué cuentas bancarias puedo transferir para pagar mi flete?',
        '¿Qué bancos están autorizados y admitidos para transferencias?',
        '¿Cómo funciona el pago con Google Pay (GPay)?',
        '¿Cómo solicito mi factura fiscal (CFDI 4.0)?',
        '¿En qué monedas puedo pagar (MXN vs USD)?',
        '¿Cómo puedo rastrear mi flete o envío en vivo?'
      ];

      initialPills.forEach(q => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bot-suggestion-pill';
        btn.innerHTML = `
          <span>${q}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        `;
        btn.addEventListener('click', () => {
          this.playClickSound();
          this.handleUserSubmit(q);
        });
        suggestionsWrap.appendChild(btn);
      });

      msgEl.querySelector('.bot-bubble-content').appendChild(suggestionsWrap);
      this.scrollToBottom();
    }

    async handleUserSubmit(text) {
      // Agregar mensaje del usuario en pantalla
      this.appendUserMessage(text);
      this.playClickSound();

      // Mostrar indicador de typing con leve delay para efecto realista
      this.showTyping(true);

      const response = await this.service.processMessage(text);

      setTimeout(() => {
        this.showTyping(false);
        this.renderBotResponse(response);
      }, 350);
    }

    renderBotResponse(res) {
      const msgEl = this.appendBotMessage(res.answer);
      const contentEl = msgEl.querySelector('.bot-bubble-content');

      // Botones de Acción Rápida (Jump a cotizador, rastreo, etc.)
      if (res.actions && res.actions.length > 0) {
        const actionGroup = document.createElement('div');
        actionGroup.className = 'bot-action-group';

        res.actions.forEach(act => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'bot-btn-quick-action';
          btn.textContent = act.label;
          btn.addEventListener('click', () => {
            this.handleActionClick(act);
          });
          actionGroup.appendChild(btn);
        });

        contentEl.appendChild(actionGroup);
      }

      // Preguntas Sugeridas / Relacionadas
      if (res.suggestions && res.suggestions.length > 0) {
        const wrap = document.createElement('div');
        wrap.className = 'bot-suggestions-wrap';
        wrap.style.marginTop = '12px';

        const label = document.createElement('div');
        label.style.fontSize = '0.72rem';
        label.style.color = 'var(--text-muted)';
        label.style.marginBottom = '2px';
        label.textContent = '💡 Preguntas relacionadas:';
        wrap.appendChild(label);

        res.suggestions.forEach(s => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'bot-suggestion-pill';
          btn.innerHTML = `
            <span>${s}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          `;
          btn.addEventListener('click', () => {
            this.playClickSound();
            this.handleUserSubmit(s);
          });
          wrap.appendChild(btn);
        });

        contentEl.appendChild(wrap);
      }

      this.scrollToBottom();
      this.playConfirmSound();
    }

    handleActionClick(act) {
      this.playClickSound();
      switch (act.action) {
        case 'goto-quote':
          this.toggleWidget(false);
          const quoteSection = document.getElementById('cotizador');
          if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth' });
          break;

        case 'goto-track':
          this.toggleWidget(false);
          const trackSection = document.getElementById('rastreo');
          if (trackSection) trackSection.scrollIntoView({ behavior: 'smooth' });
          break;

        case 'goto-auth':
          this.toggleWidget(false);
          if (typeof openAuthModal === 'function') {
            openAuthModal();
          } else {
            const btnAuth = document.getElementById('btn-nav-auth');
            if (btnAuth) btnAuth.click();
          }
          break;

        case 'switch-currency':
          const currBtn = document.querySelector(`.currency-btn[data-currency="${act.param}"]`);
          if (currBtn) currBtn.click();
          this.toggleWidget(false);
          const quoteEl = document.getElementById('cotizador');
          if (quoteEl) quoteEl.scrollIntoView({ behavior: 'smooth' });
          break;

        case 'track-code':
          this.toggleWidget(false);
          const trackInput = document.getElementById('tracking-code-input');
          const trackBtn = document.getElementById('btn-track-submit');
          if (trackInput && trackBtn) {
            trackInput.value = act.param;
            const rastreoSection = document.getElementById('rastreo');
            if (rastreoSection) rastreoSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => trackBtn.click(), 400);
          }
          break;

        case 'query':
          this.handleUserSubmit(act.param);
          break;
      }
    }

    appendUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'bot-msg user';
      const time = this.getCurrentTime();
      msg.innerHTML = `
        <div class="bot-bubble-content">${this.escapeHTML(text)}</div>
        <div class="bot-msg-time">${time}</div>
      `;
      this.messagesContainer.appendChild(msg);
      this.scrollToBottom();
      return msg;
    }

    appendBotMessage(html) {
      const msg = document.createElement('div');
      msg.className = 'bot-msg bot';
      const time = this.getCurrentTime();
      msg.innerHTML = `
        <div class="bot-bubble-content">${html}</div>
        <div class="bot-msg-time">NETRUNNER BOT • ${time}</div>
      `;
      this.messagesContainer.appendChild(msg);
      this.scrollToBottom();
      return msg;
    }

    showTyping(show) {
      if (this.typingIndicator) {
        if (show) {
          this.typingIndicator.classList.add('is-typing');
          this.messagesContainer.appendChild(this.typingIndicator);
          this.scrollToBottom();
        } else {
          this.typingIndicator.classList.remove('is-typing');
        }
      }
    }

    scrollToBottom() {
      setTimeout(() => {
        if (this.messagesContainer) {
          this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
      }, 50);
    }

    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
      );
    }
  }

  // Inicializar el Widget cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.cyberBotWidget = new ChatbotWidget();
    });
  } else {
    window.cyberBotWidget = new ChatbotWidget();
  }

})();

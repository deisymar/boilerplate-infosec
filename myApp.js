/*test #1 Run command */
const express = require('express');
const helmet = require("helmet");
const app = express();

/*test #2 Ocultar información potencialmente peligrosa: eliminar el encabezado X-Powered-By */
app.use(helmet.hidePoweredBy());

/*test #3 Mitigar el riesgo de clickjacking: secuestro de clics */
app.use(helmet.frameguard({action: 'DENY'}));

/*test #4 Mitigue el riesgo de ataques de Cross Site Scripting (XSS), script inyectado  */
app.use(helmet.xssFilter())

/*test #5 Evite inferir el tipo MIME de respuesta, indicando al navegador que no omita el Content-Type*/
app.use(helmet.noSniff())

/*test #6 Evite que IE abra HTML no confiable */
app.use(helmet.ieNoOpen())

/*test #7 Pida a los navegadores que accedan a su sitio a través de HTTPS*/
ninetyDaysInSeconds = 90*24*60*60;
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds, force: true}))

/*test #8 Deshabilite la captación previa de DNS */
app.use(helmet.dnsPrefetchControl())

/*test #9 Deshabilite el almacenamiento en caché del lado del cliente */
app.use(helmet.noCache())

/*test #10 Establezca una política de seguridad de contenido */
app.use(helmet.contentSecurityPolicy({ directives: {
        "defaultSrc": ["'self'"],
        "scriptSrc": ["'self'", "trusted-cdn.com"],        
    } 
}))

/*test #11 Configure Helmet Using the ‘parent’ helmet() Middleware*/
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))














































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

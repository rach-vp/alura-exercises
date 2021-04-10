const nodemailer = require('nodemailer');

const configEmailProd = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_SENHA,
  },
  secure: true,
};

const configEmailTeste = (contaTeste) => ({
  host: 'smtp.ethereal.email',
  auth: contaTeste,
});

const criaEmailConfig = async () => {
  if (process.env.NODE_ENV === 'production') {
    return configEmailTeste(configEmailProd);
  } else {
    const contaTeste = await nodemailer.createTestAccount();
    return configEmailTeste(contaTeste);
  }
};

class Email {
  async enviaEmail() {
    const configEmail = await criaEmailConfig();
    const transportador = nodemailer.createTransport(
      configEmail
    );
    const info = await transportador.sendMail(this);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`URL email teste: ${nodemailer.getTestMessageUrl(info)}`);
    }
  };
}

class EmailVerificacao extends Email {
  constructor(usuario, link) {
    super();
    this.from = '"Blog do Código" <noreply@blogdocodigo.com.br>';
    this.to = usuario.email;
    this.subject = 'Verificação de e-mail';
    this.text = `Olá! Verifique seu e-mail aqui: ${link}`;
    this.html = `<h1>Olá!</h1> Verifique seu e-mail aqui: <a href=${link}>${link}</a>`
  }
}


module.exports = {
  EmailVerificacao,
};

function slugify(string) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }
  
  var validateFormData = () => {
      const select = document.querySelector('#inputBusiness')
      error = false
  
      if (select.value.toString() == 'Dono de bar(es) e/ou restaurante(s)')
          fieldIdsJuridic.map(item => {
              error = fieldValidator(item)
              if (!error)
                  return error
          })
  
      fieldIdsPerson.map(item => {
          error = fieldValidator(item)
          if (!error)
              return error
      })
  
      fieldIdsAddress.map(item => {
          error = fieldValidator(item)
          if (!error)
              return error
      })
  
      return error
  }
  
  var fieldValidator = (fieldId) => {
      // const select = document.querySelector('#inputBusiness')
      const field = document.querySelector(fieldId).value
  
      if (!field.disabled) {
          if (fieldId == '#inputPassword')
              if (field.toString().length < 6)
                  return true
  
          if (fieldId == '#inputSex')
              if (field == '')
                  return true
  
          if (fieldId == '#inputEmailFirst')
              if (!validateEmail(field.toString()))
                  return true
  
          // if (fieldId == '#inputOffice') {
          //     if (select.value == '2')
          //         if (field.trim() == "" || field == null)
          //             return true;
          // }
  
          if (field.trim() == "" || field == null)
              return true
      }
      return false
  }
  
  //valida o email
  
  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(email))
      return re.test(email);
  }
  
  //adiciona mascara de cnpj
  function MascaraCNPJ(cnpj) {
      if (mascaraInteiro(cnpj) == false) {
          event.returnValue = false;
      }
      return formataCampo(cnpj, '00.000.000/0000-00', event);
  }
  
  //adiciona mascara de cep
  function MascaraCep(cep) {
      if (mascaraInteiro(cep) == false) {
          event.returnValue = false;
      }
      return formataCampo(cep, '00.000-000', event);
  }
  
  //adiciona mascara de data
  function MascaraData(data) {
      if (mascaraInteiro(data) == false) {
          event.returnValue = false;
      }
      return formataCampo(data, '00/00/0000', event);
  }
  
  //adiciona mascara ao telefone
  function MascaraTelefone(tel) {
      if (mascaraInteiro(tel) == false) {
          event.returnValue = false;
      }
      return formataCampo(tel, '(00) 00000-0000', event);
  }
  
  //adiciona mascara ao CPF
  function MascaraCPF(cpf) {
      if (mascaraInteiro(cpf) == false) {
          event.returnValue = false;
      }
      return formataCampo(cpf, '000.000.000-00', event);
  }
  
  //valida telefone
  function ValidaTelefone(tel) {
      exp = /\(\d{2}\)\ \d{4}\-\d{4}/
      if (!exp.test(tel.value))
          alert('Numero de Telefone Invalido!');
  }
  
  //valida CEP
  // function ValidaCep(cep) {
  //     exp = /\d{2}\.\d{3}\-\d{3}/
  //     if (!exp.test(cep.value))
  //         alert('Numero de Cep Invalido!');
  // }
  
  //valida data
  function ValidaData(data) {
      exp = /\d{2}\/\d{2}\/\d{4}/
      if (!exp.test(data.value))
          alert('Data Invalida!');
  }
  
  //valida o CPF digitado
  function ValidarCPF(Objcpf) {
      var cpf = Objcpf.value;
      exp = /\.|\-/g
      cpf = cpf.toString().replace(exp, "");
      var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
      var soma1 = 0, soma2 = 0;
      var vlr = 11;
  
      for (i = 0; i < 9; i++) {
          soma1 += eval(cpf.charAt(i) * (vlr - 1));
          soma2 += eval(cpf.charAt(i) * vlr);
          vlr--;
      }
      soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
      soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
  
      var digitoGerado = (soma1 * 10) + soma2;
      if (digitoGerado != digitoDigitado)
          alert('CPF Invalido!');
  }
  
  //valida numero inteiro com mascara
  function mascaraInteiro() {
      if (event.keyCode < 48 || event.keyCode > 57) {
          event.returnValue = false;
          return false;
      }
      return true;
  }
  
  //valida o CNPJ digitado
  // function ValidarCNPJ(ObjCnpj) {
  //     var cnpj = ObjCnpj.value;
  //     var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
  //     var dig1 = new Number;
  //     var dig2 = new Number;
  
  //     exp = /\.|\-|\//g
  //     cnpj = cnpj.toString().replace(exp, "");
  //     var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));
  
  //     for (i = 0; i < valida.length; i++) {
  //         dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
  //         dig2 += cnpj.charAt(i) * valida[i];
  //     }
  //     dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
  //     dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));
  
  //     if (((dig1 * 10) + dig2) != digito)
  //         alert('CNPJ Invalido!');
  
  // }
  
  //formata de forma generica os campos
  function formataCampo(campo, Mascara, evento) {
      var boleanoMascara;
  
      var Digitato = evento.keyCode;
      exp = /\-|\.|\/|\(|\)| /g
      campoSoNumeros = campo.value.toString().replace(exp, "");
  
      var posicaoCampo = 0;
      var NovoValorCampo = "";
      var TamanhoMascara = campoSoNumeros.length
  
      if (Digitato != 8) { // backspace 
          for (i = 0; i <= TamanhoMascara; i++) {
              boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                  || (Mascara.charAt(i) == "/"))
              boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
                  || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
              if (boleanoMascara) {
                  NovoValorCampo += Mascara.charAt(i);
                  TamanhoMascara++;
              } else {
                  NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                  posicaoCampo++;
              }
          }
          campo.value = NovoValorCampo;
          return true;
      } else {
          return true;
      }
  }
  var selectFieldAndAddPropertie = () => {
      fieldIdsJuridic.forEach(item => {
          const field = document.querySelector(item)
          if (item != '#inputCnpj') preventPasteEvent(field)
      });
      fieldIdsPerson.forEach(item => {
          const field = document.querySelector(item)
          preventPasteEvent(field)
      });
      fieldIdsAddress.forEach(item => {
          const field = document.querySelector(item)
          if (item != '#inputCep') preventPasteEvent(field)
      });
  }
  
  var preventPasteEvent = (field) => {
      field.addEventListener('paste', event => { event.preventDefault() })
  }
  
  var inputDateVerification = document.querySelector('#inputDate')
  inputDateVerification.addEventListener('change', event => {
      var arrayDate = inputDateVerification.value.toString().split('/')
      var date = {
          'dia': arrayDate[0],
          'mes': arrayDate[1],
          'ano': arrayDate[2]
      }
      var isValid = new Date(date.ano, date.mes, date.dia).getTime() > new Date().getTime() ? false : true
      if (isValid) isValid = date.dia > 31 || date.dia < 1 ? false : true
      if (isValid) isValid = date.mes > 12 || date.mes < 1 ? false : true
      if (isValid) isValid = date.mes == 2 && date.dia > 29 ? false : true
      if (!isValid) {
          inputDateVerification.value = ''
          inputDateVerification.style.borderColor = '#dc3545'
          document.querySelector('#date-invalid-feedback').style.display = 'block'
          console.log('não valido')
      }
      else {
          inputDateVerification.style.borderColor = '#28a745'
          document.querySelector('#date-invalid-feedback').style.display = 'none'
          document.querySelector('#phone-invalid-feedback').hidden = true
      }
  })
  
  var inputCpfVerification = document.querySelector('#inputCpf')
  inputCpfVerification.addEventListener('change', event => {
      var cpf = inputCpfVerification.value.toString()
      var isValid = cpf.length < 14 ? false : true
  
      if (!isValid) {
          inputCpfVerification.value = ''
          inputCpfVerification.style.borderColor = '#dc3545'
          console.log('não valido')
          document.querySelector('#second-step-button-next').disabled = true
      }
      else {
          inputCpfVerification.style.borderColor = '#28a745'
          document.querySelector('#second-step-button-next').disabled = false
      }
      inputCpf.classList.add('was-validated');
              validateAsyncCPF()
  }, false)
  var inputPhoneVerification = document.querySelector('#inputPhone')
  inputPhoneVerification.addEventListener('change', event => {
      const phone = inputPhoneVerification.value.toString()
      const isValid = phone.length < 14 ? false : true
      const checkBox = document.querySelector("#check-terms")
  
      if (!isValid) {
          inputPhoneVerification.style.borderColor = '#dc3545'
          document.querySelector('#phone-invalid-feedback').style.display = 'block'
          console.log('não valido')
          document.querySelector('#first-step-button-next').disabled = true
      }
      else {
          inputPhoneVerification.style.borderColor = '#28a745'
          document.querySelector('#phone-invalid-feedback').style.display = 'none'
          if (!checkBox.checked)
              document.querySelector('#first-step-button-next').disabled = true
          else
              document.querySelector('#first-step-button-next').disabled = false
      }
  })
  
  var validateAsyncEmail = async () => {
      var inputEmail = document.getElementById('inputEmailFirst')
      var errorEmail = document.getElementById('email-invalid-feedback')
      var asyncEmailVerification = () => {
          const email = document.querySelector('#inputEmailFirst').value.toString()
          try {
              return new Promise((resolve, reject) => {
                  $.ajax({
                      url: `https://abrasel.dj.emp.br/api/users/exists/email/${email}/`,
                      type: 'get',
                  })
                      .done(data => {
                          const exists = data.exists == false ? false : true
                          resolve(exists)
                      })
                      .fail(err => {
                          reject(err)
                      });
              })
          } catch (error) { console.log(error) }
      }
      const exists = await asyncEmailVerification()
      if (exists || !validateEmail(inputEmail.value.toString())) {
          errorEmail.style.display = 'block'
          inputEmail.style.borderColor = '#dc3545'
          document.querySelector('#first-step-button-next').disabled = true
          document.querySelector('#email-invalid-feedback').innerHTML = 'Este nome de usuário já existe!'
      } else {
          errorEmail.style.display = 'none'
          inputEmail.style.borderColor = '#28a745'
          document.querySelector('#first-step-button-next').disabled = false
      }
      console.log(`Response result email: ${exists}`)
  }
  
  var validateAsyncUsername = async () => {
      var inputUserName = document.getElementById('inputUserName')
      var errorUserName = document.getElementById('user-name-invalid-feedback')
      var asyncUsernameVerification = () => {
          const username = document.querySelector('#inputUserName').value.toString()
          try {
              return new Promise((resolve, reject) => {
                  $.ajax({
                      url: `https://abrasel.dj.emp.br/api/users/exists/username/${username}/`,
                      type: 'get',
                  })
                      .done(data => {
                          const exists = data.exists == false ? false : true
                          resolve(exists)
                      })
                      .fail(err => {
                          reject(err)
                      });
              })
          } catch (error) { console.log(error) }
      }
      const exists = await asyncUsernameVerification()
      if (exists) {
          errorUserName.style.display = 'block'
          inputUserName.style.borderColor = '#dc3545'
          document.querySelector('#first-step-button-next').disabled = true
          document.querySelector('#user-name-invalid-feedback').innerHTML = 'Este nome de usuário já existe!'
      } else {
          errorUserName.style.display = 'none'
          inputUserName.style.borderColor = '#28a745'
          document.querySelector('#first-step-button-next').disabled = false
      }
      console.log(`Response result username: ${exists}`)
  }
  
  //
  var validateAsyncCPF = async () => {
      var inputUserName = document.getElementById('inputCpf')
      var errorUserName = document.getElementById('cpf-invalid-feedback')
      var asyncCpfVerification = () => {
          const cpf = document.querySelector('#inputCpf').value.toString()
          try {
              return new Promise((resolve, reject) => {
                  $.ajax({
                      url: `https://abrasel.dj.emp.br/api/users/exists/cf.cpf/${cpf}/`,
                      type: 'get',
                  })
                      .done(data => {
                          const exists = data.exists == false ? false : true
                          resolve(exists)
                      })
                      .fail(err => {
                          reject(err)
                      });
              })
          } catch (error) { console.log(error) }
      }
      const exists = await asyncCpfVerification()
      if (exists) {
          errorUserName.style.display = 'block'
          inputCpf.style.borderColor = '#dc3545'
          document.querySelector('#second-step-button-post').disabled = true
          document.querySelector('#second-step-button-next').disabled = true
          document.querySelector('#cpf-invalid-feedback').innerHTML = 'Este CPF já existe!'
      } else {
          errorUserName.style.display = 'none'
          inputCpf.style.borderColor = '#28a745'
          document.querySelector('#second-step-button-next').disabled = false
          document.querySelector('#second-step-button-post').disabled = false
      }
      console.log(`Response result username: ${exists}`)
  }
  
  
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  window.addEventListener('load', function () {
      selectFieldAndAddPropertie()
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      var inputCep = document.getElementById('inputCep')
      var errorCep = document.getElementById('cep-invalid-feedback')
      var inputCnpj = document.getElementById('inputCnpj')
      var errorCnpj = document.getElementById('cnpj-invalid-feedback')
      var inputPassword = document.getElementById('inputPassword')
      var errorPassword = document.getElementById('password-invalid-feedback')
      var inputUserName = document.getElementById('inputUserName')
      var errorUserName = document.getElementById('user-name-invalid-feedback')
      var errorCpf = document.getElementById('cpf-invalid-feedback')
      var inputEmail = document.getElementById('inputEmailFirst')
      var errorEmail = document.getElementById('email-invalid-feedback')
  
      var validate = [...forms]
      // Loop over them and prevent submission
      var checkBox = document.querySelector("#check-terms")
      checkBox.addEventListener('click', event => {
          if (!checkBox.checked)
              document.querySelector('#first-step-button-next').disabled = true
          else
              document.querySelector('#first-step-button-next').disabled = false
      })
  
      validate.filter(item => {
          if (item.getAttribute('class') == 'needs-validation' && item.getAttribute('id') == 'first-step') {
              formCounter = 1
              item.addEventListener('submit', event => {
                  if (item.checkValidity() === false) {
                      event.preventDefault();
                      event.stopPropagation();
                  } else {
                      event.preventDefault();
                      event.stopPropagation();
                      formCounter = 0
                      showSecondForm()
                  }
                  formCounter = 1
                  console.log(formCounter)
                  item.classList.add('was-validated');
              }, false)
          }
  
          if (item.getAttribute('class') == 'needs-validation' && item.getAttribute('id') == 'second-step') {
              formCounter = 1
              item.addEventListener('submit', event => {
                  if (item.checkValidity() === false) {
                      event.preventDefault();
                      event.stopPropagation();
                  } else {
                      event.preventDefault();
                      event.stopPropagation();
                      formCounter = 0
                      const buttonNext = document.querySelector('#second-step-button-next')
                      if (voltar == false)
                          buttonNext.click()
                  }
                  console.log(formCounter)
                  item.classList.add('was-validated');
              }, false)
          }
          if (item.getAttribute('class') == 'needs-validation' && item.getAttribute('id') == 'third-step') {
              formCounter = 1
              item.addEventListener('submit', event => {
                  if (item.checkValidity() === false) {
                      event.preventDefault();
                      event.stopPropagation();
                  } else {
                      event.preventDefault();
                      event.stopPropagation();
                      formCounter = 0
                  }
                  console.log(formCounter)
                  item.classList.add('was-validated');
              }, false)
          }
      });
  
      if (inputCep)
          inputCep.addEventListener('change', event => {
              console.log(inputCep.value.toString())
              if (inputCep.checkValidity() === false || inputCep.value.toString().length < 8) {
                  // event.preventDefault();
                  // event.stopPropagation();
                  errorCep.style.display = 'block'
                  inputCep.style.borderColor = '#dc3545'
                  emptyAddressFields()
              }
              else {
                  errorCep.style.display = 'none'
                  inputCep.style.borderColor = '#28a745'
                  consultCep()
              }
              inputCep.classList.add('was-validated');
          }, false)
  
      if (inputCnpj)
          inputCnpj.addEventListener('change', event => {
              if (inputCnpj.checkValidity() === false || inputCnpj.value.toString().length < 14) {
                  // event.preventDefault();
                  // event.stopPropagation();
                  errorCnpj.style.display = 'block'
                  inputCnpj.style.borderColor = '#dc3545'
                  document.querySelector('#third-step-button').disabled = true
                  emptyCnpjFields()
              }
              else {
                  errorCnpj.style.display = 'none'
                  inputCnpj.style.borderColor = '#28a745'
                  document.querySelector('#third-step-button').disabled = false
                  consultCnpj()
              }
              inputCnpj.classList.add('was-validated');
          }, false)
  
      if (inputPassword)
          inputPassword.addEventListener('change', event => {
              if (inputPassword.checkValidity() === false || inputPassword.value.toString().length < 6) {
                  // event.preventDefault();
                  // event.stopPropagation();
                  document.querySelector('#first-step-button-next').disabled = true
                  errorPassword.style.display = 'block'
                  inputPassword.style.borderColor = '#dc3545'
              }
              else {
                  errorPassword.style.display = 'none'
                  inputPassword.style.borderColor = '#28a745'
  
                  if (!checkBox.checked)
                      document.querySelector('#first-step-button-next').disabled = true
                  else
                      document.querySelector('#first-step-button-next').disabled = false
  
              }
              inputPassword.classList.add('was-validated');
          }, false)
  
      if (inputUserName)
          inputUserName.addEventListener('change', event => {
              if (inputUserName.checkValidity() === false) {
                  // event.preventDefault();
                  // event.stopPropagation();
                  errorUserName.style.display = 'block'
                  inputUserName.style.borderColor = '#dc3545'
                  document.querySelector('#first-step-button-next').disabled = true
                  document.querySelector('#user-name-invalid-feedback').innerHTML = 'O nome deve ter letras minúsculas e sem espaçamento!'
              }
              else if (!inputUserName.value.toString()) {
                  document.querySelector('#first-step-button-next').disabled = true
              }
              else {
                  errorUserName.style.display = 'none'
                  inputUserName.style.borderColor = '#28a745'
                  inputUserName.value = slugify(inputUserName.value.toString().replace(' ', '').toLowerCase())
                  if (!checkBox.checked)
                      document.querySelector('#first-step-button-next').disabled = true
                  else
                      document.querySelector('#first-step-button-next').disabled = false
              }
              inputUserName.classList.add('was-validated');
              validateAsyncUsername()
          }, false)
  
      if (inputEmail)
          inputEmail.addEventListener('change', event => {
              if (inputEmail.checkValidity() === false || !validateEmail(inputEmail.value.toString())) {
                  // event.preventDefault();
                  // event.stopPropagation();
                  document.querySelector('#first-step-button-next').disabled = true
                  errorEmail.style.display = 'block'
                  inputEmail.style.borderColor = '#dc3545'
                  document.querySelector('#email-invalid-feedback').innerHTML = 'Insira um endereço de email válido!'
              }
              else if (!inputEmail.value.toString()) {
                  document.querySelector('#first-step-button-next').disabled = true
              }
              else {
                  errorEmail.style.display = 'none'
                  inputEmail.style.borderColor = '#28a745'
                  if (!checkBox.checked)
                      document.querySelector('#first-step-button-next').disabled = true
                  else
                      document.querySelector('#first-step-button-next').disabled = false
              }
              inputEmail.classList.add('was-validated');
              validateAsyncEmail()
          }, false)
  }, false)
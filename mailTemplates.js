const app = document.getElementById('root');
const header = document.getElementById('header');

const container = document.createElement('div');
container.setAttribute('class', 'container');

const backButton = document.createElement('BUTTON');
backButton.innerHTML =`GERİ`;
backButton.setAttribute('class','backButton');
backButton.addEventListener ("click", function() {
  window.history.back();
});
  header.appendChild(backButton);

var mailtypeid=localStorage.getItem("mailtypeid");
var mailtemplatecontentid=localStorage.getItem("mailtemplatecontentid");
var delayInMilliseconds = 1000; //1 second
app.appendChild(container);

const card = document.createElement('div');
card.setAttribute('class', 'card');

var mailTemplate_to, mailTemplate_cc, mailTemplate_subject, mailTemplate_content, mailTemplate_general;
var to_check, cc_check, subject_check;

const mail_to_textarea = document.createElement('textarea');
const mail_cc_textarea = document.createElement('textarea');
const mail_subject_textarea = document.createElement('textarea');
const mail_content_textarea = document.createElement('textarea');


var request = new XMLHttpRequest();
request.open('GET', `${variables.mainPageURL}/${variables.mailTypes}/${mailtypeid}/${variables.mailTemplates}/${mailtemplatecontentid}/${variables.mailTemplates}`, true);
request.onload = function () {

  // Begin accessing JSON data here
var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {  // SATIR 122'DE BİTİYOR
      if(data.length==4 || data.length==1){
        console.log("Data length: "+data.length);
        pageCreationForFourOrOneComponents(data);
      }
      else {
        console.log("Data length: "+data.length);
        pageCreationForOthers(data);
      }


  } else { //If the request status is not 200.
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = variables.requestErrorMessage;
      app.appendChild(errorMessage);
  }
}

request.send();

function createComponents(mailTemplate_temp, mail_textarea, mailTemplate,card){

  mailTemplate_temp=mailTemplate;
  const info = document.createElement('p');
  info.setAttribute('class', 'info');
  info.textContent= mailTemplate_temp.description;
  mail_textarea.value = `${mailTemplate_temp.value_}`;
  mail_textarea.setAttribute('class','value_');
  mail_textarea.style.width=`100%`;
  mail_textarea.rows=`3`;
  mail_textarea.style.resize=`none`;
  card.appendChild(info);
  card.appendChild(mail_textarea);

}

function pageCreationForFourOrOneComponents(data){


  data.forEach(mailTemplate => {

    var to = mailTemplate.code.slice(-3).includes("_TO");
    var cc = mailTemplate.code.slice(-3).includes("_CC");
    var subject = mailTemplate.code.slice(-8).includes("_SUBJECT");

    if (to) {
      to_check = true;
      mailTemplate_to=mailTemplate;
      createComponents(mailTemplate_to,mail_to_textarea,mailTemplate,card);
    }
    else if (cc) {
      cc_check = true;
      mailTemplate_cc=mailTemplate;
      createComponents(mailTemplate_cc,mail_cc_textarea,mailTemplate,card);
    }
    else if (subject) {
      subject_check = true;
      mailTemplate_subject=mailTemplate;
      createComponents(mailTemplate_subject,mail_subject_textarea,mailTemplate,card);
    }
    else {
      mailTemplate_content= mailTemplate;
      mail_content_textarea.setAttribute('id','value_mail');
      createComponents(mailTemplate_content,mail_content_textarea,mailTemplate,card);
      $(function(){
        $('#value_mail').froalaEditor();
        language: 'tr';
      });

    }
    container.appendChild(card);

  }); //data forEach ends here

  const changeButton = document.createElement('BUTTON');
  changeButton.innerHTML =`DEĞİŞTİR`;
  changeButton.setAttribute('class','changeButton');
  changeButton.addEventListener ("click", function() {

  if(confirm(variables.confirmMessage)) {

    if(to_check && cc_check && subject_check){
        mailTemplate_content.value_=mail_content_textarea.value; // 4lu istek atıyosun ama welcome_ortak tek li oldugu için hata veriyor.
        mailTemplate_to.value_=mail_to_textarea.value;
        mailTemplate_cc.value_=mail_cc_textarea.value;
        mailTemplate_subject.value_=mail_subject_textarea.value;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${variables.mainPageURL}/${variables.mailTemplates}4`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(
          [
            mailTemplate_to,
            mailTemplate_cc,
            mailTemplate_subject,
            mailTemplate_content
          ]
        ));

      }
      else {
        mailTemplate_content.value_=mail_content_textarea.value; // 4lu istek atıyosun ama welcome_ortak tek li oldugu için hata veriyor.
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${variables.mainPageURL}/${variables.mailTemplates}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(
          mailTemplate_content
        ));
      }

      setTimeout(function() {
        window.location.reload();
      }, delayInMilliseconds);

  }
  else { //If the user do not confirm the confirm popup.
    window.location.reload();
  }
  });
  //const backButton = document.createElement('BUTTON');
  //backButton.innerHTML =`VAZGEÇ`;
  //backButton.setAttribute('class','backButton');
  //backButton.addEventListener ("click", function() {
  //if(confirm("Bir önceki sayfaya yönlendiriliyorsunuz.."))
  //  window.history.back();
  //});

  card.appendChild(changeButton);
  //card.appendChild(backButton);

}

function pageCreationForOthers(data){

  data.forEach(mailTemplate => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const mail_component_textarea = document.createElement('textarea');



    const info = document.createElement('p');
    info.setAttribute('class', 'info');
    info.textContent= mailTemplate.description;

    mail_component_textarea.value = `${mailTemplate.value_}`;
    mail_component_textarea.setAttribute('class','value_');
    mail_component_textarea.style.width=`100%`;
    mail_component_textarea.rows=`3`;
    mail_component_textarea.style.resize=`none`;



    const changeButton = document.createElement('BUTTON');
    changeButton.innerHTML =`DEĞİŞTİR`;
    changeButton.setAttribute('class','changeButton');
    changeButton.addEventListener ("click", function() {

    if(confirm(variables.confirmMessage)) {

          mailTemplate.value_=mail_component_textarea.value; // 4lu istek atıyosun ama welcome_ortak tek li oldugu için hata veriyor.
          var xhr = new XMLHttpRequest();
          xhr.open("POST", `${variables.mainPageURL}/${variables.mailTemplates}`, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(
            mailTemplate
          ));


        setTimeout(function() {
          window.location.reload();
        }, delayInMilliseconds);

    } //Confirm ends
    else { //If the user do not confirm the confirm popup.
      window.location.reload();
    }
  });    //changeButton EVENT LISTENER ENDS.
    container.appendChild(card);
    card.appendChild(info);
    card.appendChild(mail_component_textarea);
    card.appendChild(changeButton);

  });

}

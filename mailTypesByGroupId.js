const app = document.getElementById('root');
const header = document.getElementById('header');

const container = document.createElement('div');
container.setAttribute('class', 'container');

var mailtypeid=localStorage.getItem("mailtypeid");
const backButton = document.createElement('BUTTON');
backButton.innerHTML =`GERİ`;
backButton.setAttribute('class','backButton');
backButton.addEventListener ("click", function() {
  window.history.back();
});
  header.appendChild(backButton);

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', `${variables.mainPageURL}/${variables.mailTypes}/${mailtypeid}/${variables.mailTemplates}`, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(mailTemplate => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      var to = mailTemplate.code.slice(-2).includes("TO");
      var cc = mailTemplate.code.slice(-2).includes("CC");
      var subject = mailTemplate.code.slice(-7).includes("SUBJECT");

//regex
      if(to || cc || subject){

      }
      else {

        const template = document.createElement('a');
        template.textContent = mailTemplate.description;
        template.setAttribute('class',variables.mailTemplateDescription);
        template.setAttribute('href',' mailTemplates.html');
        template.setAttribute('id','templateButton');
        template.addEventListener ("click", function() {
          localStorage.setItem("mailtemplateid", mailTemplate.id);
          localStorage.setItem("mailtemplatecontentid", mailTemplate.mail_id);
          localStorage.setItem("mailtemplatedescription", mailTemplate.description);
          //window.location.assign(`other.html`);
      });

      container.appendChild(card);
      card.appendChild(template);

      }


    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = variables.requestErrorMessage;
    app.appendChild(errorMessage);
  }
}

request.send();

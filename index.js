const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id','container');
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', `${variables.mainPageURL}/${variables.mailTypes}`, true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(mailType => {

      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const type = document.createElement('a');
      type.textContent = mailType.description;
      type.setAttribute('class','mailTypeDescription');
      type.setAttribute('href',' mailTypesByGroupId.html');
      type.setAttribute('id','typeButton');
      type.addEventListener ("click", function() {
        localStorage.setItem("mailtypeid", mailType.id);
        localStorage.setItem("mailtypedesciption", mailType.description);
        //window.location.assign(`other.html`);
    });

      container.appendChild(card);
      card.appendChild(type);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = variables.requestErrorMessage;
    app.appendChild(errorMessage);
  }
}

request.send();

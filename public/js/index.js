var View = {

  root: document.querySelector("#view-container"),
  flash: {
    el: document.querySelector("#flash"),
    show() {
      this.el.style.opacity = 1;
    },
    setMessage(message) {
      this.el.innerHTML = message;
    }
  },
  destroy() {
    while(this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }
  },
};

var FormView = Object.create(View);

FormView.init = function() {

  var inputNode = document.createElement("input");
  this.root.appendChild(inputNode);

  var buttonNode = document.createElement("button");
  var buttonTextNode = document.createTextNode("Make it shortr");
  buttonNode.appendChild(buttonTextNode);
  buttonNode.setAttribute("type", "submit");

  buttonNode.addEventListener("click", () => {
    if(this.root.querySelector("input").value) {
      this.postURL();
      this.destroy();
    } else {
      this.flash.setMessage("Please enter a URL first.");
      this.flash.show();
    }
  });


  this.root.appendChild(buttonNode);
};

FormView.submit = function() {
  
}

FormView.postURL = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/new");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    url : this.root.querySelector("input").value
  }));
  xhr.onload = function() {
    ResultView.init(JSON.parse(xhr.responseText).shortURL);
  }
};

var ResultView = Object.create(View);

ResultView.init = function(shortURL) {
  var anchorNode = document.createElement("a");
  var anchorTextNode = document.createTextNode(window.location + shortURL);
  anchorNode.appendChild(anchorTextNode);
  anchorNode.title = window.location + shortURL;
  anchorNode.href = window.location + shortURL;
  this.root.appendChild(anchorNode);

  var buttonNode = document.createElement("button");
  var buttonTextNode = document.createTextNode("Shorten a new URL");
  buttonNode.appendChild(buttonTextNode);
  buttonNode.addEventListener("click", (event) => {
    this.destroy();
    FormView.init();
  });
  this.root.appendChild(buttonNode);
};






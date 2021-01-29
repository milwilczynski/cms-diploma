function resetClassName() {
  document.getElementById("menu").className = "";
  document.getElementById("header").className = "";
  document.getElementById("wrapper").className = "";
  document.getElementById("footer").className = "";
}

function setModernLayout() {
  document.getElementsByTagName("BODY")[0].setAttribute("id", "page-top");

  //set menu layout
  var menu = document.getElementById("menu");
  menu.className +=
    "d-flex w-100 justify-content-between navbar navbar-expand-lg navbar-dark bg-dark fixed-top text-white";

  //set header layout
  var header = document.getElementById("header");
  header.className += "w-100 bg-primary";

  //set wrapper layout
  var wrapper = document.getElementById("wrapper");
  wrapper.className += "w-100";

  //set footer layout
  var footer = document.getElementById("footer");
  footer.className += "w-100 py-5 bg-dark";
}

resetClassName();
setModernLayout();

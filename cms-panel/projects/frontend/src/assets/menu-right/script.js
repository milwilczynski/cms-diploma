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
  menu.className += "float-right";
  menu.style.minHeight = "100vh";
  menu.style.width = "15%";
  menu.style.maxWidth = "15%";

  //set header layout
  var header = document.getElementById("header");
  header.className += "";
  header.style.width = "100%";

  //set wrapper layout
  var wrapper = document.getElementById("wrapper");
  wrapper.className += "float-top";
  wrapper.style.minHeight = "100vh";

  //set footer layout
  var footer = document.getElementById("footer");
  footer.className += "w-100 float-bottom";
}

resetClassName();
setModernLayout();

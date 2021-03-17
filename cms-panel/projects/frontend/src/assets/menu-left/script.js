function resetClassName() {
  document.getElementById("menu").className = "";
  document.getElementById("header").className = "";
  document.getElementById("wrapper").className = "";
  document.getElementById("footer").className = "";
}

function setModernLayout() {
  document.getElementsByTagName("BODY")[0].setAttribute("id", "page-top");
  document.getElementsByTagName("BODY")[0].style.overflowX = "hidden";
  //set menu layout
  var menu = document.getElementById("menu");
  menu.className += "float-left";
  menu.style.minHeight = "100vh";
  menu.style.minWidth = "15%";
  menu.style.maxWidth = "15%";

  //set header layout
  var header = document.getElementById("header");
  header.className += "";
  header.style.width = "100%";

  //set wrapper layout
  var wrapper = document.getElementById("wrapper");
  wrapper.className += "float-left";
  wrapper.style.maxWidth = "85%";
  wrapper.style.minHeight = "100vh";

  //set footer layout
  var footer = document.getElementById("footer");
  footer.className += "";
  footer.style.height = "10vh";
  footer.style.width = "100%";
  footer.style.marginTop = "100vh";
}

resetClassName();
setModernLayout();

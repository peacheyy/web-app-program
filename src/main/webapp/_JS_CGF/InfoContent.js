function InfoContent() {
  "use strict";

  // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
  var content = `
      <h2>Info</h2>
      <p>
        This is my Info Page Content !!! 
        The home, blog and info links should work. MY NAME IS EVAN
      </p>
    `;

  var ele = document.createElement("div");
  ele.innerHTML = content;
  return ele;
}
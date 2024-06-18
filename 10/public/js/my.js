// testBtn.addEventListener("click", async function () {
// //     var xhttp = new XMLHttpRequest();
// //     xhttp.onreadystatechange = function() { // 어떤 객체에 function() 을 할당함
// //         if (this.readyState == 4 && this.status == 200) {
// //            // Typical action to be performed when the document is ready:
// //            document.getElementById("demo").innerHTML = xhttp.responseText;
// //         }
// //     };
// //     xhttp.open("GET", "/list", true); // 오픈메소드 호출, 인자(1:get,2:url,3:호출여부)
// //     xhttp.send(); //http request 감.


// //async function getText(file) {
//     let resobj = await fetch('/list');
//     //console.log(resobj);
//     let data = await resobj.json;
//     //console.log(data);
//     //pending: 못기다려서 그런거임. await 사용해줄것.

//     let displayData = 
//     `<thead>
//      <td>ID</td>
//      <td>Title</td>
//      <td>Writer</td>
//      <td>Created</td>
//     </thead>
//     <tbody>`;
//     data.forEach((item,index) => {
//         displayData += 
//         `<tr>
//             <td>${item.id}</td>
//             <td>${item.title}</td>
//             <td>${item.profile_id}</td>
//             <td>${item.created}</td>
//         </tr>`
//     });
//     displayData += `</body>`;
//     document.getElementById("datatablesSimple").innerHTML = displayData;
//  // }
// });


testBtn.addEventListener("click", async function () {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //        // Typical action to be performed when the document is ready:
    //         //document.getElementById("demo").innerHTML = xhttp.responseText;
    //         console.log(xhttp.responseText);
    //     }
    // };
    // xhttp.open("GET", "/list", true);
    // xhttp.send();

    let resObj = await fetch("/list");
    let data = await resObj.json();
      //console.log(data);

      let displayData =
      `
      <thead>
          <td>ID</td>
          <td>Title</td>
          <td>writer</td>
          <td>created</td>          
      </thead>
      <tbody>`;
      data.forEach((item,index) => {
          displayData +=
              `<tr>
                  <td>${item.id}</td>
                  <td class="title-cell" data-toggle="modal" data-target="#myModal" data-content="${item.content}">${item.title}</td>
                  <td>${item.writer}</td>
                  <td>${item.created}</td>
              </tr>`
      });

      displayData += `</tbody>`;

      document.getElementById("datatablesSimple").innerHTML = displayData;

    const titleCells = document.querySelectorAll('.title-cell');
    titleCells.forEach(cell => {
        cell.addEventListener('click', function () {
            const content = this.getAttribute('data-content');
            openModal(content); 
        });
    });

  });

  function openModal(content) {
    // select modal 
    const modal = document.getElementById('myModal');
    // inset post content
    modal.querySelector('.modal-body').textContent = content;
    //open modal by jQuery
    $(modal).modal('show'); 
}
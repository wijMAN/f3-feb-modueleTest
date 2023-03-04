let id = 0;
let fun1 = () => {
  let book = document.getElementById("book").value;

  if (localStorage.getItem("history") == null) {
    id = 1;
  } else {
    let b = JSON.parse(localStorage.getItem("history"));
    id = b[b.length - 1]["id"] + 1;
    // localStorage.setItem("users", JSON.stringify(b));
  }
  const d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let date = day + "/" + month + "/" + year;

  let hr = d.getHours();
  let min = d.getMinutes();
  let m = "AM";
  if (hr > 12) {
    m = "PM";
    hr = hr % 12;
  } else if (hr == 12) {
    m = "PM";
  } else if (hr == 0) {
    hr = 12;
  }
  let time = hr + ":" + min + m;
  let obj = {
    id: id,
    book: book,
    date: date,
    time: time,
  };

  if (localStorage.getItem("history") == null) {
    let arr = [];
    arr.push(obj);
    // console.log(arr);
    localStorage.setItem("history", JSON.stringify(arr));
  } else {
    let b = JSON.parse(localStorage.getItem("history"));
    b.push(obj);
    localStorage.setItem("history", JSON.stringify(b));
  }

  let result1 = document.getElementById("result1");
  result1.innerHTML = `
    Book Results for '${book}'
  `;

  fun2(book);
};

let fun2 = (book) => {
  let result = document.getElementById("result");
  result.innerHTML = "";
  //   a.innerHTML = "";
  fetch("https://www.googleapis.com/books/v1/volumes?q=percy+jackson")
    .then((response) => response.json())
    .then((data1) => {
      let data = data1["items"];
      for (let i = 0; i < data.length; i++) {
        const element = data[i]; //object of items array
        let title = element["volumeInfo"]["title"];
        let authors = element["volumeInfo"]["authors"].toString();
        let pageCount = element["volumeInfo"]["pageCount"];
        let publisher = element["volumeInfo"]["publisher"];
        let picLink = element["volumeInfo"]["imageLinks"]["thumbnail"];
        let buyLink = element["volumeInfo"]["infoLink"];

        let regex = new RegExp(book, "i"); //i makes it case in-sensitive
        // let  givenString = " JavaScript, Java, PHP, C++, javacript";
        let res1 = title.search(regex);
        let res2 = authors.search(regex);

        if (res1 >= 0 || res2 >= 0) {
          let el = document.createElement("div");
          el.classList.add("prd");

          el.innerHTML = `
        <img src="${picLink}" alt="img" >
        <br>
         Title : ${title}
         <br><br>
         Author : ${authors}
         <br>
         Page Count: ${pageCount}
         <br>
         Publisher: ${publisher}
         <br>
         <button  class="btn1"><a target="_blank" href="${buyLink}" style="background-color: white; color: black;">Buy Now</a></button> 
             `;

          result.appendChild(el);
        }
      }
    });
};

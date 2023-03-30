let arr = [];
count = 0;
const main = document.getElementById("main");
const pop = document.getElementById("pop");
const popup = document.getElementById("popup");

function savedata(id, quant,callback) {
    Object.keys(cart).forEach(element => {
        if (element == id) {
            cart[element].quantity = quant;
        }
    });
    let request = new XMLHttpRequest();
    request.open("POST", "/savedata", true);
    request.setRequestHeader("Content-type", "application/json");
    // request.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         callback();
    //     }
    // }
    // console.log("heloo");
    request.addEventListener("load",function (response){
        // console.log("sucess");
        callback();
    })
    // console.log("cart");
    request.send(JSON.stringify(cart));
}

function getcart() {
    let request = new XMLHttpRequest();
    request.open("get", "./orderdetails");
    request.addEventListener("load", function (response) {
        cart = JSON.parse(request.responseText);
        // display(arr);
        // console.log(cart,request.responseText);
        getpro();
    })
    request.send();
}
function getpro() {
    let request = new XMLHttpRequest();
    request.open("get", "./getpro");
    request.addEventListener("load", function (response) {
        arr = JSON.parse(request.responseText);
        // console.log(arr);
        display(arr);
    })
    request.send();
}



function removeallchild(k) {
    let c = k.lastElementChild;
    while (c) {
        k.removeChild(c);
        c = k.lastElementChild;
    }
}


function create(el, quant) {
    let card = document.createElement("div");
    card.setAttribute("class", "col-md-2");
    card.setAttribute("id", el.id);

    let hcard = document.createElement("div");
    hcard.setAttribute("class", "card h-100 shadow-sm");

    let im = document.createElement("img");
    im.setAttribute("src", el.image);
    im.setAttribute("class", "card-img-top");
    // console.log(hcard);
    hcard.appendChild(im);

    let bcard = document.createElement("div");
    bcard.setAttribute("class", "card-body");

    let d1 = document.createElement("div");
    d1.setAttribute("class", "mb-3");

    let s1 = document.createElement("span");
    s1.setAttribute("class", "float-start badge rounded-pill bg-primary");
    s1.innerHTML = el.name;

    let s2 = document.createElement("span");
    s2.setAttribute("class", "float-end price-hp");
    s2.innerHTML = el.price + "&#8377";

    d1.appendChild(s1);
    d1.appendChild(s2);
    bcard.appendChild(d1);

    let q = document.createElement("div");
    q.setAttribute("class", "d-flex justify-content-between aling-items-center");
    let h6 = document.createElement("h6");
    h6.innerText = `Quantity:${quant}`
    q.appendChild(h6);

    bcard.appendChild(q);


    let d2 = document.createElement("div");
    // d2.setAttribute("class", "text-center my-4");
    d2.setAttribute("class", "d-flex justify-content-around aling-items-center");

    let a = document.createElement("a");
    a.setAttribute("herf", "#");
    a.setAttribute("class", "btn btn-warning pop");
    a.setAttribute("id", el.id);
    let b = document.createElement("a");
    b.setAttribute("herf", "#");
    b.setAttribute("class", "btn btn-warning pop");
    b.setAttribute("id", el.id);
    b.addEventListener("click", () => {
        console.log(b.id);
        Object.keys(cart).forEach(element => {
            if (element == b.id) {
                delete cart[element];
            }
        });
        let request = new XMLHttpRequest();
        request.open("POST", "/del", true);
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                card.remove();
            }
        }
        // console.log(cart);
        request.send(JSON.stringify(cart));
        // request.send(JSON.stringify(b.id));
        // request.send(b.id);

    })
    b.innerText = "Delete";
    // let b = document.createElement("form");
    // b.setAttribute("id",el.id);
    // b.setAttribute("action",`/addtocart?id=${el.id}`);
    // b.setAttribute("method","POST");
    // let c= document.createElement("input");
    // c.setAttribute("type","submit");
    // c.setAttribute("value","Add to Cart");
    // b.appendChild(c);
    a.addEventListener("click", () => {
        // console.log("hello");
        // console.log(a.id);
        removeallchild(popup);
        let temp;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == parseInt(a.id)) {
                temp = arr[i];
                break;
            }
        }
        // console.log(temp);
        ph1 = document.createElement("h1");
        ph1.innerText = temp.name;
        pp = document.createElement("p");
        pp.innerText = temp.details;
        pb = document.createElement("button");
        pb.setAttribute("class", "btn btn-warning");
        pb.addEventListener("click", () => {
            popup.setAttribute("class", "hidden");
            // popup.classList.remove("show");
            // popup.classList.add("hidden");
        })
        pb.innerText = "OK";
        popup.setAttribute("class", "show");

        // popup.classList.add("show");
        popup.appendChild(ph1);
        popup.appendChild(pp);
        popup.appendChild(pb);
    })
    // b.innerText = "Add to Cart";
    a.innerText = "Details";
    d2.appendChild(b);
    d2.appendChild(a);
    d2.setAttribute("class", "d-flex justify-content-between");
    bcard.appendChild(d2);
    hcard.appendChild(bcard);

    card.appendChild(hcard);

    main.appendChild(card);
}



function display(arr) {
    if (count == Object.keys(cart).length) {
        // console.log(none);
        return;
    }
    removeallchild(main);
    Object.keys(cart).forEach(element => {
        // console.log("c");
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == element) {
                create(arr[i], cart[element].quantity);
            }
        }
    })

}




let cart;
getcart();






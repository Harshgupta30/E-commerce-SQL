let arr = [];
count = 0;
const main = document.getElementById("main");
const pop = document.getElementById("pop");
const popup = document.getElementById("popup");
const checkout = document.getElementById("checkout");
const check = document.getElementsByClassName("check");

function savedata(id, quant, callback) {
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
    request.addEventListener("load", function (response) {
        // console.log("sucess");
        callback();
    })
    // console.log("cart");
    request.send(JSON.stringify(cart));
}

function getcart() {
    let request = new XMLHttpRequest();
    request.open("get", "./getcart");
    request.addEventListener("load", function (response) {
        cart = JSON.parse(request.responseText);
        // display(arr);
        // console.log(cart);
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
    let bd = document.createElement("div");
    bd.setAttribute("class", "d-flex justify-content-around aling-items-center");

    b1 = document.createElement("a");
    b1.setAttribute("class", "btn btn-warning pop");
    b2 = document.createElement("a");
    b1.innerText = "+";
    b1.addEventListener("click", function () {
        quant++;
        // h6.innerText = `Quantity:${quant}`;
        savedata(el.id, quant, () => {
            h6.innerText = `Quantity:${quant}`;
        });
    })
    b2.setAttribute("class", "btn btn-warning pop");
    b2.addEventListener("click", function () {
        if (quant > 1) {
            quant--;
            // h6.innerText = `Quantity:${quant}`;
            savedata(el.id, quant, () => {
                h6.innerText = `Quantity:${quant}`;
            });
        }
    })
    b2.innerText = "-";
    bd.appendChild(b1);
    bd.appendChild(b2);
    bcard.appendChild(q);
    bcard.appendChild(bd);


    let d2 = document.createElement("div");
    // d2.setAttribute("class", "text-center my-4");
    d2.setAttribute("class", "d-flex justify-content-around aling-items-center");

    let a = document.createElement("a");
    a.setAttribute("herf", "#");
    a.setAttribute("class", "btn btn-warning pop");
    a.setAttribute("id", el.id);
    let b = document.createElement("a");
    let c1 = document.createElement("input");
    c1.setAttribute("type", "checkbox");
    c1.setAttribute("class", "check");
    c1.setAttribute("id", el.id);
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
    d2.appendChild(c1);
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
checkout.addEventListener("click", () => {
    // console.log(check.length);
    // check.forEach((element)=>console.log(element));
    let order, amt = 0;
    for (let i = 0; i < check.length; i++) {
        // console.log(check[i].checked);
        if (check[i].checked == true) {
            let temp = check[i].parentNode.parentNode.parentNode;
            let getquant = new XMLHttpRequest();
            getquant.open("post", "/getquantity");
            getquant.setRequestHeader("Content-type", "application/json");
            let pid = { id: check[i].id };
            getquant.send(JSON.stringify(pid));
            getquant.addEventListener("load", (response) => {
                // console.log(typeof(getquant.responseText));
                let obj = JSON.parse(getquant.responseText);
                if (obj.pq >= obj.cq) {
                    amt = amt + (obj.price * obj.cq);
                    // console.log("ok", amt)

                    // let reqorder = new XMLHttpRequest();
                    // // console.log(order);
                    // reqorder.open("post","/order");
                    // reqorder.setRequestHeader("Content-type", "application/json");
                    // reqorder.send(JSON.stringify(order));
                    // reqorder.addEventListener("load",()=>{

                    //     temp.remove();
                    // });
                }
                else {
                    // console.log("out of stock");
                    let s = document.createElement("span");
                    s.innerText = `stock size:${obj.pq}`;
                    s.setAttribute("style", "color:red;")
                    document.getElementById(check[i].id).appendChild(s);
                }
            })
        }
    }
    setTimeout(() => {
        // console.log(amt);
        if (amt > 0) {
            order = { "amount": amt };
            // console.log(order);
            let Amount = document.createElement("span");
            Amount.innerText = amt;
            Amount.setAttribute("style", "position: absolute;bottom: 150px;right: 10px;background-color:white");
            let pay = document.createElement("button");
            pay.setAttribute("class", "btn btn-warning");
            pay.setAttribute("id", "rzp-button1");
            pay.innerText = "PAY";
            pay.setAttribute("style", "position: absolute;bottom: 100px;right: 10px;")
            let body = document.getElementsByTagName("body");
            body[0].appendChild(Amount);
            body[0].appendChild(pay);

            document.getElementById('rzp-button1').onclick = async function (e) {
                e.preventDefault();

                var xhr = new XMLHttpRequest();

                xhr.open("POST", "/payment", true);
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        var orderData = JSON.parse(this.responseText);
                        var options = {
                            "key": "rzp_test_s5jNBoL3doMVgH",
                            "amount": `${amt}`,
                            "currency": "INR",
                            "order_id": orderData.id,
                            "handler": function (res) {
                                for (let i = 0; i < check.length; i++) {
                                    if (check[i].checked == true) {
                                        let temp = check[i].parentNode.parentNode.parentNode;
                                        let getquant = new XMLHttpRequest();
                                        getquant.open("post", "/getquantity");
                                        getquant.setRequestHeader("Content-type", "application/json");
                                        let pid = { id: check[i].id };
                                        getquant.send(JSON.stringify(pid));
                                        getquant.addEventListener("load",(response)=>{
                                            let obj = JSON.parse(getquant.responseText);
                                            if(obj.pq >= obj.cq){
                                                // console.log(res.razorpay_payment_id);
                                                data = {id:check[i].id,quant:obj.cq,payment_id:res.razorpay_payment_id};
                                                // console.log("client",data);
                                                let reqorder = new XMLHttpRequest();
                                                reqorder.open("post","/order");
                                                reqorder.setRequestHeader("Content-type", "application/json");
                                                reqorder.send(JSON.stringify(data));
                                                reqorder.addEventListener("load",()=>{
                                                    temp.remove();
                                                })
                                            }
                                        })
                                    }
                                }

                                // alert(response.razorpay_payment_id);
                                // alert(response.razorpay_order_id);
                                // alert(response.razorpay_signature);
                            }
                        };
                        var rzp1 = new Razorpay(options);
                        rzp1.open();
                    }
                };

                xhr.send(JSON.stringify({
                    amount: amt,
                    currency: "INR"
                }));


                // let response = await fetch("/payment", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         amount: amt,
                //         currency: "INR"
                //     })
                // });
                // let orderData = await response.json();


                // var options = {
                //     "key": 'rzp_test_s5jNBoL3doMVgH', // Enter the Key ID generated from the Dashboard
                //     "amount": `${amt}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                //     "currency": "INR",
                //     "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                //     "handler": function (response) {
                //         alert(response.razorpay_payment_id);
                //         alert(response.razorpay_order_id);
                //         alert(response.razorpay_signature)
                //     },
                // };

                // var rzp1 = new Razorpay(options);
                // rzp1.open();
            }

            //not needed

            // rzp1.on('payment.failed', function (response){
            //         alert(response.error.code);
            //         alert(response.error.description);
            //         alert(response.error.source);
            //         alert(response.error.step);
            //         alert(response.error.reason);
            //         alert(response.error.metadata.order_id);
            //         alert(response.error.metadata.payment_id);
            // });
            // let orderpayment = new XMLHttpRequest();
            // orderpayment.open("post", "/payment");
            // orderpayment.setRequestHeader("Content-type", "application/json");
            // orderpayment.send(JSON.stringify(order));
            // orderpayment.addEventListener("load", () => {

            // })
        }

    }, 1000)

})



let cart;
getcart();






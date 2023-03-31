let arr = [];

const prev = document.getElementById("prev");
const next = document.getElementById('next');


function gethome(s){
    let home = new XMLHttpRequest();
    home.open("post",`./homepro?id=${s}`);
    home.addEventListener("load",function (response){
        // console.log(home.responseText);
        fun(home.responseText)
    })
    home.send();
}
function revhome(s){
    let rhome = new XMLHttpRequest();
    // console.log(typeof(s),s);
    rhome.open("post",`./homerev?id=${s}`);
    rhome.addEventListener("load",function (response){
        // console.log(rhome.responseText);
        fun(rhome.responseText)
    })
    rhome.send();
}

count = 0;
const main = document.getElementById("main");
const pop = document.getElementById("pop");
const popup = document.getElementById("popup");


function removeallchild(k) {
    let c = k.lastElementChild;
    while (c) {
        k.removeChild(c);
        c = k.lastElementChild;
    }
}


function create(el) {
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

    let s1 = document.createElement("div");
    s1.setAttribute("class", "float-start badge rounded-pill bg-primary");
    s1.innerHTML = el.name;

    let s2 = document.createElement("div");
    s2.setAttribute("class", "float-end price-hp");
    s2.innerHTML = el.price + "&#8377";

    d1.appendChild(s1);
    d1.appendChild(s2);
    b1 = document.createElement("br");
    bcard.appendChild(d1);
    bcard.appendChild(b1);
    bcard.appendChild(b1);

    // let h5 = document.createElement("h5");
    // h5.setAttribute("class", "card-title");
    // h5.innerText = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum.Asperiores accusamus harum ducimus velit odit ut.Saepe, iste optio laudantium sed aliquam sequi."

    // bcard.appendChild(h5);

    let d2 = document.createElement("div");
    d2.setAttribute("class", "text-center my-4");

    let a = document.createElement("a");
    a.setAttribute("herf", "#");
    a.setAttribute("class", "btn btn-warning pop");
    a.setAttribute("id", el.id);

    // let b = document.createElement("form");
    // b.setAttribute("id", el.id);
    // b.setAttribute("action", `/addtocart?id=${el.id}`);
    // b.setAttribute("method", "POST");
    // let c = document.createElement("input");
    // c.setAttribute("type", "submit");
    // c.setAttribute("class", "btn btn-warning pop");
    // c.setAttribute("value", "Add to Cart");
    // b.appendChild(c);
    
    let b = document.createElement("a");
    b.setAttribute("herf", "#");
    b.setAttribute("class", "btn btn-warning pop");
    b.setAttribute("id", el.id);
    b.innerText = "Add to Cart";
    b.addEventListener("click",()=>{
        let add = new XMLHttpRequest();
        add.open("post",`/addtocart?id=${el.id}`);
        add.addEventListener("load",(response)=>{
            let temp = document.createElement("span");
            temp.innerText="product added sucessfull";
            document.getElementById(el.id).appendChild(temp);
        })
        add.send();
    })
    a.addEventListener("click", () => {
        removeallchild(popup);
        let temp;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == parseInt(a.id)) {
                temp = arr[i];
                break;
            }
        }

        ph1 = document.createElement("h1");
        ph1.innerText = el.name;
        pp = document.createElement("p");
        pp.innerText = el.details;
        pb = document.createElement("button");
        pb.setAttribute("class", "btn btn-warning");
        pb.addEventListener("click", () => {
            popup.setAttribute("class", "hidden");

        })
        pb.innerText = "OK";
        popup.setAttribute("class", "show");

        popup.appendChild(ph1);
        popup.appendChild(pp);
        popup.appendChild(pb);
    })
    a.innerText = "Details";
    d2.appendChild(b);
    d2.appendChild(a);
    d2.setAttribute("class", "d-flex justify-content-around");
    bcard.appendChild(d2);
    hcard.appendChild(bcard);

    card.appendChild(hcard);

    main.appendChild(card);
}


next.addEventListener("click",()=>{
    // console.log(typeof(main.lastElementChild.id));
    let s = 1 + parseInt(main.lastElementChild.id);
    gethome(s);
})

prev.addEventListener("click",()=>{
    // console.log(main.firstElementChild.id);
    let s = parseInt(main.firstElementChild.id);
    // console.log(s);
    revhome(s);

})


function fun(res) {
    res = JSON.parse(res);
    // console.log(typeof(res));
    if(res.length!=0){
        removeallchild(main);
        for(let i=0;i<res.length;i++){
            // console.log(res[i]);
            create(res[i]);
        }
    }
    
}

gethome(0);
let arr = [];

const prev = document.getElementById("prev");
const next = document.getElementById('next');

function gethome(s){
    let home = new XMLHttpRequest();
    home.open("post",`./sellerpro?id=${s}`);
    home.addEventListener("load",function (response){
        // console.log(home.responseText);
        fun(home.responseText)
    })
    home.send();
}
function revhome(s){
    let rhome = new XMLHttpRequest();
    // console.log(typeof(s),s);
    rhome.open("post",`./sellerrev?id=${s}`);
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

    let s1 = document.createElement("span");
    s1.setAttribute("class", "float-start badge rounded-pill bg-primary");
    s1.innerHTML = el.name;

    let s2 = document.createElement("span");
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

    // let a = document.createElement("a");
    // a.setAttribute("herf", "#");
    // a.setAttribute("class", "btn btn-warning pop");
    // a.setAttribute("id", el.id);

    let b = document.createElement("form");
    b.setAttribute("id", el.id);
    b.setAttribute("action", `/sdelete?id=${el.id}`);
    b.setAttribute("method", "POST");
    let c = document.createElement("input");
    c.setAttribute("type", "submit");
    c.setAttribute("class", "btn btn-warning pop");
    c.setAttribute("value", "Delete");
    b.appendChild(c);
    
    let u = document.createElement("form");
    u.setAttribute("id", el.id);
    u.setAttribute("action", `/supdate?id=${el.id}&pn=${el.name}&pp=${el.price}&pd=${el.details}&ps=${el.seller}&qn=${el.quantity}`);
    u.setAttribute("method", "POST");
    let uc = document.createElement("input");
    uc.setAttribute("type", "submit");
    uc.setAttribute("class", "btn btn-warning pop");
    uc.setAttribute("value", "Update");
    u.appendChild(uc);

    d2.appendChild(b);
    d2.appendChild(u);
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

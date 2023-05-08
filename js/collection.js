

//Cac Ham Collection Tương tự Shop



import myJSON from "./data.json" assert { type: "json" };

const product = myJSON.product;
const listItem = [];

var render__data__collectionpage = document.getElementById(
    "render__data__collectionpage",
);
product.forEach((item) => {
    var objData = {
        id: String,
        img: String,
        total: Number,
        name: String,
        rank: Number,
        category: String,
        panigation_id: Number,
    };

    objData.id = item.id;
    objData.img = item.image;
    objData.total = item.price;
    objData.name = item.title;

    listItem.push(objData);
});

const maxItem = listItem.length;
//Get page with panigation
const pageSize = 6;
var btnNextPage = document.getElementById("nextPage");
var btnPrePage = document.getElementById("prePage");
var numberPage = document.querySelector(".numberPage");
const url = window.location.href.toString();
const strs = url.split("?page="); // cut string
const id = strs.at(-1); //
var idInt = parseInt(id); // get int
console.log(idInt);

handerClickNumberRender(idInt, idInt + 1);

function handerClickNumberRender(min, max) {
    let before = min * pageSize;
    let after = max * pageSize;
    render__data__collectionpage.innerHTML = "";
    for (var i = before; i < after; i++) {
        listItem.map((items) => {
            if (parseInt(items.id) === i)
                renderItem(render__data__collectionpage, items);
            items.panigation_id = min / pageSize;
        });
    }
}

var valueNumber = 0;
while (valueNumber * pageSize <= maxItem) {
    numberPage.innerHTML += `<button class="numberPageItem btn btn-outline-dark rounded-0" id="${valueNumber}">${valueNumber}</button>`;
    valueNumber++;
}
console.log(valueNumber);
var numberPageItem = document.querySelectorAll(".numberPageItem");

numberPageItem.forEach((item) => {
    item.addEventListener("click", () => {
        let pageid = parseInt(item.id);
        console.log(pageid);
        let min = pageid * pageSize;
        let max = (pageid + 1) * pageSize;
        handerClickNumberRender(min, max);
        window.location = `./collection.html?page=${pageid}`;
    });
});

btnPrePage.addEventListener("click", () => {
    console.log();
    if (idInt != 0) {
        handerClickNumberRender(idInt - 1, idInt);
        window.location = `./collection.html?page=${idInt - 1}`;
    }
});
btnNextPage.addEventListener("click", () => {
    if (idInt <= valueNumber) {
        handerClickNumberRender(idInt + 1, idInt + 2);
        window.location = `./collection.html?page=${idInt + 1}`;
    } else window.location = `./collection.html?page=${valueNumber}`;
});

//Render item data from JSON FILE
function renderItem(render__data__collectionpage, items) {
    render__data__collectionpage.innerHTML += `
    <div id="${items.id}" class="col-12 col-md-4 col-sm-6 my-3  item_card" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="500">
                            <div class="b-shadow">
                            <a class="show_product position-relative w-100 text-dark cusor-pointer" href="">
                            <!-- img item -->
                            <div class="img__item card w-100 p-0 border-0 rounded-0">
                            <img class="card-img p-0"  src="${items.img}" width="100%"   alt="">
                            <div class="sale__item card-img-overlay top-0 start-0 px-0 pt-3">
                                <span class="bg-success text-white px-2 py-1">New</span>
                            </div>
                                
                            </div>
                            <!-- content item -->
                            <div class="content__item  w-100 px-3 py-3 ">
                                <div class=" d-flex m-0">
                                    <div class="nameAndCategory__item col-10 m-0 p-0">
                                        <p class="name__item m-0 fw-bold ">${items.name}</p>
                                        <p class="category__item m-0 grey2--color">category</p>
                                    </div>
                                    <div class="btnLike__item col-2">
                                        <a href="">
                                            <img src="../img/icon/circle.png" width="32px">
                                        </a>
                                    </div>
                                </div>
                        
                                <div class="totalAndSale__item m-0 w-100 d-flex m-0">
                            
                                    <div class="total__item align-self-start col-10  fw-bold m-0 p-0">${items.total}$</div>
                                    <div class="sale__item align-self-end col-2 text-danger">-20%</div>
                                </div>
                            </div>
                            
                            </a>
                            </div>
                        </div>
    `;
}
//View product
var Listshow_product = document.querySelectorAll(".show_product");

Listshow_product.forEach((product) => {
    product.addEventListener("click", () => {
        let getParent = product.parentElement.parentElement;
        let getid = getParent.id;
        product.href = `../html/productItem.html?id=${getid}`;
    });
});

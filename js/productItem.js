    import myJSON from "./data.json" assert { type: "json" };
    const product = myJSON.product;
    const listItem = [];

//Hàm lấy ide browser
    function getId() {
        return parseInt(window.location.href.toString().split("?id=").at(-1));
    }

//Render ra product detail HTML
function renderProduct(product) {
    render__productItemData.innerHTML += `
        
    <div class="col-12 col-sm-12 col-md-6  m-0 d-flex ">
    <div class="row  w-100 ">
    <div class="img__productItem col-12 col-sm-12 col-md-6 align-self-center "  data-aos="fade-down-right">
    <img src=${product.img} width="100%" alt="">
    </div>
    </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6  m-0 font-amazon">
    <div class="row d-flex  ">
    <div class="col-12 col-sm-12 col-md-9 " data-aos="fade-down-left">
        <h1 class="name__productItem fw-bold">${product.name}</h1>
        <p class="someCategory__productItem grey2--color">lorem lorem lore lorem  <span class="bg-success px-3 py-1 text-white fw-bold">New </span></p>
        <div class="rank__productItem">
            star star star star <span class="rating__prudctItem">60 Ratings</span>
        </div>
        <h1 class="price__productItem fw-bold my-3">US  ${product.total} $</h1>
        <div class="size__productItem my-3">
            <h3 class="fw-bold">Size</h3>
            <div class="btn btn-outline-dark px-3">X</div>
            <div class="btn btn-outline-dark px-3">M</div>
            <div class="btn btn-outline-dark px-3">L</div>
            <div class="btn btn-outline-dark px-3">XL</div>
        </div>
        <div class="quantity__productItem my-3">
            <span>Quantity</span>
            <input type="checkbox">
        </div>
        <button class="btn__buyNow btn btn-dark rounded-0 w-44  my-4" style="margin-right: 1rem;">Buy Now</button>
        <button value=${product.id} class="btn__addToCart btn btn-dark rounded-0 w-44 ">Add to Cart</button>
        <div class="description__productItem fw-bold my-2 ">Description:</div>
        <div class="Size&Fit__productItem fw-bold my-2">Size&Fit:</div>
    </div>
    <div class="col-md-3"></div>
    </div>
    </div>
`;
}

//Lấy data từ JSON
    var render__productItemData = document.getElementById(
        "render__productItemData",
    );
    product.forEach((item) => {
        let objData = {
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

//Render product theo id trả về từ browser url
    var setItem = [];
    var namepr = "productCart";
    listItem.map((product) => {
        if (parseInt(product.id) === getId()) {
            setItem.push(product);
            namepr += product.id;
            renderProduct(product);
        }
    });

//Add to Cart
    var btn__buyNow = document.querySelector(".btn__buyNow");
    var btn__addToCart = document.querySelector(".btn__addToCart");
    var data = [];
    window.addEventListener("load", () => {
        btn__addToCart.addEventListener("click", (event) => {
            handleAddCart("testData", setItem, event);
        });
    });
    
// Lưu Data khi mua hàng vào SessionStorage 
    function handleAddCart(nameData, setItem) {
        let checkedData = sessionStorage.getItem(nameData);
        if (checkedData) {
            let DataCart = JSON.parse(checkedData);
            let mItem;
            let count = 1;
            DataCart.forEach((item) => {
                mItem = Object.assign({}, item[0] || item);
                if (setItem[0].id === mItem.id) {
                    console.log("trung ma");
                    count = 0;
                }
            });
            if (count === 1) {
                console.log(count);
                DataCart.push(setItem);
                let newData = JSON.stringify(DataCart);
                sessionStorage.setItem(nameData, newData);
                renderQuanityCart();
            } else alert("San pham da co trong gio hang");
        } else {
            sessionStorage.setItem(nameData, JSON.stringify(setItem));
            renderQuanityCart();
        }
    }

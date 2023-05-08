    import myJSON from "./data.json" assert { type: "json" };

    const product = myJSON.product;
    const listItem = [];
    const maxItem = listItem.length;
    var render__data__Shoppage = document.getElementById("render__data__Shoppage");

//Lấy data từ JSON
    product.forEach((item) => {
        var objData = {
            id: "",
            img: "",
            total: Number,
            name: "",
            rank: "",
            category: "",
            panigation_id: Number,
        };

        objData.id = item.id;
        objData.img = item.image;
        objData.total = item.price;
        objData.name = item.title;

        listItem.push(objData);
    });

//Get page with panigation
    const pageSize = 8;
    var btnNextPage = document.getElementById("nextPage");
    var btnPrePage = document.getElementById("prePage");
    var numberPage = document.querySelector(".numberPage");

//Lấy id từ url Window
    const url = window.location.href.toString();
    const strs = url.split("?page=");
    const id = strs.at(-1);
    var idInt = parseInt(id);

    handerClickNumberRender(idInt, idInt + 1);

//Render lại sản phâm theo page id
    function handerClickNumberRender(min, max) {
        let before = min * pageSize;
        let after = max * pageSize;
        render__data__Shoppage.innerHTML = "";
        for (var i = before; i < after; i++) {
            listItem.map((items) => {
                if (parseInt(items.id) === i)
                    renderItem(render__data__Shoppage, items);
                items.panigation_id = min / pageSize;
            });
        }
    }

//Render số trang theo pagesize
    var valueNumber = 0;
    while (valueNumber * pageSize <= maxItem) {
        numberPage.innerHTML += `<button class="numberPageItem btn btn-outline-dark rounded-0" id="${valueNumber}">${valueNumber}</button>`;
        valueNumber++;
    }

//Xử lý khi Onclick vào pageNumber
    var numberPageItem = document.querySelectorAll(".numberPageItem");
    numberPageItem.forEach((item) => {
        item.addEventListener("click", () => {
            var pageid = parseInt(item.id);
            console.log(pageid);
            var min = pageid * pageSize;
            var max = (pageid + 1) * pageSize;
            handerClickNumberRender(min, max);
            window.location = `./shop.html?page=${pageid}`;
        });
    });

// Xử lý khi chuyển lui trang
    btnPrePage.addEventListener("click", () => {
        if (idInt != 0) {
            handerClickNumberRender(idInt - 1, idInt);
            window.location = `./shop.html?page=${idInt - 1}`;
        }
    });

//Xử lý khi chuyển tới trang
    btnNextPage.addEventListener("click", () => {
        if (idInt <= valueNumber) {
            handerClickNumberRender(idInt + 1, idInt + 2);
            window.location = `./shop.html?page=${idInt + 1}`;
        } else window.location = `./shop.html?page=${valueNumber}`;
    });

//Render item data from JSON FILE
function renderItem(render__data__Shoppage, items) {
    render__data__Shoppage.innerHTML += `
    <div id="${items.id}" class="col-12 col-md-3 col-sm-6 my-3  item_card">
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

//Render Random san pham
    var asideRight__shoppage = document.getElementById("asideRight__shoppage");
    renderRandom(asideRight__shoppage, listItem);
    listItem.map((items) => {
        renderRandom(asideRight__shoppage, items);
    });
    function renderRandom(asideRight__shoppage, items) {
        console.log(items);
        for (var i = 19; i > 13; i--) {
            if (items.id === i)
                asideRight__shoppage.innerHTML += `
        <div id="${items.id}" class="col-12 col-md-4 col-sm-6 my-3  item_card" data-aos="flip-left" data-aos-easing="linear" data-aos-duration="500">
        <div class="b-shadow">
        <a class="show_product position-relative w-100 text-dark cusor-pointer" href="">
        <!-- img item -->
        <div class="img__item card w-100 p-0 border-0 rounded-0">
        <img class="card-img p-0"  src="${items.img}" width="100%"   alt="">
        <div class="sale__item card-img-overlay top-0 start-0 px-0 pt-3">
            <span class="bg-danger text-white px-2 py-1">Hot</span>
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
    }

//View product detail
    var Listshow_product = document.querySelectorAll(".show_product");
    Listshow_product.forEach((product) => {
        product.addEventListener("click", () => {
            let getParent = product.parentElement.parentElement;
            let getid = getParent.id;
            product.href = `../html/productItem.html?id=${getid}`;
        });
    });

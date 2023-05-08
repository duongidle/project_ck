window.addEventListener("load", () => {

    //Submit thành công khi thanh toán
    let submitTotal = document.getElementById("submitTotal");
    submitTotal.addEventListener("click", () => {
        alert("Thay Toan Thanh Cong!!!");
        sessionStorage.removeItem("testData");
        location.reload();
    });
    
    // Render item HTML lấy từ Session Storage
    const dataCart = JSON.parse(sessionStorage.getItem("testData"));
    if (dataCart) {
        dataCart.map((item) => {
            renderItem(item);
        });
    } else document.querySelector(".cart__main__render ").innerHTML = "No data";

    //Function Render item HTML
    function renderItem(item) {
        let mItem = Object.assign({}, item[0] || item);
        let data = document.querySelector(".cart__main__render ");
        data.innerHTML += `
    <div id=${mItem.id} class="cartItem__payment row  px-2 d-flex b-shadow rounded-2 my-3">
    <div class=" col-md-1 img__cartPayment">
        <img src=${mItem.img} width="100%" alt="">
    </div>
    <div class="col-4 col-sm-3 col-md-4 p-0  name__cartPayment">
        <h5 class="fw-bold">${mItem.name}</h5>
        <p class="grey2--color">Size: sxyz</p>
    </div>
    <div class="col-3 col-sm-4 col-md-3  p-0 amount__cartPayment d-flex">
        <!-- <div class="input-group w-44 d-flex"> -->
            <button class="minus-item input-group-addon btn btn-outline-dark rounded-0 px-1 " data-name="">-</button>
            <input type="number" class="item-count  w-44 form-control" data-name="" value="1">
            <button class="plus-item btn btn-outline-dark rounded-0 px-1 input-group-addon " data-name="">+</button>
        <!-- </div> -->
    </div>
    <div class="col-2 p-0   price__cartPayment fw-bold " value= ${mItem.total}$>
    ${mItem.total}$
    </div> 
    <div class="col-1 p-0 remove__cartPayment">
        <button class="deleteItemButton border-0 cusor-pointer" style="background-color:white ;outline: none;">
            <img src="../img/icon/trash.png" width="25px" alt="">
        </button>
    </div>
    </div>`;
    }

    //Hàm xử lý khi click xóa sản phẩm 
    let btnTotal = document.getElementById("totalButton");
    let cartItem__payment =
        document.getElementsByClassName("cartItem__payment");
    handleRemoveItem();
    updateTotal();
    function handleRemoveItem() {
        let btnRemove = document.getElementsByClassName("deleteItemButton");
        for (let i = 0; i < btnRemove.length; i++) {
            let btn = btnRemove[i];
            btn.addEventListener("click", () => {
                btn.parentElement.parentElement.remove();
                updateTotal();
            });
        }
    }

    let testbtn = document.getElementById("test");
    testbtn.addEventListener("click", updateTotal);

    //Hàm cập nhật tổng tiền tính tổng tiền
    function updateTotal() {
        let total = 0;
        let totalCart = document.getElementById("totalCart");
        let price__cartPayment =
            document.getElementsByClassName("price__cartPayment");
        totalCart.innerHTML = "";
        for (let i = 0; i < cartItem__payment.length; i++) {
            let price__cart = price__cartPayment[0];
            let valueTotal = parseFloat(
                price__cart.getAttribute("value").replace("$", ""),
            );
            total += valueTotal;

            console.log(total);
        }
        totalCart.innerHTML += total;
    }

});

var Counter = 1;
var proPrice,ImageSlider,QuantityCounter,SelectedAddOns, TotalAddOnPrice = 0;
var btn=document.getElementById('btn');
proPrice = document.getElementById('product-price');
PriceOption = document.getElementById('options');
ImageSlider = document.getElementById('image-slider');
QuantityCounter = document.getElementById('quanity-val');
SelectedAddOns = document.getElementById('add-desc');
setAddOnPrice = document.getElementById('product-price-addons');
totalPrice = document.getElementById('total-price');

function defaultSettings() {
    getPrice(PriceOption.children[0]);
    highlightImage(PriceOption.children[0]);
    highlightImage(ImageSlider.children[0]);
    highlightImage(QuantityCounter);
    calculatePrice();
}

function changeImage(obj) {
    document.getElementById('main-image').src = obj.src;
    highlightImage(obj);
}

function highlightImage(obj) {
    let slider = document.getElementById(obj.parentElement.id);
    for (let index = 0; index < slider.children.length; index++) {
        slider.children[index].classList.remove('Markup');
        slider.children[index].classList.add('rmMarkup');
    }
    obj.classList.remove('rmMarkup');
    obj.classList.add('Markup');
    if(QuantityCounter.getAttribute('textColor')) {
        QuantityCounter.style.color = 'black';
    }
}

function popupImage(element) {
    let src = document.getElementById('main-image').src;
    let popup = document.getElementById('popup');

    popup.children[0].src = src;
    popup.style.display = 'flex';
}

function hidePopup(element) {
    document.getElementById('popup').style.display = 'none';
}

function getPrice(elm) {
    let price;
    if(elm.children){
       price  = elm.children[0].innerText;
    }
    proPrice.innerText = '';
    proPrice.innerText = price;
    calculatePrice();
}

function addItem(elm) {
    if(elm.checked) {
        Counter++;
        getAddOnPrices(elm);
    }
    else if (!(elm.checked) && Counter > 0){
        Counter--;
        getSubOnPrices(elm);
    }
    btn.innerHTML = `Add ${Counter} Item To Cart`;
}

function getAddOnPrices(elm) {
    let eId= elm.id;
    let ePrice = parseFloat(document.getElementById('salePrice'+eId).innerHTML.replace('$',''));
    TotalAddOnPrice = parseFloat(TotalAddOnPrice) + parseFloat(ePrice);
    TotalAddOnPrice = TotalAddOnPrice.toFixed(2);
    SelectedAddOns.innerHTML = `${Counter-1} add-ons selected`;
    setAddOnPrice.innerHTML = `+ $${TotalAddOnPrice}`;
    calculatePrice();
}

function getSubOnPrices(elm) {
    let eId= elm.id;
    let ePrice = parseFloat(document.getElementById('salePrice'+eId).innerHTML.replace('$',''));
    TotalAddOnPrice = TotalAddOnPrice - ePrice;
    SelectedAddOns.innerHTML = `${Counter-1} add-ons selected`;
    setAddOnPrice.innerHTML = `+ $${TotalAddOnPrice}`;
    calculatePrice();
}

function calculatePrice() {
    var aPrice = 0, tprice = 0, pPrice=0;
    pPrice = parseFloat(proPrice.innerHTML.replace('$',''));
    if(!isNaN(pPrice)) {
        tprice = pPrice + aPrice;
    }
    aPrice = parseFloat(setAddOnPrice.innerHTML.replace('$','').replace('+',''));
    if(!isNaN(aPrice)) {
        tprice = tprice + aPrice;
    }
    tprice = tprice.toFixed(2);
    totalPrice.innerHTML = `$${tprice}`;
}

function IncreaseCount(obj) {
    let curValue = parseInt(QuantityCounter.children[0].innerHTML);
    if(obj.id == 'sub' && curValue > 1) {
        curValue--;
    } else if (obj.id == 'add') {
        curValue++;
    }
    QuantityCounter.children[0].innerHTML = curValue;
    calculatePrice();
}
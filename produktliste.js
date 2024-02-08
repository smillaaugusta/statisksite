const urlParams = new URLSearchParams(window.location.search);

const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?limit=100&category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  //looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  //  console.log(product);

  //fange template
  const template = document.querySelector("#smallProductTemplate").content;

  //lav en copy
  const copy = template.cloneNode(true);

  //ændrer indhold
  copy.querySelector("h2").textContent = product.productdisplayname;
  if (product.soldout) {
    //produktet udsolgt
    copy.querySelector("article").classList.add("soldOut");
  }

  copy
    .querySelector(".read-more")
    .setAttribute("href", `product.html?id=${product.id}`);

  copy.querySelector(".price").textContent = product.price;
  copy.querySelector(".season").textContent = product.season;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  if (product.discount) {
    //produktet er on sale
    copy.querySelector(".onDiscount").textContent = product.discount + "%";
  } else {
    copy.querySelector(".onDiscount").remove();
  }

  copy.querySelector(".read-more").href = "produkt.html?id=" + product.id;
  document.querySelector(".product_list").appendChild(copy);
}

const urlParams = new URLSearchParams(window.location.search);

const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  products.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);

  const template = document.querySelector("#smallProductTemplate").content;

  const copy = template.cloneNode(true);

  copy.querySelector("h2").textContent = product.productdisplayname;
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldout");
  }

  /*   copy.querySelector(".subtle .span_1").textContent = product.articletype;

  copy.querySelector(".subtle .span_2").textContent = product.brandname;
*/
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

  copy.querySelector(".read").href = "produkt.html?id=" + product.id;
  document.querySelector(".product_list").appendChild(copy);
}

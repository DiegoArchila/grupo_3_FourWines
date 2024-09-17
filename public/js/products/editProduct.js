window.addEventListener("load", () => {
  let formEditProduct = document.querySelector("#editProduct");
  let erroresList = new Map();
  const ErroresTypes = ["Required", "Min", "Max", "Number"];

  formEditProduct.addEventListener("submit", (event) => {
    erroresList.clear();

    //Campos de validacion
    let productNameInput = document.querySelector("#productName");
    let productDescriptionInput = document.querySelector("#productDescription");
    let productTerminatedInput = document.querySelector("#productTerminated");
    let categoryIdSelect = document.querySelector("#categoryId");
    let unitsBuyesInput = document.querySelector("#unitsBuyes");
    let priceGrossInput = document.querySelector("#priceGross");
    let priceFinalInput = document.querySelector("#priceFinal");

    //productNameInput
    if (productNameInput.value == "" || !productNameInput.value) {
      erroresList.set(
        "productName-Required",
        "Ingrese el nombre del producto."
      );
    } else {
      if (productNameInput.value.length < 2) {
        erroresList.set(
          "productName-Min",
          `El campo debe tener minimo 2 caracteres.`
        );
      } else if (productNameInput.value.length > 128) {
        erroresList.set(
          "productName-Max",
          `El campo debe tener maximo 128 caracteres.`
        );
      }
    }

    //productDescriptionInput
    if (productDescriptionInput.value == "" || !productDescriptionInput.value) {
      erroresList.set(
        "productDescription-Required",
        "Ingrese la descripcion del producto."
      );
    } else {
      if (productDescriptionInput.value.length < 2) {
        erroresList.set(
          "productDescription-Min",
          `El campo debe tener minimo 2 caracteres.`
        );
      } else if (productDescriptionInput.value.length > 512) {
        erroresList.set(
          "productDescription-Max",
          `El campo debe tener maximo 512 caracteres.`
        );
      }
    }

    //productTerminatedInput
    if (productTerminatedInput.value == "" || !productTerminatedInput.value) {
      erroresList.set(
        "productTerminated-Required",
        "Ingrese el terminado del producto."
      );
    } else {
      if (productTerminatedInput.value.length < 2) {
        erroresList.set(
          "productTerminated-Min",
          `El campo debe tener minimo 2 caracteres.`
        );
      } else if (productTerminatedInput.value.length > 64) {
        erroresList.set(
          "productTerminated-Max",
          `El campo debe tener maximo 64 caracteres.`
        );
      }
    }

    //categoryIdSelect
    if (categoryIdSelect.value == "" || !categoryIdSelect.value) {
      erroresList.set(
        "categoryId-Required",
        "Ingrese la categoria del producto."
      );
    }

    //unitsBuyesInput
    if (unitsBuyesInput.value == "" || !unitsBuyesInput.value) {
      erroresList.set(
        "unitsBuyes-Required",
        "Ingrese el inventario del producto."
      );
    } else {
      if (Number(unitsBuyesInput.value) == NaN) {
        erroresList.set("unitsBuyes-Number", "Ingrese un numero");
      } else if (unitsBuyesInput.value < 0) {
        erroresList.set(
          "unitsBuyes-Min",
          `El campo debe ser mayor o igual a 0.`
        );
      } else if (unitsBuyesInput.value > 999) {
        erroresList.set(
          "unitsBuyes-Max",
          `El campo debe ser menor o igual a 999.`
        );
      }
    }

    //priceGrossInput
    if (priceGrossInput.value == "" || !priceGrossInput.value) {
      erroresList.set(
        "priceGross-Required",
        "Ingrese el precio bruto del producto."
      );
    } else {
      if (Number(priceGrossInput.value) == NaN) {
        erroresList.set("priceGross-Number", "Ingrese un numero");
      } else if (priceGrossInput.value < 0) {
        erroresList.set(
          "priceGross-Min",
          `El campo debe ser mayor o igual a 0.`
        );
      }
    }

    //priceFinalInput
    if (priceFinalInput.value == "" || !priceFinalInput.value) {
      erroresList.set(
        "priceFinal-Required",
        "Ingrese el precio final del producto."
      );
    } else {
      if (Number(priceFinalInput.value) == NaN) {
        erroresList.set("priceFinal-Number", "Ingrese un numero");
      } else if (priceFinalInput.value < 0) {
        erroresList.set(
          "priceFinal-Min",
          `El campo debe ser mayor o igual a 0.`
        );
      }
    }

    //Listado de errores de los campos
    let productName_errores = document.querySelector("#productName_errores ul");
    let productDescription_errores = document.querySelector(
      "#productDescription_errores ul"
    );
    let productTerminated_errores = document.querySelector(
      "#productTerminated_errores ul"
    );
    let categoryId_errores = document.querySelector("#categoryId_errores");
    let unitsBuyes_errores = document.querySelector("#unitsBuyes_errores");
    let priceGross_errores = document.querySelector("#priceGross_errores");
    let priceFinal_errores = document.querySelector("#priceFinal_errores");

    //Limpieza del contenido de los div de errores
    productName_errores.innerHTML = "";
    productDescription_errores.innerHTML = "";
    productTerminated_errores.innerHTML = "";
    categoryId_errores.innerHTML = "";
    unitsBuyes_errores.innerHTML = "";
    priceGross_errores.innerHTML = "";
    priceFinal_errores.innerHTML = "";

    productNameInput.style.borderColor = "black";
    productDescriptionInput.style.borderColor = "black";
    productTerminatedInput.style.borderColor = "black";
    categoryIdSelect.style.borderColor = "black";
    unitsBuyesInput.style.borderColor = "black";
    priceGrossInput.style.borderColor = "black";
    priceFinalInput.style.borderColor = "black";

    //Ciclo para añadir el listado de errores al html
    for (const ErrorType of ErroresTypes) {
      //productName
      if (erroresList.has(`productName-${ErrorType}`)) {
        productName_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`productName-${ErrorType}`)}
          </li><br />`;
        productNameInput.style.borderColor = "rgb(216, 0, 0)";
      }

      //productDescription
      if (erroresList.has(`productDescription-${ErrorType}`)) {
        productDescription_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`productDescription-${ErrorType}`)}
          </li><br />`;
        productDescriptionInput.style.borderColor = "rgb(216, 0, 0)";
      }

      //productTerminated
      if (erroresList.has(`productTerminated-${ErrorType}`)) {
        productTerminated_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`productTerminated-${ErrorType}`)}
          </li><br />`;
        productTerminatedInput.style.borderColor = "rgb(216, 0, 0)";
      }

      //categoryId
      if (erroresList.has(`categoryId-${ErrorType}`)) {
        categoryId_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`categoryId-${ErrorType}`)}
          </li><br />`;
        categoryIdSelect.style.borderColor = "rgb(216, 0, 0)";
      }

      //unitsBuyes
      if (erroresList.has(`unitsBuyes-${ErrorType}`)) {
        unitsBuyes_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`unitsBuyes-${ErrorType}`)}
          </li><br />`;
        unitsBuyesInput.style.borderColor = "rgb(216, 0, 0)";
      }

      //priceGross
      if (erroresList.has(`priceGross-${ErrorType}`)) {
        priceGross_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`priceGross-${ErrorType}`)}
          </li><br />`;
        priceGrossInput.style.borderColor = "rgb(216, 0, 0)";
      }

      //priceFinal
      if (erroresList.has(`priceFinal-${ErrorType}`)) {
        priceFinal_errores.innerHTML += `<li class="has-error">
          ${erroresList.get(`priceFinal-${ErrorType}`)}
          </li><br />`;
        priceFinalInput.style.borderColor = "rgb(216, 0, 0)";
      }
    }
    //Se pausa la peticion al haber errores
    if (erroresList.size > 0) {
      event.preventDefault();
    }
  });
});

import * as Validations from "./../validations/validations.js";

window.addEventListener("load", () => {
  let formCreateProduct = document.querySelector("#createProduct");
  let erroresList = new Map();

  formCreateProduct.addEventListener("submit", (event) => {
    erroresList.clear();

    //Campos de validacion
    let productNameInput = document.querySelector("#productName");
    let productDescriptionInput = document.querySelector("#productDescription");
    let productTerminatedInput = document.querySelector("#productTerminated");
    let categoryIdSelect = document.querySelector("#categoryId");
    let unitsBuyesInput = document.querySelector("#unitsBuyes");
    let priceGrossInput = document.querySelector("#priceGross");
    let priceFinalInput = document.querySelector("#priceFinal");

    let inputName = "";

    //productNameInput
    inputName = "productName";
    if (
      Validations.validationForType(
        productNameInput.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese el nombre del producto."
      );
    } else {
      if (
        Validations.validationForType(
          productNameInput.value,
          Validations.ErroresTypes.MinLength,
          {
            minLength: 2,
          }
        )
      ) {
        console.log("alof");
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.MinLength}`,
          `El campo debe tener minimo 2 caracteres.`
        );
      } else if (
        Validations.validationForType(
          productNameInput.value,
          Validations.ErroresTypes.MaxLength,
          {
            maxLength: 128,
          }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.MaxLength}`,
          `El campo debe tener maximo 128 caracteres.`
        );
      }
    }

    inputName = "productDescription";
    //productDescriptionInput
    if (
      Validations.validationForType(
        productDescriptionInput.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese la descripcion del producto."
      );
    } else {
      if (
        Validations.validationForType(
          productDescriptionInput.value,
          Validations.ErroresTypes.MinLength,
          { minLength: 2 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Min}`,
          `El campo debe tener minimo 2 caracteres.`
        );
      } else if (
        Validations.validationForType(
          productDescriptionInput.value,
          Validations.ErroresTypes.MaxLength,
          { maxLength: 512 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.MaxLength}`,
          `El campo debe tener maximo 512 caracteres.`
        );
      }
    }

    //productTerminatedInput
    inputName = "productTerminated";
    if (
      Validations.validationForType(
        productTerminatedInput.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese el terminado del producto."
      );
    } else {
      if (
        Validations.validationForType(
          productTerminatedInput.value,
          Validations.ErroresTypes.MinLength,
          { minLength: 2 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.MinLength}`,
          `El campo debe tener minimo 2 caracteres.`
        );
      } else if (
        Validations.validationForType(
          productTerminatedInput.value,
          Validations.ErroresTypes.MaxLength,
          { maxLength: 64 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.MaxLength}`,
          `El campo debe tener maximo 64 caracteres.`
        );
      }
    }

    //categoryIdSelect
    inputName = "categoryId";
    if (
      Validations.validationForType(
        categoryIdSelect.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese la categoria del producto."
      );
    }

    //unitsBuyesInput
    inputName = "unitsBuyes";
    if (
      Validations.validationForType(
        unitsBuyesInput.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese el inventario del producto."
      );
    } else {
      if (
        Validations.validationForType(
          unitsBuyesInput.value,
          Validations.ErroresTypes.Number
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Number}`,
          "Ingrese un numero"
        );
      } else if (
        Validations.validationForType(
          unitsBuyesInput.value,
          Validations.ErroresTypes.Min,
          { min: 0 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Min}`,
          `El campo debe ser mayor o igual a 0.`
        );
      } else if (
        Validations.validationForType(
          unitsBuyesInput.value,
          Validations.ErroresTypes.Max,
          { max: 999 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Max}`,
          `El campo debe ser menor o igual a 999.`
        );
      }
    }

    //priceGrossInput
    inputName = "priceGross";
    if (
      Validations.validationForType(
        priceGrossInput.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese el precio bruto del producto."
      );
    } else {
      if (
        Validations.validationForType(
          priceGrossInput.value,
          Validations.ErroresTypes.Number
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Number}`,
          "Ingrese un numero"
        );
      } else if (
        Validations.validationForType(
          priceGrossInput.value,
          Validations.ErroresTypes.Min,
          { min: 0 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Min}`,
          `El campo debe ser mayor o igual a 0.`
        );
      }
    }

    //priceFinalInput
    inputName = "priceFinal";
    if (
      Validations.validationForType(
        priceFinalInput.value,
        Validations.ErroresTypes.Required
      )
    ) {
      erroresList.set(
        `${inputName}-${Validations.ErroresTypes.Required}`,
        "Ingrese el precio final del producto."
      );
    } else {
      if (
        Validations.validationForType(
          priceFinalInput.value,
          Validations.ErroresTypes.Number
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Number}`,
          "Ingrese un numero"
        );
      } else if (
        Validations.validationForType(
          priceFinalInput.value,
          Validations.ErroresTypes.Min,
          { min: 0 }
        )
      ) {
        erroresList.set(
          `${inputName}-${Validations.ErroresTypes.Min}`,
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
    for (const ErrorType of Validations.ErroresTypesList) {
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

const fs = require("fs");

const recortarTamanioDeUnArreglo = (arreglo, tamanio) => {
  let arregloModificado = [];
  for (let i = 0; i < tamanio && i < arreglo.length; i++) {
    arregloModificado.push(arreglo[i]);
  }
  return arregloModificado;
};

const eliminarArchivo = (urlArchivo) => {
  fs.unlink(urlArchivo)
    .then((res) => {
      console.log("Archivo eliminado: ", urlArchivo);
    })
    .catch((err) => {
      console.error("Something wrong happened removing the file", err);
    });
};

/**
 *
 *
 * @param {*} base64 Base 64 to convert and save
 * @param {*} filename Name of the image to set
 */
const saveBase64ToImage = (base64, filename) => {
  var base64Data = base64.replace(/^data:image\/[^;]+;base64,/, "");

  fs.writeFile(
    `public/img/products/${filename}.png`,
    base64Data,
    "base64",
    function (err) {
      console.log(err);
    }
  );
};

module.exports = {
  recortarTamanioDeUnArreglo,
  eliminarArchivo,
  saveBase64ToImage,
};

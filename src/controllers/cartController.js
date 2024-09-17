/**Index contain information from title the page.
 * 
 * index {
 *  name: name of the project
 *  title: title of the page
 * }
*/
const index=require("../databases/index.json");
index.title="Cart";

/**settingGeneralSite contain information from the struct of the head.
 * 
 * settingGeneralSite {
 *  languaje: lanjuaje of the site (See the settingGeneralSite.json)
 *  title: title of the page
 * }
*/
const settingGeneral=require("../databases/settingGeneralSite.json");

/**cart.json contain information from the Cart shop.
 * 
 * cart {
 *  id: Identifiquer of the product.
 *  name: name of the product.
 *  urlImg: rout from the imagen of the product
 *  units: number of units of the product
 *  taxes: taxes applied to the product
 *  priceGross: cost gross of the product
 *  priceFinal: price final of the product
 *  discount: discount applied to the product 
 * }
*/
const cart=require("../databases/business/cart.json");

/** Format the price to currency COP
 */
const {toCOP} =require("../lib/formats.js");

/**contains the sum of the order
 * 
 */
const totalOrder=0;

/**MiniBanner
 * For more information see /wiews/partials/miniBanner.ejs
 */
const minibar={
    title:"Carrito de compras",
    icon:"mdi:cash-register"
};

module.exports= {
    cart: (req,res)=> res.render("cart.ejs", {
        index,
        settingGeneral,
        cart,
        toCOP,
        totalOrder,
        minibar
    })
};
import Medusa from "@medusajs/medusa-js"
const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
// must be previously logged in or use api token
medusa.admin.products.deleteOption(product_id, option_id)
.then(({ option_id, object, deleted, product }) => {
  console.log(product.id);
});
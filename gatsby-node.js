/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(/* GraphQL */ `
    {
      allShopifyProduct {
        nodes {
          handle
          id
        }
      }
    }
  `)
  if (result.error) {
    reporter.panicOnBuild("ERROR: createPages query")
  }
  const products = result.data.allShopifyProduct.nodes
  products.forEach(product => {
    createPage({
      path: product.handle,
      component: path.resolve("./src/templates/product.js"),
      context: {
        id: product.id,
      },
    })
  })
}

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Shopify Store",
    description:
      "Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",
    author: "@derjohnschmidt",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    "gatsby-plugin-layout",
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.SHOPIFY_URL,
        accessToken: process.env.SHOPIFY_API_TOKEN,
      },
    },
    {
      resolve: "gatsby-theme-shopify-manager",
      options: {
        shopName: process.env.SHOPIFY_URL,
        accessToken: process.env.SHOPIFY_API_TOKEN,
        shouldIncludeSourcePlugin: false,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
  ],
}

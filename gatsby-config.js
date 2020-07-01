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
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-theme-shopify-manager",
      options: {
        shopName: process.env.SHOPIFY_URL,
        accessToken: process.env.SHOPIFY_API_TOKEN,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "gatsby-starter-default",
    //     short_name: "starter",
    //     start_url: "/",
    //     background_color: "#663399",
    //     theme_color: "#663399",
    //     display: "minimal-ui",
    //     icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
}

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: 'Shopify Store',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@derjohnschmidt'
  },
  plugins: [
    {
      resolve: 'gatsby-theme-shopify-manager',
      options: {
        shopName: process.env.SHOPIFY_URL,
        accessToken: process.env.SHOPIFY_API_TOKEN,
        shouldIncludeSourcePlugin: true
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-layout'
  ]
}

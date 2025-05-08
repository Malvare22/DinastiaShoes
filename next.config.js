/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
}

module.exports = {
    nextConfig,
    images: {
    domains: ['fakestoreapi.com'], // Agrega aquí el dominio de tu servidor de origen de imágenes
  },
}


/** @type {import('next').NextConfig} */
const nextConfig = {
}

module.exports = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
        domains: ['fakestoreapi.com'], // Agrega aquí el dominio de tu servidor de origen de imágenes
      },
    nextConfig
}

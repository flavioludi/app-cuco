module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/client',
        permanent: false,
      },
    ];
  },
}

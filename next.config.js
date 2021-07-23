module.exports = {
  env: {
    api_base_url: 'http://api.cuco.local/api',
  },
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

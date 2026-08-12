const analyze = require('@next/bundle-analyzer')
const nextConfig = require('../next.config')

module.exports = analyze({
  enabled: true,
  openAnalyzer: true
})(nextConfig)
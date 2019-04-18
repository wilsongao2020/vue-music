const testjson = require('./src/api/test.json')
var axios = require('axios')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'base': '@/base',
      }
    }
  },
  devServer: {
      port: 8080,
      before(app) {
          app.get("/api/getDiscList", (req, res) => {
              // url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
              url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
              axios.get(url, {
                  headers: {
                    referer: 'https://y.qq.com/m/index.html',
                    origin: 'https://y.qq.com' 
                  },
                params: req.query
              }).then((response) => {
                  res.json(response.data)
              }).catch((e) => {
                  console.log(e)
              })
          })
      }
  }
}

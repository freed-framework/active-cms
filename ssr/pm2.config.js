module.exports = {
  apps : [
      {
        name: "ssr",
        script: "./lib/index.jsx",
        watch: true,
        env: {
            "PORT": 1234,
            "NODE_ENV": "development"
        },
        env_dev: {
            "PORT": 1234,
            "NODE_ENV": "development"
        },
        env_pro: {
            "PORT": 1234,
            "NODE_ENV": "production",
        },
        env_test: {
            "PORT": 1234,
            "NODE_ENV": "test",
        }
      }
  ]
}

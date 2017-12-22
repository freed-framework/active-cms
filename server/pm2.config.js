module.exports = {
  apps : [
      {
        name: "server",
        script: "./dist/main.js",
        watch: true,
        env_dev: {
            "PORT": 3000,
            "NODE_ENV": "development"
        },
        env_pro: {
            "PORT": 3000,
            "NODE_ENV": "production",
        },
        env_test: {
            "PORT": 3000,
            "NODE_ENV": "test",
        }
      }
  ]
}

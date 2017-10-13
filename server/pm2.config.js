module.exports = {
  apps : [
      {
        name: "myapp",
        script: "./dist/main.js",
        watch: true,
        env: {
            "PORT": 3000,
            "NODE_ENV": "development"
        },
        env_production: {
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

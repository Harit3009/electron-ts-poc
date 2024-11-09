const axios = require("axios");

const reload = () =>
  axios
    .get("http://localhost:2948/reload")
    .then((res) => {})
    .catch((err) => {
      console.log("error sending reload", { err });
    });

reload();

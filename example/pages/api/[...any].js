import Router from "../../../dist";

let r = Router({
  key: "any",
  timeout: 5000,
  onError: (err, req, res) => {
    res.json({
      msg: err.message,
    });
  },
});
r.get("/hello", async (req, res) => {
  res.json({
    msg: "Hello",
  });
});
r.get("/user/:user", async (req, res) => {
  res.json({
    msg: "Hello User",
    user: req.params,
  });
});

export default r.handle;

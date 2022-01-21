## Next.js Api Router

Simple router for Next.js api. inspired by itty-router

### Example Usage

```bash
npm i @arisris/next-api-router
```

```typescript

import Router from "@arisris/next-api-router";

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

```
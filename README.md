## Next.js Api Router

A chainable router designed for Next.js api. inspired and regex based from itty-router

### Features

- [x] Tiny ([~8xx bytes](https://bundlephobia.com/package/@arisris/next-api-router) compressed) with zero dependencies.
- [x] Strong typing with typescript also javascript with VSCode
- [x] Anything is async/await handler
- [x] Route params, with wildcards and optionals (e.g. `/base/:collection/:id?`)
- [x] Middleware support
- [x] By default error handler response is json
- [x] Support anything of HTTP methods
- [x] Chainable route declarations
- [x] No dependencies

### Installation

```bash
npm i @arisris/next-api-router
```

### Example Usage

```typescript
// file: pages/api/[...any].ts
import NextApiRoute from "@arisris/next-api-router";

export default NextApiRoute({
  key: "all", // a rest params default to "any"
  timeout: 5000, // timeout in ms default to 10000ms
  //onError: (error, req, res) => res.status(500).send("Internal Server Error") // By default handled with json response
})
  .all("*", async () => true) // middleware should return true
  .get("/hello", async (_, res) => res.send("Hello World")) // simple
  .get(
    "/wait",
    async () => await new Promise((resolve) => setTimeout(resolve, 3000)), // wait for 3000ms
    async (_, res) => res.json({ msg: "Done..." })
  )
  .get("/error", async () => {
    throw new Error("OMG!");
  })
  .get("/timeout", async () => {
    // No response is considered timeout
  })
  .get("/user/:name?", async (req, res) => res.json({ params: req.params }))
  // not found
  .all("*", async (_, res) => res.status(404).send("Not Found"))
  .handle; // Final handler of NextApiHandler
```

### Todo better documentation

--

### Links

[My Website](https://arisris.com/)
[itty-router](https://github.com/kwhitley/itty-router)

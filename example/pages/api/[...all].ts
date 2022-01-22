import NextApiRoute from "../../../src";

export default NextApiRoute({
  key: "all",
  timeout: 5000, // timeout in ms default to 10000ms
  //onError: (error, req, res) => res.status(500).send("Internal Server Error") // By default is handled with json response
})
  .get("/hello", async (req, res) => res.send("Hello World"))
  .get(
    "/wait",
    async () => await new Promise((r) => setTimeout(r, 3000)),
    async (req, res) => res.json({ msg: "Done..." })
  )
  .get("/user/:name?", async (req, res) => res.json({ params: req.params }))
  .all("*", async (req, res) => res.status(404).send("Not Found"));

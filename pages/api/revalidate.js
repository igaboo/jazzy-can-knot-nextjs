export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const url = req.body;

    await res
      .unstable_revalidate(`/product/${url.current}`)
      .then(() => console.log("SUCCESS"));
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Error revalidating");
  }
}

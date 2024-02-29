export const home = (req, res) => {
  const time = new Date();
  res.status(200).send(`<b>${time.toLocaleTimeString()}</b>`);
};

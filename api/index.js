const shuffle = require("lodash/shuffle");
const capitalize = require("lodash/capitalize");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { query } = req;

  const members = query.members.split(",");

  const shuffled = shuffle(members)
    .map((member) => capitalize(member))
    .join(", ");

  try {
    await fetch(query.url, {
      method: "POST",
      body: JSON.stringify({
        r_list: shuffled,
      }),
    });
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

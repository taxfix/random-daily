const getWeek = require('date-fns/getWeek')
const capitalize = require("lodash/capitalize");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { query } = req;

  const members = query.members.split(",")
    .map((member) => capitalize(member));
  const week = getWeek(new Date(), { weekStartsOn: 1 });
  const index = week % members.length;

  try {
    await fetch(query.url, {
      method: "POST",
      body: JSON.stringify({
        name: members[index],
      }),
    });
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

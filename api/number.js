import axios from "axios";

// ⏱ 2 days in milliseconds
const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

// 🔑 API keys with creation time
const API_KEYS = {
  "NIGHTFALL123": {
    createdAt: new Date("2026-02-20").getTime()
  },
  "PINK69": {
    createdAt: new Date("2026-02-21").getTime()
  }
};

export default async function handler(req, res) {
  const { number, key } = req.query;

  if (!key || !API_KEYS[key]) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key",
      channel: "@nightfallhub69"
    });
  }

  // ⏱ Expiry check
  const createdAt = API_KEYS[key].createdAt;
  const now = Date.now();

  if (now > createdAt + TWO_DAYS) {
    return res.status(403).json({
      success: false,
      message: "API key expired (2 days limit)",
      channel: "@nightfallhub69"
    });
  }

  if (!number) {
    return res.status(400).json({
      success: false,
      message: "Number parameter missing",
      channel: "@nightfallhub69"
    });
  }

  try {
    const originalApi =
      `https://number-info-for-my-rasmalai-ayushi.vercel.app/NumberByAyush?Number=${number}&key=PinkChumt`;

    const response = await axios.get(originalApi, { timeout: 15000 });
    const data = response.data;

    // 🧹 Remove original owner info
    delete data.owner;
    delete data.credit;
    delete data.channel;
    delete data.developer;

    return res.status(200).json({
      success: true,
      owner: "@Xhameterpaglu",
      channel: "@nightfallhub69",
      expires_in_hours: Math.ceil(
        (createdAt + TWO_DAYS - now) / (1000 * 60 * 60)
      ),
      data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Upstream API error",
      channel: "@nightfallhub69"
    });
  }
}

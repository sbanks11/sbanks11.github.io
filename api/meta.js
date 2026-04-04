export default async function handler(req, res) {
  const access_token = "EAAQqVn2GyuQBRLgTZASGkPthJPC2lvxPwksqXvXPAS6x2gXIUcZAoC4j5k2ORYZBgZCRLNUjPtHxQHmHpPo9akHIRL0gDoZB0SXa7rcKSvMZADI3HzJ3FXzzzXADvU56VPcthFnn55NFutTpJvjLFX0OUgZCY5P9DiZAvjoviK9KAB3kHzLb0EtEsxcKtUqYdwZDZD";
  const pixel_id = "947070334637228";

  const { subid, revenue, fbc, fbp } = req.query;

  const body = {
    data: [
      {
        event_name: "Subscribe",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: subid,
        user_data: {
          external_id: subid
            ? require("crypto").createHash("sha256").update(subid).digest("hex")
            : undefined,
          fbc: fbc || undefined,
          fbp: fbp || undefined,
        },
        custom_data: {
          value: parseFloat(revenue) || 0,
          currency: "USD",
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${pixel_id}/events?access_token=${access_token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

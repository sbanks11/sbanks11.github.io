export default async function handler(req, res) {
  try {
    const revenue = Number.parseFloat(req.query.revenue || "0");

    if (!Number.isFinite(revenue)) {
      return res.status(400).send("Invalid revenue");
    }

    if (revenue <= 2) {
      return res.status(200).send("Skipped low payout conversion");
    }

    const payload = {
      data: [
        {
          event_name: "Subscribe",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: "https://scalersunite.com",
          custom_data: {
            currency: "USD",
            value: revenue
          },
          user_data: {
            client_ip_address: req.query.ip || undefined,
            client_user_agent: req.query.ua || undefined,
            external_id: req.query.subid || undefined,
            fbc: req.query.fbc || undefined,
            fbp: req.query.fbp || undefined
          }
        }
      ]
    };

    const metaUrl =
      "https://graph.facebook.com/v25.0/947070334637228/events?access_token=EAAXT96OQXXABRbzqRMkiZCGvBT9X6fEyXpyju5aKjZAk7gAQHGta9XuCGDU892wR3ZBZABhfw1WUV9UylyZBz0blL0ZCSWATVXpQKykOw0Uowia8qAvVz1UdE4g6zOVpbpEdTCpaMt8ZBfwR29ZAbXzntA8ZBpuUoS2DZASk8h7kplQwAOuaycstCFM1ULjFKJ3AZDZD";

    const response = await fetch(metaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.text();

    return res.status(response.status).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send(String(error));
  }
}

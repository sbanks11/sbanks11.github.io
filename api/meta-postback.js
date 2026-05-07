export default async function handler(req, res) {
try {
// Get values from Keitaro postback
const revenue = parseFloat(req.query.revenue || 0);
const subid = req.query.subid || "";
const fbc = req.query.fbc || "";
const fbp = req.query.fbp || "";
const ip = req.query.ip || "";
const ua = req.query.ua || "";

```
// Only send high quality conversions
if (revenue <= 2) {
  return res.status(200).send("Skipped low payout conversion");
}

// Build Meta payload
const payload = {
  data: [
    {
      event_name: "Subscribe",
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: "https://nyverna.com",

      custom_data: {
        currency: "USD",
        value: revenue
      },

      user_data: {
        client_ip_address: ip,
        client_user_agent: ua,
        external_id: subid,
        fbc: fbc,
        fbp: fbp
      }
    }
  ]
};

// Send to Meta
const response = await fetch(
  "https://graph.facebook.com/v25.0/947070334637228/events?access_token=EAAXT96OQXXABRbzqRMkiZCGvBT9X6fEyXpyju5aKjZAk7gAQHGta9XuCGDU892wR3ZBZABhfw1WUV9UylyZBz0blL0ZCSWATVXpQKykOw0Uowia8qAvVz1UdE4g6zOVpbpEdTCpaMt8ZBfw1WUV9UylyZBz0blL0ZCSWATVXpQKykOw0Uowia8qAvVz1UdE4g6zOVpbpEdTCpaMt8ZBfwR29ZAbXzntA8ZBpuUoS2DZASk8h7kplQwAOuaycstCFM1ULjFKJ3AZDZD",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
);

const result = await response.text();

console.log("Meta response:", result);

return res.status(200).send(result);
```

} catch (error) {
console.error("Error:", error);
return res.status(500).send(error.toString());
}
}

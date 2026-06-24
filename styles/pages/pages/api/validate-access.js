export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ valid: false, reason: "Código requerido" });
  }

  const upperCode = code.toUpperCase().trim();

  const validCodesRaw = process.env.ACCESS_CODES || "";
  const validCodes = validCodesRaw.split(",").map(c => c.trim()).filter(Boolean);

  if (validCodes.includes(upperCode)) {
    return res.status(200).json({ valid: true });
  }

  return res.status(200).json({ valid: false, reason: "Código inválido. Verifica tu correo de compra." });
}

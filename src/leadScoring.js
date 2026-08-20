export function scoreLead(lead) {
  let score = 0;
  const reasons = [];

  if (lead.hasWebsite === "No") {
    score += 4;
    reasons.push("No tiene web actualmente");
  }
  if (lead.businessType) score += 2;
  if (lead.email) score += 1;
  if (lead.phone) score += 1;
  if (lead.goal === "Conseguir más clientes") {
    score += 2;
    reasons.push("Busca captar más clientes");
  }
  if (lead.goal === "Reservas / citas / contactos") score += 1;
  if (lead.goal === "Automatizar procesos con IA") score += 1;

  const finalScore = Math.min(score, 10);
  const priority = finalScore >= 8 ? "HOT" : finalScore >= 6 ? "WARM" : "COLD";

  return { score: finalScore, priority, reasons };
}

export const statusMapListKPR = (originalStatus) => {
  switch (originalStatus) {
    case "on_submit":
      return "Draft";
    case "on_reviewed":
      return "Analisa";
    case "on_approved":
      return "Disetujui";
    case "on_rejected":
      return "Ditolak";
    case "on_canceled":
      return "Dibatalkan";
    default:
      return "-";
  }
}
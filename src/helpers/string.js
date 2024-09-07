export function toTitleCase(str) {
  return str.replace(/\p{L}+('\p{L}+)?/gu, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1)
  })
};

export function formatRupiah(money) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
}

export function formatRupiahWord (value) {
  if (Math.abs(Number(value)) >= 1.0e+12) {
    const number = (Math.abs(Number(value)) / 1.0e+12).toFixed(1)
    if (number.toString().split('.')[1] === "0"){
      return "Rp" + (Math.abs(Number(value)) / 1.0e+12).toFixed(0) + " T";
    } else {
      return "Rp" + (Math.abs(Number(value)) / 1.0e+12).toFixed(1) + " T";
    }
  } else if (Math.abs(Number(value)) >= 1.0e+9) {
    const number = (Math.abs(Number(value)) / 1.0e+9).toFixed(1)
    if (number.toString().split('.')[1] === "0"){
      return "Rp" + (Math.abs(Number(value)) / 1.0e+9).toFixed(0) + " M";
    } else {
      return "Rp" + (Math.abs(Number(value)) / 1.0e+9).toFixed(1) + " M";
    }
  } else if (Math.abs(Number(value)) >= 1.0e+6) {
    const number = (Math.abs(Number(value)) / 1.0e+6).toFixed(1);
    if (number.toString().split('.')[1] === "0"){
      return "Rp" + (Math.abs(Number(value)) / 1.0e+6).toFixed(0) + " Jt";
    } else {
      return "Rp" + (Math.abs(Number(value)) / 1.0e+6).toFixed(1) + " Jt";
    }
  } else if (Math.abs(Number(value)) >= 1.0e+3) {
    return "Rp" + Math.abs(Number(value)) / 1.0e+3 + " Rb";
  } else {
    return "Rp" + Math.abs(Number(value));
  }
}

export function trimStr({ string, maxLength }) {
  if (string?.length > maxLength) {
    return string?.slice(0, (maxLength - 1)) + "...";
  } else {
    return string;
  }
}

export function formatRupiahNumber(value) {
  const formatted = new Intl.NumberFormat('id-ID', {
  }).format(value);
   
  return `Rp${formatted}`
}
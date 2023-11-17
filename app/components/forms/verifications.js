export function checkText(info) {
    // Verifica que el nombre no esté vacío
    info = info.trim();

    if (!info) {
      return false;
    }
  
    // Verifica que el nombre solo tenga letras
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(info);
};

export function checkNumber(info) {
  return /^[\d,\.]+$/.test(info);
};

export const messageText = "Este input solo admite datos de tipo alfabetico";

export const messageNumber = "Este input solo admite datos de tipo númerico";

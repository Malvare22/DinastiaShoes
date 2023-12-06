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

export function checkDescuento(info) {
  return /^[\d,\.]+$/.test(info) && info>0 && info<=100;
};

export function checkNoEmpty(info) {
  return info.trim().length != 0;
};

export function checkEmail(info){
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return regex.test(info);
}

export const messageText = "Este input solo admite datos de tipo alfabetico";

export const messageNumber = "Este input solo admite datos de tipo númerico";

export const messageDescuento = "Este input solo admite datos de tipo númerico, y valores entre [1-100]";

export const messageNoEmpty = "Este campo es obligatorio";

export const messagePaswordParams = "La contraseña debe tener como criterios...";

export const messagePaswordNoEquals = "Ambos campos deben coincidir";


export function checkText(info) {
    // Verifica que el nombre no esté vacío
    info = info.trim();

    if (!info) {
      return false;
    }
  
    // Verifica que el nombre solo tenga letras
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(info);
}
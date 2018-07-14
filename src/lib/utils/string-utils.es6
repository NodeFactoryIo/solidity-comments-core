function padText(text, amount, tab = false) {
  const pad = tab ? Array(amount + 1).join('\t') : Array(amount + 1).join(' ');
  text = pad + text;
  text = text.replace('\n', '\n' + pad);
  return text;
}

export function pad(amount, text, tab = false) {
  if (Array.isArray(text)) {
    text.forEach((line, index, array) => {
      array[index] = padText(line, amount, tab);
    });
    return text;
  }
  return padText(text, amount, tab);
}

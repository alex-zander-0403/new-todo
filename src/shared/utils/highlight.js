// экранирование HTML
const escapeHTML = (unsafeString) => {
  return unsafeString
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;");
};

// экранирование для регулярных выражений
const escapeRegExp = (unsafeString) => {
  return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// основная функция подсветки
export const highlightCaseInsensitive = (text, query) => {
  const safeText = escapeHTML(text); // экранируем весь текст
  const queryFormatted = query.trim(); // чистый результат поиска

  // если поиска нет
  if (queryFormatted.length === 0) {
    return safeText;
  }

  // cоздаём RegExp с флагами
  const pattern = new RegExp(escapeRegExp(queryFormatted), "ig");

  // заменяем найденные совпадения на те же слова, обёрнутые в <mark>
  return safeText.replace(pattern, `<mark>$&</mark>`);
};

// 02-form.js
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Sayfa yüklendiğinde Local Storage kontrolü ve formun doldurulması
const populateFormFields = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    const { email, message } = JSON.parse(savedData);
    
    // undefined değerlerinin inputlarda görünmesini engelliyoruz
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  } catch (error) {
    console.error('Local Storage verisi okunurken hata oluştu:', error);
  }
};

populateFormFields();

// Input olaylarını dinleyip Local Storage'ı güncelleyen işlem
form.addEventListener('input', () => {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const formData = { email, message };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Form gönderildiğinde doğrulama, loglama ve temizleme
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  // Her iki alanın da dolu olduğundan emin oluyoruz
  if (!email || !message) {
    console.warn('Tüm alanları doldurmanız gerekmektedir.');
    return;
  }

  // Konsola objeyi yazdırıyoruz
  console.log({ email, message });

  // Temizlik işlemleri
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
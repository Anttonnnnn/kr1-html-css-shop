// Ссылки на элементы страницы

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// Открытие модального окна по кнопкам «Заказать»

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;
    selectedProductInput.value = productName;
    orderDialog.showModal();
  });
});

// Закрытие модального окна

closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Обработка отправки формы

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Сбрасываем старые ошибки
  const formElements = Array.from(orderForm.elements);
  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверка валидности
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });
    orderForm.reportValidity();
    return;
  }

  // Успешная отправка
  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();
});
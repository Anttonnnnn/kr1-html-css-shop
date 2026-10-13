// === Ссылки на элементы страницы ===

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// === Открытие модального окна по кнопкам «Заказать» ===

if (orderDialog && orderButtons.length) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      if (selectedProductInput) selectedProductInput.value = productName;
      orderDialog.showModal();
    });
  });
}

// === Закрытие модального окна ===

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// === Обработка отправки формы ===

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    if (successMessage) successMessage.hidden = false;
    orderForm.reset();
    if (orderDialog) orderDialog.close();
  });
}

// === Кнопка «Наверх» ===

const scrollTopButton = document.getElementById('scroll-top');
if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === Данные товаров для динамической страницы товара ===

const PRODUCTS = {
  belt: {
    title: 'Пояс для пауэрлифтинга',
    description: 'Профессиональный кожаный пояс шириной 10 см для тяжёлых силовых тренировок. Обеспечивает поддержку поясницы и увеличивает внутрибрюшное давление.',
    price: '5000 руб.',
    image: 'images/belt.jpg',
    alt: 'Пояс для пауэрлифтинга',
    category: 'Пояса',
    material: 'Натуральная кожа',
    size: '10 см',
    warranty: '12 месяцев'
  },
  wraps: {
    title: 'Кистевые бинты',
    description: 'Жёсткие кистевые бинты для фиксации кисти при выполнении жима. Обеспечивают надёжную поддержку запястья при работе с большими весами.',
    price: '1500 руб.',
    image: 'images/wraps.jpg',
    alt: 'Кистевые бинты',
    category: 'Бинты',
    material: 'Хлопок / эластан',
    size: '60 см',
    warranty: '6 месяцев'
  },
  knee: {
    title: 'Наколенники',
    description: 'Неопреновые наколенники для приседаний. Обеспечивают поддержку коленного сустава и сохраняют тепло во время тренировки.',
    price: '3500 руб.',
    image: 'images/knee.jpg',
    alt: 'Наколенники',
    category: 'Наколенники',
    material: 'Неопрен',
    size: 'S / M / L',
    warranty: '12 месяцев'
  }
};

// === Динамическая страница товара ===

const productDetail = document.querySelector('.product-card--detail');
if (productDetail) {
  const params = new URLSearchParams(window.location.search);
  const itemKey = params.get('item') || 'belt';
  const product = PRODUCTS[itemKey];

  if (product) {
    document.title = product.title + ' – PowerShop';

    const crumb = document.querySelector('.breadcrumbs__current:last-of-type');
    if (crumb) crumb.textContent = product.title;

    const img = productDetail.querySelector('.product-card__image');
    if (img) {
      img.src = product.image;
      img.alt = product.alt;
    }
    const title = productDetail.querySelector('.product-card__title');
    if (title) title.textContent = product.title;
    const desc = productDetail.querySelector('.product-card__description');
    if (desc) desc.textContent = product.description;
    const price = productDetail.querySelector('.product-card__price');
    if (price) price.textContent = 'Цена: ' + product.price;

    const button = productDetail.querySelector('.product-card__button');
    if (button) button.dataset.product = product.title;

    const cells = document.querySelectorAll('.product-table tbody tr td:nth-child(2)');
    if (cells.length >= 5) {
      cells[0].textContent = product.category;
      cells[1].textContent = product.material;
      cells[2].textContent = product.size;
      cells[3].textContent = product.price;
      cells[5].textContent = product.warranty;
    }
  }
}

// === Фильтр каталога ===

const filtersForm = document.getElementById('filters-form');
if (filtersForm) {
  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const checkedCategories = Array.from(
      filtersForm.querySelectorAll('input[name="category"]:checked')
    ).map(input => input.value);

    const priceFromInput = document.getElementById('price-from');
    const priceToInput = document.getElementById('price-to');
    const priceFrom = parseInt(priceFromInput.value) || 0;
    const priceTo = parseInt(priceToInput.value) || Infinity;

    const cards = document.querySelectorAll('.catalog-products .product-card');
    cards.forEach(card => {
      const category = card.dataset.category;
      const price = parseInt(card.dataset.price);

      const categoryOk = checkedCategories.length === 0 || checkedCategories.includes(category);
      const priceOk = price >= priceFrom && price <= priceTo;

      card.style.display = (categoryOk && priceOk) ? '' : 'none';
    });
  });
}
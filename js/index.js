new WOW({
    animateClass: 'animate__animated',
}).init();


//карусель с чаем
let products = [

    [{
        id: 3,
        productName: 'Ароматная малина',
        productWeight: 100,
        measurements: 'гр',
        price: 5.10,
        linkPicture: 'images/banner/pack3.png'
    },
    {
        id: 4,
        productName: 'Лимон и мята',
        productWeight: 100,
        measurements: 'гр',
        price: 4.90,
        linkPicture: 'images/banner/pack4.png'
    }],
    [{
        id: 1,
        productName: 'Сладкий апельсин',
        productWeight: 100,
        measurements: 'гр',
        price: 4.50,
        linkPicture: 'images/banner/pack1.png'
    },
    {
        id: 2,
        productName: 'Чай с облепихой и грушей',
        productWeight: 100,
        measurements: 'гр',
        price: 5.10,
        linkPicture: 'images/banner/pack2.png'
    }],
    [{
        id: 5,
        productName: 'Изысканный бергамот',
        productWeight: 100,
        measurements: 'гр',
        price: 4.70,
        linkPicture: 'images/banner/pack5.png'
    },
    {
        id: 6,
        productName: 'Сладкая ваниль',
        productWeight: 100,
        measurements: 'гр',
        price: 4.60,
        linkPicture: 'images/banner/pack6.png'
    }]
]

const circleBlock = document.getElementById('blockCircleBtn')
const caruselBlock = document.getElementById('caruselProduct')

const leftArrowBtn = document.getElementById('arrowLeft')
const rightArrowBtn = document.getElementById('arrowRight')
let currentSlide = 0

products.forEach(product => {
    const btnCircle = document.createElement('button')
    btnCircle.classList.add('circle-btn')
    circleBlock.appendChild(btnCircle)
})

const circleBtns = document.querySelectorAll('.circle-btn')

leftArrowBtn.addEventListener('click', () => {
    if (currentSlide === 0) {
        currentSlide = products.length - 1
    } else {
        currentSlide = currentSlide - 1
    }
    handleChangeActiveBtn(currentSlide, true)
})

rightArrowBtn.addEventListener('click', () => {
    if (currentSlide === products.length - 1) {
        currentSlide = 0
    } else {
        currentSlide = currentSlide + 1
    }
    handleChangeActiveBtn(currentSlide, true)
})

function createSlide(index = 0) {
    caruselBlock.innerHTML = ""; // очищаем блок слайдера
    currentSlide = index;
    
    const slide = document.createElement('div');
    slide.className = 'slide'; 
    
    // Проверка ширины экрана
    if (window.innerWidth <= 1224) {
        // Показываем только один продукт
        const product = products[currentSlide][0];
        const productTemplate = document.getElementById('product').content.cloneNode(true);
        productTemplate.querySelector('.product-desc-title').textContent = product.productName;
        productTemplate.querySelector('.measurements').textContent = product.productWeight + product.measurements;
        productTemplate.querySelector('.price').textContent = product.price + 'руб.';
        productTemplate.querySelector('.product-img').src = product.linkPicture;
        slide.appendChild(productTemplate);
    } else {
        // Показываем два или более продуктов для больших экранов
        products[currentSlide].forEach(product => {
            const productTemplate = document.getElementById('product').content.cloneNode(true);
            productTemplate.querySelector('.product-desc-title').textContent = product.productName;
            productTemplate.querySelector('.measurements').textContent = product.productWeight + product.measurements;
            productTemplate.querySelector('.price').textContent = product.price + 'руб.';
            productTemplate.querySelector('.product-img').src = product.linkPicture;
            slide.appendChild(productTemplate);
        });
    }

    caruselBlock.appendChild(slide);
}

const handleChangeActiveBtn = (idx, arrow) => {
    if (idx === currentSlide && !arrow) {
        return
    }

    circleBtns.forEach((button, index) => {
        if (idx === index) {
            button.classList.add('active-circle-btn')
            createSlide(idx)
        } else {
            button.classList.remove('active-circle-btn')
        }
    })
}

circleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        handleChangeActiveBtn(idx)
    })
})

handleChangeActiveBtn(1)


window.addEventListener('resize', () => {
    createSlide(currentSlide); 
});





document.getElementById('toggleTextButton').addEventListener('click', function() {
    const shortText = document.getElementById('shortText');
    const fullText = document.getElementById('fullText');
    if (fullText.classList.contains('hidden')) {
        fullText.classList.remove('hidden');
        shortText.classList.add('hidden');
        this.textContent = 'Свернуть';
    } else {
        fullText.classList.add('hidden');
        shortText.classList.remove('hidden');
        this.textContent = 'Узнать больше';
    }
});


document.querySelector('.burger').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('active');
});

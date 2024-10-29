// карусель с отзывами
const review = [
    {
        name: 'Вероника',
        linkImage: 'images/review/review2.png',
        subtitle: 'Супер подарочные наборы! Ура, нашли отличный вариант поздравить коллег.',
        text: 'С коллегами по работе постоянно заказываем чаи. Всегда радует стабильное качество и разнообразие классических вариантов. Посуду тоже заказывали и на работу, и домой потом многие — довольны. Приятно было найти такой магазин.',
    },
    {
        name: 'Анастасия',
        linkImage: 'images/review/review1.png',
        subtitle: 'В сегодняшнем отзыве хочу поделиться своими впечатлениями от чёрного цейлонского чая IMPRA (мелколистовой 400 г).',
        text: 'В этом году я ездила в свой родной город и купила там большую упаковку этого чая. Никогда не думала, что буду писать на него отзыв, для меня это не просто чай, это частичка детствавоспоминаний, кухня бабушки, чаинки в чае, которые я в детстве не любила, ассоциации с чем-то родным.'
    },
    {
        name: 'Степан',
        linkImage: 'images/review/review3.png',
        subtitle: 'Большая благодарность за подход такой к делу. Чаи всем понравились и было необычно приятно.',
        text: 'Великолепные подарки на праздники. Изящно, премиально и качественно. Большая благодарность за подход такой к делу. Чаи всем понравились и было необычно приятно. Отличный чай, брал разные сорта и Халат, и Пуэр, и улуны.'
    }
]

const circleBlockReview = document.getElementById('reviewBlockCircleBtn')
const caruselBlockReview = document.getElementById('reviewCaruselBlock')

const leftArrowBtnReview = document.getElementById('arrowLeftReview')
const rightArrowBtnReview = document.getElementById('arrowRightReview')

let currentSlideReview = null

review.forEach(review => {
    const btnCircle = document.createElement('button')
    btnCircle.classList.add('circle-btn-review')
    circleBlockReview.appendChild(btnCircle)
})

const circleBtnsReview = document.querySelectorAll('.circle-btn-review')

leftArrowBtnReview.addEventListener('click', () => {
    if (currentSlideReview === 0) {
        currentSlideReview = review.length - 1
    } else {
        currentSlideReview = currentSlideReview - 1
    }
    handleChangeActiveBtnReview(currentSlideReview, true)
})

rightArrowBtnReview.addEventListener('click', () => {
    if (currentSlideReview === review.length - 1) {
        currentSlideReview = 0
    } else {
        currentSlideReview = currentSlideReview + 1
    }
    handleChangeActiveBtnReview(currentSlideReview, true)//2 аргумент выглядит страшно
})

function createSlideReview(index = 1) {
    caruselBlockReview.innerHTML = ""//доработать очищение блока
    currentSlideReview = index;
    const slide = document.createElement('div')
    slide.className = 'slide'//добавить анимацию

        const reviewTemplate = document.getElementById('review').content.cloneNode(true)
        reviewTemplate.querySelector('.review-img').src = review[currentSlideReview].linkImage;
        reviewTemplate.querySelector('.review-title').textContent = review[currentSlideReview].name;
        reviewTemplate.querySelector('.review-subtitle-block').textContent = review[currentSlideReview].subtitle;
        reviewTemplate.querySelector('.review-text-block').textContent = review[currentSlideReview].text;
        slide.appendChild(reviewTemplate);

    caruselBlockReview.appendChild(slide)
}

const handleChangeActiveBtnReview = (idx, arrow) => {
    if (idx === currentSlideReview && !arrow) {
        return
    }
console.log(123)
    circleBtnsReview.forEach((button, index) => {
        if (idx === index) {
            button.classList.add('active-circle-btn')
            createSlideReview(idx)
        } else {
            button.classList.remove('active-circle-btn')
        }
    })
}

circleBtnsReview.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        handleChangeActiveBtnReview(idx)
    })
})

handleChangeActiveBtnReview(1)

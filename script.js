const mainContainer = document.querySelector('.container');
const candyPage = document.querySelector('.candyPage');
const candyBtn = document.querySelector('.btn');

const goToCandyPage = () => {
    mainContainer.style.display = 'none';
    candyPage.style.display = 'grid';
};

candyBtn.addEventListener('click', e => {
    goToCandyPage();
});
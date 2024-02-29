const fileInput = document.getElementById('fileInput');
const wardrobe = document.getElementById('wardrobe');
const shuffleBtn = document.getElementById('shuffleBtn');

fileInput.addEventListener('change', handleFileSelect);
shuffleBtn.addEventListener('click', shuffleOutfit);

function handleFileSelect(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
            continue;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            addClothingItem(imageUrl);
        }
        reader.readAsDataURL(file);
    }
}

function addClothingItem(imageUrl) {
    const clothingItem = document.createElement('div');
    clothingItem.classList.add('clothing-item');
    clothingItem.innerHTML = `
        <img src="${imageUrl}" alt="Clothing item">
        <button class="deleteBtn" data-url="${imageUrl}">Delete</button>
    `;
    wardrobe.appendChild(clothingItem);
    
    const deleteBtn = clothingItem.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        const items = document.querySelectorAll('.clothing-item');
        items.forEach(item => {
            if (item.querySelector('img').getAttribute('src') === url) {
                wardrobe.removeChild(item);
            }
        });
    });
}

function shuffleOutfit() {
    const clothingItems = document.querySelectorAll('.clothing-item');
    const shuffledItems = Array.from(clothingItems).sort(() => Math.random() - 0.5);
    wardrobe.innerHTML = '';
    shuffledItems.forEach(item => {
        wardrobe.appendChild(item);
    });
}

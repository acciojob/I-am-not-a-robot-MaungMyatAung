//your code here
const images = [
    'img1',
    'img2',
    'img3',
    'img4',
    'img5'
];

// Function to shuffle the images and create a duplicate
function shuffleImages() {
    const duplicateIndex = Math.floor(Math.random() * images.length);
    const shuffledImages = [...images];
    const duplicateImage = shuffledImages[duplicateIndex];
    shuffledImages.push(duplicateImage); // Add duplicate
    return shuffledImages.sort(() => Math.random() - 0.5); // Shuffle
}

// Function to create image elements
function createImageElements(imageArray) {
    const container = document.getElementById('image-container');
    container.innerHTML = ''; // Clear previous images
    imageArray.forEach((imgClass) => {
        const img = document.createElement('img');
        img.className = imgClass;
        img.alt = 'Image';
        img.addEventListener('click', () => handleImageClick(img));
        container.appendChild(img);
    });
}

// State management
let selectedImages = [];

function handleImageClick(img) {
    if (selectedImages.includes(img)) {
        return; // Prevent selecting the same image again
    }

    img.classList.add('selected');
    selectedImages.push(img);

    // Show Reset button
    document.getElementById('reset').style.display = 'inline';

    // Check if two images are selected
    if (selectedImages.length === 2) {
        document.getElementById('verify').style.display = 'inline';
    }
}

// Reset function
document.getElementById('reset').addEventListener('click', () => {
    selectedImages.forEach((img) => img.classList.remove('selected'));
    selectedImages = [];
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('para').innerText = '';
});

// Verify function
document.getElementById('verify').addEventListener('click', () => {
    const [firstImage, secondImage] = selectedImages;
    if (firstImage.className === secondImage.className) {
        document.getElementById('para').innerText = "You are a human. Congratulations!";
    } else {
        document.getElementById('para').innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    document.getElementById('verify').style.display = 'none'; // Hide Verify button
});

// Initialize the game
function init() {
    const shuffledImages = shuffleImages();
    createImageElements(shuffledImages);
}

window.onload = init;
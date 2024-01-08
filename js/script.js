function searchDesign() {
    var searchContainer = document.getElementById('searchContainer');
    var designInput = document.getElementById('designInput');

    // Adjust the search bar position only if it's not already active
    if (!searchContainer.classList.contains('active')) {
        searchContainer.classList.add('active');
    }

    // Clear previous results
    var imageContainer = document.getElementById('imageContainer');
    var descriptionContainer = document.getElementById('productDescription');
    imageContainer.innerHTML = '';
    descriptionContainer.innerHTML = '';

    // Fetch and display product data based on the design number
    var designNumber = designInput.value.trim();
    if (designNumber) {
        fetchProductData(designNumber); // This is an async operation
    } else {
        displayNotFound();
    }
    const resultDiv = document.getElementById('result');
    const searchHeight = document.getElementById('searchContainer').offsetHeight;
    resultDiv.style.marginTop = `${searchHeight + 450}px`; // Adjust '20' for additional spacing if needed
}
function fetchProductData(designNumber) {
    // Replace 'YOUR_SHEETY_PROJECT' and 'sheetName' with your actual Sheety project and sheet names
    var sheetyUrl = 'https://api.sheety.co/334e6c65ffccfeaa79db389c297fd1a4/designsDatabase/cc';

    fetch(sheetyUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Assuming your column names in the sheet are 'designNumber', 'description', and 'imagePath'
            var product = data.cc.find(function(p) {
                return p.designNumber.toString() === designNumber;
            });

            if (product) {
                displayDetails(product);
            } else {
                displayNotFound();
            }
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
            displayNotFound();
        });
}

function displayDetails(product) {
    const imageContainer = document.getElementById('imageContainer');
    const descriptionContainer = document.getElementById('productDescription');

    // Clear previous content
    imageContainer.innerHTML = '';
    descriptionContainer.innerHTML = '';

    // Split the imagePath string by comma to get individual image paths
    const imagePaths = product.imagePath.split(',');

    // Loop over each image path, create an image element, and append it to the imageContainer
    imagePaths.forEach((path) => {
        const img = document.createElement('img');
        img.src = path.trim();
        img.alt = "Product Image";
        img.onerror = () => img.style.display = 'none'; // Hide if the image can't load
        imageContainer.appendChild(img);
    });

    // Split the description by comma and create a new paragraph for each part
    const descriptionParts = product.description.split(',');
    descriptionParts.forEach((part, index) => {
        const descriptionP = document.createElement('p');
        descriptionP.textContent = part.trim();

        descriptionContainer.appendChild(descriptionP);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('propertySearchInput');
    const propertyList = document.getElementById('property-list');
    const propertyItems = propertyList.getElementsByClassName('property-item');
    const searchButton = document.getElementById('button-addon2');

    function filterProperties() {
        const searchTerm = searchInput.value.toLowerCase();

        for (let i = 0; i < propertyItems.length; i++) {
            const item = propertyItems[i];
            const title = item.querySelector('h4 a').innerText.toLowerCase();
            const category = item.querySelector('.category').innerText.toLowerCase();
            const details = item.querySelector('ul').innerText.toLowerCase(); // Get all list item text

            if (title.includes(searchTerm) || category.includes(searchTerm) || details.includes(searchTerm)) {
                item.style.display = 'block'; // Show the item
            } else {
                item.style.display = 'none'; // Hide the item
            }
        }
    }

    // Trigger filter when typing in the search input
    searchInput.addEventListener('keyup', filterProperties);

    // Trigger filter when clicking the search button
    searchButton.addEventListener('click', filterProperties);
});

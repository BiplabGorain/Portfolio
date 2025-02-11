
fetch(`${API_BASE_URL}/api/navbar-logo/`)
    .then((response) => response.json())
    .then((data) => {
        const logoImg = document.getElementById("nav-avatar");
        if (logoImg && data.logo_image) {
            logoImg.src = data.logo_image; // Dynamically update avatar image source
        }
    })
    // .catch((error) => console.error("Error fetching navbar avatar:", error));


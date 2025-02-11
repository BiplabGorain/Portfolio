

// Fallback data in case of API failure or missing data
const fallbackData = {
    quote: "Debugging Life, One Line at a Time.",
    getintouch_heading: "Get in Touch();",
    social_handles: [
        {
            name: "GitHub",
            logo_url: "https://img.icons8.com/?id=62856&format=png&color=FFFFFF",
            url: "https://github.com/BiplabGorain",
        },
        {
            name: "LinkedIn",
            logo_url: "https://img.icons8.com/?id=85044&format=png&color=FFFFFF",
            url: "https://www.linkedin.com/in/biplab-gorain/",
        },
        {
            name: "X",
            logo_url: "https://img.icons8.com/?id=YfCbGWCWcuar&format=png&color=FFFFFF",
            url: "https://x.com/mr_biplab123",
        },
        {
            name: "reddit",
            logo_url: "https://img.icons8.com/?id=102689&format=png&color=FFFFFF",
            url: "https://www.reddit.com/user/Biplab101/",
        },
        {
            name: "Mail",
            logo_url: "https://img.icons8.com/?id=86840&format=png&color=FFFFFF",
            url: "mailto:gorainbiplab123@gmail.com",
        },
    ],
};

// Reusable function to update footer content
const updateFooterContent = (data) => {
    const safeData = {
        quote: data?.quote || fallbackData.quote,
        getintouch_heading: data?.getintouch_heading || fallbackData.getintouch_heading,
        // Ensure social_handles is an array, if not, use fallback
        social_handles: Array.isArray(data?.social_handles) && data.social_handles.length > 0 ? data.social_handles : fallbackData.social_handles,
    };

    // Update quote
    const quoteElement = document.querySelector(".two-words article");
    if (quoteElement) {
        quoteElement.textContent = safeData.quote;
    }

    // Update "Get in Touch" heading
    const getInTouchHeading = document.querySelector(".getintouch-heading article");
    if (getInTouchHeading) {
        getInTouchHeading.textContent = safeData.getintouch_heading;
    }

    // Update social handles
    const container = document.getElementById("social-handles-container");
    if (container) {
        container.innerHTML = ""; // Clear previous social handles

        // Loop through each social handle and create HTML structure
        safeData.social_handles.forEach((handle) => {
            const socialHandleHTML = `
                <a href="${handle.url}" target="_blank" 
                   aria-label="My ${handle.name}" 
                   class="SocialHandle" tabindex="0">
                    <img src="${handle.logo_url}" alt="${handle.name} icon" class="social-icon" />
                </a>
            `;
            container.innerHTML += socialHandleHTML;
        });
    }
};

// Fetch footer data from API
fetch(`${API_BASE_URL}/api/footer/`) // Adjust API URL if needed
    .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then((data) => {
        // console.log("API Response for Footer Data:", data); // Log the fetched data for debugging
        updateFooterContent(data); // Update footer with API data
    })
    .catch((error) => {
        // console.error("Error fetching footer data:", error.message);
        updateFooterContent(fallbackData); // Fallback to default data
    });

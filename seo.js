// Default SEO data in case API request fails
const defaultSEOData = {
    title: "Biplab Gorain | Portfolio",
    description: "Biplab Gorain | Portfolio - Hi! I'm Biplab, a Python developer. Check out my projects and ideas.",
    keywords: "Biplab Gorain, portfolio, python developer, machine learning, backend",
    author: "Biplab Gorain",
    og_title: "Biplab Gorain | Portfolio",
    og_description: "Hi! I'm Biplab, a Python developer. Check out my projects and ideas.",
    og_site_name: "Biplab Gorain Portfolio",
    favicon_url: "src/png/biplab-avatar_1.png",
    font_url: null, // If no font is provided, don't load anything
};

// Function to update SEO metadata
const updateSEOMetadata = (data) => {
    document.title = data.title || defaultSEOData.title;

    document.querySelector('meta[name="description"]')?.setAttribute("content", data.description || defaultSEOData.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", data.keywords || defaultSEOData.keywords);
    document.querySelector('meta[name="author"]')?.setAttribute("content", data.author || defaultSEOData.author);

    document.querySelector('meta[property="og:title"]')?.setAttribute("content", data.og_title || defaultSEOData.og_title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", data.og_description || defaultSEOData.og_description);
    document.querySelector('meta[property="og:site_name"]')?.setAttribute("content", data.og_site_name || defaultSEOData.og_site_name);

    document.querySelector('link[rel="icon"]')?.setAttribute("href", data.favicon_url || defaultSEOData.favicon_url);

    // Dynamically load a font if available
    if (data.font_url) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = data.font_url;
        document.head.appendChild(link);
    }
};

// Fetch SEO data from the backend API
fetch(`${API_BASE_URL}/api/seo/`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(updateSEOMetadata)
    .catch((error) => {
        // console.error("Error fetching SEO data:", error);
        updateSEOMetadata(defaultSEOData); // Use default values if API request fails
    });

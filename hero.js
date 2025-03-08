// Default fallback data in case of API failure
const defaultHeroData = {
    greeting_text: "Namaste(); I'm",
    name_text: "Biplab Gorain",
    work_text: "Software Developer",
    description: "Python Developer with experience in Machine Learning and Backend Design. I love coding, collaboration, and building great products.",
    contact_email: "gorainbiplab123@gmail.com",
};

// Function to apply jello effect to text
const applyJelloEffect = (text) => {
    return text
        .split("")
        .map((char) => `<p class="jello">${char === " " ? "&nbsp;" : char}</p>`)
        .join("");
};

// Function to update the hero section
const updateHeroSection = (data) => {
    // Check if elements are available in the DOM before modifying them
    const helloFriendElement = document.getElementById("hello-friend");
    const nameElement = document.getElementById("name");
    const workTextElement = document.getElementById("work");
    const infoParaElement = document.getElementById("info-para");
    const contactButton = document.querySelector(".contact-btn-div a");

    if (helloFriendElement) {
        helloFriendElement.innerHTML = applyJelloEffect(data.greeting_text);
    }

    if (nameElement) {
        nameElement.innerHTML = applyJelloEffect(data.name_text);
    }

    if (workTextElement) {
        workTextElement.innerHTML = data.work_text
            .split(" ")
            .map((word) => `<div>${applyJelloEffect(word)}</div>`)
            .join("");
    }

    if (infoParaElement) {
        infoParaElement.innerHTML = data.description;
    }

    if (contactButton) {
        contactButton.href = `mailto:${data.contact_email}`;
    }
};

// Fetch hero section data from the backend API
fetch(`${API_BASE_URL}/api/hero/`) // Adjust API URL if needed
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // Log the API response data for debugging purposes
        // console.log("Fetched Hero Data:", data);

        // If there's no valid data or a message saying "No data found," use fallback
        if (data?.message === "No data found" || !data) {
            throw new Error("No data found from API");
        }

        // Use API data or fallback if any field is missing
        const safeData = {
            greeting_text: data.greeting_text || defaultHeroData.greeting_text,
            name_text: data.name_text || defaultHeroData.name_text,
            work_text: data.work_text || defaultHeroData.work_text,
            description: data.description || defaultHeroData.description,
            contact_email: data.contact_email || defaultHeroData.contact_email,
        };

        updateHeroSection(safeData);
    })
    .catch((error) => {
        // console.error("Error fetching hero section data:", error.message);
        // Apply fallback values if error occurs
        updateHeroSection(defaultHeroData);
    });

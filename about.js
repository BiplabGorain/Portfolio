// Default fallback data in case of API failure
const defaultAboutData = {
    description: `Hi! My name is Biplab. I'm a Software Developer with a strong passion for Python programming. My journey into development began in 2021 when I started exploring web technologies to showcase my digital concept arts. However, I soon discovered a deep interest in coding and problem-solving, which led me to specialize in Python. 
    I enjoy building efficient, scalable, and creative solutions using Python. Whether it's web development, automation, data analysis, or backend development, I love writing clean and maintainable code. My main focus these days is crafting robust applications and exploring the endless possibilities Python offers. 
    I take pride in coding from scratch and turning ideas into functional, high-quality software. 🚀`,
    resume_link: "https://drive.google.com/file/d/1OQIOMcVNdYAnz8p4h43IWYl7UaXsGztB/view?usp=sharing",
    profile_image_url: "src/png/biplab-avatar (3).png",
};

// Function to update the about section
const updateAboutSection = (data) => {
    const aboutContainer = document.querySelector(".about-info");
    const resumeBtn = document.getElementById("resume-btn");
    const dpImg = document.querySelector(".dp img");

    if (aboutContainer) {
        // Clear existing paragraphs but keep the button
        aboutContainer.querySelectorAll("p").forEach(p => p.remove());

        // Split the description into paragraphs and append them
        data.description.split("\n").forEach(paragraph => {
            const pTag = document.createElement("p");
            pTag.textContent = paragraph;
            aboutContainer.appendChild(pTag);
            aboutContainer.appendChild(document.createElement("br")); // Add line break
        });

        // Re-attach resume button
        if (resumeBtn) {
            aboutContainer.appendChild(resumeBtn);
            resumeBtn.onclick = () => window.open(data.resume_link, "_blank");
        }
    }

    // Update profile picture
    if (dpImg) {
        dpImg.src = data.profile_image_url;
    }
};

// Fetch about section data from API
fetch(`${API_BASE_URL}/api/about/`)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (data?.message === "No data found") throw new Error("No data found from API");

        // Use API data with fallback for missing values
        const safeData = {
            description: data.description || defaultAboutData.description,
            resume_link: data.resume_link || defaultAboutData.resume_link,
            profile_image_url: data.profile_image_url || defaultAboutData.profile_image_url,
        };

        updateAboutSection(safeData);
    })
    .catch(error => {
        console.error("Error fetching about section data:", error.message);
        updateAboutSection(defaultAboutData); // Apply fallback values if API fails
    });

// Fallback skills in case API call fails
const fallbackSkills = {
    skill_list: [
    { name: "Python", logo_url: "https://img.icons8.com/?size=160&id=13441&format=png&color=000000" },
    { name: "Java", logo_url: "https://img.icons8.com/?size=160&id=13679&format=png&color=000000" },
    { name: "SQL", logo_url: "https://img.icons8.com/?size=160&id=hKw7Mn8TNTuz&format=png&color=000000" },
    { name: "HTML", logo_url: "https://img.icons8.com/?size=160&id=20909&format=png&color=000000" },
    { name: "CSS", logo_url: "https://img.icons8.com/?size=160&id=21278&format=png&color=000000" },
    { name: "Machine Learning", logo_url: "https://img.icons8.com/?size=160&id=WIQXd2iiU7mH&format=png&color=000000" },
    { name: "Data Science", logo_url: "https://img.icons8.com/?size=160&id=6hPbJUZfMZgo&format=png&color=000000" },
    { name: "Django", logo_url: "https://img.icons8.com/?size=160&id=IuuVVwsdTi2v&format=png&color=000000" },
    { name: "Flask", logo_url: "https://img.icons8.com/?size=160&id=AqYCfGyGXlO7&format=png&color=000000" },
    ]
};

// Function to update the skills section
const updateSkillsSection = (data) => {
    const skillContainer = document.querySelector(".tech-stack-wrapper");

    if (!skillContainer) return; // Ensure container exists

    skillContainer.innerHTML = ""; // Clear previous skills

    // Extract skill_list correctly
    const skillList = data[0]?.skill_list || fallbackSkills.skill_list;

    skillList.forEach((skill) => {
        skillContainer.innerHTML += `
            <li class="tech-stack-box" data-aos="fade-up">
                <img src="${skill.logo_url || 'default-skill.png'}" alt="${skill.name || 'Unknown Skill'}" class="tech-stack-logo" />
                <span class="tooltip">${skill.name || 'Unknown Skill'}</span>
            </li>`;
    });
};

// Fetch skills data from API
fetch("${API_BASE_URL}/api/skills/")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data) || data.length === 0 || !data[0].skill_list) {
            throw new Error("");
        }
        updateSkillsSection(data); // Populate API data
    })
    .catch(error => {
        // console.error("Error fetching skills:", error.message);
        updateSkillsSection(fallbackSkills); // Use fallback skills if API fails
    });

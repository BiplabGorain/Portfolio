// Fallback projects in case API call fails
const fallbacProjectkData = {
    project_list: [
    {
        title: "RecipeLens",
        description: "RecipeLens helps users find recipes by identifying dishes from images.",
        favicon_url: "https://img.icons8.com/?id=12869&format=png&color=000000",
        preview_image_url: "./src/png/RecipeLens-preview.png",
        github_url: "https://github.com/BiplabGorain/Final-Year-Project",
        live_url: null,
    },
    {
        title: "Tax-Computation Calculator",
        description: "Tax-Computation Calculator calculates tax in a user-friendly way for salaried individuals by allowing them to enter basic income details.",
        favicon_url: "https://img.icons8.com/?id=36947&format=png&color=000000",
        preview_image_url: "./src/png/TaxComputation-preview.png",
        github_url: "https://github.com/BiplabGorain/Tax-Computation-Calculator",
        live_url: "https://biplab.pythonanywhere.com",
    },
    {
        title: "Life Expectancy Predictor",
        description: "Life Expectancy Predictor predicts the average human lifespan of countries based on various factors like GDP, population, adult mortality, alcohol consumption, and schooling.",
        favicon_url: "https://img.icons8.com/?id=78394&format=png&color=000000",
        preview_image_url: "./src/png/Life_expectancy_prediction-preview.png",
        github_url: "https://github.com/BiplabGorain/Life-Expectancy-Predictor",
        live_url: null,
    },
    {
        title: "Barbell Exercises Classifier",
        description: "Barbell Exercises Classifier identifies various barbell exercises using a trained machine learning model.",
        favicon_url: "https://img.icons8.com/?id=MUcS5TRquPqI&format=png&color=000000",
        preview_image_url: "./src/png/BarbellExercisesClassifiers-preview.png",
        github_url: "https://github.com/BiplabGorain/Barbell-Exercises-Classifier",
        live_url: null,
        },
    ],
    
};

// Function to update the projects section
const updateProjectsSection = (data) => {
    const projectContainer = document.querySelector(".project-boxes-div");

    if (!projectContainer) return; // Ensure container exists

    projectContainer.innerHTML = ""; // Clear previous projects

    // Append each project dynamically
    
        // Ensure safe values for missing data
        const safeProjectData = {
            project_list: Array.isArray(data?.project_list) && data.project_list.length > 0 ? data.project_list : fallbacProjectkData.project_list,
        };


        safeProjectData.project_list.forEach((project) => {

        // GitHub button (if `github_url` exists)
        const githubLink = project.github_url
            ? `<a href="${project.github_url}" target="_blank" class="github-redirect" aria-label="Visit ${project.title} on GitHub">
                 <img src="src/svg/github.svg" alt="GitHub redirect button" />
               </a>`
            : "";

        // Live View button (if `live_url` exists)
        const liveViewLink = project.live_url
            ? `<a href="${project.live_url}" target="_blank" class="cta" aria-label="Visit ${project.title} live">
                 <span>Live view</span>
                 <svg viewBox="0 0 13 10" height="10px" width="15px">
                   <path d="M1,5 L11,5"></path>
                   <polyline points="8 1 12 5 8 9"></polyline>
                 </svg>
               </a>`
            : "";

        // Construct project HTML
        const projectHTML = `
            <div class="project-box-wrapper" data-aos="fade-up">
                <div class="project-box">
                    <div class="info-div">
                        <img src="${project.favicon_url}" alt="${project.title} favicon" class="faviconforProject" />
                        <article class="ProjectHeading">${project.title}</article>
                        <p class="ProjectDescription">${project.description}</p>
                        <div class="project-buttons">
                            ${githubLink}
                            ${liveViewLink}
                        </div>
                    </div>
                    <div class="image-div">
                        <img src="${project.preview_image_url}" alt="${project.title} website preview image" />
                    </div>
                </div>
            </div>`;

            projectContainer.innerHTML += projectHTML;
        });
   
};

// Fetch projects data from API
fetch(`${API_BASE_URL}/api/projects/`)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        // console.log("API Response for Project Data:", data); // Debugging

        // Extract correct project list from API response
        const extractedData = Array.isArray(data) && data.length > 0 ? data[0] : {};

        updateProjectsSection(extractedData); // Populate API data
    })
    .catch(error => {
        // console.error("Error fetching projects:", error.message);
        updateProjectsSection(fallbacProjectkData); // Use fallback projects if API fails
    });

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const holder = document.getElementById('project-holder');
        data.projects.forEach(project => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail');
            thumbnailDiv.style.backgroundImage = `url("${project.thumbnail}")`;

            if (project.href) {
                const anchor = document.createElement('a');
                anchor.href = project.href;
                anchor.target = "_blank";
                anchor.appendChild(thumbnailDiv);
                projectDiv.appendChild(anchor);
            } else {
                projectDiv.appendChild(thumbnailDiv);
            }

            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('description');

            const projectName = document.createElement('p');
            projectName.classList.add('project-name');
            projectName.textContent = project.name;
            descriptionDiv.appendChild(projectName);

            const projectDate = document.createElement('p');
            projectDate.classList.add('project-date');
            projectDate.textContent = project.date;
            descriptionDiv.appendChild(projectDate);

            const projectDescription = document.createElement('p');
            projectDescription.classList.add('project-description');
            projectDescription.textContent = project.description;
            descriptionDiv.appendChild(projectDescription);

            projectDiv.appendChild(descriptionDiv);

            holder.appendChild(projectDiv);
        });

        const marginDiv = document.createElement('div');
        marginDiv.style.marginTop = '1rem';
        holder.appendChild(marginDiv);
    })
    .catch(error => {
        console.error("Error fetching or parsing projects.json:", error);
    });
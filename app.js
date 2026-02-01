// Load and display data from JSON
fetch('meushi-data.json')
    .then(response => response.json())
    .then(data => {
        loadVersion(data.version);
        loadDescription(data.description);
        loadSkins(data.skins);
        loadArticle(data.article_sections);
        loadEndpoints(data.endpoints);
        loadCommands(data.commands);
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.body.innerHTML = '<div style="text-align: center; padding: 50px; color: white;"><h2>Error loading Meushi data</h2><p>Please check the console for details.</p></div>';
    });

function loadVersion(version) {
    const versionEl = document.getElementById('version');
    versionEl.textContent = 'Version: ' + version;
}

function loadDescription(description) {
    const descEl = document.getElementById('description');
    descEl.textContent = description;
}

function loadSkins(skins) {
    const container = document.getElementById('skins-container');
    
    for (const [key, skin] of Object.entries(skins)) {
        const skinDiv = document.createElement('div');
        skinDiv.className = 'skin-item';
        
        const title = document.createElement('h3');
        title.textContent = 'Skin: ' + key;
        skinDiv.appendChild(title);
        
        const imagesDiv = document.createElement('div');
        imagesDiv.className = 'skin-images';
        
        if (skin.skinfile) {
            const skinImg = document.createElement('img');
            skinImg.src = skin.skinfile;
            skinImg.alt = key + ' skin';
            skinImg.title = 'Skin File';
            imagesDiv.appendChild(skinImg);
        }
        
        if (skin.bodyRender) {
            const renderImg = document.createElement('img');
            renderImg.src = skin.bodyRender;
            renderImg.alt = key + ' render';
            renderImg.title = 'Body Render';
            imagesDiv.appendChild(renderImg);
        }
        
        skinDiv.appendChild(imagesDiv);
        container.appendChild(skinDiv);
    }
}

function loadArticle(sections) {
    const container = document.getElementById('article-content');
    
    sections.forEach(section => {
        const paragraph = document.createElement('p');
        paragraph.className = 'article-paragraph';
        paragraph.textContent = section;
        container.appendChild(paragraph);
    });
}

function loadEndpoints(endpoints) {
    const container = document.getElementById('endpoints-container');
    
    for (const [key, endpoint] of Object.entries(endpoints)) {
        const endpointDiv = document.createElement('div');
        endpointDiv.className = 'endpoint-item';
        
        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.textContent = key;
        endpointDiv.appendChild(keySpan);
        
        const title = document.createElement('h3');
        title.textContent = endpoint.fullname;
        endpointDiv.appendChild(title);
        
        const desc = document.createElement('p');
        desc.textContent = endpoint.description;
        endpointDiv.appendChild(desc);
        
        container.appendChild(endpointDiv);
    }
}

function loadCommands(commands) {
    const container = document.getElementById('commands-container');
    
    for (const [key, command] of Object.entries(commands)) {
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command-item';
        
        const title = document.createElement('h3');
        title.textContent = key;
        commandDiv.appendChild(title);
        
        const desc = document.createElement('p');
        desc.textContent = command.description;
        commandDiv.appendChild(desc);
        
        if (command.usage && command.usage.length > 0) {
            const usageLabel = document.createElement('p');
            usageLabel.innerHTML = '<strong>Usage:</strong>';
            commandDiv.appendChild(usageLabel);
            
            const usageList = document.createElement('ul');
            usageList.className = 'usage-list';
            
            command.usage.forEach(usage => {
                const usageItem = document.createElement('li');
                usageItem.className = 'usage-item';
                usageItem.textContent = usage;
                usageList.appendChild(usageItem);
            });
            
            commandDiv.appendChild(usageList);
        }
        
        const endpointsDiv = document.createElement('div');
        if (command.endpoints.length === 0) {
            const badge = document.createElement('span');
            badge.className = 'endpoints-badge unrestricted-badge';
            badge.textContent = 'All Platforms';
            endpointsDiv.appendChild(badge);
        } else {
            command.endpoints.forEach(endpoint => {
                const badge = document.createElement('span');
                badge.className = 'endpoints-badge';
                badge.textContent = endpoint;
                endpointsDiv.appendChild(badge);
            });
        }
        commandDiv.appendChild(endpointsDiv);
        
        container.appendChild(commandDiv);
    }
}

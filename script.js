document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const nominees = [
        // Best Picture (10 nominees)
        { id: 'bp-bugonia', title: 'Bugonia', category: 'Best Picture' },
        { id: 'bp-f1', title: 'F1', category: 'Best Picture' },
        { id: 'bp-frankenstein', title: 'Frankenstein', category: 'Best Picture' },
        { id: 'bp-hamnet', title: 'Hamnet', category: 'Best Picture' },
        { id: 'bp-marty-supreme', title: 'Marty Supreme', category: 'Best Picture' },
        { id: 'bp-one-battle', title: 'One Battle After Another', category: 'Best Picture' },
        { id: 'bp-secret-agent', title: 'The Secret Agent', category: 'Best Picture' },
        { id: 'bp-sentimental-value', title: 'Sentimental Value', category: 'Best Picture' },
        { id: 'bp-sinners', title: 'Sinners', category: 'Best Picture' },
        { id: 'bp-train-dreams', title: 'Train Dreams', category: 'Best Picture' },

        // Best Director (5 nominees)
        { id: 'dir-zhao', title: 'Chloé Zhao', subtitle: 'Hamnet', category: 'Best Director' },
        { id: 'dir-safdie', title: 'Josh Safdie', subtitle: 'Marty Supreme', category: 'Best Director' },
        { id: 'dir-anderson', title: 'Paul Thomas Anderson', subtitle: 'One Battle After Another', category: 'Best Director' },
        { id: 'dir-trier', title: 'Joachim Trier', subtitle: 'Sentimental Value', category: 'Best Director' },
        { id: 'dir-coogler', title: 'Ryan Coogler', subtitle: 'Sinners', category: 'Best Director' },

        // Best Actor (5 nominees)
        { id: 'act-chalamet', title: 'Timothée Chalamet', subtitle: 'Marty Supreme', category: 'Best Actor' },
        { id: 'act-dicaprio', title: 'Leonardo DiCaprio', subtitle: 'One Battle After Another', category: 'Best Actor' },
        { id: 'act-hawke', title: 'Ethan Hawke', subtitle: 'Blue Moon', category: 'Best Actor' },
        { id: 'act-jordan', title: 'Michael B. Jordan', subtitle: 'Sinners', category: 'Best Actor' },
        { id: 'act-moura', title: 'Wagner Moura', subtitle: 'The Secret Agent', category: 'Best Actor' },

        // Best Actress (5 nominees)
        { id: 'actr-buckley', title: 'Jessie Buckley', subtitle: 'Hamnet', category: 'Best Actress' },
        { id: 'actr-byrne', title: 'Rose Byrne', subtitle: 'If I Had Legs I\'d Kick You', category: 'Best Actress' },
        { id: 'actr-hudson', title: 'Kate Hudson', subtitle: 'Song Sung Blue', category: 'Best Actress' },
        { id: 'actr-reinsve', title: 'Renate Reinsve', subtitle: 'Sentimental Value', category: 'Best Actress' },
        { id: 'actr-stone', title: 'Emma Stone', subtitle: 'Bugonia', category: 'Best Actress' },

        // Best Supporting Actor (5 nominees)
        { id: 'sact-deltoro', title: 'Benicio del Toro', subtitle: 'One Battle After Another', category: 'Best Supporting Actor' },
        { id: 'sact-elordi', title: 'Jacob Elordi', subtitle: 'Frankenstein', category: 'Best Supporting Actor' },
        { id: 'sact-lindo', title: 'Delroy Lindo', subtitle: 'Sinners', category: 'Best Supporting Actor' },
        { id: 'sact-penn', title: 'Sean Penn', subtitle: 'One Battle After Another', category: 'Best Supporting Actor' },
        { id: 'sact-skarsgard', title: 'Stellan Skarsgård', subtitle: 'Sentimental Value', category: 'Best Supporting Actor' },

        // Best Supporting Actress (5 nominees)
        { id: 'sactr-fanning', title: 'Elle Fanning', subtitle: 'Sentimental Value', category: 'Best Supporting Actress' },
        { id: 'sactr-lilleaas', title: 'Inga Ibsdotter Lilleaas', subtitle: 'Sentimental Value', category: 'Best Supporting Actress' },
        { id: 'sactr-madigan', title: 'Amy Madigan', subtitle: 'Weapons', category: 'Best Supporting Actress' },
        { id: 'sactr-mosaku', title: 'Wunmi Mosaku', subtitle: 'Sinners', category: 'Best Supporting Actress' },
        { id: 'sactr-taylor', title: 'Teyana Taylor', subtitle: 'One Battle After Another', category: 'Best Supporting Actress' },

        // Best Animated Feature (5 nominees)
        { id: 'anim-arco', title: 'Arco', category: 'Best Animated Feature' },
        { id: 'anim-elio', title: 'Elio', category: 'Best Animated Feature' },
        { id: 'anim-kpop', title: 'KPop Demon Hunters', category: 'Best Animated Feature' },
        { id: 'anim-amelie', title: 'Little Amélie or the Character of Rain', category: 'Best Animated Feature' },
        { id: 'anim-zootopia', title: 'Zootopia 2', category: 'Best Animated Feature' },

        // Best Animated Short (5 nominees)
        { id: 'ashort-butterfly', title: 'Butterfly', category: 'Best Animated Short' },
        { id: 'ashort-forevergreen', title: 'Forevergreen', category: 'Best Animated Short' },
        { id: 'ashort-pearls', title: 'The Girl Who Cried Pearls', category: 'Best Animated Short' },
        { id: 'ashort-retirement', title: 'Retirement Plan', category: 'Best Animated Short' },
        { id: 'ashort-sisters', title: 'The Three Sisters', category: 'Best Animated Short' },

        // Best Cinematography (5 nominees)
        { id: 'cin-frankenstein', title: 'Frankenstein', category: 'Best Cinematography' },
        { id: 'cin-marty', title: 'Marty Supreme', category: 'Best Cinematography' },
        { id: 'cin-one-battle', title: 'One Battle After Another', category: 'Best Cinematography' },
        { id: 'cin-sinners', title: 'Sinners', category: 'Best Cinematography' },
        { id: 'cin-train', title: 'Train Dreams', category: 'Best Cinematography' },

        // Best Costume Design (5 nominees)
        { id: 'cos-avatar', title: 'Avatar: Fire and Ash', category: 'Best Costume Design' },
        { id: 'cos-frankenstein', title: 'Frankenstein', category: 'Best Costume Design' },
        { id: 'cos-hamnet', title: 'Hamnet', category: 'Best Costume Design' },
        { id: 'cos-marty', title: 'Marty Supreme', category: 'Best Costume Design' },
        { id: 'cos-sinners', title: 'Sinners', category: 'Best Costume Design' },

        // Best Documentary Feature (5 nominees)
        { id: 'doc-alabama', title: 'The Alabama Solution', category: 'Best Documentary Feature' },
        { id: 'doc-good-light', title: 'Come See Me in the Good Light', category: 'Best Documentary Feature' },
        { id: 'doc-rocks', title: 'Cutting Through Rocks', category: 'Best Documentary Feature' },
        { id: 'doc-putin', title: 'Mr. Nobody Against Putin', category: 'Best Documentary Feature' },
        { id: 'doc-neighbor', title: 'The Perfect Neighbor', category: 'Best Documentary Feature' },

        // Best Documentary Short (5 nominees)
        { id: 'dshort-rooms', title: 'All the Empty Rooms', category: 'Best Documentary Short' },
        { id: 'dshort-camera', title: 'Armed Only With a Camera', category: 'Best Documentary Short' },
        { id: 'dshort-children', title: 'Children No More', category: 'Best Documentary Short' },
        { id: 'dshort-devil', title: 'The Devil Is Busy', category: 'Best Documentary Short' },
        { id: 'dshort-strange', title: 'Perfectly a Strangeness', category: 'Best Documentary Short' },

        // Best Film Editing (5 nominees)
        { id: 'edit-f1', title: 'F1', category: 'Best Film Editing' },
        { id: 'edit-marty', title: 'Marty Supreme', category: 'Best Film Editing' },
        { id: 'edit-one-battle', title: 'One Battle After Another', category: 'Best Film Editing' },
        { id: 'edit-sentimental', title: 'Sentimental Value', category: 'Best Film Editing' },
        { id: 'edit-sinners', title: 'Sinners', category: 'Best Film Editing' },

        // Best International Feature (5 nominees)
        { id: 'intl-secret-agent', title: 'The Secret Agent (Brazil)', category: 'Best International Feature' },
        { id: 'intl-accident', title: 'It Was Just an Accident (France)', category: 'Best International Feature' },
        { id: 'intl-sentimental', title: 'Sentimental Value (Norway)', category: 'Best International Feature' },
        { id: 'intl-sirat', title: 'Sirāt (Spain)', category: 'Best International Feature' },
        { id: 'intl-hind', title: 'The Voice of Hind Rajab (Tunisia)', category: 'Best International Feature' },

        // Best Casting (NEW category for 2026!) (5 nominees)
        { id: 'cast-hamnet', title: 'Hamnet (Nina Gold)', category: 'Best Casting' },
        { id: 'cast-marty', title: 'Marty Supreme (Jennifer Venditti)', category: 'Best Casting' },
        { id: 'cast-one-battle', title: 'One Battle After Another (Cassandra Kulukundis)', category: 'Best Casting' },
        { id: 'cast-secret-agent', title: 'The Secret Agent (Gabriel Domingues)', category: 'Best Casting' },
        { id: 'cast-sinners', title: 'Sinners (Francine Maisler)', category: 'Best Casting' },

        // Best Makeup and Hairstyling (5 nominees)
        { id: 'mua-frankenstein', title: 'Frankenstein', category: 'Best Makeup and Hairstyling' },
        { id: 'mua-kokuho', title: 'Kokuho', category: 'Best Makeup and Hairstyling' },
        { id: 'mua-sinners', title: 'Sinners', category: 'Best Makeup and Hairstyling' },
        { id: 'mua-smashing', title: 'The Smashing Machine', category: 'Best Makeup and Hairstyling' },
        { id: 'mua-stepsister', title: 'The Ugly Stepsister', category: 'Best Makeup and Hairstyling' },

        // Best Original Score (5 nominees)
        { id: 'score-bugonia', title: 'Bugonia', category: 'Best Original Score' },
        { id: 'score-frankenstein', title: 'Frankenstein', category: 'Best Original Score' },
        { id: 'score-hamnet', title: 'Hamnet', category: 'Best Original Score' },
        { id: 'score-one-battle', title: 'One Battle After Another', category: 'Best Original Score' },
        { id: 'score-sinners', title: 'Sinners', category: 'Best Original Score' },

        // Best Original Song (5 nominees)
        { id: 'song-dear-me', title: '"Dear Me"', subtitle: 'Diane Warren: Relentless', category: 'Best Original Song' },
        { id: 'song-golden', title: '"Golden"', subtitle: 'KPop Demon Hunters', category: 'Best Original Song' },
        { id: 'song-i-lied', title: '"I Lied to You"', subtitle: 'Sinners', category: 'Best Original Song' },
        { id: 'song-sweet-dreams', title: '"Sweet Dreams of Joy"', subtitle: 'Viva Verdi!', category: 'Best Original Song' },
        { id: 'song-train-dreams', title: '"Train Dreams"', subtitle: 'Train Dreams', category: 'Best Original Song' },

        // Best Production Design (5 nominees)
        { id: 'prod-frankenstein', title: 'Frankenstein', category: 'Best Production Design' },
        { id: 'prod-hamnet', title: 'Hamnet', category: 'Best Production Design' },
        { id: 'prod-marty', title: 'Marty Supreme', category: 'Best Production Design' },
        { id: 'prod-one-battle', title: 'One Battle After Another', category: 'Best Production Design' },
        { id: 'prod-sinners', title: 'Sinners', category: 'Best Production Design' },

        // Best Live Action Short (5 nominees)
        { id: 'lshort-butcher', title: "Butcher's Stain", category: 'Best Live Action Short' },
        { id: 'lshort-dorothy', title: 'A Friend of Dorothy', category: 'Best Live Action Short' },
        { id: 'lshort-austen', title: "Jane Austen's Period Drama", category: 'Best Live Action Short' },
        { id: 'lshort-singers', title: 'The Singers', category: 'Best Live Action Short' },
        { id: 'lshort-saliva', title: 'Two People Exchanging Saliva', category: 'Best Live Action Short' },

        // Best Sound (5 nominees)
        { id: 'snd-f1', title: 'F1', category: 'Best Sound' },
        { id: 'snd-frankenstein', title: 'Frankenstein', category: 'Best Sound' },
        { id: 'snd-one-battle', title: 'One Battle After Another', category: 'Best Sound' },
        { id: 'snd-sinners', title: 'Sinners', category: 'Best Sound' },
        { id: 'snd-sirat', title: 'Sirāt', category: 'Best Sound' },

        // Best Visual Effects (5 nominees)
        { id: 'vfx-avatar', title: 'Avatar: Fire and Ash', category: 'Best Visual Effects' },
        { id: 'vfx-f1', title: 'F1', category: 'Best Visual Effects' },
        { id: 'vfx-jurassic', title: 'Jurassic World Rebirth', category: 'Best Visual Effects' },
        { id: 'vfx-lost-bus', title: 'The Lost Bus', category: 'Best Visual Effects' },
        { id: 'vfx-sinners', title: 'Sinners', category: 'Best Visual Effects' },

        // Best Adapted Screenplay (5 nominees)
        { id: 'asc-bugonia', title: 'Bugonia', category: 'Best Adapted Screenplay' },
        { id: 'asc-frankenstein', title: 'Frankenstein', category: 'Best Adapted Screenplay' },
        { id: 'asc-hamnet', title: 'Hamnet', category: 'Best Adapted Screenplay' },
        { id: 'asc-one-battle', title: 'One Battle After Another', category: 'Best Adapted Screenplay' },
        { id: 'asc-train', title: 'Train Dreams', category: 'Best Adapted Screenplay' },

        // Best Original Screenplay (5 nominees)
        { id: 'osc-blue-moon', title: 'Blue Moon', category: 'Best Original Screenplay' },
        { id: 'osc-accident', title: 'It Was Just an Accident', category: 'Best Original Screenplay' },
        { id: 'osc-marty', title: 'Marty Supreme', category: 'Best Original Screenplay' },
        { id: 'osc-sentimental', title: 'Sentimental Value', category: 'Best Original Screenplay' },
        { id: 'osc-sinners', title: 'Sinners', category: 'Best Original Screenplay' },
    ];

    const categories = [...new Set(nominees.map(n => n.category))];
    let voterName = '';
    let votes = {};

    // --- DOM ELEMENTS ---
    const nameModalOverlay = document.getElementById('name-modal-overlay');
    const nameForm = document.getElementById('name-form');
    const nameInput = document.getElementById('voter-name-input');
    const welcomeMessage = document.getElementById('welcome-message');
    const changeNameLink = document.getElementById('change-name-link');
    const categoryList = document.getElementById('category-list');
    const nomineeContainer = document.getElementById('nominee-container');
    const resultsContainer = document.getElementById('results-container');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const categoryNav = document.getElementById('category-nav');
    
    // --- STATE MANAGEMENT ---
    const loadVotes = async () => {
        try {
            const res = await fetch('/api/votes');
            const data = await res.json();
            votes = data.votes || {};
        } catch (e) {
            console.error('Failed to load votes:', e);
            votes = {};
        }
    };

    const saveVote = async (voter, nomineeId, category) => {
        try {
            await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voter, nomineeId, category })
            });
        } catch (e) {
            console.error('Failed to save vote:', e);
        }
    };
    
    // --- VOTER IDENTIFICATION ---
    const handleVoterName = () => {
        const storedName = localStorage.getItem('oscarsVoterName');
        if (storedName) {
            voterName = storedName;
            welcomeMessage.textContent = `Welcome back, ${voterName}!`;
            nameModalOverlay.classList.remove('visible');
        } else {
            nameModalOverlay.classList.add('visible');
            nameInput.focus();
        }
    };

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (name) {
            voterName = name;
            localStorage.setItem('oscarsVoterName', name);
            welcomeMessage.textContent = `Welcome, ${voterName}!`;
            nameModalOverlay.classList.remove('visible');
        }
    });

    changeNameLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Only clear current voter's votes, not everyone's
        const oldName = voterName;

        localStorage.removeItem('oscarsVoterName');
        voterName = '';
        location.reload();
    });

    // --- RENDERING ---
    const renderCategories = () => {
        categoryList.innerHTML = '';
        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${category.replace(/\s+/g, '-')}`;
            a.textContent = category;
            a.dataset.category = category;
            li.appendChild(a);
            categoryList.appendChild(li);
        });
    };

    const renderNominees = () => {
        nomineeContainer.innerHTML = '';
        categories.forEach(category => {
            const section = document.createElement('section');
            section.id = category.replace(/\s+/g, '-');
            section.className = 'category-section';

            const title = document.createElement('h2');
            title.className = 'category-title';
            title.textContent = category;
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'nominee-grid';

            const categoryNominees = nominees.filter(n => n.category === category);
            categoryNominees.forEach(nominee => {
                const card = document.createElement('div');
                card.className = 'nominee-card';
                card.innerHTML = `
                    <div>
                        <h3 class="nominee-title">${nominee.title}</h3>
                        <p class="nominee-subtitle">${nominee.subtitle || '&nbsp;'}</p>
                    </div>
                    <button class="vote-button" data-id="${nominee.id}" data-category="${category}">Vote</button>
                `;
                grid.appendChild(card);
            });

            section.appendChild(grid);
            nomineeContainer.appendChild(section);
        });
    };
    
    const renderResults = () => {
        resultsContainer.innerHTML = '';
        
        // Collate votes by nominee
        const voteCounts = {};
        Object.values(votes).forEach(vote => {
            if (!voteCounts[vote.nomineeId]) {
                voteCounts[vote.nomineeId] = { count: 0, voters: [] };
            }
            voteCounts[vote.nomineeId].count++;
            voteCounts[vote.nomineeId].voters.push(vote.voter);
        });

        categories.forEach(category => {
            const resultSection = document.createElement('div');
            resultSection.className = 'category-result';

            const title = document.createElement('h3');
            title.textContent = category;
            resultSection.appendChild(title);

            const list = document.createElement('ul');
            
            const categoryNominees = nominees.filter(n => n.category === category);
            
            // Sort by vote count
            categoryNominees.sort((a, b) => {
                const countA = voteCounts[a.id] ? voteCounts[a.id].count : 0;
                const countB = voteCounts[b.id] ? voteCounts[b.id].count : 0;
                return countB - countA;
            });

            categoryNominees.forEach(nominee => {
                const voteInfo = voteCounts[nominee.id] || { count: 0, voters: [] };
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="result-nominee-info">
                        <span class="result-nominee-title">${nominee.title}</span>
                        <span class="result-voters">${voteInfo.voters.join(', ') || 'No votes yet'}</span>
                    </div>
                    <span class="result-vote-count">${voteInfo.count}</span>
                `;
                list.appendChild(li);
            });
            resultSection.appendChild(list);
            resultsContainer.appendChild(resultSection);
        });
    };

    // --- EVENT HANDLING ---
    nomineeContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('vote-button')) {
            if (!voterName) {
                nameModalOverlay.classList.add('visible');
                nameInput.focus();
                return;
            }
            const { id, category } = e.target.dataset;

            // Record vote
            await saveVote(voterName, id, category);

            await loadVotes();
            updateUI();
        }
    });
    
    // Category navigation click
    categoryList.addEventListener('click', e => {
        if(e.target.tagName === 'A') {
             e.preventDefault();
             document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
             });
             // For mobile, close the nav after clicking
             if (window.innerWidth <= 900) {
                 categoryNav.classList.remove('open');
             }
        }
    });

    mobileNavToggle.addEventListener('click', () => {
        categoryNav.classList.toggle('open');
    });

    // Highlight active category on scroll
    const onScroll = () => {
        const sections = document.querySelectorAll('.category-section');
        const navLinks = document.querySelectorAll('#category-list a');
        
        let currentCategory = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                currentCategory = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const categoryId = link.getAttribute('href').substring(1);
            if (categoryId === currentCategory) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', onScroll);


    // --- UI UPDATES ---
    const updateUI = () => {
        updateVoteButtons();
        renderResults();
    };
    
    const updateVoteButtons = () => {
        const buttons = document.querySelectorAll('.vote-button');
        const myVotes = {};
        // Get current voter's selections
        Object.keys(votes).forEach(key => {
            if (key.startsWith(`${voterName}-`)) {
                const vote = votes[key];
                myVotes[vote.category] = vote.nomineeId;
            }
        });

        buttons.forEach(button => {
            const { id, category } = button.dataset;
            button.classList.remove('selected');
            if (myVotes[category] && myVotes[category] === id) {
                button.classList.add('selected');
            }
        });
    };

    // --- INITIALIZATION ---
    async function init() {
        await loadVotes();
        handleVoterName();
        renderCategories();
        renderNominees();
        updateUI();
    }

    init();
});

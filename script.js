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

    const posters = {
        'Sinners': 'https://image.tmdb.org/t/p/w300/cuM1rGXxTd28KEQXBG683ODtWPY.jpg',
        'F1': 'https://image.tmdb.org/t/p/w300/vqBmyAj0Xm9LnS1xe1MSlMAJyHq.jpg',
        'Zootopia 2': 'https://image.tmdb.org/t/p/w300/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg',
        'Bugonia': 'https://image.tmdb.org/t/p/w300/oxgsAQDAAxA92mFGYCZllgWkH9J.jpg',
        'Jurassic World Rebirth': 'https://image.tmdb.org/t/p/w300/sGfjoazodTIvYINfQQJ42C5sIXl.jpg',
        'Frankenstein': 'https://image.tmdb.org/t/p/w300/g4JtvGlQO7DByTI6frUobqvSL3R.jpg',
        'Elio': 'https://image.tmdb.org/t/p/w300/7z8jDiTZZco9moIKpTUImFtTy7o.jpg',
        'Hamnet': 'https://image.tmdb.org/t/p/w300/vbeyOZm2bvBXcbgPD3v6o94epPX.jpg',
        'Marty Supreme': 'https://image.tmdb.org/t/p/w300/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg',
        'One Battle After Another': 'https://image.tmdb.org/t/p/w300/leQ7ilvHdnQWAB5JV3ATBnRyQSD.jpg',
        'The Smashing Machine': 'https://image.tmdb.org/t/p/w300/mPuBDGrVIBGOymBxR6rO3iIvBSe.jpg',
        'Avatar: Fire and Ash': 'https://image.tmdb.org/t/p/w300/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg',
        'Sentimental Value': 'https://image.tmdb.org/t/p/w300/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg',
        'The Secret Agent': 'https://image.tmdb.org/t/p/w300/iLE2YOmeboeTDC7GlOp1dzh1VFo.jpg',
        'Blue Moon': 'https://image.tmdb.org/t/p/w300/AetJmEIrhww0xnfktYgNl6ztDrl.jpg',
        'The Secret Agent (Brazil)': 'https://image.tmdb.org/t/p/w300/iLE2YOmeboeTDC7GlOp1dzh1VFo.jpg',
        'Sentimental Value (Norway)': 'https://image.tmdb.org/t/p/w300/pz9NCWxxOk3o0W3v1Zkhawrwb4i.jpg'
    };


    const categories = [...new Set(nominees.map(n => n.category))];
    let voterName = '';
    let votes = {};
    let config = {};
    let winners = {};
    let leaderboard = [];

    const escapeHtml = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');


    // --- DOM ELEMENTS ---
    const nameModalOverlay = document.getElementById('name-modal-overlay');
    const nameForm = document.getElementById('name-form');
    const nameInput = document.getElementById('voter-name-input');
    const welcomeMessage = document.getElementById('welcome-message');
    const changeNameLink = document.getElementById('change-name-link');
    const categoryList = document.getElementById('category-list');
    const nomineeContainer = document.getElementById('nominee-container');
    const resultsContainer = document.getElementById('results-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
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

    const loadWinners = async () => {
        try {
            const res = await fetch('/api/winners');
            const data = await res.json();
            winners = data.winners || {};
        } catch (e) {
            console.error('Failed to load winners:', e);
            winners = {};
        }
    };

    const loadLeaderboard = async () => {
        try {
            const res = await fetch('/api/leaderboard');
            const data = await res.json();
            leaderboard = data.leaderboard || [];
        } catch (e) {
            console.error('Failed to load leaderboard:', e);
            leaderboard = [];
        }
    };

    const loadConfig = async () => {
        try {
            const res = await fetch('/api/config');
            config = await res.json();
        } catch (e) {
            console.error('Failed to load config:', e);
            // Fallback to Phase 1
            config = { 
                CEREMONY_START: Date.now() + 86400000, 
                CEREMONY_END: Date.now() + 172800000 
            };
        }
    };

    const checkPhase = () => {
        const now = Date.now();
        const start = new Date(config.CEREMONY_START).getTime();
        const end = new Date(config.CEREMONY_END).getTime();

        if (now < start) return 1; // Open
        if (now < end) return 2;   // Locked
        return 3;                  // Results
    };


    const saveVote = async (voter, nomineeId, category) => {
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voter, nomineeId, category })
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(payload.message || 'Failed to save vote');
            }

            return payload;
        } catch (e) {
            console.error('Failed to save vote:', e);
            throw e;
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
                
                // Look up poster: use subtitle (movie name) for person nominees, title for movie nominees
                const movieTitle = nominee.subtitle || nominee.title;
                const posterUrl = posters[movieTitle];
                const posterHtml = posterUrl
                    ? `<img class="nominee-poster" src="${posterUrl}" alt="${movieTitle}" loading="lazy">`
                    : `<div class="nominee-poster-placeholder"></div>`;

                card.innerHTML = `
                    ${posterHtml}
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
        const phase = checkPhase();
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

            const winnerId = winners[category];

            categoryNominees.forEach(nominee => {
                const voteInfo = voteCounts[nominee.id] || { count: 0, voters: [] };
                const isWinner = nominee.id === winnerId;
                const userVotedForThis = votes[`${voterName}-${category}`]?.nomineeId === nominee.id;
                
                let feedbackHtml = '';
                if (phase === 3 && winnerId) {
                    if (userVotedForThis) {
                        const isCorrect = nominee.id === winnerId;
                        feedbackHtml = `<span class="guess-indicator ${isCorrect ? 'guess-correct' : 'guess-incorrect'}"></span>`;
                    }
                }

                const li = document.createElement('li');
                if (isWinner) li.classList.add('winner-gold');

                const voterListText = voteInfo.voters.length > 0
                    ? escapeHtml(voteInfo.voters.join(', '))
                    : 'No votes yet';

                li.innerHTML = `
                    <div class="result-nominee-info">
                        <span class="result-nominee-title">
                            ${escapeHtml(nominee.title)}
                            ${isWinner ? '<span class="winner-badge">WINNER</span>' : ''}
                            ${feedbackHtml}
                        </span>
                        <span class="result-voters">${voterListText}</span>
                    </div>
                    <span class="result-vote-count">${voteInfo.count}</span>
                `;
                list.appendChild(li);
            });
            resultSection.appendChild(list);
            resultsContainer.appendChild(resultSection);
        });
    };

    const renderLeaderboard = () => {
        if (checkPhase() < 3) {
            leaderboardContainer.style.display = 'none';
            return;
        }
        leaderboardContainer.style.display = 'block';
        
        let html = `
            <h3>Leaderboard</h3>
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th class="leaderboard-rank">Rank</th>
                        <th>Voter</th>
                        <th class="leaderboard-score">Score</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        leaderboard.forEach((entry, index) => {
            const isMe = entry.name === voterName;
            html += `
                <tr class="${isMe ? 'leaderboard-me' : ''}">
                    <td class="leaderboard-rank">${index + 1}</td>
                    <td>${escapeHtml(entry.name)}</td>
                    <td class="leaderboard-score">${entry.score}</td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        leaderboardContainer.innerHTML = html;
    };

    // --- EVENT HANDLING ---
    nomineeContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('vote-button')) {
            if (checkPhase() >= 2) return; // Prevent voting if locked
            
            if (!voterName) {

                nameModalOverlay.classList.add('visible');
                nameInput.focus();
                return;
            }
            const { id, category } = e.target.dataset;

            try {
                await saveVote(voterName, id, category);
                await loadVotes();
                await updateUI();
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to save vote';
                alert(message);
            }
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
    const updateUI = async () => {
        const phase = checkPhase();
        const banner = document.getElementById('lockout-banner');
        
        if (phase === 3) {
            await loadWinners();
            await loadLeaderboard();
        }

        if (phase >= 2) {
            banner.textContent = phase === 2 
                ? 'Guesses Locked! Enjoy the show.' 
                : 'Voting has CLOSED. Check the final results below!';
            banner.classList.remove('hidden');
            
            // Disable all vote buttons
            document.querySelectorAll('.vote-button').forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            });
            
            // Show results section
            document.getElementById('results-section').style.display = 'block';
        } else {
            banner.classList.add('hidden');
            document.getElementById('results-section').style.display = 'none';
        }

        updateVoteButtons();
        renderResults();
        renderLeaderboard();
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
        await loadConfig();
        await loadVotes();
        handleVoterName();
        renderCategories();
        renderNominees();
        await updateUI();
    }


    init();
});

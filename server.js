
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const VOTES_FILE = path.join(DATA_DIR, 'votes.json');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Ensure data directory and votes.json exist
function initializeData() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR);
    }
    if (!fs.existsSync(VOTES_FILE)) {
        fs.writeFileSync(VOTES_FILE, JSON.stringify({}));
    }
}

function getVotes() {
    try {
        const data = fs.readFileSync(VOTES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading votes.json:', error);
        return {};
    }
}

function saveVotes(votes) {
    const tempFilePath = VOTES_FILE + '.tmp';
    fs.writeFileSync(tempFilePath, JSON.stringify(votes, null, 2), 'utf8');
    fs.renameSync(tempFilePath, VOTES_FILE);
}

const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url.startsWith('/api/')) {
        // API Endpoints
        if (req.url === '/api/votes' && req.method === 'GET') {
            const votes = getVotes();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(Object.values(votes)));
        } else if (req.url === '/api/vote' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const { voter, nomineeId, category } = JSON.parse(body);
                    if (!voter || !nomineeId || !category) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Missing required fields: voter, nomineeId, category' }));
                        return;
                    }

                    const votes = getVotes();
                    const voteKey = `${voter}-${category}`;
                    const timestamp = new Date().toISOString();

                    votes[voteKey] = { voter, nomineeId, category, timestamp };
                    saveVotes(votes);

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Vote recorded successfully', vote: votes[voteKey] }));
                } catch (error) {
                    console.error('Error processing vote:', error);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid JSON or vote data' }));
                }
            });
        } else if (req.url === '/api/voters' && req.method === 'GET') {
            const votes = getVotes();
            const voterStats = {};

            Object.values(votes).forEach(vote => {
                if (!voterStats[vote.voter]) {
                    voterStats[vote.voter] = { name: vote.voter, voteCount: 0, categories: [] };
                }
                voterStats[vote.voter].voteCount++;
                voterStats[vote.voter].categories.push(vote.category);
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ voters: Object.values(voterStats) }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'API Endpoint Not Found' }));
        }
    } else {
        // Serve Static Files
        const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end(`File not found: ${filePath}`);
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    initializeData();
    console.log(`Server running on port ${PORT}`);
});

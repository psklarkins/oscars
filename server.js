
const http = require('http');
const fs = require('fs');
const path = require('path');
const CONFIG = require('./config');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const VOTES_FILE = path.join(DATA_DIR, 'votes.json');
const WINNERS_FILE = path.join(DATA_DIR, 'winners.json');


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

function resolveSafeStaticPath(requestUrl) {
    let pathname = '/';

    try {
        const parsedUrl = new URL(requestUrl, 'http://localhost');
        pathname = decodeURIComponent(parsedUrl.pathname || '/');
    } catch {
        return null;
    }

    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const normalizedPath = path.normalize(relativePath);
    const absolutePath = path.resolve(__dirname, normalizedPath);
    const rootPath = path.resolve(__dirname);

    if (absolutePath !== rootPath && !absolutePath.startsWith(rootPath + path.sep)) {
        return null;
    }

    return absolutePath;
}

// Ensure data directory and data files exist
function initializeData() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR);
    }
    if (!fs.existsSync(VOTES_FILE)) {
        fs.writeFileSync(VOTES_FILE, JSON.stringify({}));
    }
    if (!fs.existsSync(WINNERS_FILE)) {
        fs.writeFileSync(WINNERS_FILE, JSON.stringify({}));
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

function getWinners() {
    try {
        if (!fs.existsSync(WINNERS_FILE)) return {};
        const data = fs.readFileSync(WINNERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading winners.json:', error);
        return {};
    }
}

function calculateLeaderboard() {
    const votes = getVotes();
    const winners = getWinners();
    const scores = {};
    const total = Object.keys(winners).length;

    Object.values(votes).forEach(vote => {
        if (!scores[vote.voter]) {
            scores[vote.voter] = { name: vote.voter, score: 0, total, correct: [] };
        }
        
        // winners.json is expected to be { "category": "nomineeId" }
        if (winners[vote.category] === vote.nomineeId) {
            scores[vote.voter].score++;
            scores[vote.voter].correct.push(vote.category);
        }
    });

    return Object.values(scores).sort((a, b) => b.score - a.score);
}


function saveVotes(votes) {
    const tempFilePath = VOTES_FILE + '.tmp';
    fs.writeFileSync(tempFilePath, JSON.stringify(votes, null, 2), 'utf8');
    fs.renameSync(tempFilePath, VOTES_FILE);
}

const server = http.createServer((req, res) => {
    const now = Date.now();
    const ceremonyStart = new Date(CONFIG.CEREMONY_START).getTime();
    const ceremonyEnd = new Date(CONFIG.CEREMONY_END).getTime();
    
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
            res.end(JSON.stringify({ votes }));
        } else if (req.url === '/api/vote' && req.method === 'POST') {
            if (now > ceremonyStart) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Voting is closed. The ceremony has started!' }));
                return;
            }
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
        } else if (req.url === '/api/config' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                CEREMONY_START: CONFIG.CEREMONY_START,
                CEREMONY_END: CONFIG.CEREMONY_END
            }));
        } else if (req.url === '/api/winners' && req.method === 'GET') {
            if (now < ceremonyEnd) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Results hidden until ceremony ends' }));
                return;
            }
            const winners = getWinners();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ winners }));
        } else if (req.url === '/api/leaderboard' && req.method === 'GET') {
            if (now < ceremonyEnd) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Results hidden until ceremony ends' }));
                return;
            }
            const leaderboard = calculateLeaderboard();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ leaderboard }));
        } else {

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'API Endpoint Not Found' }));
        }
    } else {
        // Serve Static Files
        const filePath = resolveSafeStaticPath(req.url);
        if (!filePath) {
            res.writeHead(400);
            res.end('Bad request path');
            return;
        }

        const relativePath = path.relative(__dirname, filePath);
        const isDataFile = relativePath === 'data' || relativePath.startsWith(`data${path.sep}`);
        const isSensitiveFile = ['server.js', 'config.js'].includes(relativePath);
        if (isDataFile || isSensitiveFile) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

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

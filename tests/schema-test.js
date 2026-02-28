const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const VOTES_FILE = path.join(DATA_DIR, 'votes.json');
const WINNERS_FILE = path.join(DATA_DIR, 'winners.json');

function validateVotes() {
    console.log('Validating votes.json...');
    if (!fs.existsSync(VOTES_FILE)) {
        throw new Error('votes.json does not exist');
    }
    const data = JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8'));
    for (const [key, vote] of Object.entries(data)) {
        const [voter, category] = key.split('-');
        if (!vote.voter || !vote.nomineeId || !vote.category || !vote.timestamp) {
            throw new Error(`Invalid vote structure for key ${key}: ${JSON.stringify(vote)}`);
        }
        if (vote.voter !== voter || vote.category !== category) {
            throw new Error(`Key ${key} does not match vote content: ${vote.voter} / ${vote.category}`);
        }
    }
    console.log('votes.json is valid');
}

function validateWinners() {
    console.log('Validating winners.json...');
    if (!fs.existsSync(WINNERS_FILE)) {
        throw new Error('winners.json does not exist');
    }
    const data = JSON.parse(fs.readFileSync(WINNERS_FILE, 'utf8'));
    for (const [category, nomineeId] of Object.entries(data)) {
        if (typeof nomineeId !== 'string') {
            throw new Error(`Invalid winner for category ${category}: ${nomineeId}`);
        }
    }
    console.log('winners.json is valid');
}

function validateConfig() {
    console.log('Validating config.js...');
    if (!fs.existsSync(path.join(__dirname, '..', 'config.js'))) {
        throw new Error('config.js does not exist');
    }
    const config = require('../config.js');
    if (!config.CEREMONY_START || isNaN(Date.parse(config.CEREMONY_START))) {
        throw new Error('Invalid or missing CEREMONY_START');
    }
    if (!config.CEREMONY_END || isNaN(Date.parse(config.CEREMONY_END))) {
        throw new Error('Invalid or missing CEREMONY_END');
    }
    console.log('config.js is valid');
}

try {
    validateVotes();
    validateWinners();
    validateConfig();
    process.exit(0);
} catch (error) {
    console.error('Validation failed:', error.message);
    process.exit(1);
}

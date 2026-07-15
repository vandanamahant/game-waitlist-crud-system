const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let waitlist = [];

// Helper function for basic XSS sanitation
const sanitizeInput = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// 1. POST - Add to Waitlist
app.post('/waitlist', (req, res) => {
    let { name, game } = req.body;

    if (!name || !game || name.trim() === "" || game.trim() === "") {
        return res.status(400).json({ 
            success: false, 
            message: "Validation Error: Name and Game fields are required." 
        });
    }

    name = sanitizeInput(name.trim());
    game = sanitizeInput(game.trim());

    const newEntry = {
        id: (waitlist.length + 1).toString(),
        name,
        game,
        createdAt: new Date().toISOString()
    };

    waitlist.push(newEntry);

    console.log(`[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters - Added ID: ${newEntry.id}`);

    return res.status(201).json({
        success: true,
        message: "Player added to waitlist successfully.",
        data: newEntry
    });
});

// 2. GET - Fetch All Entries (Handles Empty State)
app.get('/waitlist', (req, res) => {
    if (waitlist.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No data found",
            data: []
        });
    }

    return res.status(200).json({
        success: true,
        data: waitlist
    });
});

// 3. PUT - Update Entry using Route Parameter
app.put('/waitlist/:id', (req, res) => {
    const { id } = req.params;
    let { name, game } = req.body;

    const entryIndex = waitlist.findIndex(item => item.id === id);

    if (entryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Player with ID ${id} not found.`
        });
    }

    if (!name || !game || name.trim() === "" || game.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Validation Error: Name and Game fields cannot be empty."
        });
    }

    waitlist[entryIndex].name = sanitizeInput(name.trim());
    waitlist[entryIndex].game = sanitizeInput(game.trim());

    console.log(`[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters - Updated ID: ${id}`);

    return res.status(200).json({
        success: true,
        message: "Waitlist entry updated successfully.",
        data: waitlist[entryIndex]
    });
});

// 4. DELETE - Remove Entry using Route Parameter
app.delete('/waitlist/:id', (req, res) => {
    const { id } = req.params;
    const entryIndex = waitlist.findIndex(item => item.id === id);

    if (entryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Player with ID ${id} not found.`
        });
    }

    const deletedEntry = waitlist.splice(entryIndex, 1);

    console.log(`[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters - Deleted ID: ${id}`);

    return res.status(200).json({
        success: true,
        message: "Player removed from waitlist successfully.",
        data: deletedEntry[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
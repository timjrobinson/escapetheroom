var sample = {
    size: {
        x: 40,
        y: 40
    },
    items: [
        {
            name: "Door",
            description: "This is the door to escape. It appears to be protected by an ancient code.",
            type: "door",
            position: {
                x: 1,
                y: 1
            },
            code: "ABC"
        },
        {
            name: "Cactus",
            description: "The cactus says the door code is ABC, but what does it know, it's a cactus...",
            position: {
                x: 2,
                y: 3
            }
        }
    ]
};

if (typeof module !== "undefined") {
    module.exports = sample;
} else {
    window.rooms = window.rooms || [];
    window.rooms.push(sample);
}
import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Error handler
app.use((err, req, res, next) => {
    console.error(" Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/`));
const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth.routes")
const taskRoute = require("./routes/tasks.routes")
const cors = require('cors')
// Инициализация приложения
const app = express()
const PORT = config.get("port") || 5000


// Middleware
app.use(cors())
app.use(express.json({ extended: true }))

// Маршруты
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoute)


async function start() {
    try {
        // Подключение к MongoDB
        await mongoose.connect(config.get("mongoUri"))
        app.listen(PORT, () => console.log(`Сервер был запущен на порту ${PORT}`))
    } catch (e) {
        console.log("Ошибка Сервера", e.message)
        process.exit(1)
    }
}

start()

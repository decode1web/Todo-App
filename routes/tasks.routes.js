const { Router } = require("express")
const { validationResult } = require("express-validator")
const Task = require("../models/Task")
const auth = require('../middleware/auth.middleware')
const router = Router()

// POST  /api/tasks
// Создание новой задачи
// Access Private
// router.post("/", auth, async (req, res) => {
//     try {
//         // const errors = validationResult(req)
//         // if(!errors.isEmpty){
//         //     return res.status(400).json({
//         //         errors: errors.array(),
//         //         message: "Некорректные данные при создании задачи"
//         //     })
//         // }

//         const { title, description } = req.body

//         const newTask = new Task({
//             userId: req.user.userId,
//             title,
//             description
//         })

//         await newTask.save()
//         res.status(201).json({message: "Задача создано"})
//     } catch (e) {
//         console.log('Error creating task: ', e)
//         res.status(500).json({message: "Ошибка при создании задачи"})
//     }
// })

// GET  /api/tasks
// Получение всех задач пользователя
// Access Private
router.get("/user/:userId", auth, async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.params.userId})
        res.status(200).json(tasks)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/task/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findOne({_id: id})

        if(!task) {
            return res.status(404).json({message: 'Задача не найдена'})
        }

        res.status(200).json(task)
    } catch (e) {
        console.error('Ошибка при получении задачи:', e)
        res.status(500).json({message: 'Ошибка сервера'})
    }
})


router.post('/add', auth, async (req, res) => {
    try {
        const { title, userId, status} = req.body
        console.log('Body: ', req.body)

        if(!title) {
            return res.status(400).json({message: 'Название задачи обязательно'})
        }

        const task = new Task({
            userId,
            title,
            description: '',
            status
        })

        await task.save()
        res.status(201).json(task)
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Ошибка сервера.'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete({_id: id})

        if(!task) {
            return res.status(404).json({message: 'Задача не найдена'})
        }

        res.status(200).json({message: 'Задача успешно удалена'})
    } catch (e) {
        console.error('Ошибка при удалении задачи:', e)
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

// ✅ Обновление описания задачи
router.put('/task/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {description},
            {new: true} // Возвращает обнавленный объект
        )

        if(!updatedTask) {
            return res.status(404).json({message: 'Задача не найдена'})
        }

        res.json(updatedTask) // Отправляем обновленные данные на клиент
    } catch (e) {
        console.error('Ошибка обновления задачи:', error)
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

// ✅ Обновление статуса задачи
router.put('/status/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if(!['open', 'progress', 'done'].includes(status)) {
            return res.status(400).json({message: 'Неверный статус задачи'})
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {status},
            {new: true} // Вернёт обновлённый объект
        )

        if (!updatedTask){
            return res.status(404).json({message: 'Задача не найдена'})
        }

        res.json(updatedTask)
    } catch (e) {
        console.error('Ошибка при обновлении задачи: ', e)
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const task = await Task.findById(id)

        if(!task) {
            return res.status(404).json({message: 'Задача не найдена'})
        }

        task.description = description
        await task.save()

        res.json(task)
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

module.exports = router
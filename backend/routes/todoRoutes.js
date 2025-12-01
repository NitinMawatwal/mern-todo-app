import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Todo from "../models/todo.js";

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        const todo = await Todo.create({
            userId: req.user,
            title,
            description
        });

        return res.json({
            success: true,
            message: "Todo added successfully",
            todo
        });

    } catch (e) {
        return res.json({ success: false, message: e.message });
    }
});

router.get("/all", authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user });

        return res.json({
            success: true,
            todos
        });

    } catch (e) {
        return res.json({ success: false, message: e.message });
    }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.json({ success: false, message: "Todo not found" });
        }

        if (todo.userId.toString() !== req.user) {
            return res.json({ success: false, message: "Not allowed" });
        }

        await Todo.findByIdAndDelete(todoId);

        return res.json({
            success: true,
            message: "Todo deleted successfully"
        });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});

router.put("/toggle/:id", authMiddleware, async (req, res) => {
  try {

    const todoId = req.params.id;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.json({ success: false, message: "Todo not found" });
    }

    if (todo.userId.toString() !== req.user) {
      return res.json({ success: false, message: "Not allowed" });
    }

    todo.completed = !todo.completed;

    await todo.save();

    return res.json({
      success: true,
      message: "Todo status updated",
      todo
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.put("/edit/:id", authMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;

        const { title, description } = req.body;

        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.json({ success: false, message: "Todo not found" });
        }

        if (todo.userId.toString() !== req.user) {
            return res.json({ success: false, message: "Not allowed" });
        }

        todo.title = title;
        todo.description = description;

        await todo.save();

        return res.json({
            success: true,
            message: "todo updated successfully",
            todo
        });
    } catch (e) {
        return res.json({ success: false, message: e.message });
    }
});

export default router;

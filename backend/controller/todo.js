import Todo from '../model/todos.js'


export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.json({ message: error });
    }
    }

        export const createTodo = async (req, res) => {
          const post = req.body;
          const newPost = new Todo(post);
          try {
            await newPost.save();
            res.status(201).json(newPost);
          } catch (error) {
            res.status(409).json({ message: error.message });
          }
        };

        export const deleteTodo = async (req, res) => {
          try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) {
              return res.status(404).json({ message: "Todo not found" });
            }
            await Todo.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Todo deleted" });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
        };

        export const updateTodo = async (req, res) => {
          try {
            const todo = await Todo.findById(req.params.id);
            if (!todo) {
              return res.status(404).json({ message: "Todo not found" });
            }
            const updatedTodo = await Todo.updateOne(
              { _id: req.params.id },
              { $set: { title: req.body.title, content: req.body.content } }
            );
            res.status(200).json(updatedTodo);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
        };

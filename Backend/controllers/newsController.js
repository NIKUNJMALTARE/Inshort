const CustomNews = require("../models/CustomNews");
const fs = require("fs");
const path = require("path");

// 🆕 Add News with Image Upload
exports.addNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Store file path

    if (!photo) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const news = new CustomNews({ title, description, photo, category });
    await news.save();

    res.status(201).json({ message: "News added successfully", news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📜 Get All News (Category-wise)
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await CustomNews.find(category ? { category } : {});
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📝 Update News with Image Upload (if provided)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedFields = req.body;

    if (req.file) {
      updatedFields.photo = `/uploads/${req.file.filename}`;
    }

    const updatedNews = await CustomNews.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedNews) return res.status(404).json({ message: "News not found" });

    res.status(200).json({ message: "News updated", updatedNews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Delete News (Deletes Image too)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await CustomNews.findById(id);

    if (!news) return res.status(404).json({ message: "News not found" });

    // Delete image file from server
    const imagePath = path.join(__dirname, "..", news.photo);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await news.deleteOne();
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

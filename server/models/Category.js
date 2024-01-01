import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
    // not required so we can have categories that apply for all users
  },
  // You can add more fields as needed for customization, such as color, icon, etc.
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, max: 128 },
    description: { type: String, required: true, max: 256 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    published_at: { type: Date, required: false },
    _parentCategory: { type: Schema.Types.ObjectId, ref: 'CategoryModel', required: false}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

CategorySchema.virtual('id').get(() => this._id );
CategorySchema.virtual('blogs', {
  ref: 'BlogModel',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});
CategorySchema.virtual('posts', {
  ref: 'PostModel',
  localField: '_id',
  foreignField: '_category',
  justOne: false
});
CategorySchema.virtual('subCategories', {
  ref: 'CategoryModel',
  localField: '_id',
  foreignField: '_parentCategory',
  justOne: false
});

export default mongoose.model('CategoryModel', CategorySchema);
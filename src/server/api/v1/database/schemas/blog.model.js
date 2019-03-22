import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, max: 128 },
    synopsis: { type: String, required: true, max: 256 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, required: false },
    published_at: { type: Date, required: false },
    _category: { type: Schema.Types.ObjectId, ref: 'CategoryModel', required: false},
    posts: [{ type: Schema.Types.ObjectId, ref: 'PostModel', required: false }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

BlogSchema.virtual('id').get(() => this._id );

export default mongoose.model('BlogModel', BlogSchema);
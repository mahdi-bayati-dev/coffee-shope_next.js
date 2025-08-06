// services/productServer
import ProductModel from "@/model/Product";
import {
  sanitizeProduct,
  sanitizeComments,
  sanitizeProductsList,
} from "@/utils/sanitize";
import CommentsModel from "@/model/Comments";

export async function getProductWithComments(id) {
  const product = await ProductModel.findOne({ _id: id })
    .populate({ path: "comments", populate: { path: "user", select: "name" } })
    .lean();

  if (!product) return null;

  product._id = product._id.toString();
  product.comments = sanitizeComments(product.comments);

  return sanitizeProduct(product);
}

export async function getRelatedProducts(product) {
  const sanitizedProduct = sanitizeProduct(product); 

  const products = await ProductModel.find({
    smell: sanitizedProduct.smell,
    _id: { $ne: sanitizedProduct._id }, // حالا string هست
  }).lean();

  return sanitizeProductsList(products);
}

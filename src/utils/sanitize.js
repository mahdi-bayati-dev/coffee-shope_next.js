export function sanitizeProduct(product) {
  return {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString() || null,
    updatedAt: product.updatedAt?.toISOString() || null,
    comments: product.comments ? sanitizeComments(product.comments) : [],
  };
}

export function sanitizeComments(comments) {
  return comments.map((comment) => ({
    ...comment,
    _id: comment._id.toString(),
    productId: comment.productId?.toString(),
    date: comment.date ? new Date(comment.date).toISOString() : null,

    user: comment.user
      ? {
          _id: comment.user._id.toString(),
          name: comment.user.name,
        }
      : null,
  }));
}

export function sanitizeProductsList(products) {
  return products.map((item) => ({
    ...item,
    _id: item._id.toString(),
    comments: item.comments?.map((c) => c.toString()) || [], // 👈 اضافه شد
    createdAt: item.createdAt?.toISOString() || null,
    updatedAt: item.updatedAt?.toISOString() || null,
  }));
}

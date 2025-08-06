import WishlistModel from "@/model/Wishlist";

export async function getUserWishlist(userId) {
  try {
    const wishes = await WishlistModel.find({ user: userId })
      .populate("product", "name price score img")
      .sort({ _id: -1 })
      .lean();

    return wishes;
  } catch (err) {
    console.error("Error fetching wishlist", err);
    return [];
  }
}

import connectToDB from "@/configs/db";
import ProductModel from "@/model/Product";
import WishlistModel from "@/model/Wishlist";
import { authUser } from "@/app/lib/authUser";
import { sanitizeProductsList } from "@/utils/sanitize"; // مسیر دقیق تو پروژه‌ت ممکنه فرق کنه

export async function getHomePageData() {
  await connectToDB();

  const user = await authUser();

  const latestProductsRaw = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(8)
    .lean();

  const latestProducts = sanitizeProductsList(latestProductsRaw);

  let wishes = [];
  if (user) {
    wishes = await WishlistModel.find({ user: user.id })
      .populate("product", "name price score img")
      .sort({ _id: -1 })
      .lean();
  }

  return {
    user,
    latestProducts,
    wishlist: wishes,
  };
}

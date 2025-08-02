import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "@/configs/db";
import { authUser } from "@/app/lib/authUser";
import WishlistModel from "@/model/Wishlist";
import { redirect } from "next/navigation";
import ProductModel from "@/model/Product";

export default async function Page() {
  await connectToDB();

  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }

  const wishesRaw = await WishlistModel.find({ user: user.id })
    .populate("product")
    .lean();

  const wishes = JSON.parse(JSON.stringify(wishesRaw));

  return (
    <UserPanelLayout>
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>

        <div className={styles.container}>
          {wishes.length > 0 ? (
            wishes.map((wish) => (
              <Product
                key={wish._id}
                productId={String(wish.product._id)}
                score={wish.product.score}
                price={wish.product.price}
                name={wish.product.name}
              />
            ))
          ) : (
            <p className={styles.empty}>محصولی وجود ندارد</p>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
}

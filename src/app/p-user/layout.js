import styles from "@/styles/p-user/userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import TopBar from "@/components/modules/p-user/TopBar";
import { authUser } from "@/app/lib/authUser";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <TopBar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
import NavbarCustom from "../components/ui/Navbar-custom";
import BlogBar from "../components/ui/BlogBar";
import BlogpostCard from "../components/ui/BlogpostCard";
import MiniFooter from "../components/ui/miniFooter";

function ViewAllBlog() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col gap-16 py-10 max-w-[1184px] mx-auto items-center">
        <h1>บทความ</h1>
        <BlogBar />

        <div className="flex flex-col gap-4">
          <h3>บทความล่าสุด</h3>
          <div className="flex gap-4 flex-wrap">
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3>บทความจากร้านค้า</h3>
          <div className="flex gap-4 flex-wrap">
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3>บทความจากลูกค้า</h3>
          <div className="flex gap-4 flex-wrap">
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
            <BlogpostCard />
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default ViewAllBlog;

import Link from "next/link";

export default function Nav() {
  return (
    <div style={{ border: "2px solid #eee", padding: "2rem" }}>
      <Link href="/"><a>Home</a></Link>
      <div style={{ display: "inline", marginLeft: "2rem" }}>
        <Link href="/csr" ><a>CSR</a></Link>
      </div>
      <div style={{ display: "inline", marginLeft: "2rem" }}>
        <Link href="/ssr" ><a>SSR</a></Link>
      </div>
      <div style={{ display: "inline", marginLeft: "2rem" }}>
        <Link href="/ssg" ><a>SSG</a></Link>
      </div>
      <div style={{ display: "inline", marginLeft: "2rem" }}>
        <Link href="/blog" ><a>Blog</a></Link>
      </div>
    </div>
  );
}

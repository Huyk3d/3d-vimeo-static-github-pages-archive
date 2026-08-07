export function Footer() {
  return (
    <footer className="border-t border-archive-border px-6 py-5 text-xs text-archive-muted md:px-10">
      © {new Date().getFullYear()} Archive
    </footer>
  );
}

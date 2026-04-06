import { Home, FileText, MessageSquare, HelpCircle } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: FileText, label: "Trámites", href: "/#tramites" },
  { icon: MessageSquare, label: "Chat IA", href: "/chat" },
  { icon: HelpCircle, label: "Ayuda", href: "/#como-funciona" },
];

const BottomNav = () => {
  const location = useLocation();

  // Don't show on chat page (it has its own layout)
  if (location.pathname === "/chat") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden" role="navigation" aria-label="Navegación principal móvil">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = location.pathname === href || (href.startsWith("/#") && location.pathname === "/");
          return (
            <Link
              key={label}
              to={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              aria-label={label}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

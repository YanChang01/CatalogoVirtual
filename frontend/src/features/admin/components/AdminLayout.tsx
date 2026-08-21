import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  Shapes,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/useAuth";
import { routes } from "@/config/routes";

const NAV_ITEMS = [
  {
    title: "Productos",
    to: routes.admin.products.path,
    icon: Package,
  },
  {
    title: "Categorías",
    to: routes.admin.categories.path,
    icon: Shapes,
  },
  {
    title: "Usuarios",
    to: routes.admin.users.path,
    icon: Users,
  },
];

function useCurrentSection() {
  const { pathname } = useLocation();
  const match = NAV_ITEMS.find((item) => pathname.startsWith(item.to));
  return match?.title ?? null;
}

export function AdminLayout() {
  const section = useCurrentSection();
  const { logout } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add("admin");
    return () => document.documentElement.classList.remove("admin");
  }, []);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link
            to={routes.admin.dashboard.path}
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold"
          >
            <LayoutDashboard className="size-4" />
            Panel de administración
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Gestión</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={section === item.title}
                      tooltip={item.title}
                      render={<Link to={item.to} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Ver tienda"
                render={<a href={routes.home.path} target="_blank" rel="noreferrer" />}
              >
                <ExternalLink />
                <span>Ver tienda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Cerrar sesión" onClick={logout}>
                <LogOut />
                <span>Cerrar sesión</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <nav aria-label="Ruta" className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">Administración</span>
            {section && (
              <>
                <span className="text-muted-foreground/50">/</span>
                <span className="font-medium text-foreground">{section}</span>
              </>
            )}
          </nav>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Package, Shapes, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
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

export function AdminLayout() {
  const { pathname } = useLocation();

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
                      isActive={pathname.startsWith(item.to)}
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
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Administración</span>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

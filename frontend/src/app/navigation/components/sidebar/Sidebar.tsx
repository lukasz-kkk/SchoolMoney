import classes from "./Sidebar.module.scss";
import { AppRoute } from "@/app/router";
import { useLocation } from "react-router-dom";
import { NavigationSection } from "@/app/navigation/components/sidebar/components/NavigationSection/NavigationSection";
import { NavigationItem } from "@/app/navigation/components/sidebar/components/NavigationItem/NavigationItem";
import { Logo } from "@/app/navigation/components/sidebar/components/Logo/Logo";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";
import classNames from "classnames";
import { useState } from "react";
import { Box, Button, IconButton, Separator } from "@radix-ui/themes";
import { ChevronLeft, LogOut } from "lucide-react";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";
import { CurrentUserInfo } from "@/features/users/components/CurrentUserInfo/CurrentUserInfo";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { toast } from "sonner";

const items = [
    { title: "Przedszkole", requiredAccess: "authenticated", items: [{ label: "Aktualności", href: AppRoute.NEWS }] },
    { title: "Kontakt", requiredAccess: "authenticated", items: [{ label: "Wiadomości", href: AppRoute.MESSAGES }] },
    {
        title: "Użytkownicy",
        requiredAccess: "Admin",
        items: [
            { label: "Rodzice", href: AppRoute.PARENTS },
            { label: "Opiekunowie", href: AppRoute.CAREGIVERS },
        ],
    },
    { title: "Panel nauczyciela", requiredAccess: "Admin", items: [{ label: "Moja grupa", href: AppRoute.GROUP }] },
    { title: "Panel rodzica", requiredAccess: "User", items: [{ label: "Moje dzieci", href: AppRoute.CHILDREN }] },
    { title: "Personalne", requiredAccess: "authenticated", items: [{ label: "Ustawienia", href: AppRoute.SETTINGS }] },
];

export function Sidebar() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isCollapsed, setIsCollapsed] = useState(!isDesktop);
    const { mutateAsync: logout, isPending } = useLogout();

    const { pathname } = useLocation();

    const toggleCollapseState = () => {
        setIsCollapsed((prev) => !prev);
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Wylogowano.");
        } catch (e) {
            toast.error("Nie udało się wylogować.");
        }
    };

    return (
        <Box className={classNames(classes.container, { [classes.collapsed]: isCollapsed })}>
            {!isDesktop && (
                <Box className={classes.collapseButtonWrapper}>
                    <IconButton radius="full" onClick={toggleCollapseState}>
                        <ChevronLeft />
                    </IconButton>
                </Box>
            )}

            <Box className={classes.header}>
                <Logo />
            </Box>

            <Box className={classes.navigation}>
                {items.map((section) => (
                    <AccessGuard key={section.title} requiredAccess={section.requiredAccess}>
                        <NavigationSection title={section.title}>
                            {section.items.map((item) => (
                                <NavigationItem
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    isActive={item.href === pathname}
                                />
                            ))}
                        </NavigationSection>
                    </AccessGuard>
                ))}
            </Box>

            <AccessGuard requiredAccess="authenticated">
                <Box className={classes.footer}>
                    <CurrentUserInfo />

                    <Separator />
                    <Button
                        className={classes.logoutButton}
                        variant="outline"
                        color="crimson"
                        onClick={handleLogout}
                        loading={isPending}
                    >
                        Wyloguj
                        <LogOut size={16} />
                    </Button>
                </Box>
            </AccessGuard>
        </Box>
    );
}

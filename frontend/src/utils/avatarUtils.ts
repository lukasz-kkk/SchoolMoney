import { AvatarProps } from "@radix-ui/themes";

const avatarColors: AvatarProps["color"][] = [
    "gray",
    "gold",
    "bronze",
    "brown",
    "yellow",
    "amber",
    "orange",
    "tomato",
    "red",
    "ruby",
    "crimson",
    "pink",
    "plum",
    "purple",
    "violet",
    "iris",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "jade",
    "green",
    "grass",
    "lime",
    "mint",
    "sky",
];

export const getInitials = (name: string | undefined | null, maxLength: number = 3): string => {
    if (!name) {
        return "";
    }

    const words = name.split(" ").filter((word) => word.length > 0);
    const initials = words.map((word) => word[0]).join("");

    return initials.slice(0, maxLength).toUpperCase();
};

export const stringToColor = (str: string | undefined | null): AvatarProps["color"] => {
    if (!str) return avatarColors[0];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }

    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
};

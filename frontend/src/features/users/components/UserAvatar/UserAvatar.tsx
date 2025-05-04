import { getInitials, stringToColor } from "@/utils/avatarUtils.ts";
import { Avatar } from "@radix-ui/themes";
import { User } from "@/types/User";

type UserAvatarProps = {
    user: User;
    size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
};

export const UserAvatar = ({ user, size = "3" }: UserAvatarProps) => {
    const color = stringToColor(user.firstName + user.lastName + user.id);
    return <Avatar color={color} size={size} fallback={getInitials(`${user.firstName} ${user.lastName}`)} />;
};

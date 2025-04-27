import { Tooltip } from "@radix-ui/themes";
import { CircleX, Info } from "lucide-react";
import { ReactNode, useState } from "react";

type TooltipState = "info" | "error";

type RequirementsTooltipProps = {
    error?: string;
    content: ReactNode;
    forceOpen?: boolean;
};

export const RequirementsTooltip = ({ error, content, forceOpen }: RequirementsTooltipProps) => {
    const [open, setOpen] = useState(false);
    const state = inferStateFromProps({ error, content, forceOpen });
    const Icon = mapStateToIcon(state);

    return (
        <Tooltip content={content} open={open || forceOpen} onOpenChange={setOpen}>
            <Icon color={mapStateToColor(state)} size={14} />
        </Tooltip>
    );
};

const inferStateFromProps = (props: RequirementsTooltipProps): TooltipState => {
    if (props.error) {
        return "error";
    }

    return "info";
};

const mapStateToColor = (state: TooltipState) => {
    switch (state) {
        case "error":
            return "crimson";

        case "info":
            return "violet";
    }
};

const mapStateToIcon = (state: TooltipState) => {
    switch (state) {
        case "error":
            return CircleX;

        case "info":
            return Info;
    }
};

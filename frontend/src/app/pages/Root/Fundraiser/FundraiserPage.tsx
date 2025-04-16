import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFundraiser } from "@/features/fundraisers/hooks/useFundraiser.ts";
import { useParams } from "react-router-dom";

const BaseFundraiserPage = () => {
    const params = useParams<{ id: string }>();
    const { data: fundraiser } = useFundraiser(parseInt(params.id ?? "0"));

    return (
        <Page.Root>
            <Page.Header title={fundraiser?.name ?? "Zbiórka"} />

            <Page.Content></Page.Content>
        </Page.Root>
    );
};

export const FundraiserPage = onlyAsAuthenticated(BaseFundraiserPage);

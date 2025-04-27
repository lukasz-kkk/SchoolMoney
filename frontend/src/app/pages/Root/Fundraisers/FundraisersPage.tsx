import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { Button } from "@radix-ui/themes";
import { CreateFundraiserDialog } from "@/features/fundraisers/components/CreateFundraiserDialog/CreateFundraiserDialog.tsx";
import { FundraiserCard } from "@/features/fundraisers/components/FundraiserCard/FundraiserCard.tsx";
import { useFundraisers } from "@/features/fundraisers/hooks/useFundraisers.ts";
import { FundraisersList } from "@/features/fundraisers/components/FundraisersList/FundraisersList.tsx";

const BaseFundraisersPage = () => {
    const { data: fundraisers } = useFundraisers();

    return (
        <Page.Root>
            <Page.Header items={[{ label: "Zbiórki" }]}>
                <CreateFundraiserDialog
                    trigger={
                        <Button color="jade" variant="soft">
                            Utwórz zbiórkę
                        </Button>
                    }
                />
            </Page.Header>

            <Page.Content>
                <FundraisersList>
                    {fundraisers?.map((fundraiser) => <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />)}
                </FundraisersList>
            </Page.Content>
        </Page.Root>
    );
};

export const FundraisersPage = onlyAsAuthenticated(BaseFundraisersPage);

import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFundraiser } from "@/features/fundraisers/hooks/useFundraiser.ts";
import { useParams } from "react-router-dom";
import { Spinner } from "@radix-ui/themes";
import { ReceiptUploader } from "@/features/fundraisers/components/ReceiptUploader/ReceiptUploader.tsx";
import { ReceiptsList } from "@/features/fundraisers/components/ReceiptsList/ReceiptsList.tsx";
import { useState } from "react";

import { TransactionsHistoryTable } from "@/features/finances/components/TransactionsHistoryTable/TransactionsHistoryTable.tsx";

import { FundraiserDetailsCard } from "@/features/fundraisers/components/FundraiserDetailsCard/FundraiserDetailsCard.tsx";
import { Section } from "@/components/Section/Section.tsx";
import { FundraiserActions } from "@/features/fundraisers/components/FundraiserManagementPanel/FundraiserActions.tsx";
import { FundraiserChildrenTable } from "@/features/children/components/FundraiserChildrenTable/FundraiserChildrenTable.tsx";
import { useGetChildrenByGroup } from "@/features/children/hooks/useGetChildrenByGroup.ts";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";

const mockAccount = {
    accountNumber: "PL26 1200 0000 9665 8767 5627 4104",
    balance: 100,
};

// TODO: Remove mocks
const BaseFundraiserPage = () => {
    const params = useParams<{ id: string }>();

    const { data: fundraiser } = useFundraiser(parseInt(params.id ?? "0"));
    const { data: children } = useGetChildrenByGroup(fundraiser?.groupId);
    const acceptedChildren = (children ?? []).filter((child) => child.isAccepted);

    const [files, setFiles] = useState<File[]>([]);

    const onUploadFile = (file: File) => {
        setFiles((prev) => [...prev, file]);
    };

    const breadcrumbItems = [
        {
            label: fundraiser?.name ?? "",
        },
    ];

    if (!fundraiser) {
        return <Spinner />;
    }

    return (
        <Page.Root>
            <Page.Header items={breadcrumbItems} />

            <Page.Content>
                <Section
                    title="Informacje o zbiórce"
                    actions={<FundraiserActions fundraiser={fundraiser} fundraiserAccount={mockAccount} />}
                >
                    <FundraiserDetailsCard fundraiser={fundraiser} account={mockAccount} />
                </Section>

                <Section title="Dokumenty">
                    <AccessGuard userId={fundraiser.ownerId}>
                        <ReceiptUploader onUpload={onUploadFile} />
                    </AccessGuard>
                    <ReceiptsList files={files} />
                </Section>

                <Section title="Lista dzieci">
                    <FundraiserChildrenTable
                        childrenList={acceptedChildren}
                        fundraiserAccount={mockAccount}
                        fundraiser={fundraiser}
                    />
                </Section>

                <Section title="Historia transakcji">
                    <TransactionsHistoryTable transactions={[]} />
                </Section>
            </Page.Content>
        </Page.Root>
    );
};

export const FundraiserPage = onlyAsAuthenticated(BaseFundraiserPage);

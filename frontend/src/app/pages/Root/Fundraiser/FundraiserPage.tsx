import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFundraiser } from "@/features/fundraisers/hooks/useFundraiser.ts";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@radix-ui/themes";
import { ReceiptUploader } from "@/features/fundraisers/components/ReceiptUploader/ReceiptUploader.tsx";
import { ReceiptsList } from "@/features/fundraisers/components/ReceiptsList/ReceiptsList.tsx";
import { useState } from "react";

import { TransactionsHistoryTable } from "@/features/finances/components/TransactionsHistoryTable/TransactionsHistoryTable.tsx";
import { AppRoute } from "@/app/router";

import { FundraiserDetailsCard } from "@/features/fundraisers/components/FundraiserDetailsCard/FundraiserDetailsCard.tsx";
import { Section } from "@/components/Section/Section.tsx";

// TODO: Remove mocks
const BaseFundraiserPage = () => {
    const params = useParams<{ id: string }>();
    const { data: fundraiser } = useFundraiser(parseInt(params.id ?? "0"));
    const [files, setFiles] = useState<File[]>([]);

    const onUploadFile = (file: File) => {
        setFiles((prev) => [...prev, file]);
    };

    const breadcrumbItems = [
        {
            label: "Zbiórki",
            href: AppRoute.FUNDRAISERS,
        },
        {
            label: fundraiser?.name ?? "",
        },
    ];

    if (!fundraiser) {
        return <Spinner />;
    }

    return (
        <Page.Root>
            <Page.Header items={breadcrumbItems}>
                <Button color="jade" variant="soft">
                    Edytuj
                </Button>
            </Page.Header>

            <Page.Content>
                <Section title="Informacje o zbiórce">
                    <FundraiserDetailsCard
                        fundraiser={fundraiser}
                        account={{
                            accountNumber: "PL26 1200 0000 9665 8767 5627 4104",
                            balance: 100,
                        }}
                    />
                </Section>

                <Section title="Dokumenty">
                    <ReceiptUploader onUpload={onUploadFile} />
                    <ReceiptsList files={files} />
                </Section>

                <Section title="Historia transakcji">
                    <TransactionsHistoryTable transactions={[]} />
                </Section>
            </Page.Content>
        </Page.Root>
    );
};

export const FundraiserPage = onlyAsAuthenticated(BaseFundraiserPage);

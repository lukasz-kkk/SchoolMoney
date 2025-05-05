import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFundraiser } from "@/features/fundraisers/hooks/useFundraiser.ts";
import { useParams } from "react-router-dom";
import { Spinner } from "@radix-ui/themes";
import { ReceiptUploader } from "@/features/fundraisers/components/ReceiptUploader/ReceiptUploader.tsx";
import { ReceiptsList } from "@/features/fundraisers/components/ReceiptsList/ReceiptsList.tsx";

import { TransactionsHistoryTable } from "@/features/finances/components/TransactionsHistoryTable/TransactionsHistoryTable.tsx";

import { FundraiserDetailsCard } from "@/features/fundraisers/components/FundraiserDetailsCard/FundraiserDetailsCard.tsx";
import { Section } from "@/components/Section/Section.tsx";
import { FundraiserActions } from "@/features/fundraisers/components/FundraiserManagementPanel/FundraiserActions.tsx";
import { FundraiserChildrenTable } from "@/features/children/components/FundraiserChildrenTable/FundraiserChildrenTable.tsx";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";
import { useGetChildrenByFundraiser } from "@/features/children/hooks/useGetChildrenByFundraiser.ts";
import { Alert } from "@/components/Alert/Alert.tsx";
import { useTransactionsHistory } from "@/features/finances/hooks/useTransactionsHistory.ts";
import { useFundraiserFiles } from "@/features/fundraisers/hooks/useFundraiserFiles.ts";
import { useState } from "react";
import { UploadFileDialog } from "@/features/fundraisers/components/UploadFileDialog/UploadFileDialog.tsx";

const BaseFundraiserPage = () => {
    const params = useParams<{ id: string }>();
    const fundraiserId = parseInt(params.id ?? "0");

    const { data: fundraiser } = useFundraiser(fundraiserId);
    const { data: transactionHistory } = useTransactionsHistory({ accountNumber: fundraiser?.account?.accountNumber });
    const { data: children } = useGetChildrenByFundraiser(fundraiserId);
    const { data: filesMetadata } = useFundraiserFiles(fundraiserId);

    const acceptedChildren = (children ?? []).filter((child) => child.isAccepted);
    const payments = acceptedChildren.filter((child) => child.hasPaid).length;
    const expectedPayments = acceptedChildren.length;

    const [file, setFile] = useState<File | null>(null);

    const onUploadFile = async (file: File) => {
        if (!fundraiserId) {
            return;
        }

        setFile(file);
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
                <Section title="Informacje o zbiórce" actions={<FundraiserActions fundraiser={fundraiser} />}>
                    {fundraiser.isBlocked && (
                        <Alert>
                            Ta zbiórka jest zawieszona! Zbiórka może zostać wznowiona tylko przez administratora
                            aplikacji.
                        </Alert>
                    )}

                    {expectedPayments === payments && payments > 0 && <Alert color="jade">Zebrano całą kwotę.</Alert>}

                    {!fundraiser.hasStarted && <Alert color="amber">Ta zbiórka nie jest jeszcze aktywna.</Alert>}

                    {fundraiser.hasFinished && (
                        <Alert color="amber">
                            Ta zbiórka nie jest już aktywna. Jeśli potrzebujesz dokonać wpłaty, skontaktuj się ze
                            skarbnikiem.
                        </Alert>
                    )}

                    <FundraiserDetailsCard
                        fundraiser={fundraiser}
                        expectedPayments={expectedPayments}
                        payments={payments}
                    />
                </Section>

                <Section title="Dokumenty">
                    <AccessGuard userId={fundraiser.ownerId}>
                        <ReceiptUploader onUpload={onUploadFile} />
                    </AccessGuard>
                    <ReceiptsList filesMetadata={filesMetadata ?? []} ownerId={fundraiser.treasurerId ?? 0} />
                </Section>

                <Section title="Lista dzieci">
                    <FundraiserChildrenTable childrenList={acceptedChildren} fundraiser={fundraiser} />
                </Section>

                <Section title="Historia transakcji">
                    <TransactionsHistoryTable transactions={transactionHistory ?? []} />
                </Section>
            </Page.Content>

            <UploadFileDialog isOpen={!!file} onClose={() => setFile(null)} file={file} fundraiserId={fundraiser.id} />
        </Page.Root>
    );
};

export const FundraiserPage = onlyAsAuthenticated(BaseFundraiserPage);

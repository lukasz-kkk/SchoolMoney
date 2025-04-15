import { FinancialAccount } from "@/features/finances/types/Finances";

// TODO: Remove mocks
export const useFinancialAccount = () => {
    const data: FinancialAccount = {
        name: "Podstawowy rachunek",
        number: "1111 2222 3333 4444 5555 6666",
        balance: 32500,
    };

    return { data };
};

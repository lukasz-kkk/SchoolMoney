import { useMutation } from "@tanstack/react-query";

// TODO: Remove mocks
export const useTransferMoney = () => {
    return useMutation({
        mutationFn: async (data: unknown) => data,
    });
};

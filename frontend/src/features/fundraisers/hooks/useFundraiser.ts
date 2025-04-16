import { useFundraisers } from "@/features/fundraisers/hooks/useFundraisers.ts";

// TODO: Replace mocks
export const useFundraiser = (id: number) => {
    const { data } = useFundraisers();

    return { data: data?.find((fundraiser) => fundraiser.id === id) };
};

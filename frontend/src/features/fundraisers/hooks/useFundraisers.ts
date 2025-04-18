//TODO: Remove mocks
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";

export const useFundraisers = () => {
    return { data };
};

const data: Fundraiser[] = [
    {
        id: 1,
        name: "Zbiórka na nowe laptopy dla szkoły",
        description: "Zbieramy środki na zakup 15 nowych laptopów dla pracowni komputerowej",
        amountPerPerson: 150,
        startDate: new Date("2023-05-01"),
        endDate: new Date("2023-06-30"),
        classId: 12,
    },
    {
        id: 2,
        name: "Wycieczka w góry",
        description: "Zbiórka na trzydniową wycieczkę klasową w Bieszczady",
        amountPerPerson: 300,
        startDate: new Date("2023-09-15"),
        endDate: new Date("2023-10-15"),
        classId: 8,
    },
    {
        id: 3,
        name: "Książki do biblioteki",
        description: "Uzupełnienie zasobów bibliotecznych o nowe lektury",
        amountPerPerson: 50,
        startDate: new Date("2023-03-10"),
        endDate: new Date("2023-04-10"),
        classId: 5,
    },
    {
        id: 4,
        name: "Sprzęt sportowy",
        description: "Zakup nowych piłek, rakiet tenisowych i siatki do siatkówki",
        amountPerPerson: 75,
        startDate: new Date("2023-11-01"),
        endDate: new Date("2024-01-31"),
        classId: 10,
    },
    {
        id: 5,
        name: "Pomoc dla schroniska",
        description: "Zbiórka na karmę i koce dla lokalnego schroniska dla zwierząt",
        amountPerPerson: 30,
        startDate: new Date("2023-07-01"),
        endDate: new Date("2023-07-31"),
        classId: 3,
    },
];

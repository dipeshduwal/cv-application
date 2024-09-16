import uniqid from "uniqid";

const defaultData = {
    personalInfo: {
        fullName: "Max Müller",
        email: "max.mueller@gmail.com",
        phoneNumber: "+79 100 20 20",
        address: "Bellikon, AG",
        birthDate: "01.01.2000",
    },

    sections: {
        educations: [
            {
                degree: "Kaufmann EFZ",
                schoolName: "zB. Zentrum Bildung",
                location: "Baden",
                startDate: "08/2020",
                endDate: "06/2023",
                isCollapsed: true,
                isHidden: false,
                id: uniqid(),
            },
        ],

        experiences: [
            {
                companyName: "Firma XYZ",
                positionTitle: "Lernender Kaufmann",
                location: "Bellikon",
                description:
                    "Administrative und kaufmännische Aufgaben in einem Betrieb der Baubranche",
                startDate: "08/2020",
                endDate: "present",
                isCollapsed: true,
                isHidden: false,
                id: uniqid(),
            },
        ],
    },
};

export default defaultData;
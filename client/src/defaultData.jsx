import uniqid from "uniqid";

const defaultData = {
    personalInfo: {
        fullName: "Dipesh Duwal",
        email: "dipeshduwal@gmail.com",
        phoneNumber: "+977-9813968406",
        address: "Dekocha, Bhaktapur",
        birthDate: "05.06.1999",
    },

    sections: {
        educations: [
            {
                degree: "BSc. Computing (Hons.)",
                schoolName: "Islington College",
                location: "Kamalpokhari",
                startDate: "08/2020",
                endDate: "06/2023",
                isCollapsed: true,
                isHidden: false,
                id: uniqid(),
            },
        ],

        experiences: [
            {
                companyName: "OpenCafe LLC",
                positionTitle: "Software Developer Intern",
                location: "Lalitpur",
                description:
                    "Make Awesome Applications Usign Various Tools and Technologies Like React and Node.",
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
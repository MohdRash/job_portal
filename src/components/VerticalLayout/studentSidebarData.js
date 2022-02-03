function studentSidebardata() {
  return [
    {
      heading: "Students",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user-detail",
      subTitles: [
        { title: "All Students", routeLink: "/studentsdata" },
        {
          title: "Not paid",
          routeLink: "/productionmngr/notpaid",
        },
        {
          title: "Paided",
          routeLink: "/productionmngr/paided",
        },
        
      ],
    },
    
    {
      heading: "Job Details",
      badgeClass: "",
      badgeValue: "",
      iconClass: "shield",
      subTitles: [
        { title: "All Job Applications", routeLink: "/qualitycheckers" },
        {
          title: "Create Job Application",
          routeLink: "/qualitychecker/create",
        },
      ],
    },
  ]
}

export const studentSideBar = studentSidebardata()

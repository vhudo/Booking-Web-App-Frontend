export const adminMenu = [
  {
    //manage user
    name: "menu.admin.manage-user",
    menus: [
      { name: "menu.admin.crud", link: "/system/user-manage" },
      { name: "menu.admin.crud-redux", link: "/system/user-redux" },
      {
        name: "menu.admin.manage-doctor", link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      //manage schedule
      { name: "menu.doctor.manage-schedule", link: "/doctor/manage-schedule" },
    ],
  },

  {
    //dynamic menu clinic
    name: "menu.admin.clinic",
    menus: [
      { name: "menu.admin.manage-clinic", link: "/system/manage-clinic" },
    ],
  },

  {
    //dynamic menu  specialty
    name: "menu.admin.specialty",
    menus: [
      { name: "menu.admin.manage-specialty", link: "/system/manage-specialty" },
    ],
  },

  {
    //dynamic menu  news/tips
    name: "menu.admin.posts",
    menus: [{ name: "menu.admin.manage-posts", link: "/system/manage-posts" }],
  },

];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      { name: "menu.doctor.manage-schedule", link: "/doctor/manage-schedule" },
    ]
  }



];

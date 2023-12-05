export const adminMenu = [
    {
        //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manage-teacher', link: '/system/manage-teacher'
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            {
                //quản lý Thời khóa biểu
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            },
        ]
    },

    { // quan ly phong hoc
        name: 'menu.admin.classroom',
        menus: [
            {
                name: 'menu.admin.manage-classroom', link: '/system/manage-classroom'
            },
        ]
    },

    { // quan ly chuyen nganh
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },

    { // quan ly cam nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    }
];
export const teacherMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                //quản lý Thời khóa biểu
                name: 'menu.teacher.manage-schedule', link: '/teacher/manage-schedule'
            }
        ]
    }
];
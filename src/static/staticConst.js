import { userLogout } from "../store/actions/fetchData/userState";

export const staticConst = {
  navigation: [
    {
      title: "Jakarta",
      path: "/v2/search?type=city-only&cityName=Daerah%20Khusus%20Ibukota%20Jakarta&lat=-6.1805113&lng=106.8283831",
      cName: "dropdown-link"
    },
    {
      title: "Semarang",
      path: "/v2/search?type=city-only&cityName=Kota%20Semarang&lat=-7.0051453&lng=110.4381254",
      cName: "dropdown-link"
    },
    {
      title: "Yogyakarta",
      path: "/v2/search?type=city&cityName=Yogyakarta&lat=-7.8216947&lng=110.2850668",
      cName: "dropdown-link"
    },
    {
      title: "Makassar",
      path: "/v2/search?type=city-only&cityName=Makassar&lat=-5.147665099999999&lng=119.4327314",
      cName: "dropdown-link"
    },
    {
      title: "Medan",
      path: "/v2/search?type=city-only&cityName=Medan&lat=3.597031&lng=98.678513",
      cName: "dropdown-link"
    },
    {
      title: "Bandung",
      path: "/v2/search?type=city-only&cityName=Bandung&lat=-6.914744&lng=107.609810",
      cName: "dropdown-link"
    },
    {
      title: "Surabaya",
      path: "/v2/search?type=city-only&cityName=Surabaya&lat=-7.2574719&lng=112.7520883",
      cName: "dropdown-link"
    },
  ],
  navigationKpr: [
    {
      title: "Ajukan KPR",
      path: "/",
      cName: "dropdown-link"
    },
    {
      title: "Lihat Status",
      path: "/profile-user/list-pengajuan-kpr",
      cName: 'dropdown-link'
    }
  ],
  dataProperty: [
    {
      filtering: ["Rumah", "Tipe 45"],
      propertyName: "Rumah Minimalis Green Residence",
      location: "Sleman, Yogyakarta",
      price: "Rp1.5 miliar",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 9.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.143465485628588,
        lng: 106.75539523992124,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "2 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Parkir",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "100 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Apartment", "Tipe 45"],
      propertyName: "PULANG ke UTTARA Alcove Studio 18Z",
      location: "Sleman, Yogyakarta",
      price: "Rp920 juta",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 10.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.189887201305099,
        lng: 106.9291165533978,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "1 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "100 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 45"],
      propertyName: "Rumah Minimalis Green Residence",
      location: "Sleman, Yogyakarta",
      price: "Rp873 juta",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 11.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.252003992770488,
        lng: 106.71282321843687,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "2 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "100 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 72"],
      propertyName: "Merapi View Jalan Kaliurang Km 8.5",
      location: "Sleman, Yogyakarta",
      price: "Rp675 juta",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 12.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.192617763734256,
        lng: 106.83710605535093,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "4 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "200 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 45"],
      propertyName: "AURORA Bukit Rancamaya Residence",
      location: "Jakarta Utara, DKI Jakarta",
      price: "Rp2.2 miliar",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 8.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.252003992770488,
        lng: 106.80483371648374,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "4 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "200 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 45"],
      propertyName: "Rumah Minimalis Green Residence",
      location: "Sleman, Yogyakarta",
      price: "Rp1.5 miliar",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 9.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.143465485628588,
        lng: 106.75539523992124,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "2 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Parkir",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "100 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Apartment", "Tipe 45"],
      propertyName: "PULANG ke UTTARA Alcove Studio 18Z",
      location: "Sleman, Yogyakarta",
      price: "Rp920 juta",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 10.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.189887201305099,
        lng: 106.9291165533978,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "1 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "100 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 45"],
      propertyName: "Rumah Minimalis Green Residence",
      location: "Sleman, Yogyakarta",
      price: "Rp873 juta",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 11.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.252003992770488,
        lng: 106.71282321843687,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "2 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "100 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 72"],
      propertyName: "Merapi View Jalan Kaliurang Km 8.5",
      location: "Sleman, Yogyakarta",
      price: "Rp675 juta",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 12.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.192617763734256,
        lng: 106.83710605535093,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "4 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "200 m²",
          shortName: "100 m²",
        },
      ],
    },
    {
      filtering: ["Rumah", "Tipe 45"],
      propertyName: "AURORA Bukit Rancamaya Residence",
      location: "Jakarta Utara, DKI Jakarta",
      price: "Rp2.2 miliar",
      kprStartFrom: "3.600.000/bulan",
      interestRate: "3.50%",
      thumb: "/images/image 8.png",
      developer: "Kawan Lama Properti",
      center: {
        lat: -6.252003992770488,
        lng: 106.80483371648374,
      },
      facility: [
        {
          icon: "/icons/small-icons/Bedroom.svg",
          name: "4 Kamar",
          shortName: "2 KT",
        },
        {
          icon: "/icons/small-icons/Bathroom.svg",
          name: "1 Kamar Mandi",
          shortName: "2 KM",
        },
        {
          icon: "/icons/small-icons/Garage-Car.svg",
          name: "2 Mobil",
          shortName: "2 Parkir",
        },
        {
          icon: "/icons/LB.svg",
          name: "200 m²",
          shortName: "100 m²",
        },
      ],
    },
  ],
  profileMenu: {
    user: {
      name: "Anika Vaccaro",
      roleName: "visitor",
      photoProfile: "/images/Avatar.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        {
          menu: {
            subMenu: [
              {
                name: "Profile",
                path: "/profile-user/profile",
                status: "profile",
              },
              {
                name: "Properti Tersimpan",
                path: "/profile-user/saved-property",
                status: "profile-saved",
              },
              // {
              //   name: "Listing Properti",
              //   path: "/profile-user/property-listing",
              //   status: "profile-listing",
              // },
              {
                name: "List Pengajuan KPR",
                path: "/profile-user/list-pengajuan-kpr",
                status: "profile-listing",
              },
            ],
          },
        },
      ],
    },
    developer: {
      name: "PT. Sukses Indonesia",
      roleName: "developer",
      photoProfile: "/images/Developer Av.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        {
          menu: {
            subMenu: [
              {
                name: "Profile",
                path: "/profile-user/profile",
                status: "profile",
              },
              {
                // name: "Sales Referral",
                name: "Sales",
                path: "/profile-user/sales-referral",
                status: "sales-referral",
              },
              {
                // name: "User Referral",
                name: "All Subsmissions",
                path: "/profile-user/user-referral",
                status: "user-referral",
              },
              // {
              //   name: "Properti Tersimpan",
              //   path: "/profile-user/saved-property",
              //   status: "profile-saved",
              // },
              {
                name: "Listing Properti",
                path: "/profile-user/property-listing",
                status: "profile-listing",
              },
              {
                name: "Visitors Monitoring",
                path: "/profile-user/wishlist-developer",
                status: "wishlist",
                statusMobile: "wishlist",
              },
            ],
          },
        },
      ],
    },
    admin: {
      name: "Andy Furukumi",
      roleName: "admin",
      photoProfile: "/images/Avatar.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        {
          menu: {
            name: "Monitoring Dashboard",
            path: "/admin/dashboard-report",
            icon: "/icons/Monitor",
            status: "dashboardReport",
            statusMobile: "dashboardReport",
            subMenu: [
              {
                name: "Executive Summary",
                path: "/admin/dashboard-report/executivesummary",
                status: "executivesummary",
                statusMobile: "executivesummaryMobile",
              },
              {
                name: "Pengajuan KPR",
                path: "/admin/dashboard-report/pengajuandeveloper",
                status: "pengajuandeveloper",
                statusMobile: "pengajuandeveloperMobile",
              },
              {
                name: "Data PKS Developer",
                path: "/admin/dashboard-report/pksdeveloper",
                status: "pksdeveloper",
                statusMobile: "pksdeveloperMobile",
              },
              {
                name: "Rating Homespot",
                path: "/admin/dashboard-report/ratinghomespot",
                status: "ratinghomespot",
                statusMobile: "ratinghomespotMobile",
              },
              {
                name: "Status User",
                path: "/admin/dashboard-report/statususer",
                status: "statususer",
                statusMobile: "statususerMobile",
              },
            ]
          },
        },
        {
          menu: {
            name: "Status & Detail User",
            path: "/admin/monitoring-status-user",
            icon: "/icons/Status&DetailUser",
            status: "monitoringStatusUser",
            statusMobile: "monitoringStatusUserMobile",
          },
        },
        {
          menu: {
            name: "User Management",
            path: "/admin/user-management",
            icon: "/icons/UserList",
            status: "userManagement",
            statusMobile: "userManagementMobile",
            subMenu: [
              {
                name: "Developer",
                path: "/admin/user-management/list-developer",
                status: "developer",
                statusMobile: "developerMobile",
              },
              {
                name: "Upload Developer",
                path: "/admin/user-management/upload-developer",
                status: "uploadDev",
                statusMobile: "uploadDevMobile",
              },
              {
                name: "Sales",
                path: "/admin/user-management/salesperson",
                status: "uploadDev",
                statusMobile: "uploadDevMobile",
              },
              {
                name: "Admin Cabang",
                path: "/admin/user-management/admin-cabang",
                status: "adminCabang",
                statusMobile: "adminCabangMobile"
              },
              {
                name: "Customer Service",
                path: "/admin/user-management/cs",
                status: "adminCabang",
                statusMobile: "customerServiceMobile"
              }
              // {
              //   name: "Salesperson",
              //   path: "/admin/user-management/salesperson",
              //   status: "uploadDev",
              //   statusMobile: "uploadDevMobile",
              // }
            ],
          },
        },
        {
          menu: {
            name: "Manag. Information System",
            path: "/admin/mis",
            icon: "/icons/Management",
            status: "sales-referral",
            statusMobile: "sales-referral",
            subMenu: [
              // {
              //   name: "MIS User Refferal",
              //   path: "/admin/mis/user-refferal",
              //   status: "userRefferal",
              //   statusMobile: "userRefferalMobile",
              // },
              {
                // name: "MIS Sales Refferal",
                name: "Submitted by Sales",
                path: "/admin/mis/sales-refferal",
                status: "salesRefferal",
                statusMobile: "salesRefferalMobile",
              },
              {
                // name: "MIS Pengajuan KPR",
                name: "All Submissions",
                path: "/admin/mis/pengajuan-kpr",
                status: "pengajuanKPR",
                statusMobile: "pengajuanKPRMobile",
              },
              {
                name: "Visitors Monitoring",
                path: "/admin/mis/wishlist",
                status: "wishlist",
                statusMobile: "wishlist",
              },
              {
                name: "Dynamic Banner",
                path: "/admin/banner",
                status: "dynamicBanner",
                statusMobile: "dynamicBannerMobile",
              }
            ],
          },
        },
        {
          menu: {
            name: "Update Program Suku Bunga",
            path: "/admin/update-program-kpr",
            icon: "/icons/UpdateProgram",
            status: "updateProgramKpr",
            statusMobile: "updateProgramKpr",
            subMenu: [
              {
                name: "Inquiry Program Suku Bunga",
                path: "/admin/update-program-kpr/inquiry-gimmick-kpr",
                status: "inquiryGimmickKpr",
                statusMobile: "inquiryGimmickKprMobile",
              },
            ],
          },
        },
        {
          menu: {
            name: "LRC",
            path: "/admin/lrc",
            icon: "/icons/UpdateProgram",
            status: "adminLrc",
            statusMobile: "adminLrc",
            subMenu: [
              {
                name: "Company Registration",
                path: "/admin/lrc/company-registration",
                status: "companyRegistration",
                statusMobile: "companyRegistrationMobile",
              },
              {
                name: "MIS Hot Leads Management",
                path: "/admin/lrc/list-hlm",
                status: "hotleadsManagement",
                statusMobile: "hotleadsManagementMobile",
              },
            ],
          },
        },
        {
          menu: {
            name: "Homespot Update",
            path: "/admin/homespot-update",
            icon: "/icons/Article",
            status: "adminHomespotUpdate",
            statusMobile: "adminHomespotUpdate"
          }
        }
      ],
    },
    sales: {
      name: "Sales Default",
      roleName: "sales",
      photoProfile: "/images/Avatar.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        {
          menu: {
            name: "Profile",
            path: "/sales-dashboard/setting",
            icon: "/icons/profile",
            status: "setting",
            statusMobile: "setting",
          },
        },
        {
          menu: {
            name: "Data Penjualan",
            path: "/sales-dashboard/data-penjualan",
            icon: "/icons/Management",
            status: "dataPenjualan",
            statusMobile: "dataPenjualanMobile",
            subMenu: [
              {
                name: "Data Penjualan Draft",
                path: "/sales-dashboard/datapenjualan/draft",
                status: "developer",
                statusMobile: "developerMobile",
              },
              {
                name: "Data Penjualan Final",
                path: "/sales-dashboard/datapenjualan/final",
                status: "uploadDev",
                statusMobile: "uploadDevMobile",
              },
            ],
          },
        },
        {
          menu: {
            name: "Penjualan",
            path: "/sales-dashboard/penjualanresult/sales",
            icon: "/icons/Penjualan",
            status: "penjualan",
            statusMobile: "penjualan"

          }
        },
      ],
    },
    adminCabang: {
      name: "Admin Cabang Default",
      roleName: "AdminCabang",
      photoProfile: "/images/Avatar.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        {
          menu: {
            subMenu: [
              {
                name: "Profile",
                path: "/admin-cabang/setting",
                status: "account",
              },
              {
                name: "List Properti Secondary",
                path: "/admin-cabang/list-properti",
                status: "listing-properti",
              },
              {
                name: "List Notaris",
                path: "/admin-cabang/list-notaris",
                status: "list-notaris",
              },
              {
                name: "List KJPP",
                path: "/admin-cabang/list-kjpp",
                status: "list-kjpp",
              },
            ]
          }
        }
      ]
    },
      customerService: {
      name: "Customer Service default",
      roleName: "CustomerService",
      photoProfile: "/images/Avatar.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        {
          menu: {
            subMenu: [
              {
                name: "Profil",
                path: "/customer-service/setting",
                status: "account",
              },
              {
                name: "List Pengajuan",
                path: "/customer-service/list-pengajuan",
                icon: "/icons/Penjualan",
                status: "bill",
              },
            ]
          }
        }
      ]
    },
    adminMIS: {
      name: "Admin MIS",
      roleName: "adminMIS",
      photoProfile: "/images/Avatar.svg",
      akunStatus: "Akun terverifikasi",
      userMenu: [
        // {
        //   menu: {
        //     name: "Dashboard Report",
        //     path: "/admin/dashboard-report",
        //     icon: "/icons/Monitor",
        //     status: "dashboardReport",
        //     statusMobile: "dashboardReport",
        //   },
        // },
        // {
        //   menu: {
        //     name: "Monitoring Status User",
        //     path: "/admin/monitoring-status-user",
        //     icon: "/icons/Monitor",
        //     status: "monitoringStatusUser",
        //     statusMobile: "monitoringStatusUserMobile",
        //   },
        // },
        // {
        //   menu: {
        //     name: "User Management",
        //     path: "/admin/user-management",
        //     icon: "/icons/UserList",
        //     status: "userManagement",
        //     statusMobile: "userManagementMobile",
        //     subMenu: [
        //       {
        //         name: "Developer",
        //         path: "/admin/user-management/list-developer",
        //         status: "developer",
        //         statusMobile: "developerMobile",
        //       },
        //       {
        //         name: "Upload Developer",
        //         path: "/admin/user-management/upload-developer",
        //         status: "uploadDev",
        //         statusMobile: "uploadDevMobile",
        //       },
        //       {
        //         name: "Sales",
        //         path: "/admin/user-management/salesperson",
        //         status: "uploadDev",
        //         statusMobile: "uploadDevMobile",
        //       },
        //       {
        //         name: "Admin Cabang",
        //         path: "/admin/user-management/admin-cabang",
        //         status: "adminCabang",
        //         statusMobile: "adminCabangMobile"
        //       }
        //       // {
        //       //   name: "Salesperson",
        //       //   path: "/admin/user-management/salesperson",
        //       //   status: "uploadDev",
        //       //   statusMobile: "uploadDevMobile",
        //       // }
        //     ],
        //   },
        // },
        {
          // menu: {
          //   name: "Monitoring Dashboard",
          //   path: "/admin/dashboard-report",
          //   icon: "/icons/Monitor",
          //   status: "dashboardReport",
          //   statusMobile: "dashboardReport",
          //   subMenu: [
          //   ]
          // },
          menu: {
            name: "Manag. Information System",
            path: "/admin/mis",
            icon: "/icons/Management",
            status: "sales-referral",
            statusMobile: "sales-referral",
            subMenu: [
              {
                name: "Data PKS Developer",
                path: "/admin/dashboard-report/pksdeveloper",
                status: "pksdeveloper",
                statusMobile: "pksdeveloperMobile",
              },
              {
                // name: "MIS Sales Refferal",
                name: "Submitted by Sales",
                path: "/admin/mis/sales-refferal",
                status: "salesRefferal",
                statusMobile: "salesRefferalMobile",
              },
              {
                // name: "MIS Pengajuan KPR",
                name: "All Submissions",
                path: "/admin/mis/pengajuan-kpr",
                status: "pengajuanKPR",
                statusMobile: "pengajuanKPRMobile",
              },
              {
                name: "Visitors Monitoring",
                path: "/admin/mis/wishlist",
                status: "wishlist",
                statusMobile: "wishlist",
              }
            ],
          },
        },
        // {
        //   menu: {
        //     name: "Update Program Suku Bunga",
        //     path: "/admin/update-program-kpr",
        //     icon: "/icons/UpdateProgram",
        //     status: "updateProgramKpr",
        //     statusMobile: "updateProgramKpr",
        //     subMenu: [
        //       {
        //         name: "Inquiry Program Suku Bunga",
        //         path: "/admin/update-program-kpr/inquiry-gimmick-kpr",
        //         status: "inquiryGimmickKpr",
        //         statusMobile: "inquiryGimmickKprMobile",
        //       },
        //     ],
        //   },
        // },
        // {
        //   menu: {
        //     name: "LRC",
        //     path: "/admin/lrc",
        //     icon: "/icons/UpdateProgram",
        //     status: "adminLrc",
        //     statusMobile: "adminLrc",
        //     subMenu: [
        //       {
        //         name: "Company Registration",
        //         path: "/admin/lrc/company-registration",
        //         status: "companyRegistration",
        //         statusMobile: "companyRegistrationMobile",
        //       },
        //       {
        //         name: "MIS Hot Leads Management",
        //         path: "/admin/lrc/list-hlm",
        //         status: "hotleadsManagement",
        //         statusMobile: "hotleadsManagementMobile",
        //       },
        //     ],
        //   },
        // },
      ],
    },
  },
  profileMenuNav: [
    {
      name: "Profil",
      onclick: [() => (window.location.href = "/profile-user/profile")],
    },
    { name: "Keluar", onclick: [() => userLogout()] },
  ],
  profileMenuNavSA: [
    { name: "Keluar", onclick: [() => userLogout()] },
  ],
  allTypeMenu: [
    { name: "Semua Type", value: "all" },
    { name: "Super Admin", value: "superadmin" },
    { name: "Admin Cabang", value: "AdminCabang"},
    { name: "Sales", value: "Sales" },
    { name: "Developer", value: "developer" },
    { name: "Visitor", value: "visitor" }
  ],
  gimmickFilter: [
    { name: "Semua", value: "all" },
    { name: "Aktif", value: "active" },
    { name: "Dihapus", value: "deleted" },
  ],
  dati2Static: {
    kode_pos: "13950",
    kode_dati2: "0395",
    BI_2_DIGIT_KODEPOS: "13",
    kecamatan: "CAKUNG",
    kode_kelurahan: "13950001",
    kelurahan: "PULO GEBANG",
    BRI_2_DIGIT: "13",
    dati2: "Jakarta Timur",
    PROPINSI: "DKI JAKARTA",
    kode_sikp: "3175",
  },
  listingProperty: [
    { name: "Draft", value: "draft" },
    { name: "Published", value: "published" },
    { name: "Closed", value: "closed" }
  ],
  listPengajuanKpr: [
    { name: "Draft", value: "on_submit" },
    { name: "Analisa", value: "on_reviewed" },
    { name: "Disetujui", value: "on_approved" },
    { name: "Ditolak", value: "on_rejected" },
    { name: "Dibatalkan", value: "on_canceled" },
  ],
  propFacility: [
    {
      icon: "/icons/small-icons/Bedroom.svg",
      suffix: "Kamar",
      shortSuffix: "KT",
    },
    {
      icon: "/icons/small-icons/Bathroom.svg",
      suffix: "Kamar Mandi",
      shortSuffix: "KM",
    },
    {
      icon: "/icons/small-icons/Garage-Car.svg",
      suffix: "Mobil",
      shortSuffix: "Parkir",
    },
    {
      icon: "/icons/LB.svg",
      suffix: "m²",
      shortSuffix: "m²",
    },
  ],
};

import Vue from "vue";
import VueRouter from "vue-router";

// Start:: Importing Middleware
import auth from "../middleware/auth.js";
// End:: Importing Middleware

// Start:: Importing Router Components
import Authentication from "../pages/Authentication.vue";
import LoginForm from "../views/Auth/LoginForm.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
import AppContentWrapper from "../pages/AppContentWrapper.vue";

// ============== Start:: Home Page Route
import HomePage from "../pages/HomePage.vue";
// ============== End:: Home Page Route

// ============== Start:: Clients Routes
import ClientsHome from "../views/Cruds/Clients/Home.vue";
import AllClients from "../views/Cruds/Clients/ShowAll.vue";
import ShowClient from "../views/Cruds/Clients/Show.vue";
// ============== End:: Clients Routes

// ============== Start:: Stores Types Routes
import StoresTypesHome from "../views/Cruds/StoresTypes/Home.vue";
import AllStoresTypes from "../views/Cruds/StoresTypes/ShowAll.vue";
import CreateStoreType from "../views/Cruds/StoresTypes/Create.vue";
import EditStoreType from "../views/Cruds/StoresTypes/Edit.vue";
// ============== End:: Stores Types Routes

// ============== Start:: Stores  Routes
import StoresHome from "../views/Cruds/Stores/Home.vue";
import AllStores from "../views/Cruds/Stores/ShowAll.vue";
import CreateStore from "../views/Cruds/Stores/Create.vue";
import EditStore from "../views/Cruds/Stores/Edit.vue";
import ShowStore from "../views/Cruds/Stores/Show.vue";
// ============== End:: Stores  Routes

// ============== Start:: products  Routes
import ProductHome from "../views/Cruds/Products/Home.vue";
import AllProducts from "../views/Cruds/Products/ShowAll.vue";
import CreateProduct from "../views/Cruds/Products/Create.vue";
import EditProducts from "../views/Cruds/Products/Edit.vue";
import ShowProducts from "../views/Cruds/Products/Show.vue";
// ============== End:: products  Routes

// ============== Start:: ProductCategory  Routes
import ProductCategoryHome from "../views/Cruds/ProductCategory/Home.vue";
import AllProductCategory from "../views/Cruds/ProductCategory/ShowAll.vue";
import CreateProductCategory from "../views/Cruds/ProductCategory/Create.vue";
import EditProductCategory from "../views/Cruds/ProductCategory/Edit.vue";
import ShowProductCategory from "../views/Cruds/ProductCategory/Show.vue";
// ============== End:: ProductCategory  Routes

// ============== Start:: Regions  Routes
import RegionsHome from "../views/Cruds/Regions/Home.vue";
import AllRegions from "../views/Cruds/Regions/ShowAll.vue";
import CreateRegions from "../views/Cruds/Regions/Create.vue";
import EditRegions from "../views/Cruds/Regions/Edit.vue";
import ShowRegions from "../views/Cruds/Regions/Show.vue";
// ============== End:: Regions  Routes

// ============== Start:: States  Routes
import StatesHome from "../views/Cruds/States/Home.vue";
import AllStates from "../views/Cruds/States/ShowAll.vue";
import CreateStates from "../views/Cruds/States/Create.vue";
import EditStates from "../views/Cruds/States/Edit.vue";
import ShowStates from "../views/Cruds/States/Show.vue";
// ============== End:: Regions  Routes

// ============== Start:: Financial Reports Routes
import FinancialReportsHome from "../views/Cruds/FinancialReports/Home.vue";
import AllFinancialReports from "../views/Cruds/FinancialReports/ShowAll.vue";
import ShowFinancialReport from "../views/Cruds/FinancialReports/Show.vue";
// ============== End:: Financial Reports Routes

// ============== Start:: FinancialfinshedReports Routes
import FinancialNotFinshedReportsHome from "../views/Cruds/FinancialFinshedReports/Home.vue";
import AllFinancialNotFinshedReports from "../views/Cruds/FinancialFinshedReports/ShowAll.vue";
import ShowFinancialNotFinshedReport from "../views/Cruds/FinancialFinshedReports/Show.vue";
// ============== End:: FinancialfinshedReports Routes

// ============== Start:: Financial Reports Routes
import PackageReportsHome from "../views/Cruds/PackageReports/Home.vue";
import AllPackageReports from "../views/Cruds/PackageReports/ShowAll.vue";
import ShowPackageReports from "../views/Cruds/PackageReports/Show.vue";
// ============== End:: Financial Reports Routes

// ============== Start:: States  Routes
import NationalitiesHome from "../views/Cruds/Nationalities/Home.vue";
import AllNationalities from "../views/Cruds/Nationalities/ShowAll.vue";
import CreateNationalities from "../views/Cruds/Nationalities/Create.vue";
import EditNationalities from "../views/Cruds/Nationalities/Edit.vue";
import ShowNationalities from "../views/Cruds/Nationalities/Show.vue";
// ============== End:: Regions  Routes


// ============== Start:: States  Routes
import BanksHome from "../views/Cruds/Banks/Home.vue";
import AllBanks from "../views/Cruds/Banks/ShowAll.vue";
import CreateBanks from "../views/Cruds/Banks/Create.vue";
import EditBanks from "../views/Cruds/Banks/Edit.vue";
import ShowBanks from "../views/Cruds/Banks/Show.vue";
// ============== End:: Regions  Routes


// ============== Start:: Occasions  Routes
import OccasionsHome from "../views/Cruds/Occasions/Home.vue";
import AllOccasions from "../views/Cruds/Occasions/ShowAll.vue";
import CreateOccasions from "../views/Cruds/Occasions/Create.vue";
import EditOccasions from "../views/Cruds/Occasions/Edit.vue";
import ShowOccasions from "../views/Cruds/Occasions/Show.vue";
// ============== End:: Occasions  Routes

// ============== Start:: Employees  Routes
import EmployeesHome from "../views/Cruds/Employees/Home.vue";
import AllEmployees from "../views/Cruds/Employees/ShowAll.vue";
import CreateEmployees from "../views/Cruds/Employees/Create.vue";
import EditEmployees from "../views/Cruds/Employees/Edit.vue";
import ShowEmployees from "../views/Cruds/Employees/Show.vue";
// ============== End:: Employees  Routes

// ============== Start:: Coupons Routes
import CouponsHome from "../views/Cruds/Coupons/Home.vue";
import AllCoupons from "../views/Cruds/Coupons/ShowAll.vue";
import CreateCoupon from "../views/Cruds/Coupons/Create.vue";
import EditCoupon from "../views/Cruds/Coupons/Edit.vue";
import ShowCoupon from "../views/Cruds/Coupons/Show.vue";
// ============== End:: Coupons Routes

// ============== Start:: Coupons-prov Routes
import CouponsProHome from "../views/Cruds/CouponsProvider/Home.vue";
import AllCouponsPro from "../views/Cruds/CouponsProvider/ShowAll.vue";
import CreateCouponPro from "../views/Cruds/CouponsProvider/Create.vue";
import EditCouponPro from "../views/Cruds/CouponsProvider/Edit.vue";
import ShowCouponPro from "../views/Cruds/CouponsProvider/Show.vue";
// ============== End:: Coupons-prov Routes

// ============== Start:: Drivers Routes
import DriversHome from "../views/Cruds/Drivers/Home.vue";
import AllDrivers from "../views/Cruds/Drivers/ShowAll.vue";
import CreateDriver from "../views/Cruds/Drivers/Create.vue";
import EditDriver from "../views/Cruds/Drivers/Edit.vue";
import ShowDriver from "../views/Cruds/Drivers/Show.vue";
// ============== End:: Drivers Routes

// ============== Start:: Drivers Routes
import DriversJoinHome from "../views/Cruds/DriversJoin/Home.vue";
import AllDriversJoin from "../views/Cruds/DriversJoin/ShowAll.vue";
import ShowDriverJoin from "../views/Cruds/DriversJoin/Show.vue";
// ============== End:: Drivers Routes

// ============== Start:: CarTypes Routes
import CarTypesHome from "../views/Cruds/CarTypes/Home.vue";
import AllCarTypes from "../views/Cruds/CarTypes/ShowAll.vue";
import CreateCarTypes from "../views/Cruds/CarTypes/Create.vue";
import ShowCarTypes from "../views/Cruds/CarTypes/Show.vue";
import EditCarTypes from "../views/Cruds/CarTypes/Edit.vue";
// ============== End:: CarTypes Routes

// ============== Start::ShipmentType Routes
import ShipmentTypeHome from "../views/Cruds/ShipmentType/Home.vue";
import AllShipmentType from "../views/Cruds/ShipmentType/ShowAll.vue";
import CreateShipmentType from "../views/Cruds/ShipmentType/Create.vue";
import ShowShipmentType from "../views/Cruds/ShipmentType/Show.vue";
import EditShipmentType from "../views/Cruds/ShipmentType/Edit.vue";
// ============== End::ShipmentType Routes



// ============== Start::ShipmentType Routes
import ShipmentSubTypeHome from "../views/Cruds/ShipmentSubType/Home.vue";
import AllShipmentSubType from "../views/Cruds/ShipmentSubType/ShowAll.vue";
import CreateShipmentSubType from "../views/Cruds/ShipmentSubType/Create.vue";
import ShowShipmentSubType from "../views/Cruds/ShipmentSubType/Show.vue";
import EditShipmentSubType from "../views/Cruds/ShipmentSubType/Edit.vue";
// ============== End::ShipmentType Routes



// ============== Start:: CarModals Routes
import CarModalsHome from "../views/Cruds/CarModals/Home.vue";
import AllCarModals from "../views/Cruds/CarModals/ShowAll.vue";
import CreateCarModals from "../views/Cruds/CarModals/Create.vue";
import ShowCarModals from "../views/Cruds/CarModals/Show.vue";
import EditCarModals from "../views/Cruds/CarModals/Edit.vue";
// ============== End:: CarModals Routes

// ============== Start:: Orders Routes
import OrdersHome from "../views/Cruds/Orders/Home.vue";
import AllOrders from "../views/Cruds/Orders/ShowAll.vue";
import ShowOrder from "../views/Cruds/Orders/Show.vue";
// ============== End:: Orders Routes

// ============== Start:: OrdersReservations
import OrdersReservationsHome from "../views/Cruds/OrdersReservations/Home.vue";
import AllOrdersReservations from "../views/Cruds/OrdersReservations/ShowAll.vue";
import ShowOrdersReservations from "../views/Cruds/OrdersReservations/Show.vue";
// ============== End:: OrdersReservations

// ============== Start:: Offers Routes
import OffersHome from "../views/Cruds/Offers/Home.vue";
import AllOffers from "../views/Cruds/Offers/ShowAll.vue";
import EditOffers from "../views/Cruds/Offers/Edit.vue";
import CreateOffers from "../views/Cruds/Offers/Create.vue";
import ShowOffer from "../views/Cruds/Offers/Show.vue";
// ============== End:: Offers Routes

// ============== Start:: Packages Routes
import PackagesHome from "../views/Cruds/Packages/Home.vue";
import AllPackages from "../views/Cruds/Packages/ShowAll.vue";
import CreatePackages from "../views/Cruds/Packages/Create.vue";
import ShowPackages from "../views/Cruds/Packages/Show.vue";
import EditPackages from "../views/Cruds/Packages/Edit.vue";
// ============== End:: Packages Routes

// ============== Start:: Ads Routes
import AdsHome from "../views/Cruds/Ads/Home.vue";
import AllAds from "../views/Cruds/Ads/ShowAll.vue";
import CreateAds from "../views/Cruds/Ads/Create.vue";
import ShowAds from "../views/Cruds/Ads/Show.vue";
import EditAds from "../views/Cruds/Ads/Edit.vue";
// ============== End:: Ads Routes

// ============== Start:: FAQ Routes
import FAQHome from "../views/Cruds/FAQ/Home.vue";
import AllFAQ from "../views/Cruds/FAQ/ShowAll.vue";
import CreateFAQ from "../views/Cruds/FAQ/Create.vue";
import ShowFAQ from "../views/Cruds/FAQ/Show.vue";
import EditFAQ from "../views/Cruds/FAQ/Edit.vue";
// ============== End:: Ads Routes


// ============== Start:: Contact Messages Routes
import ContactMessagesHome from "../views/Cruds/ContactMessages/Home.vue";
import AllContactMessages from "../views/Cruds/ContactMessages/ShowAll.vue";
// ============== End:: Contact Messages Routes

// ============== Start:: App Content Routes
import AppContentHome from "../views/Cruds/AppContent/Home.vue";
import AboutUs from "../views/Cruds/AppContent/AboutUs.vue";
import Terms from "../views/Cruds/AppContent/Terms.vue";
import PrivacyPolicy from "../views/Cruds/AppContent/PrivacyPolicy.vue";
import ContactSetting from "../views/Cruds/AppContent/ContactSetting.vue";
// ============== End:: App Content Routes

// ============== Start:: App Settings Routes
import AppSettingsHome from "../views/Cruds/AppSettings/Home.vue";
import GeneralSettings from "../views/Cruds/AppSettings/GeneralSettings.vue";
import AppSettings from "../views/Cruds/AppSettings/AppSettings.vue";
// ============== End:: App Settings Routes

// ============== Start:: Roles Routes
import RolesHome from "../views/Cruds/Roles/Home.vue";
import AllRoles from "../views/Cruds/Roles/ShowAll.vue";
import CreateRole from "../views/Cruds/Roles/Create.vue";
import EditRole from "../views/Cruds/Roles/Edit.vue";
// ============== End:: Roles Routes

// ============== Start:: Admins Routes
import AdminsHome from "../views/Cruds/Admins/Home.vue";
import AllAdmins from "../views/Cruds/Admins/ShowAll.vue";
import CreateAdmin from "../views/Cruds/Admins/Create.vue";
import EditAdmin from "../views/Cruds/Admins/Edit.vue";
import ShowAdmin from "../views/Cruds/Admins/Show.vue";
// ============== End:: Admins Routes

// ============== Start:: All Notifications Routes
import NotificationsHome from "../views/Cruds/Notifications/Home.vue";
import AllNotifications from "../views/Cruds/Notifications/ShowAll.vue";
import CreateNotifications from "../views/Cruds/Notifications/Create.vue";
// ============== End:: All Notifications Routes

// ============== Start:: WalletSettlment Routes
import WalletSettlmentHome from "../views/Cruds/WalletSettlment/Home.vue";
import AllWalletSettlment from "../views/Cruds/WalletSettlment/ShowAll.vue";
// ============== End:: WalletSettlment Routes

// ============== Start:: Forbidden Route
import ForbiddenPage from "../pages/ForbiddenPage.vue";
// ============== End:: Forbidden Route

// ============== Start:: Not Found Route
import NotFoundPage from "../pages/NotFound.vue";
// ============== End:: Not Found Route
// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Clients Routes Config
      {
        path: "/clients",
        name: "ClientsHome",
        component: ClientsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllClients",
            component: AllClients,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowClient",
            component: ShowClient,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Clients Routes Config

      // Start:: Drivers Routes Config
      {
        path: "/drivers",
        name: "DriversHome",
        component: DriversHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllDrivers",
            component: AllDrivers,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateDriver",
            component: CreateDriver,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditDriver",
            component: EditDriver,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowDriver",
            component: ShowDriver,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Drivers Routes Config

      // Start:: Drivers join Routes Config
      {
        path: "/drivers-join",
        name: "DriversJoinHome",
        component: DriversJoinHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllDriversJoin",
            component: AllDriversJoin,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowDriverJoin",
            component: ShowDriverJoin,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Drivers join Routes Config

      // Start:: Stores Types Config
      {
        path: "/stores-types",
        name: "StoresTypesHome",
        component: StoresTypesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllStoresTypes",
            component: AllStoresTypes,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateStoreType",
            component: CreateStoreType,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditStoreType",
            component: EditStoreType,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Stores Types Config

      // Start:: Stores  Config
      {
        path: "/stores",
        name: "StoresHome",
        component: StoresHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllStores",
            component: AllStores,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateStore",
            component: CreateStore,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditStore",
            component: EditStore,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowStore",
            component: ShowStore,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Stores Types Config

      // Start:: Products  Config
      {
        path: "/products",
        name: "ProductsHome",
        component: ProductHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllProducts",
            component: AllProducts,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateProduct",
            component: CreateProduct,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditProducts",
            component: EditProducts,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowProducts",
            component: ShowProducts,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Products Types Config

      // Start:: ProductCategory  Config
      {
        path: "/product_category",
        name: "ProductCategoryHome",
        component: ProductCategoryHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllProductCategory",
            component: AllProductCategory,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateProductCategory",
            component: CreateProductCategory,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditProductCategory",
            component: EditProductCategory,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowProductCategory",
            component: ShowProductCategory,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: ProductCategory Config

      // Start:: Regions  Config
      {
        path: "/regions",
        name: "RegionsHome",
        component: RegionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRegions",
            component: AllRegions,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateRegions",
            component: CreateRegions,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditRegions",
            component: EditRegions,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowRegions",
            component: ShowRegions,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Regions Config

      // Start:: States  Config
      {
        path: "/states",
        name: "StatesHome",
        component: StatesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllStates",
            component: AllStates,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateStates",
            component: CreateStates,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditStates",
            component: EditStates,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowStates",
            component: ShowStates,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: states Config

      // Start:: CarTypes  Config
      {
        path: "/carTypes",
        name: "CarTypesHome",
        component: CarTypesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCarTypes",
            component: AllCarTypes,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateCarTypes",
            component: CreateCarTypes,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditCarTypes",
            component: EditCarTypes,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowCarTypes",
            component: ShowCarTypes,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: CarTypes Config

      // Start:: ShipmentTypeHome  Config
      {
        path: "/shipment-type",
        name: "ShipmentTypeHome",
        component: ShipmentTypeHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllShipmentType",
            component: AllShipmentType,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateShipmentType",
            component: CreateShipmentType,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditShipmentType",
            component: EditShipmentType,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowShipmentType",
            component: ShowShipmentType,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: ShipmentTypeHome Config


      // Start:: ShipmentSubTypeHome  Config
      {
        path: "/shipment-sub-type",
        name: "ShipmentSubTypeHome",
        component: ShipmentSubTypeHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllShipmentSubType",
            component: AllShipmentSubType,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateShipmentSubType",
            component: CreateShipmentSubType,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditShipmentSubType",
            component: EditShipmentSubType,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowShipmentSubType",
            component: ShowShipmentSubType,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: ShipmentTypeHome Config



      // Start:: CarModals  Config
      {
        path: "/carModals",
        name: "CarModalsHome",
        component: CarModalsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCarModals",
            component: AllCarModals,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateCarModals",
            component: CreateCarModals,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditCarModals",
            component: EditCarModals,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowCarModals",
            component: ShowCarModals,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: CarModals Config

      // Start:: nationalities  Config
      {
        path: "/nationalities",
        name: "NationalitiesHome",
        component: NationalitiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllNationalities",
            component: AllNationalities,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateNationalities",
            component: CreateNationalities,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditNationalities",
            component: EditNationalities,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowNationalities",
            component: ShowNationalities,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: nationalities Config



       // Start:: nationalities  Config
       {
        path: "/banks",
        name: "BanksHome",
        component: BanksHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllBanks",
            component: AllBanks,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateBanks",
            component: CreateBanks,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditBanks",
            component: EditBanks,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowBanks",
            component: ShowBanks,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: nationalities Config

      // Start:: Financial Reports Routes Config
      {
        path: "/financial-reports",
        name: "FinancialReportsHome",
        component: FinancialReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialReports",
            component: AllFinancialReports,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },

      {
        path: "/financial-not-finshed-reports",
        name: "FinancialNotFinshedReportsHome",
        component: FinancialNotFinshedReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialNotFinshedReports",
            component: AllFinancialNotFinshedReports,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Financial Reports Routes Config

      // Start:: Packages Reports Routes Config
      {
        path: "/packages-reports",
        name: "PackageReportsHome",
        component: PackageReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllPackageReports",
            component: AllPackageReports,
            meta: {
              middleware: [auth],
            },
          },
          // {
          //   path: "show/:id",
          //   name: "ShowFinancialReport",
          //   component: ShowFinancialReport,
          //   props: true,
          //   meta: {
          //     middleware: [auth],
          //   },
          // },
        ],
      },
      // End:: packages Reports Routes Config

      // Start:: occasions  Config
      {
        path: "/occasions",
        name: "OccasionsHome",
        component: OccasionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOccasions",
            component: AllOccasions,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateOccasions",
            component: CreateOccasions,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditOccasions",
            component: EditOccasions,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOccasions",
            component: ShowOccasions,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: occasions Config

 // Start:: WalletSettlment Routes Config
      {
        path: "/wallet-settlment",
        name: "WalletSettlmentHome",
        component: WalletSettlmentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllWalletSettlment",
            component: AllWalletSettlment,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
// End:: WalletSettlmen Routes Config



      // Start:: Offers Routes Config
      {
        path: "/offers",
        name: "OffersHome",
        component: OffersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOffers",
            component: AllOffers,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOffer",
            component: ShowOffer,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateOffers",
            component: CreateOffers,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditOffers",
            component: EditOffers,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Offers Routes Config

      // Start:: packages  Config
      {
        path: "/packages",
        name: "PackagesHome",
        component: PackagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllPackages",
            component: AllPackages,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreatePackages",
            component: CreatePackages,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditPackages",
            component: EditPackages,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowPackages",
            component: ShowPackages,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Packages Config

      // Start:: Ads  Config
      {
        path: "/ads",
        name: "AdsHome",
        component: AdsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAds",
            component: AllAds,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateAds",
            component: CreateAds,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditAds",
            component: EditAds,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowAds",
            component: ShowAds,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Ads Config


       // Start:: faq  Config
       {
        path: "/FAQ",
        name: "FAQ",
        component: FAQHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFAQ",
            component: AllFAQ,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateFAQ",
            component: CreateFAQ,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditFAQ",
            component: EditFAQ,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowFAQ",
            component: ShowFAQ,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: FAQ Config

      // Start:: Orders Routes Config
      {
        path: "/orders",
        name: "OrdersHome",
        component: OrdersHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrders",
            component: AllOrders,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOrder",
            component: ShowOrder,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Orders Routes Config

      // Start:: OrdersReservations Config
      {
        path: "/ordersReservations",
        name: "OrdersReservationsHome",
        component: OrdersReservationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllOrdersReservations",
            component: AllOrdersReservations,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowOrdersReservations",
            component: ShowOrdersReservations,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: OrdersReservations Config

      // Start:: Employees  Config
      {
        path: "/employees",
        name: "EmployeesHome",
        component: EmployeesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllEmployees",
            component: AllEmployees,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateEmployees",
            component: CreateEmployees,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditEmployees",
            component: EditEmployees,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowEmployees",
            component: ShowEmployees,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Employees Types Config

      // Start:: Coupons Config
      {
        path: "/coupons",
        name: "CouponsHome",
        component: CouponsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCoupons",
            component: AllCoupons,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateCoupon",
            component: CreateCoupon,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditCoupon",
            component: EditCoupon,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowCoupon",
            component: ShowCoupon,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Coupons Config

         // Start:: Coupons-pro Config
        {
          path: "/couponspro",
          name: "CouponsProHome",
          component: CouponsProHome,
          meta: {
            middleware: [auth],
          },
          children: [
            {
              path: "all",
              name: "AllCouponsPro",
              component: AllCouponsPro,
              meta: {
                middleware: [auth],
              },
            },
            {
              path: "create",
              name: "CreateCouponPro",
              component: CreateCouponPro,
              meta: {
                middleware: [auth],
              },
            },
            {
              path: "edit/:id",
              name: "EditCouponPro",
              component: EditCouponPro,
              props: true,
              meta: {
                middleware: [auth],
              },
            },
            {
              path: "show/:id",
              name: "ShowCouponPro",
              component: ShowCouponPro,
              props: true,
              meta: {
                middleware: [auth],
              },
            },
          ],
        },
        // End:: Coupons-pro Config

      // Start:: Contact Messages Routes Config
      {
        path: "/contact-messages",
        name: "ContactMessagesHome",
        component: ContactMessagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllContactMessages",
            component: AllContactMessages,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Contact Messages Routes Config

      // Start:: App Content Routes Config
      {
        path: "/app-content",
        name: "AppContentHome",
        component: AppContentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "about-us",
            name: "AboutUs",
            component: AboutUs,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "terms",
            name: "Terms",
            component: Terms,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "ContactSetting",
            name: "ContactSetting",
            component: ContactSetting,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: App Content Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/settings",
        component: AppSettingsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "general-settings",
            name: "GeneralSettings",
            component: GeneralSettings,
            meta: {
              middleware: [auth],
            },
          },
          {
            // app-settings
            path: "AppSettings",
            name: "AppSettings",
            component: AppSettings,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: App Settings Routes Config

      // Start:: Roles Routes Config
      {
        path: "/roles",
        name: "RolesHome",
        component: RolesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRoles",
            component: AllRoles,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateRole",
            component: CreateRole,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditRole",
            component: EditRole,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Roles Routes Config

      // Start:: Admins Routes Config
      {
        path: "/admins",
        name: "AdminsHome",
        component: AdminsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllAdmins,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateAdmin",
            component: CreateAdmin,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "edit/:id",
            name: "EditAdmin",
            component: EditAdmin,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "show/:id",
            name: "ShowAdmin",
            component: ShowAdmin,
            props: true,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: Admins Routes Config

      // Start:: All Notifications Route Config
      {
        path: "/all-notifications",
        name: "NotificationsHome",
        component: NotificationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllNotifications,
            meta: {
              middleware: [auth],
            },
          },
          {
            path: "create",
            name: "CreateNotificationss",
            component: CreateNotifications,
            meta: {
              middleware: [auth],
            },
          },
        ],
      },
      // End:: All Notifications Route Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (localStorage.getItem("kdad_admin_dashboard_user_token")) {
    if (
      to.name == "LoginForm" ||
      to.name == "ResetPasswordEmailForm" ||
      to.name == "PhoneVerification" ||
      to.name == "ChangePhoneNumberForm" ||
      to.name == "ResetPasswordForm"
    ) {
      return next("/home");
    } else {
      return next();
    }
  }
  return next();
});
// End:: Middleware And Router Guards

export default router;

<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper">
      <router-link class="logo" to="/home">
        <img src="@/assets/media/logo/logo.svg" alt="Logo" width="170" height="125" />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/home.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="inline" :open-keys="openKeys" @openChange="onOpenChange">
          <!-- Start:: Side Nav Tab -->
          <a-sub-menu v-for="item in sideNavbarList" :key="item.key" :data-type="!item.children ? 'single_route' : ''"
            v-if="item.hasPermission">
            <template v-if="item.children">
              <!-- ========= Start:: Main Tab -->
              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>
              <!-- ========= End:: Main Tab -->

              <!-- ========= Start:: Nested Tabs -->
              <a-menu-item v-for="childItem in item.children" :key="childItem.hey" v-if="childItem.hasPermission">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>
              <!-- ========= End:: Nested Tabs -->
            </template>

            <template v-else-if="!item.children">
              <!-- ========= Start:: Single Tab -->
              <button class="text-start d-flex w-100" slot="title" @click="$emit('fireToggleNavDrawerEmit')">
                <router-link :to="item.route">
                  <img :src="item.icon" alt="icon" width="35" height="35" />
                  <span> {{ item.title }} </span>
                </router-link>
              </button>
              <!-- ========= End:: Single Tab -->
            </template>
          </a-sub-menu>
          <!-- End:: Side Nav Tab -->

          <!-- Start:: Logout Tab -->
          <a-sub-menu key="logout" @titleClick="logoutConfirmationModalIsOpen = true">
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img src="../../assets/media/icons/ui_icons/logout.svg" alt="icon" width="35" height="35" />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn class="modal_cancel_btn" @click="logoutConfirmationModalIsOpen = false">{{ $t("BUTTONS.cancel")
            }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
    <!-- End:: Side Nav Links -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData",
      authedUserPermissions: "PermissionsModule/authedUserPermissions",
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },
    // End:: Extract Side Nav Keys
  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList: [
        // {
        //   key: "users",
        //   title: this.$t("SIDENAV.Users.title"),
        //   icon: require("@/assets/media/icons/ui_icons/users.svg"),
        //   route: "/users/all",
        // hasPermission: true,
        // },
        // {
        //   key: "notifications",
        //   title: this.$t("SIDENAV.notifications.title"),
        //   icon: require("@/assets/media/icons/ui_icons/notifications.svg"),
        //   route: "/all-notifications/all",
        //   hasPermission: true,
        // },
        // {
        //   key: "reports",
        //   title: this.$t("SIDENAV.financialReports.title"),
        //   icon: require("@/assets/media/icons/ui_icons/bill.svg"),
        //   route: "/financial-reports/all",
        //   hasPermission: false,
        // },
        {
          key: "notificationcontent",
          title: this.$t("SIDENAV.notifications.title"),
          icon: require("@/assets/media/icons/ui_icons/notifications.svg"),
          route: "/all-notifications/all",
          hasPermission: true,
        },
        {
          key: "client",
          title: this.$t("SIDENAV.Clients.title"),
          icon: require("@/assets/media/icons/ui_icons/clients.svg"),
          route: "/clients/all",
          hasPermission: true,
        },
        {
          key: "provider",
          title: this.$t("SIDENAV.Drivers.title"),
          icon: require("@/assets/media/icons/ui_icons/users.svg"),
          route: "/drivers/all",
          hasPermission: false,
          children: [
            {
              key: "index",
              title: this.$t("SIDENAV.Drivers.showAll"),
              route: "/drivers/all",
              hasPermission: false,
            },
            {
              key: "create",
              title: this.$t("SIDENAV.Drivers.add"),
              route: "/drivers/create",
              hasPermission: false,
            },
          ],
        },
        {
          key: "deactiveprovider",
          title: this.$t("PLACEHOLDERS.provider_join"),
          icon: require("@/assets/media/icons/ui_icons/users.svg"),
          route: "/drivers-join/all",
          hasPermission: false
        },
        {
          key: "walletsettlment",
          title: this.$t("PLACEHOLDERS.Requests_providers"),
          icon: require("@/assets/media/icons/ui_icons/users.svg"),
          route: "/wallet-settlment/all",
          hasPermission: false
        },
        
        // {
        //   key: "storesTypes",
        //   title: this.$t("SIDENAV.StoresTypes.title"),
        //   icon: require("@/assets/media/icons/ui_icons/store_type.svg"),
        //   route: "/stores-types/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("SIDENAV.StoresTypes.showAll"),
        //       route: "/stores-types/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("SIDENAV.StoresTypes.add"),
        //       route: "/stores-types/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        // {
        //   key: "stores",
        //   title: this.$t("SIDENAV.Stores.title"),
        //   icon: require("@/assets/media/icons/ui_icons/store.svg"),
        //   route: "/stores/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("SIDENAV.Stores.showAll"),
        //       route: "/stores/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("SIDENAV.Stores.add"),
        //       route: "/stores/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        // {
        //   key: "products",
        //   title: this.$t("SIDENAV.Products.title"),
        //   icon: require("@/assets/media/icons/ui_icons/product.svg"),
        //   route: "/products/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("SIDENAV.Products.showAll"),
        //       route: "/products/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("SIDENAV.Products.add"),
        //       route: "/products/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        // {
        //   key: "categories",
        //   title: this.$t("BUTTONS.product_section"),
        //   icon: require("@/assets/media/icons/ui_icons/category.svg"),
        //   route: "/product_category/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("BUTTONS.product_section"),
        //       route: "/product_category/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("BUTTONS.addSection"),
        //       route: "/product_category/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        // {
        //   key: "offers",
        //   title: this.$t("SIDENAV.Offers.title"),
        //   icon: require("@/assets/media/icons/ui_icons/offers.svg"),
        //   route: "/offers/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("SIDENAV.Offers.showAll"),
        //       route: "/offers/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("SIDENAV.Offers.add"),
        //       route: "/offers/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        {
          key: "order",
          title: this.$t("TITLES.orders"),
          icon: require("@/assets/media/icons/ui_icons/booking.svg"),
          route: "/orders/all",
          hasPermission: false,
          children: [
            {
              key: "index",
              title: this.$t("TITLES.orders"),
              route: "/orders/all",
              hasPermission: false,
            },
          ],
        },
        // {
        //   key: "tableReservation",
        //   title: this.$t("PLACEHOLDERS.table_reservations"),
        //   icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
        //   route: "/ordersReservations/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("PLACEHOLDERS.table_reservations"),
        //       route: "/ordersReservations/all",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        {
          key: "couponclient",
          title: this.$t("SIDENAV.Coupons_Clients.title"),
          icon: require("@/assets/media/icons/ui_icons/offers.svg"),
          route: "/coupons/all",
          hasPermission: false,
          children: [
            {
              key: "index",
              title: this.$t("SIDENAV.Coupons.showAll"),
              route: "/coupons/all",
              hasPermission: true,
            },
            {
              key: "create",
              title: this.$t("SIDENAV.Coupons.add"),
              route: "/coupons/create",
              hasPermission: true,
            },
          ],
        },
        {
          key: "couponprovider",
          title: this.$t("SIDENAV.Coupons.title"),
          icon: require("@/assets/media/icons/ui_icons/offers.svg"),
          route: "/couponspro/all",
          hasPermission: false,
          children: [
            {
              key: "index",
              title: this.$t("SIDENAV.Coupons.showAll"),
              route: "/couponspro/all",
              hasPermission: true,
            },
            {
              key: "create",
              title: this.$t("SIDENAV.Coupons.add"),
              route: "/couponspro/create",
              hasPermission: true,
            },
          ],
        },
        // {
        //   key: "packages",
        //   title: this.$t("PLACEHOLDERS.packages"),
        //   icon: require("@/assets/media/icons/ui_icons/service.svg"),
        //   route: "/packages/all",
        //   hasPermission: true,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("PLACEHOLDERS.packages"),
        //       route: "/packages/all",
        //       hasPermission: true,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("PLACEHOLDERS.add_package"),
        //       route: "/packages/create",
        //       hasPermission: true,
        //     },
        //   ],
        // },
        {
          key: "carcategory",
          title: this.$t("PLACEHOLDERS.car_modals"),
          icon: require("@/assets/media/icons/ui_icons/car.svg"),
          route: "/carModals/all",
          hasPermission: true,
          children: [
            {
              key: "index",
              title: this.$t("PLACEHOLDERS.car_modals"),
              route: "/carModals/all",
              hasPermission: true,
            },
            {
              key: "create",
              title: this.$t("PLACEHOLDERS.add_car_modal"),
              route: "/carModals/create",
              hasPermission: true,
            },
          ],
        },
        { 
          key: "cartype",
          title: this.$t("PLACEHOLDERS.car_types"),
          icon: require("@/assets/media/icons/ui_icons/car.svg"),
          route: "/carTypes/all",
          hasPermission: false,
        },
        
        { 
          key: "shipmentype",
          title: this.$t("PLACEHOLDERS.Shipment_maim_Types"),
          icon: require("@/assets/media/icons/ui_icons/trunc.svg"),
          route: "/shipment-type/all",
          hasPermission: false,
        },
        { 
          key: "shipmentsubtype",
          title: this.$t("PLACEHOLDERS.Shipment_Sub_Types"),
          icon: require("@/assets/media/icons/ui_icons/box.svg"),
          route: "/shipment-sub-type/all",
          hasPermission: false,
        },
  
        {
          key: "nationality",
          title: this.$t("PLACEHOLDERS.Nationalities"),
          icon: require("@/assets/media/icons/ui_icons/nationality.svg"),
          route: "/nationalities/all",
          hasPermission: false,
        },

        {
          key: "bank",
          title: this.$t("PLACEHOLDERS.banks"),
          icon: require("@/assets/media/icons/ui_icons/store.svg"),
          route: "/banks/all",
          hasPermission: false,
        },

        // {
        //   key: "employees",
        //   title: this.$t("PLACEHOLDERS.Store_employees"),
        //   icon: require("@/assets/media/icons/ui_icons/users.svg"),
        //   route: "/employees/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("PLACEHOLDERS.Store_employees"),
        //       route: "/employees/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("BUTTONS.addStoreEmployee"),
        //       route: "/employees/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        // {
        //   key: "regions",
        //   title: this.$t("BUTTONS.allStates"),
        //   icon: require("@/assets/media/icons/ui_icons/areas.svg"),
        //   route: "/regions/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("BUTTONS.allStates"),
        //       route: "/regions/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("BUTTONS.addStates"),
        //       route: "/regions/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        // {
        //   key: "states",
        //   title: this.$t("PLACEHOLDERS.Geographical_scope"),
        //   icon: require("@/assets/media/icons/ui_icons/addresses.svg"),
        //   route: "/states/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("BUTTONS.allStates"),
        //       route: "/states/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("BUTTONS.addStates"),
        //       route: "/states/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        {
          key: "slide",
          title: this.$t("PLACEHOLDERS.ads"),
          icon: require("@/assets/media/icons/ui_icons/image.svg"),
          route: "/ads/all",
          hasPermission: false,
        },

        {
          key: "faq",
          title: this.$t("PLACEHOLDERS.faq"),
          icon: require("@/assets/media/icons/ui_icons/module.svg"),
          route: "/faq/all",
          hasPermission: false,
        },
        {
          key: "contactusmessage",
          title: this.$t("SIDENAV.ContactMessages.title"),
          icon: require("@/assets/media/icons/ui_icons/messages.svg"),
          route: "/contact-messages/all",
          hasPermission: false,
        },
        // {
        //   key: "occasions",
        //   title: this.$t("PLACEHOLDERS.occasions"),
        //   icon: require("@/assets/media/icons/ui_icons/occasions.svg"),
        //   route: "/occasions/all",
        //   hasPermission: false,
        //   children: [
        //     {
        //       key: "index",
        //       title: this.$t("PLACEHOLDERS.occasions_all"),
        //       route: "/occasions/all",
        //       hasPermission: false,
        //     },
        //     {
        //       key: "create",
        //       title: this.$t("PLACEHOLDERS.occasions_add"),
        //       route: "/occasions/create",
        //       hasPermission: false,
        //     },
        //   ],
        // },
        {
          key: "finanicalreport",
          title: this.$t("PLACEHOLDERS.order_report"),
          icon: require("@/assets/media/icons/ui_icons/bill.svg"),
          route: "/financial-reports/all",
          hasPermission: false,

        },

        {
          key: "finanicalreport",
          title: this.$t("PLACEHOLDERS.order_notfinsh_report"),
          icon: require("@/assets/media/icons/ui_icons/bill.svg"),
          route: "/financial-not-finshed-reports/all",
          hasPermission: false,

        },
        // {
        //   key: "subscription_report",
        //   title: this.$t("PLACEHOLDERS.package_report"),
        //   icon: require("@/assets/media/icons/ui_icons/bill.svg"),
        //   route: "/packages-reports/all",
        //   hasPermission: false,

        // },
        // {
        //   key: "contactMessages",
        //   title: this.$t("SIDENAV.ContactMessages.title"),
        //   icon: require("@/assets/media/icons/ui_icons/messages.svg"),
        //   route: "/contact-messages/all",
        //   hasPermission: false,
        // },
        {
          key: "appcontent",
          title: this.$t("SIDENAV.AppContent.title"),
          icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
          hasPermission: false,
          children: [
            {
              key: "aboutUs",
              title: this.$t("SIDENAV.AppContent.aboutUs"),
              route: "/app-content/about-us",
              hasPermission: true,
            },
            {
              key: "termsAndConditions",
              title: this.$t("SIDENAV.AppContent.termsAndConditions"),
              route: "/app-content/terms",
              hasPermission: true,
            },
            {
              key: "privacyPolicy",
              title: this.$t("SIDENAV.AppContent.privacyPolicy"),
              route: "/app-content/policy",
              hasPermission: true,
            },
            {
              key: "ContactSetting",
              title: this.$t("SIDENAV.AppContent.ContactSetting"),
              route: "/app-content/ContactSetting",
              hasPermission: true,
            },
          ],
        },
        {
          key: "setting",
          title: this.$t("SIDENAV.settings.title"),
          icon: require("@/assets/media/icons/ui_icons/settings.svg"),
          route: "/settings/AppSettings",
          hasPermission: false,
        
        },
        {
          key: "ability",
          title: this.$t("SIDENAV.Roles.title"),
          icon: require("@/assets/media/icons/ui_icons/roles.svg"),
          route: "/roles/all",
          hasPermission: false,
          children: [
            {
              key: "index",
              title: this.$t("SIDENAV.Roles.showAll"),
              route: "/roles/all",
              hasPermission: false,
            },
            {
              key: "create",
              title: this.$t("SIDENAV.Roles.add"),
              route: "/roles/create",
              hasPermission: false,
            },
          ],
        },
        {
          key: "admin",
          title: this.$t("SIDENAV.Admins.title"),
          icon: require("@/assets/media/icons/ui_icons/admins.svg"),
          route: "/admins/all",
          hasPermission: false,
          children: [
            {
              key: "index",
              title: this.$t("SIDENAV.Admins.showAll"),
              route: "/admins/all",
              hasPermission: true,
            },
            {
              key: "create",
              title: this.$t("SIDENAV.Admins.add"),
              route: "/admins/create",
              hasPermission: true,
            },
          ],
        },


    ],
      // End:: Side Navbar List

      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout",
      getAuthedUserPermissions: "PermissionsModule/getAuthedUserPermissions",
    }),
    // End:: Vuex Auth Actions

    // Start:: Render Side Menu
    async renderSideMenuBasedOnUserPermissions() {
      await this.getAuthedUserPermissions();

      this.sideNavbarList.forEach(sideMenuItem => {
        // Start:: Adding Parent Tap Permission
        this.authedUserPermissions.forEach(permissionItem => {
          if (sideMenuItem.key === permissionItem.parent_key) {
            sideMenuItem.hasPermission = permissionItem.has_permission;
          }
        });
        // End:: Adding Parent Tap Permission

        // Start:: Adding Children Taps Permissions If Founded
        if (!!sideMenuItem.children) {
          sideMenuItem.children.forEach(menuItemChildren => {
            this.authedUserPermissions.forEach(permissionItem => {
              if (sideMenuItem.key === permissionItem.parent_key) {
                permissionItem.permission.forEach(childPermissionItem => {
                  if (menuItemChildren.key === childPermissionItem.key) {
                    menuItemChildren.hasPermission = childPermissionItem.has_permission;
                  }
                })
              }
            });
          })
        }
        // End:: Adding Children Taps Permissions If Founded
      });
    },
    // End:: Render Side Menu

    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs
  },

  created() {
    // Start:: Fire Methods
    this.renderSideMenuBasedOnUserPermissions();
    // End:: Fire Methods
  },
};
</script>

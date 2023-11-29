<template>
  <div class="show_all_content_wrapper" v-if="permissions">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_content_wrapper" :class="{ active: filterFormIsActive }">
        <button class="filter_toggler" @click="filterFormIsActive = !filterFormIsActive">
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>
        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">
              <!-- Start:: Name Input -->
              <base-input col="6" type="text" :placeholder="$t('TABLES.Notifications.title')"
                v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <base-select-input col="6" :optionsList="receiverTypes"
                :placeholder="$t('TABLES.Notifications.receiverType')" v-model.trim="filterOptions.receiver" />

            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("TOOLTIPS.notifications") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper" v-if="permissions.store">
          <router-link to="/all-notifications/create">
            {{ $t("BUTTONS.add_notification") }}
          </router-link>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table class="thumb" :loading="loading" :loading-text="$t('TABLES.loadingData')" :search="searchValue"
        :headers="tableHeaders" :items="tableRows" item-class="ltr" :items-per-page="paginations.items_per_page"
        hide-default-footer>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <template v-slot:[`item.id`]="{ item, index }">
          <p class="text-danger" v-if="!item.id"> {{ $t("TABLES.noData") }} </p>
          <p v-else>{{
            (paginations.current_page - 1) * paginations.items_per_page + index + 1
          }}</p>
        </template>

        <!-- Start:: Notification Content -->
        <template v-slot:[`item.message`]="{ item }">
          <span class="text-danger" v-if="!item.message"> {{ $t("TABLES.noData") }} </span>
          <div class="actions" v-else>
            <button class="btn_show" @click="showNotificationModal(item.message)">
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
        </template>
        <!-- End:: Notification Content -->

        <!-- Start:: Receiver Type Status -->
        <template v-slot:[`item.sender_type`]="{ item }">
          <v-chip v-if="item.sender_type === 'clients'" color="deep-purple darken-1" text-color="white" small>
            {{ $t("PLACEHOLDERS.clients") }}
          </v-chip>
          <v-chip v-else-if="item.sender_type === 'drivers'" color="blue-grey darken-1" text-color="white" small>
            {{ $t("PLACEHOLDERS.drivers") }}
          </v-chip>
          <v-chip v-else-if="item.sender_type === 'both'" color="info" text-color="white" small>
            {{ $t("PLACEHOLDERS.both") }}
          </v-chip>
        </template>

        <template v-slot:[`item.targets`]="{ item }">
          <span class="text-danger" v-if="!item.targets.length"> {{ $t("TABLES.noData") }} </span>
          <div class="actions" v-else>
            <div v-for="(target, index) in item.targets" :key="'p' + index">
              <v-chip v-if="target.name === 'client'" color="deep-purple darken-1" text-color="white" small>
                {{ $t("PLACEHOLDERS.client_ask") }}
              </v-chip>
              <v-chip v-else-if="target.name === 'provider'" color="blue-grey darken-1" text-color="white" small>
                {{ $t("PLACEHOLDERS.provider_ask") }}
              </v-chip>
              <!-- <v-chip v-else-if="item.sender_type === 'both'" color="info" text-color="white" small>
                {{ $t("PLACEHOLDERS.both") }}
              </v-chip> -->
            </div>

          </div>
        </template>
        <!-- End:: Receiver Type Status -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Notification Modal -->
          <description-modal v-if="dialogNotification" :modalIsOpen="dialogNotification"
            :modalDesc="selectedNotificationTextToShow" @toggleModal="dialogNotification = !dialogNotification" />
          <!-- End:: Notification Modal -->
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
          :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
            " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
    " />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllNotifications",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    receiverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.client_ask"),
          value: "client",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.provider_ask"),
          value: "provider",
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: "null",
        },
      ]
    },
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        receiver: null
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Notifications.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: true,
        },
        {
          text: this.$t("TABLES.Notifications.title"),
          value: "title",
          align: "center",
          width: "80",
          sortable: true,
        },
        {
          text: this.$t("TABLES.Notifications.notification"),
          value: "message",
          align: "center",
          width: "115",
        },
        {
          text: this.$t("TABLES.Notifications.receiverType"),
          value: "targets",
          align: "center",
          width: "80",
        },
        // {
        //   text: this.$t("TABLES.Notifications.date"),
        //   value: "created_at",
        //   align: "center",
        //   width: "150",
        // },
        {
          text: this.$t("TABLES.Notifications.time"),
          value: "time",
          align: "center",
          width: "150",
        },
        {
          text: this.$t("TABLES.Notifications.time"),
          value: "actions",
          sortable: false,
          align: "center",
          width: "150"
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogNotification: false,
      selectedNotificationTextToShow: "",
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      // Start:: Page Permissions
      permissions: null,
      // Start:: Page Permissions
    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/all-notifications/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.receiver = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/all-notifications/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter

    // Start:: Set Table Rows
    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    async setTableRows() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/notification",
          params: {
            page: this.paginations.current_page,
            title: this.filterOptions.name,
            user_type: this.filterOptions.receiver?.value
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.pagination.lastPageNumber;
        this.paginations.items_per_page = res.data.pagination.pageCount;
        this.permissions = res.data.extras;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Control Modals
    showNotificationModal(notification) {
      this.dialogNotification = true;
      this.selectedNotificationTextToShow = notification;
    },
    // End:: Control Modals

    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/all-notifications/show/${item.id}` });
    },
    // ===== End:: Show
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>

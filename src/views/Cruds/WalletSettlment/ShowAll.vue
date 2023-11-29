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
              <base-select-input col="4" :optionsList="allProviders" :placeholder="$t('PLACEHOLDERS.name_provider')"
                v-model.trim="filterOptions.providerId" />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input col="4" type="tel" :placeholder="$t('TABLES.Orders.orderNumber')"
                v-model.trim="filterOptions.code" />
              <!-- End:: Phone Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="allStatus" :placeholder="$t('TABLES.Orders.orderStatus')"
                v-model="filterOptions.isActive" />
              <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.search") }}</span>
                </template>
                <span class="submit_btn" @click="submitFilterForm" :disabled="isWaitingRequest">
                  <i class="fal fa-search"></i>
                </span>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.rseet_search") }}</span>
                </template>
                <span class="reset_btn" :disabled="isWaitingRequest" @click="resetFilter">
                  <i class="fal fa-redo"></i>
                </span>
              </a-tooltip>

            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.Requests_providers") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
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

        <template v-slot:[`item.user.id`]="{ item, index }">
          <h6 class="text-danger" v-if="!item.user.id"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ index + 1 }} </h6>
        </template>

        <template v-slot:[`item.reason`]="{ item }">
          <template>
            <h6 class="text-danger" v-if="item.reason.length === 0 || item.reason == '-'"> - </h6>
            <div class="actions" v-else>
              <button class="btn_show" @click="showReplayModal(item.reason)">
                <i class="fal fa-file-alt"></i>
              </button>
            </div>
          </template>
        </template>
        <!-- Start:: Activation Status -->
        <template v-slot:[`item.user.account_status`]="{ item }">
          <span class="text-success text-h5" v-if="item.user.account_status">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Activation Status -->
        <!-- End:: Activation -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">

            <template v-if="permissions.update">

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("MESSAGES.accept_join") }}</span>
                </template>
                <!-- @click="confirmAcceptItem" -->
                <!-- @click="selectAcceptItem(item)" -->
                <button class="btn_activate" @click="selectAcceptItem(item)">
                  <i class="fad fa-check-circle"></i>
                </button>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("MESSAGES.reject_join") }}</span>
                </template>
                <button class="btn_deactivate" @click="selectDeactivateItem(item)">
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </template>

            <template v-else>
              <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Replay Modal -->
          <description-modal v-if="dialogReplay" :modalIsOpen="dialogReplay" :modalDesc="selectedReplayTextToShow"
            @toggleModal="dialogReplay = !dialogReplay" />
          <!-- End:: Replay Modal -->

          <!-- Start:: Deactivate Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToChangeActivationStatus">
                {{ $t("TITLES.refuseConfirmingOrder", { name: itemToChangeActivationStatus.userName }) }}
              </v-card-title>

              <form class="w-100">
                <!-- <base-select-input col="12" :optionsList="availabilityStatuses" :placeholder="$t('PLACEHOLDERS.activate')"
                  v-model="filterOptions.isAvailable" /> -->
                <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.deactivateReason')"
                  v-model.trim="deactivateReason" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="HandlingItemActivationStatus">
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDeactivate = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Deactivate Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                <span>{{ $t('PLACEHOLDERS.current_balance') }} : </span>
                <span>{{ itemToDelete.balance }}</span>
              </v-card-title>

              <form class="w-100">

                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.balance_package')"
                  v-model.trim="balance_package" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmAcceptItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->
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
  name: "AllClients",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.accepted"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.canceled"),
          value: 0,
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
        },
      ];
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
        providerId: null,
        code: null,
        isActive: null,
      },
      allProviders: [],
      allStatus: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Clients.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.name_provider"),
          value: "userName",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Orders.orderNumber"),
          value: "status.id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Orders.orderStatus"),
          value: "status.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.reason_reject"),
          value: "reason",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Orders.orderDate"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      permissions: [],

      status_now: null,

      // Start:: Dialogs Control Data
      dialogReplay: false,
      selectedReplayTextToShow: "",
      dialogImage: false,
      selectedItemImage: null,
      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
      dialogDelete: false,
      itemToDelete: null,
      // End:: Dialogs Control Data
      status_now: null,

      balance_package: null

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
        await this.$router.push({ path: '/wallet-settlment/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.code = null;
      this.filterOptions.providerId = null;
      this.filterOptions.isActive = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/wallet-settlment/all', query: { page: 1 } });
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
          url: "modules/wallet-settlment",
          params: {
            page: this.paginations.current_page,
            providerId: this.filterOptions.providerId?.id,
            status: this.filterOptions.isActive?.name,
            code: this.filterOptions.code,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.pagination.lastPageNumber;
        this.paginations.items_per_page = res.data.pagination.pageCount;
        this.permissions = res.data.extras.abilities;
        this.allProviders = res.data.extras.providers;
        this.allStatus = res.data.extras.statuses;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      console.log(item)
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },

    async HandlingItemActivationStatus() {
      this.dialogDeactivate = false;

      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("balance", this.itemToChangeActivationStatus.balance);
      REQUEST_DATA.append("reason", this.deactivateReason);
      REQUEST_DATA.append("is_accepted", 0);
      REQUEST_DATA.append("_method", "PUT");

      try {

        await this.$axios({
          method: "POST",
          url: `modules/wallet-settlment/${this.itemToChangeActivationStatus.id}`,
          data: REQUEST_DATA,
        });
        this.$message.success(this.$t("MESSAGES.reject_join_message"));
        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;

      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation

    // Start:: Control Modals
    showReplayModal(replay) {
      this.dialogReplay = true;
      this.selectedReplayTextToShow = replay;
    },
    // End:: Control Modals

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/wallet-settlment/show/${item.user.id}` });
    },
    // ===== End:: Show

    selectAcceptItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmAcceptItem(item) {

      const REQUEST_DATA = new FormData();
      REQUEST_DATA.append("balance", this.balance_package);
      REQUEST_DATA.append("is_accepted", true);
      REQUEST_DATA.append("_method", "PUT");

      try {
        await this.$axios({
          method: "POST",
          url: `modules/wallet-settlment`,
          data: REQUEST_DATA,
        });
        // this.dialogDelete = false;
        this.balance_package = null,
          this.setTableRows();
        this.$message.success(this.$t("MESSAGES.verifiedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ==================== End:: Crud ====================
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
<style>
span.submit_btn {
  width: 45px;
  height: 45px;
  font-size: 16px;
  border-radius: 10px;
  color: var(--white_clr);
  transition: all 0.3s linear;
  background-color: #F6A513;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
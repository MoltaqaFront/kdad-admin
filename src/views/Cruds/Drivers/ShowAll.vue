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
              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.name_provider')"
                v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="filterOptions.phone" />
              <!-- End:: Phone Input -->

              <!-- Start:: email Input -->
              <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="filterOptions.email" />
              <!-- End:: email Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="MainActiveStatuses" :placeholder="$t('PLACEHOLDERS.active_status')"
                v-model="filterOptions.active_status" />
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
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
              <!-- <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button> -->

              <!-- <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button> -->
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("PLACEHOLDERS.providers") }}</h5>
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

        <template v-slot:[`item.user.email`]="{ item, index }">
          <h6 class="text-danger" v-if="!item.user.email"> - </h6>
          <h6 v-else> {{ item.user.email }} </h6>
        </template>

        <!-- Start:: Name -->
        <template v-slot:[`item.user.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.user.name"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ item.user.name }} </h6>
        </template>
        <!-- End:: Name -->

        <template v-slot:[`item.user.is_active`]="{ item }">
          <span class="text-success " v-if="item.user.is_active">
            <v-chip color="blue-grey darken-3" text-color="white" small>
              {{ $t('PLACEHOLDERS.active_st') }}
            </v-chip>
          </span>
          <span class="text-danger" v-else>
            <v-chip color="blue-grey darken-3" text-color="white" small>
              {{ $t('PLACEHOLDERS.active_st_dis') }}
            </v-chip>
          </span>
        </template>

        <!-- Start:: Activation -->
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

            <a-tooltip placement="bottom" v-if="permissions.show">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <template v-if="permissions.activiate">
              <a-tooltip placement="bottom" v-if="!item.user.account_status">
                <template slot="title">
                  <span>{{ $t("BUTTONS.activate") }}</span>
                </template>
                <button class="btn_activate" @click="HandlingItemActivationStatus(item)">
                  <i class="fad fa-check-circle"></i>
                </button>
              </a-tooltip>
              <a-tooltip placement="bottom" v-if="item.user.account_status">
                <template slot="title">
                  <span>{{ $t("BUTTONS.deactivate") }}</span>
                </template>
                <button class="btn_deactivate" @click="selectDeactivateItem(item)">
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </template>

            <a-tooltip placement="bottom" v-if="permissions.destroy">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="permissions.show">
              <template slot="title">
                <span>{{ $t("PLACEHOLDERS.wallet_driver") }}</span>
              </template>
              <button class="btn_show" @click="selectWalletItem(item)">
                <i class="fas fa-wallet"></i>
              </button>
            </a-tooltip>

            <template v-else>
              <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>

          <!-- Start:: Wallet Modal -->
          <v-dialog v-model="dialogWallet">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToWallet">
                <span>{{ $t('PLACEHOLDERS.current_balance') }} : </span>
                <span>{{ itemToWallet.user.wallet.balance }}</span>
              </v-card-title>

              <v-card-actions>
                <v-btn class="modal_cancel_btn" @click="dialogWallet = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Wallet Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.user.name }) }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmDeleteItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->

          <!-- Start:: Deactivate Modal -->
          <v-dialog v-model="dialogDeactivate">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToChangeActivationStatus">
                {{ $t("TITLES.DeactivateConfirmingMessage", { name: itemToChangeActivationStatus.user.name }) }}
              </v-card-title>

              <form class="w-100">
                <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.deactivateReason')"
                  v-model.trim="deactivateReason" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="HandlingItemActivationStatus" :disabled="!(!!deactivateReason)">
                  {{ $t("BUTTONS.ok") }}
                </v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDeactivate = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Deactivate Modal -->

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
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
        },
      ];
    },

    MainActiveStatuses() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.active_st"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.active_st_dis"),
          value: 0,
        },
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
        },
      ];
    },
    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
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
        name: null,
        phone: null,
        email: null,
        active_status: null,
        isActive: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Clients.serialNumber"),
          value: "user.id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.name_provider"),
          value: "user.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.phone"),
          value: "user.mobile",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.email"),
          value: "user.email",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.joiningDate"),
          value: "user.created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.active_status"),
          value: "user.is_active",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.active"),
          value: "user.account_status",
          align: "center",
          width: "120",
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

      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,

      // Start:: Dialogs Control Data
      dialogDelete: false,
      itemToDelete: null,
      dialogWallet: false,
      itemToWallet: null,
      // End:: Dialogs Control Data

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
        await this.$router.push({ path: '/drivers/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      this.filterOptions.email = null;
      this.filterOptions.active_status = null;
      this.filterOptions.isActive = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/drivers/all', query: { page: 1 } });
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

        let nameParam = this.filterOptions.name;
        if (!nameParam) {
          nameParam = null;
        }

        let res = await this.$axios({
          method: "GET",
          url: "modules/provider",
          params: {
            page: this.paginations.current_page,
            name: nameParam,
            mobile: this.filterOptions.phone,
            email: this.filterOptions.email,
            availability_status: this.filterOptions.active_status?.value,
            account_status: this.filterOptions.isActive?.value,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
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

    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },
    async HandlingItemActivationStatus(selectedItem) {
      this.dialogDeactivate = false;
      let targetItem = this.itemToChangeActivationStatus ? this.itemToChangeActivationStatus : selectedItem;
      const REQUEST_DATA = {};
      // Start:: Append Request Data
      REQUEST_DATA.deactive_reason = this.deactivateReason;
      // Start:: Append Request Data

      if (targetItem.user.account_status == true) {
        this.status_now = 0
      } else {
        this.status_now = 1
      }

      try {
        await this.$axios({
          method: "PUT",
          url: `modules/provider/activate/${targetItem.user.id}?account_status=${this.status_now}`,
          data: targetItem.user.account_status ? REQUEST_DATA : null,
        });
        
        this.setTableRows();
        this.itemToChangeActivationStatus = null;
        this.deactivateReason = null;
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/drivers/show/${item.user.id}` });
    },
    // ===== End:: Show

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `modules/provider/${this.itemToDelete.user.id}`,
        });
        this.dialogDelete = false;
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete

    selectWalletItem(item) {
      this.dialogWallet = true;
      this.itemToWallet = item;
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
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
              <!-- Start:: Order Number Input -->
              <base-input col="4" type="number" :placeholder="$t('PLACEHOLDERS.orderNumber')"
                v-model="filterOptions.orderNumber" />
              <!-- End:: Order Number Input -->

              <!-- Start:: Order Type Input -->
              <base-select-input col="4" :optionsList="allOrders" :placeholder="$t('PLACEHOLDERS.orderType')"
                v-model="filterOptions.orderType" />
              <!-- End:: Order Type Input -->

              <!-- Start:: Client Name Input -->
              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.clientName')"
                v-model="filterOptions.clientName" />
              <!-- End:: Client Name Input -->

              <!-- Start:: Driver Name Input -->
              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.clientPhone')"
                v-model="filterOptions.clientPhone" />
              <!-- End:: Driver Name Input -->

              <base-select-input col="4" :optionsList="allStores" :placeholder="$t('PLACEHOLDERS.store')"
                v-model="filterOptions.store_id" />

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="allStatus" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.status" />
              <!-- End:: Status Input -->

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
          <h5>{{ $t("TITLES.orders") }}</h5>

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

        <!-- Start:: Service -->
        <!-- <template v-slot:[`item.service`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.service">-</p>
          <v-chip v-else color="light-blue darken-2" text-color="white" small>
            {{ item.service_type }} - {{ item.service }}
          </v-chip>
        </template> -->
        <!-- End:: Service -->

        <template v-slot:[`item.order_type.id`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.order_type.id"> {{ $t("TABLES.noData") }} </h6>
            <p v-else>{{ (paginations.current_page - 1) * paginations.items_per_page + index + 1 }}</p>
          </div>
        </template>

        <!-- Start:: Driver -->
        <template v-slot:[`item.driver.name`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.driver">-</p>
          <p v-else>{{ item.driver.name }}</p>
        </template>
        <!-- End:: Driver -->

        <!-- Start:: Price -->
        <!-- <template v-slot:[`item.total`]="{ item }">
          <p class="text-success fs-3" v-if="item.total">-</p>
          <p class="text-success fs-6" v-else>{{ item.total }}</p>
        </template> -->
        <!-- End:: Price -->

        <!-- Start:: Order Status -->
        <template v-slot:[`item.status_text`]="{ item }">
          <v-chip color="secondary" text-color="white" small>
            {{ item.status_text }}
          </v-chip>
          <!-- <v-chip v-else-if="item.status === 'approved'" color="deep-purple darken-1" text-color="white" small>
            {{ $t("STATUS.approved") }}
          </v-chip>
          <v-chip v-else-if="item.status === 'in_way'" color="orange darken-4" text-color="white" small>
            {{ $t("STATUS.inWay") }}
          </v-chip>
          <v-chip v-else-if="item.status === 'processing'" color="yellow darken-3" text-color="white" small>
            {{ $t("STATUS.processing") }}
          </v-chip>
          <v-chip v-else-if="item.status === 'done'" color="green darken-1" text-color="white" small>
            {{ $t("STATUS.done") }}
          </v-chip>
          <v-chip v-else-if="item.status === 'cancelled'" color="red darken-2" text-color="white" small>
            {{ $t("STATUS.canceled") }}
          </v-chip> -->
        </template>
        <!-- Start:: Order Status -->

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

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>

              <button class="btn_edit" @click="selectDeleteItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <!-- <a-tooltip placement="bottom" v-if="permissions.delete">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip> -->

            <!-- <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.download_invoice") }}</span>
              </template>
              <button class="btn_show" @click="DownloadInvoice(item)">
                <i class="fal fa-download"></i>
              </button>
            </a-tooltip> -->

            <template v-if="!permissions.show && !permissions.delete">
              <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center w-100" v-if="itemToDelete">
                {{ $t("MESSAGES.changeItem", { name: itemToDelete.id }) }}


                <div class="filter_form_wrapper w-100">
                  <form class="w-100">
                    <base-select-input col="12" :optionsList="allStatusReservation"
                      :placeholder="$t('PLACEHOLDERS.status')" v-model="status_modal" />

                    <div class="form-group"
                      v-if="(status_modal && status_modal.key == 'rejected') || (status_modal && status_modal.key == 'canceled')">
                      <base-input col="12" rows="3" type="textarea" :placeholder="$t('PLACEHOLDERS.reason')"
                        v-model="reason" required />
                    </div>

                  </form>
                </div>


              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmChangeStatus">{{
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
  name: "AllOrders",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    clientTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.typeClient"),
          value: "client",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.typeGuest"),
          value: "guest",
        },
      ];
    },

    orderTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.typeProduct"),
          value: "delivery",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.typeService"),
          value: "pickup",
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
        orderNumber: null,
        orderType: null,
        clientName: null,
        clientPhone: null,
        store_id: null,
        status: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {

          text: this.$t("TABLES.Offers.serialNumber"),
          value: "order_type.id",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.orderNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },

        {
          text: this.$t("TABLES.Orders.clientName"),
          value: "user.name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.clientPhone"),
          value: "user.phone",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.orderType"),
          value: "order_type.title",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.store"),
          value: "store.title",
          align: "center",
        },
        // {
        //   text: this.$t("TABLES.Orders.driverName"),
        //   value: "driver.name",
        //   align: "center",
        // },
        {
          text: this.$t("PLACEHOLDERS.order_price"),
          value: "total",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.orderStatus"),
          value: "status_text",
          align: "center",
          sortable: false,
          width: "120",
        },
        {
          text: this.$t("TABLES.Orders.orderDate"),
          value: "created_at",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogDelete: false,
      itemToDelete: null,
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
      allStores: [],
      allStatus: [],
      allStatus_popup: [],

      status_modal: null,

      allStatusReservation: [],

      reason: '',

      allOrders: ''

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
      // if (!this.filterOptions.startDate && this.filterOptions.endDate) {
      //   this.$message.error(this.$t("VALIDATION.startDate"));
      //   return;
      // } else if (this.filterOptions.startDate && !this.filterOptions.endDate) {
      //   this.$message.error(this.$t("VALIDATION.endDate"));
      //   return;
      // } else {
      //   if (this.$route.query.page !== '1') {
      //     await this.$router.push({ path: '/orders/all', query: { page: 1 } });
      //   }
      //   this.setTableRows();
      // }


      this.setTableRows();

    },
    async resetFilter() {

      this.filterOptions.orderNumber = null;
      this.filterOptions.orderType = null;
      this.filterOptions.clientName = null;
      this.filterOptions.clientPhone = null;
      this.filterOptions.status = null;
      this.filterOptions.store_id = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/ordersReservations/all', query: { page: 1 } });
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
          url: "admin/reservation",

          params: {
            page: this.paginations.current_page,
            id: this.filterOptions.orderNumber,
            order_type: this.filterOptions.orderType?.id,
            user_name: this.filterOptions.clientName,
            user_phone: this.filterOptions.clientPhone,
            status: this.filterOptions.status?.key,
            store_id: this.filterOptions.store_id?.id,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.body.reservation;
        this.paginations.last_page = res.data.body.meta.last_page;
        this.paginations.items_per_page = res.data.body.meta.per_page;
        this.permissions = res.data.body.permissions;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/ordersReservations/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== Start:: Edit
    editItem(item) {
      console.log(item.service_id)
      this.$router.push({
        path: `/ordersReservations/edit/${item.id}`,
        query: { service_id: `${item.service_id}` }
      });
    },
    // ===== End:: Edit

    // ===== End:: download pdf
    DownloadInvoice(item) {
      // Generate the URL for the file to be downloaded
      const fileUrl = item.invoice;
      // Open the URL in a new window or tab
      window.open(fileUrl, '_self');
    },

    // ===== End:: download pdf

    // ===== Start:: Delete

    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    async confirmChangeStatus() {
      try {

        const requestData = {
          status: this.status_modal.key
        };

        if (this.reason.trim() !== '') {
          requestData.reason = this.reason.trim();
        }

        await this.$axios({
          method: "PUT",
          url: `admin/reservation/${this.itemToDelete.id}`,
          data: requestData
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete.id;
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
      }
    },

    // ===== End:: Delete

    async getAllStatusReservation() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/get-reservation-order-status",
        });
        this.allStatus = res.data.body.status;
        this.allStatusReservation = res.data.body.status;
        console.log(res.data.body.status)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/get-stores",
          params: {
            store_types: "reservation"
          }
        });
        this.allStores = res.data.body.stores;
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllOrders() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores/types/categories",
        });
        this.allOrders = res.data.body.orderTypes;
        this.allOrders.splice(0, 3);

        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
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
    this.getAllStores();
    this.getAllStatusReservation();
    this.getAllOrders()
    // End:: Fire Methods
  },
};
</script>

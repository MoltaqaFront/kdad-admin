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
              <base-input col="4" type="text" :placeholder="$t('TABLES.Orders.orderNumber')"
                v-model="filterOptions.orderNumber" />
              <!-- End:: Order Number Input -->


              <!-- Start:: Driver Name Input -->
              <!-- <base-select-input col="4" :optionsList="clients_list" :placeholder="$t('PLACEHOLDERS.clientName')"
                v-model="filterOptions.driver_name" /> -->
              <!-- End:: Driver Name Input -->

              <!-- Start:: Client Name Input -->
              <base-select-input col="4" type="text" :optionsList="clients_list"
                :placeholder="$t('PLACEHOLDERS.clientName')" v-model="filterOptions.clientName" />
              <!-- End:: Client Name Input -->

              <!-- Start:: Driver Name Input -->
              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.clientPhone')"
                v-model="filterOptions.driverPhone" />
              <!-- End:: Driver Name Input -->

              <base-select-input col="4" :optionsList="providers_name" :placeholder="$t('TABLES.Orders.providername')"
                v-model="filterOptions.providers_name" />

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

        <!-- <template v-slot:[`item.id`]="{ item, index }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.id">-</p>
          <p v-else>{{ (paginations.current_page - 1) * paginations.items_per_page + index + 1 }}</p>
        </template> -->

        <template v-slot:[`item.store`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.store">-</p>
          <p v-else>{{ item.store.title }}</p>
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
        <template v-slot:[`item.status.name`]="{ item }">
          <v-chip color="secondary" text-color="white" small>
            {{ item.status.name }}
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

            <!-- <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>

              <button class="btn_edit" @click="selectDeleteItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip> -->

            <!-- <a-tooltip placement="bottom" v-if="permissions.delete">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip> -->

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.download_invoice") }}</span>
              </template>
              <!-- @click="DownloadInvoice(item)" -->
              <button class="btn_show" @click="DownloadInvoice(item)">
                <i class="fal fa-download"></i>
              </button>
            </a-tooltip>

            <template v-if="!permissions.show && !permissions.delete">
              <i class="fal fa-lock-alt fs-5 blue-grey--text text--darken-1"></i>
            </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
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

    <!-- Start:: Generate PDF Template Content -->
    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
      filename="report" :pdf-quality="2" pdf-format="a4" :manual-pagination="false" :paginate-elements-by-height="1400"
      pdf-content-width="100%" @progress="bdfDownloadBtnIsLoading = true"
      @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))" ref="html2Pdf">
      <section slot="pdf-content">
        <div class="pdf_file_content">
          <!-- <tr v-for="(value, key) in itemReport" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr> -->

          <table class="table table-striped">
            <tbody>

              <tr class="text-center">
                <td>
                  <span v-html="orderData.qr"></span>
                  <span>{{ $t("PLACEHOLDERS.qr") }}</span>
                </td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.serial_num") }}</td>
                <td>{{ orderData.id }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Products.created_at") }}</td>
                <td>{{ orderData.created_at }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Orders.providername") }}</td>
                <td>{{ orderData.provider_name }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Orders.provideraddress") }}</td>
                <td>{{ orderData.provider_add }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipment_type") }}</td>
                <td>{{ orderData.shipment_type }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipment_sub_type") }}</td>
                <td>{{ orderData.shipment_sub_type }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipment_length") }}</td>
                <td>{{ orderData.length }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipment_width") }}</td>
                <td>{{ orderData.width }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipment_height") }}</td>
                <td>{{ orderData.height }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipment_weight") }}</td>
                <td>{{ orderData.weight }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.Shipmen_desc") }}</td>
                <td>{{ orderData.description }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.car_plate") }}</td>
                <td>{{ orderData.car_plate }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.price_dan_vat") }}</td>
                <td>{{ orderData.price }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Coupons.code") }}</td>
                <td>{{ orderData.code }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Offers.priceAfterDiscount") }}</td>
                <td>{{ orderData.price_after_disc }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("PLACEHOLDERS.taxPercentage") }}</td>
                <td>{{ orderData.vat }}</td>
              </tr>

              <tr class="text-center">
                <td>{{ $t("TABLES.Orders.totalPrice") }}</td>
                <td>{{ orderData.price_vat }}</td>
              </tr>

            </tbody>
          </table>

        </div>
      </section>
    </vue-html2pdf>
    <!-- End:: Generate PDF Template Content -->

  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import { mapGetters } from "vuex";

export default {
  name: "AllOrders",

  components: {
    VueHtml2pdf
  },

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
        {
          id: null,
          name: this.$t("STATUS.all"),
          value: null,
        },
      ];
    },

  },

  data() {
    return {
      orderData: {
        id: null,
        qr: null,
        code: null,
        created_at: null,
        provider_name: null,
        provider_add: null,
        shipment_type: null,
        shipment_sub_type: null,
        length: null,
        width: null,
        height: null,
        weight: null,
        description: null,
        car_plate: null,
        price: null,
        price_after_disc: null,
        vat: null,
        price_vat: null,
      },
      itemReportCode: "",
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
        driverPhone: null,
        providers_name: null,
        status: null,
      },
      clients_list: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Orders.orderNumber"),
          value: "id",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("PLACEHOLDERS.codeOrders"),
          value: "code",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.clientName"),
          value: "client.name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.providername"),
          value: "provider.name",
          sortable: false,
          align: "center",
        },
        {
          text: this.$t("TABLES.Orders.orderprice"),
          value: "finalPrice",
          sortable: false,
          align: "center",
          width: "140"
        },
        // {
        //   text: this.$t("TABLES.Orders.orderType"),
        //   value: "order_type.title",
        //   sortable: false,
        //   align: "center",
        // },
        // {
        //   text: this.$t("PLACEHOLDERS.store"),
        //   value: "store",
        //   sortable: false,
        //   align: "center",
        // },
        // {
        //   text: this.$t("TABLES.Orders.service"),
        //   value: "service",
        //   align: "center",
        // },
        // {
        //   text: this.$t("TABLES.Orders.driverName"),
        //   value: "driver.name",
        //   sortable: false,
        //   align: "center",
        // },
        // {
        //   text: this.$t("TABLES.Orders.totalPrice"),
        //   value: "total",
        //   sortable: false,
        //   align: "center",
        // },
        {
          text: this.$t("TABLES.Orders.orderStatus"),
          value: "status.name",
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
      providers_name: [],
      allStatus: [],
      allStatus_popup: [],
      allOrderTypes: [],
      AllDrivers: [],

      status_modal: null,
      reason: '',

      itemReport: [],
      itemReportUserName: null,
      itemReportClientPhone: null,
      itemReportOrderType: null,
      itemReportDriverName: null,
      itemReportTotalPrice: null,
      itemReportOrderStatus: null,
      itemReportOrderDate: null,

      is_finished: null,
      providers_id: null,

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
      this.setTableRows();
    },
    async resetFilter() {

      this.filterOptions.orderNumber = null;
      this.filterOptions.orderType = null;
      this.filterOptions.clientName = null;
      this.filterOptions.driverName = null;
      this.filterOptions.driverPhone = null;
      this.filterOptions.status = null;
      this.filterOptions.providers_name = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/orders/all', query: { page: 1 } });
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
      const { query } = this.$route;

      if (query.is_finished) {
        this.is_finished = 1
      } else {
        this.is_finished = null
      }

      if (query.providerId) {
        this.providers_id = query.providerId;
      } else {
        this.providers_id = this.filterOptions.providers_name?.id
      }


      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/order",
          params: {
            page: this.paginations.current_page,
            id: this.filterOptions.orderNumber,
            clientId: this.filterOptions.clientName?.id,
            mobile: this.filterOptions.driverPhone,
            status: this.filterOptions.status?.key,
            providerId: this.providers_id,
            is_finished: this.is_finished

          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.pagination.lastPageNumber;
        this.paginations.items_per_page = res.data.pagination.pageCount;
        this.permissions = res.data.extras.abilities;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/orders/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== Start:: Edit
    editItem(item) {
      console.log(item.service_id)
      this.$router.push({
        path: `/orders/edit/${item.id}`,
        query: { service_id: `${item.service_id}` }
      });
    },
    // ===== End:: Edit

    // ===== End:: download pdf
    async DownloadInvoice(item) {
      try {
        // Fetch data for the specific order using item.id
        let res = await this.$axios({
          method: "GET",
          url: `modules/order/receipt/${item.id}`,
        });
        this.orderData.id = res.data.data.id;
        this.orderData.qr = res.data.data.qr;
        console.log(this.orderData.qr)
        this.orderData.code = res.data.data.coupon_code;
        this.orderData.created_at = res.data.data.created_at;
        this.orderData.provider_name = res.data.data.provider_name;
        this.orderData.provider_add = res.data.data.provider_address;
        this.orderData.shipment_type = res.data.data.shipment_type;
        this.orderData.shipment_sub_type = res.data.data.shipment_sub_type;
        this.orderData.length = res.data.data.length;
        this.orderData.width = res.data.data.width;
        this.orderData.height = res.data.data.height;
        this.orderData.weight = res.data.data.weight;
        this.orderData.description = res.data.data.description;
        this.orderData.car_plate = res.data.data.serial_number;
        this.orderData.price = res.data.data.price;
        this.orderData.price_after_disc = res.data.data.price_discount;
        this.orderData.vat = res.data.data.vat;
        this.orderData.price_vat = res.data.data.price_vat;
        this.downloadPdf();
      }
      catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }

    },


    // ===== End:: download pdf
    // Start:: Handling Download Files
    async downloadPdf(item) {
      // Generate the PDF
      await this.$refs.html2Pdf.generatePdf();
      this.pdfDownloadBtnIsLoading = false;
    },
    // End:: Handling Download Files

    // ===== Start:: Delete

    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
      // console.log(item);
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
          url: `admin/orders/${this.itemToDelete.id}`,
          data: requestData // Put the data in the 'data' property
        });

        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => item.id !== this.itemToDelete.id);
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
      }
    },

    // ===== End:: Delete

    // async getAllStatus() {
    //   this.loading = true;
    //   try {
    //     let res = await this.$axios({
    //       method: "GET",
    //       url: "admin/get-status",
    //     });
    //     this.allStatus = res.data.body.status;
    //     this.allStatus_popup = res.data.body.status;
    //     this.allStatus.unshift({ value: null, id: null, name: `${this.$t("STATUS.all")}` });
    //     console.log(res.data.body.status)
    //   } catch (error) {
    //     this.loading = false;
    //     console.log(error.response.data.message);
    //   }
    // },

    async getOrderTypes() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/order",
        });
        this.allStatus = res.data.extras.statuses;
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllClients() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/order/clients",
        });
        this.clients_list = res.data.data;
        // this.AllDrivers.unshift({ value: null, id: null, name: `${this.$t("STATUS.all")}` });s
        console.log(res.data.data)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async getAllDrivers() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "modules/order",
        });
        this.providers_name = res.data.extras.providers;
        this.allStores.unshift({ value: null, id: null, name: `${this.$t("STATUS.all")}` });
        console.log(res.data.body.stores)
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
    this.getAllClients()
    this.getAllDrivers();
    this.getOrderTypes();
    // End:: Fire Methods
  },
};
</script>

<style lang="scss">
.table-striped {
  margin-top: 50px;

  tbody {

    tr {
      &:nth-child(odd) {
        background-color: #EEE !important;
      }
    }

  }
}
</style>
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

              <base-input col="3" type="text" :placeholder="$t('BUTTONS.offer')" v-model="filterOptions.offer_name"
                required />

              <base-select-input col="3" :optionsList="allOrders" :placeholder="$t('PLACEHOLDERS.orderType')"
                v-model="filterOptions.orderType" required />

              <base-select-input col="3" :optionsList="allStores" :placeholder="$t('PLACEHOLDERS.storeType')"
                v-model="filterOptions.storeType" required />

              <!-- Start:: Status Input -->
              <base-select-input col="3" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
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
          <h5>{{ $t("BUTTONS.offers") }}</h5>

          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>
        <div class="title_route_wrapper" v-if="permissions.create">
          <router-link to="/offers/create">
            {{ $t("BUTTONS.addOffer") }}
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

        <!-- Start:: Product -->
        <template v-slot:[`item.product`]="{ item }">
          <p v-if="!item.product || item.product.length === 0">-</p>
          <template v-else>
            <div v-for="productItem in item.product" :key="productItem.id">
              <p>{{ productItem.store ? productItem.store.name : '-' }}</p>
            </div>
          </template>
        </template>
        <!-- End:: Product -->

        <!-- Start:: Service -->
        <template v-slot:[`item.id`]="{ item, index }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.id">-</p>
          <p v-else>{{ (paginations.current_page - 1) * paginations.items_per_page + index + 1 }}</p>
        </template>
        <template v-slot:[`item.service`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.service">-</p>
          <p v-else>{{ item.service.name }}</p>
        </template>
        <!-- End:: Service -->

        <!-- Start:: Price Before Discount -->
        <template v-slot:[`item.price_before_discount`]="{ item }">
          <p class="text-danger fs-3" v-if="!item.price_before_discount">-</p>
          <p class="text-danger fs-6" v-else>{{ item.price_before_discount }}</p>
        </template>
        <!-- End:: Price Before Discount -->

        <!-- Start:: Price After Discount -->
        <template v-slot:[`item.price_after_discount`]="{ item }">
          <p class="text-success fs-3" v-if="!item.price_after_discount">-</p>
          <p class="text-success fs-6" v-else>{{ item.price_after_discount }}</p>
        </template>
        <!-- End:: Price After Discount -->

        <!-- Start:: Activation -->
        <template v-slot:[`item.is_active`]="{ item }">
          <div class="activation" dir="ltr" style="z-index: 1" v-if="permissions.activate">
            <v-switch class="mt-2" color="success" v-model="item.is_active" hide-details
              @change="changeActivationStatus(item)"></v-switch>
          </div>

          <template v-else>
            <span class="text-success text-h5" v-if="item.is_active">
              <i class="far fa-check"></i>
            </span>
            <span class="text-danger text-h5" v-else>
              <i class="far fa-times"></i>
            </span>
          </template>
        </template>
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
            <a-tooltip placement="bottom" v-if="permissions.edit && item.can_edit">
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="permissions.delete && item.can_delete">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>

            <template v-if="!permissions.edit && !permissions.delete">
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
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.id }) }}
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllOffers",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      allProducts: "ApiGetsModule/allProductsData",
      allServices: "ApiGetsModule/allServicesData",
    }),

    activeStatuses() {
      return [
        {
          id: null,
          name: this.$t("STATUS.all"),
          value: null,
        },
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        }

      ];
    },
    offerTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.product"),
          value: "product",
        },
        {
          id: 2,
          name: this.$t("PLACEHOLDERS.service"),
          value: "service",
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
        offer_name: null,
        orderType: null,
        storeType: null,
        status: null,
      },

      allStores: [],
      allOrders: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Offers.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("BUTTONS.offer"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.offer_type"),
          value: "type.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.offer_percentage"),
          value: "discount",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Offers.startDate"),
          value: "start_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Offers.endDate"),
          value: "end_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.store"),
          value: "store.title",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Products.created_at"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Offers.activation"),
          value: "is_active",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Offers.actions"),
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
    // Start:: Vuex Actions
    ...mapActions({
      getProducts: "ApiGetsModule/getProducts",
      getServices: "ApiGetsModule/getServices",
    }),
    // End:: Vuex Actions

    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/offers/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.offer_name = null;
      this.filterOptions.orderType = null;
      this.filterOptions.storeType = null;
      this.filterOptions.status = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/offers/all', query: { page: 1 } });
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
          url: "admin/offers",
          params: {
            page: this.paginations.current_page,
            offer_name: this.filterOptions.offer_name,
            type: this.filterOptions.orderType?.id,
            store_id: this.filterOptions.storeType?.id,
            is_active: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.body.offers;
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
    // ===== Start:: Edit
    editItem(item) {
      this.$router.push({ path: `/offers/edit/${item.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/offers/show/${item.id}` });
    },
    // ===== End:: Edit

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `admin/offers/${this.itemToDelete.id}`,
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete.id;
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete
    // ==================== End:: Crud ====================

    // Start:: Change Activation Status

    async changeActivationStatus(item) {
      try {
        await this.$axios({
          method: "PUT",
          url: `admin/offers/${item.id}/activate`,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

    // End:: Change Activation Status

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores",
        });
        this.allStores = res.data.body.stores;
        this.allStores.unshift({ name: this.$t("STATUS.all"), id: null, value: null });
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
        this.allOrders.unshift({ name: this.$t("STATUS.all"), id: null, value: null });
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.getProducts();
    this.getServices();
    this.setTableRows();
    this.getAllStores();
    this.getAllOrders()
    // End:: Fire Methods
  },
};
</script>

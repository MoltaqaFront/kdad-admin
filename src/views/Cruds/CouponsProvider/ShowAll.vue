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
              <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

            <!-- Start:: storename Input -->
            <base-input col="4" type="text" :placeholder="$t('PLACEHOLDERS.store')" v-model.trim="filterOptions.storename" />
              <!-- End:: storename Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.isActive" />
              <!-- End:: Status Input -->

              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="usedStatuses" :placeholder="$t('PLACEHOLDERS.used_s_options')"
                v-model="filterOptions.isUsed" />
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
          <h5>{{ $t("TITLES.coupons") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper" v-if="permissions.store">
          <router-link to="/couponspro/create">
            {{ $t("BUTTONS.addCoupon") }}
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
          <p v-else>{{ index + 1 }}</p>
        </template>

        <!-- Start:: Title -->
        <template v-slot:[`item.title`]="{ item }">
          <p class="text-danger" v-if="!item.title"> {{ $t("TABLES.noData") }} </p>
          <p v-else>{{ item.title }}</p>
        </template>
        <!-- End:: Title -->

        <!-- Start:: is_used -->
        <template v-slot:[`item.is_used`]="{ item }">
          <p class="text-danger" v-if="!item.is_used"> {{ $t("TABLES.notused") }} </p>
          <p v-else>{{ $t("TABLES.used")  }}</p>
        </template>
        <!-- End:: is_used -->

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

            <a-tooltip placement="bottom" v-if="permissions.update">
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="permissions.destroy">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>

            <template v-if="!permissions.update && !permissions.destroy">
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
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.name }) }}
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
import { mapGetters } from "vuex";

export default {
  name: "AllCoupons",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: 3,
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
        },
      ];
    },
    usedStatuses() {
      return [
        {
          id: 3,
          name: this.$t("STATUS.all"),
          value: null,
        },
        {
          id: 1,
          name: this.$t("STATUS.used"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notused"),
          value: 0,
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
        storename: null,
        isActive: null,
        isUsed: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Coupons.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Coupons.coupon"),
          value: "title",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Coupons.code"),
          value: "code",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Coupons.store"),
          value: "market_name",
          align: "center",
          sortable: false,
        },
        // {
        //   text: this.$t("TABLES.Coupons.minLimit"),
        //   value: "min_limit",
        //   align: "center",
        //   sortable: false,
        // },
        // {
        //   text: this.$t("TABLES.Coupons.maxLimit"),
        //   value: "max_limit",
        //   align: "center",
        //   sortable: false,
        // },
        {
          text: this.$t("PLACEHOLDERS.package_discount"),
          value: "value",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Coupons.city"),
          value: "city",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Coupons.use_status"),
          value: "is_used",
          align: "center",
          width: "150",
          sortable: false,
        },

        {
          text: this.$t("TABLES.Coupons.use_by"),
          value: "used_by",
          align: "center",
          width: "150",
          sortable: false,
        },
        // {
        //   text: this.$t("TABLES.Products.created_at"),
        //   value: "created_at",
        //   align: "center",
        //   sortable: false,
        // },
        {
          text: this.$t("TABLES.Coupons.active"),
          value: "is_active",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Coupons.actions"),
          value: "actions",
          align: "center",
          sortable: false,
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

      allStores: []
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
        await this.$router.push({ path: '/couponspro/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.storename = null;
      this.filterOptions.isActive = null;
      this.filterOptions.isUsed = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/coupons/all', query: { page: 1 } });
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
          url: "modules/coupon-provider",
          params: {
            is_paginate: 1,
            page: this.paginations.current_page,
            title: this.filterOptions.name,
            market_name: this.filterOptions.storename,
            is_used: this.filterOptions.isUsed?.value,
            is_active: this.filterOptions.isActive?.value,
          },
        });
        this.loading = false;
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

    // Start:: Change Activation Status
    async changeActivationStatus(item) {
      try {
        await this.$axios({
          method: "PUT",
          url: `modules/coupon-provider${item.id}/activate`,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/couponspro/edit/${item.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/couponspro/show/${item.id}` });
    },
    // ===== End:: End

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `modules/coupon-provider/${this.itemToDelete.id}`,
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

    // async getAllStores() {
    //   this.loading = true;
    //   try {
    //     let res = await this.$axios({
    //       method: "GET",
    //       url: "admin/stores",
    //     });
    //     this.allStores = res.data.body.stores;
    //     console.log(res.data.body.stores)
    //   } catch (error) {
    //     this.loading = false;
    //     console.log(error.response.data.message);
    //   }
    // },

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
    // End:: Fire Methods
  },
};
</script>

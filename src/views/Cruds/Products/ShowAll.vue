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
              <base-input col="3" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <base-select-input col="3" :optionsList="product_category" :placeholder="$t('BUTTONS.product_section')"
                v-model="filterOptions.orderType" required />

              <base-select-input col="3" :optionsList="allStores" :placeholder="$t('SIDENAV.Stores.title')"
                v-model="filterOptions.store_type" required />

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
          <h5>{{ $t("TITLES.products") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>
        <div class="title_route_wrapper" v-if="permissions.create">
          <router-link to="/products/create">
            {{ $t("BUTTONS.addProduct") }}
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
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.id"> {{ $t("TABLES.noData") }} </h6>
            <h6 v-else>{{ index + 1 }}</h6> <!-- Display the index for each row -->
          </div>
        </template>

        <template v-slot:[`item.description_en`]="{ item }">
          <h6 class="text-danger" v-if="item.description_ar.length === 0"> {{ $t("TABLES.noData") }} </h6>

          <div class="actions" v-else>
            <button class="btn_show" @click="showDescModal(item.description_en)">
              <i class="fal fa-file-alt"></i>
            </button>
          </div>
        </template>
        <!-- End:: Description Btns -->

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

            <a-tooltip placement="bottom" v-if="permissions.edit">
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom" v-if="permissions.delete">
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
          <!-- Start:: Image Modal -->
          <image-modal v-if="dialogImage" :modalIsOpen="dialogImage" :modalImage="selectedItemImage"
            @toggleModal="dialogImage = !dialogImage" />
          <!-- End:: Image Modal -->

          <!-- Start:: Desc Modal -->
          <description-modal v-if="dialogDesc" :modalIsOpen="dialogDesc" :modalDesc="selectedDescTextToShow"
            @toggleModal="dialogDesc = !dialogDesc" />
          <!-- End:: Desc Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.title }) }}
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
  name: "AllProducts",

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
        status: null,
        orderType: null,
        store_type: null

      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Products.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Products.name"),
          value: "title",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.store"),
          value: "store.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("PLACEHOLDERS.section"),
          value: "category.title",
          align: "center",
          sortable: false,
        },

        {
          text: this.$t("TABLES.Products.price"),
          value: "price",
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
          text: this.$t("TABLES.Products.activation"),
          value: "is_active",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Products.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDesc: false,
      selectedDescTextToShow: "",
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
      permissions: [],
      // Start:: Page Permissions
      allStores: [],
      allCategories: [],

      product_category: []
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
        await this.$router.push({ path: '/products/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.orderType = null;
      this.filterOptions.store_type = null;
      this.filterOptions.status = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/products/all', query: { page: 1 } });
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
          url: "admin/products",
          params: {
            page: this.paginations.current_page,
            title: this.filterOptions.name,
            category_id: this.filterOptions.orderType?.id,
            store_id: this.filterOptions.store_type?.id,
            is_active: this.filterOptions.status?.value,
          },
        });
        this.loading = false;
        console.log("All Data ==>", res.data.body);
        this.tableRows = res.data.body.Product;
        this.paginations.last_page = res.data.body.meta.last_page;
        this.paginations.items_per_page = res.data.body.meta.per_page;
        this.permissions = res.data.body.permissions;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Control Modals
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    showDescModal(desc) {
      this.dialogDesc = true;
      this.selectedDescTextToShow = desc;
    },
    // Start:: Control Modals

    // ==================== Start:: Crud ====================
    // ===== Start:: Edit
    editItem(item) {
      this.$router.push({ path: `/products/edit/${item.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/products/show/${item.id}` });
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
          url: `admin/products/${this.itemToDelete.id}`,
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
          url: `admin/products/${item.id}/activate`,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status

    // start get all stores

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/get-stores",
        });
        this.allStores = res.data.body.stores;
        this.allStores.unshift({ value: null, id: null, name: `${this.$t("STATUS.all")}` });
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // async getAllCategories() {
    //   this.loading = true;
    //   try {
    //     let res = await this.$axios({
    //       method: "GET",
    //       url: "admin/stores/types/categories",
    //     });
    //     this.allCategories = res.data.body.orderTypes;
    //     console.log(res.data.body.orderTypes)
    //   } catch (error) {
    //     this.loading = false;
    //     console.log(error.response.data.message);
    //   }
    // },

    async getAllProductCategory() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/product_categories",
        });
        this.product_category = res.data.body.product_category;
        this.product_category.unshift({ value: null, id: null, name: `${this.$t("STATUS.all")}` });

        console.log(res.data.body.product_category)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end get all stores
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
    this.getAllProductCategory()
    // this.getAllCategories();
    // End:: Fire Methods
  },
};
</script>

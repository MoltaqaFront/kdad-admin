<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_form_wrapper">
        <form @submit.prevent="submitFilterForm">
          <div class="row justify-content-center align-items-center">
            <!-- Start:: Name Input -->
            <base-input
              col="4"
              type="text"
              :placeholder="$t('PLACEHOLDERS.name')"
              v-model.trim="filterOptions.name"
            />
            <!-- End:: Name Input -->

            <!-- Start:: Mobile Input -->
            <base-input
              col="4"
              type="tel"
              :placeholder="$t('PLACEHOLDERS.mobileNumber')"
              v-model.trim="filterOptions.mobileNumber"
            />
            <!-- End:: Mobile Input -->

            <!-- Start:: Status Input -->
            <base-select-input
              col="4"
              :optionsList="statuses"
              :placeholder="$t('PLACEHOLDERS.status')"
              v-model="filterOptions.status"
            />
            <!-- End:: Status Input -->
          </div>

          <div class="btns_wrapper">
            <button class="submit_btn" :disabled="isWaitingRequest">
              <i class="fal fa-search"></i>
            </button>
            <button class="reset_btn" :disabled="isWaitingRequest">
              <i class="fal fa-redo"></i>
            </button>
          </div>
        </form>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("TITLES.clients") }}</h5>
        </div>
        <div class="title_route_wrapper">
          <router-link to="/clients/create">
            {{ $t("BUTTONS.add_client") }}
          </router-link>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table
        class="thumb"
        :loading="loading"
        :loading-text="$t('TABLES.loadingData')"
        :search="searchValue"
        :headers="tableHeaders"
        :items="tableRows"
        item-class="ltr"
        :items-per-page="paginations.items_per_page"
        hide-default-footer
      >
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <!-- Start:: Item Image -->
        <template v-slot:[`item.image`]="{ item }">
          <div class="table_image_wrapper">
            <button class="my-1" @click="showImageModal(item.image)">
              <img
                class="rounded"
                :src="item.image"
                alt="Icon"
                width="60"
                height="60"
              />
            </button>
          </div>
        </template>
        <!-- End:: Item Image -->

        <!-- Start:: Verification -->
        <template v-slot:[`item.verified`]="{ item }">
          <div class="verification" dir="ltr" style="z-index: 1">
            <v-switch
              class="mt-2"
              color="success"
              v-model="item.verified"
              hide-details
              @change="changeVerificationStatus(item.id)"
            ></v-switch>
          </div>
        </template>
        <!-- End:: Verification -->

        <!-- Start:: Activation -->
        <template v-slot:[`item.active`]="{ item }">
          <div class="activation" dir="ltr" style="z-index: 1">
            <v-switch
              class="mt-2"
              color="success"
              v-model="item.active"
              hide-details
              @change="changeActivationStatus(item.id)"
            ></v-switch>
          </div>
        </template>
        <!-- End:: Activation -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <button class="btn_show" @click="showItem(item)">
              <i class="fal fa-eye"></i>
            </button>
            <button class="btn_edit" @click="editItem(item)">
              <i class="fal fa-edit"></i>
            </button>
            <button class="btn_delete" @click="selectDeleteItem(item)">
              <i class="fal fa-trash-alt"></i>
            </button>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Image Modal -->
          <v-dialog v-model="dialogImage">
            <v-card>
              <img
                class="rounded"
                :src="selectedItemImage"
                alt="Icon"
                width="280"
                height="280"
              />
            </v-card>
          </v-dialog>
          <!-- End:: Image Modal -->

          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{$t("TITLES.DeleteConfirmingMessage", {name: itemToDelete.nameAr})}}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmDeleteItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn
                  class="modal_cancel_btn"
                  @click="dialogDelete = false"
                  >{{ $t("BUTTONS.cancel") }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->

          <!-- Start:: Desc Modal -->
          <v-dialog v-model="dialogDesc">
            <v-card>
              <h5 class="dialog_desc_text">
                {{ selectedDescTextToShow }}
              </h5>
            </v-card>
          </v-dialog>
          <!-- End:: Desc Modal -->
        </template>
        <!-- ======================== End:: Dialogs ======================== -->
      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination
          class="py-0"
          square
          v-model="paginations.current_page"
          :length="paginations.last_page"
          :total-visible="6"
          @input="updateRouterQueryParam($event)"
          :prev-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
          "
          :next-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
          "
        ></v-pagination>

        <!-- <v-pagination
          class="py-0"
          square
          v-model="paginations.current_page"
          :length="paginations.last_page"
          :total-visible="6"
          :prev-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
          "
          :next-icon="
            getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
          "
          @input="setTableRowsByPagination(null, paginations.current_page)"
          @next="setTableRowsByPagination(paginations.nextPageLink, null)"
          @previous="
            setTableRowsByPagination(paginations.previousPageLink, null)
          "
        >
        </v-pagination> -->
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

    statuses() {
      return [
        {
          id: "active",
          name: this.$t("STATUS.active"),
        },
        {
          id: "not_active",
          name: this.$t("STATUS.notActive"),
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

      // Start:: Filter Options Data
      filterOptions: {
        name: null,
        mobileNumber: null,
        status: null,
      },
      // End:: Filter Options Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Clients.serialNumber"),
          value: "id",
          align: "center",
          width: "80",
          sortable: true,
        },
        {
          text: this.$t("TABLES.Clients.image"),
          value: "image",
          align: "center",
        },
        {
          text: this.$t("TABLES.Clients.nameAr"),
          value: "name",
          align: "center",
        },
        {
          text: this.$t("TABLES.Clients.nameEn"),
          value: "nameEn",
          align: "center",
        },
        {
          text: this.$t("TABLES.Clients.email"),
          value: "email",
          align: "center",
        },
        {
          text: this.$t("TABLES.Clients.mobileNumber"),
          value: "mobile",
          align: "center",
        },
        {
          text: this.$t("TABLES.Clients.verification"),
          value: "verified",
          align: "center",
          width: "120",
        },
        {
          text: this.$t("TABLES.Clients.activation"),
          value: "active",
          align: "center",
          width: "120",
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

      // Start:: Dialogs Control Data
      dialogDelete: false,
      itemToDelete: null,

      dialogImage: false,
      selectedItemImage: null,
      dialogDesc: false,
      selectedDescTextToShow: null,
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data
    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.pagination.current_page = +this.$route.query.page;
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
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
          url: "user",
          params: { page: this.paginations.current_page },
        });
        this.loading = false;
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // ==================== Start:: Crud ====================
    // ===== Start:: Show
    showItem(item) {
      this.$router.push({ path: `/clients/show/${item.id}` });
    },
    // ===== End:: Show

    // ===== Start:: Edit
    editItem(item) {
      this.$router.push({ path: `/clients/edit/${item.id}` });
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
          url: `user/${this.itemToDelete.id}`,
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

    // Start:: Control Image Modal
    showImageModal(image) {
      this.dialogImage = true;
      this.selectedItemImage = image;
    },
    // End:: Control Image Modal

    // Start:: Change Verification Status
    async changeVerificationStatus(itemId) {
      try {
        await this.$axios({
          method: "POST",
          url: `user/toggle_verify/${itemId}`,
        });
        this.$message.success(this.$t("MESSAGES.changeVerification"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Verification Status

    // Start:: Change Activation Status
    async changeActivationStatus(itemId) {
      try {
        await this.$axios({
          method: "POST",
          url: `user/toggle_active/${itemId}`,
        });
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Change Activation Status
  },

  created() {
    // Start:: Fire Methods
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>

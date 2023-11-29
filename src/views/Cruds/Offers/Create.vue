<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.addOffer") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.image')"
            @selectImage="selectImage" required />

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <base-select-input col="6" :optionsList="allOrders" :placeholder="$t('PLACEHOLDERS.orderType')"
            v-model="data.type" required />

          <base-select-input col="6" :optionsList="allStores" :placeholder="$t('PLACEHOLDERS.storeType')"
            v-model="data.store_id" required @input="getProducts" />

          <base-select-input col="6" v-if="allProducts.length" :optionsList="allProducts"
            :placeholder="$t('TITLES.products')" v-model="data.product_id" required multiple />

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_discount')" v-model.trim="data.discount"
            required />

          <base-picker-input col="6" type="date" :disabledDate="disabledDate" :placeholder="$t('PLACEHOLDERS.startDate')"
            v-model.trim="data.publish_start_date" required />

          <base-picker-input col="6" type="date" :disabledDate="disabledDate" :placeholder="$t('PLACEHOLDERS.end_date')"
            v-model.trim="data.publish_end_date" required />

          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "CreateStore",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {

        image: {
          path: null,
          file: null,
        },
        name: null,
        type: null,
        active: true,
        discount: null,
        store_id: null,
        product_id: null,
        publish_start_date: null,
        publish_end_date: null,
      },

      allStores: [],
      allOrders: [],
      allProducts: []
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allStoreCategories: "ApiGetsModule/allStoreCategoriesData",
      allOrderTypes: "ApiGetsModule/allOrderTypesData",
    }),
    // End:: Vuex Getters
  },

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },
    // Start:: Vuex Actions
    ...mapActions({
      getStoreCategoriesAndOrderTypes: "ApiGetsModule/getStoreCategoriesAndOrderTypes",
    }),
    // End:: Vuex Actions

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.image.path) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.image"));
        return;
      } else if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      }
      else if (!this.data.store_id?.id) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.store"));
        return;
      }

      else if (!this.data.publish_start_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.startDate"));
        return;
      }
      else if (!this.data.publish_end_date) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.endDate"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("image", this.data.image.file);
      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("type", this.data.type?.id);
      REQUEST_DATA.append("discount", this.data.discount);
      REQUEST_DATA.append("store_id", this.data.store_id?.id);

      if (this.data.product_id) {
        this.data.product_id.forEach(element => {
          REQUEST_DATA.append("products[]", element.id);
        });
      }


      REQUEST_DATA.append("start_at", this.data.publish_start_date);
      REQUEST_DATA.append("end_at", this.data.publish_end_date);
      REQUEST_DATA.append("is_active", +this.data.active);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `admin/offers`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/offers/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors);
      }
    },
    // End:: Submit Form

    async getProducts() {
      this.data.product_id = null;
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/get-products/${this.data.store_id.id}`,
        });
        this.allProducts = res.data.body.products;
        console.log(res.data.body.products)
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
          url: "admin/stores",
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
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();


    this.getAllStores();
    this.getAllOrders()

    // End:: Fire Methods
  },
};
</script>

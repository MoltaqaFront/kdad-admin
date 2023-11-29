<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.show_offer") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" disabled />

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled />
          <!-- End:: Name Input -->

          <base-select-input col="6" :optionsList="allOrders" :placeholder="$t('PLACEHOLDERS.orderType')"
            v-model="data.type" disabled />

          <base-select-input col="6" :optionsList="allStores" :placeholder="$t('PLACEHOLDERS.storeType')"
            v-model="data.store_id" disabled @input="getProducts" />

          <base-select-input col="6" v-if="allProducts.length || data.product_id" :optionsList="allProducts"
            :placeholder="$t('TITLES.products')" v-model="data.product_id" disabled multiple />

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_discount')" v-model.trim="data.discount"
            disabled />

          <base-input col="6" type="date" :placeholder="$t('PLACEHOLDERS.start_date')"
            v-model.trim="data.publish_start_date" disabled />

          <base-input col="6" type="date" :placeholder="$t('PLACEHOLDERS.end_date')" v-model.trim="data.publish_end_date"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateStore",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send

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
      allProducts: [],
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
    // Start:: Vuex Actions
    ...mapActions({
      getStoreCategoriesAndOrderTypes: "ApiGetsModule/getStoreCategoriesAndOrderTypes",
    }),
    // End:: Vuex Actions

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    // start all ads data

    async getOffersData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/offers/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.body.offer.image;
        this.data.name = res.data.body.offer.name;
        this.data.discount = res.data.body.offer.discount;
        this.data.type = res.data.body.offer.type;
        this.data.store_id = res.data.body.offer.store;
        this.data.product_id = res.data.body.offer.product;
        this.data.publish_start_date = res.data.body.offer.start_at;
        this.data.publish_end_date = res.data.body.offer.end_at;
        this.data.active = res.data.body.offer.is_active;
        // console.log(res.data.body.offer)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all ads data


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();

    this.getOffersData()

    // End:: Fire Methods
  },
};
</script>

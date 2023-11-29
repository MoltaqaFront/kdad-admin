<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.occasions_show") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.occasions_ar')" v-model.trim="data.nameAr"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.occasions_en')" v-model.trim="data.nameEn"
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.store_name')" v-model.trim="data.store_id"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Submit Button Wrapper -->
          <!-- <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div> -->
          <!-- End:: Submit Button Wrapper -->
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
      data: {
        nameAr: null,
        nameAEn: null,
        store_id: '',
        is_active: true,
      },

      allStores: [],
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
    // Start:: Vuex Actions
    ...mapActions({
      getStoreCategoriesAndOrderTypes: "ApiGetsModule/getStoreCategoriesAndOrderTypes",
    }),
    // End:: Vuex Actions

    // start all Ocasions data

    async getOccasionsData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/occasions/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.body.occasion.translations.name_ar;
        this.data.nameEn = res.data.body.occasion.translations.name_en;
        this.data.store_id = res.data.body.occasion.store.name;
        console.log(res.data.body.occasion)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all Ocasions data


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();
    this.getOccasionsData()
    // End:: Fire Methods
  },
};
</script>

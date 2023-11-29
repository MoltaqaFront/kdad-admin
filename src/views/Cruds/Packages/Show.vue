<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_package") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" readonly
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" readonly
            disabled />
          <!-- End:: Name Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="data.price" readonly
            disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.discountPercentage')"
            v-model.trim="data.discount_percentage" readonly disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_duration')"
            v-model.trim="data.package_duration" readonly disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.package_people')"
            v-model.trim="data.number_people_allowed" readonly disabled />

          <div class="col-12">
            <div class="row">
              <!-- Start:: Ar Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descAr')"
                v-model.trim="data.descAr" readonly disabled />
              <!-- End:: Ar Desc Textarea -->

              <!-- Start:: En Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descEn')"
                v-model.trim="data.descEn" readonly disabled />
              <!-- End:: En Desc Textarea -->
            </div>
          </div>


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
      data: {
        nameAr: null,
        nameEn: null,
        price: null,
        discount_percentage: null,
        package_duration: null,
        number_people_allowed: null,
        descAr: null,
        descEn: null,
        active: true,
      },
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


    // start all package data
    async getPackageData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/packages/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.body.package.titleAr;
        this.data.nameEn = res.data.body.package.titleEn;
        this.data.descAr = res.data.body.package.descriptionAr;
        this.data.descEn = res.data.body.package.descriptionEn;
        this.data.price = res.data.body.package.price;
        this.data.discount_percentage = res.data.body.package.discount_percentage;
        this.data.package_duration = res.data.body.package.package_duration;
        this.data.number_people_allowed = res.data.body.package.subscribers_number;
        this.data.active = res.data.body.package.is_active;
        // console.log(res.data.body.package)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all package data


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();
    this.getPackageData()
    // End:: Fire Methods
  },
};
</script>

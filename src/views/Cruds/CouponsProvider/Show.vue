<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showCoupon") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.ImagesSpaces.nameAr')" v-model.trim="data.name_ar" required
            readonly />
          <!-- End:: code Input -->

          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.ImagesSpaces.nameEn')" v-model.trim="data.name_en" required
            readonly />
          <!-- End:: code Input -->

            <!-- Start:: code Input -->
            <base-input col="6" type="text" :placeholder="$t('TABLES.Coupons.code')" v-model.trim="data.code" required
            readonly />
          <!-- End:: code Input -->

          
          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Coupons.Discount_Points')" v-model.trim="data.percentage" required
            readonly />
          <!-- End:: code Input -->

            <!-- Start:: code Input -->
            <base-input col="6" type="text" :placeholder="$t('TABLES.Coupons.store_ar')" v-model.trim="data.store_ar" required
            readonly />
          <!-- End:: code Input -->

          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Coupons.store_en')" v-model.trim="data.store_en" required
            readonly />
          <!-- End:: code Input -->

          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" class="show-img" identifier="image" :placeholder="$t('PLACEHOLDERS.storelogo')"
            @selectImage="selectImage" :preSelectedImage="data.image.path" disabled />
          <!-- End:: Image Upload Input -->

            <!-- Start:: Ar Desc Textarea -->
            <base-input col="6" rows="9" type="textarea" :placeholder="$t('TABLES.Coupons.descriptionAr')"
            v-model.trim="data.descAr" disabled/>
          <!-- End:: Ar Desc Textarea -->

          <!-- Start:: En Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('TABLES.Coupons.descriptionEn')"
            v-model.trim="data.descEn" disabled/>
          <!-- End:: En Desc Textarea -->
          

            <!-- Start:: code Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.city_ar')" v-model.trim="data.cityAr" required
            readonly />
          <!-- End:: code Input -->

          <!-- Start:: code Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.city_en')" v-model.trim="data.cityEn" required
            readonly />
          <!-- End:: code Input -->

          <!-- Start:: add Desc Textarea -->
            <base-input col="6" rows="9" type="text" :placeholder="$t('TABLES.Coupons.address_detailsAr')"
            v-model.trim="data.addAr" disabled/>
          <!-- End:: Ar Desc Textarea -->

          <!-- Start:: add Desc Textarea -->
          <base-input col="6" rows="9" type="text" :placeholder="$t('TABLES.Coupons.address_detailsEn')"
            v-model.trim="data.addEn" disabled/>
          <!-- End:: En Desc Textarea -->
          
          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->
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
  name: "EditCoupon",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        code: null,
        name_ar: null,
        name_en: null,
        store_ar: null,
        store_en: null,
        descAr: null,
        descEn: null,
        cityAr: null,
        cityEn: null,
        addAr: null,
        addEn: null,
        percentage: null,
        active: true,
        image:{
          path: null,
          file: null,
        }
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allStores: "ApiGetsModule/allStoresData",
    }),
    // End:: Vuex Getters
  },

  methods: {
    
    // Start:: Vuex Actions
    ...mapActions({
      getStores: "ApiGetsModule/getStores",
    }),
    // End:: Vuex Actions

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/coupon-provider/${this.id}`,
        });
        // Start:: Set Data
        this.data.name_ar = res.data.data.title_ar;
        this.data.name_en = res.data.data.title_en;
        this.data.code = res.data.data.code;
        this.data.store_ar = res.data.data.market_name_ar;
        this.data.store_en = res.data.data.market_name_en;
        this.data.descAr = res.data.data.description_ar;
        this.data.descEn = res.data.data.description_en;
        this.data.cityAr = res.data.data.city_ar;
        this.data.cityEn = res.data.data.city_en;
        this.data.addAr = res.data.data.city_ar;
        this.data.addEn = res.data.data.city_en;
        this.data.percentage = res.data.data.value;
        this.data.active = res.data.data.is_active;
        this.data.image.path = res.data.data.logo;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Select Upload Image
        selectImage(selectedImage) {
      if (selectedImage.identifier === "image") {
        this.data.image = selectedImage;
        console.log(this.data.logo)
      }
    },
    // End:: Select Upload Image

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "coupons show");
    this.getStores();
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

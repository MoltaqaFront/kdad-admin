<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("BUTTONS.editBank") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <!-- <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.banklogo')"
            @selectImage="selectImage" :preSelectedImage="data.image.path" /> -->
          <!-- End:: Image Upload Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" required />
          <!-- End:: Name Input -->

          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.is_active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.is_active" hide-details></v-switch>
          </div>

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

export default {
  name: "CreateDriver",

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allAreasData: "ApiGetsModule/allAreasData",
      allCitiesByAreaIdData: "ApiGetsModule/allCitiesByAreaIdData",
      allDistrictsByCityIdData: "ApiGetsModule/allDistrictsByCityIdData",
    }),
    // End:: Vuex Getters

    driverTypes() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.normal_wash"),
          value: "washing",
        },
        // {
        //   id: 2,
        //   name: this.$t("PLACEHOLDERS.delivery"),
        //   value: "delivery",
        // },
        {
          id: 3,
          name: this.$t("PLACEHOLDERS.washing_polishing"),
          value: "washing_polishing",
        },
      ];
    },
  },

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
        nameAr: null,
        nameEn: null,
        is_active: null
      },
      // End:: Data Collection To Send

      AllNationalities: [],
      AllCarModal: [],
      AllCarTypes: [],

    };
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getAreas: "ApiGetsModule/getAreas",
      getCitiesByAreaId: "ApiGetsModule/getCitiesByAreaId",
      getDistrictsByCityId: "ApiGetsModule/getDistrictsByCityId",
    }),
    // End:: Vuex Actions

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },


    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "image") {
        this.data.image = selectedImage;
        console.log(this.data.logo)
      }
    },
    // End:: Select Upload Image

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.image.file) {
        REQUEST_DATA.append("logo", this.data.image.file);
      }
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("is_active", +this.data.is_active);
      REQUEST_DATA.append("_method", "PUT");
      // REQUEST_DATA.append("available", +this.data.available);
      // REQUEST_DATA.append("status", +this.data.active);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/bank/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/Banks/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getDataToEdit() {
      this.loading = true;
      try {
        let response = await this.$axios({
          method: "GET",
          url: `modules/bank/${this.$route.params.id}`,
        });
        this.loading = false;
        // this.data.id_imge = response.data.body.driver.
        this.data.image.path = response.data.data.logo;
        this.data.nameAr = response.data.data.name_ar;
        this.data.nameEn = response.data.data.name_en;
        this.data.is_active = response.data.data.is_active;
        console.log(this.data.nameAr)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "drivers edit");
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

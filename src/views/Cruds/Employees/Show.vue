<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.addStore") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <base-image-upload-input col="12" identifier="store_logo" :placeholder="$t('PLACEHOLDERS.logo')"
            :preSelectedImage="data.image" disabled />
          <!-- End:: Image Upload Input -->
          <!-- End:: Logo Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" disabled />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" disabled />
          <!-- End:: Email Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.store_name')" v-model.trim="data.store_id"
            required />
          <!-- End:: Email Input -->

          <!-- Start:: Email Input -->
          <div v-for="(item, index) in data.allRoles" :key="index">

            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.permissions')" v-model.trim="item.name"
              required disabled />

          </div>
          <!-- End:: Email Input -->


          <!-- Start:: Password Input -->
          <!-- <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.password')" v-model.trim="data.password"
            required /> -->
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <!-- <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="data.password_confirmation" required /> -->
          <!-- End:: Confirm Password Input -->

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
        logo: {
          path: null,
          file: null,
        },
        image: null,
        store_id: null,
        name: null,
        phone: null,
        email: null,
        allStores: [],
        password: null,
        password_confirmation: null,
        roles: [],
        allRoles: []
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

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "store_logo") {
        this.data.logo = selectedImage;
      }
    },
    // End:: Select Upload Image

    // start all employee data

    async getAllEmployee() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/employees/${this.$route.params.id}`,
        });
        this.data.image = res.data.body.employee.avatar;
        this.data.name = res.data.body.employee.name;
        this.data.phone = res.data.body.employee.phone;
        this.data.email = res.data.body.employee.email;
        this.data.store_id = res.data.body.employee.store.name;
        this.data.allRoles = res.data.body.employee.role;
        console.log(res.data.body.employee)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all employee data


  },

  created() {
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();

    this.getAllEmployee()
    // End:: Fire Methods
  },
};
</script>

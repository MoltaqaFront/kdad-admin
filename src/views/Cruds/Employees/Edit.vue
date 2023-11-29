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
          <!-- Start:: Logo Input -->
          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.logo.path"
            :placeholder="$t('PLACEHOLDERS.personalImage')" @selectImage="selectImage" />
          <!-- End:: Logo Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" required />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" required />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" required />
          <!-- End:: Email Input -->

          <!-- Start:: Store Category Input -->
          <base-select-input col="6" :optionsList="data.allStores" :placeholder="$t('PLACEHOLDERS.store_name')"
            v-model="data.store_id" required @input="getAllRoles" />
          <!-- multiple -->

          <!-- Start:: Store Category Input -->
          <base-select-input v-if="data.allRoles.length" col="6" :optionsList="data.allRoles"
            :placeholder="$t('PLACEHOLDERS.permissions')" v-model="data.allRoles" required multiple />
          <!-- multiple -->
          <!-- End:: Store Category Input -->

          <!-- Start:: Password Input -->
          <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.password')" v-model.trim="data.password"
            required />
          <!-- End:: Password Input -->

          <!-- Start:: Confirm Password Input -->
          <base-input col="6" type="password" :placeholder="$t('PLACEHOLDERS.confirmPassword')"
            v-model.trim="data.password_confirmation" required />
          <!-- End:: Confirm Password Input -->

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
      this.data.logo = selectedImage;
      console.log(selectedImage)

    },
    // End:: Select Upload Image

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      // if (!this.data.logo.path) {
      //   // this.isWaitingRequest = false;
      //   // this.$message.error(this.$t("VALIDATION.userImage"));
      //   return;
      // }
      // else
      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      } else if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.mobileNumber"));
        return;
      } else if (!/^05\d{8}$/.test(this.data.phone)) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.phone_num"));
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } else if (!this.data.store_id) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.store"));
        return;
      }
      else if (!this.data.password) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.data.password.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (!this.data.password_confirmation) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.data.password_confirmation.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (
        this.data.password !=
        this.data.password_confirmation
      ) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.notEqualPasswords"));
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
      REQUEST_DATA.append("avatar", this.data.logo.file);
      REQUEST_DATA.append("name", this.data.name);
      REQUEST_DATA.append("store_id", this.data.store_id.id);
      REQUEST_DATA.append("email", this.data.email);
      REQUEST_DATA.append("phone", this.data.phone);
      REQUEST_DATA.append("password", this.data.password);
      REQUEST_DATA.append("password_confirmation", this.data.password_confirmation);
      REQUEST_DATA.append("is_active", 1);
      // REQUEST_DATA.append("roles[]", this.data.allRoles[0].id);
      this.data.allRoles.forEach(role => {
        REQUEST_DATA.append("roles[]", role.id);
      });
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `admin/employees/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/employees/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    // start get all stores

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores",
        });
        this.data.allStores = res.data.body.stores;
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end get all stores

    // start get roles

    async getAllRoles() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/employees/store-roles/${this.data.store_id.id}`,
        });
        this.data.allRoles = res.data.body.role;
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end get roles

    // start all employee data

    async getAllEmployee() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/employees/${this.$route.params.id}`,
        });
        this.data.logo.path = res.data.body.employee.avatar;
        this.data.name = res.data.body.employee.name;
        this.data.phone = res.data.body.employee.phone;
        this.data.email = res.data.body.employee.email;
        this.data.store_id = res.data.body.employee.store;
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
    this.data.password = null;
    this.data.password_confirmation = null;
    // Start:: Fire Methods
    this.$store.dispatch("PermissionsModule/checkRoutePermissions", "stores create");
    this.getStoreCategoriesAndOrderTypes();

    this.getAllStores();
    this.getAllRoles();
    this.getAllEmployee()
    // End:: Fire Methods
  },
};
</script>

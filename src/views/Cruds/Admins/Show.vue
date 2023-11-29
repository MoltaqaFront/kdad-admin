<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editAdmin") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.personalImage')" @selectImage="selectImage" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name')" v-model.trim="data.name" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" disabled />
          <!-- End:: Email Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="data.phone" disabled />
          <!-- End:: Phone Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.role')" v-model.trim="data.role" disabled />
          <!-- End:: Name Input -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditAdmin",

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
        image: {
          path: null,
          file: null,
        },
        name: null,
        email: null,
        phone: null,
        role: null,
        enableEditPassword: false,
        password: null,
        passwordConfirmation: null,
        active: true,
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allRoles: "ApiGetsModule/allRoles",
    }),
    // End:: Vuex Getters
  },

  methods: {
    // Start:: Vuex Actions
    ...mapActions({
      getRoles: "ApiGetsModule/getRoles",
    }),
    // End:: Vuex Actions

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/admin/${this.id}`,
        });
        // console.log( "DATA TO EDIT =>", res.data.data.region );

        // Start:: Set Data
        this.data.image.path = res.data.data.image;
        this.data.name = res.data.data.name;
        this.data.email = res.data.data.email;
        this.data.phone = res.data.data.mobile;
        this.data.role = res.data.data.role.name;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    this.getRoles();
    // End:: Fire Methods
  },
};
</script>

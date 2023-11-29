<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.show_provider_request") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage" :preSelectedImage="data.image.path" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.name_provider')" v-model.trim="data.name"
            disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="6" type="tel" :placeholder="$t('PLACEHOLDERS.phoneNumber')" v-model.trim="data.phone"
            disabled />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="6" type="email" :placeholder="$t('PLACEHOLDERS.email')" v-model.trim="data.email" disabled />
          <!-- End:: Email Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.identity')" v-model.trim="data.identity"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nationality')" v-model.trim="data.nationality"
            disabled />

          <!-- Start:: Address Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.bankName')" v-model.trim="data.bank" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.iban')" v-model.trim="data.iban" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.date_of_birth')" v-model.trim="data.dob"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.age')" v-model.trim="data.age" disabled />

          <base-image-upload-input col="12" identifier="id_imge" :preSelectedImage="data.id_imge.path"
            :placeholder="$t('PLACEHOLDERS.car_image')" @selectImage="selectImage" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.serial_num')" v-model.trim="data.serial_number"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_type')" v-model="data.car_type" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_modal')" v-model="data.car_model" disabled />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.car_plate')" v-model.trim="data.car_plate"
            disabled />
          <!-- End:: Address Input -->

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
  },

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        id_imge: {
          path: null,
          file: null,
        },
        liecence_image: {
          path: null,
          file: null,
        },
        front_image: {
          path: null,
          file: null,
        },
        back_image: {
          path: null,
          file: null,
        },
        image: {
          path: null,
          file: null,
        },
        name: null,
        phone: null,
        email: '',
        dob: null,
        age: null,
        car_model: null,
        car_type: null,
        serial_number: null,
        year_made: null,
        car_plate: null,
        nationality: null,
        iban: null,
        bank: null,
        Account_Holders: null,
        identity: null,

        password: null,
        passwordConfirmation: null,
        available: true,
        active: true,
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

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      if (selectedImage.identifier === "image") {
        this.data.image = selectedImage;
        console.log(this.data.logo)
      } else if (selectedImage.identifier === "id_imge") {
        this.data.id_imge = selectedImage;
      } else if (selectedImage.identifier === "liecence_image") {
        this.data.liecence_image = selectedImage;
      } else if (selectedImage.identifier === "front_image") {
        this.data.front_image = selectedImage;
      } else if (selectedImage.identifier === "back_image") {
        this.data.back_image = selectedImage;
      }
    },
    // End:: Select Upload Image

    async getDataToEdit() {
      this.loading = true;
      try {
        let response = await this.$axios({
          method: "GET",
          url: `modules/deactive-provider/${this.$route.params.id}`,
        });
        this.loading = false;

        this.data.image.path = response.data.data.user.image;
        this.data.name = response.data.data.user.name;
        this.data.email = response.data.data.user.email;
        this.data.phone = response.data.data.user.mobile;
        this.data.identity = response.data.data.user.national_identity;
        this.data.nationality = response.data.data.user.nationality.nationality;
        this.data.dob = response.data.data.user.dob;
        this.data.age = response.data.data.user.age;
        this.data.Account_Holders = response.data.data.user.account_username;
        this.data.iban = response.data.data.user.bankUser.IBAN;
        this.data.bank = response.data.data.user.bankUser.bank.name;
        this.data.car_plate = response.data.data.user.car.board_number;
        this.data.serial_number = response.data.data.user.car.serial_number;
        this.data.car_type = response.data.data.user.car.carType.title;
        console.log(response.data.data.user.car.carType.title)
        this.data.car_model = response.data.data.user.car.carCategory.title;

        this.data.id_imge.path = response.data.data.user.car.image;


      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

  },

  async created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

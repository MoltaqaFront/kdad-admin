<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.view_question") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- <base-input col="7" type="text" :placeholder="$t('PLACEHOLDERS.type')" v-model.trim="data.type" disabled /> -->

          <!-- Start:: Ar Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.question_ar')" v-model.trim="data.nameAr"
            disabled />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.question_en')" v-model.trim="data.nameEn"
            disabled />
          <!-- End:: En Name Input -->

          <!-- Start:: Ar Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.answer_ar')"
            v-model.trim="data.descAr" disabled />
          <!-- End:: Ar Desc Textarea -->

          <!-- Start:: En Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.answer_en')"
            v-model.trim="data.descEn" disabled />
          <!-- End:: En Desc Textarea -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "EditStoreType",

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
        nameAr: null,
        nameEn: null,
        descAr: null,
        descEn: null,
        type: null,
        active: true,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `modules/faq/${this.id}`,
        });
        // Start:: Set Data
        this.data.nameAr = res.data.data.question_ar;
        this.data.nameEn = res.data.data.question_en;
        this.data.descAr = res.data.data.answer_ar;
        this.data.descEn = res.data.data.answer_en;
        // this.data.type = res.data.data.type.name;
        this.data.active = res.data.body.main_category.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit


    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      if (!this.data.image.path) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.image"));
        return;
      } else if (!this.data.nameAr) {
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
    // End:: validate Form Inputs
  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "storesTypes edit");
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("PLACEHOLDERS.edit_question") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Image Upload Input -->
          <!-- <base-select-input col="12" :optionsList="data.types" :placeholder="$t('PLACEHOLDERS.type')"
            v-model.trim="data.type" /> -->
          <!-- End:: Ar Name Input -->

          <!-- Start:: Image Upload Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.question_ar')" v-model.trim="data.nameAr" />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.question_en')" v-model.trim="data.nameEn" />
          <!-- End:: En Name Input -->

          <!-- Start:: Ar Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.answer_ar')"
            v-model.trim="data.descAr" />
          <!-- End:: Ar Desc Textarea -->

          <!-- Start:: En Desc Textarea -->
          <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.answer_en')"
            v-model.trim="data.descEn" />
          <!-- End:: En Desc Textarea -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

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
        active: true,
        type: null,
        types: []
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
        // this.data.type = res.data.data.type;
        this.data.types = res.data.extras;
        this.data.active = res.data.body.main_category.is_active;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // End:: Select Upload Image

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
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      if (this.data.image.file) {
        REQUEST_DATA.append("image", this.data.image.file);
      }
      // REQUEST_DATA.append("type", this.data.type.key);
      REQUEST_DATA.append("question[ar]", this.data.nameAr);
      REQUEST_DATA.append("question[en]", this.data.nameEn);
      REQUEST_DATA.append("answer[ar]", this.data.descAr);
      REQUEST_DATA.append("answer[en]", this.data.descEn);
      REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("_method", "PUT");
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `modules/faq/${this.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/FAQ/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "storesTypes edit");
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>

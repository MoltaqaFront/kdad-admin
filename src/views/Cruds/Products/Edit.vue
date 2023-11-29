<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.editProduct") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" required />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" required />
          <!-- End:: En Name Input -->

          <!-- <base-select-input col="6" :optionsList="allCategories" :placeholder="$t('PLACEHOLDERS.orderType')"
            v-model="data.category" required /> -->

          <base-select-input col="6" :optionsList="allStores" :placeholder="$t('PLACEHOLDERS.store')"
            v-model="data.storeType" required @input="getAllProductCategory" />

          <base-select-input col="6" :optionsList="product_category" :placeholder="$t('BUTTONS.Product_Category')"
            v-model="data.category_id" required />

          <!-- Start:: Price Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="data.price" required />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.discountPercentage')"
            v-model.trim="data.discount" required />

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.price_after_discount')"
            v-model.trim="data.price_after_discount" readonly />

          <div class="col-12">
            <div class="row">
              <!-- Start:: Ar Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descAr')"
                v-model.trim="data.descAr" required />
              <!-- End:: Ar Desc Textarea -->

              <!-- Start:: En Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descEn')"
                v-model.trim="data.descEn" required />
              <!-- End:: En Desc Textarea -->
            </div>
          </div>


          <div class="all_content">
            <h3 class="text-center">{{ $t('BUTTONS.additions') }}</h3>
            <div class="add_parent" @click="addParent">
              <i class="fas fa-plus-circle text-center main_plus"></i>
            </div>
            <div class="row repeat_parent" v-for="(parent, parentIndex) in parents" :key="'a' + parentIndex"
              style="border: 2px solid #F6A513;margin-bottom:20px;border-radius: 10px;">

              <div class="col-12">
                <div class="remove_minus_parent">
                  <i class="fas fa-minus-circle text-center" v-if="parents.length > 1" @click="removeParent(parent)"></i>
                </div>
              </div>

              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="parent.nameAr"
                  required />
              </div>

              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="parent.nameEn"
                  required />
              </div>

              <div class="col-lg-6 col-12">
                <base-select-input col="12" :optionsList="multipleStatus" :placeholder="$t('PLACEHOLDERS.item_name')"
                  v-model="parent.is_multiple_choice" required />
              </div>
              <div class="col-lg-6 col-12">
                <base-select-input col="12" :optionsList="requiredStatus" :placeholder="$t('PLACEHOLDERS.required_item')"
                  v-model="parent.is_required" required />
              </div>

              <div class="col-12">
                <h3 class="text-center">{{ $t('BUTTONS.components') }}</h3>
              </div>

              <div class="add_parent" @click="addChild(parentIndex)">
                <i class="fas fa-plus-circle text-center sub_plus"></i>
              </div>

              <div class="row repeat_child align-items-center" v-for="(child, childIndex) in parent.additions_children"
                :key="'b' + childIndex">
                <div class="col-lg-6 col-12">
                  <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="child.nameAr"
                    required />
                </div>
                <div class="col-lg-6 col-12">
                  <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="child.nameEn"
                    required />
                </div>
                <div class="col-lg-6 col-12">
                  <base-input type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="child.price" required />
                </div>

                <div class="col-lg-6 col-12">
                  <div class="remove_minus">
                    <i class="fas fa-minus-circle text-center" @click="removeChild(parentIndex, childIndex)"></i>
                  </div>
                </div>
              </div>

            </div>
          </div>


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
  name: "CreateProduct",

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
        price: null,
        discount: null,
        price_after_discount: null,
        descAr: null,
        descEn: null,
        active: true,

        category: null,
        storeType: null,
        category_id: null,

        multiple_choice: [],
        is_required: []

      },

      parents: [
        {
          id: this.generateUniqueId(),
          nameAr: '',
          nameEn: '',
          multiple_choice: '',
          is_required: '',
          additions_children: [
            // {
            //   nameAr: '',
            //   nameEn: '',
            //   price: ''
            // }
          ],
        },
      ],

      // End:: Data Collection To Send

      allStores: [],
      allCategories: [],

      product_category: []
    };
  },

  computed: {
    multipleStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.Multiple_Select"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.Single_Select"),
          value: 0,
        },
      ];
    },
    requiredStatus() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.yes"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.no"),
          value: 0,
        },
      ];
    },
  },
  watch: {

    'data.price': function (newPrice) {
      this.calculatePriceAfterDiscount();
    },

    'data.discount': function (newDiscount) {
      this.calculatePriceAfterDiscount();
    },

  },


  methods: {

    calculatePriceAfterDiscount() {
      const price = parseFloat(this.data.price);
      const discount = parseFloat(this.data.discount);
      const priceAfterDiscount = price - (price * discount / 100);

      if (discount) {
        this.data.price_after_discount = isNaN(priceAfterDiscount) ? 0 : priceAfterDiscount.toFixed(2);
      } else {
        this.data.price_after_discount = price;
      }

    },

    generateUniqueId() {
      return Math.random().toString(36).substr(2, 9);
    },

    addParent() {
      this.parents.push({
        nameAr: '',
        nameEn: '',
        is_multiple_choice: '',
        is_required: '',
        additions_children: [],
      });
    },

    addChild(parentIndex) {
      if (!this.parents[parentIndex].additions_children) {
        this.$set(this.parents[parentIndex], "additions_children", []);
      }
      this.parents[parentIndex].additions_children.push({
        nameAr: '',
        nameEn: '',
        price: '',
      });
    },

    removeParent(parent) {
      const index = this.parents.indexOf(parent);
      if (index !== -1) {
        this.parents.splice(index, 1);
      }
    },

    removeChild(parentIndex, childIndex) {
      if (this.parents[parentIndex].additions_children) {
        this.parents[parentIndex].additions_children.splice(childIndex, 1);
      }
    },
    // Start:: Select Upload Image
    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // End:: Select Upload Image

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
      } else if (!this.data.price) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.price"));
        return;
      } else if (!this.data.descAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.descAr"));
        return;
      } else if (!this.data.descEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.descEn"));
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
      REQUEST_DATA.append("title[ar]", this.data.nameAr);
      REQUEST_DATA.append("title[en]", this.data.nameEn);
      REQUEST_DATA.append("category_id", this.data.category_id?.id);
      REQUEST_DATA.append("store_id", this.data.storeType?.id);
      REQUEST_DATA.append("price", this.data.price);
      // REQUEST_DATA.append("discount", this.data.discount);
      // REQUEST_DATA.append("price_after_discount", this.data.price_after_discount);
      REQUEST_DATA.append("description[ar]", this.data.descAr);
      REQUEST_DATA.append("description[en]", this.data.descEn);
      REQUEST_DATA.append("is_active", +this.data.active);
      REQUEST_DATA.append("_method", "PUT");

      this.parents.forEach((parent, parentIndex) => {
        if (parent.id) {
          REQUEST_DATA.append(`additions[${parentIndex}][id]`, parent.id);
        } else {
          REQUEST_DATA.append(`additions[${parentIndex}][id]`, null);
        }
        REQUEST_DATA.append(`additions[${parentIndex}][name][ar]`, parent.nameAr);
        REQUEST_DATA.append(`additions[${parentIndex}][name][en]`, parent.nameEn);
        REQUEST_DATA.append(`additions[${parentIndex}][multiple_choice]`, parent.is_multiple_choice.id);
        REQUEST_DATA.append(`additions[${parentIndex}][required]`, parent.is_required.id);

        // Collect data from children of this parent
        parent.additions_children.forEach((child, childIndex) => {

          if (child.id) {
            REQUEST_DATA.append(`additions[${parentIndex}][sub_addition][${childIndex}][id]`, child.id);
          } else {
            REQUEST_DATA.append(`additions[${parentIndex}][sub_addition][${childIndex}][id]`, null);
          }

          REQUEST_DATA.append(`additions[${parentIndex}][sub_addition][${childIndex}][price]`, child.price);
          REQUEST_DATA.append(`additions[${parentIndex}][sub_addition][${childIndex}][name][ar]`, child.nameAr);
          REQUEST_DATA.append(`additions[${parentIndex}][sub_addition][${childIndex}][name][en]`, child.nameEn);
        });


      });
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `admin/products/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/products/all" });
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
          url: "admin/get-stores",
        });
        this.allStores = res.data.body.stores;
        console.log(res.data.body.stores)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async getAllCategories() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores/types/categories",
        });
        this.allCategories = res.data.body.orderTypes;
        console.log(res.data.body.orderTypes)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // end get all stores

    async getDataToEdit() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/products/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.body.product.image;
        this.data.nameAr = res.data.body.product.translations.title.ar;
        this.data.nameEn = res.data.body.product.translations.title.en;
        this.data.descAr = res.data.body.product.translations.description.ar;
        this.data.descEn = res.data.body.product.translations.description.en;
        this.data.category = res.data.body.product.category;
        this.data.storeType = res.data.body.product.store;
        this.data.price = res.data.body.product.price;
        this.data.discount = res.data.body.product.discount;
        this.data.price_after_discount = res.data.body.product.price_after_discount;
        this.parents = res.data.body.product.additions;
        this.data.active = res.data.body.product.is_active;
        this.data.category_id = res.data.body.product.category;

        console.log(res.data.body.product)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // start getAllProductCategory

    async getAllProductCategory() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: `admin/categories/${this.data.storeType?.id}`,
        });

        this.data.category_id = null;

        this.product_category = res.data.body.main_category;
        console.log(res.data.body.main_category)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    // end getAllProductCategory

  },

  async created() {
    // Start:: Fire Methods
    await this.$store.dispatch("PermissionsModule/checkRoutePermissions", "products create");
    // End:: Fire Methods

    this.getAllStores();
    this.getAllCategories();
    this.getDataToEdit()
  },
};
</script>

<style lang="scss" scoped>
.add_parent {
  text-align: center;

  i {
    font-size: 25px;
    cursor: pointer;

    color: #4CAF50
  }
}

.remove_minus {
  text-align: center;

  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}

.remove_minus_parent {
  i {
    font-size: 25px;
    color: red;
    cursor: pointer;
  }
}
</style>
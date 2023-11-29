<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showProduct") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" disabled />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr" disabled />
          <!-- End:: Ar Name Input -->

          <!-- Start:: En Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn" disabled />

          <!-- <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.orderType')" v-model.trim="data.category.name"
            disabled /> -->
          <!-- End:: En Name Input -->

          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.store')" v-model.trim="data.storeType.name"
            disabled />

          <base-input col="6" type="text" :placeholder="$t('BUTTONS.Product_Category')" v-model.trim="data.category_id"
            disabled />

          <!-- Start:: Price Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="data.price" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.discountPercentage')"
            v-model.trim="data.discount" disabled />
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.price_after_discount')"
            v-model.trim="data.price_after_discount" disabled />
          <!-- End:: Price Input -->

          <div class="col-12">
            <div class="row">
              <!-- Start:: Ar Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descAr')"
                v-model.trim="data.descAr" disabled />
              <!-- End:: Ar Desc Textarea -->

              <!-- Start:: En Desc Textarea -->
              <base-input col="6" rows="9" type="textarea" :placeholder="$t('PLACEHOLDERS.descEn')"
                v-model.trim="data.descEn" disabled />
              <!-- End:: En Desc Textarea -->
            </div>
          </div>


          <div class="all_content">
            <h3 class="text-center">{{ $t('BUTTONS.additions') }}</h3>

            <div class="row repeat_parent" v-for="(parent, parentIndex) in parents" :key="'a' + parentIndex"
              style="border: 2px solid #F6A513;margin-bottom:20px;border-radius: 10px;">

              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="parent.nameAr"
                  disabled />
              </div>

              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="parent.nameEn"
                  disabled />
              </div>

              <div class="col-lg-6 col-12">

                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.item_name')"
                  v-model.trim="parent.is_multiple_choice.name" disabled />

              </div>
              <div class="col-lg-6 col-12">

                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.required_item')"
                  v-model.trim="parent.is_required.name" disabled />

              </div>

              <div class="col-12">
                <h3 class="text-center">{{ $t('BUTTONS.components') }}</h3>
              </div>


              <div class="row repeat_child align-items-center" v-for="(child, childIndex) in parent.additions_children"
                :key="'b' + childIndex">
                <div class="col-lg-6 col-12">
                  <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="child.nameAr"
                    disabled />
                </div>
                <div class="col-lg-6 col-12">
                  <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="child.nameEn"
                    disabled />
                </div>
                <div class="col-lg-6 col-12">
                  <base-input type="text" :placeholder="$t('PLACEHOLDERS.price')" v-model.trim="child.price" disabled />
                </div>

              </div>

            </div>
          </div>


          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

          <!-- Start:: Submit Button Wrapper -->
          <!-- <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div> -->
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
          nameAr: '',
          nameEn: '',
          is_multiple_choice: '',
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
      allCategories: []
    };
  },

  computed: {
    multipleStatus() {
      return [
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.Multiple_Select"),
          value: 0,
        },
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.Single_Select"),
          value: 1,
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

  methods: {

    // start get all stores

    async getAllStores() {
      this.loading = true;
      try {
        let res = await this.$axios({
          method: "GET",
          url: "admin/stores",
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
        this.data.category_id = res.data.body.product.category.name;

        console.log(res.data.body.product)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

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
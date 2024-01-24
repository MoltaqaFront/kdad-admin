<template>
  <div class="show_all_content_wrapper">

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>

        <transition-group name="fade" v-if="receivedMessages.length">
          <div class="notification" v-for="(message, index) in receivedMessages" :key="'k' + index">

            <h3>{{ message.title }}</h3>
            <p>{{ message.message }}</p>

            <div v-if="message.id" :class="{ 'read': message.read == 1 }" class="delete_notification"
              @click="NotificationsReaded(message.id)">
              <i class="fas fa-check-double"></i>
            </div>
          </div>
        </transition-group>

        <p class="text-danger text-center text--darken-4 pt-5 pb-5" v-else>{{ $t('PLACEHOLDERS.no_notifications') }}</p>

        <!-- Start:: Pagination -->
        <template>
          <div class="pagination_container text-center mt-3 mb-0">
            <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
              :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
                " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'" />
          </div>
        </template>
        <!-- End:: Pagination -->

      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CreateContact",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      receivedMessages: [],

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      notificationCount: null
      // End:: Pagination Data

    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
      notificationsData: "NotificationsModule/notificationsData",
    }),
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.getData();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {

    // Start:: Vuex Actions
    ...mapActions({
      readAllNotifications: "NotificationsModule/readAllNotifications",
    }),
    // End:: Vuex Actions

    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "notifications/list",
          params: {
            withPagination: 1
          },
        });
        console.log("All Data ==>", res.data.data);
        this.receivedMessages = res.data.data.notifications;
        this.paginations.last_page = res.data.pagination.lastPageNumber;
        this.paginations.items_per_page = res.data.pagination.pageRequestedCount;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },

    async NotificationsReaded(item_id) {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `notifications/mark-read`,
          params: {
            "notification_id": item_id
          }
        });
        this.$message.success(res.data.message);
        this.readAllNotifications();
        this.notificationsData.unreadNotifications--;
        console.log("notificationsData.unreadNotifications", this.notificationsData.unreadNotifications)
        this.getData();
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
      }
    },

    updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },


  },

  created() {
    this.getData();

    navigator.serviceWorker.addEventListener('message', event => {
      const receivedMessage = event.data.data;

      receivedMessage.read = false;

      this.receivedMessages.unshift(receivedMessage);
      console.log(event.data.data)
    });

    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }

  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

.notification {
  background: #EEE;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  .delete_notification {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;

    &.read {
      i {
        color: #017ccb;
      }
    }

    i {
      font-size: 20px;
      color: #DDD
    }
  }
}

.text-danger {
  font-size: 22px
}
</style>

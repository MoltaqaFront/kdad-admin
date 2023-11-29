import AuthenticationMutations from "./mutations.js";
import AuthenticationActions from "./actions.js";
import AuthenticationGetters from "./getters.js";

export default {
    namespaced: true,

    state: {
        // START:: AUTHENTICATED USER DATA
        userId: localStorage.getItem("kdad_admin_dashboard_user_id"),
        userToken: localStorage.getItem("kdad_admin_dashboard_user_token"),
        userType: localStorage.getItem("kdad_admin_dashboard_user_type"),
        userName: localStorage.getItem("kdad_admin_dashboard_userName"),
        email: localStorage.getItem("kdad_admin_dashboard_email"),
        userAvatar: localStorage.getItem("kdad_admin_dashboard_user_avatar"),
        // END:: AUTHENTICATED USER DATA
    },

    mutations: AuthenticationMutations,
    actions: AuthenticationActions,
    getters: AuthenticationGetters,
};

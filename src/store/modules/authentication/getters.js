export default {
    // START:: GET AUTHENTICATED USER DATA
    getAuthenticatedUserData(state) {
        return {
            id: state.userId,
            type: state.userType,
            token: state.userToken,
            name: state.userName,
            email: state.email,
            avatar: state.userAvatar,
        };
    },
    // END:: GET AUTHENTICATED USER DATA
};

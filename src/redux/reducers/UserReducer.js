const initialState = {
  user: null,
  userToken: null,
  isUserCreated: false,
  showRegisterModal: false,
  showModal: false,
  showFormModal: false,
  isUserLogged: false,
  error: {},
  isEmailAvailable: true,
  isUsernameAvailable: true,
  isLoading: false,
  isFormLoading: true,
  form: null,
  formError: false,
  exercice: null,
  patients: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RETRIEVE_TOKEN":
      return {
        ...state,
        user: action.user,
        userToken: action.token,
        isUserLogged: action.isUserLogged,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        showModal: action.showModal,
        isUserLogged: action.isUserLogged,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        userToken: null,
        isUserLogged: false,
        form: null,
      };
    case "REGISTER":
      return {
        ...state,
        isUserCreated: action.isUserCreated,
        showRegisterModal: action.showModal,
        error: action.error,
        isLoading: false,
      };
    case "ON_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        showModal: action.payload,
      };
    case "HIDE_REGISTER_MODAL":
      return {
        ...state,
        showRegisterModal: action.payload,
      };
    case "HIDE_FORM_MODAL":
      return {
        ...state,
        showFormModal: action.payload,
      };
    case "CHECK_EMAIL":
      return {
        ...state,
        isEmailAvailable: action.isEmailAvailable,
      };
    case "CHECK_USERNAME":
      return {
        ...state,
        isUsernameAvailable: action.isUsernameAvailable,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_FORM":
      return {
        ...state,
        form: action.form,
        isFormLoading: action.isLoading,
      };
    case "SEND_FORM_DATA":
      return {
        ...state,
        showFormModal: true,
        isLoading: false,
        formError: action.formError,
      };
    case "GET_EXERCICE":
      return {
        ...state,
        exercice: action.payload,
      };
    case "GET_ALL_PATIENTS":
      return {
        ...state,
        patients: action.payload,
      };
    default:
      return state;
  }
};

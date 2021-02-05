import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

export const onUserLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
          // was on Axios.get changed by OB 28/01 to Axios.post
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/connect_user/?param1=${email}&param2=${password}`
      );
      console.log("login", response.data.user);
      try {
        await AsyncStorage.setItem(
          "userToken",
          response.data.user.juiz_secret_token_autolog[0]
        );
      } catch (error) {
        console.log(error.response);
      }
      dispatch({
        type: "LOGIN",
        payload: response.data.user,
        showModal: true,
        isUserLogged: true,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: "LOGIN",
        payload: error.response.data,
        showModal: true,
        isUserLogged: false,
      });
    }
  };
};

export const onUserLogout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: "LOGOUT" });
  };
};

export const onAppLaunch = () => {
  let userToken = null;
  return async (dispatch) => {
    // Get the token from asyncStorage
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.log(error);
    }
    // Compare the token with the back
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/autolog_user/?param1=${userToken}`
      );
      console.log("autolog", response);
      dispatch({
        type: "RETRIEVE_TOKEN",
        user: response.data.user,
        userToken: userToken,
        isUserLogged: true,
      });
      try {
        await AsyncStorage.setItem(
          "userToken",
          response.data.user.juiz_secret_token_autolog[0]
        );
      } catch (error) {
        console.log("autolog_asyncStorage_error", error.response);
      }
    } catch (error) {
      console.log("error_auto_log", error.response);
      dispatch({
        type: "RETRIEVE_TOKEN",
        user: null,
        userToken: null,
        isUserLogged: false,
      });
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
          // `http://seresa-tech.net/index.php/wp-json/wcra/v1/get_user_meta/?param1=${user.id}`
        "http://seresa-tech.net/index.php/wp-json/wcra/v1/get_user_meta/?param1=10"

      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const userRegister = (formData) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/create_user/?param1=${formData.email}&param2=${formData.password}&param3=${formData.username}&param4=${formData.name}&param5=${formData.lastname}&param6=${formData.phoneNumber}&param7=${formData.dateOfBirthToSend}&param8=${formData.gender}`
      );
      console.log("response", response);
      dispatch({ type: "REGISTER", isUserCreated: true, showModal: true });
    } catch (error) {
      console.log("error", error.response);
      dispatch({
        type: "REGISTER",
        isUserCreated: false,
        showModal: true,
        error: error.response.data,
      });
    }
  };
};

export const hideRegisterModal = (bool) => {
  return async (dispatch) => {
    dispatch({ type: "HIDE_REGISTER_MODAL", payload: !bool });
  };
};

export const hideModal = (bool) => {
  return async (dispatch) => {
    dispatch({ type: "HIDE_MODAL", payload: !bool });
  };
};

export const hideFormModal = (bool) => {
  return async (dispatch) => {
    dispatch({ type: "HIDE_FORM_MODAL", payload: !bool });
  };
};

export const checkEmail = (email) => {
  console.log("je cherche l'email");
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/check_email/?param1=${email}`
      );
      console.log(response.data, "réussite");
      dispatch({ type: "CHECK_EMAIL", isEmailAvailable: true });
    } catch (error) {
      console.log(error.response.data, "fail");
      dispatch({ type: "CHECK_EMAIL", isEmailAvailable: false });
    }
  };
};

export const checkUsername = (username) => {
  console.log("je cherche l'username", username);
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/check_username/?param1=${username}`
      );
      console.log(response.data);
      dispatch({ type: "CHECK_USERNAME", isUsernameAvailable: true });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "CHECK_USERNAME", isUsernameAvailable: false });
    }
  };
};

export const changePassword = (value, user) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/update_password/?param1=${value}&param2=${user.juiz_secret_token_autolog[0]}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
};
////////////////function to stop-patient

export const stopPatient = (user) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
          `http://seresa-tech.net/wp-json/wcra/v1/stop_paciente/?param1=${user.juiz_secret_token_autolog[0]}&param2=${user.juiz_list_paciente[0]}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
};

///////////////////////
export const setIsLoading = () => {
  return (dispatch) => {
    dispatch({ type: "SET_IS_LOADING" });
  };
};

export const getForm = (user) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/get_formulaire/?param1=${user.juiz_secret_token_autolog[0]}`
      );
      // console.log("response getForm", response);
      dispatch({ type: "GET_FORM", form: response.data.json_survey });
    } catch (error) {
      console.log("error form", error.response);
      dispatch({ type: "GET_FORM", form: error.response.data });
    }
  };
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

export const sendFormData = (user, data) => {
  data["indice"] = Object.values(data).reduce(reducer) * 2;
  console.log("data to be send", data);
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `http://seresa-tech.net/index.php/wp-json/wcra/v1/save_results/?param1=${
          user.juiz_secret_token_autolog[0]
        }&param2=${JSON.stringify(data)}`
      );
      console.log("sendFormData Response", response);
      dispatch({ type: "SEND_FORM_DATA", formError: false });
    }
    catch (error) {
      console.log("sendFormData Error", error.response);
      dispatch({ type: "SEND_FORM_DATA", formError: true });
    }
  };
};

export const getExercice = (user) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        // `http://seresa-tech.net/index.php/wp-json/wcra/v1/get_media/?param1=${user && user.role[0].slice(18)}`
            // `http://seresa-tech.net/index.php/wp-json/wcra/v1/get_media/?param1=${user.level_phase}`
            `http://seresa-tech.net/index.php/wp-json/wcra/v1/get_media/?param1=${user && user.mod6_capabilities[0].slice(29, 30)}`
      );
      console.log("getExercice", response);
      console.log(user.mod6_capabilities[0].slice(29, 30));
      dispatch({ type: "GET_EXERCICE", payload: response.data });
    } catch (error) {
      console.log("getExercice", error.response);
    }
  };
};

export const getPatient = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `https://seresa-tech.net/index.php/wp-json/wcra/v1/get_all_results/?param1=0`
      );
      console.log("getAllPatient", response);
      dispatch({ type: "GET_ALL_PATIENTS", payload: response.data });
    } catch (error) {
      console.log("error getAllPatient", error.response);
    }
  };
};

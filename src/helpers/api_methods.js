import axios from "axios"
import { Notification } from "components/Common/Notification"

//apply base url for axios
export const API_URL = "http://127.0.0.1:8000/api/v1"
// export const API_URL = "http://192.168.0.114:3390/api/v1"



export const axiosApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})
axiosApi.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    config.credentials = true
    const token = sessionStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] =
        "token " + sessionStorage.getItem("token")
    }
    

    return config
  },
  function (error) {
  }
)

axiosApi.interceptors.response.use(
  response => {
    console.log(response);

console.log(response.config);

console.log(response.headers.Cookie);

    const method = response.config.method
    const url = response.config.url

    if (method == "post") {
      switch (url) {
        case "/order/order/":
          Notification({
            type: "success",
            message: "Your Order has been placed",
            title: "",
          })
          break
        case "/account/production_manager/":
          Notification({
            type: "success",
            message: "Created successfully",
            title: "",
          })
          break

        case "/supervisor/finishedproducts/":
          Notification({
            type: "success",
            message: "Finished Product is Added",
            title: "",
          })
          break
        case "/supervisor/finished-product-id/":
          ""
          break
        default:
          Notification({
            type: "success",
            message: "Done",
            title: "",
          })
          break
      }
    }
    if (method == "delete") {
      Notification({
        type: "warning",
        message: "Done",
        title: "",
      })
    }
    if (method == "patch") {
      Notification({
        type: "success",
        message: "Updated successfully",
        title: "",
      })
    }
    if (method == "put") {
      Notification({
        type: "success",
        message: "Updated successfully",
        title: "",
      })
    }

    return response
  },
  err => {
    Notification({
      type: "error",
      message: err?.response?.data?.detail,
      title: err?.response?.statusText,
    })
    if (err.response.status == 401) {
      sessionStorage.clear("token")
      window.location.reload(false);
    }


  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function ApiPut(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

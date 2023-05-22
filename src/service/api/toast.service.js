import { get } from "lodash";
import { toast } from "react-toastify";

export const optionsError = {
  type: toast.TYPE.ERROR,
  closeButton: null,
  autoClose: 3000,
  className: "custom-toast",
};

export const optionsSuccess = {
  type: toast.TYPE.SUCCESS,
  closeButton: null,
  autoClose: 3000,
  className: "custom-toast",
};

export function toastError(error) {
  if (error.message === "Invalid token specified") {
    return toast(
      "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!",
      optionsError
    );
  }
  if (typeof error === "string") {
    return toast(error, optionsError);
  } else if (error.response) {
    if (!(error.response.status === 401)) {
      return toast(
        get(error.response, "data.message") || error.message,
        optionsError
      );
    }
  } else if (error.request) {
    return toast("Network error", optionsError);
  } else {
    return toast(error.message, optionsError);
  }
}

export function toastSuccess(success) {
  if (typeof success === "string") {
    return toast(success, optionsSuccess);
  } else if (success.response) {
    return toast(
      get(success.response, "data.message") || success.message,
      optionsSuccess
    );
  } else if (success.request) {
    return toast("Network error", optionsSuccess);
  } else {
    return toast(success.message, optionsSuccess);
  }
}

export class ToastInstance {
  toast;

  toastSuccess(message) {
    if (toast.isActive(this.toast)) {
      toast.update(this.toast, {
        render: message,
        closeButton: null,
        autoClose: 3000,
      });
    } else {
      this.toast = toastSuccess(message);
    }
  }

  toastError(message) {
    toast.dismiss();
    if (toast.isActive(this.toast)) {
      toast.update(this.toast, {
        render: message,
        closeButton: null,
        autoClose: 3000,
      });
    } else {
      return (this.toast = toastError(message));
    }
  }
}

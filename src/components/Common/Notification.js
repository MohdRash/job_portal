import toastr from "toastr";
import "toastr/build/toastr.min.css";

export function Notification({ type, title, message }) {
    toastr.options = {
        positionClass: "toast-top-right",
        timeOut: 2000,
        extendedTimeOut: 500,
        // closeButton: closeButton,
        // debug: debug,
        // progressBar: progressBar,
        preventDuplicates: "preventDuplicates",
        newestOnTop: "newestOnTop",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        showDuration: 300,
        hideDuration: type == "error" ? 500 : 300
    };

    if (type === "info") toastr.info(message, title);
    else if (type === "warning") toastr.warning(message, title);
    else if (type === "error") toastr.error(message, title);
    else toastr.success(message, title);

    return (true)
}

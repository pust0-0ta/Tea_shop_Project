$(document).ready(function () {
  const DIGITS = "0123456789";

  // Маска для телефона
  let phone = $("#phone");
  phone.inputmask({ mask: "+7 (999) 999-99-99" });

  // Обработчик для формы "Закажите чай"
  $("#createOrder").on("click", function (e) {
    e.preventDefault();
    const nameProduct = $("#nameProduct").val();
    const userName = $("#name").val();
    const userPhone = $("#phone").val();

    $.ajax({
      url: "http://localhost/tea_shop/php/save_contact.php",
      type: "POST",
      data: {
        nameProduct: nameProduct,
        name: userName,
        phone: userPhone,
      },
      success: function () {
        $("#name").val("");
        $("#phone").val("");
        $("#orderBg").hide();
        $("#order-background-thanks").show();
        $("#close").on("click", () => {
          $("#order-background-thanks").hide();
        });
      },
    });
  });

  // Маска для второго поля телефона
  let userPhone = $("#userPhone");
  userPhone.inputmask({ mask: "+7 (999) 999-99-99" });

  // Обработчик для формы "Связаться с нами"
  $("#OrderUserForm").on("click", function (e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const userPhone = $("#userPhone").val();
    const message = "Ваше сообщение"; // Можете изменить или взять значение из другого поля, если нужно

    $.ajax({
      url: "http://localhost/tea_shop/php/save_contact.php",
      type: "POST",
      data: {
        name: userName,
        phone: userPhone,
        message: message,
      },
      success: function () {
        $("#userName").val("");
        $("#userPhone").val("");
        $("#order-background-contact").hide();
        $("#order-background-thanks").show();
        $("#close").on("click", () => {
          $("#order-background-thanks").hide();
        });
      },
    });
  });

  // Открытие и закрытие попапов
  $("#headerBtn, #footerBtn").on("click", function (e) {
    e.preventDefault();
    $("#order-background-contact").css("display", "flex");
    $(".close").on("click", () => {
      $("#order-background-contact").hide();
    });
  });

  $("#openModal").on("click", function (e) {
    e.preventDefault();
    $("#orderBg").css("display", "flex");
    $(".close").on("click", () => {
      $("#orderBg").hide();
    });
  });
});

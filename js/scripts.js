$(document).ready(function () {
  $("#iconCaretLeft").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  $("#iconCaretRight").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  $("#home").on("click", function () {
    goToHome();
  });

  $("#mosaico3x3").on("click", function () {
    numQuadrosMosaico = "3x3";
    mosaico();
  });

  $("#mosaico2x2").on("click", function () {
    numQuadrosMosaico = "2x2";
    mosaico();
  });

  $("#mosaico1x1").on("click", function () {
    numQuadrosMosaico = "1x1";
    mosaico();
  });

  $("#mosaico1").on("click", function () {
    numQuadrosMosaico = "1";
    mosaico();
  });

  $("#btnConfigPadraoTombador01").click(function () {
    setaConfiguracao3x3PadraoTombador("tombador01");
  });

  $("#btnConfigPadraoTombador02").click(function () {
    setaConfiguracao3x3PadraoTombador("tombador02");
  });
});

let mosaicoCameras = {
  quadro1: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
  quadro2: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
  quadro3: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
  quadro4: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
  quadro5: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
  quadro6: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
  quadro7: {
    idMenu: "",
    urlCamera: "",
    tombador: "",
  },
};

let numQuadrosMosaico = "";

let quadroMosaicoSelecionado = "";

let quadroMosaicoSelecionadoAnteriormente = "";

function insereUrlQuadroMosaico(urlCamera, idItemMenu, tombador) {
  let countCamFor01 = 0;

  if (numQuadrosMosaico == "" || numQuadrosMosaico == null) {
    alert("Para visualizar câmeras por favor escolha uma configução de quadro");
    return;
  }

  if (quadroMosaicoSelecionado != "") {
    console.log(mosaicoCameras[quadroMosaicoSelecionado].urlCamera);

    if (
      mosaicoCameras[quadroMosaicoSelecionado].urlCamera != "" ||
      mosaicoCameras[quadroMosaicoSelecionado].idMenu != ""
    ) {
      removeUrlQuadroMosaico(
        mosaicoCameras[quadroMosaicoSelecionado].urlCamera,
        mosaicoCameras[quadroMosaicoSelecionado].idMenu
      );
    }

    removeUrlQuadroMosaico(urlCamera, idItemMenu);
    mosaicoCameras[quadroMosaicoSelecionado].urlCamera = urlCamera;
    mosaicoCameras[quadroMosaicoSelecionado].idMenu = idItemMenu;
    mosaicoCameras[quadroMosaicoSelecionado].tombador = tombador;

    quadroMosaicoSelecionado = "";
    adicionaCorVerdeIconeVideoMenu(idItemMenu);
    mosaico();
    verificaQuadrosTemCameraTombador();

    return;
  }

  for (const key in mosaicoCameras) {
    if (mosaicoCameras.hasOwnProperty(key)) {
      if (mosaicoCameras[key].urlCamera == urlCamera) {
        mosaico();
        return;
      }
    }
  }

  for (const key in mosaicoCameras) {
    countCamFor01++;

    if (countCamFor01 > 6) {
      alert(
        "Todos os quadro do mosaico estão preenchidos. Se quiser adicionar esta câmera selecione um quadro para substituir"
      );
      return;
    }

    if (mosaicoCameras.hasOwnProperty(key)) {
      if (mosaicoCameras[key].urlCamera == "" && countCamFor01 < 7) {
        console.log(countCamFor01);
        mosaicoCameras[key].urlCamera = urlCamera;
        mosaicoCameras[key].idMenu = idItemMenu;
        mosaicoCameras[key].tombador = tombador;
        console.log(mosaicoCameras);
        adicionaCorVerdeIconeVideoMenu(idItemMenu);
        mosaico();
        verificaQuadrosTemCameraTombador();
        return;
      }
    }
  }
}

function removeUrlQuadroMosaico(urlCamera, idItemMenu) {
  console.log(mosaicoCameras);

  for (const key in mosaicoCameras) {
    if (mosaicoCameras.hasOwnProperty(key)) {
      if (mosaicoCameras[key].urlCamera == urlCamera) {
        mosaicoCameras[key].urlCamera = "";
        mosaicoCameras[key].idMenu = "";
        mosaicoCameras[key].tombador = "";
        removeCorVerdeIconeVideoMenu(idItemMenu);

        mosaico();
        verificaQuadrosTemCameraTombador();

        return;
      }
    }
  }
}

function mosaico() {
  let numCam = 0;

  $("#content").html("");

  // verificaQuadrosTemCameraTombador();

  switch (numQuadrosMosaico) {
    case "3x3":
      $("#content").append(
        `<div id="linha1" class="row col-lg-12 p-0 m-0 h-50">
        </div>`
      );

      $("#content").append(
        `<div id="linha2" class="row col-lg-12 p-0 m-0 h-50">
          </div>`
      );

      for (const key in mosaicoCameras) {
        numCam++;

        if (mosaicoCameras.hasOwnProperty(key)) {
          if (numCam < 4) {
            $("#linha1").append(
              `<div 
              id="${key}"
              class="col-4 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000" 
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                ${
                  mosaicoCameras[key].urlCamera !== ""
                    ? `<img
                    name="img${key}"
                    id="img${key}"
                    width="100%"
                    height="100%"
                    src="${mosaicoCameras[key].urlCamera}"
                  />`
                    : `<img
                    name="img${key}"
                    id="img${key}"
                    class=""
                    width="7%"
                    height="7%"
                    src="assets/video-solid.svg"
                  />`
                }`
            );
          } else if (numCam < 7) {
            $("#linha2").append(
              `<div 
              id="${key}"
              class="col-4 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000"
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                  ${
                    mosaicoCameras[key].urlCamera !== ""
                      ? `<img
                      name="main"
                      id="main"
                      width="100%"
                      height="100%"
                      src="${mosaicoCameras[key].urlCamera}"
                    />`
                      : `<img
                      name="main"
                      id="iconVideoEmpty"
                      class=""
                      width="7%"
                      height="7%"
                      src="assets/video-solid.svg"
                    />`
                  }`
            );
          }
        }
      }

      break;

    case "2x2":
      $("#content").append(
        `<div id="linha1" class="row col-lg-12 p-0 m-0 h-50">
        </div>`
      );

      $("#content").append(
        `<div id="linha2" class="row col-lg-12 p-0 m-0 h-50">
          </div>`
      );

      for (const key in mosaicoCameras) {
        numCam++;

        if (mosaicoCameras.hasOwnProperty(key)) {
          if (numCam < 3) {
            $("#linha1").append(
              `<div 
              id="${key}"
              class="col-6 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000" 
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                  ${
                    mosaicoCameras[key].urlCamera !== ""
                      ? `<img
                      name="img${key}"
                      id="img${key}"
                      width="100%"
                      height="100%"
                      src="${mosaicoCameras[key].urlCamera}"
                    />`
                      : `<img
                      name="img${key}"
                      id="img${key}"
                      class=""
                      width="7%"
                      height="7%"
                      src="assets/video-solid.svg"
                    />`
                  }`
            );
          } else if (numCam < 5) {
            $("#linha2").append(
              `<div 
              id="${key}"
              class="col-6 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000" 
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                  ${
                    mosaicoCameras[key].urlCamera !== ""
                      ? `<img
                      name="img${key}"
                      id="img${key}"
                      width="100%"
                      height="100%"
                      src="${mosaicoCameras[key].urlCamera}"
                    />`
                      : `<img
                      name="img${key}"
                      id="img${key}"
                      class=""
                      width="7%"
                      height="7%"
                      src="assets/video-solid.svg"
                    />`
                  }`
            );
          }
        }
      }

      break;

    case "1x1":
      $("#content").append(
        `<div id="linha1" class="row col-lg-12 p-0 m-0 h-100">
        </div>`
      );
      for (const key in mosaicoCameras) {
        numCam++;

        if (mosaicoCameras.hasOwnProperty(key)) {
          if (numCam < 2) {
            $("#linha1").append(
              `<div 
              id="${key}"
              class="col-6 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000" 
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                  ${
                    mosaicoCameras[key].urlCamera !== ""
                      ? `<img
                      name="img${key}"
                      id="img${key}"
                      width="100%"
                      height="100%"
                      src="${mosaicoCameras[key].urlCamera}"
                    />`
                      : `<img
                      name="img${key}"
                      id="img${key}"
                      class=""
                      width="7%"
                      height="7%"
                      src="assets/video-solid.svg"
                    />`
                  }`
            );
          } else if (numCam < 3) {
            $("#linha1").append(
              `<div 
              id="${key}"
              class="col-6 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000" 
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                  ${
                    mosaicoCameras[key].urlCamera !== ""
                      ? `<img
                      name="img${key}"
                      id="img${key}"
                      width="100%"
                      height="100%"
                      src="${mosaicoCameras[key].urlCamera}"
                    />`
                      : `<img
                      name="img${key}"
                      id="img${key}"
                      class=""
                      width="7%"
                      height="7%"
                      src="assets/video-solid.svg"
                    />`
                  }`
            );
          }
        }
      }

      break;

    case "1":
      for (const key in mosaicoCameras) {
        numCam++;

        if (mosaicoCameras.hasOwnProperty(key)) {
          if (numCam < 2) {
            $("#content").append(
              `<div 
              id="${key}"
              class="col-12 p-0 m-0 h-100 ${
                !mosaicoCameras[key].urlCamera
                  ? "d-flex align-items-center justify-content-center"
                  : ""
              } cursor-pointer" style="border: 1px solid #000000" 
              onclick="selecionaQuadroMosaido(${numCam})"
              ondblclick="quadroMosaicoIndividualMaximizado('${
                mosaicoCameras[key].urlCamera
              }')">
                  ${
                    mosaicoCameras[key].urlCamera !== ""
                      ? `<img
                      name="img${key}"
                      id="img${key}"
                      width="100%"
                      height="100%"
                      src="${mosaicoCameras[key].urlCamera}"
                    />`
                      : `<img
                      name="img${key}"
                      id="img${key}"
                      class=""
                      width="7%"
                      height="7%"
                      src="assets/video-solid.svg"
                    />`
                  }`
            );
          }
        }
      }

      break;

    default:
      $("#content").append("default");
      break;
  }
}

function selecionaQuadroMosaido(numQuadro) {
  console.log(quadroMosaicoSelecionadoAnteriormente);

  if (quadroMosaicoSelecionadoAnteriormente != "") {
    $("#" + quadroMosaicoSelecionadoAnteriormente).css("border-width", "1px");
    $("#" + quadroMosaicoSelecionadoAnteriormente).css("border-color", "black");
  }

  quadroMosaicoSelecionadoAnteriormente = `quadro${numQuadro}`;
  quadroMosaicoSelecionado = `quadro${numQuadro}`;

  console.log(quadroMosaicoSelecionado);

  $("#" + quadroMosaicoSelecionado).css("border-width", "3px");
  $("#" + quadroMosaicoSelecionado).css("border-color", "red");
}

function quadroMosaicoIndividualMaximizado(urlCamera) {
  $("#content").html("");
  $("#content").html(
    `<div 
    id="${urlCamera}"
    class="col-12 p-0 m-0 h-100 ${
      urlCamera == "" ? "d-flex align-items-center justify-content-center" : ""
    } cursor-pointer" style="border: 1px solid #000000" ondblclick="mosaico()">
        ${
          urlCamera !== ""
            ? `<img
            name="quadroMosaicoIndividualMaximizado"
            id="quadroMosaicoIndividualMaximizado"
            width="100%"
            height="100%"
            src="${urlCamera}"
          />`
            : `<img
            name="quadroMosaicoIndividualMaximizado"
            id="quadroMosaicoIndividualMaximizado"
            class=""
            width="7%"
            height="7%"
            src="assets/video-solid.svg"
          />`
        }`
  );
}

function goToHome() {
  $("#content").html("");
  $("#content").html(`
  <div
    class="row col-12 mx-0 mt-3 p-0 d-flex align-items-center justify-content-center"
  >
    <img src="assets/live-line-black.svg" alt="" style="height: 12%; width: 12%" />
    <h1 class="p-0 m-0 ml-2 text-center font-weight-bold">CÂMERAS</h1>
  </div>
  
  <div
    class="row col-12 m-0 mt-5 mb-3 p-0 pt-5 d-flex align-items-center justify-content-center"
  >
    <h3 class="p-0 m-0 text-center font-weight-bold">
      ESCOLHA NÚMERO DE QUADROS DO MOSAICO OU UMA CONFIGURAÇÃO PADRÃO
    </h3>
  </div>

  <div
    class="row col-12 m-0 p-0 d-flex align-items-center justify-content-center"
  >
    <div
      id="btnConfigPadraoTombador01"
      class="col-2 btn btn-primary m-0 mr-3 p-3 d-flex align-items-center justify-content-center"
      style="height: 100px; border-radius: 10px"
      onclick="setaConfiguracao3x3PadraoTombador('tombador01')"
    >
      <i class="fas fa-video fa-2x text-light"></i>

      <span class="ml-2 font-weight-bold text-light">Preset 01</span>
    </div>

    <div
      id="btnConfigPadraoTombador01"
      class="col-2 btn btn-primary m-0 mr-3 p-3 d-flex align-items-center justify-content-center"
      style="height: 100px; border-radius: 10px"
      onclick="setaConfiguracao3x3PadraoTombador('tombador02')"
    >
      <i class="fas fa-video fa-2x text-light"></i>

      <span class="ml-2 font-weight-bold text-light">Preset 02</span>
    </div>
  </div>
</div>
      `);
}

function setaConfiguracao3x3PadraoTombador(tombador) {
  switch (tombador) {
    case "tombador01":
      mosaicoCameras.quadro1.urlCamera =
        "http://100.117.40.34/mjpg/1/video.mjpg";
      mosaicoCameras.quadro1.idMenu = "tombador01-tpe";
      mosaicoCameras.quadro1.tombador = 1;

      mosaicoCameras.quadro2.urlCamera =
        "http://100.117.40.33/mjpg/1/video.mjpg";
      mosaicoCameras.quadro2.idMenu = "tombador01-tpd";
      mosaicoCameras.quadro2.tombador = 1;

      mosaicoCameras.quadro3.urlCamera =
        "http://100.117.40.31/mjpg/1/video.mjpg";
      mosaicoCameras.quadro3.idMenu = "tombador01-tc01";
      mosaicoCameras.quadro3.tombador = 1;

      mosaicoCameras.quadro4.urlCamera =
        "http://100.117.40.36/mjpg/1/video.mjpg";
      mosaicoCameras.quadro4.idMenu = "tombador01-tre";
      mosaicoCameras.quadro4.tombador = 1;

      mosaicoCameras.quadro5.urlCamera =
        "http://100.117.40.35/mjpg/1/video.mjpg";
      mosaicoCameras.quadro5.idMenu = "tombador01-trd";
      mosaicoCameras.quadro5.tombador = 1;

      mosaicoCameras.quadro6.urlCamera =
        "http://100.117.40.32/mjpg/1/video.mjpg";
      mosaicoCameras.quadro6.idMenu = "tombador01-tc02";
      mosaicoCameras.quadro6.tombador = 1;

      removeCorVerdeIconeVideoMenu("tombador02-tc01");
      adicionaCorVerdeIconeVideoMenu("tombador01-tc01");

      removeCorVerdeIconeVideoMenu("tombador02-tc02");
      adicionaCorVerdeIconeVideoMenu("tombador01-tc02");

      removeCorVerdeIconeVideoMenu("tombador02-tpe");
      adicionaCorVerdeIconeVideoMenu("tombador01-tpe");

      removeCorVerdeIconeVideoMenu("tombador02-tpd");
      adicionaCorVerdeIconeVideoMenu("tombador01-tpd");

      removeCorVerdeIconeVideoMenu("tombador02-tre");
      adicionaCorVerdeIconeVideoMenu("tombador01-tre");

      removeCorVerdeIconeVideoMenu("tombador02-trd");
      adicionaCorVerdeIconeVideoMenu("tombador01-trd");

      numQuadrosMosaico = "3x3";

      mosaico();
      verificaQuadrosTemCameraTombador();

      break;

    case "tombador02":
      mosaicoCameras.quadro1.urlCamera =
        "http://100.117.40.40/mjpg/1/video.mjpg";
      mosaicoCameras.quadro1.idMenu = "tombador02-tpe";
      mosaicoCameras.quadro1.tombador = 2;

      mosaicoCameras.quadro2.urlCamera =
        "http://100.117.40.39/mjpg/1/video.mjpg";
      mosaicoCameras.quadro2.idMenu = "tombador02-tpd";
      mosaicoCameras.quadro2.tombador = 2;

      mosaicoCameras.quadro3.urlCamera =
        "http://100.117.40.37/mjpg/1/video.mjpg";
      mosaicoCameras.quadro3.idMenu = "tombador02-tc01";
      mosaicoCameras.quadro3.tombador = 2;

      mosaicoCameras.quadro4.urlCamera =
        "http://100.117.40.42/mjpg/1/video.mjpg";
      mosaicoCameras.quadro4.idMenu = "tombador02-tre";
      mosaicoCameras.quadro4.tombador = 2;

      mosaicoCameras.quadro5.urlCamera =
        "http://100.117.40.41/mjpg/1/video.mjpg";
      mosaicoCameras.quadro5.idMenu = "tombador02-trd";
      mosaicoCameras.quadro5.tombador = 2;

      mosaicoCameras.quadro6.urlCamera =
        "http://100.117.40.38/mjpg/1/video.mjpg";
      mosaicoCameras.quadro6.idMenu = "tombador02-tc02";
      mosaicoCameras.quadro6.tombador = 2;

      removeCorVerdeIconeVideoMenu("tombador01-tc01");
      adicionaCorVerdeIconeVideoMenu("tombador02-tc01");

      removeCorVerdeIconeVideoMenu("tombador01-tc02");
      adicionaCorVerdeIconeVideoMenu("tombador02-tc02");

      removeCorVerdeIconeVideoMenu("tombador01-tpe");
      adicionaCorVerdeIconeVideoMenu("tombador02-tpe");

      removeCorVerdeIconeVideoMenu("tombador01-tpd");
      adicionaCorVerdeIconeVideoMenu("tombador02-tpd");

      removeCorVerdeIconeVideoMenu("tombador01-tre");
      adicionaCorVerdeIconeVideoMenu("tombador02-tre");

      removeCorVerdeIconeVideoMenu("tombador01-trd");
      adicionaCorVerdeIconeVideoMenu("tombador02-trd");

      numQuadrosMosaico = "3x3";

      mosaico();

      verificaQuadrosTemCameraTombador();

      break;

    default:
      break;
  }
}

function adicionaCorVerdeIconeVideoMenu(idLista) {
  if (
    !$("#" + idLista)
      .children("a")
      .children("svg")
      .hasClass("text-success")
  ) {
    $("#" + idLista)
      .children("a")
      .children("svg")
      .toggleClass("text-success");
  }
}

function removeCorVerdeIconeVideoMenu(idLista) {
  if (
    $("#" + idLista)
      .children("a")
      .children("svg")
      .hasClass("text-success")
  ) {
    $("#" + idLista)
      .children("a")
      .children("svg")
      .removeClass("text-success");
  }
}

function verificaQuadrosTemCameraTombador() {
  let countCamFor1 = 0;
  let countCamFor2 = 0;

  let temCameraTombador1 = false;
  let temCameraTombador2 = false;

  console.log(mosaicoCameras);

  for (const key in mosaicoCameras) {
    if (mosaicoCameras.hasOwnProperty(key)) {
      countCamFor1++;

      if (mosaicoCameras[key].tombador == 1 && countCamFor1 < 7) {
        console.log("teste 11");

        temCameraTombador1 = true;
      }
    }
  }

  for (const key in mosaicoCameras) {
    if (mosaicoCameras.hasOwnProperty(key)) {
      countCamFor2++;

      if (mosaicoCameras[key].tombador == 2 && countCamFor2 < 7) {
        console.log("teste 22");

        temCameraTombador2 = true;
      }
    }
  }

  if (temCameraTombador1) {
    console.log("teste 1");
    if (
      !$("#tombador01-menutoggle")
        .children("a")
        .children("svg")
        .hasClass("text-success")
    ) {
      $("#tombador01-menutoggle")
        .children("a")
        .children("svg")
        .toggleClass("text-success");
    }
  } else {
    $("#tombador01-menutoggle")
      .children("a")
      .children("svg")
      .removeClass("text-success");
  }

  if (temCameraTombador2) {
    console.log("teste 2");

    if (
      !$("#tombador02-menutoggle")
        .children("a")
        .children("svg")
        .hasClass("text-success")
    ) {
      $("#tombador02-menutoggle")
        .children("a")
        .children("svg")
        .toggleClass("text-success");
    }
  } else {
    $("#tombador02-menutoggle")
      .children("a")
      .children("svg")
      .removeClass("text-success");
  }
}

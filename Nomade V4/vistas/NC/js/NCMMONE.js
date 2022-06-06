

function GrabarMoneda() {


    var mensaje = "";
    var codigo = $("#txtCodMoneda").val();
    var cod_sunat = "";
    var descripcion = $("#txtNomMone").val();
    var activo = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var des_corto = $("#txtNomCorto").val();
    var simbolo = $("#txtSimbolo").val();
    var pais = "";
    var empresa = "";
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();
   

    if (vErrors(["txtNomMone", "txtNomCorto", "txtSimbolo"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMMONE.ASHX", {
            opcion: 'N', codigo: codigo, cod_sunat: cod_sunat, descripcion: descripcion, activo: activo, des_corto: des_corto, simbolo: simbolo, pais: pais, empresa: empresa, usuario: usuario
        },

      function (res) {
          Desbloquear("ventana");
          if (res != "EXIS" && res.length == 4) {
              $("#txtCodMoneda").val(res);
              exito();
              $("#grabar").html("<i class='icon-pencil'></i> Modificar");
              $("#grabar").attr("href", "javascript:Modificar();");
          } else {

              switch (res) {
                  case 'EXIS':
                      existeCod(cod_sunat);
                      break;
                  case 'DUP':
                      duplicidadCod(nom_zona);
                      break;
                  case 'CSN':
                      CodDescDup(cod_sunat, nom_zona);
                      break;
              }
          }
      });
    }
}

function Modificar() {

    var mensaje = "";
    var codigo = $("#txtCodMoneda").val();
    var cod_sunat = "";
    var descripcion = $("#txtNomMone").val();
    var activo = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var des_corto = $("#txtNomCorto").val();
    var simbolo = $("#txtSimbolo").val();
    var pais = "";
    var empresa ="";
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();

   

    if (vErrors(["txtNomMone", "txtNomCorto", "txtSimbolo"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMMONE.ASHX", {
            opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, descripcion: descripcion, activo: activo, des_corto: des_corto, simbolo: simbolo, pais: pais, empresa: empresa, usuario: usuario
        },
            function (res) {
                Desbloquear("ventana");
                if (res == 'OK') {
                    exito();
                } else {

                    switch (res) {
                        case 'EXIS':
                            existeCod(cod_sunat);
                            break;
                        case 'DUP':
                            duplicidadCod(descripcion);
                            break;
                        case 'CSN':
                            CodDescDup(cod_sunat, descripcion);
                            break;
                    }
                }
            }
            );
    }
}

var NCMMONE = function () {
    var plugins = function () {
        $("#txtNomMone").focus(function () {
            $(this).inputmask({ "mask": "L", "repeat": 50, "greedy": false });
        });

        $("#txtNomCorto").focus(function () {
            $(this).inputmask({ "mask": "L", "repeat": 20, "greedy": false });
        });
        $("#txtSimbolo").focus(function () {
            $(this).inputmask({ "mask": "S", "repeat": 5, "greedy": false });
        });
      

        

    
    }

    var datatable = function () {
    }

    var fillCboPais = function () {

        var selectCboPais = $("#cboPais");
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmmone.ashx?opcion=1",
            contenttype: "application/json",
            datatype: "json",
            success: function (datos) {
                selectCboPais.empty();
                for (var i = 0; i < datos.length; i++) {
                    selectCboPais.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillCboEmpresa = function () {

        var selectCboEmpresa = $("#cboEmpresa");
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmmone.ashx?opcion=2&usuario=" + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            success: function (datos) {
                selectCboEmpresa.empty();
                for (var i = 0 ; i < datos.length; i++) {
                    selectCboEmpresa.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        })
    }

    var cargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmmone.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {
                    $("#txtCodMoneda").val(datos[0].CODE);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }
                    $("#s2id_cboPais a .select2-chosen").html(datos[0].DESC_PAIS);
                    $("#cboPais option[value=" + datos[0].CODE_PAIS + "]").attr("selected", true);
                    $('#txtCodSunat').val(datos[0].CODIGO_SUNAT);
                    $('#txtNomMone').val(datos[0].DESC_MONE);
                    $('#txtNomCorto').val(datos[0].DESCRIP_CORTO);
                    $('#txtSimbolo').val(datos[0].SIMBOLO);
                    $('#cboPais').val(datos[0].NOMBRE_CORTO);
                    $("#s2id_cboEmpresa a .select2-chosen").html(datos[0].NOMBRE_EMPRESA);
                    $("#cboEmpresa option[value=" + datos[0].CODIGO_EMPRESA + "]").attr("selected", true)
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        }

    }
    return {

        init: function () {
            plugins();
            datatable();
            fillCboPais();
            fillCboEmpresa();
            cargaInicial();
        }

    };

}();

var NCLMONE = function () {

    var fillBandejaMoneda = function() {


        var json=jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjMoneda').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Descripcion" },
                { data: "Descripcion_Corto" },
                { data: "Simbolo" },                
                {
                    data: "estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: null,
                    defaultContent: '<a class="btn green cambiarbt"><i class="icon-refresh"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                }
            ]

        }

        oTableMoneda = iniciaTabla('tblMoneda', parms);
        $('#tblMoneda').removeAttr('style');

        

        $('#tblMoneda tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableMoneda.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableMoneda.fnGetPosition(this);
                var row = oTableMoneda.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmmone&codigo=' + codigo;
            }

        });

        $('#tblMoneda tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableMoneda.api(true).row($(this).parent().parent()).index();
            var row = oTableMoneda.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMMONE.ASHX", { opcion: "A", codigo: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableMoneda.fnGetData(pos).estado = res;
                        refrescaTabla(oTableMoneda);
                        exito();


                    } else {
                        noexito();
                    }

                });
            $.ajaxSetup({ async: true });

        });




    }




    return {
        init: function () {

            fillBandejaMoneda();
        }
    };

}();







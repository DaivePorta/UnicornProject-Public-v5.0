var NCLGPRO = function () {

    var fillBandejaTipoRegimen = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJson').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: "NOMBRE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                 {
                     data: "DESCRIPCION",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                {
                    data: "NESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                ,
                      {
                          data: null,
                          defaultContent: '<a class="btn green"><i class="icon-refresh"></i></a>',
                          createdCell: function (td, cellData, rowData, row, col) {

                              $(td).attr('align', 'center')

                          }
                      }

            ]

        }

        oTable = iniciaTabla('tbl_gru_prov', parms);
        $('#tbl_gru_prov').removeAttr('style');
        $('#tbl_gru_prov tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var CODIGO = row.CODIGO;
                window.location.href = '?f=ncmgpro&codigo=' + CODIGO;
            }
        });

        $('#tbl_gru_prov tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod = row.CODIGO;





            Bloquear("ventana");
            $.post("vistas/NC/ajax/NCMGPRO.ASHX", { OPCION: "AT", GRUP_CODE: cod, TIPO: "ESTADO" },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO"

                        oTable.fnGetData(pos).NESTADO = res;
                        refrescaTabla(oTable);

                        exito();



                    } else {
                        noexito();
                    }

                });


        });
    }

    return {
        init: function () {
            fillBandejaTipoRegimen();
        }
    };

}();


var NCMGPRO = function () {


    var plugins = function(){
        $("#cboProveedor").select2();
    
    }
    var eventoControles = function () {

        $('#txt_nombre').on('focus', function () {
            $('#txt_nombre').inputmask({ "mask": "l", "repeat": 100, "greedy": false });

        });

        $('#btn_add').on('click', function () {
            var GRUP_CODE = '';
            var PIDM = '';



            GRUP_CODE = $.trim($('#txtcodigo').val());
            PIDM = $("#cboProveedor").val();


            var data = new FormData();

            data.append("OPCION", "AP");
            data.append("GRUP_CODE", GRUP_CODE);
            data.append("PIDM", PIDM);



            if (vErrors("cboProveedor")) {

                Bloquear("divadd_prov");

                $.ajax({
                    url: "vistas/nc/ajax/NCMGPRO.ASHX",
                    type: "post",
                    contentType: false,
                    data: data,
                    processData: false,
                    cache: false,
                    success: function (datos) {
                        Desbloquear("divadd_prov");
                        if (datos != "e") {

                            //$("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfjson").val(JSON.stringify(datos));
              

                            GetProv_Grup(GRUP_CODE);
                            exito();

                        } else { alertCustom("El proveedor ya se agrego a la lista!!!"); }

                    },
                    error: function (msg) {
                        Desbloquear("divadd_prov");
                        noexito();

                    }
                });

            }
        }); 

        $('#chkactivo').on('click', function () {
            if ($("#chkactivo").is(':checked')) {

                $('#uniform-chkactivo span').removeClass().addClass("checked");
                $('#chkactivo').attr('checked', true);
            } else {

                $('#uniform-chkactivo span').removeClass();
                $('#chkactivo').attr('checked', false);
            }
        });

    }

    var fillCboProveedor = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/nc/ajax/ncmgpro.ashx?OPCION=1&ESTADO_IND=A&CTLG_CODE=" + $("#ctl00_hddctlg").val(),
            contenttype: "application/json; charset=utf-8",
            datatype: "json",
            success: function (datos) {
                $('#cboProveedor').empty();
                $('#cboProveedor').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#cboProveedor').append('<option value="' + datos[i].PIDM + '" json="' + datos[i].JSON + '">' + datos[i].RAZON_SOCIAL + '</option>');
                    }
                    $('#cboProveedor').select2('val', '');
                }
                else {
                   //  noexito(); Se cambio la alerta de no exito a informacion
                    infoCustom2("No se ha encontrado data.")
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var fillBandejaGProveedor = function () {

        var parms = {
            data: null,
            //"sDom" : "t",
            columns: [
                 {
                    data: "PIDM",
                    visible: false
                 },
                    {
                        data: "CODIGO_GRUPO",
                        visible: false
                    },
                {
                    data: "TIPO_DCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },             
                {
                    data: "NRO_DCTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                },
                 {
                     data: "RAZON_SOCIAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).css('text-align', 'center');
                     }
                 },
                {
                    data: "SEQ",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
                ,
                {
                    data: null,
                    defaultContent: '<a class="btn red"><i class="icon-trash"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');

                    }
                }
            ]

        }

        oTable = iniciaTabla('tblgrupo_proveedor', parms);
        //$('#tblgrupo_proveedor').removeAttr('style');
      

        $('#tblgrupo_proveedor tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');


            var pos = oTable.api(true).row($(this).parent().parent()).index();
            var row = oTable.fnGetData(pos);
            var cod_grupo = row.CODIGO_GRUPO;
            var pidm = row.PIDM;            

            Bloquear("divadd_prov");
 


            $.ajax({
                type: "post",
                url: "vistas/NC/ajax/NCMGPRO.ASHX?OPCION=AT&PIDM=" + pidm + "&TIPO=DETALLE" + "&GRUP_CODE=" + cod_grupo,
                success: function (datos) {
                    Desbloquear("divadd_prov");
                    if (datos != null) {

                        
                        if (datos == "OK") {
                            oTable.fnDeleteRow(pos);
                            exito();
                        }
                        else { noexito(); }
                    }
                    else {
                        noexito();
                    }

                },
                error: function (msg) {
                    Desbloquear("divadd_prov");
                    noexito();
                }
            });
    

        });
    }

    var cargaInicial = function () {

        $("#cboProveedor").attr("disabled", true);
        $("#btn_add").attr("style", "display:none; border-radius: 4px !important;height: 13px;");

        var CODE = ObtenerQueryString("codigo");

        if (typeof (CODE) !== "undefined") {

            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");
            $("#cboProveedor").attr("disabled", false);
            $("#btn_add").attr("style", "display:block; border-radius: 4px !important;height: 13px;");

            var data = new FormData();

            data.append('OPCION', '3');
            data.append('GRUP_CODE', CODE);

            $.ajax({

                url: "vistas/nc/ajax/ncmgpro.ashx",
                type: 'POST',
                contentType: false,
                data: data,
                processData: false,
                cache: false,
                success:
                function (datos) {
                    if (datos != null) {


                        $('#txtcodigo').val(datos[0].CODIGO);
                        $('#txt_nombre').val(datos[0].NOMBRE);
                        $('#txt_descripcion').val(datos[0].DESCRIPCION);
                        if (datos[0].ESTADO == 'A') {
                            $('#uniform-chkactivo span').removeClass().addClass("checked");
                            $('#chkactivo').attr('checked', true);

                        }
                        else {
                            $('#uniform-chkactivo span').removeClass();
                            $('#chkactivo').attr('checked', false);

                        }
                       
                        GetProv_Grup(CODE);

                    }
                    else {
                        noexito();
                        //exito();
                    }
                    }

            });


        }
    }
    return {
        init: function () {
            plugins();
            fillBandejaGProveedor();
            eventoControles();
            fillCboProveedor();
          
            cargaInicial();
            
        }
    };

}();


var Grabar = function () {
    var NOMBRE = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';


    NOMBRE = $.trim($('#txt_nombre').val());
    ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txt_descripcion").val();

    var data = new FormData();

    data.append("OPCION", "CR");
    data.append("NOMBRE", NOMBRE);
    data.append("ESTADO_IND", ESTADO_IND);
    data.append("USUA_ID", USUA_ID);
    data.append("DESCRIPCION", DESCRIPCION);


    if (vErrors("txt_nombre")) {

        Bloquear("div_grupo");

        $.ajax({
            url: "vistas/nc/ajax/NCMGPRO.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("div_grupo");
                if (datos != null) {

                    $("#txtcodigo").val(datos);
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Modificar();");
                    $("#cboProveedor").attr("disabled", false);
                    $("#btn_add").attr("style", "display:block; border-radius: 4px !important;height: 13px;");
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {
                Desbloquear("div_grupo");
                noexito();

            }
        });
    }
};


var Modificar = function () {

    var NOMBRE = '';
    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';
    var GRUP_CODE = '';



    NOMBRE = $.trim($('#txt_nombre').val());
    ESTADO_IND = $("#chkactivo").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txt_descripcion").val();
    GRUP_CODE = $("#txtcodigo").val();

    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("NOMBRE", NOMBRE);
    data.append("ESTADO_IND", ESTADO_IND);
    data.append("USUA_ID", USUA_ID);
    data.append("DESCRIPCION", DESCRIPCION);
    data.append("GRUP_CODE", GRUP_CODE);
    data.append("TIPO", "NORMAL" );


    if (vErrors("txt_nombre")) {

        Bloquear("div_grupo");

        $.ajax({
            url: "vistas/nc/ajax/NCMGPRO.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("div_grupo");
                if (datos != null) {
                    if (datos == "OK") exito();
                    else noexito();

                } else { noexito(); }

            },
            error: function (msg) {
                Desbloquear("div_grupo");
                noexito();

            }
        });

    }





}


var GetProv_Grup = function (grupo) {

    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmgpro.ashx?OPCION=2&GRUP_CODE=" + grupo,
        success: function (datos) {
          
            if (datos != null) {

                oTable.fnClearTable();
                oTable.fnAddData(JSON.parse(datos));
            }
            else {
              //  noexito();
            }

        },
        error: function (msg) {
            alert(msg);
        }
    });

}



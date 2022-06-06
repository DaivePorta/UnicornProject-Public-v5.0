function GrabarMotBaj() {

   
    var cod_sunat = $("#txtCodSunat").val();
    var descripcion = $("#txtDescripcion").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();
    var cod_vinc_fam = $("#cboVincFam").val();


    if (vErrors(["txtCodSunat", "txtDescripcion", "cboVincFam"]))
    {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMMBDH.ASHX", {
            opcion: 'N', cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, usuario: usuario, cod_vinc_fam: cod_vinc_fam
        },

        function (res) {
            Desbloquear("ventana");
            if (res != 'EXIS' && res.length == 4) {
                $('#txtCodigo').val(res);
                exito();
                $("#grabar").html("<i class='icon-pencil'></i> modificar");
                $("#grabar").attr("href", "javascript:Modificar();");
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
        });
    }



  
 
}



var NCMMBDH = function () {
    var plugins = function () { 
        $("#txtCodSunat").inputmask({ "mask": "9", "repeat": 6, "greedy": false });
        $('#cboVincFam').select2();
        aMayuscula(":input");
    }

    var datatable = function () {
    }


    var fillcboVinculoFam = function () {
        select = $('#cboVincFam');
        $.ajax({
            type: "post",
            url: "vistas/NP/ajax/NPMEMDH.ASHX?sOpcion=LVXP&sEstado=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                select.empty();
                if (!isEmpty(datos)) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            select.append('<option value="T">TODOS</option>');
                        }
                        select.append('<option value="' + datos[i].Codigo + '" val_sunat ="' + datos[i].Codigo_Sunat + '" val_gen ="' + datos[i].GENERO + '">' + datos[i].Descripcion + '</option>');
                    }
                    select.select2("val","T")
                    $('#cboVincFam').removeAttr('disabled')
                }
                else {
                    select.append('<option></option>');
                    //select.select2()
                    $('#cboVincFam').attr('disabled', 'disabled')
                }
            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista de Vinculo del Derechohabiente.");
              //  $("#cboVincFam").select2()
            }
        });
    }


    





    var cargaInicial = function () {

        var CODE = ObtenerQueryString("codigo");
    
        if (typeof (CODE) !== "undefined") {
           
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");
           
            $.ajax({
                type: "post",
                url: "vistas/nc/ajax/ncmmbdh.ashx?opcion=0&CODE=" + CODE,
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODE);
                    $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtDescripcion").val(datos[0].DESCRIPCION);
                    if (datos[0].ESTADO_ID == 'A') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }

                    if (datos[0].CODE_VINC_FAM == "") {
                        $("#cboVincFam").select2("val","T").change()
                    } else {

                        $("#cboVincFam").select2("val", datos[0].CODE_VINC_FAM).change()
                    }

                    $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val(datos[0].USUA_ID);
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
            fillcboVinculoFam();
           
            datatable();
            cargaInicial();
        }
    };

}();


var Modificar = function () {


    var codigo = $("#txtCodigo").val();
    var cod_sunat = $("#txtCodSunat").val();
    var descripcion = $("#txtDescripcion").val();
    var estado = $("#chkEstado").is(':checked') ? 'A' : 'I';
    var usuario = $("#ctl00_cph_ctl00_PCONGEN1_ctl00_hfCodigoUsuario").val();
    var cod_vinc_fam = $("#cboVincFam").val();


    if (vErrors(["txtCodSunat", "txtDescripcion", "cboVincFam"])) {
        Bloquear("ventana");
        $.post("vistas/NC/ajax/NCMMBDH.ASHX", {
            opcion: 'M', codigo: codigo, cod_sunat: cod_sunat, descripcion: descripcion, estado: estado, usuario: usuario, cod_vinc_fam: cod_vinc_fam
        },
            function (res) {
                Desbloquear("ventana");
                if (res == "OK") {
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
            });
    }
}


var NCLMBDH = function () {

    var fillBandejaMotBaja = function () {


        var json=jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjMotBaja').val());
        var parms = {
            data: json,
            columns: [
                { data: "Codigo" },
                { data: "Codigo_Sunat" },
                { data: "descripcion" },
                { data: "DESC_VINC_FAM" },
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
        oTableMotBaja = iniciaTabla('tblMotBaja', parms);
        $('#tblMotBaja').removeAttr('style');

        

        $('#tblMotBaja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableMotBaja.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableMotBaja.fnGetPosition(this);
                var row = oTableMotBaja.fnGetData(pos);
                var codigo = row.Codigo;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=ncmmbdh&codigo=' + codigo;
            }

        });

        

        $('#tblMotBaja tbody').on('click', 'a', function () {
              
            $(this).parent().parent().addClass('selected');
            var pos =  oTableMotBaja.api(true).row($(this).parent().parent()).index(); 
            var row = oTableMotBaja.fnGetData(pos);
            var cod = row.Codigo;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NC/ajax/NCMMBDH.ASHX", { opcion: 'A', CODE: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {

                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";

                        oTableMotBaja.fnGetData(pos).estado = res;
                        refrescaTabla(oTableMotBaja);
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
       
            fillBandejaMotBaja();
            cargainicial();
        }
    };

}();


    
    var cargainicial = function () { aMayuscula(":input"); }




function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
var NALTMVO = function () {

    var fillBandejaBandeja = function () {



        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjJSON').val());
        var parms = {
            data: json,
            columns: [
                {
                    data: "CODIGO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
            //    { data: "LOGISTICO" },
            //    { data: "REQUIERE_IND" },
                {
                    data: "CODIGO_SUNAT", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
           //     { data: "CONTABLE" },
                { data: "DESC_SUNAT" },
           //     { data: "DESC_CORTA" },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
                
            ]

        }



        oTableBandeja = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');



        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableBandeja.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableBandeja.fnGetPosition(this);
                var row = oTableBandeja.fnGetData(pos);
                var codigo = row.CODIGO;
             
            
                window.location.href = '?f=namtmvo&codigo=' + codigo ;
            }

        });



      




    }
    
    return {
        init: function () {

            fillBandejaBandeja();
        }
    };

}();

var oTableCentroCosto = [];
var NAMTMVO = function () {
    //var oTableCentroCosto = [];

    var fillcboOperacion = function () {
        let cod_empresa = $('#ctl00_hddctlg').val();

        $('#cboTipoAsiento').select2('destroy');
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMTIAS.ashx?OPCION=69&p_CTLG_CODE=" + cod_empresa,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboTipoAsiento').empty();
                $('#cboTipoAsiento').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboTipoAsiento').append('<option value="' + datos[i].CODIGO  + '">' + datos[i].NOMBRE + '</option>');
                    }
                }
            },
            error: function (msg) {
                alertCustom("No se listaron correctamente.");
            }
        });
        $('#cboTipoAsiento').select2();
    }

    var handleTablaCCTipoMov = function () {

        var parms = {
            data: null,
            order: [[0, 'asc']],
            columns: [

                { data: "DESC_EMPRESA" },
                { data: "CENTRO_COSTO" },
                {
                    data: null,
                    defaultContent: '<a  class="btn red eliminarCC" title="Eliminar"><i class="icon-trash"></i></a>',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center');
                    }
                }
                
            ]
        }

        oTableCentroCosto = iniciaTabla("tblCentroCosto", parms);
        $('#tblCentroCosto').removeAttr('style');   

        $('#tblCentroCosto tbody').on('click', '.eliminarCC', function () {

            var pos = oTableCentroCosto.api(true).row($(this).parents("tr")[0]).index();
            var row = oTableCentroCosto.fnGetData(pos);

            EliminarCentroCostos(row.COD_MOV, row.CTLG_CODE, row.COD_CECC, row.COD_CECD);
            oTableCentroCosto.fnDeleteRow(pos);
        });

    }


    var handleFillcboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#slcEmpresa").html(sEmpresa);
        $("#slcEmpresa").val($("#ctl00_hddctlg").val()).change();
    }



    var cargarcombos = function () {
        $("#slcmovlog").select2();
        $("#slcmovcon").select2();   
    }


    var eventoControles = function () {
        $('#btnAddCentroCosto').on('click', function () {
            AgregarCentroCostos();
        });

        $("#slcEmpresa").on("change", function () {
            $("#txt_centro_costo").val("");
            $("#txt_centro_costo").data("CodCentroCostoCab", "");
            $("#txt_centro_costo").data("CodCentroCosto", "");
        });


    }

    var cargainicial = function () {       
        var cod = ObtenerQueryString("codigo");       
        if (cod != null && cod != "") {
            $("#grabar").html("<i class='icon-pencil'></i> Modificar");
            $("#grabar").attr("href", "javascript:Actualizar();");
            
            $.ajax({
                type: "get",
                url: "vistas/NA/ajax/NAMTMVO.ashx",
                data: { codi: cod, flag: 4 },
                contenttype: "application/json;",
                datatype: "json",
                success: function (datos) {

                    $("#txtcodigo").val(datos[0].CODIGO);

                    $("#txtdescripcion").val(datos[0].DESCRIPCION);
                    $("#txtdescripcion_sunat").val(datos[0].DESC_SUNAT);
                    $("#txtcodsunat").val(datos[0].CODIGO_SUNAT);
                    $("#txtdescCorta").val(datos[0].DESC_CORTA);
                    $("#slcmovlog").select2("val", datos[0].LOGISTICO);
                    $("#slcmovcon").select2("val", datos[0].CONTABLE);
                    $("#cboTipoAsiento").select2("val", datos[0].OPERA);

                    if (datos[0].IMPRIME_IND == "S") {

                        $('#uniform-chkimprime span').removeClass().addClass("checked");
                        $('#chkimprime').attr('checked', true);
                    } else {

                        $('#uniform-chkimprime span').removeClass();
                        $('#chkimprime').attr('checked', false);
                    }


                    if (datos[0].INTERNO_LOGISTICO == "S") {

                        $('#uniform-chkLogistico span').removeClass().addClass("checked");
                        $('#chkLogistico').attr('checked', true);
                    } else {

                        $('#uniform-chkLogistico span').removeClass();
                        $('#chkLogistico').attr('checked', false);
                    }


                    if (datos[0].ESTADO == "ACTIVO") {

                        $('#uniform-chkactivo span').removeClass().addClass("checked");
                        $('#chkactivo').attr('checked', true);
                    } else {

                        $('#uniform-chkactivo span').removeClass();
                        $('#chkactivo').attr('checked', false);
                    }

                 

                    $("#divCentroCosto").slideDown(); 
                    fnGetCentroCostosTipoMov(datos[0].CODIGO);
                    var table = $('#tblCentroCosto').DataTable();
                    table.columns.adjust().draw();

                },
                error: function (msg) {

                    alert(msg);
                }
            });


        }

    }

    var plugins = function () {

        aMayuscula(":input");
        $("#slcEmpresa").select2();
        $("#cboTipoAsiento").select2();
        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 50, "greedy": false }); })

        $("#txtdescripcion_sunat").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 50, "greedy": false }); });

        $("#txtdescCorta").focus(function () { $(this).inputmask({ "mask": "L", "repeat": 3, "greedy": false }); });

        $("#txtcodsunat").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 4, "greedy": false }); });
    }


    var fnGetCentroCostosTipoMov = function (pCodTipoMov) {
        
        $.ajax({
            type: "post",
            url: "vistas/NA/ajax/NAMTMVO.ASHX?flag=LCC&codi=" + pCodTipoMov,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (!isEmpty(datos)) {
                    oTableCentroCosto.fnClearTable();
                    oTableCentroCosto.fnAddData(datos);       
                }
                else {
                    oTableCentroCosto.fnClearTable();
                    infoCustom2("El Tipo movimiento no tiene asignado centro de costos!");
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener centro de costos del tipo de movimiento.");
                oTableCentroCosto.fnClearTable();
            }
        });

    }


    var AgregarCentroCostos = function () {
        var p_codi = $('#txtcodigo').val();
        var p_ctlg_code = $("#slcEmpresa").val();
        var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
        var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");

        if (vErrors(["txtcodigo", "txt_centro_costo", "txt_centro_costo", "slcEmpresa"])) {

            Bloquear("ventana");
            $.post("vistas/NA/ajax/NAMTMVO.ASHX", {
                flag: "CC",
                codi: p_codi, 
                p_CTLG_CODE: p_ctlg_code,
                p_CECC: p_CECC,
                p_CECD: p_CECD
            },
                function (res) {
                    Desbloquear("ventana");
                    if (res == "OK") {
                        exito();
                        $("#txt_centro_costo").val("");
                        $("#txt_centro_costo").data("CodCentroCostoCab", "");
                        $("#txt_centro_costo").data("CodCentroCosto", "");
                        fnGetCentroCostosTipoMov(p_codi);                      
                    }
                    else if (res.indexOf("Duplicate") > -1){
                        infoCustom("La Empresa  seleccionada ya tiene asignada un centro de costos en este Tipo de movimiento.");
                    }
                    else {
                        noexito();
                    }
                });
        }
    }



    var EliminarCentroCostos = function (pCodigo,pEmpresa,pCECC,pCECD) {
     
        Bloquear("divCentroCosto");
            $.post("vistas/NA/ajax/NAMTMVO.ASHX", {
                flag: "EC",
                codi: pCodigo,
                p_CTLG_CODE: pEmpresa,
                p_CECC: pCECC,
                p_CECD: pCECD
            },
                function (res) {
                    Desbloquear("divCentroCosto");
                    if (res == "OK") {
                        exito();
                    }
                    else {
                        noexito();
                    }
                });
        
    }

    

    return {
        init: function () {
            $("#divCentroCosto").slideUp();
            plugins();
            handleTablaCCTipoMov();         
            cargarcombos();
            handleFillcboEmpresa();
            cargainicial();  
            fillcboOperacion();
            eventoControles();
        }
    };


}();


function Actualizar() {
    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';
    var p_codi = $('#txtcodigo').val();    
    var p_user = $('#ctl00_lblusuario').html();
    var p_desc=$("#txtdescripcion").val();
    var p_desc_sunat=$("#txtdescripcion_sunat").val();
    var p_cod_sunat=$("#txtcodsunat").val();
    var p_desc_corta=$("#txtdescCorta").val();
    var p_movlog=$("#slcmovlog").val();
    var p_movcon = $("#slcmovcon").val();
    var p_imprime = $("#chkimprime").is(':checked') ? 'S' : 'N';
    var p_interno_logistico = $("#chkLogistico").is(':checked') ? 'S' : 'N';
    var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
    var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");
    var p_OPER = $("#cboTipoAsiento").val();

    if (vErrors(["txtdescripcion", "txtdescripcion_sunat", "txtdescCorta", "txtcodsunat", "slcmovlog", "slcmovcon", "cboTipoAsiento"])) {

        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMTMVO.ASHX", {
            flag: 2,
            codi: p_codi,
            user: p_user,
            acti: p_acti,
            cosu: p_cod_sunat,
            moco: p_movcon,
            desu:p_desc_sunat,
            deco:p_desc_corta,
            molo:p_movlog,
            desc:p_desc,
            requ: p_imprime,
            p_CECC: p_CECC,
            p_CECD: p_CECD,
            p_interno_logistico: p_interno_logistico,
            p_OPER: p_OPER
        },
            function (res) {
                Desbloquear("ventana");
                if (res = "OK") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                } else {
                    noexito();
                }
            });
    }
}


function Crear() {

    var p_acti = $('#chkactivo').is(':checked') ? 'A' : 'I';

    var p_user = $('#ctl00_lblusuario').html();
    var p_desc = $("#txtdescripcion").val();
    var p_desc_sunat = $("#txtdescripcion_sunat").val();
    var p_cod_sunat = $("#txtcodsunat").val();
    var p_desc_corta = $("#txtdescCorta").val();
    var p_movlog = $("#slcmovlog").val();
    var p_movcon = $("#slcmovcon").val();
    var p_imprime = $("#chkimprime").is(':checked') ? 'S' : 'N';
    var p_interno_logistico = $("#chkLogistico").is(':checked') ? 'S' : 'N';
    var p_CECC = $("#txt_centro_costo").data("CodCentroCostoCab");
    var p_CECD = $("#txt_centro_costo").data("CodCentroCosto");
    var p_OPER = $("#cboTipoAsiento").val();




    if (vErrors(["txtdescripcion", "txtdescripcion_sunat", "txtdescCorta", "txtcodsunat", "slcmovlog", "slcmovcon","cboTipoAsiento"])) {

        Bloquear("ventana");
        $.post("vistas/NA/ajax/NAMTMVO.ASHX", {
            flag: 1,
            user: p_user,
            acti: p_acti,
            cosu: p_cod_sunat,
            moco: p_movcon,
            desu: p_desc_sunat,
            deco: p_desc_corta,
            molo: p_movlog,
            desc: p_desc,
            requ: p_imprime,
            p_CECC: p_CECC,
            p_CECD: p_CECD,
            p_interno_logistico: p_interno_logistico,
            p_OPER: p_OPER
        },
            function (res) {
                Desbloquear("ventana");
                if (res != "") {
                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("href", "javascript:Actualizar();");
                    $("#txtcodigo").val(res);
                    $("#divCentroCosto").slideDown();                   
                } else {
                    noexito();
                }
            });
    }
}
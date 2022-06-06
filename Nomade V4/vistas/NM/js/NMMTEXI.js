function Crear_Existencias() {

    var mensaje = '';

    var cod_sunat = $('#txtCodSunat').val();
    var descripcion = $('#txtdescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();
    var almacenable = $("#chkAlmacenable").is("checked") ? 'S' : 'N';
   
    mensaje = validar(cod_sunat, descripcion);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMTEXI.ASHX",
            {
                opcion: 'C',
                cod_sunat: cod_sunat,
                descripcion: descripcion,
                estado: estado,
                usuario: usuario,
                almacenable: almacenable 
            },
            function (res) {
                Desbloquear("ventana");
                if (res != "EXIS" && res.length == 4) {
                    $('#txtCodigo').val(res);

                    $(".contabilidad").show();

                    exito();
                    $("#grabar").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabar").attr("onclick", "javascript:Modificar();");
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

function Modificar() {
    var mensaje = '';

    var codigo = $('#txtCodigo').val();
    var cod_sunat = $('#txtCodSunat').val();
    var descripcion = $('#txtdescripcion').val();
    var estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
    var usuario = $('#ctl00_lblusuario').html();
    var almacenable = $("#chkAlmacenable").is(':checked') ? 'S' : 'N';
    
    mensaje = validar(cod_sunat, descripcion);

    if (mensaje.length > 0) {
        alertCustom(mensaje);
    } else {
        Bloquear("ventana");
        $.post("vistas/NM/ajax/NMMTEXI.ASHX",
            {
                opcion: 'AU',
                codigo: codigo,
                cod_sunat: cod_sunat,
                descripcion: descripcion,
                estado: estado,
                usuario: usuario,
                almacenable: almacenable
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

var NMLTEXI = function () {

    var fillBandejaexistencias = function () {

        var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjTipoexistencias').val());
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
                    data: "CODIGO_SUNAT",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "DESCRIPCION" },
                {
                    data: "ALMACENABLE",
                    createdCell: function(td,celldata,rowData,row,col){
                        $(td).attr("align","center");
                    }
                },
                {
                    data: "ESTADO",
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

        oTableExistencias = iniciaTabla('tblTipoexistencias', parms);
        $('#tblTipoexistencias').removeAttr('style');
                
        $('#tblTipoexistencias tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableExistencias.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableExistencias.fnGetPosition(this);
                var row = oTableExistencias.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();
                window.location.href = '?f=nmmtexi&codigo=' + codigo;
            }
        });

        $('#tblTipoexistencias tbody').on('click', 'a', function () {

            $(this).parent().parent().addClass('selected');
            var pos = oTableExistencias.api(true).row($(this).parent().parent()).index();
            var row = oTableExistencias.fnGetData(pos);
            var cod = row.CODIGO;

            Bloquear("ventana");
            $.ajaxSetup({ async: false });
            $.post("vistas/NM/ajax/NMMTEXI.ASHX", { opcion: 'CA', code: cod },
                function (res) {
                    Desbloquear("ventana");
                    if (res != null) {
                        if (res == "I") res = "INACTIVO";
                        else res = "ACTIVO";
                        oTableExistencias.fnGetData(pos).ESTADO = res;
                        refrescaTabla(oTableExistencias);
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
            fillBandejaexistencias();
        }
    };

}();
var NMMTEXI = function () {
    
    var fnCargarPlugins = function () {

        $("#txtCodSunat").focus(function () { $(this).inputmask({ "mask": "9", "repeat": 6, "greedy": false }); })

        $("#txtdescripcion").focus(function () { $(this).inputmask({ "mask": "R", "repeat": 50, "greedy": false }); })

        $(".combobox").select2();
    };
    
    var fnEventoControles = function () {

        $('#cboEmpresa').on('change', function () {
            fnCargarComboCuentasContab();
        });


        $('#modal-ctascontab').on('shown.bs.modal', function () {
            $('#cboCtaDebe').focus();
        });

        $("#btnGrabarConfig").on("click", function () {
            if (!vErrors(["txtCodigo", "cboCtaDebe", "cboCtaHaber"])) {
                return;
            }

            fnGrabarConfig();
        });
    };


    var fillCboEmpresa = function () {

        var dPermanente = ObtenerDatoPermanente("jsonEmpresaNMMPROD");
        if (dPermanente == null) {
            $.ajax({
                type: "post",
                url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
                contenttype: "application/json;",
                datatype: "json",
                async: false,
                beforeSend: function () { Bloquear($($('#cboEmpresa').parents("div")[0])); },
                cache: true,
                success: function (datos) {
                    $('#cboEmpresa').empty();
                    $('#cboEmpresa').append('<option></option>');
                    if (datos != null) {
                        CrearDatoPermanente("jsonEmpresaNMMPROD", datos);
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                    }
                    //$('#cboEmpresa').select2('val', '');
                    $("select.empresa").val($("#ctl00_hddctlg").val()).change();
                },
                error: function (msg) {
                    alertCustom("Empresas no se listaron correctamente");
                },
                complete: function () {
                    Desbloquear($($('#cboEmpresa').parents("div")[0]));
                }
            });
        } else {
            $('#cboEmpresa').empty().append('<option></option>');
            if (dPermanente != null) {
                dPermanente = JSON.parse(dPermanente);
                for (var i = 0; i < dPermanente.length; i++) {
                    $('#cboEmpresa').append('<option value="' + dPermanente[i].CODIGO + '">' + dPermanente[i].DESCRIPCION + '</option>');
                }
            }
        }
    };

    var fnGetTipoMovAlmacen = function () {
        var aoTipoMovAlmacen = [];
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ashx?sOpcion=LIST_TIPO_MOV_ALMC&p_ESTADO_IND=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoTipoMovAlmacen = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });

        return aoTipoMovAlmacen;
    };

    var fnGrabarConfig = function () {

        let sOpcion = "GRABAR_CTAS_TIPOMOVALMC";
        let p_CODE_TIPO_EXIST = $("#txtCodigo").val();
        let p_CODE_MOV_ALMC = $(oTrActual).data("codmovalmc");
        let p_PROD_CODE = "GENERAL";
        let p_CTAS_ID_DEBE = $('#cboCtaDebe').find(':selected').data('ctaid');
        let p_CUENTA_DEBE = $('#cboCtaDebe').val();
        let p_CTAS_ID_HABER = $('#cboCtaHaber').find(':selected').data('ctaid');
        let p_CUENTA_HABER = $('#cboCtaHaber').val();
        let p_USER = $("#ctl00_txtus").val();

        let data = new FormData();
        data.append("sOpcion", sOpcion);
        data.append("p_CODE_TIPO_EXIST", p_CODE_TIPO_EXIST);
        data.append("p_CODE_MOV_ALMC", p_CODE_MOV_ALMC);
        data.append("p_PROD_CODE", p_PROD_CODE);
        data.append("p_CTAS_ID_DEBE", p_CTAS_ID_DEBE);
        data.append("p_CUENTA_DEBE", p_CUENTA_DEBE);
        data.append("p_CTAS_ID_HABER", p_CTAS_ID_HABER);
        data.append("p_CUENTA_HABER", p_CUENTA_HABER);
        data.append("p_USER", p_USER);

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMMOCO.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("Error al intentar Guardar.");
                    return;
                }

                let sCtaDebe = $("#cboCtaDebe option:selected").text();
                $(oTrActual).find('.ctadebe').val(sCtaDebe);

                let sCtaHaber = $("#cboCtaHaber option:selected").text();
                $(oTrActual).find('.ctahaber').val(sCtaHaber);

                $("#modal-ctascontab").modal("hide");

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    var fnEliminarConfig = function () {

        let sOpcion = "ELIMINAR_CTAS_TIPOMOVALMC";
        let p_CODE_TIPO_EXIST = $("#txtCodigo").val();
        let p_CODE_MOV_ALMC = $(oTrActual).data("codmovalmc");
        let p_PROD_CODE = "GENERAL";

        let data = new FormData();
        data.append("sOpcion", sOpcion);
        data.append("p_CODE_TIPO_EXIST", p_CODE_TIPO_EXIST);
        data.append("p_CODE_MOV_ALMC", p_CODE_MOV_ALMC);
        data.append("p_PROD_CODE", p_PROD_CODE);

        Bloquear("ventana");
        sException = "";
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMMOCO.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response == "") {
                    noexito();
                    return;
                }
                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }
                if (response.indexOf("[Error]:") > -1) {
                    sException = response;
                    alertCustom("Error al intentar Guardar.");
                    return;
                }
                
                $(oTrActual).find('.ctadebe').val("");                
                $(oTrActual).find('.ctahaber').val("");

                $("#modal-ctascontab").modal("hide");

                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                noexitoCustom("No se pudo guardar los cambios.");
            }
        });
    };

    var fnCargarComboCuentasContab = function () {
        if (!vErrors(["cboEmpresa"])) {
            return;
        }
        
        $("#cboCtaDebe").html("<option></option>");
        $("#cboCtaHaber").html("<option></option>");

        $.ajax({
            type: "post",
            url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + $('#cboEmpresa').val() + "&P_CUEN_CODE=",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                if (isEmpty(datos)) {
                    return;
                }
                for (var i = 0; i < datos.length; i++) {
                    $("#cboCtaDebe").append(`<option value="${datos[i].CUENTA}" data-ctaid="${datos[i].ID_CUENTA}">${datos[i].CUENTA} - ${datos[i].DESCRIPCION}</option>`);
                    $("#cboCtaHaber").append(`<option value="${datos[i].CUENTA}" data-ctaid="${datos[i].ID_CUENTA}">${datos[i].CUENTA} - ${datos[i].DESCRIPCION}</option>`);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });        
    };

    var oTrActual = {};
    var fnCargarTabla = function () {

        let sCodTipoExistencia = $("#txtCodigo").val();
        let sTipoExistencia = $("#txtdescripcion").val();

        $("#tipoexist").html(sTipoExistencia);

        let aoTipoMovAlmacen = fnGetTipoMovAlmacen();
        let sHtml = "";
        for (let i = 0; i < aoTipoMovAlmacen.length; i++) {
            sHtml += `
                    <tr class="ordenar" data-codmovalmc=${aoTipoMovAlmacen[i].CODIGO}>
                        <td>${aoTipoMovAlmacen[i].DESCRIPCION}</td>
                        <td style="text-align:center;">${aoTipoMovAlmacen[i].TIPO_MOV}</td>
                        <td style="text-align:center;">
                            <button type="button" class="btn green configctas"><i class="icon-cog" style="line-height: initial"></i></button>
                        </td>
                        <td>
                            <input type="text" class="span12 ctadebe" placeholder="Seleccionar Cuenta" readonly>
                        </td>
                        <td>
                            <input type="text" class="span12 ctahaber" placeholder="Seleccionar Cuenta" readonly>
                        </td>
                        <td style="text-align:center;">
                            <button type="button" class="btn red eliminarctas"><i class="icon-trash" style="line-height: initial"></i></button>
                        </td>
                    </tr>
                    `;
        }

        $("#tblConfigContab tbody").html(sHtml);

        $(".configctas").on('click', function () {
            oTrActual = $(this).closest("tr");
            $("#cboCtaDebe").val("").change();
            $("#cboCtaHaber").val("").change();
            $("#modal-ctascontab").modal("show");
        });

        $(".eliminarctas").on('click', function () {
            oTrActual = $(this).closest("tr");
            fnEliminarConfig();
        });
        
    };

    var fnListarCtasConfig = function () {
        if (!vErrors(["txtCodigo"])) {
            return;
        }

        let aoConfigCtas = [];
        let p_CODE_TIPO_EXIST = $("#txtCodigo").val();;
        let p_PROD_CODE = "GENERAL";
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMMOCO.ashx?sOpcion=LISTAR_CTAS_TIPOMOVALMC&p_CODE_TIPO_EXIST=" + p_CODE_TIPO_EXIST + "&p_PROD_CODE=" + p_PROD_CODE,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoConfigCtas = datos;
            },
            error: function (msg) {
                alert(msg);
            }
        });

        return aoConfigCtas;
    };

    var cargaInicial = function () {

        $(".centro").css("text-align", "center");
        $(".contabilidad").hide();

        var code = ObtenerQueryString("codigo");
        if (typeof (code) === "undefined") {
            return;
        }

        $(".contabilidad").show();

        $("#grabar").html("<i class='icon-pencil'></i> Modificar");
        $("#grabar").attr("href", "javascript:Modificar();");

        $.ajax({
            type: "post",
            url: "vistas/NM/ajax/nmmtexi.ashx?opcion=1&code=" + code,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $("#txtCodigo").val(datos[0].CODIGO);
                $("#txtCodSunat").val(datos[0].CODIGO_SUNAT);
                $("#txtdescripcion").val(datos[0].DESCRIPCION);
                if (datos[0].ESTADO_ID == 'A') {
                    $('#uniform-chkEstado span').removeClass().addClass("checked");
                    $('#chkEstado').attr('checked', true);
                }
                else {
                    $('#uniform-chkEstado span').removeClass();
                    $('#chkEstado').attr('checked', false);
                }

                if (datos[0].ALMACENABLE_IND == 'S') {
                    $('#uniform-chkAlmacenable span').removeClass().addClass("checked");
                    $('#chkAlmacenable').attr('checked', true);
                }
                else {
                    $('#uniform-chkAlmacenable span').removeClass();
                    $('#chkAlmacenable').attr('checked', false);
                }

                fnCargarTabla();
                let aoConfigCtas = fnListarCtasConfig();
                let oTr = {};
                for (let i = 0; i < aoConfigCtas.length; i++) {
                    oTr = $("#tblConfigContab").find(`[data-codmovalmc=${aoConfigCtas[i].TMOV_CODE}]`);
                    $(oTr).find('.ctadebe').val(`${aoConfigCtas[i].CUENTA_DEBE} - ${aoConfigCtas[i].CTAS_DEBE}`);                    
                    $(oTr).find('.ctahaber').val(`${aoConfigCtas[i].CUENTA_HABER} - ${aoConfigCtas[i].CTAS_HABER}`);
                }

            },
            error: function (msg) {
                alert(msg);
            }
        });

    };


    return {
        init: function () {
            fnCargarPlugins();
            fnEventoControles();
            fillCboEmpresa();
            //datatable();
            cargaInicial();
        }
    };
}();

function validar(cod_sunat, descripcion) {
    var mensaje = "";

    if (cod_sunat == "") {
        mensaje = mensaje + "Ingrese Código de SUNAT. <br/>";
    }

    if (descripcion == "") {
        mensaje = mensaje + "Ingrese Descripción. <br/>";
    }
    return mensaje;

}
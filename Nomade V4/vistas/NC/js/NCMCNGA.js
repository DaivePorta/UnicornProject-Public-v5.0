var NCLCNGA = function () {

    var plugins = function () {
        $('#slcEmpresa').select2();
    };

    var fillBandejaGrupoConceptos = function () {


        var parms = {
            data: null,

            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },

                {
                    data: "CONTABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(rowData.CONTABLE + " " + "[" + rowData.CONTABLE_DESC + "]")
                    }
                },
                 {
                     data: "DEPENDENCIA_DESC",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },

                   {
                       data: "TIPO",
                       createdCell: function (td, cellData, rowData, row, col) {
                           $(td).attr('align', 'center')
                       }
                   },
                {
                    data: "NESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
          //{
          //    data: "CONTABLE_DESC",
          //    createdCell: function (td, cellData, rowData, row, col) {
          //        $(td).attr('style', 'display:none')
          //    }
          //},


            ]

        }

        oTable = iniciaTabla('tblgru_subgru', parms);
        $('#tblgru_subgru').removeAttr('style');
    };


    var listaGrupoConcepto = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCNGA.ashx?OPCION=1&p_TIPO=TODOS&p_CTLG_CODE=" + $('#slcEmpresa').val(),
            async: false,
            success: function (datos) {
                if (datos != null) {

                    oTable.fnClearTable();
                    oTable.fnAddData(datos);
                }
                else {

                    oTable.fnClearTable();
                }
                Desbloquear("ventana");

            },
            error: function (msg) {
                alert(msg);
                Desbloquear("ventana");
            }

        });

    };

    var eventos = function () {

        var emp_ant = ""
        $('#slcEmpresa').on('change', function () {
            if (emp_ant != $(this).val()) {
                Bloquear("ventana");
                setTimeout(function () {
                    listaGrupoConcepto();
                }, 1000);
                emp_ant = $(this).val();
                Desbloquear("ventana");
            } else { emp_ant = ""; Desbloquear("ventana"); }
        });
    };

    return {
        init: function () {
            plugins();
            CargarEmpresas();
            eventos();
            fillBandejaGrupoConceptos();
            listaGrupoConcepto();

        }
    };

}();

var NCMCNGA = function () {

    var plugins = function () {
        $('#slcEmpresa').select2();
        $('#slc_Empresa').select2();
        $('#cboCuentas').select2();
        $('#cbo_empresa').select2();
        $('#cbo_cuenta_SGrupo').select2();
        $("#cboTipoBien").select2();
        $("#cboDetraccion").select2(); //DPORTA 14/01/2022
    }

    var fillBandejaGrupo = function () {


        var parms = {
            data: null,
            "dom": '<"toolbar">frtip',
            "paging": false,
            "info": false,


            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).css('text-transform', 'uppercase')
                    }


                },
                 {
                     data: "DESC_ADICIONAL",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'left')
                         $(td).css('text-transform', 'uppercase')
                     }
                 },
                 {
                     data: "NESTADO",
                     createdCell: function (td, cellData, rowData, row, col) {
                         $(td).attr('align', 'center')
                     }
                 },
                  {
                      data: "CONTABLE",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('style', 'display:none')
                      }
                  },
                  {
                      data: "CTLG_CODE",
                      createdCell: function (td, cellData, rowData, row, col) {
                          $(td).attr('style', 'display:none')
                      }
                  }


            ]

        }

        oTableGrupo = iniciaTabla('tbl_grupo', parms);
        $('#tbl_grupo').removeAttr('style');
        $('#tbl_grupo').css("font-size", "12px");


    }

    var fillBandejaSubGrupo = function () {


        var parms = {
            data: null,
            "dom": '<"toolbar">frtip',
            "paging": false,
            "info": false,
            columns: [
                {
                    data: "CODIGO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "DESCRIPCION",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).css('text-transform', 'uppercase')
                    }
                }, {
                    data: "DESC_ADICIONAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).css('text-transform', 'uppercase')
                    }
                }, {
                    data: "NESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }, {
                    data: "CONTABLE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                }
            ]

        }

        oTableSubGrupo = iniciaTabla('tbl_Subgrupo', parms);
        $('#tbl_Subgrupo').removeAttr('style');
        $('#tbl_Subgrupo').css("font-size", "12px");
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#slc_Empresa').empty();
                $('#slc_Empresa').append('<option></option>');
                if (datos != null) {

                    for (var i = 0; i < datos.length; i++) {

                        $('#slc_Empresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $("#slc_Empresa").select2("val", $("#ctl00_hddctlg").val());
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }
  
    var fillCboTipoBien = function (code) {
        Bloquear($($('#cboTipoBien').parents("div")[0]));
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMCLBI.ASHX?OPCION=4"
                + "&p_CODE="
            + "&p_DESCRIPCION="
            + "&p_DESC_CORTA="
            + "&p_ESTADO_IND=A",
            contentType: "application/json;",
            dataType: "json",
            async: true,
            success: function (datos) {
                $('#cboTipoBien').html('<option></option>');
                if (datos != null && datos.length > 0) {
                    if (datos != null) {
                        for (var i = 0; i < datos.length; i++) {
                            $('#cboTipoBien').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                        }
                        if (code == undefined) {
                            $('#cboTipoBien').select2("val", "0001");
                        } else {
                            if (code != "") {
                                $('#cboTipoBien').select2("val", code);
                            }
                        }
                    }
                }
            },
            error: function (msg) {
                alertCustom("Tipo de bienes no se listaron correctamente.");
            },
            complete: function (msg) {
                Desbloquear($($('#cboTipoBien').parents("div")[0])); 
            }
        });
    }

    var fillCboDetraccion = function () { //DPORTA 14/01/2022
        $.ajax({
            type: "POST",
            url: "vistas/NM/ajax/NMMPROD.ASHX?&OPCION=15",
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                $('#cboDetraccion').empty();
                $('#cboDetraccion').append('<option></option>');
                $('#cboDetraccion').select2('val', '');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        //if (datos[i].TIPO_EXISTENCIA_CODE == $('#cboexistencia').val()) {
                            $('#cboDetraccion').append('<option value="' + datos[i].CODIGO + '" data-percent="' + datos[i].PORCENTAJE + '" data-info="' + datos[i].INFORMACION + '" >' + datos[i].DEFINICION + '</option>');
                        //}
                        //.Replace(vbCrLf, "\n").Replace("""", "\""")
                    }
                } else {
                    $('#cboDetraccion').select2('val', '');
                }
            },
            error: function (msg) {
                alertCustom("Detracciones no se listaron correctamente");
            }
        });
    }

    var eventoControles = function () {
        
        var emp_ant = "";
        //$('#slcEmpresa').on('change', function () {
        //    if (emp_ant != $(this).val()) {
        //        ListarCuentas($('#slcEmpresa').val(), "6", "2", "0004", "#cboCuentas")
        //        emp_ant = $(this).val();
        //    } else { emp_ant = ""; }
        //});

        //var emp_ant2 = "";
        //$('#cbo_empresa').on('change', function () {
        //    if (emp_ant2 != $(this).val()) {
        //        ListarCuentas($('#cbo_empresa').val(), "6", "0", "0004", "#cbo_cuenta_SGrupo")
        //        emp_ant2 = $(this).val();
        //    } else { emp_ant2 = ""; }
        //});

        $('#chkactivoModal').on('click', function () {
            if ($("#chkactivoModal").is(':checked')) {

                $('#uniform-chkactivoModal span').removeClass().addClass("checked");
                $('#chkactivoModal').attr('checked', true);
            } else {

                $('#uniform-chkactivoModal span').removeClass();
                $('#chkactivoModal').attr('checked', false);
            }
        });
        
        $('#chkactivoSubGru').on('click', function () {
            if ($("#chkactivoSubGru").is(':checked')) {

                $('#uniform-chkactivoSubGru span').removeClass().addClass("checked");
                $('#chkactivoSubGru').attr('checked', true);
            } else {

                $('#uniform-chkactivoSubGru span').removeClass();
                $('#chkactivoSubGru').attr('checked', false);
            }
        });

                $('#tbl_grupo tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

                oTableSubGrupo.fnClearTable();
                styleBotonesGrupo('', '', 'display:none', 'display:none');
                disabledBotonesGrupo(false, false, true, true);
                styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
                disabledBotonesSubGrupo(true, true, true, true);

                $("#hfCOD_GRUPO").val("");
                $("#hfDESC_GRUPO").val("");
                $("#hfESTADO_GRUPO").val("");
                //$("#hfCOD_CTA").val("");
                //$("#hfCTLG_CODE").val(""); 
                $("#hfDESC_ADC_GRUPO").val("");

            }
            else {
                oTableGrupo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableGrupo.fnGetPosition(this);
                var row = oTableGrupo.fnGetData(pos);

                $("#hfCOD_GRUPO").val(row.CODIGO);
                $("#hfDESC_GRUPO").val(row.DESCRIPCION);
                $("#hfESTADO_GRUPO").val(row.NESTADO);
                $("#hfCOD_CTA").val(row.CONTABLE);
                //$("#hfCTLG_CODE").val(row.CTLG_CODE);
                $("#hfDESC_ADC_GRUPO").val(row.DESC_ADICIONAL);
                ListarSubGrupos(row.CODIGO);

            }
        });
        
        $('#tbl_Subgrupo tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');

                styleBotonesSubGrupo('', '', 'display:none', 'display:none');
                disabledBotonesSubGrupo(false, false, true, true);

                $("#hfCOD_SGRUPO").val("");
                $("#hfDESC_SGRUPO").val("");
                $("#hfESTADO_SGRUPO").val("");
                $("#hfCOD_SCTA").val("");
                $("#hfDESC_ADC_SGRUPO").val("");
                $("#hfTIPO_BIEN").val("");
                $("#hfCODIGO_DETRA").val("");
                $("#hfPORCENTAJE_DETRA").val("");
            }
            else {
                oTableSubGrupo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableSubGrupo.fnGetPosition(this);
                var row = oTableSubGrupo.fnGetData(pos);

                $("#hfCOD_SGRUPO").val(row.CODIGO);
                $("#hfDESC_SGRUPO").val(row.DESCRIPCION);
                $("#hfESTADO_SGRUPO").val(row.NESTADO);
                $("#hfCOD_SCTA").val(row.CONTABLE);
                //$("#hfCOD_SCTA").val($("#slc_Empresa").val());
                $("#hfDESC_ADC_SGRUPO").val(row.DESC_ADICIONAL);
                $("#hfTIPO_BIEN").val(row.TIPO_BIEN);
                $("#hfCODIGO_DETRA").val(row.CODIGO_DETRA);
                $("#hfPORCENTAJE_DETRA").val(row.PORCENTAJE_DETRA);

                styleBotonesSubGrupo('display:none', '', '', 'display');
                disabledBotonesSubGrupo(true, false, false, false);
            }

        });

        $('#slc_Empresa').on('change', function () {
            if (emp_ant != $(this).val()) {

                oTableSubGrupo.fnClearTable();
                styleBotonesGrupo('', '', 'display:none', 'display:none');
                disabledBotonesGrupo(false, false, true, true);
                ListarCuentas($(this).val(), "6", "#cboCuentas")
                ListarCuentas($(this).val(), "", "#cbo_cuenta_SGrupo")
                emp_ant = $(this).val();
                $("#hfCTLG_CODE").val($(this).val());
                ListarGrupos();
            } else { emp_ant = ""; }
        });

        $('#chkDetraccion').on('change', function () { //DPORTA 14/01/2022
            $("#cboDetraccion").select2("val", "");
            $("#txtDetraccion").val("");
            if ($("#chkDetraccion").is(":checked")) {
                $("#cboDetraccion").removeAttr("disabled", "disabled");
                $("#cboDetraccion").attr("required", "required");
                fillCboDetraccion();
            }
            else {
                $("#cboDetraccion").attr("disabled", "disabled");
                $("#cboDetraccion").removeAttr("required");
            }
        });

        $('#cboDetraccion').on('change', function () { //DPORTA 14/01/2022
            if (typeof $("#modalDescripcion_body").html() != "undefined")
                $("#modalDescripcion_body").html("No hay información disponible.");

            if ($("#chkDetraccion").is(":checked")) {
                if ($("#cboDetraccion").val() != "") {
                    if ($("#cboDetraccion option:selected").attr("data-percent") != "") {

                        $("#txtDetraccion").val($("#cboDetraccion option:selected").attr("data-percent"));

                        var texto = $("#cboDetraccion option:selected").attr("data-info");
                        if (texto == "")
                            texto = "No hay información disponible.";

                        if (typeof $("#modalDescripcion_body").html() != "undefined")
                            $("#modalDescripcion_body").html(texto);
                        else
                            crearmodal("modalDescripcion", "Información", texto);


                    } else {
                        //Aqui se debe indicar el valor por defecto de la detracción, en caso no se halla definido
                        $("#txtDetraccion").val("0");
                    }
                }
            }
        });

    }

    var cargaInicial = function () {

        styleBotonesGrupo('', '', 'display:none', 'display:none');
        disabledBotonesGrupo(false, false, true, true);
        styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
        disabledBotonesSubGrupo(true, true, true, true);
        //ListarGrupos();


    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();

            fillBandejaGrupo();
            fillBandejaSubGrupo();
            eventoControles();
            cargaInicial();
            ListarCuentas($("#hfCTLG_CODE").val(), "6", "#cboCuentas");
            ListarCuentas($("#hfCTLG_CODE").val(), "6", "#cbo_cuenta_SGrupo")
            $('#slc_Empresa').change();
            //$("#cbo_empresa").attr("disabled", true);
            fillCboTipoBien();

        }
    };

}();

function ListarCuentas(ctlg, num_cta, cbo_id) {
    var select = $(cbo_id);
    $.ajax({
        type: "post",
        url: "vistas/nb/ajax/NBMCCUE.ashx?OPCION=LCC&empresa=" + ctlg + "&P_CUEN_CODE=" + num_cta,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            select.empty();
            select.append('<option></option>');
            if (datos != null) {
                $("#error").slideUp();
                $("#error_2").slideUp();
                for (var i = 0; i < datos.length; i++) {
                    select.append('<option value="' + datos[i].CUENTA + '">' + datos[i].DESC_MOSTRAR + '</option>');
                }
            }
            else {
                $("#error").slideDown();
                $("#error_2").slideDown();
                select.select2("val", "");
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function CargarEmpresas() {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#slcEmpresa').empty();
            $('#slcEmpresa').append('<option></option>');
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) {

                    $('#slcEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
            }
            $("#slcEmpresa").select2("val", $("#ctl00_hddctlg").val());
        },
        error: function (msg) {
            alert(msg);
        }
    });
}


function styleBotonesGrupo(strAddGrupo, strRefGrupo, strEditGrupo, strDelGrupo) {
    $('#aAddGrupo').attr('style', strAddGrupo);
    $('#aRefGrupo').attr('style', strRefGrupo);
    $('#aEditGrupo').attr('style', strEditGrupo);
    $('#aDelGrupo').attr('style', strDelGrupo);
}

function styleBotonesSubGrupo(strAddSubGrupo, strRefSubGrupo, strEditSubGrupo, strDelSubGrupo) {
    $('#aAddSubGrupo').attr('style', strAddSubGrupo);
    $('#aRefSubGrupo').attr('style', strRefSubGrupo);
    $('#aEditSubGrupo').attr('style', strEditSubGrupo);
    $('#aDelSubGrupo').attr('style', strEditSubGrupo);
}


function disabledBotonesGrupo(boolAddGrupo, boolRefGrupo, boolEditGrupo, boolDelGrupo) {
    $('#aAddGrupo').attr('disabled', boolAddGrupo);
    $('#aRefGrupo').attr('disabled', boolRefGrupo);
    $('#aEditGrupo').attr('disabled', boolEditGrupo);
    $('#aDelGrupo').attr('disabled', boolDelGrupo);

    if (boolAddGrupo == false) $('#aAddGrupo').attr('href', 'javascript:ShowModalNewGrupo();');
    else $('#aAddGrupo').attr('href', 'javascript:;');

    if (boolRefGrupo == false) $('#aRefGrupo').attr('href', 'javascript:RefreshGrupo();');
    else $('#aRefGrupo').attr('href', 'javascript:;');

    if (boolEditGrupo == false) $('#aEditGrupo').attr('href', 'javascript:ShowModalEditGrupo();');
    else $('#aEditGrupo').attr('href', 'javascript:;');

    if (boolDelGrupo == false) $('#aDelGrupo').attr('href', 'javascript:EliminarGrupo();');
    else $('#aDelGrupo').attr('href', 'javascript:;');


}

function disabledBotonesSubGrupo(boolAddSubGrupo, boolRefSubGrupo, boolEditSubGrupo, boolDelSubGrupo) {
    $('#aAddSubGrupo').attr('disabled', boolAddSubGrupo);
    $('#aRefSubGrupo').attr('disabled', boolRefSubGrupo);
    $('#aEditSubGrupo').attr('disabled', boolEditSubGrupo);
    $('#aDelSubGrupo').attr('disabled', boolDelSubGrupo);


    if (boolAddSubGrupo == false) $('#aAddSubGrupo').attr('href', 'javascript:ShowModalNewSubGrupo();');
    else $('#aAddSubGrupo').attr('href', 'javascript:;');

    if (boolRefSubGrupo == false) $('#aRefSubGrupo').attr('href', 'javascript:RefreshSubGrupo();');
    else $('#aRefSubGrupo').attr('href', 'javascript:;');

    if (boolEditSubGrupo == false) $('#aEditSubGrupo').attr('href', 'javascript:ShowModalEditSubGrupo();');
    else $('#aEditSubGrupo').attr('href', 'javascript:;');

    if (boolDelSubGrupo == false) $('#aDelSubGrupo').attr('href', 'javascript:EliminarSubGrupo();');
    else $('#aDelSubGrupo').attr('href', 'javascript:;');

}

function ShowModalNewGrupo() {

    ClearControlsModal();
    $('#grabarModal').html("<i class='icon-save'></i> Grabar");
    $('#grabarModal').attr("href", "javascript:GrabarModal();");
    $('#cancelarModal').html("<i class='icon-remove'></i> Cancelar");
    $('#myModalLabel').html('NUEVO GRUPO');
    $('#MuestraModal').modal('show');
    $($("#MuestraModal .controls").parent()).removeClass("error");
    //$("#slcEmpresa").attr("disabled", false);

}

function ShowModalEditGrupo() {

    ClearControlsModal();
    $($("#MuestraModal .controls").parent()).removeClass("error"); //nuevo;

    var CODE = $.trim($('#hfCOD_GRUPO').val());
    if (CODE != "") {
        $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
        $('#grabarModal').attr("href", "javascript:ModificarGrupo();");
        $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
        $("#correcto").remove();

        $("#txtCodigoModal").val($("#hfCOD_GRUPO").val());
        $("#txtDescripcionModal").val($("#hfDESC_GRUPO").val());

        $("#cboCuentas").select2('val', $("#hfCOD_CTA").val());

        if ($("#hfESTADO_GRUPO").val() == "ACTIVO") {
            $('#uniform-chkactivoModal span').removeClass().addClass("checked");
            $('#chkactivoModal').attr('checked', true);
        }
        if ($("#hfESTADO_GRUPO").val() == "INACTIVO") {
            $('#uniform-chkactivoModal span').removeClass();
            $('#chkactivoModal').attr('checked', false);
        }

        $('#myModalLabel').html('EDITAR GRUPO');
        $('#MuestraModal').modal('show');

        $("#txtDescAdicionalG").val($("#hfDESC_ADC_GRUPO").val());

    }
}

function ShowModalEditSubGrupo() {
    ClearControlsModalSubGrupo();

    $($("#MuestraModalSubGrupo .controls").parent()).removeClass("error"); //nuevo;
    var CODE = $.trim($('#hfCOD_SGRUPO').val());
    if (CODE != "") {
        $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
        $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");
        $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cerrar");
        $("#correcto").remove();

        $("#txtCodigoSubGrupo").val($("#hfCOD_SGRUPO").val());
        $("#txtDescripcionSubGrupo").val($("#hfDESC_SGRUPO").val());
        $("#cbo_cuenta_SGrupo").select2('val', $("#hfCOD_SCTA").val());
        //$("#cbo_empresa").select2('val', $("#hfCTLG_CODE").val());
        if ($("#hfESTADO_SGRUPO").val() == "ACTIVO") {
            $('#uniform-chkactivoSubGru span').removeClass().addClass("checked");
            $('#chkactivoSubGru').attr('checked', true);
        }
        if ($("#hfESTADO_SGRUPO").val() == "INACTIVO") {
            $('#uniform-chkactivoSubGru span').removeClass();
            $('#chkactivoSubGru').attr('checked', false);
        }

        $("#cboTipoBien").select2('val', $("#hfTIPO_BIEN").val());
        if ($("#hfCODIGO_DETRA").val() != null && $("#hfCODIGO_DETRA").val() != "") {
            $('#uniform-chkDetraccion span').removeClass().addClass("checked");
            $("#chkDetraccion").attr("checked", true);
            fillCboDetraccion2();
            $("#cboDetraccion").select2("val", $("#hfCODIGO_DETRA").val()).change();
            $("#cboDetraccion").removeAttr("disabled");
            $("#txtDetraccion").val(parseFloat($("#hfPORCENTAJE_DETRA").val()).toFixed(4));
        } else {
            $('#uniform-chkDetraccion span').removeClass();
            $("#chkDetraccion").attr("checked", false);
            $("#cboDetraccion").select2("val", '').change();
            $("#cboDetraccion").attr("disabled", true);
            $("#txtDetraccion").val('');
        }
        $('#myModalLabel2').html('EDITAR SUB GRUPO');
        $('#MuestraModalSubGrupo').modal('show');

        $("#txtDescAdicionalSG").val($("#hfDESC_ADC_SGRUPO").val());

    }
}

function fillCboDetraccion2() { //DPORTA 14/01/2022
    $.ajax({
        type: "POST",
        url: "vistas/NM/ajax/NMMPROD.ASHX?&OPCION=15",
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            $('#cboDetraccion').empty();
            $('#cboDetraccion').append('<option></option>');
            $('#cboDetraccion').select2('val', '');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    //if (datos[i].TIPO_EXISTENCIA_CODE == $('#cboexistencia').val()) {
                    $('#cboDetraccion').append('<option value="' + datos[i].CODIGO + '" data-percent="' + datos[i].PORCENTAJE + '" data-info="' + datos[i].INFORMACION + '" >' + datos[i].DEFINICION + '</option>');
                    //}
                    //.Replace(vbCrLf, "\n").Replace("""", "\""")
                }
            } else {
                $('#cboDetraccion').select2('val', '');
            }
        },
        error: function (msg) {
            alertCustom("Detracciones no se listaron correctamente");
        }
    });
}

function ShowModalNewSubGrupo() {
    ClearControlsModalSubGrupo();
    $('#grabarModalSubGrupo').html("<i class='icon-save'></i> Grabar");
    $('#grabarModalSubGrupo').attr("href", "javascript:GrabarModalSubGrupo();");
    $('#cancelarModalSubGrupo').html("<i class='icon-remove'></i> Cancelar");
    $('#cancelarModalSubGrupo').attr("href", "javascript:cancelarModalSubGrupo();");
    $('#myModalLabel2').html('NUEVO SUB GRUPO');
    $('#MuestraModalSubGrupo').modal('show');
    $(".controls").parent().removeClass("error");
    $($("#MuestraModalSubGrupo .controls").parent()).removeClass("error"); //nuevo;
    $("#cboTipoBien").select2("val", "");
}

function ClearControlsModal() {

    //$(".limpiar").val("");
    $("#txtCodigoModal").val("");
    $("#cboCuentas").select2("val", "");
    //$("#slc_Empresa").select2("val", $("#ctl00_hddctlg").val());
    $("#NuevoGrupo").remove();
    $('#uniform-chkactivoModal span').removeClass().addClass("checked");
    $('#chkactivoModal').attr('checked', true);
    $("#txtDescripcionModal").off();//NUEVO
    $("#txtDescAdicionalG").off();
    $("#txtDescripcionModal").val("");
    $("#txtDescAdicionalG").val("");


}

function ClearControlsModalSubGrupo() {
    //$(".limpiar").val("");
    $("#txtCodigoSubGrupo").val("");
    $("#cbo_cuenta_SGrupo").select2("val", "");
    //$("#cbo_empresa").select2("val", $("#ctl00_hddctlg").val());
    $("#NuevoSGrupo").remove();
    $('#uniform-chkactivoSubGru span').removeClass().addClass("checked");
    $('#chkactivoSubGru').attr('checked', true);
    $("#txtDescripcionSubGrupo").off();//NUEVO
    $("#txtDescAdicionalSG").off();
    $("#txtDescripcionSubGrupo").val("");
    $("#txtDescAdicionalSG").val("");
    $("#cboTipoBien").select2("val", "");

}

function HideModal() {
    $('#MuestraModal').modal('hide');
}

function HideModalSubGrupo() {
    $('#MuestraModalSubGrupo').modal('hide');

}

function CancelarModal() {
    HideModal();
}

function cancelarModalSubGrupo() {
    HideModalSubGrupo();
}

//-----------------
var GrabarModal = function () {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';
    var p_TIPO_MOV = '';
    var p_CTLG_CODE = '';
    var p_CODIGO_CTA = '';
    var p_DESC_ADICIONAL = '';
    var p_CODIGO_DETRACCION = ''; //DPORTA 14/01/2022
    var p_PORCENTAJE_DETRACCION = 0;//DPORTA 14/01/2022 

    ESTADO_IND = $("#chkactivoModal").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = $("#txtDescripcionModal").val();
    p_TIPO_MOV = 'E';
    p_CTLG_CODE = $("#hfCTLG_CODE").val();
    p_CODIGO_CTA = $("#cboCuentas").val();
    p_DESC_ADICIONAL = Enter_MYSQL($("#txtDescAdicionalG").val());
    p_CODIGO_DETRACCION = '';
    p_PORCENTAJE_DETRACCION = 0;

    var data = new FormData();
    data.append("OPCION", "NG");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_DESC", DESCRIPCION);
    data.append("p_TIPO_MOV", p_TIPO_MOV);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_CODIGO_CTA", p_CODIGO_CTA);
    data.append("p_DESC_ADICIONAL", p_DESC_ADICIONAL);
    data.append("p_CODIGO_DETRACCION", p_CODIGO_DETRACCION);
    data.append("p_PORCENTAJE_DETRACCION", p_PORCENTAJE_DETRACCION);

    if (vErrors(["txtDescripcionModal"])) {
        Bloquear("MuestraModal")
        $.ajax({
            url: "vistas/NC/ajax/NCMCNGA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModal");
                if (datos != null) {

                    $("#txtCodigoModal").val(datos);
                    ListarGrupos();
                    $("#grabarModal").html("<i class='icon-pencil'></i> Modificar");
                    $("#grabarModal").attr("href", "javascript:ModificarGrupo();");

                    $("#botones_grupo").append("<a id='NuevoGrupo' class='btn green' href='javascript:NuevoGrupo();'><i class='icon-plus'></i> Nuevo</a>");
                    exito();

                } else { noexito(); }
            },
            error: function (msg) {

                alert(msg);
            }
        });
    }
}
//---------------------------------------
function NuevoGrupo() {

    ClearControlsModal();
    $($("#MuestraModal :input[type=text]").parent().parent()).removeClass("error");
    $("#correcto").remove();
    $("#grabarModal").html("<i class='icon-save'></i> Grabar");
    $("#grabarModal").attr("href", "javascript:GrabarModal();");
}

function ModificarGrupo() {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';
    var p_TIPO_MOV = '';
    var p_CTLG_CODE = '';
    var p_CODIGO_CTA = '';
    var p_CODE = '';
    var p_DESC_ADICIONAL = '';
    var p_CODIGO_DETRACCION = '';//DPORTA 14/01/2022
    var p_PORCENTAJE_DETRACCION = 0;//DPORTA 14/01/2022 

    ESTADO_IND = $("#chkactivoModal").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = Enter_MYSQL($("#txtDescripcionModal").val());
    p_TIPO_MOV = 'E';
    p_CTLG_CODE = $("#hfCTLG_CODE").val();
    p_CODIGO_CTA = $("#cboCuentas").val();
    p_CODE = $('#hfCOD_GRUPO').val()
    p_DESC_ADICIONAL = Enter_MYSQL($("#txtDescAdicionalG").val());
    p_CODIGO_DETRACCION = '';
    p_PORCENTAJE_DETRACCION = 0;

    var data = new FormData();

    data.append("OPCION", "AT");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_DESC", DESCRIPCION);
    data.append("p_TIPO_MOV", p_TIPO_MOV);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_CODIGO_CTA", p_CODIGO_CTA);
    data.append("p_CODE", p_CODE);
    data.append("p_DESC_ADICIONAL", p_DESC_ADICIONAL);
    data.append("p_CODIGO_DETRACCION", p_CODIGO_DETRACCION);
    data.append("p_PORCENTAJE_DETRACCION", p_PORCENTAJE_DETRACCION);

    if (vErrors(["txtDescripcionModal"])) {

        Bloquear("MuestraModal ");

        $.ajax({
            url: "vistas/NC/ajax/NCMCNGA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModal");
                if (datos == "OK") {
                    ListarGrupos();
                    HideModal();
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }
}

function EliminarGrupo() {


    var p_CODE = '';



    p_CODE = $('#hfCOD_GRUPO').val()

    var data = new FormData();

    data.append("OPCION", "E");

    data.append("p_CODE", p_CODE);



    Bloquear("MuestraModal ");

    $.ajax({
        url: "vistas/NC/ajax/NCMCNGA.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("MuestraModal");
            if (datos == "OK") {


                ListarGrupos();
                HideModal();
                exito();

            } else { noexito(); }

        },
        error: function (msg) {

            alert(msg);
        }
    });


}
//---------------------------------------
function NuevoSGrupo() {

    ClearControlsModalSubGrupo();
    $($("#MuestraModalSubGrupo :input[type=text]").parent().parent()).removeClass("error");
    $("#correcto").remove();
    $("#grabarModalSubGrupo").html("<i class='icon-save'></i> Grabar");
    $("#grabarModalSubGrupo").attr("href", "javascript:GrabarModalSubGrupo();");
}

function EliminarSubGrupo() {

    var p_CODE = '';
    p_CODE = $('#hfCOD_SGRUPO').val()
    var data = new FormData();
    data.append("OPCION", "E");
    data.append("p_CODE", p_CODE);

    Bloquear("MuestraModal ");
    $.ajax({
        url: "vistas/NC/ajax/NCMCNGA.ASHX",
        type: "post",
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function (datos) {
            Desbloquear("MuestraModal");
            if (datos == "OK") {


                ListarSubGrupos($.trim($('#hfCOD_GRUPO').val()));
                HideModalSubGrupo();
                exito();

            } else { noexito(); }

        },
        error: function (msg) {

            alert(msg);
        }
    });
}

function ModificarSubGrupo() {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';
    var p_TIPO_MOV = '';
    var p_CTLG_CODE = '';
    var p_CODIGO_CTA = '';
    var p_CODE = '';
    var p_DESC_ADICIONAL = '';
    var p_TIPO_BIEN = '';
    var p_CODIGO_DETRACCION = '';//DPORTA 14/01/2022
    var p_PORCENTAJE_DETRACCION = 0;//DPORTA 14/01/2022 

    ESTADO_IND = $("#chkactivoSubGru").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = Enter_MYSQL($("#txtDescripcionSubGrupo").val());
    p_TIPO_MOV = 'E';
    p_CTLG_CODE = $("#hfCTLG_CODE").val();
    p_CODIGO_CTA = $("#cbo_cuenta_SGrupo").val();
    p_CODE = $('#hfCOD_SGRUPO').val()
    p_DESC_ADICIONAL = Enter_MYSQL($("#txtDescAdicionalSG").val());
    p_TIPO_BIEN = $("#cboTipoBien").val();
    p_CODIGO_DETRACCION = $("#cboDetraccion").val();
    p_PORCENTAJE_DETRACCION = ($("#txtDetraccion").val() == '') ? 0 : $("#txtDetraccion").val(); 

    var data = new FormData();
    data.append("OPCION", "AT");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_DESC", DESCRIPCION);
    data.append("p_TIPO_MOV", p_TIPO_MOV);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_CODIGO_CTA", p_CODIGO_CTA);
    data.append("p_CODE", p_CODE);
    data.append("p_DESC_ADICIONAL", p_DESC_ADICIONAL);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_CODIGO_DETRACCION", p_CODIGO_DETRACCION);
    data.append("p_PORCENTAJE_DETRACCION", p_PORCENTAJE_DETRACCION);

    if (vErrors(["txtDescripcionSubGrupo"])) {

        Bloquear("MuestraModalSubGrupo ");
        $.ajax({
            url: "vistas/NC/ajax/NCMCNGA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModalSubGrupo");
                if (datos == "OK") {


                    ListarSubGrupos($.trim($('#hfCOD_GRUPO').val()));
                    HideModalSubGrupo();
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }
}

var GrabarModalSubGrupo = function () {

    var ESTADO_IND = '';
    var USUA_ID = '';
    var DESCRIPCION = '';
    var p_TIPO_MOV = '';
    var p_CTLG_CODE = '';
    var p_CODIGO_CTA = '';
    var p_CODE = '';
    var p_DESC_ADICIONAL = '';
    var p_TIPO_BIEN = '';
    var p_CODIGO_DETRACCION = '';//DPORTA 14/01/2022
    var p_PORCENTAJE_DETRACCION = 0;//DPORTA 14/01/2022 

    ESTADO_IND = $("#chkactivoSubGru").is(':checked') ? 'A' : 'I';
    USUA_ID = $.trim($('#ctl00_txtus').val());
    DESCRIPCION = Enter_MYSQL($("#txtDescripcionSubGrupo").val());
    p_TIPO_MOV = 'E';
    p_CTLG_CODE = $("#hfCTLG_CODE").val();
    p_CODIGO_CTA = $("#cbo_cuenta_SGrupo").val();
    p_CODE = $('#hfCOD_GRUPO').val()
    p_DESC_ADICIONAL = Enter_MYSQL($("#txtDescAdicionalSG").val());
    p_TIPO_BIEN = $("#cboTipoBien").val();
    p_CODIGO_DETRACCION = $("#cboDetraccion").val();
    p_PORCENTAJE_DETRACCION = ($("#txtDetraccion").val() == '') ? 0 : $("#txtDetraccion").val(); 

    var data = new FormData();
    data.append("OPCION", "NG");
    data.append("p_ESTADO_IND", ESTADO_IND);
    data.append("p_USUA_ID", USUA_ID);
    data.append("p_DESC", DESCRIPCION);
    data.append("p_TIPO_MOV", p_TIPO_MOV);
    data.append("p_CTLG_CODE", p_CTLG_CODE);
    data.append("p_CODIGO_CTA", p_CODIGO_CTA);
    data.append("p_CODE", p_CODE);
    data.append("p_DESC_ADICIONAL", p_DESC_ADICIONAL);
    data.append("p_TIPO_BIEN", p_TIPO_BIEN);
    data.append("p_CODIGO_DETRACCION", p_CODIGO_DETRACCION);
    data.append("p_PORCENTAJE_DETRACCION", p_PORCENTAJE_DETRACCION);

    if (vErrors(["txtDescripcionSubGrupo"])) {

        Bloquear("MuestraModalSubGrupo ");
        $.ajax({
            url: "vistas/NC/ajax/NCMCNGA.ASHX",
            type: "post",
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (datos) {
                Desbloquear("MuestraModalSubGrupo");
                if (datos != null) {

                    $("#txtCodigoSubGrupo").val(datos);
                    var codGrupo = $('#hfCOD_GRUPO').val();
                    ListarSubGrupos(codGrupo);

                    $('#grabarModalSubGrupo').html("<i class='icon-pencil'></i> Modificar");
                    $('#grabarModalSubGrupo').attr("href", "javascript:ModificarSubGrupo();");

                    $("#botones_subgrupo").append("<a id='NuevoSGrupo' class='btn green' href='javascript:NuevoSGrupo();'><i class='icon-plus'></i> Nuevo</a>");
                    exito();

                } else { noexito(); }

            },
            error: function (msg) {

                alert(msg);
            }
        });

    }

}

//----------------------------------------
var ListarGrupos = function () {

    styleBotonesGrupo('', '', 'display:none', 'display:none');
    disabledBotonesGrupo(false, false, true, true);

    styleBotonesSubGrupo('display:none', 'display:none', 'display:none', 'display:none');
    disabledBotonesSubGrupo(true, true, true, true);

    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=PADRES&p_CTLG_CODE=" + $("#hfCTLG_CODE").val(),
        async: false,
        success: function (datos) {
            if (datos != null) {

                oTableGrupo.fnClearTable();
                oTableGrupo.fnAddData(datos);
                oTableSubGrupo.fnClearTable();
                //ListarSubGrupos(datos[0].CODIGO);
            }
            else {
                oTableGrupo.fnClearTable();
                //ListarSubGrupos("")

            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var ListarSubGrupos = function (DEPEND_CODE) {

    styleBotonesSubGrupo('display', 'display', 'display:none', 'display:none');
    disabledBotonesSubGrupo(false, false, true, true);

    $.ajax({
        type: "POST",
        url: "vistas/nc/ajax/ncmcnga.ashx?OPCION=1&p_TIPO=HIJOS&p_CODE=" + DEPEND_CODE + "&p_CTLG_CODE=" + $("#hfCTLG_CODE").val(),
        async: false,
        success: function (datos) {
            if (datos != null) {
                oTableSubGrupo.fnClearTable();
                oTableSubGrupo.fnAddData(datos);
                styleBotonesGrupo('display:none', 'display', 'display', 'display:none');
                disabledBotonesGrupo(true, false, false, true);
                //$("#slcEmpresa").attr("disabled", true);
            }
            else {

                oTableSubGrupo.fnClearTable();
                styleBotonesGrupo('display:none', 'display', 'display', 'display');
                disabledBotonesGrupo(true, false, false, false);
                //$("#slcEmpresa").attr("disabled", false);


            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function RefreshGrupo() {

    ListarGrupos();
}

function RefreshSubGrupo() {
    var codGrupo = $('#hfCOD_GRUPO').val();
    ListarSubGrupos(codGrupo);
}





var MPLGNLO = function () {

    var flagTb = false;

    var plugins = function () {

        $('#cboEmpresas').select2();
        $('#cboEstablecimiento').select2();


        $('.fecha').datepicker();

        $('.fecha').datepicker("setDate", "now");

        $('#txtcant').inputmask({ mask: '9', repeat: 9, greedy: false });
    }

    var listar = function () {
        $('#tblLISTA').DataTable().destroy();
        $('#tblLISTA').DataTable({
            ajax: {
                type: "POST",
                url: "vistas/mp/ajax/MPLFLSO.ashx?OPCION=6&CTLG_CODE=" + $('#cboEmpresas').val() + "&SCSL_CODE=" + $('#cboEstablecimiento').val() + "&P_CODEFABR=" + '',
                async: false,
                dataSrc: ''
            },
            order: [[0, 'desc']],
            columns: [
                {
                    data: "NRO_ORDEN",
                    createdCell: function (td) { $(td).css('text-align', 'center') }, width: '10%'
                },
                { data: "PRODUCTO", width: '20%' },
                {
                    data: "UNIDAD_MEDIDA",
                    createdCell: function (td) { $(td).css('text-align', 'center') }, width: '10%'
                },
                {
                    data: "CANTIDAD_TOTAL",
                    createdCell: function (td) { $(td).css('text-align', 'right') }, width: '10%'
                },
                { data: "RESPONSABLE", width: '25%' },
                { data: "DESCRIPCION", width: '25%' }
            ]
        });
    };

    var ic = 0;
    var funcionalidaTabla = function () {
        $('#tblLISTA tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
                var row = $('#tblLISTA').DataTable().row(this).data();
                var cod = row.NRO_ORDEN;
                window.location.href = '?f=MPMGNLD&codigo=' + cod;
            }
        });
    }

    var eventoControles = function () {
        $('#cboEmpresas').on('change', function () {
            listar();
        });

        $('#cboEstablecimiento').on('change', function () {
            listar();
        });
    }

    var filltxtrazsocial = function (v_ID, v_value, SERVICIO, TEXTI) {
        var selectRazonSocial = $(v_ID);
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMRCOM.ashx?OPCION=7&CTLG_CODE=" + '' + "&TEXTI=" + TEXTI + "&SERVICIO=" + SERVICIO,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            cache: false,
            success: function (datos) {
                if (datos != null) {

                    selectRazonSocial.typeahead({

                        source: function (query, process) {

                            array = [];
                            map = {};

                            var obj = "[";
                            for (var i = 0; i < datos.length; i++) {
                                array.push(datos[i].DESC_ADM);
                                obj += '{';
                                obj += '"DESC_ADM":"' + datos[i].DESC_ADM + '","CODIGO":"' + datos[i].CODIGO + '","DESC_UNIDAD_DESPACHO":"' + datos[i].DESC_UNIDAD_DESPACHO + '","NO_SERIADA":"' + datos[i].NO_SERIADA + '","UNIDAD":"' + datos[i].UNIDAD + '","CODE_EXISTENCIA":"' + datos[i].CODE_EXISTENCIA + '","DESC_EXISTENCIA":"' + datos[i].DESC_EXISTENCIA + '","STOCK":"' + datos[i].STOCK + '","COD_UNMED_SUNAT":"' + datos[i].COD_UNMED_SUNAT + '"';
                                obj += '},';
                            }
                            obj += "{}";
                            obj = obj.replace(",{}", "");
                            obj += "]";
                            var json = $.parseJSON(obj);

                            $.each(json, function (i, objeto) {
                                map[objeto.DESC_ADM] = objeto;
                            });
                            process(array);
                        },

                        updater: function (item) {
                            //$("#hdcodProd2").val(map[item].CODIGO);
                            $("#txtUnidad").val(map[item].DESC_UNIDAD_DESPACHO);
                            $("#hdproducto").val(map[item].CODIGO);
                            //$("#txtStock").val(map[item].STOCK);
                            $("#hdcodUNI").val(map[item].UNIDAD);


                            return item;
                        },

                    });
                    selectRazonSocial.keyup(function () {
                        $(this).siblings("ul").css("width", $(this).css("width"))
                    });
                }
                if (datos != null && $.trim(v_value).length > 0) {
                    selectRazonSocial.val(v_value);
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });

    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresas').empty();
                $('#cboEmpresas').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();
                    fillCboEstablecimiento();
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var cargaInicial = function () {
        $('#cboEmpresas').select2().change();
    }

    var fillCboEstablecimiento = function () {
        var selectEst = $('#cboEstablecimiento');
        $.ajax({
            type: "post",
            url: "vistas/no/ajax/NOMGNLO.ashx?OPCION=2&CTLG_CODE=" + $('#cboEmpresas').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectEst.empty();

                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].CODIGO + '" data-scsl-code="' + datos[i].ALMACEN + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
                }
                //selectEst.val($('#ctl00_hddestablecimiento').val());
                //selectEst.change();
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
        $('#cboEstablecimiento').select2('destroy').select2();
    };

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
            funcionalidaTabla();
        }
    };

}();

var fillCboEmpresa = function () {
    $.ajax({
        type: "post",
        url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboEmpresas').empty();
            $('#cboEmpresas').append('<option></option>');
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) {
                    $('#cboEmpresas').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }

                //Iniciar valores con valores de login
                $("#cboEmpresas").select2("val", $('#ctl00_hddctlg').val()).change();

                fillCboEstablecimiento();




            }



        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var fillCboEstablecimiento = function () {
    var selectEst = $('#cboEstablecimiento');
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCAJA.ashx?OPCION=7&CTLG_CODE=" + $('#cboEmpresas').val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            selectEst.empty();

            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    selectEst.append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                }
                $('#cboEstablecimiento').select('val', datos[0].CODIGO).change();
            }

        },
        error: function (msg) {
            alert(msg.d);
        }
    });
    $('#cboEstablecimiento').select2('destroy').select2();
};

var limpiar = function () {
    $('#txtcodprod').val("");
    $('#txtdescprod').val("");
    $('#txtUnidad').val("");
    $('#txtcant').val("");

}
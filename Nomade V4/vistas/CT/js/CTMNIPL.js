var oTableEPlanContable;
var CTLNIPL = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
    }

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    fnListarPlanContable();                    
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

 
    function cargainicial() {
        $('#cboEmpresa').on('change', function () {
            fnListarPlanContable();
        });
       
    }
    var fillBandejaEPlanContable = function () {
        var parms = {
            data: null,
            columns: [
                {
                    data: "CodPlanContable",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                {
                    data: "TipoPlanContab",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                { data: "NombrePlanContab" ,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                {
                    data: "NroNiveles",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                {
                    data: "DigitosNiveles",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                {
                    data: "FechaInicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                {
                    data: "FechaFin",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                    }
                },
                {
                    data: "Estado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                        if (cellData === 'A')
                            $(td).html("ACTIVO");
                        else
                            $(td).html("INACTIVO");
                    }
                },
                {
                    data: "Predeterminado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center")
                        if (cellData === 'S')
                            $(td).html("SI");
                        else
                            $(td).html("NO");
                    }
                }
            ]
        }

        oTableEPlanContable = iniciaTabla("tblEPlanContable", parms);
        $("#tblEPlanContable").removeAttr("style");

        $("#tblEPlanContable tbody").on("click", "tr", function () {

            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            }
            else {
                oTableEPlanContable.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");

                var pos = oTableEPlanContable.fnGetPosition(this);
                var row = oTableEPlanContable.fnGetData(pos);
                var sCodPlanContable = row.CodPlanContable;
                window.location.href = "?f=CTMNIPL&sCodPlanContable=" + sCodPlanContable;
            }

        });
    }

    var fnListarPlanContable = function () {
        Bloquear("ventana");
        $.ajax({
            type: "post",
            url: "vistas/CT/ajax/CTMNIPL.ASHX?sOpcion=2&sEmpresa=" + $('#cboEmpresa').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {

                if (datos != null) {
                    oTableEPlanContable.fnClearTable();
                    oTableEPlanContable.fnAddData(datos);
                    Desbloquear("ventana");
                }
                else {
                    alertCustom("No se pudo obtener lista de Planes Contables")
                    oTableEPlanContable.fnClearTable();
                    Desbloquear("ventana");
                }

            },
            error: function (msg) {
                noexitoCustom("Error al obtener lista Planes Contables");
                oTableEPlanContable.fnClearTable();
            }
        });
    };
    return {
        init: function () {
            plugins();
            fillBandejaEPlanContable();
            fillCboEmpresa();
            cargainicial();
            //fnListarPlanContable();
        }
    };


}();
var CTMNIPL = function () {

    var plugins = function () {
        $(".combobox").select2();

        $('#cboEmpresa').select2();

        $("#txtNombrePlanContable").focus(function () { $(this).inputmask({ "mask": "D", "repeat": 50, "greedy": false }); })
        
        $("#txtFechaIni").datepicker()
                .inputmask("date", { yearrange: { minyear: 1900, maxyear: 2099 } })
                .datepicker("setDate", "now");

        $("#cboReplicaCrea").multiselect({
            nonSelectedText: "Digitos!",
            //enableFiltering: true,
            includeSelectAllOption: true,
            selectAllText: "Seleccionar Todos",
            maxHeight: 200,
            dropUp: true,
            onChange: function (option, checked, select) {
                var asDigitos = $("#cboReplicaCrea").val();
                if (asDigitos === null)
                    asDigitos = [];
                var sDigitos = asDigitos.toString();
                $("#txtReplicaCrea").val(sDigitos);
            }
        });

        $("#cboReplicaEdita").multiselect({
            nonSelectedText: "Digitos!",
            //enableFiltering: true,
            includeSelectAllOption: true,
            selectAllText: "Seleccionar Todos",
            maxHeight: 200,
            dropUp: true,
            onChange: function (option, checked, select) {
                var asDigitos = $("#cboReplicaEdita").val();
                if (asDigitos === null)
                    asDigitos = [];
                var sDigitos = asDigitos.toString();
                $("#txtReplicaEdita").val(sDigitos);
            }
        });
    };

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/ca/ajax/calvica.ashx?OPCION=0&p_USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                    $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

                    
                } else {
                    $('#cboEmpresa').select2('val', '');
                }
            },
            error: function (msg) {
                alert(msg);
            }
        });
    };

    var fnCargarCombos = function () {
        //Cargar Tipo de Plan de Cuentas
        var selectTipoPlanCuenta = $("#cboTipoPlanCuenta");
        $.ajax({
            type: "post",
            url: "vistas/ct/ajax/CTMNIPL.ashx?sOpcion=1&sEstado=A",
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                selectTipoPlanCuenta.empty();
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        if (i == 0) {
                            selectTipoPlanCuenta.append("<option></option>");
                        }
                        selectTipoPlanCuenta.append("<option value='" + datos[i].CodTipoPlanContab + "'>" + datos[i].cDescripcion + "</option>");
                    }
                } else {
                    selectTipoPlanCuenta.append("<option></option>");
                }
            },
            error: function (msg) {
                noexitoCustom("Error al listar tipos de planes contables");
            }
        });

        //Combo Digitos
        var aoColumnas = [];
        for (var i = 0; i < 10; i++) {
            aoColumnas.push({ "label": i, "title": i, "value": i });
        }
        $(".comboboxmulti").multiselect("dataprovider", aoColumnas);
        $(".checkbox").attr("style", "padding:3px 20px 3px 30px !important");
    };

    var fnCargarEventos = function () {
        $("#btnGrabar").on("click", function () {
            fnGrabar();
        });

        $("#btnCancelar").on("click", function () {
            window.location.href = "?f=ADMCUSO";
        });

        $("#txtNroNiveles").on("change", function () {
            var sHtmlNiveles = fnGetHtmlNiveles();
            $("#divNiveles").html(sHtmlNiveles);

            //$("#tbDigNiv td.digiton").on("change", function () {
            //    var sNroDigitos = $(this).val().trim();
            //    if (sNroDigitos === "")
            //        $(this).val("0");
            //});

        });

        $("#chboReplicaCrea").on("change", function () {
            $("#cboReplicaCrea").multiselect("clearSelection");
            $("#txtReplicaCrea").val("");
            if ($("#chboReplicaCrea").is(":checked")) {
                $("#cboReplicaCrea").multiselect("enable");
            }
            else {
                $("#cboReplicaCrea").multiselect("disable");
            }
        });

        $("#chboReplicaEdita").on("change", function () {
            $("#cboReplicaEdita").multiselect("clearSelection");
            $("#txtReplicaEdita").val("");
            if ($("#chboReplicaEdita").is(":checked")) {
                $("#cboReplicaEdita").multiselect("enable");
            }
            else {
                $("#cboReplicaEdita").multiselect("disable");
            }
        });
    };

    var fnGetHtmlNiveles = function(){
        var sNroNiveles = $("#txtNroNiveles").val().trim();
        if (sNroNiveles === "") {
            $("#txtNroNiveles").val("0");
            return "";
        }
        var sHtml = "";
        $.ajax({
            type: "post",
            url: "vistas/ct/ajax/CTMNIPL.ashx?sOpcion=3&iNroNiveles=" + sNroNiveles,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (sResponse) {
                sHtml = sResponse;
            },
            error: function (msg) {
                noexitoCustom("Error al listar los Niveles");
            }
        });
        return sHtml;
    };
    
    var fnErrorValidacion = function () {
        var aeError = ["cboTipoPlanCuenta", "txtNombrePlanContable", "txtNroNiveles"];

        if ($("#chboReplicaCrea").is(":checked")) 
            aeError.push("txtReplicaCrea");        

        if ($("#chboReplicaEdita").is(":checked")) 
            aeError.push("txtReplicaEdita");

        var aeInput = $("#tbDigNiv td").find(".digiton");
        var iCantTxt = aeInput.length;
        for (var i = 0; i < iCantTxt; i++)
            aeError.push($(aeInput[i]).attr("id"));

        if (!vErrors(aeError))
            return;

        var sNroNiveles = $("#txtNroNiveles").val().trim();
        if (isNaN(sNroNiveles)) {
            infoCustom("El valor del Número de Niveles es incorrecto.");
            return;
        }
        
        var iNroNiveles = parseInt(sNroNiveles);
        if (iNroNiveles <= 0) {
            infoCustom("El Número de Niveles debe ser mayor a cero.");
            return;
        }

        if (iNroNiveles !== iCantTxt) {
            infoCustom("El Número de Niveles (" + iNroNiveles + ") no coincide con la Cantidad de Niveles (" + iCantTxt + ") generados en la Tabla.");
            return;
        }

        for (var i = 0; i < iCantTxt; i++) {
            var sNroDigitos = $(aeInput[i]).val().trim();
            if (isNaN(sNroDigitos)) {
                infoCustom("El valor para la Cantidad de Dígitos por Niveles es incorrecto.");
                return;
            }

            var iNroDigitos = parseInt(sNroDigitos);
            if (iNroDigitos <= 0) {
                infoCustom("La Cantidad de Dígitos por Niveles debe ser mayor a cero.");
                return;
            }
        }

        //var oExpRegular = new RegExp("^[0-9]((,\s?){1}[0-9])*$");
        if ($("#chboReplicaCrea").is(":checked")) {
            var asDigitos = $("#cboReplicaCrea").val();
            if (asDigitos === null) {
                infoCustom("Debe seleccionar los digitos a Replicar en la Creación de Cuentas Contables.")
                return;
            }
        }

        if ($("#chboReplicaEdita").is(":checked")) {
            var asDigitos = $("#cboReplicaEdita").val();
            if (asDigitos === null) {
                infoCustom("Debe seleccionar los digitos a Replicar en la Edición de Cuentas Contables.");
                return;
            }
        }

        let bEstado = $("#chboEstado").is(":checked");
        let bPredeterminado = $("#chboPredeterminado").is(":checked");
        let sCodPlanContable = $("#txtCodPlanContable").val().trim();
        let aoPlanContable = [];
        if (bEstado) {
            if (bPredeterminado) {
                aoPlanContable = fnListarPlanContable("");
                for (let i = 0; i < aoPlanContable.length; i++) {
                    if (aoPlanContable[i].CodPlanContable !== sCodPlanContable) {
                        if (aoPlanContable[i].Predeterminado === "S") {
                            infoCustom("¡Imposible continuar! Existe un plan contable marcado como predeterminado.");
                            return;
                        }
                    }
                }
            }
        } else {
            if (bPredeterminado) {
                infoCustom("¡Imposible continuar! No se puede marcar un plan contable inactivo como predeterminado.");
                return;
            }
        }
        
        return false;
    };
    
    var fnGrabar = function () {
        var bError = fnErrorValidacion();
        if (bError === undefined)
            return;
        if (bError)
            return;
        
        let sCodPlanContable = $("#txtCodPlanContable").val().trim();
        let sEmpresa = $("#cboEmpresa").val();
        let sCodTipoPlanContable = $("#cboTipoPlanCuenta").val();
        let sNombrePlanContable = $("#txtNombrePlanContable").val();
        let iNroNiveles = $("#txtNroNiveles").val();
        let sDigitosNiveles = "";
        let aeInput = $("#tbDigNiv td").find(".digiton");
        for (var i = 0; i < aeInput.length; i++) {
            if (i === 0)
                sDigitosNiveles += $(aeInput[i]).val().trim();
            else
                sDigitosNiveles += "," + $(aeInput[i]).val().trim();
        }
        let sReplicaCreacion = ($("#chboReplicaCrea").is(":checked") ? "S" : "N");
        let sReplicaCreaDigitos = ($("#cboReplicaCrea").val() === null ? "" : $("#cboReplicaCrea").val());
        let sReplicaEdicion = ($("#chboReplicaEdita").is(":checked") ? "S" : "N");
        let sReplicaEditaDigitos = ($("#cboReplicaEdita").val() === null ? "" : $("#cboReplicaEdita").val());
        let sEstado = ($("#chboEstado").is(":checked") ? "A" : "I");
        let sPredeterminado = ($("#chboPredeterminado").is(":checked") ? "S" : "N");

        let sOpcion = (sCodPlanContable === "" ? "N" : "M");
        

        var data = new FormData();
        data.append("sOpcion", sOpcion);
        data.append("sCodPlanContable", sCodPlanContable);
        data.append("sCodTipoPlanContable", sCodTipoPlanContable);
        data.append("sNombrePlanContable", sNombrePlanContable);
        data.append("iNroNiveles", iNroNiveles);
        data.append("sDigitosNiveles", sDigitosNiveles);
        data.append("sReplicaCreacion", sReplicaCreacion);
        data.append("sReplicaCreaDigitos", sReplicaCreaDigitos);
        data.append("sReplicaEdicion", sReplicaEdicion);
        data.append("sReplicaEditaDigitos", sReplicaEditaDigitos);
        data.append("sEstado", sEstado);
        data.append("sPredeterminado", sPredeterminado);
        data.append("sEmpresa", sEmpresa);
        

        Bloquear("ventana");
        $.ajax({
            type: "POST",
            url: "vistas/CT/ajax/CTMNIPL.ASHX",
            contentType: false,
            data: data,
            processData: false,
            async: false,
            success: function (response) {
                Desbloquear("ventana");
                if (response === "") {
                    noexito();
                    return;
                }

                if (response.indexOf("[Advertencia]:") > -1) {
                    alertCustom(response);
                    return;
                }

                if (response.indexOf("[Error]:") > -1) {
                    alertCustom("La Estructura del Plan Contable no se registró.");
                    return;
                }
                if (sOpcion === "N")
                    $("#txtCodPlanContable").val(response);
                $("#btnGrabar").html("<i class='icon-pencil'></i>Modificar");
                exito();
            },
            error: function (msg) {
                Desbloquear("ventana");
                alertCustom("La Estructura del Plan Contable no se registró.");
            }
        });      
    };

    var fnListarPlanContable = function (sCodPlanContable) {
        let aoPlanContable = [];
        $.ajax({
            type: "post",
            url: "vistas/ct/ajax/CTMNIPL.ashx?sOpcion=2&sCodPlanContable=" + sCodPlanContable,
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {
                aoPlanContable = datos;
            },
            error: function (msg) {
                noexitoCustom("Error al cargar datos de plan contable");
            }
        });
        return aoPlanContable;
    };
        
    var cargaInicial = function () {
        $(".centro").css("text-align", "center");
        $(".derecha").css("text-align", "right");

        var sCodPlanContable = ObtenerQueryString("sCodPlanContable");

        if (sCodPlanContable === "undefined" || sCodPlanContable === undefined || sCodPlanContable === "")
            return;

        let aoPlanContable = fnListarPlanContable(sCodPlanContable);
        if (aoPlanContable.length === 0) {
            return;
        }

        $("#txtCodPlanContable").val(aoPlanContable[0].CodPlanContable);
        $("#cboTipoPlanCuenta").select2("val", aoPlanContable[0].CodTipoPlanContab);

        if (aoPlanContable[0].Estado === 'A') {
            $("#uniform-chboEstado span").removeClass().addClass("checked");
            $("#chboEstado").attr("checked", true);
        }
        else {
            $("#uniform-chboEstado span").removeClass();
            $("#chboEstado").attr("checked", false);
        }

        if (aoPlanContable[0].Predeterminado === 'S') {
            $("#uniform-chboPredeterminado span").removeClass().addClass("checked");
            $("#chboPredeterminado").attr("checked", true);
        }
        else {
            $("#uniform-chboPredeterminado span").removeClass();
            $("#chboPredeterminado").attr("checked", false);
        }

        $("#txtNombrePlanContable").val(aoPlanContable[0].NombrePlanContab);
        $("#txtFechaIni").val(aoPlanContable[0].FechaInicio);
        $("#txtFechaFin").val(aoPlanContable[0].FechaFin);
        $("#txtNroNiveles").val(aoPlanContable[0].NroNiveles).change();

        var asNroDigitos = [];
        if (aoPlanContable[0].DigitosNiveles !== null)
            asNroDigitos = aoPlanContable[0].DigitosNiveles.toString().split(",");
        var aeInput = $("#tbDigNiv td").find(".digiton");
        for (var i = 0; i < aeInput.length && i < asNroDigitos.length; i++)
            $(aeInput[i]).val(asNroDigitos[i]);

        if (aoPlanContable[0].ReplicaCrea === true) {
            $("#uniform-chboReplicaCrea span").removeClass().addClass("checked");
            $("#chboReplicaCrea").attr("checked", true);
        }
        else {
            $("#uniform-chboReplicaCrea span").removeClass();
            $("#chboReplicaCrea").attr("checked", false);
        }
        $("#chboReplicaCrea").change();
        var sReplicaDigitosCrea = aoPlanContable[0].ReplicaCreaDigitos;
        if (sReplicaDigitosCrea !== null) {
            var asReplicaDigitosCrea = sReplicaDigitosCrea.split(",");
            $("#cboReplicaCrea").val(asReplicaDigitosCrea);
            $("#cboReplicaCrea").multiselect("refresh");
            $("#cboReplicaCrea").multiselect("select", null, true);
        }

        if (aoPlanContable[0].ReplicaEdita === true) {
            $("#uniform-chboReplicaEdita span").removeClass().addClass("checked");
            $("#chboReplicaEdita").attr("checked", true);
        }
        else {
            $("#uniform-chboReplicaCrea span").removeClass();
            $("#chboReplicaEdita").attr("checked", false);
        }
        $("#chboReplicaEdita").change();
        var sReplicaDigitosEdita = aoPlanContable[0].ReplicaCreaDigitos;
        if (sReplicaDigitosEdita !== null) {
            var asReplicaDigitosEdita = sReplicaDigitosCrea.split(",");
            $("#cboReplicaEdita").val(asReplicaDigitosEdita);
            $("#cboReplicaEdita").multiselect("refresh");
            $("#cboReplicaEdita").multiselect("select", null, true);
        }

        $("#btnGrabar").html("<i class='icon-pencil'></i> Modificar");

    };

    return {
        init: function () {
            plugins();            
            fnCargarEventos();
            fnCargarCombos();
            fillCboEmpresa();
            cargaInicial();
        }
    };

}();

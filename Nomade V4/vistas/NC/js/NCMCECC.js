var vg_jsonCecc = new Array();
var aoNiveles = [];
var vNiveles = [];

function fillCboPlanCostos(value) {

    var obj = '';
    var codigoActivo = "";
    $.ajax({
        type: "post",
        url: "vistas/nc/ajax/ncmcecc.ashx?sOpcion=1&CTLG_CODE=" + value,
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            $('#cboPlanCostos').empty();
            $('#cboPlanCostos').append('<option></option>');
            if (datos != null) {
                for (var i = 0; i < datos.length; i++) {
                    $('#cboPlanCostos').append('<option value="' + datos[i].codigo + '" nombre_centro="' + datos[i].nombre_centro_costos + '">' + datos[i].nombre_centro_costos + '     (' + datos[i].estado_desc + ')' + '</option>');
                    if (datos[i].estado_ind == 'A') {
                        codigoActivo = datos[i].codigo;
                    }
                }
                vg_jsonCecc = datos;


            }
            else {
                vg_jsonCecc = new Array();
            }
        },
        complete: function () {
            $('#cboPlanCostos').select2('val', codigoActivo).change();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

var NCLCECC = function () {

    var oCeccSelected;
    var oTableCCostos;
    

    var eventos = function () {
        $('#cboEmpresa').on('change', function () {

            var ddlValue = this.value;
            var codigoEmpresa = $('#cboEmpresa').val();           
            fillCboPlanCostos(ddlValue);
          
        });

        $('#cboPlanCostos').on('change', function (){        
            var ddlValue = this.value;
            var obj = vg_jsonCecc;
            if (obj.length > 0) {
                $('#cboNiveles').empty();
                $('#cboNiveles').append('<option></option>');
                
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].codigo == ddlValue) {
                        oCeccSelected = obj[i];
                        var nNiveles = oCeccSelected.niveles;
                        $('#cboNiveles').empty();
                        $('#cboNiveles').append('<option value="0">Todos</option>');
                        for (var j = 1; j <= nNiveles; j++)
                        {
                            $('#cboNiveles').append('<option value="' + j + '">' + j + '</option>');
                        }
                       
                       break;
                    }
                }
                $('#cboNiveles').select2('val', '');
                $('#cboNiveles').change();
    
            }

        });

        $("#cboNiveles").on('change', function () {
            handleTblBandeja(oCeccSelected.nombres_nivel, parseInt($("#cboNiveles").val() === "0" ? oCeccSelected.niveles : $("#cboNiveles").val()));
        });


        $('#btnBuscar').on('click', function () {          
            cargaCentroCosto(parseInt($("#cboNiveles").val() === "0" ? oCeccSelected.niveles : $("#cboNiveles").val()));
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
                $('#cboEmpresa').empty();
                $('#cboEmpresa').append('<option></option>');
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        $('#cboEmpresa').append('<option value="' + datos[i].CODIGO + '">' + datos[i].DESCRIPCION + '</option>');
                    }
                }
                $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
                $('#cboEmpresa').change();
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboPlanCostos').select2();
        $('#cboNiveles').select2();
    }

    var handleTblBandeja = function (strNiveles,niveles) {
        $(document).off('order.dt');
        var tabla = $("#tabla");    
        var parms;
        var oColumns = [
            {
                data: "CODIGO",
                visible:false
            },          
            {
                data: "NOMBRE",
                name: "NOMBRE"
            }
        ];       
        var oRowsGroup = ['NOMBRE:name']
        var arrayNiveles = strNiveles.split(",").splice(0, niveles);
        var tablaHTML = "";

        tablaHTML += `<table id="tblCCostos" class="DTTT_selectable bordered display" ><thead><tr><th></th><th>CENTRO DE COSTO</th>`;

        arrayNiveles.filter(function (object, index) {
            var sNivel = "N" + (index + 1).toString();

            tablaHTML += '<th>' +
                (index + 1).toString() + " - " + object +
                '</th>';            

            oColumns.push(
                {
                    data: sNivel,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    name: sNivel

                }
            );

            if (index<arrayNiveles.length-1)
                oRowsGroup.push(sNivel + ":name");

        });

        tablaHTML += `</tr></thead></table>`;

        tabla.empty();
        tabla.html(tablaHTML);

        parms = {
            data: null,
            columns: oColumns,
            paging:false,
            rowsGroup: oRowsGroup
        }             

        oTableCCostos = $('#tblCCostos').dataTable(parms);       

        $('#tblCCostos tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTableCCostos.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTableCCostos.fnGetPosition(this);
                var row = oTableCCostos.fnGetData(pos);
                var codigo = row.CODIGO;         
                var empresa = row.EMPRESA;

                window.location.href = '?f=ncmcecc&sCodCentroCostosCab=' + codigo + "&empresa_code=" + empresa;
            }
        });

    }

    var CaragaInicial = function () {
        fillCboPlanCostos($('#cboEmpresa').val());
    }

    var cargaCentroCosto = function (nivel) {
        var newJson = new Array();
        $.ajax({
            type: "post",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LACC&sCodCentroCostosCab=" + $("#cboPlanCostos").val() + "&sEstado=A&CTLG_CODE=" + $("#cboEmpresa").val(),
            contenttype: "application/json;",
            datatype: "json",
            beforeSend: function () { Bloquear("tabla", "Obteniendo Datos ...");},
            async: true,
            success: function (datos) {
                oTableCCostos.fnClearTable();
                
                if (datos.length > 0 && !isEmpty(datos)) {
                    datos.filter(function (objeto, index) {
                        if (objeto.Nivel === nivel) {
                            let oVariable = {};
                            let oObject = {};
                            let oConstante = {
                                "CODIGO": oCeccSelected.codigo,
                                "NOMBRE": oCeccSelected.nombre_centro_costos,
                                "EMPRESA": $("#cboEmpresa").val()
                            };

                            let oActual;
                            oActual = objeto;

                            for (var i = nivel; i >= 1; i--) {
                                eval('oVariable.' + ("N" + i.toString()) + '="' + oActual.DESCRIPCION_CORTA + '"');
                                oActual = datos.filter(function (item) {
                                    return item.Codigo === oActual.CodPadre;
                                })[0];
                            }

                            oObject = Object.assign(oObject, oConstante);
                            oObject = Object.assign(oObject, oVariable);

                            newJson.push(oObject);
                        }
                    });
                    oTableCCostos.fnAddData(newJson);
                }
            },
            complete: function () {
                Desbloquear("tabla");

            }
        });
    };



    return {
        init: function () {
            plugins();
            fillCboEmpresa();                     
            eventos();
            CaragaInicial();
        }
    };

}();

var fillDataTable = function () {

    var json = jQuery.parseJSON($('#ctl00_cph_ctl00_PCONGEN1_ctl00_hfObjCCostos').val());
    $("#lvl_1").html(json[0]["CABEZERA1"]);
    $("#lvl_2").html(json[0]["CABEZERA2"]);
    $("#lvl_3").html(json[0]["CABEZERA3"]);
    $("#lvl_4").html(json[0]["CABEZERA4"]);

    oTableCCostos.fnClearTable();
    oTableCCostos.fnAddData(json);
}

var NCMCECC = function () {
    

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboPlanCostos').select2();
    }    

    var fillCboEmpresa = function () {
        $.ajax({
            type: "post",
            url: "vistas/nm/ajax/nmmfpro.ashx?OPCION=0&USUA_ID=" + $('#ctl00_txtus').val(),
            contenttype: "application/json;",
            datatype: "json",
            async: false,
            success: function (datos) {              
                $("#cboEmpresa").append(fnGetEmpresas(1));
            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    var eventoControles = function () {

        $('#cboEmpresa').on('change', function (event, empr, ceco) {

            var ddlValue = empr!=undefined?empr:this.value;
            var codigoEmpresa = $('#hfEmpresaSeleccionado').val();
            
            if (empr != undefined) {
                $(this).select2('val', empr);
            }
                      
            $('#hfCodigoEmpresa').val(ddlValue);
            fillCboPlanCostos(ddlValue);
            $('#hfEmpresaSeleccionado').val(ddlValue);

            styleDiv('display:none', 'display:none');                

            InitConfiguration('1', '1', $('#hfNivel1').val());
            InitConfiguration('2', '2', $('#hfNivel2').val());
            InitConfiguration('3', '3', $('#hfNivel3').val());
            InitConfiguration('4', '4', $('#hfNivel4').val());

            if (ceco != undefined) { $('#cboPlanCostos').select2('val', ceco).change(); }
            
        });

        $('#cboPlanCostos').on('change', function () {
            var ddlValue = this.value;
            var obj = $.parseJSON($("#hfArrayPlanCosto").val());
            $('#hfNombreCentro').val($("#cboPlanCostos option:selected").attr('nombre_centro')); 

            fnCargarParametros();
            CargarArbolCentroCostos();
            
            $('#hfCodigoCentroCostos').val($("#cboPlanCostos").val());           
        });

        $('#nuevoModal').on('click', function () {
            $('#txtDescripcionModal').val('');
            $('#txtAbreviaturaModal').val('');
            let aoNodoActual = $('#treeCentroCostos').treeview('getSelected');
            var CODE = $.trim($("#hfCodigoNodo").val());
            if (CODE != "") {
                if (CODE != "0") {
                    var descnodo = $("#hfDescNodo").val().trim();
                    var cadena = descnodo.split(" ");
                    var nivel = $("#hfNivelNodo").val();
                } else {
                    nivel = $("#hfNivelNodo").val();
                }

                if (nivel === '0') {
                    $("#niveles").html('');
                    $("#lblDescripcion").html(aoNiveles[0].DESCRIPCION);
                    $("#myModalLabel").html('Mantenimiento ' + $('#hfNombreCentro').val() + ' - ' + aoNiveles[0].DESCRIPCION);
                } else {
                    let oNodoActual = aoNodoActual[0];

                    let sDescripcionNivel = "";
                    var shtml = `<table>`;
                    for (let i = 0; i < aoNiveles.length; i++) {
                        if (aoNiveles[i].NIVEL < nivel) {
                            sDescripcionNivel = fnGetDescripNivel(oNodoActual, aoNiveles[i].NIVEL);
                            shtml += `<tr><td style="white-space: nowrap;"><strong>` + aoNiveles[i].DESCRIPCION + ` : </strong></td><td style="padding-left: 10px; padding-bottom: 5px;">` + sDescripcionNivel + `</td><tr>`;
                        }
                    }
                    shtml += `<table>`;
                    $("#niveles").html(shtml);
                    $("#lblDescripcion").html(aoNodoActual[0].Descripcion);
                    let j = nivel.toString().toUpperCase();
                    $("#myModalLabel").html('Mantenimiento ' + $('#hfNombreCentro').val() + ' - ' + aoNiveles[nivel - 1].DESCRIPCION);
                }

                $("#txtCodigoModal").val(CODE);
                $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
                $("#grabarModal").html("<i class='icon-pencil'></i> Grabar");
                $("#grabarModal").attr("href", "javascript:GrabarModal(" + (parseInt(nivel) + 1).toString() + ");");
                $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
                $("#nuevoModal").css("display", "none");
            }
        });
        
        $("#btnAgregarNodo").on("click", function (e) {
            if ($("#btnAgregarNodo").attr("disabled") != "disabled") {
                $('#txtDescripcionModal').val('');
                $('#txtAbreviaturaModal').val('');
                let aoNodoActual = $('#treeCentroCostos').treeview('getSelected');
                var CODE = $.trim($("#hfCodigoNodo").val());
                if (CODE != "") {
                    if (CODE != "0") {
                        var descnodo = $("#hfDescNodo").val().trim();
                        var cadena = descnodo.split(" ");
                        var nivel = $("#hfNivelNodo").val();
                    } else {
                        nivel = $("#hfNivelNodo").val();
                    }

                    if (nivel === '0') {
                        $("#niveles").html('');
                        $("#lblDescripcion").html(aoNiveles[0].DESCRIPCION);
                        $("#myModalLabel").html('Mantenimiento ' + $('#hfNombreCentro').val() + ' - ' + aoNiveles[0].DESCRIPCION);

                        $("#txtCodigoModal").val(CODE);
                        $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
                        $("#grabarModal").html("<i class='icon-pencil'></i> Grabar");
                        $("#grabarModal").attr("href", "javascript:GrabarModal(" + (parseInt(nivel) + 1).toString() + ");");
                        $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
                        $("#nuevoModal").css("display", "none");
                        $("#MuestraModal").modal("show");


                    } else {

                        console.log(aoNiveles[nivel]);
                        let oNodoActual = aoNodoActual[0];

                        let sDescripcionNivel = "";
                        var shtml = `<table>`;
                        for (let i = 0; i < aoNiveles.length; i++) {
                            if (aoNiveles[i].NIVEL < nivel) {
                                sDescripcionNivel = fnGetDescripNivel(oNodoActual, aoNiveles[i].NIVEL);
                                shtml += `<tr><td style="white-space: nowrap;"><strong>` + aoNiveles[i].DESCRIPCION + ` : </strong></td><td style="padding-left: 10px; padding-bottom: 5px;">` + sDescripcionNivel + `</td><tr>`;
                            }
                        }

                        if (aoNiveles[nivel] === undefined) {
                            infoCustom('No se puede agregar un nivel más, se encuentra en el ultimo nivel.');
                            return;
                        } else {
                            shtml += `<table>`;
                            $("#niveles").html(shtml);
                            $("#lblDescripcion").html(aoNodoActual[0].Descripcion);
                            let j = nivel.toString().toUpperCase();
                            $("#myModalLabel").html('Mantenimiento ' + $('#hfNombreCentro').val() + ' - ' + aoNiveles[nivel].DESCRIPCION);

                            $("#txtCodigoModal").val(CODE);
                            $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
                            $("#grabarModal").html("<i class='icon-pencil'></i> Grabar");
                            $("#grabarModal").attr("href", "javascript:GrabarModal(" + (parseInt(nivel) + 1).toString() + ");");
                            $("#cancelarModal").html("<i class='icon-remove'></i> Cancelar");
                            $("#nuevoModal").css("display", "none");
                            $("#MuestraModal").modal("show");
                        }                                                
                    }

                    

                }
            }
        });

        $("#btnEditarNodo").on("click", function (e) {
            if ($("#btnEditarNodo").attr("disabled") != 'disabled') {
                var CODE = $.trim($("#hfCodigoNodo").val());
                var aoNodoActual = $('#treeCentroCostos').treeview('getSelected');
                if (CODE != "") {
                    var descnodo;
                    var cadena;
                    var nivel;
                    var descripcionnodo = "";
                    var abrev = "";
                    if (CODE != "0") {
                        descnodo = $("#hfDescNodo").val().trim();
                        cadena = descnodo.split(" ");
                       
                        descripcionnodo = $("#hfNombreNodo").val();
                        abrev = $("#hfAbreviaturaNodo").val();
                        nivel = $("#hfNivelNodo").val();

                        
                        let oNodoActual = aoNodoActual[0];

                        let sDescripcionNivel = "";
                        var shtml = `<table>`;
                        for (let i = 0; i < aoNiveles.length; i++) {
                            if (aoNiveles[i].NIVEL < nivel) {
                                sDescripcionNivel = fnGetDescripNivel(oNodoActual, aoNiveles[i].NIVEL);
                                shtml += `<tr><td style="white-space: nowrap;"><strong>` + aoNiveles[i].DESCRIPCION + ` : </strong></td><td style="padding-left: 10px; padding-bottom: 5px;">` + sDescripcionNivel + `</td><tr>`;
                            }
                        }
                        shtml += `<table>`;
                    } else {
                        infoCustom("No se puede actualizar el nombre del centro de costos por esta pestaña.");
                    }

                    //console.log(aoNiveles);

                    $('#txtCodigoModal').val(CODE);
                    $('#txtDescripcionModal').val(descripcionnodo);
                    $('#txtAbreviaturaModal').val(abrev);
                    $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                    $('#grabarModal').attr("href", "javascript:ModificarModal(" + nivel.toString() + ");");
                    $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");

                    $("#myModalLabel").html('Mantenimiento ' + $('#hfNombreCentro').val() + ' - ' + aoNiveles[nivel - 1].DESCRIPCION);
                    $("#lblDescripcion").html(aoNodoActual[0].Descripcion);

                    $("#nuevoModal").css("display", "none");

                    $('#MuestraModal').modal('show');
                    $("#niveles").html(shtml);

                }
            }
        });

        $("#btnActualizarArbol").on("click", function (e) {
            if ($("#btnActualizarArbol").attr("disabled") != 'disabled') {
                Bloquear("treeCentroCostos");
                CargarArbolCentroCostos();
                $("#btnAgregarNodo").attr("disabled", true);
                $("#btnEditarNodo").attr("disabled", true);
                $("#btnActualizarArbol").attr("disabled", true);
                Desbloquear("treeCentroCostos");
            }

        });


    }

    var fnCargarParametros = function () {
        aoNiveles = CargarNivelesCentroCostos();
    };

    var fnGetDescripNivel = function (oNodo, nivel) {       
        let iNodeId = oNodo.nodeId;
        if (iNodeId === 0)
            return "";

        let iNivel = oNodo.Nivel;
        if (iNivel == nivel)
            return oNodo.Codigo + ' - ' + oNodo.DESCRIPCION_CORTA;

        let iParentId = oNodo.parentId
        let oNodoTemp = $('#treeCentroCostos').treeview('getNode', iParentId);
        return fnGetDescripNivel(oNodoTemp, nivel);
    };

    var cargaInicial = function () {
        styleDiv('display:none', 'display:none');
        $('#cboEmpresa').select2('val', $('#ctl00_hddctlg').val());
        $('#cboEmpresa').change();
        var CODE = ObtenerQueryString("sCodCentroCostosCab");
        var CTLG = ObtenerQueryString("empresa_code");
        if (typeof (CODE) !== "undefined") {

            $('#cboEmpresa').val(CTLG);
            $('#cboEmpresa').change();
            $("#cboPlanCostos").val(CODE);
            $('#cboPlanCostos').change();           
        }

    }

    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            eventoControles();
            cargaInicial();
        }
    };

}();

function styleDiv(strDivSpanButtonsNivel, strDivSpanTablesNivel) {
    $('#divSpanButtonsNivel1').attr('style', strDivSpanButtonsNivel);
    $('#divSpanButtonsNivel2').attr('style', strDivSpanButtonsNivel);
    $('#divSpanButtonsNivel3').attr('style', strDivSpanButtonsNivel);
    $('#divSpanButtonsNivel4').attr('style', strDivSpanButtonsNivel);
    $('#divSpanTablesNivel').attr('style', strDivSpanTablesNivel);
}

function InitConfiguration(name, div, nameTable) {
    var input = NewTableInit(name, nameTable);
    $('#divNivel' + div).html(input);

    oTableNew = $('#tblNivel' + name).dataTable({
        "searching": false,
        "info": false,
        "ordering": true,
        "paging": false,
        "dom": '<"toolbar">frtip',
        "scrollX": true,
        "oLanguage": {
            "sEmptyTable": "No hay datos disponibles en la tabla.",
            "sZeroRecords": "No hay datos disponibles en la tabla."
        }
    });

}

function NewTableInit(name, nameTable)  {
    var output = '';
    output += "<table id='tblNivel" + name + "' cellspacing='0'  class='display DTTT_selectable'>";
    output += "<thead>";
    output += "<tr>";
    output += "<th colspan='3'>" + nameTable.toUpperCase() + "</th>"
    output += "</tr>"
    output += "<tr>"
    output += "<th align='center'>CÓDIGO</th>"
    output += "<th align='center'>DESCRIPCIÓN</th>"
    output += "<th align='center'>ESTADO</th>"
    output += "</tr>"
    output += "</thead>"
    output += "<tbody>"
    output += "</tbody>"
    output += "</table>"
    return output;
}

function ClearTables(name) {
    if ($('#tblNivel' + name).length != 0) {
        $('#tblNivel' + name).remove();
    }
}

function ClearControlsModal() {
    $('#txtCodigoModal').val('');
    $('#txtDescripcionModal').val('');
}


function GrabarModal(OPCION) {
    var v_Niveles = parseInt($('#hfCodigoNiveles').val());
    var CODE = '';
    var CECC_CODE = '';
    var DESC = '';
    var DEPEND_CODE = '';
    var NIVEL = 0;
    var ESTADO_IND = '';
    var USUA_ID = '';

    CECC_CODE = $('#hfCodigoCentroCostos').val();
    CTLG_CODE = $('#cboEmpresa').val();
    DESC = $.trim($('#txtDescripcionModal').val());
    ABREV = $.trim($('#txtAbreviaturaModal').val());
    if ($("#hfCodigoNodo").val() == 0) {
        DEPEND_CODE = "";
    } else {
        DEPEND_CODE = $("#hfCodigoNodo").val();
    }

    NIVEL = OPCION;
    ESTADO_IND = 'A';

    

    if (vErrors(["hfCodigoCentroCostos", "txtDescripcionModal", "txtAbreviaturaModal"])) {
        Bloquear("modal");
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=ND&sCodCentroCostosCab=" + CECC_CODE + "&sDescripcion=" + DESC + "&sAbreviatura=" + ABREV + "&sCodDependencia=" + DEPEND_CODE +
            "&iNivel=" + NIVEL + "&sEstado=" + ESTADO_IND + "&CTLG_CODE=" + CTLG_CODE,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {

                    Desbloquear("modal");
                    if (datos[0].CODIGO == "NOPERM") {
                        alertCustom("NO SE PUEDE INSERTAR(LIMITE)");
                    }
                    else {
                        $('#txtCodigoModal').val(datos[0].CODIGO);
                        $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                        $('#grabarModal').attr("href", "javascript:ModificarModal(" + OPCION + ");");
                        $("#nuevoModal").css("display", "inline");
                        $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
                        exito();
                        //$("#btnActualizarArbol").click();
                    }
                }
                else {
                    Desbloquear("modal");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modal");
                noexito();
            }
        });
    }
    
}

function ModificarModal(OPCION) {
    var v_Niveles = parseInt($('#hfCodigoNiveles').val());

    var CODE = '';
    var CECC_CODE = '';
    var DESC = '';
    var DEPEND_CODE = '';
    var NIVEL = 0;
    var ESTADO_IND = '';
    var USUA_ID = '';

    CECC_CODE = $('#hfCodigoCentroCostos').val();
    DESC = $.trim($('#txtDescripcionModal').val());
    ABREV = $.trim($('#txtAbreviaturaModal').val());
    
    DEPEND_CODE = "";
    CODE = $("#txtCodigoModal").val();
    NIVEL = OPCION;
    ESTADO_IND = 'A';

    

    if (vErrors(["hfCodigoCentroCostos", "txtDescripcionModal", "txtAbreviaturaModal"])) {
        Bloquear("ventana");        
        $.ajax({
            type: "POST",
            url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=MD&sCodCentroCostosCab=" + CECC_CODE + "&sCodCentroCostosDet=" + CODE + "&sDescripcion=" + DESC + "&sAbreviatura=" + ABREV + "&sCodDependencia=" + DEPEND_CODE +
            "&iNivel=" + NIVEL + "&sEstado=" + ESTADO_IND,
            contentType: "application/json;",
            dataType: "json",
            async: false,
            success: function (datos) {
                if (datos[0].SUCCESS == "OK") {
                    Desbloquear("ventana");   
                    Desbloquear("modal");
                    $('#grabarModal').html("<i class='icon-pencil'></i> Modificar");
                    $('#grabarModal').attr("href", "javascript:ModificarModal(" + OPCION + ");");
                    $('#cancelarModal').html("<i class='icon-remove'></i> Cerrar");
                    exito();
                    $("#btnActualizarArbol").click();
                }
                else {
                    Desbloquear("modal");
                    noexito();
                }
            },
            error: function (msg) {
                Desbloquear("modal");
                noexito();
            }
        });
    }
    
}


function CancelarModal() {
    $("#btnActualizarArbol").click();
    HideModal();
}

function HideModal() {
    $('#MuestraModal').modal('hide');
}

var CargarArbolCentroCostos = function () {
    //sEstado = (sEstado === undefined ? "" : sEstado);
    Bloquear("treeCentroCostos");
    vArbol = {};    
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LACC&sCodCentroCostosCab=" + $("#cboPlanCostos").val() + "&sEstado=A&CTLG_CODE=" + $("#cboEmpresa").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            //console.log(datos);
            var vData = [];
            var oItem = {};
            oItem.CODIGO = "0";
            oItem.DESCRIPCION = $("#cboPlanCostos").select2("data").text;
            oItem.CodPadre = "-1";
            // datos = JSON.parse(datos);
            if (!isEmpty(datos))
                vData = datos;
            
            vData.unshift(oItem);                        
            mCrearArbol(vData);
            mCargarArbol();
            $("#btnsaciones").css("display", "block");
            Desbloquear("treeCentroCostos");
            //console.log(aoNiveles);
        },
        error: function (msg) {
            alertCustom("No se pudo recuperar los centros de costos.");
            Desbloquear("treeCentroCostos");
        }
    });
};

var CargarNivelesCentroCostos = function () {
           
    $.ajax({
        type: "post",
        url: "vistas/NC/ajax/NCMCECC.ASHX?sOpcion=LNCC&sCodCentroCostosCab=" + $("#cboPlanCostos").val(),
        contenttype: "application/json;",
        datatype: "json",
        async: false,
        success: function (datos) {
            if (isEmpty(datos))
                return;
            vNiveles = datos;
        },
        error: function (msg) {
            alertCustom("No se pudo recuperar los niveles.");            
        }
    });
    return vNiveles;
};
var mCrearArbol = function (data) {
    
    if (isEmpty(data) || data === undefined)
        return;
    for (var i = 0; i < data.length; i++) {
        var nodo = data[i];
        mAgregarNodo(nodo);
    }
}

var mCargarArbol = function () {
    var datos = [];

    var niveles = [];
    datos.push(vArbol);
    
    $("#treeCentroCostos").treeview({ data: datos });

    for (var i = 0; i < aoNiveles.length; i++) {
        niveles.push(aoNiveles[i].DESCRIPCION);
    }
    setTimeout(function () {
        var ArrayBuscados = niveles;
        var todos = $(".list-group-item.node-treeCentroCostos");
        todos.filter(function (index, obj) {
            var text = obj.innerHTML;
            var textoEncontrado = "";
            for (var i = 0; i < ArrayBuscados.length; i++) {
                if (text.indexOf(ArrayBuscados[i]) > -1) {
                    textoEncontrado = $.trim(ArrayBuscados[i]);
                }
            }
            text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
            obj.innerHTML = text;
        });
    }, 500);

    $("#treeCentroCostos").on("nodeCollapsed nodeExpanded nodeSelected", function () {
        setTimeout(function () {
            var ArrayBuscados = niveles;
            var todos = $(".list-group-item.node-treeCentroCostos");
            todos.filter(function (index, obj) {
                var text = obj.innerHTML;
                var textoEncontrado = "";
                for (var i = 0; i < ArrayBuscados.length; i++) {
                    if (text.indexOf(ArrayBuscados[i]) > -1) {
                        textoEncontrado = $.trim(ArrayBuscados[i]);
                    }
                }
                text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
                obj.innerHTML = text;
            });
        }, 500);
    });


    $("#treeCentroCostos").on("nodeSelected", function (event, data) {
        ClearControlsModal();
        $("#btnAgregarNodo").attr("disabled", false);
        $("#btnEditarNodo").attr("disabled", false);
        $("#btnActualizarArbol").attr("disabled", false);

        if (data.Codigo === "0") {
            $("#hfCodigoNodo").val(data.Codigo);
            $("#hfDescNodo").val(data.Descripcion);
            $("#hfNivelNodo").val('0'); 
            $("#hfNombreNodo").val(data.DESCRIPCION_CORTA);
            $("#hfAbreviaturaNodo").val(data.ABREVIATURA);
        }
        else {
            $("#hfCodigoNodo").val(data.Codigo)
            $("#hfDescNodo").val(data.Descripcion);
            $("#hfNivelNodo").val(data.Nivel);
            $("#hfNombreNodo").val(data.DESCRIPCION_CORTA);
            $("#hfAbreviaturaNodo").val(data.ABREVIATURA);
        }

    });

    $("#treeCentroCostos").on("nodeUnselected", function (event, data) {
        $("#btnAgregarNodo").attr("disabled", true);
        $("#btnEditarNodo").attr("disabled", true);
        $("#btnActualizarArbol").attr("disabled", true);
    });

    $('#btn-expand-all').on('click', function (e) {
        var levels = $('#select-expand-all-levels').val();
        $("#treeCentroCostos").treeview('expandAll', { levels: levels, silent: $('#chk-expand-silent').is(':checked') });
    });

    $('#btn-collapse-all').on('click', function (e) {
        $("#treeCentroCostos").treeview('collapseAll', { silent: $('#chk-expand-silent').is(':checked') });
    });

}

var mAgregarNodo = function (oNodo) {  
    if (oNodo.CODIGO === "0") {
        vArbol.Codigo = oNodo.CODIGO;
        vArbol.Descripcion = oNodo.DESCRIPCION;
        vArbol.CodPadre = oNodo.CodPadre;      
        vArbol.text = oNodo.DESCRIPCION; // Dato Necesario para que el plugin cree el Treeview
        vArbol.Nivel = oNodo.Nivel;
        vArbol.DESCRIPCION_CORTA = oNodo.DESCRIPCION_CORTA;
        vArbol.ABREVIATURA = oNodo.ABREVIATURA;
        vArbol.NombreNivel = oNodo.NombreNivel;
    } else {
        mAgregarNodo2(oNodo, vArbol);
    }
}

var mAgregarNodo2 = function (oNodo, oArbol) {
    var jsonColor = [{ nivel: 1, color: '#000000' }, { nivel: 2, color: '#00A300' }, { nivel: 3, color: '#AD193E' }, { nivel: 4, color: '#094CB4' }, { nivel: 5, color: '#D24726' }, { nivel: 6, color: '#A000A7' }, { nivel: 7, color: '#00839A' }, { nivel: 8, color: '#5535B0' }]
    if (oArbol.Codigo === oNodo.CodPadre) {
        if (oArbol.nodes === undefined)
            oArbol.nodes = [];
        var oTempNodo = {};
        oTempNodo.Codigo = oNodo.Codigo;
        oTempNodo.Descripcion = oNodo.Descripcion;
        oTempNodo.CodPadre = oNodo.CodPadre;
        oTempNodo.text = oNodo.Descripcion; // Dato Necesario para que el plugin cree el Treeview
        oTempNodo.Nivel = oNodo.Nivel;
        oTempNodo.NombreNivel = oNodo.NombreNivel;
        oTempNodo.DESCRIPCION_CORTA = oNodo.DESCRIPCION_CORTA;
        oTempNodo.ABREVIATURA = oNodo.ABREVIATURA;

        oTempNodo.color = jsonColor.filter(function (obj) { return obj.nivel === oNodo.Nivel })[0].color;
        oArbol.nodes.push(oTempNodo);

        //console.log(oArbol);
        //console.log(oArbol);
        return true;
    } else {
        if (oArbol.nodes !== undefined) {
            for (var i = 0; i < oArbol.nodes.length; i++) {
                var bEncontrado = mAgregarNodo2(oNodo, oArbol.nodes[i]);
                if (bEncontrado)
                    break;
            }
        }
    }
}

function ponerNegrita(obj, ArrayBuscados) {
    var text = obj.innerHTML;
    var textoEncontrado = "";
    for (var i = 0; i < ArrayBuscados.length; i++) {
        if (text.indexOf(ArrayBuscados[i]) > -1) {
            textoEncontrado = $.trim(ArrayBuscados[i]);
        }
    }
    text = text.replace(eval("/" + textoEncontrado + "/g"), '<span style="font-weight:600;">' + textoEncontrado + '</span>');
    obj.innerHTML = text;
}


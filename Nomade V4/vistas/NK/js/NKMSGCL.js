var NKMSGCL = function () {

    var plugins = function () {

        $("#cboEmpresa").select2();

    }

    var cargarEmpresas = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($(select.parents("div")[0])) },
            success: function (data) {
                $(select).html('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                Desbloquear($(select.parents("div")[0]))
            }
        });
    };

    var tablasVacias = function () {
        var options = {
            data: null,
            columns: [
                {
                    data: "CODE",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                    }
                },
                {
                    data: "DESCRIPCION"
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(cellData=='A'?'Activo':'Inactivo');
                    }
                }

            ],
            "scrollY": "45vh", "scrollCollapse": true,
            "paging": false,
            "dom": '<"top cabecera"f><t><"clear">',
            info: false
        }

        oTableCanal = $("#tblCanal").dataTable(options);
        oTableSubCanal = $("#tblSubCanal").dataTable(options);
        oTableTipoNegocio = $("#tblTipoNegocio").dataTable(options);

        $('#tblCanal tbody, #tblSubCanal tbody, #tblTipoNegocio tbody').on('click', 'tr', function () {
            var oTable = obtenerTablaActual($(this.parentElement.parentNode).attr("id"));
            if ($(this).hasClass('selected')) {
              
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

            var pos = oTable.fnGetPosition(this);
            var row = oTable.fnGetData(pos);
            var objAsign = [{ 'C': 'SC', 'SC': 'TN' }, { 'C': 'tblSubCanal', 'SC': 'tblTipoNegocio' }]
            var tipo = objAsign[0][(row.TIPO)];
            var objTable = obtenerTablaActual(objAsign[1][(row.TIPO)]);
            if (row !== null && row.TIPO!=='TN') {
                listarSegmento(tipo, objTable, row.CODE);
            }

        });

    }

    var eventoControles = function () {
        var objTblActual,objTblApi,dataTblSelected;
        var cboEmpresa = $('#cboEmpresa');
        var nuevo = true;
        var objIndices = [{ 'tblCanal': 'C', 'tblSubCanal': 'SC','tblTipoNegocio':'TN' },{ 'tblCanal': '', 'tblSubCanal': oTableCanal,'tblTipoNegocio':oTableSubCanal}]; //[0]cod tipo,[1]dependencia

        $(".actions>a").click(function () {
            objTblActual = obtenerTablaActual(this);
            objTblApi = objTblActual.api(true)
        });

        $(".add").click(function () {
            var tipo = objTblApi.table().header().childNodes[1].textContent;
            $("#txtTitleTipo").html('NUEVO ' + tipo);
            $("#txtDescripcion,#txtCodigo").val("");
            nuevo |= 1;
            $("#modalEditaNuevo").modal({ backdrop: 'static', keyboard: false });
        });

        $(".ref").click(function () {
            
            if (objTblActual.fnGetData().length) {
                var objMuestra = objTblActual.fnGetData()[0];
                listarSegmento(objMuestra.TIPO, objTblActual, objMuestra.DEPEND_CODE);
            } else {
                objTblActual.fnClearTable();
                infoCustom2("No se encontraron datos!");
            }
        });

        $(".edt").click(function () {           
            dataTblSelected = objTblApi.rows('.selected').data();
            if (dataTblSelected.length) {
                $("#txtTitleTipo").html('EDITAR ' + dataTblSelected[0].NTIPO);
                $("#modalEditaNuevo").modal({ backdrop: 'static', keyboard: false });
                $("#txtDescripcion").val(dataTblSelected[0].DESCRIPCION);
                $("#txtCodigo").val(dataTblSelected[0].CODE);
                nuevo &= 0;
            } else {
                objTblActual.parent("div")
                .pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                infoCustom2("No ha seleccionado ningun item de la tabla!");
            }
        });

        $(".del").click(function () {
            dataTblSelected = objTblApi.rows('.selected').data();
            if (dataTblSelected.length) {
                if (dataTblSelected[0].MODIFICABLE == 'S') {
                    var estado = dataTblSelected[0].ESTADO == 'A' ? 'I' : 'A';
                    actualizar(dataTblSelected[0].CODE, dataTblSelected[0].DESCRIPCION, estado, dataTblSelected[0].TIPO, dataTblSelected[0].DEPEND_CODE);
                } else {
                    infoCustom2("El item seleccionado se ecuentra en uso!");
                }
            } else {
                objTblActual.parent("div")
                .pulsate({
                    color: "#33AECD",
                    reach: 20,
                    repeat: 3,
                    glow: true
                });
                infoCustom2("No ha seleccionado ningun item de la tabla!");
            }
        });

        cboEmpresa.change(function () {

            listarSegmento('C', oTableCanal, '')

        });

        $("#modAceptar").click(function () {
            if(vErrors(["txtDescripcion","cboEmpresa"]))
                if (nuevo) {    
                    var id = objTblApi.settings()[0].sTableId;
                    grabar($("#txtDescripcion").val(), objIndices[0][id], (objIndices[0][id]!=='C'?objIndices[1][id].api(true).rows('.selected').data()[0].CODE:""))
                } else {
                    actualizar(dataTblSelected[0].CODE, $("#txtDescripcion").val(), "A", dataTblSelected[0].TIPO, dataTblSelected[0].DEPEND_CODE);
                }

        });

    }

    var grabar = function (descripcion, tipo, codigo) {
        var objIndices = { 'C': 'tblCanal', 'SC': 'tblSubCanal', 'TN': 'tblTipoNegocio' };
        $.ajax({
            type: "post",
            url: 'vistas/nk/ajax/NKMSGCL.ashx?opcion=1&tipo=' + tipo + '&empresa=' + $('#cboEmpresa').val() + '&codigo=' + codigo + '&descripcion=' + descripcion,
            contenttype: "application/json",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($("#modalEditaNuevo")) },
            success: function (data) {
                if (data.indexOf("error") < 0) {
                    $("#txtCodigo").val(data);
                    listarSegmento(tipo,obtenerTablaActual(objIndices[tipo]),codigo);
                    exito();
                }
            },
            error:function(){
            
            },
            complete: function () {
                Desbloquear($("#modalEditaNuevo"))
                $("#modalEditaNuevo").modal("hide");
            }
        });

    }

    var actualizar = function (codigo, descripcion, estado, tipo, depend) {
        var objIndices = { 'C': 'tblCanal', 'SC': 'tblSubCanal', 'TN': 'tblTipoNegocio' };
        $.ajax({
            type: "post",
            url: 'vistas/nk/ajax/NKMSGCL.ashx?opcion=2&descripcion=' + descripcion + '&empresa=' + $('#cboEmpresa').val() + '&codigo=' + codigo + '&estado=' + estado,
            contenttype: "application/json",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($("#modalEditaNuevo")) },
            success: function (data) {
                if (data == "OK") {
                    exito();
                    listarSegmento(tipo, obtenerTablaActual(objIndices[tipo]),depend);
                }
            },
            error: function () {

            },
            complete: function () {
                Desbloquear($("#modalEditaNuevo"));
                $("#modalEditaNuevo").modal("hide");
            }
        });

    }

    var listarSegmento = function (tipo,objc,depend) {

        $.ajax({
            type: "post",
            url: 'vistas/nk/ajax/NKMSGCL.ashx?opcion=L&tipo=' + tipo + '&empresa=' + $('#cboEmpresa').val() + '&codigo=' + (depend === null ? '' : depend),
            contenttype: "application/json",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($(objc[0].parentNode)) },
            success: function (data) {
                objc.fnClearTable();               
                if (data.length > 0) {
                    objc.fnAddData(data);
                   
                }

              
            },
            error: function (msg) {
                alertCustom('Error al cargar datos.');
            },
            complete: function () {
                if (tipo == 'SC' || tipo == 'C') {
                    oTableTipoNegocio.fnClearTable();
                }
                if (tipo == 'C') {
                    oTableSubCanal.fnClearTable();
                }
                Desbloquear($(objc[0].parentNode));
            }
        });

    }


    function obtenerTablaActual(instance) {
        var id = typeof (instance) == 'object' ? $($(instance.parentElement).siblings("div")).find("table[id]")[0].id : instance;
        switch (id)
        {
            case "tblCanal":
                return oTableCanal;
                break;
            case "tblSubCanal":
                return oTableSubCanal;
                break;
            case "tblTipoNegocio":
                return oTableTipoNegocio;
                break;
        }
    }

    var cargaInicial = function () {
        var CODE = ObtenerQueryString("ctlg");
        var CCODE = ObtenerQueryString("ccode");

        if (typeof (CODE) !== "undefined") {
            $("#cboEmpresa").val(CODE).change();

            var array = CCODE.split("|");
            setTimeout(function () {
                oTableCanal.$("tr:contains('" + array[0] + "')").click();
            }, 500);
            setTimeout(function () {
                oTableSubCanal.$("tr:contains('" + array[1] + "')").click();
            }, 1000);
            setTimeout(function () {
                oTableTipoNegocio.$("tr:contains('" + array[2] + "')").click();
            }, 1500);
            
        }

    }

    return {
        init: function () {
            cargarEmpresas();
            tablasVacias();          
            plugins();
            eventoControles();
            cargaInicial();
        }
    };
}();



var NKLSGCL = function () {

    var fillBandeja= function () {
        var parms = {
            data: null,
            columns: [                                        
                {
                    data: "CANAL",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    name: "N1"

                },
                {
                    data: "SUBCANAL", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    name: "N2"
                },
                {
                    data: "TIPO_NEGOCIO", createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    },
                    name: "N3"
                },
                {
                    data: "ESTADO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).html(cellData == 'A' ? 'Activo' : 'Inactivo');
                        $(td).attr('align', 'center')
                    }
                }],
            rowsGroup: ['N1:name', 'N2:name', ]
        }

        oTable = iniciaTabla('tblBandeja', parms);

        $('#tblBandeja').removeAttr('style');

        $('#tblBandeja tbody').on('click', 'tr', function () {


            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CTLG_CODE;
                var ccodigo = row.CODE_C + "|" + row.CODE_SC + "|" + row.CODE_TN;
                window.location.href = '?f=nkmsgcl&ctlg=' + codigo + '&ccode=' + ccodigo;
            }
        });

    }

    var plugins = function () {

        $("#cboEmpresa").select2();

    }

    var fillCboEmpresa = function () {
        var select = $('#cboEmpresa');
        $.ajax({
            type: "post",
            url: 'vistas/nc/ajax/ncmnipl.ashx?opcion=0&usua=' + $('#ctl00_txtus').val(),
            contenttype: "application/json",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($(select.parents("div")[0])) },
            success: function (data) {
                $(select).html('<option></option>');
                for (var i = 0; i < data.length; i++) {
                    $(select).append('<option value="' + data[i].CODIGO + '">' + data[i].DESCRIPCION + '</option>');
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar empresas.');
            },
            complete: function () {
                Desbloquear($(select.parents("div")[0]))
            }
        });
    };

    var eventos = function () {
        var cboEmpresa = $('#cboEmpresa');
        cboEmpresa.change(function () {
            listarSegmento();
        });
    }

    var listarSegmento = function () {

        $.ajax({
            type: "post",
            url: 'vistas/nk/ajax/NKMSGCL.ashx?opcion=L&tipo=&empresa=' + $('#cboEmpresa').val() + '&codigo=',
            contenttype: "application/json",
            datatype: "json",
            async: true,
            beforeSend: function () { Bloquear($(oTable[0].parentNode)) },
            success: function (data) {
                oTable.fnClearTable();
                if (data.length > 0) {                                                                      
                    oTable.fnAddData(data);
                }
            },
            error: function (msg) {
                alertCustom('Error al cargar Datos.');
            },
            complete: function () {
                Desbloquear($(oTable[0].parentNode));
            }
        });

    }


    return {
        init: function () {
            plugins();
            fillCboEmpresa();
            fillBandeja();
            eventos();          
        }
    };

}();
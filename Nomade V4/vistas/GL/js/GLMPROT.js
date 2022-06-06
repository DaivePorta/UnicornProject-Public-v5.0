
var GLLPROT = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboGirador').select2();
        $('#minfecha').datepicker();
        $('#maxfecha').datepicker();
    }

    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);        
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

    };

    var fillCboGirador = function () {
        var selectEst = $('#cboGirador');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option value="TODOS">TODOS</option>');
        $('#cboGirador').select2('val', 'TODOS');        
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMPROT.ashx?flag=4&empresa=" + $("#cboEmpresa").val() + "&tipo=C&estLetra=T",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {                                
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].GIRADOA + '">' + datos[i].NGIRADOA + '</option>');
                    }
                }
                $('#cboGirador').select2('val', 'TODOS');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            fillCboGirador();
        });       

        $("#btnBuscar").on("click", function () {
            console.log('cxbgcdh');
            let fechaIni = $("#minfecha").val();
            let fechaFin = $("#maxfecha").val();           

            if (fechaIni.trim() == "" && fechaFin.trim() == "") {
                fillTablaLetra();
            } else if (fechaIni.trim() != "" && fechaFin.trim() != "") {
                fillTablaLetra();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });
    }

    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: json,
            columns: [
                { data: "NGIRADOR" },
                { data: "NUMERO" },
                { data: "MONTO" },
                { data: "EMPRESA.NOMBRE" },
                {
                    data: { _: "FECHA_GIRO.display", sort: "FECHA_GIRO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_VENC.display", sort: "FECHA_VENC.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOTARIA" },
                { data: "USUARIO" }
            ],
            "sDom": 'C<"clear">lfrtip',
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();/****!?***/
                window.open('?f=GLMLETR&codigo=' + codigo, '_blank');
            }
        });           
    }

    var fillTablaLetra = function () {
        let empresa = $('#cboEmpresa').val();
        let giradoA = ($("#cboGirador").val() == "TODOS") ? '' : $("#cboGirador").val();
        let fechaIni = $('#minfecha').val();;
        let fechaFin = $('#maxfecha').val();;                
        
        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/GLMPROT.ashx?flag=5&tipo=C&estLetra=T&empresa=" + empresa + "&girador=" + giradoA + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos != null)
                    oTable.fnAddData(datos);
                else
                    infoCustom("No se encontraron registros.");
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            fillCboGirador();
            creaTablaVacia();
            fillTablaLetra();
            //fillTablaPROToCheque();
        }
    }
}();



var GLMPROT = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
    };


    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val()).change();
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            Cargar_tabla();
        });   

    }


    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: null,
            columns: [
                {
                    data: null,
                    defaultContent: '  <input type="checkbox" class="aprobarChk" />',
                    createdCell: function (td, cellData, rowData, row, col) {

                        $(td).attr('align', 'center')

                    }
                },
                { data: "NGIRADOR" },
                { data: "NUMERO" },
                {
                    data: "MONTO",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center');
                        $(td).html(rowData.SMONEDA + $(td).html());

                    }
                },
                { data: "EMPRESA.NOMBRE" },
                {
                    data: { _: "FECHA_GIRO.display", sort: "FECHA_GIRO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_VENC.display", sort: "FECHA_VENC.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NDESTINO" }

            ],



            stateSave: false

        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style').css("border-collapse", "collapse");

        //Cargar_tabla();

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
         

            }

        });


        $('#tblBandeja tbody').on('click', '.aprobarChk', function () {
            codigos = $('#hddauxiliar').val();
            $(this).parent().parent().addClass('selected');
            var pos = oTable.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable.fnGetData(pos);

            var cod = row.CODIGO
            var nro = row.NUMERO;



            valor = cod;

            if ($(this).is(":checked")) {

                $(this)
                    .attr("checked", false)
                    .parent().removeClass("checked");

                $(".aprobarChk").removeClass("activo");
                $(this).addClass("activo");

                CrearProtoEsp(valor, nro);


            } else {
                if (codigos.indexOf(valor) >= 0) {
                    codigos = codigos.replace(codigos.substring(codigos.indexOf(valor) - 1, codigos.indexOf(valor) + valor.length + codigos.split(valor)[1].split("|")[0].length), "");
                    $('#hddauxiliar').val(codigos);
                }
            }

        });

    }


    return {
        init: function () {
            plugins();
            eventos();
            creaTablaVacia();            
            fillCboEmpresa();
            
        }
    }
}();

var GLLPROP = function () {

    var plugins = function () {
        $('#cboEmpresa').select2();
        $('#cboGirador').select2();
        $('#minfecha').datepicker();
        $('#maxfecha').datepicker();
    }

    var fillCboEmpresa = function () {
        var sEmpresa = fnGetEmpresasUsuario(1, "A", false);
        $("#cboEmpresa").html(sEmpresa);
        $("#cboEmpresa").select2("val", $("#ctl00_hddctlg").val());

    };

    var fillCboGirador = function () {
        var selectEst = $('#cboGirador');
        selectEst.empty();
        selectEst.append('<option></option>').append('<option value="TODOS">TODOS</option>');
        $('#cboGirador').select2('val', 'TODOS');
        $.ajax({
            type: "post",
            url: "vistas/GL/ajax/GLMPROT.ashx?flag=4&empresa=" + $("#cboEmpresa").val() + "&tipo=P&estLetra=T",
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                if (datos != null) {
                    for (var i = 0; i < datos.length; i++) {
                        selectEst.append('<option value="' + datos[i].GIRADOR + '">' + datos[i].NGIRADOR + '</option>');
                    }
                }
                $('#cboGirador').select2('val', 'TODOS');
            },
            error: function (msg) {
                alert(msg.d);
            }
        });
    };

    var eventos = function () {
        $('#cboEmpresa').change(function () {
            fillCboGirador();
        });

        $("#btnBuscar").on("click", function () {
            console.log('cxbgcdh');
            let fechaIni = $("#minfecha").val();
            let fechaFin = $("#maxfecha").val();

            if (fechaIni.trim() == "" && fechaFin.trim() == "") {
                fillTablaLetra();
            } else if (fechaIni.trim() != "" && fechaFin.trim() != "") {
                fillTablaLetra();
            } else {
                alertCustom("Ingrese ambas fechas para filtrar por Fecha.")
            }
        });
    }

    var creaTablaVacia = function () {
        var json = null;
        var parms = {
            data: json,
            columns: [
                { data: "NGIRADOR" },
                { data: "NUMERO" },
                { data: "MONTO" },
                { data: "EMPRESA.NOMBRE" },
                {
                    data: { _: "FECHA_GIRO.display", sort: "FECHA_GIRO.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    data: { _: "FECHA_VENC.display", sort: "FECHA_VENC.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },

                {
                    data: { _: "FECHA.display", sort: "FECHA.order" },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                { data: "NOTARIA" },
                { data: "USUARIO" }
            ],
            "sDom": 'C<"clear">lfrtip',
        }

        oTable = iniciaTabla('tblBandeja', parms);
        $('#tblBandeja').removeAttr('style');

        $(".ColVis_Button").addClass("btn blue").css("margin-bottom", "10px");

        $('#tblBandeja tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                var pos = oTable.fnGetPosition(this);
                var row = oTable.fnGetData(pos);
                var codigo = row.CODIGO;
                // var code = $('#cod' + $(this).attr("id")).html();/****!?***/
                window.open('?f=GLMLETR&codigo=' + codigo + '&tipo=P', '_blank');
            }
        });
    }

    var fillTablaLetra = function () {
        let empresa = $('#cboEmpresa').val();
        let giradoA = ($("#cboGirador").val() == "TODOS") ? '' : $("#cboGirador").val();
        let fechaIni = $('#minfecha').val();;
        let fechaFin = $('#maxfecha').val();;

        $.ajax({
            type: "post",
            url: "vistas/gl/ajax/GLMPROT.ashx?flag=5&tipo=P&estLetra=T&empresa=" + empresa + "&girador=" + giradoA + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin,
            contenttype: "application/json;",
            datatype: "json",
            async: true,
            success: function (datos) {
                oTable.fnClearTable();
                if (datos != null)
                    oTable.fnAddData(datos);
                else
                    infoCustom("No se encontraron registros.");
            },
            complete: function () {

            },
            error: function (msg) {
                alert(msg);
            }
        });
    }

    return {
        init: function () {
            plugins();
            eventos();
            fillCboEmpresa();
            fillCboGirador();
            creaTablaVacia();
            fillTablaLetra();
            //fillTablaPROToCheque();
        }
    }
}();


function Cargar_tabla() {

    var emp = $("#cboEmpresa").val();

    $.ajax({
        type: "POST",
        url: "vistas/GL/ajax/GLMPROT.ASHX?flag=3&empresa=" + emp,
        contentType: "application/json;",
        dataType: "json",
        async: false,
        success: function (datos) {
            var json = datos;
            oTable.fnClearTable()
            if (datos != null)
                oTable.fnAddData(datos);
            else
                infoCustom("No se encontraron registros.");
        }
    });

}

function CrearProto() {

    var p_codi = $('#hddauxiliar').val().substring(1);
    var p_user = $('#ctl00_lblusuario').html();

    var v_flag = 1;

    Bloquear("ventana");
    $.post("vistas/GL/ajax/GLMPROT.ASHX", {
        flag: v_flag,
        codigo: p_codi,
        usuario: p_user

    },
        function (res) {
            Desbloquear("ventana");
            if (res == "OK") {
                exito();
                Cargar_tabla();
                $('#hddauxiliar').val("");
            } else {
                noexito();
            }
        });

}

v_existe = false;

function CrearProtoEsp(val0r, nr0) {


    var bodyER = "<div class='row-fluid'>" +
        "<div class='span2'><b>LETRA:</b></div><div class='span4'><div class='control-group'><div class='controls'>" +
        '<input type="text" id="txt_letra" maxlength="50" class="span10 obligatorio" disabled="disabled"/>' +
        "</div></div></div> " +
        "<div class='span2'><b>FECHA:</b></div><div class='span3'><div class='control-group'><div class='controls'>" +
        '<input type="text" id="txt_fecha" maxlength="10" class="span12 obligatorio" data-date-format="dd/mm/yyyy" placeholder="dd/mm/yyyy"/>' +
        "</div></div></div>" +
        "</div>" +
        "<div class='row-fluid'>" +
        "<div class='span2'><b>NOTARIA:</b></div><div class='span7'><div class='control-group'><div class='controls'>" +
        '<select id="slc_notaria" maxlength="10" data-placeholder="NOTARIA" class="span12 obligatorio"><option></option></select>' +
        "</div></div></div> </div>"


        ;
    var footerER =
        '<button id="btngrDetalle" type="button" class="btn blue"><i class="icon-ok"></i> Aceptar</button>' +
        '<button class="btn" type="button" data-dismiss="modal"><i class="icon-remove"></i> Cancelar</button>';

    codigoss = $('#hddauxiliar').val();
    codigoss += ("|" + val0r);  // SE ASIGNA EL VALOR

    if (!v_existe) {
        crearmodal("modalCrearPROTo", "Datos de Registro de Protesto", bodyER, footerER);
        $("#txt_fecha").datepicker();
        $("#slc_notaria").select2();


        $.post("vistas/GL/ajax/GLMPROT.ASHX", {
            flag: 2
        },
            function (res) {

                $("#slc_notaria").html(res);

            });


        $("#btngrDetalle").click(function () {

            if (!vErrorBodyAnyElement(".obligatorio")) {

                var fecha = $("#txt_fecha").val().split("/").reverse().join("-");
                var notaria = $("#slc_notaria").val();





                $('#hddauxiliar').val(codigoss + "," + fecha + "," + notaria);

                $("#modalCrearPROTo").modal("hide");

                $("#txt_fecha").val("");
                $("#slc_notaria").val("").change();

                $(".aprobarChk.activo")
                    .attr("checked", true)
                    .parent().addClass("checked");

            } else {
                alertCustom("La operaci\u00f3n <b>NO</b> se realiz\u00f3!<br/> Ingrese los campos obligatorios!");
            }
        });

        v_existe |= true;
    }

    $("#txt_letra").val(nr0);


    $("#modalCrearPROTo").modal("show");





}





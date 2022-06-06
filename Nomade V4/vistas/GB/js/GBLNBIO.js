var GBLNBIO = function () {
    return {
        init: function () {
            Listar();
        }
    };
}();
var GBMNBIO = function () {
    return {
        init: function () {
            ListarBiometrico();
            CargaInicial('');          
        }
    };
    function CargaInicial(cod) {

      

        var codigo = ObtenerQueryString("codigo");
            if (cod == '') {
            } else {
                var codigo = cod;
            }
        if (codigo != null) {
            $("#grabar").html("<i class='icon-pencil'></i>Modificar");
            $("#grabar").attr("href", "javascript:Modificar();");

            $.ajax({
                type: "POST",
                url: "vistas/GB/ajax/GBLNBIO.ashx?Opcion=S&codigo=" + codigo,
                contentType: "application/json;",
                dataType: "json",
                success: function (datos) {

                    $("#txtCodigo").val(datos[0].CODIGO);
                    $("#txtMarca").val(datos[0].MARCA);
                    $("#txtModelo").val(datos[0].MODELO);
                    $("#txtSerie").val(datos[0].SERIE);
                    $("#txtSoftware").val(datos[0].SISTEMA);
                    $("#txtVersion").val(datos[0].VERSION);
                    
                    $("#tblBiometrico").css({'display':'block'});
                    ListarComatible(datos[0].COMPATIBLE);
                    if (datos[0].ESTADO == 'ACTIVO') {
                        $('#uniform-chkEstado span').removeClass().addClass("checked");
                        $('#chkEstado').attr('checked', true);
                    }
                    else {
                        $('#uniform-chkEstado span').removeClass();
                        $('#chkEstado').attr('checked', false);
                    }                    
                },
                error: function (msg) {
                    alert(msg);
                }
            });
        } else {
            $("#tblBiometrico").css({ 'display': 'none' });
        }
    }




}();
function Listar() {
    $.ajax({
        type: "POST",
        url: "vistas/GB/ajax/GBLNBIO.ashx?Opcion=L",
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            var parms = {
                data: datos,
                columns: [
                    {
                        data: "CODIGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                            $(td).css('display', 'none')
                        }
                    },
                    {
                        data: "MARCA",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },
                    {
                        data: "MODELO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                    {
                        data: "SERIE",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                    {
                        data: "SISTEMA",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                    {
                        data: "VERSION",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    },
                    {
                        data: "ESTADO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                ]

            }

            oTable = iniciaTabla('tblBiometrico', parms);

            $('#tblBiometrico').removeAttr('style');

            $('#tblBiometrico tbody').on('click', 'tr', function () {

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    oTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');

                    var pos = oTable.fnGetPosition(this);
                    var row = oTable.fnGetData(pos);
                    var codigo = row.CODIGO;
                    window.location.href = '?f=GBMNBIO&Opcion=S&codigo=' + codigo + "";
                }

            });
        },
        error: function (msg) {
            alert(msg);
        }
    });

}
function Validar() {
    var v_Errors = true;
    //if (!vErrorsNotMessage(["txtMarca", "txtModelo", "txtSerie", "txtSoftware", "txtVersion"])) {
    if (!vErrorsNotMessage(["txtMarca", "txtModelo", "txtSerie", "txtSoftware", "txtVersion"])) {
            v_Errors = false;
        }
    return v_Errors;
}
function Grabar() {
    var v_Errors = true;
    v_Errors = Validar();
    if (v_Errors) {
        //"txtMarca", "txtModelo", "txtSerie", "txtSoftware", "txtVersion"
        var Marca = $('#txtMarca').val();
        var Modelo = $('#txtModelo').val();
        var Serie = $('#txtSerie').val();
        var Sistema = $('#txtSoftware').val();
        var Version = $('#txtVersion').val();
        var Estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var Usuario = $('#ctl00_txtus').val();
        var Compatible = $('#cboBiometrico').val();
        Bloquear("ventana");

        $.post("vistas/GB/ajax/GBLNBIO.ashx",
            {
                opcion: 'R', Marca: Marca, Modelo: Modelo, Serie: Serie, Sistema: Sistema, Version: Version, Estado: Estado, Usuario: Usuario, Compatible: Compatible
            },
            function (res) {
                if (res != 'EXIS') {
                    if (res != 'NO') {
                        $('#txtCodigo').val(res);
                        exito();
                        $("#grabar").html("<i class='icon-pencil'></i> modificar");
                        $("#grabar").attr("href", "javascript:Modificar()");
                        CargaInicial(res);
                    }
                }

            });
        Desbloquear("ventana");
        //ListarBiometrico();
        //ListarComatible();
    }
}






function Modificar() {
    var v_Errors = true;
    v_Errors = Validar();
    if (v_Errors) {
        //"txtMarca", "txtModelo", "txtSerie", "txtSoftware", "txtVersion"
        var Codigo = $('#txtCodigo').val();
        var Marca = $('#txtMarca').val();
        var Modelo = $('#txtModelo').val();
        var Serie = $('#txtSerie').val();
        var Sistema = $('#txtSoftware').val();
        var Version = $('#txtVersion').val();
        var Estado = $('#chkEstado').is(':checked') ? 'A' : 'I';
        var Usuario = $('#ctl00_txtus').val();
        var Compatible = $('#cboBiometrico').val();
        Bloquear("ventana");

        $.post("vistas/GB/ajax/GBLNBIO.ashx",
            {
                opcion: 'M', Codigo: Codigo, Marca: Marca, Modelo: Modelo, Serie: Serie, Sistema: Sistema, Version: Version, Estado: Estado, Usuario: Usuario, Compatible: Compatible
            },
            function (res) {
                //Desbloquear("ventana");
                if (res != 'EXIS') {
                    if (res != 'NO') {
                        //$('#txtCodigo').val(res);
                        exito();
                        //$("#grabar").html("<i class='icon-pencil'></i> modificar");
                        //$("#grabar").attr("href", "javascript:ModificarJustificacion()");
                        CargaInicial(Codigo);
                    }
                }
            });
        
        Desbloquear("ventana");
        //ListarBiometrico();
        //ListarComatible();
    }
}

var ListarBiometrico = function () {
    var codigo2 = ObtenerQueryString("codigo");
    $.ajax({
        type: "POST",
        url: "vistas/GB/ajax/GBLNBIO.ashx?Opcion=C&Codigo=" + codigo2,
        success: function (res) {
            $('#cboBiometrico').append(res);
            $('#cboBiometrico').change();
            $('#cboBiometrico').select2();
        },
        error: function (msg) {
            alert(msg);
        }
    });
}


function ListarComatible(Codigo) {
    var codigo3 = ObtenerQueryString("codigo");
    $.ajax({
        type: "POST",
        url: "vistas/GB/ajax/GBLNBIO.ashx?Opcion=P&Compatible=" + codigo3,
        contentType: "application/json;",
        dataType: "json",
        success: function (datos) {
            var parms = {
                data: datos,
                columns: [
                    {
                        data: "CODIGO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                            $(td).css('display', 'none')
                        }
                    },
                    {
                        data: "MARCA",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },
                    {
                        data: "MODELO",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'center')
                        }
                    }
                ]

            }


            //if (oTable != null) oTable = null;
            oTable = iniciaTabla('tblBiometrico', parms);
            $('#tblBiometrico').removeAttr('style');


            //$('#tblBiometrico tbody').on('click', 'tr', function () {

            //    if ($(this).hasClass('selected')) {
            //        $(this).removeClass('selected');
            //    }
            //    else {
            //        oTable.$('tr.selected').removeClass('selected');
            //        $(this).addClass('selected');

            //        var pos = oTable.fnGetPosition(this);
            //        var row = oTable.fnGetData(pos);
            //        var codigo = row.CODIGO;
            //        window.location.href = '?f=GBMNBIO&Opcion=S&codigo=' + codigo + "";
            //    }

            //});
        },
        error: function (msg) {
            alert(msg);
        }
    });

}